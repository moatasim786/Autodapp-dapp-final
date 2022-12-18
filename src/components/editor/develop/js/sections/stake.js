const staking = `
          <h1>Staking</h1>
            <p class="text">
                Discover the platform that gives you the freedom to create, design, manage and develop your web presence
                exactly the way you want.
            </p>
            <div class="row padding-row-card">
                <div class="col">
                    <div class="card">
                        <div class="card-header">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <div class="card-title">Start Staking Now</div>
                        <div class="card-line"></div>
                        <div class="card-text">Welcome to AutoDApp staking!</div>
                        <div class="card-text-second"><span>Token Name Balance:</span><span class="card-balance">0.0000</span></div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <div class="card-header">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <div class="card-title">Stake Amount</div>
                        <div class="card-line"></div>
                        <div class="card-text">To Start staking, enter an amount and press “Stake!!”</div>
                        <div><input placeholder="Amount" type="number" class="stake-amount"/></div>
                        <div><button class="stake-confirm">Stake</button></div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <div class="card-header">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <div class="card-title">Start Staking Now</div>
                        <div class="card-line"></div>
                        <div class="card-text">Welcome to AutoDApp staking!</div>
                        <div><input placeholder="0x684d5a33d1f283f18005a0217c5efc4b77bc6acd" type="text" class="staking-address"/></div>
                        <div><a ><button class="view-staking">View Staking</button></a></div>
                    </div>
                </div>
            </div>
      <style>
    h1 {
      font-weight: 700;
      font-size: 48px;
      line-height: 120%;
      text-align: center;
      letter-spacing: -0.5px;
    }
    p {
    max-width: 862px;
    text-align: center;
    margin-top: 0px;
    margin-right: auto;
    margin-bottom: 48px;
    margin-left: auto;
}
    .text {
    font-weight: 500;
    font-size: 18px;
    line-height: 160%;
    letter-spacing: 0.004em;
    color: rgba(255, 255, 255, 0.8);
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
  .card-header {
    background-color: rgb(255, 109, 214);
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
input[type="number"]::-webkit-inner-spin-button {
    opacity: 1;
    width: 30px;
    height: 40px;
}

::-webkit-input-placeholder {
    color: rgb(255, 255, 255);
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

  @media (min-width: 1400px) {
    .padding-row-card {
        padding-top: 0px;
        padding-right: 100px;
        padding-bottom: 0px;
        padding-left: 100px;
      }
  }
  </style>`

export default staking;