import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import Web3 from "web3";

export const useSignMessage = () => {
  const { library, account } = useWeb3React();
  let web3 = new Web3(library?.provider);

  const [isVerify, setIsVerify] = useState(false);

  useEffect(() => {}, [account, isVerify]);

  const signMessage = async (messageSign?: string) => {
    if (!library) return;
    const fortmaticProvider = localStorage.getItem("provider");
    try {
      if (fortmaticProvider === "fortmatic") {
        await library?.provider.sendAsync(
          {
            method: "personal_sign",
            params: [messageSign, account],
          },
          (err: any, result: any) => {
            if (result) {
              verifyMessage(result.result, messageSign);
            } else return;

            if (err) return;
          }
        );
      } else {
        let signature = await library.provider.request({
          method: "personal_sign",
          params: [
            ethers.utils.hexlify(ethers.utils.toUtf8Bytes(messageSign + "")),
            account,
          ],
        });

        if (signature) {
          verifyMessage(signature, messageSign);
        }
      }
    } catch (error) {
      return;
    }
  };

  const verifyMessage = async (signature: string, messageSign?: string) => {
    if (!library) return;
    let recovered = web3.eth.accounts.recover(messageSign + "", signature);

    if (recovered === account) {
      setIsVerify(true);
    }
  };

  return { signMessage, isVerify };
};
