import "./TaxRecieveAddress.scss";

const TaxRecieveAddress = ({ taxReceiveAddressValue, setTaxRecieveAddressValue }) => {

    const handleChange = (e) => {
        const value = e.target.value;
        setTaxRecieveAddressValue(value);
    };

    return <div className="tax-recieve-address">
        <input type="text"
            value={taxReceiveAddressValue}
            onChange={handleChange}
        />
    </div>
}

export default TaxRecieveAddress;