import { useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import { contractAddress } from "./AddressABI/contractAddress";
import { contractABI } from "./AddressABI/contractABI";

function App() {
  const [paragraph1, setParagraph1] = useState("");
  const [paragraph2, setParagraph2] = useState("");

  const connectMetamask = async () => {
    if (window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts[0]);
      setParagraph1(accounts[0]);
    }
  };

  let contractApple;

  const connectContract = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    contractApple = new ethers.Contract(contractAddress, contractABI, signer);
    const myData = await contractApple.myCity();
    setParagraph2(myData);

    console.log(contractApple.target);
  };

  return (
    <div>
      <button onClick={connectMetamask}>Connect Metamask</button>
      <p>{paragraph1}</p>

      <button onClick={connectContract}>Connect Contract</button>
      <p>{paragraph2}</p>
    </div>
  );
}

export default App;
