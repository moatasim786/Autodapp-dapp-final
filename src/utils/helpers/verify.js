import abi from 'ethereumjs-abi';

const croApiKey = 'C5QSAJFG37RH9NKIGI3ZZNX3Q3RBB51JYV'
const ethApiKey = '9QEWF5ZN9V9HN5SRJA6PGTTGES2I53UM5C'
const defaultApiKey = '23ZHS9ZSTUPR64C8T3R8J6TEJHA3DEH9AN'

const returnApiKey = (chainId) => {

  switch (chainId) {
    case 338:
      return croApiKey
    case 1:
      return ethApiKey
    default:
      return defaultApiKey;
  }
}

export const verifyContract = async ({data, name}) => {
      // console.log('parameters', data)
      var encoded = abi.rawEncode(data.parameters, data.arguments);
      const chainId = data.chainId
      
      const urls = {
        1: 'https://api.etherscan.io/api',
        338: 'https://api-testnet.cronoscan.com/api',
        56: 'https://api.bscscan.com/api',
        97: 'https://api-testnet.bscscan.com/api',
      }
  
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("apikey", returnApiKey(chainId));
      urlencoded.append("module", "contract");
      urlencoded.append("action", "verifysourcecode");
      urlencoded.append("sourceCode", data.code);
      urlencoded.append("contractaddress", data.hash);
      urlencoded.append("codeformat", "solidity-single-file");
      urlencoded.append("contractname", name);
      urlencoded.append("compilerversion", "v0.8.0+commit.c7dfd78e");
      urlencoded.append("optimizationUsed", "0");
      urlencoded.append("constructorArguements", encoded.toString('hex'));

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

      const call = () => {
        fetch(urls[chainId], requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      }

      setTimeout(() => call(), 30000)
      
      // v0.4.24+commit.e67f0147
      // v0.8.0+commit.c7dfd78e
}

// const arg = [
//     "0xfE0ccE84921c89b2AA5aE8D0de6195336D0553ED",
//     120,
//     220,
//     21,
//     "10000000000000000000000000"
// ]

// const param = [
//     "address",
//     "uint8",
//     "uint256",
//     "uint256",
//     "uint256"
// ]

// export const encodeRaw = () => {
//   var encoded = abi.rawEncode(param, arg);

//   console.log(encoded.toString('hex'))
// }
