import Minus from "../../image/minus.svg";
import Plus from "../../image/plus.svg";

import "./IncDincField.scss";

const countSymbols = ({
    incrementSymbols,
    dicrementSymbols,
    countSymbolsAfter,
    setCountSymbolsAfter
}) => {
    return <div className="inc-dinc-field">
        <div className="field">
            <div className="field-minus"
                onClick={dicrementSymbols}
            >
                <img src={Minus} alt="minus" />
            </div>
            <input type="text"
                value={countSymbolsAfter}
                onChange={(e) => setCountSymbolsAfter(e.target.value)}
            />
            <div className="field-plus"
                onClick={incrementSymbols}
            >
                <img src={Plus} alt="plus" />
            </div>
        </div>
    </div>
}

export default countSymbols;