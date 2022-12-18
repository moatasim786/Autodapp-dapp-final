import axios from 'axios';

const urlAxios = (url: string) => `http://146.190.33.170:4000${url}`;
const testuri = (url: string) => `https://auto-dapp-app.herokuapp.com${url}`
// const urlAxios = (url: string) => `http://127.0.0.1:4000${url}`

export const addOption = async (data: any) => {
  
  return await axios
    .post(urlAxios('/addOptions'), {
      ...data,
    })
    .then(function (response) {
      if (response.data.code === 'ER') {
        alert(response.data.message);
      }
      
      if (response.data.code === 'SR') {
        return response.data
      }
    })
    .catch(function (error) {
      console.log('updateOprions error', error)
    });
};

export const updateOption = async (data: any) => {
  
  return await axios
    .post(urlAxios('/updateOptions'), {
      ...data,
    })
    .then(function (response) {
      if (response.data.code === 'ER') {
        alert(response.data.message);
      }
      
      if (response.data.code === 'SR') {
        return response.data
      }
    })
    .catch(function (error) {
      console.log('updateOprions error', error)
    });
};



export const authAxios = async ({ url, data, setAxiosError }: any) => {
  
  return await axios
    .post(urlAxios(url), {
      ...data,
    })
    .then(function (response) {
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      if (response.data.code === 'ER') {
        setAxiosError(response.data.message);
      }
      
      if (response.data.code === 'SR') {
        return response.data
      }
    })
    .catch(function (error) {
      console.log('register error')
      setAxiosError(error);
    });
};

export const croAxios = ({ setPriceCro }: any) => {
  const urlAxios =
    'https://api.coingecko.com/api/v3/simple/price?ids=binancecoin%2Cethereum&vs_currencies=bnb';

  axios
    .get(urlAxios)
    .then(function (response) {
      const res = response.data['ethereum'].bnb;
      setPriceCro(res);
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const bnbAxios = ({ setPayBnb }: any) => {
  const urlAxios =
    'https://api.coingecko.com/api/v3/simple/price?ids=binancecoin%2Cethereum&vs_currencies=bnb';

  axios
    .get(urlAxios)
    .then(function (response) {
      const res = response.data.binancecoin.bnb;
      setPayBnb(res);
    })
    .catch(function (error) {
      console.log(error);
    });
};
