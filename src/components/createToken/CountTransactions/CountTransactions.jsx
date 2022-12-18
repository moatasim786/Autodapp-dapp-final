import "./CountTransactions.scss";

import ArrowUp from "../../image/arrow-up.svg";
import ArrowDown from "../../image/arrow-down.svg";
import Percents from "../../image/percents.svg";

const CountTransactions = ({ transactionTaxValue, setTransactionTaxValue }) => {

    const handleChange = (e) => {
        const value = e.target.value;
        setTransactionTaxValue(value);
    };

    const incTransactionTaxValue = () => {
        if (transactionTaxValue !== 100) {
            setTransactionTaxValue(transactionTaxValue + 1);
        }
    };

    const dicTransactionTaxValue = () => {
        if (transactionTaxValue !== 0) {
            setTransactionTaxValue(transactionTaxValue - 1);
        }
    };

    return <div className="count-transactions">
        <div className="count-transactions__number-field">
            <input type="text"
                value={transactionTaxValue}
                onChange={handleChange}
                maxLength={2}
            />
            <div className="count-transactions__arrows">
                <div className="img-1">
                    <img src={ArrowUp}
                        alt="arrows"
                        onClick={incTransactionTaxValue}
                    />
                </div>
                <div className="img-2">
                    <img src={ArrowDown}
                        alt="arrows"
                        onClick={dicTransactionTaxValue}
                    />
                </div>
            </div>
        </div>
        <div className="count-transactions__percents">
            <img src={Percents} alt="" />
        </div>
    </div>
}

export default CountTransactions;