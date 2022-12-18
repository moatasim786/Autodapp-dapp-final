import axios from "axios";

export const getFearAndGreedIndexes = () => {
    return axios.get("https://api.alternative.me/fng/");
}