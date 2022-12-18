import "./BurnFee.scss";

import ArrowUp from "../../image/arrow-up.svg";
import ArrowDown from "../../image/arrow-down.svg";
import Percents from "../../image/percents.svg";

const BurnFee = ({ burnFeeValue, setBurnFeeValue }) => {

    const handleChange = (e) => {
        const value = e.target.value;
        setBurnFeeValue(value);
    };

    const incBurnFeeValue = () => {
        if (burnFeeValue !== 100) {
            setBurnFeeValue(burnFeeValue + 1);
        }
    };

    const dicBurnFeeValue = () => {
        if (burnFeeValue !== 0) {
            setBurnFeeValue(burnFeeValue - 1);
        }
    };

    return <div className="burn-fee">
        <div className="burn-fee__number-field">
            <input type="text"
                value={burnFeeValue}
                onChange={handleChange}
                maxLength={2}
            />
            <div className="burn-fee__arrows">
                <div className="img-1">
                    <img src={ArrowUp}
                        alt="arrows"
                        onClick={incBurnFeeValue}
                    />
                </div>
                <div className="img-2">
                    <img src={ArrowDown}
                        alt="arrows"
                        onClick={dicBurnFeeValue}
                    />
                </div>
            </div>
        </div>
        <div className="burn-fee__percents">
            <img src={Percents} alt="persents" />
        </div>
    </div>
}

export default BurnFee;