export const script = `async function connectMetamask() {
    let web3Provider = null;
    console.log("[web3] getting provider...");
    // Modern Browsers like Chrome and Brave
     console.log(window.ethereum);
    if (window.ethereum) {
        web3Provider = window.ethereum;
        try {
            // Request account access
            await window.ethereum.enable();
        } catch (error) {
            // User denied account access...
            alert("You must connect your metamask wallet !");
            console.error("User denied account access to metamask.");
            return;
        }
    } else {
        // you cant connect
        console.error("Unable to connect to metamask");
        alert(
        "You have to use Trustwallet or install Metamask to use this service, you can install it from :  https://metamask.io/download.html"
        );
        return;
    }
        
    let web3 = new Web3(window.ethereum);
    let accounts = await web3.eth.getAccounts();
    console.log("accounts : " + accounts);
    window.account = accounts[0];
    let res = accounts[0].slice(0, 10);
    document.querySelector(".btn-connect").innerHTML = res;

    return web3;
}

const btn = document.querySelector(".btn-connect")
const logoBtn = document.querySelector(".logo")

btn.addEventListener("click", connectMetamask);
logoBtn.addEventListener("click", function() {window.location.href='./index.html'});
`