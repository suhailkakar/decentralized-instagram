import React, { useEffect, useState } from "react";
import Web3 from "web3";
import Navbar from "./Navbar";
import "../styles/index.css";
import Main from "./Main";
import Decentragram from "../abis/Decentragram.json";

export default function App() {
  const [account, setAccount] = useState(null);
  const [images, setImages] = useState([]);
  const [decetragram, setDecetragram] = useState(null);
  const [buffer, setBuffer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    connectAccount();
    await loadBlockchainData();
  }, []);

  const connectAccount = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      alert("Please install MetaMask");
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    // Network ID
    const networkId = await web3.eth.net.getId();
    const networkData = Decentragram.networks[networkId];
    if (networkData) {
      const decentragram = new web3.eth.Contract(
        Decentragram.abi,
        networkData.address
      );
      setDecetragram(decentragram);
      const imagesCount = await decentragram.methods.postCount().call();
      for (let i = 1; i <= imagesCount; i++) {
        const image = await decentragram.methods.images(i).call();
        setImages((prevState) => [...prevState, image]);
      }

      setIsLoading(false);
    } else {
      window.alert("Decentragram contract not deployed to detected network.");
    }
  };

  const captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    console.log("asds", file);

    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      console.log("buffer", Buffer(reader.result));
      setBuffer(Buffer(reader.result));
    };
  };

  return (
    <>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <>
          <Navbar account={account} decetragram={decetragram} />
          <Main images={images} account={account} decetragram={decetragram} />
        </>
      )}
    </>
  );
}
