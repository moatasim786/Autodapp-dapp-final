import 'notyf/notyf.min.css';
import './index.css'

import {addLocal, getLocal} from './develop/js/helpers/index'
import { checkExtension, loadingSpinner } from './develop/js/helpers/index.js'
import { loadLocal, saveLocal } from '../utils';
import { mainCss, mainHtml, stakingCss, stakingHtml } from "./develop/js/config/template"

import Modal from '../modals/dappModal';
import { Notyf } from 'notyf'
import React from 'react'
import assetManager from './develop/js/config/assetManager'
import blockManager from './develop/js/config/blockManager'
import buttons from './develop/js/config/buttons'
import customScripts from './develop/js/config/customScripts'
import dependencyCDNLinks from './develop/js/config/dependencyCDNLinks'
import grapesjs from "grapesjs"
import { linkBlock } from './develop/js/config/plugins';
import {script} from './develop/js/defaultScript'
import sectionDependencies from './develop/js/config/sectionDependencies'
import styleManager from './develop/js/config/styleManager'

class AutoDappClassComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {open: false}

        this.msg = new Notyf({
            duration: 3000,
            position: {
                x: 'center',
                y: 'top'
            }
        });
        this.config = {
            allowScripts: 1,
            showOffsets: 1,
            autorender: 0,
            noticeOnUnload: 0,
            container: '#gjs',
            height: '100%',
            fromElement: true,
            clearOnRender: 0,
            protectedCss:'.iframe-wrapper{padding-bottom:30px;}section:last-child{margin-bottom:30px}',
            pageManager: {
                current: 2,
                pages: [
                    {
                    id: 'main-1',
                    name: 'Main',
                    styles: mainCss, // or a JSON of styles
                    component: mainHtml, // or a JSON of components
                    },
                    {
                    id: 'staking-2',
                    name: 'Staking',
                    styles: stakingCss, // or a JSON of styles
                    component: stakingHtml, // or a JSON of components
                    }
                ]
            },
            plugins: [linkBlock],
            canvas: {
                styles: [
                    'https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap',
                    'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.2/css/bootstrap.min.css',
                    'https://cdnjs.cloudflare.com/ajax/libs/line-awesome/1.3.0/font-awesome-line-awesome/css/all.min.css',
                    'autodapp/dist/global.css'
                ],
                scripts: [
                    'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.2/js/bootstrap.min.js',
                    'autodapp/dist/global.js',
                ],
            },
            // commands,
            assetManager,
            blockManager,
            styleManager,
            storageManager: {
                id: 'gjs-',
                type: 'local',
                autosave: 1,
                autoload: 1,
                stepsBeforeSave: 1,
                storeComponents: 1,
                storeStyles: 1,
                storeHtml: 1,
                storeCss: 1,
            }
            
        }
        this.appendDependencies();
    }

    codeImportModal() {

        // ---------------------
        // Import/Edit
        // ---------------------
        let prefix = this.editor.getConfig().stylePrefix;

        let modal_content_wrapper = document.createElement("div");
        modal_content_wrapper.id = "modal-wrapper";

        let btnEdit = document.createElement("button");
        let copyHtml = document.createElement("button");
        let copyCss = document.createElement("button");
        let exportTxt = document.createElement("button");
        let fileLoader = document.createElement("label");
        let anchor = document.createElement("a");
        let header_menus = document.createElement("div");
        let fileLoadInput = document.createElement("input");
        fileLoadInput.style.display = 'none';
        fileLoadInput.setAttribute('type', 'file');

        let htmlCodeEditor = this.buildCodeEditor('html');
        let cssCodeEditor = this.buildCodeEditor('css');
        let jsCodeEditor = this.buildCodeEditor('js');
        
        btnEdit.innerHTML = '<i class="fa fa-code"></i> Apply & close';
        copyHtml.innerHTML = '<i class="fa fa-copy"></i> Copy HTML';
        copyCss.innerHTML = '<i class="fa fa-copy"></i> Copy CSS';
        fileLoader.appendChild(fileLoadInput);

        header_menus.className = 'header-menus';
        fileLoader.className = prefix + 'import-file';
        btnEdit.className = 'btn ' + prefix + 'btn-import';
        copyHtml.className = 'btn ' + prefix + 'btn-html';
        copyCss.className = 'btn ' + prefix + 'btn-css';
        exportTxt.className = 'btn ' + prefix + 'btn-export';


        fileLoadInput.onchange = (e) => {
            let currentFile = e.target.files[0];
            let fType = checkExtension(currentFile['name']);
            if (currentFile === undefined) {
                this.msg.error('Please select a file');
                return;
            }
            const allowFileType = ['txt'];
            if (!allowFileType.includes(fType)) {
                this.msg.error('You can only import or .txt extension');
                return;
            }
            let reader = new FileReader();
            reader.onload = (e) => {
                let fileData = e.target.result;
                this.editor.DomComponents.getWrapper().set('content', '');
                this.editor.setComponents(fileData);
                this.modal.close();
            }
            reader.readAsText(currentFile);
        }

        // import button inside import editor
        btnEdit.onclick = () => {
            let htmlCode = htmlCodeEditor.editor.getValue();
            let cssCode = cssCodeEditor.editor.getValue();
            let jsCode = jsCodeEditor.editor.getValue();
            localStorage.setItem('gjs-script', jsCode)
            this.editor.DomComponents.getWrapper().set('content', '');
            this.editor.setComponents(htmlCode.trim() + '<style>' + cssCode.trim() + '</style>');
            this.modal.close();
        };

        copyHtml.onclick = () => {
            let htmlCodes = htmlCodeEditor.editor.getValue();
            let dummy = document.createElement("input");
            document.body.appendChild(dummy);
            dummy.setAttribute('value', htmlCodes);
            dummy.select();
            document.execCommand("copy");
            document.body.removeChild(dummy);
            document.execCommand('copy');
            this.msg.success('You have copied HTML codes!');
        };

        copyCss.onclick = () => {
            let cssCodes = cssCodeEditor.editor.getValue();
            let dummy = document.createElement("input");
            document.body.appendChild(dummy);
            dummy.setAttribute('value', cssCodes);
            dummy.select();
            document.execCommand("copy");
            document.body.removeChild(dummy);
            document.execCommand('copy');
            this.msg.success('You have copied CSS codes!');
        };

        // onclick save as button inside import editor
        exportTxt.onclick = () => {
            let InnerHtml = this.editor.getHtml();
            let Css = this.editor.getCss({ avoidProtected:true });
            let Js = this.editor.getJs();
            let text = InnerHtml + "<style>" + Css + '</style>' + Js;
            let blob = new Blob([text], {
                type: "text/plain"
            });
         //   anchor.download = "download.gram";
            anchor.href = window.URL.createObjectURL(blob);
            anchor.target = "_blank";
            anchor.style.display = "none"; // just to be safe!
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
        }


  //      header_menus.appendChild(fileLoader);
  //      header_menus.appendChild(exportTxt)
        header_menus.appendChild(copyHtml);
        header_menus.appendChild(copyCss);
        header_menus.appendChild(btnEdit);

        this.editor.Commands.add('html-reset-default', {
             run: (editor, sender) => {
                sender && sender.set('active', 0);
                localStorage.setItem('gjs-script', script)
                this.editor.DomComponents.getWrapper().set('content', '');
                this.editor.setComponents(mainHtml.trim() + '<style>' + mainCss.trim() + '</style>');
             }
        })
        
        this.editor.Commands.add('set_contracts', {
             run: (editor, sender) => {
                this.setState({open: !this.state.open})
             }
        })
        // import nav button click event
        this.editor.Commands.add('html-edit', {
            run: (editor, sender) => {
                sender && sender.set('active', 0);

                let html_textarea_box = document.createElement('textarea');
                let css_textarea_box = document.createElement('textarea');
                let js_textarea_box = document.createElement('textarea');

                let htmlBox = document.createElement('div');
                htmlBox.className = 'html-wrapper';
                htmlBox.innerHTML = "<h4>HTML</h4>";
                htmlBox.appendChild(html_textarea_box);

                let cssBox = document.createElement('div');
                cssBox.className = 'css-wrapper';
                cssBox.innerHTML = "<h4>CSS</h4>";
                cssBox.appendChild(css_textarea_box);

                let jsBox = document.createElement('div');
                jsBox.className = 'js-wrapper';
                jsBox.innerHTML = "<h4>JS</h4>";
                jsBox.appendChild(js_textarea_box);

                let headline = document.createElement('div');
                headline.className = 'clear-fix';

                if (!htmlCodeEditor.editor && !cssCodeEditor.editor && !jsCodeEditor.editor) {
                    modal_content_wrapper.appendChild(header_menus);
                    modal_content_wrapper.appendChild(headline);
                    modal_content_wrapper.appendChild(htmlBox);
                    modal_content_wrapper.appendChild(cssBox);
                    modal_content_wrapper.appendChild(jsBox);
                    htmlCodeEditor.init(html_textarea_box);
                    cssCodeEditor.init(css_textarea_box);
                    jsCodeEditor.init(js_textarea_box);
                }
                
                this.modal.setTitle('Edit and Import');
                this.modal.setContent('');
                this.modal.setContent(modal_content_wrapper);
                htmlCodeEditor.setContent(editor.getHtml());
                cssCodeEditor.setContent(editor.getCss({ avoidProtected: true }));

                const js = localStorage.getItem('gjs-script')

                if (js) {
                    jsCodeEditor.setContent(js);
                } else {
                    jsCodeEditor.setContent(script);
                }
                
                this.modal.open();
                htmlCodeEditor.editor.refresh();
                cssCodeEditor.editor.refresh();
                jsCodeEditor.editor.refresh();
            }
        });

    }

    buildCodeEditor = (type) => {
        let codeEditor = this.editor.CodeManager.getViewer('CodeMirror').clone();
        codeEditor.set({
            codeName: type === 'html' ? 'htmlmixed' : 'css',
            readOnly: 0,
            theme: 'hopscotch',
            autoBeautify: true,
            autoCloseTags: true,
            autoCloseBrackets: true,
            lineWrapping: true,
            styleActiveLine: true,
            smartIndent: true,
            indentWithTabs: true
        });
        return codeEditor;
    }

    appendDependencies (){

        let dependencies = getLocal("gram-dependencies");

        let links   = dependencies.map(d=>d.css);
        let scripts = dependencies.map(d=>d.js);

        // Append dependencies 

        for(let l of links){      
            this.config.canvas.styles.push(l);
        }

       for(let s of scripts){
            this.config.canvas.scripts.push(s);
        }

    }

    
    appendCustomScript = () =>{
        // Append Custom Script
       let doc = this.editor.Canvas.getDocument();
       let gjsScripts = getLocal("gjs-scripts");
       for(let s of gjsScripts){
        const scriptEl     = document.createElement('script');
         scriptEl.className = `${s.name}-script`;
         scriptEl.innerHTML = `window.addEventListener('DOMContentLoaded', (event) => {
            ${s.script}
         })`;
         doc.body.appendChild(scriptEl);
       }
     
    }

    addDependency = (dependency) =>{

            let doc = this.editor.Canvas.getDocument();
            const appendDependency = () => {
                return new Promise((resolve,reject)=>{
                  
                  let dependencies = getLocal('gram-dependencies');                  
                  let isDependencyExit = dependencies.filter(d=>d.name === dependency);
      
                  if(isDependencyExit.length !== 0){
                     resolve(dependency);
                     return;
                  }
      
                 let ds = dependencyCDNLinks.find(d => d.name === dependency );

                 if(!ds){
                     resolve('skip');
                     return;
                 }

                    const link     = document.createElement("link");
                    link.rel       = 'stylesheet';
                    link.className = ds.name+'-script';
                    link.href      = ds.css;
                    doc.head.appendChild(link)
        
                    const script     = document.createElement("script");
                    script.src       = ds.js;
                    script.className = ds.name+'-script';
                    doc.body.appendChild(script);

                    dependencies.push(ds)
      
      
                  addLocal('gram-dependencies',dependencies)
      
                  resolve(script);
      
                })
              }
      
              appendDependency().then((dep)=>{
                if(dep === dependency) return;
            

                let cScripts           = getLocal('gjs-scripts');                  
                let isCustomScriptExit = cScripts.filter(d=>d.name === dependency);
    
                if(isCustomScriptExit.length !== 0){
                   return;
                }

                // Append custom script after the cdn script loaded
                dep.addEventListener('load',()=>{

                    const customScript = document.createElement("script");
                    customScript.innerHTML = customScripts(dependency);
                    customScript.className = `${dependency}-script`;
                    doc.body.appendChild(customScript);
                      
                    let customScriptArr = getLocal('gjs-scripts');                      
                        customScriptArr.push({
                            name:dependency,
                            script:customScript.innerHTML
                        })
                          
                    addLocal('gjs-scripts',customScriptArr);
                })
                    
              })        
    }

    removeDependency (dependency){
        let doc = this.editor.Canvas.getDocument();

        let customScript = getLocal('gjs-scripts');
       // Custom scripts
        for(let custom of customScript){
            let allCustomScripts = doc.querySelectorAll(`.${custom.name}-script`);
            allCustomScripts.forEach(e=>e.outerHTML = '')
        }
        customScript = customScript.filter(c=>c.name !== dependency);
        addLocal('gjs-scripts',customScript);


        // Dependencies / plugins
        let dependencies = getLocal('gram-dependencies');
        if(dependencies.length === 0) return;

        for(let dp of dependencies){
            let allScripts = doc.querySelectorAll(`.${dp.name}-script`);
            allScripts.forEach(e=>e.outerHTML = '')
        }
        
        dependencies = dependencies.filter(d=>d.name !== dependency);
        addLocal('gram-dependencies',dependencies);

    }

    listenAddDependencies = () =>{

        this.editor.on('component:add', component => {
            let section = component.attributes.attributes.id;

            let hasDependency = sectionDependencies.filter(e=>e.name === section);
            if(hasDependency.length !== 0){
                let dependency = hasDependency[0].dependencies[0];
                this.addDependency(dependency);
            }
        });  
    }

    listenRemoveDependencies = () =>{
        this.editor.on('component:remove',component => {
            let section = component.attributes.attributes.id;
            let hasDependency = sectionDependencies.filter(e=>e.name === section);
            if(hasDependency.length !== 0){
                let dependency = hasDependency[0].dependencies[0];
                this.removeDependency(dependency);
            }
        });
    }

    

    saveContract = () =>{
        const contract = document.querySelector('.contact_input')?.value

        if (!contract) {
            return alert('Write a contact address before save')
        }

        saveLocal('autodapp_contact', contract)
    }
    
    init() {
        this.editor = grapesjs.init(this.config);
        this.editor.Panels.addButton('commands', [
            {
                id: 'dashboard-btn',
                className: 'dashboard-btn',
                command: function (editor, sender) {
                    window.location.href = "/";
                    localStorage.removeItem('gjs-dapp')
                },
                attributes: {
                    title: 'Back to Dashboard'
                },
                label: '<i class="fa-solid fa-arrow-left"></i> Back'
            },
        ]);
        this.editor.Panels.addButton('commands', [
            {
                id: "logo",
                className: "logoBuilder",
                attributes: { title: "AutoDApp" },
            },
        ]);
        this.editor.Panels.addButton('options', buttons);
        this.modal = this.editor.Modal;
        this.codeImportModal();
        this.editor.Panels.removeButton('options', 'export-template', );
        this.editor.on('load', (editor) => {
            editor.Panels.getButton('views', 'open-blocks').set('active', true)
            editor.BlockManager.getCategories().each((ctg) => {
                if (ctg.attributes.id === 'Sections') {
                    return;
                }
                ctg.set('open', false);
            });
        
            // ----------------------------------------
            // Load and show settings and style manager
            // ----------------------------------------
            let openTmBtn = editor.Panels.getButton('views', 'open-tm');
            openTmBtn && openTmBtn.set('active', 1);
            let openSm = editor.Panels.getButton('views', 'open-sm');
            openSm && openSm.set('active', 1);

            // Add Settings Sector
            let traitsSector = document.createElement('div');
            traitsSector.innerHTML = '<div class="gjs-sm-sector no-select">' +
                '<div class="gjs-sm-title"><span class="icon-settings fa fa-cog"></span> Settings</div>' +
                '<div class="gjs-sm-properties" style="display: none;"></div></div>';
            let traitsProps = traitsSector.querySelector('.gjs-sm-properties');
            traitsProps.append(document.querySelector('.gjs-trt-traits'));
            document.querySelector('.gjs-sm-sectors').insertAdjacentElement('beforebegin', traitsSector);
            traitsSector.querySelector('.gjs-sm-title').addEventListener('click', () => {
                let traitStyle = window.getComputedStyle(traitsProps);
                let hidden = traitStyle.display === 'none';
                if (hidden) {
                    traitsProps.style.display = 'block';
                } else {
                    traitsProps.style.display = 'none';
                }

            });

            this.appendCustomScript();
        });
  
        this.editor.getWrapper().addClass('iframe-wrapper');
        this.editor.render();
        this.listenAddDependencies();
        this.listenRemoveDependencies();
    }
    
    componentDidMount() {
        this.init()
        loadingSpinner();

        if (this.props.option) {
            saveLocal('gjs-dapp', this.props.option)
            // const contract = loadLocal('autodapp_contact')

            // if (!contract) {
            //     document.querySelector('.input_container').style.display = 'flex'
            // }
        }
    }
    
    render() {
        return (
            <>
                <div className="spinner-wrapper">
                    <div className="spinner"></div>Loading!
                </div>
                <Modal open={this.state.open} setOpen={() => this.setState({open: false})}/>
                {/* <div className="input_container">
                    <input type="text" className="contact_input" placeholder="input your contact address" />
                    <button className="contract_save" onClick={this.saveContract}>Save</button>
                </div> */}
                <div id="gjs" style={{height:0, overflow: 'hidden'}}></div>
            </>
        )
    }
}

export default AutoDappClassComponent;