import React, { useEffect, useState } from "react";
import Web3 from "web3";
import Navbar from "./screens/Navbar";
import "./styles/index.css";
import Main from "./screens/Main";
import Decentragram from "./abis/Decentragram.json";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./screens/LandingPage";

const Wrapper = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;
  background-color: #fff;
  height: 100vh;
`;

const Loading = styled.img`
  width: 100px;
  height: 100px;
`;

export default function App() {
  const [account, setAccount] = useState(null);
  const [images, setImages] = useState([]);
  const [decetragram, setDecetragram] = useState(null);
  const [buffer, setBuffer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    checkWallet();
    await loadBlockchainData();
  }, []);

  const checkWallet = async () => {
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

  return (
    <>
      {account ? (
        <>
          <Navbar account={account} decetragram={decetragram} />
          <Main images={images} account={account} decetragram={decetragram} />
        </>
      ) : (
        <LandingPage />
      )}
      <ToastContainer />
    </>
  );
}
