import "./TokenCard.scss";

import classNames from "classnames";

const TokenCard = ({ activeToken, setActiveToken, ...i }) => {
    return <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
        <div onClick={() => setActiveToken(i.route)}>
            <div className={classNames("card token-card", {
                "token-card--active": activeToken === i.route
            })}>
                <div className="card-body d-flex align-items-center">
                    <div className="card-circle">
                        <img src={i.image} alt="img" />
                    </div>
                    <div className="card-title">
                        {i.name}
                    </div>
                </div>
            </div>
        </div>
    </div>

}

export default TokenCard;