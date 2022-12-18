export const countCost = (id, price, currency) => {
    let res = 0;
    if (id && price) {
        switch (id) {
            case 1:
                currency.forEach((el, idx) => {
                    if (el.key === 'BTC') {
                        res = (price / currency[idx].price).toFixed(7)
                    }
                })
                return res
            case 2:
                return price
            case 3:
                return price
            case 4:
                currency.forEach((el, idx) => {
                    if (el.key === 'ETH') {
                        res = (price / currency[idx].price).toFixed(7)
                    }
                })
                return res
            case 5:
            case 6:
            case 7:
                currency.forEach((el, idx) => {
                    if (el.key === 'RUR') {
                        res = (currency[idx].price * price).toFixed(3)
                    }
                })
                return res
            default:
                return res
        }
    }
}