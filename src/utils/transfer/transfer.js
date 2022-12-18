
export async function transfer(currency, cost, sender, createTransaction, currencyName) {

    if (currency === 1) {
        createTransaction()
    }
    if (currency === 2) {
        createTransaction()
    }

    if (currency === 3) {
        createTransaction()

    }

    if (currency === 4) {
        try {
            createTransaction()
        } catch (e) {
            console.log('eth error', e)
        }
    }
}


