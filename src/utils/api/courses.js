import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

export const coursesApi = {
    getCourses() {
        return axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,DOGE,EOS,XMR&tsyms=USD&api_key=${API_KEY}`)
    },
    getBitcoinCharts() {
        return axios.get(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=90&api_key=${API_KEY}`)
    },
    getFeesBurn() {
        return axios.get("https://api.ultrasound.money/fees/all")
    },
    getRUR() {
        return axios.get("https://www.cbr-xml-daily.ru/daily_json.js")
    },
}