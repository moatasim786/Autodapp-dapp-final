import Minus from "../../image/minus.svg";
import Plus from "../../image/plus.svg";

import "./IncDincField.scss";

const countTokens = ({
    incrementTokens,
    dicrementTokens,
    countTokens,
    setCountTokens
}) => {
    return <div className="inc-dinc-field">
        <div className="field">
            <div className="field-minus"
                onClick={dicrementTokens}
            >
                <img src={Minus} alt="minus" />
            </div>
            <input type="text"
                required
                value={countTokens}
                onChange={(e) => setCountTokens(e.target.value)}
            />
            <div className="field-plus"
                onClick={incrementTokens}
            >
                <img src={Plus} alt="plus" />
            </div>
        </div>
    </div>
}

export default countTokens;