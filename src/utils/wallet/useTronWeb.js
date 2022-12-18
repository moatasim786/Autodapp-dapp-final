import { useCallback, useState } from "react";
import { toast } from "react-toastify";

import abi from "./contracts/default/abi.json";
import bytecode from "./contracts/default/bytecode.json";

const NETWORK = "https://api.shasta.trongrid.io";

const useTronWeb = () => {
  const [tronWeb, setTronWeb] = useState(null);
  const [defaultAddress, setDefaultAddress] = useState(null);

  const deployContractTron = useCallback(
    async (name, symbol, decimals, totalValue, 
      updateBalance,
      createTransaction,
      price) => {
      if (tronWeb && defaultAddress) {
        try {
          const transaction =
            await tronWeb.transactionBuilder.createSmartContract(
              {
                abi: abi,
                bytecode: bytecode.object,
                feeLimit: 1000000000,
                callValue: 0,
                userFeePercentage: 1,
                originEnergyLimit: 10000000,
                parameters: [
                  name,
                  symbol,
                  decimals,
                  totalValue,
                  defaultAddress,
                  defaultAddress,
                ],
              },
              defaultAddress
            );

          const signedTransaction = await tronWeb.trx.sign(transaction);
          const contract_instance = await tronWeb.trx.sendRawTransaction(
            signedTransaction
          );
          if (contract_instance) {
            toast("Success!", { type: "success" });
            updateBalance(price);
            createTransaction(price);
            return true
          };
        } catch (e) {
          toast(e, { type: "error" });
        }
      }
    },
    [tronWeb, defaultAddress]
  );

  const connectTronWeb = useCallback(() => {
    if (window.tronWeb) {
      window.tronWeb.request({ method: "tron_requestAccounts" }).then((res) => {
        if (res.code === 4001) return toast(res.message, { type: "error" });
        if (res.code === 200) {
          if (window.tronWeb.fullNode.host !== NETWORK)
            return toast("Please, change node to Shasta TronGrid", {
              type: "error",
            });
          setDefaultAddress(window.tronWeb.defaultAddress.base58);
          setTronWeb(window.tronWeb);
        }

        window.addEventListener("message", (e) => {
          console.log(e.data.message.action);
          if (e.data.message && e.data.message.action === "setAccount") {
            setDefaultAddress(e.data.message.data.address);
          }
          if (e.data.message && e.data.message.action === "disconnect") {
            setDefaultAddress(null);
          }
        });
      });
    } else toast("Please, install TronLink!", { type: "error" });
  }, []);

  return { tronWeb, defaultAddress, connectTronWeb, deployContractTron };
};

export default useTronWeb;
