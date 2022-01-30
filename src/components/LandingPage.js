import React from "react";
import styled from "styled-components";
import Web3 from "web3";

export default function LandingPage() {
  const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    ${"" /* align-items: center; */}
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background: url("https://i.ibb.co/z6CKtBv/Untitled-design.png");
    background-color: #fff;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
  `;

  const LandingPageFlex = styled.div`
    display: flex;
    font-family: "Nunito", sans-serif;
    font-size: 1.5rem;
    align-items: center;

    justify-content: center;
    @media (max-width: 768px) {
      height: 100vh;
      width: 100vw;
      flex-direction: column;
    }
  `;

  const HeroText = styled.h1`
    font-size: 4rem;
    margin-left: 2rem;
    width: 75%;
  `;

  const HeroImage = styled.img`
    width: 48%;
    margin-left: 7rem;
  `;

  const Button = styled.div`
    margin-left: 2rem;

    display: flex;
    padding: 13px 26px;

    text-decoration: none;
    border-radius: 7px;
    background-color: rgba(255, 255, 255, 0.1);
    border: 2px solid #b9a1fc;
    margin-top: 4rem;
    backdrop-filter: blur(100px);
    color: #b9a1fc;
    font-size: 14px;
    letter-spacing: 2px;
    cursor: pointer;
    width: 40%;
    text-transform: uppercase;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: #b9a1fc;
      color: #fff;
      border: 2px solid #b9a1fc;
      transition: 0.5s;
    }
  `;

  const Footer = styled.p`
    color: #bcbcbc;
    margin-top: 2rem;
    margin-left: 2rem;
  `;

  const connectWallet = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      window.location.reload();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      window.location.reload();
    } else {
      alert("Please install MetaMask");
    }
  };
  return (
    <MainWrapper>
      <LandingPageFlex>
        <div>
          <HeroText>A Decentralized Social Media App</HeroText>
          <Button
            onClick={() => {
              connectWallet();
            }}
          >
            Connect your wallet
          </Button>
        </div>

        <HeroImage src="https://i.ibb.co/bWLDyHR/casual-life-3d-reading.png" />
      </LandingPageFlex>
      <Footer>
        Developed by{" "}
        <a
          style={{
            color: "rgb(211 200 243)",
          }}
          href=""
        >
          Suhail Kakar
        </a>
      </Footer>
    </MainWrapper>
  );
}
