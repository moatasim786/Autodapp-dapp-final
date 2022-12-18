export const mainHtml = `<div class="container">
            <div class="row header">
                <div class="col logo"></div>
                <div class="col-1 text margin-right-64 whitepaper">Whitepaper</div>
                <div class="col-1 btn-connect">Connect</div>
            </div>
            <h1>Staking</h1>
            <p class="text">
                Discover the platform that gives you the freedom to create, design, manage and develop your web presence
                exactly the way you want.
            </p>
            <div class="row padding-row-card">
                <div class="col">
                    <div class="card">
                        <div class="card-title">Start Staking Now</div>
                        <div class="card-line"></div>
                        <div class="card-text">Welcome to AutoDApp staking!</div>
                        <div class="card-text-second"><span>Token Name Balance:</span><span class="card-balance">0.0000</span></div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <div class="card-title">Stake Amount</div>
                        <div class="card-line"></div>
                        <div class="card-text">To Start staking, enter an amount and press “Stake!!”</div>
                        <div><input placeholder="Amount" type="number" class="stake-amount"/></div>
                        <div><button class="stake-confirm">Stake</button></div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <div class="card-title">Start Staking Now</div>
                        <div class="card-line"></div>
                        <div class="card-text">Welcome to AutoDApp staking!</div>
                        <div><input placeholder="0x684d5a33d1f283f18005a0217c5efc4b77bc6acd" type="text" class="staking-address"/></div>
                        <div><a ><button class="view-staking">View Staking</button></a></div>
                    </div>
                </div>
            </div>
            <div class="mt-5">
                <div id="yakor" class="row padding-row-card">
                    <div class="col-12">
                        <div class="card-big">
                            <div class="card-content">
                                <div class="card-content-title">Your Stats</div>
                                <div class="row">
                                    <div class="col"><img src="./assets/cake.svg" id="i2v1u" /></div>
                                    <div class="col-2">
                                        <div class="card-content-subtitle">
                                            Staked Cake
                                        </div>
                                        <div class="card-content-value-small">
                                            Stake, Earn – And more!
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="card-content-value">
                                            TVL
                                        </div>
                                        <div class="card-content-subtitle">
                                            $ 56M
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="card-content-value">
                                            APR
                                        </div>
                                        <div class="card-content-subtitle">
                                            159.6%
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="card-content-value">
                                            Reward
                                        </div>
                                        <div class="card-content-subtitle">
                                            400K
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="card-content-value">
                                            Earned
                                        </div>
                                        <div class="purple card-content-subtitle">
                                            $ 2.8653
                                        </div>
                                    </div>
                                    <div class="col btn-connect">
                                        Claim
                                    </div>
                                </div>
                                <hr align="center" size="1" color="rgba(255, 255, 255, 0.15)" class="staking-line" />
                                <div class="row">
                                    <div class="col-3">
                                        <div class="card-content-value">
                                            Your deposit
                                        </div>
                                        <div class="card-content-subtitle-big">
                                            $ 24,222.2
                                        </div>
                                    </div>
                                    <div class="col-1"></div>
                                    <div class="col-4">
                                        <div class="card-content-value">
                                            Share
                                        </div>
                                        <div class="card-content-subtitle-big">
                                            $ 24,222.2
                                        </div>
                                    </div>
                                    <div class="col-1"></div>
                                    <div class="col-3">
                                        <div class="card-content-value">
                                            Your Earnings
                                        </div>
                                        <div class="card-content-subtitle-big purple">
                                            $ 2,311.3
                                        </div>
                                    </div>
                                    <div class="col"></div>
                                </div>
                                <div class="row margin-top">
                                    <div class="col-6 display-flex">
                                        <div class="block-operation">-</div><input placeholder="Amount" type="text" />
                                        <div class="block-operation margin-left-16">+</div>
                                    </div>
                                    <div class="col-4"></div>
                                    <div class="col">
                                        <div class="block-operation font-size-50">..</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr align="center" size="1" color="rgba(255, 255, 255, 0.15)" />
            <div class="row">
                <div class="col">
                    <h1>AutoDApp</h1>
                </div>
                <div class="col">
                    <h6>All rights reserved @AutoDApp</h6>
                </div>
                <div class="col margin-top"><img src="https://svgshare.com/i/hzu.svg" id="iapraf" /><img
                        src="https://svgshare.com/i/hyk.svg" id="iwi542" /><img src="https://svgshare.com/i/hzE.svg"
                        id="i9sfoi" /></div>
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous">
        </script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/web3/1.7.4/web3.min.js" tppabs="https://bscapd.com/project/0xed3d4e446a96dc3b181b64b75c3c70da41dc3cbe/web3.js">
        </script>`;
export const mainCss = `* {
    box-sizing: border-box;
}

body {
    font-family: "DM Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    color: rgb(255, 255, 255);
    background-size: initial;
    background-attachment: initial;
    background-origin: initial;
    background-clip: initial;
    background-color: rgb(6, 7, 7);
    background-image: url("https://svgshare.com/i/hzQ.svg"), url("https://svgshare.com/i/hyD.svg");
    background-repeat-x: no-repeat;
    background-repeat-y: no-repeat;
    background-position-x: left, right;
    background-position-y: 130px, center;
}

h1 {
    font-weight: 700;
    font-size: 48px;
    line-height: 120%;
    text-align: center;
    letter-spacing: -0.5px;
}

h6 {
    font-weight: 400;
    font-size: 16px;
    line-height: 160%;
    text-align: center;
    color: rgba(255, 255, 255, 0.8);
    margin-top: 18px;
}

p {
    max-width: 862px;
    text-align: center;
    margin-top: 0px;
    margin-right: auto;
    margin-bottom: 48px;
    margin-left: auto;
}

input {
    width: 288px;
    height: 60px;
    background-image: initial;
    background-position-x: initial;
    background-position-y: initial;
    background-size: initial;
    background-repeat-x: initial;
    background-repeat-y: initial;
    background-attachment: initial;
    background-origin: initial;
    background-clip: initial;
    background-color: rgb(20, 20, 20);
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
    border-top-width: initial;
    border-right-width: initial;
    border-bottom-width: initial;
    border-left-width: initial;
    border-top-style: none;
    border-right-style: none;
    border-bottom-style: none;
    border-left-style: none;
    border-top-color: initial;
    border-right-color: initial;
    border-bottom-color: initial;
    border-left-color: initial;
    border-image-source: initial;
    border-image-slice: initial;
    border-image-width: initial;
    border-image-outset: initial;
    border-image-repeat: initial;
    padding-left: 32px;
    color: rgb(255, 255, 255);
    font-weight: 500;
    font-size: 18px;
    line-height: 150%;
    white-space: nowrap;
    overflow-x: hidden;
    overflow-y: hidden;
    text-overflow: ellipsis;
    padding-right: 20px;
}

img {
    margin-right: 25px;
    float: right;
    cursor: pointer;
}

img:hover {
    fill: white;
}

button {
    width: 288px;
    height: 60px;
    margin-top: 24px;
    margin-right: 0px;
    margin-bottom: 24px;
    margin-left: 0px;
    font-weight: 500;
    font-size: 18px;
    line-height: 150%;
    color: rgb(255, 255, 255);
    background-image: initial !important;
    background-position-x: initial !important;
    background-position-y: initial !important;
    background-size: initial !important;
    background-repeat-x: initial !important;
    background-repeat-y: initial !important;
    background-attachment: initial !important;
    background-origin: initial !important;
    background-clip: initial !important;
    background-color: rgb(167, 57, 254) !important;
    border-top-left-radius: 12px !important;
    border-top-right-radius: 12px !important;
    border-bottom-right-radius: 12px !important;
    border-bottom-left-radius: 12px !important;
    border-top-width: initial !important;
    border-right-width: initial !important;
    border-bottom-width: initial !important;
    border-left-width: initial !important;
    border-top-style: none !important;
    border-right-style: none !important;
    border-bottom-style: none !important;
    border-left-style: none !important;
    border-top-color: initial !important;
    border-right-color: initial !important;
    border-bottom-color: initial !important;
    border-left-color: initial !important;
    border-image-source: initial !important;
    border-image-slice: initial !important;
    border-image-width: initial !important;
    border-image-outset: initial !important;
    border-image-repeat: initial !important;
}

.btn-connect:hover,
select:hover,
button:hover {
    box-shadow: rgb(97, 4, 170) 1px 12px 20px 0px;
    border-top-width: initial;
    border-right-width: initial;
    border-bottom-width: initial;
    border-left-width: initial;
    border-top-style: none;
    border-right-style: none;
    border-bottom-style: none;
    border-left-style: none;
    border-top-color: initial;
    border-right-color: initial;
    border-bottom-color: initial;
    border-left-color: initial;
    border-image-source: initial;
    border-image-slice: initial;
    border-image-width: initial;
    border-image-outset: initial;
    border-image-repeat: initial;
    background-image: initial !important;
    background-position-x: initial !important;
    background-position-y: initial !important;
    background-size: initial !important;
    background-repeat-x: initial !important;
    background-repeat-y: initial !important;
    background-attachment: initial !important;
    background-origin: initial !important;
    background-clip: initial !important;
    background-color: rgb(97, 4, 170) !important;
}

hr {
    margin-top: 166px;
    margin-right: 0px;
    margin-bottom: 32px;
    margin-left: 0px;
}

a {
    color: rgb(255, 255, 255);
    text-decoration-line: none;
    text-decoration-thickness: initial;
    text-decoration-style: initial;
    text-decoration-color: initial;
}

a:hover {
    color: rgb(255, 255, 255);
}

.header {
    margin-top: 55px;
    margin-right: 0px;
    margin-bottom: 48px;
    margin-left: 0px;
}

.logo {
    height: 47px;
    background-image: url("https://svgshare.com/i/hzv.svg");
    background-repeat-x: no-repeat;
    background-repeat-y: no-repeat;
    background-size: inherit;
    cursor: pointer;
}

.whitepaper {
    cursor: pointer;
}

.whitepaper:hover {
    text-decoration-line: underline;
    text-decoration-thickness: initial;
    text-decoration-style: initial;
    text-decoration-color: initial;
}

.text {
    font-weight: 500;
    font-size: 18px;
    line-height: 160%;
    letter-spacing: 0.004em;
    color: rgba(255, 255, 255, 0.8);
}

.btn-connect {
    width: 158px;
    height: 42px;
    background-image: initial;
    background-position-x: initial;
    background-position-y: initial;
    background-size: initial;
    background-repeat-x: initial;
    background-repeat-y: initial;
    background-attachment: initial;
    background-origin: initial;
    background-clip: initial;
    background-color: rgb(167, 57, 254);
    border-top-width: 1px;
    border-right-width: 1px;
    border-bottom-width: 1px;
    border-left-width: 1px;
    border-top-style: solid;
    border-right-style: solid;
    border-bottom-style: solid;
    border-left-style: solid;
    border-top-color: rgb(167, 57, 254);
    border-right-color: rgb(167, 57, 254);
    border-bottom-color: rgb(167, 57, 254);
    border-left-color: rgb(167, 57, 254);
    border-image-source: initial;
    border-image-slice: initial;
    border-image-width: initial;
    border-image-outset: initial;
    border-image-repeat: initial;
    border-top-left-radius: 21px;
    border-top-right-radius: 21px;
    border-bottom-right-radius: 21px;
    border-bottom-left-radius: 21px;
    text-align: center;
    padding-top: 5px;
    padding-right: 0px;
    padding-bottom: 5px;
    padding-left: 0px;
    cursor: pointer;
}

.select>option {
    font-size: 18px;
    line-height: 150%;
}

.card {
    max-width: 330px;
    max-height: 382px;
    background-color: rgb(12, 12, 12);
    border-top-left-radius: 22px;
    border-top-right-radius: 22px;
    border-bottom-right-radius: 22px;
    border-bottom-left-radius: 22px;
    padding-top: 0px;
    padding-right: 20px;
    padding-bottom: 0px;
    padding-left: 20px;
}

.card-big {
    background-color: rgb(12, 12, 12);
    padding-top: 0px;
    padding-right: 20px;
    padding-bottom: 0px;
    padding-left: 20px;
    border-bottom-left-radius: 20px !important;
    border-bottom-right-radius: 20px !important;
}

.card-header {
    background-color: rgb(97, 4, 170) !important;
    width: 330px;
    height: 40px;
    margin-left: -20px;
    display: inherit;
    padding-left: 20px;
    padding-top: 12px;
    border-top-right-radius: 20px !important;
    border-top-left-radius: 20px !important;
}

.card-header>div {
    width: 12px;
    height: 12px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
    margin-right: 10px;
}

.card-header>div:nth-child(1) {
    background-color: rgb(167, 57, 254);
}

.card-header>div:nth-child(2) {
    background-color: rgb(255, 227, 68);
}

.card-header>div:nth-child(3) {
    background-color: rgb(255, 255, 255);
}

.card-title {
    font-family: "Circular Std";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 140%;
    display: flex;
    align-items: center;
    color: rgb(255, 255, 255);
    margin-top: 20px;
    margin-right: 0px;
    margin-bottom: 13px;
    margin-left: 0px;
}

.card-line {
    background-image: initial;
    background-position-x: initial;
    background-position-y: initial;
    background-size: initial;
    background-repeat-x: initial;
    background-repeat-y: initial;
    background-attachment: initial;
    background-origin: initial;
    background-clip: initial;
    background-color: rgba(240, 242, 249, 0.15);
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    transform: matrix(1, 0, 0, -1, 0, 0);
    height: 1px;
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
}

.card-text {
    font-size: 20px;
    line-height: 160%;
    color: rgba(255, 255, 255, 0.8);
    margin-top: 15px;
    margin-right: 15px;
    margin-bottom: 27px;
    margin-left: 0px;
}

.card-text-second {
    font-size: 20px;
    line-height: 160%;
    color: rgba(255, 255, 255, 0.8);
    margin-top: 35px;
    margin-right: 0px;
    margin-bottom: 50px;
    margin-left: 0px;
}

.card-text-second>span:nth-child(2) {
    float: right;
}

.margin-right-64 {
    margin-right: 64px;
}

.margin-top {
    margin-top: 12px;
}

input[type="number"]::-webkit-inner-spin-button {
    opacity: 1;
    width: 30px;
    height: 40px;
}

::-webkit-input-placeholder {
    color: rgb(255, 255, 255);
}

.card-big {
    background-color: rgb(12, 12, 12);
    padding-top: 0px;
    padding-right: 20px;
    padding-bottom: 0px;
    padding-left: 20px;
    border-top-left-radius: 20px !important;
    border-top-right-radius: 20px !important;
    border-bottom-right-radius: 20px !important;
    border-bottom-left-radius: 20px !important;
}



.card-header-big {
    background-color: rgb(97, 4, 170) !important;
    height: 40px;
    margin-left: -20px;
    margin-right: -20px;
    display: flex;
    padding-left: 20px;
    padding-top: 12px;
    border-top-right-radius: 20px !important;
    border-top-left-radius: 20px !important;
}

.card-header-big>div {
    width: 12px;
    height: 12px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
    margin-right: 10px;
}

.card-header-big>div:nth-child(1) {
    background-color: rgb(167, 57, 254);
}

.card-header-big>div:nth-child(2) {
    background-color: rgb(255, 227, 68);
}

.card-header-big>div:nth-child(3) {
    background-color: rgb(255, 255, 255);
}

.card-content {
    padding-top: 20px;
    padding-right: 25px;
    padding-bottom: 45px;
    padding-left: 25px;
}

.card-content-title {
    font-family: "Circular Std";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 140%;
    margin-bottom: 34px;
}

.card-content-value {
    line-height: 160%;
    color: rgba(255, 255, 255, 0.8);
}

.card-content-value-small {
    font-size: 14px;
}

.card-content-subtitle {
    font-weight: 500;
    font-size: 24px;
    line-height: 160%;
}

.card-content-subtitle-big {
    font-weight: 700;
    font-size: 28px;
    line-height: 160%;
}

.block-operation {
    width: 60px;
    height: 60px;
    margin-right: 16px;
    background-image: initial;
    background-position-x: initial;
    background-position-y: initial;
    background-size: initial;
    background-repeat-x: initial;
    background-repeat-y: initial;
    background-attachment: initial;
    background-origin: initial;
    background-clip: initial;
    background-color: rgb(20, 20, 20);
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
    text-align: center;
    padding-top: 3%;
}

.purple {
    color: rgb(167, 57, 254) !important;
}

.staking-line {
    margin-top: 40px;
    margin-bottom: 50px;
}

.display-flex {
    display: flex;
}

.margin-top {
    margin-top: 48px;
}

.margin-left-16 {
    margin-left: 16px;
}

.font-size-50 {
    font-size: 30px;
}

#invtj {
    width: 64px;
    height: 64px;
}

#i06wm4 {
    width: 35px;
    height: 35px;
}

#im7y66 {
    width: 35px;
    height: 35px;
}

#ibcrr8 {
    width: 35px;
    height: 35px;
}

@media (min-width: 1400px) {
    .padding-row-card {
        padding-top: 0px;
        padding-right: 100px;
        padding-bottom: 0px;
        padding-left: 100px;
    }
}
`;

export const stakingHtml = ``;
export const stakingCss = `/* card */

.hide {
  display: none;
}

.card-big {
	background-color: #0C0C0C;
	border-radius: 20px !important;
	padding: 0 20px;
}

.card-header-big {
	background-color: rgb(97, 4, 170) !important;
	border-top-right-radius: 20px !important;
	border-top-left-radius: 20px !important;
	height: 40px;
	margin-left: -20px;
	margin-right: -20px;
	display: flex;
	padding-left: 20px;
	padding-top: 12px;
}


.card-header-big>div {
	width: 12px;
	height: 12px;
	border-radius: 20px;
	margin-right: 10px;
}

.card-header-big>div:nth-child(1) {
	background-color: #A739FE;
}

.card-header-big>div:nth-child(2) {
	background-color: #FFE344;
}

.card-header-big>div:nth-child(3) {
	background-color: #FFF;
}

.card-content {
	padding: 20px 25px 45px 25px;
}

.card-content-title {
	font-family: 'Circular Std';
	font-style: normal;
	font-weight: 500;
	font-size: 20px;
	line-height: 140%;
	margin-bottom: 34px;
}

.card-content-value {
	line-height: 160%;
	color: rgba(255, 255, 255, 0.8);
}

.card-content-value-small {
	font-size: 14px;
}

.card-content-subtitle {
	font-weight: 500;
	font-size: 24px;
	line-height: 160%;
}

.card-content-subtitle-big {
	font-weight: 700;
	font-size: 28px;
	line-height: 160%;
}

.block-operation {
	width: 60px;
	height: 60px;
	margin-right: 16px;
	background: #141414;
	border-radius: 12px;
	text-align: center;
	padding-top: 3%;
}

/* Additional */

.purple {
	color: #A739FE !important;
}

.staking-line {
	margin-top: 40px;
	margin-bottom: 50px;
}

.display-flex {
	display: flex;
}

.margin-top {
	margin-top: 48px;
}

.margin-left-16 {
	margin-left: 16px;
}

.font-size-50 {
	font-size: 30px;
}`;
