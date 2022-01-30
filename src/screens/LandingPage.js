import React from "react";
import styled from "styled-components";
import Web3 from "web3";
export default function LandingPage() {
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HeroSection>
      <HeroContent>
        <HeroTitle>
          The World's <br />
          <GardientText>Social networking</GardientText> back in your hands
        </HeroTitle>
        <HeroSubtitle>
          Decentragram is a decentralized social media app that allows you to
          share your moment without worrying about your privacy.
        </HeroSubtitle>
        <ConnectWalletButton
          onClick={() => {
            connectWallet();
          }}
        >
          Connect Wallet
        </ConnectWalletButton>
      </HeroContent>
      <HeroImage src={require("../images/hero.png")} alt="" />
    </HeroSection>
  );
}

const HeroSection = styled.div`
  background-color: #e7f8fe;
  background-image: url(${require("../images/backgroud.png")});
  height: 100vh;
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 7%;
`;

const HeroTitle = styled.h1`
  font-size: 60px;
  font-weight: 700;
  color: #0f0f0f;
  max-width: 95%;
  line-height: 1.2;
  margin-bottom: 20px;
`;

const GardientText = styled.span`
  background: linear-gradient(to right, #24a9f9, #1d6fec);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const HeroImage = styled.img`
  width: 70%;
  height: auto;
`;

const HeroSubtitle = styled.p`
  font-size: 16px;
  color: #374151;
  max-width: 80%;
  line-height: 1.5;
`;

const ConnectWalletButton = styled.button`
  border: none;
  border-radius: 50rem;
  cursor: pointer;
  padding: 15px 30px;
  color: #fff;
  width: 30%;
  margin-top: 3%;
  font-size: 16px;
  background: linear-gradient(to right, #24a9f9, #1d6fec);
`;
