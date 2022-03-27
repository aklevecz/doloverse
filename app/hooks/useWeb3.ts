import { BigNumber, ethers } from "ethers";
import { Magic } from "magic-sdk";
import { useEffect, useState } from "react";
import { DOLOVERSE_ADDRESS } from "../constants";
import DoloverseInterface from "../contracts/Doloverse.json";
import useAuth from "./useAuth";

export default function useWeb3() {
  const { user } = useAuth();
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [balances, setBalances] = useState([]);

  const web3 = async () => {
    const customNodeOptions = {
      rpcUrl: "https://rpc-mumbai.maticvigil.com/", // Polygon RPC URL
      chainId: 80001, // Polygon chain id
    };
    const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY!, {
      network: customNodeOptions,
    });
    const provider = new ethers.providers.Web3Provider(
      magic.rpcProvider as any
    );
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    console.log(DOLOVERSE_ADDRESS);
    console.log(address);
    const balance = ethers.utils.formatEther(
      await provider.getBalance(address) // Balance is in wei
    );

    const contract = new ethers.Contract(
      DOLOVERSE_ADDRESS,
      DoloverseInterface.abi,
      provider
    );
    setContract(contract);
    setSigner(signer);

    const bigBalances = await contract.getTicketsOfAccount(address);
    const balances = bigBalances.map((b: BigNumber) => parseInt(b.toString()));
    console.log(balances);
    setBalances(balances);
  };

  useEffect(() => {
    if (user) {
      web3();
    }
  }, [user]);

  return { contract, signer, balances };
}
