import "./HoldersRewardFee.scss";

import ArrowUp from "../../image/arrow-up.svg";
import ArrowDown from "../../image/arrow-down.svg";
import Percents from "../../image/percents.svg";

const HoldersRewardFee = ({ holdersRewardFeeValue, setHoldersRewardFeeValue }) => {

    const handleChange = (e) => {
        const value = e.target.value;
        setHoldersRewardFeeValue(value);
    };

    const incHoldersRewardFeeValue = () => {
        if (holdersRewardFeeValue !== 100) {
            setHoldersRewardFeeValue(holdersRewardFeeValue + 1);
        }
    };

    const dicHoldersRewardFeeValue = () => {
        if (holdersRewardFeeValue !== 0) {
            setHoldersRewardFeeValue(holdersRewardFeeValue - 1);
        }
    };

    return <div className="holders-reward-fee">
        <div className="holders-reward-fee__number-field">
            <input type="text"
                value={holdersRewardFeeValue}
                onChange={handleChange}
                maxLength={2}
            />
            <div className="holders-reward-fee__arrows">
                <div className="img-1">
                    <img src={ArrowUp}
                        alt="arrows"
                        onClick={incHoldersRewardFeeValue}
                    />
                </div>
                <div className="img-2">
                    <img src={ArrowDown}
                        alt="arrows"
                        onClick={dicHoldersRewardFeeValue}
                    />
                </div>
            </div>
        </div>
        <div className="holders-reward-fee__percents">
            <img src={Percents} alt="percents" />
        </div>
    </div>
}

export default HoldersRewardFee;