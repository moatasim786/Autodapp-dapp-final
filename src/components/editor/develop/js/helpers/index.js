import JSZip from 'jszip';
import { Notyf } from 'notyf';
import { exportTemplate } from '../config/exportTemplate';
import { saveAs } from 'file-saver';
import {script} from '../defaultScript'
import { userApi } from '../../../../api/user';
import { web3Script } from '../web3';

const msg = new Notyf({
    position:{
        x:'center',
        y:'top'
    }
});


export const getLocal = (key) =>{
    let localData = localStorage.getItem(key);
    localData = localData ? JSON.parse(localData) : [];
    return localData;
}

export const addLocal = (key,content) =>{
    localStorage.setItem(key, JSON.stringify(content || []) );
}

export const checkExtension = (fname) => {
    let ext = /^.+\.([^.]+)$/.exec(fname);
    return ext == null ? "" : ext[1];
}

const buildZipFolder = (data) => {
    const dapp = localStorage.getItem('gjs-dapp')
    const token = JSON.parse(localStorage.getItem('autodapp_contact'))
    const abi = localStorage.getItem('autodapp_abi')
    const staking = JSON.parse(localStorage.getItem('autodapp_contact_staking'))
    const stakingAbi = localStorage.getItem('autodapp_staking_abi')

    let zip = new JSZip();
    // zip.file("index.html", exportTemplate(data));
    zip.file("index.html", exportTemplate(data, 'style.css'));
    zip.file("staking.html", exportTemplate({...data, html: data.html2}, 'staking.css'));

    let css = zip.folder("css");
    // css.file("style.css", data.css);
    css.file("style.css", data.css);
    css.file("staking.css", data.css2);
    css.file("global.css", data.global.css);

    const scripts = localStorage.getItem('gjs-script')

    let customScripts = getLocal('gjs-scripts');
        customScripts = customScripts.length > 0 ? customScripts.map(c=>c.script+'\n').join('\n') : '';
        // ${dapp ? scripts : scripts ? scripts : script}
        customScripts = `window.addEventListener('DOMContentLoaded', () => {
            ${web3Script ? scripts : script}
        })`;
        // ${dapp ? `const stakingABI = ${stakingAbi}` : ''}
        // ${dapp ? `const tokenABI = ${abi}` : ''}
        // ${dapp ? `const token = '${token}'` : ''}
        // ${dapp ? `const staking = '${staking}'` : ''}
        //     ${dapp ? web3Script : web3Scripts}
        let web3Scripts = getLocal('web3-scripts');
        web3Scripts = web3Scripts.length > 0 ? web3Scripts.map(c=>c.script+'\n').join('\n') : '';
        web3Scripts = `window.addEventListener('DOMContentLoaded', () => {
            //Web3 Scripts here!
        ${`const stakingABI = ${stakingAbi}`}
        ${`const tokenABI = ${abi}`}
        ${`const token = '${token}'`}
        ${`const staking = '${staking}'`}
            ${web3Script}
        })`;
    
    let js = zip.folder("js");
    js.file("script.js", customScripts);
    js.file("web3.js", web3Scripts);
    js.file("global.js", data.global.js);
    return zip;
}

export const exportZip = (data) => {
    const dapp = localStorage.getItem('gjs-dapp')

    let zip = buildZipFolder(data)
    zip.generateAsync({ type: "blob" })
        .then(async function (content) {
            let fileName = 'AutoDapp-'+Date.now() + '-export.zip';
            saveAs(content, fileName);
            //remove option after downloading zip file
            localStorage.removeItem('gjs-dapp')
            localStorage.removeItem('autodapp_contact')
            localStorage.removeItem('autodapp_abi')
            localStorage.removeItem('autodapp_contact_staking')
            localStorage.removeItem('autodapp_staking_abi')
            localStorage.removeItem('preference_selected')
            if (dapp) {
                userApi.deleteOption('Dapp')
            } else {
                userApi.deleteOption('Template')
            }
        });
}

export const existingSites = () =>{
    return getLocal("gram-sites");
}

export const removeSite = (id) =>{
    let sites = existingSites();
    sites = sites.filter(e=>e.id !== id);
    addLocal("gram-sites",sites);
}

export const toggleActiveOfDomainList = () =>{
    const removeActiveClass = () => {
        const radios = document.querySelectorAll(".existing-sites input[name='deploy-domain']");
        radios.forEach(e=>{
            e.parentNode.classList.remove("active");
        })
    }

    const allRadios = document.querySelectorAll(".existing-sites input[name='deploy-domain']");
    allRadios.forEach(radio=>{
        radio.addEventListener("change",e=>{
            removeActiveClass();
            if(e.target.checked){
                localStorage.setItem('gram-deploying-site',e.target.parentNode.id);
                e.target.parentNode.classList.add("active");
            }
        })
    })
}

export const listOfSites = () =>{
    let sites = existingSites();
    if(sites.length === 0) return '<br /><small>No existing site yet.</small>';
    let siteList = '<ul>';
    siteList += sites.map(site=>{
        return `<li id="${site.id}"><input name="deploy-domain" value="${site.id}" type="radio"> <a href="${site.domain}" target="_blank">${site.domain}</a> <span class="fa fa-trash remove-domain"></span></li>`;
    }).join("");
    siteList += '</ul>';
    return siteList;
}

export const saveSites = (res) =>{
    const domain = 'https://'+ res.subdomain+'.netlify.app';
    const id = res.id;
    const sites = existingSites();
    sites.push({domain,id});
    addLocal('gram-sites',sites)
}

export const removeSiteFromNetlify = ({type,url,token,domain}) => {
    return new Promise((resolve,reject)=>{
        const options = {
            method:type,
            headers:{
                "Authorization":"Bearer "+token
            }
        }
        fetch(url, options)
        .then((res) => {
            if(!res.ok) {
                msg.error({
                    message: 'Something went wrong in deleting domain!'
                })
                return;
            };

                modalMessage({
                    message:`Deleted - ${domain}`,
                    type:'success'
                })
                
                resolve('deleted');
                msg.success({
                    message: 'Successfully deleted!'
                })

            }).catch(err=>{
            reject(String(err))
                msg.error({
                    message: String(err)
                })
        })
    })
}

export const deployToNetlify = ({type,url,content,token}) =>{
    
    let options = {
        method: type,
        headers: {
            'Content-Type': 'application/zip, */*',
            'Authorization': 'Bearer '+token
        },
        body: content
    };
    
    fetch(url, options).then(e => e.json())
    .then(async (res) => {
            
            if (!res?.subdomain) {
                msg.error({
                    message: 'The token is not correct'
                })
                return
            }
                
            if(type === 'POST'){
                saveSites(res);
            }

            let status = type === 'POST'?'Deployed':'Updated';

            modalMessage({
                message:`${status} domain - <a href="https://${res.subdomain}.netlify.app" target="_blank">https://${res.subdomain}.netlify.app</a>`,
                type:'success'
            })
        
            msg.success({
                message: 'Successfully '+status
            })
            //remove option after deployment to netlify

            eventByCloseModal()
    }).catch(err=>{
            msg.error({
                message: String(err)
            })
    })
}

export const eventByCloseModal = () =>{
    const dapp = localStorage.getItem('gjs-dapp')
      
    const handler = () => {
        document.querySelector(".form-modal").classList.add("hide");
        
        if (dapp) {
            localStorage.removeItem('gjs-dapp')
            localStorage.removeItem('autodapp_contact')
            localStorage.removeItem('autodapp_abi')
            localStorage.removeItem('autodapp_contact_staking')
            localStorage.removeItem('autodapp_staking_abi')
            localStorage.removeItem('preference_selected')
            userApi.deleteOption('Dapp')
        } else {
            userApi.deleteOption('Template')
        }
    }

    document.querySelector(".gjs-mdl-dialog").addEventListener('click', function(e){ e.stopPropagation()});
    document.querySelector(".gjs-mdl-btn-close").addEventListener('click', handler)
    document.querySelector(".form-modal").addEventListener('click', handler);
}


export const modalMessage = (obj) =>{
    const modalMessage     = document.querySelector(".modal-message");
    modalMessage.innerHTML = `<p class="msg-${obj.type}">${obj.message}</p>
    <p style="text-align:center;"><small>Please close and re-open this modal.</small></p>`;
    const gramForm     = document.querySelector(".gram-form");
    gramForm.classList.add("hide");
}

export const getUrl = ({type,site_id}) =>{
    if(type === 'POST'){
        return 'https://api.netlify.com/api/v1/sites';
    }else{
        return 'https://api.netlify.com/api/v1/sites/'+site_id;
    }
}

export const prepareDeployContent = (data) => {
   
    const {type,token} = data;
    let zip = buildZipFolder(data);
     zip.generateAsync({ type: "blob" })
        .then(function (content) {

            let url = getUrl(data);
            const deploy = {
                type,
                url,
                content,
                token
            }

            deployToNetlify(deploy);
        })
}

export const loadingSpinner = () => {
    let spinner_wrapper = document.querySelector(".spinner-wrapper")
    spinner_wrapper?.classList.remove('hide');

    setTimeout(() => {
        spinner_wrapper?.classList.add('hide');
    },6000)
}

export const getGlobalJsCss = async () =>{
    const global_css_url = 'autodapp/dist/global.css';
    const global_js_url  = 'autodapp/dist/global.js';
    
    const cssRes = await fetch(global_css_url);
    const css    = await cssRes.text();
    
    const jsRes  = await fetch(global_js_url);
    const js     = await jsRes.text();
    return {css,js};
}

export const getAllPages = async (editor) =>{
    const pageManager = editor.Pages;
    const pages = pageManager.getAll()
    const name = localStorage.getItem('template-name')
    
    let html = '';
    let html2 = '';
    let css = '';
    let css2 = '';
    let global = await getGlobalJsCss();

    const getPage = pageManager.get(pages[0].id)
    const getPage2 = pageManager.get(pages[1].id)

    await pageManager.select(getPage);
    html = editor.getHtml() || '';
    css = editor.getCss({ avoidProtected: true }) || '';
     
    await pageManager.select(getPage2);

    html2 = editor.getHtml() || '';
    css2 = editor.getCss({ avoidProtected: true }) || '';
    
    if (name) {
        const anotherPage = pages.find(page => page.id !== name)
        const currentPage = pages.find(page => page.id === name)
        if (!anotherPage) throw new Error("Something went wrong")
        
        const getCurrentPage = pageManager.get(currentPage?.id)
        pageManager.select(getCurrentPage);

        localStorage.removeItem('template-name')
    } else {
        const getCurrentPage = pageManager.get(pages[0].id)
        pageManager.select(getCurrentPage);
    }
    
    return { html, css, html2, css2, global };
}
