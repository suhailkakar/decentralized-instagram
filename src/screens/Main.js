import React from "react";
import styled from "styled-components";
import { AiOutlineDollar } from "react-icons/ai";

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;

  width: 35%;
  margin-left: auto;
  margin-right: auto;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const Post = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  border-radius: 5px;
  -webkit-box-shadow: 0px 0px 11px -1px rgba(184, 184, 184, 1);
  -moz-box-shadow: 0px 0px 11px -1px rgba(184, 184, 184, 1);
  box-shadow: 0px 0px 11px -1px rgba(184, 184, 184, 1);

  margin-top: 30px;

  border-bottom: 1px solid #ccc;
`;

const LongButton = styled.button`
  border: none;
  border-radius: 5px;
  margin: 10px 20px;

  margin-left: 10px;
  background-color: #fff;
  ${"" /* width: 45%; */}
  align-items: center;
  justify-content: center;
  display: flex;
  color: #b9a1fc;
  font-size: 12px;
`;

const Header = styled.div`
  display: flex;

  flex-direction: row;
  padding: 10px;

  align-items: center;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;

  border-radius: 50%;
  margin-right: 10px;
`;

const Footer = styled.div`
  display: flex;
  padding-left: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const GrayAddress = styled.p`
  color: #999;
  font-size: 12px;
`;

const PostDescription = styled.p`
  font-size: 14px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

export default function Main(props) {
  const tipToAuthor = (author, index) => {
    console.log("tipToAuthor", author, index);
    let tipAmount = window.web3.utils.toWei("0.1", "Ether");
    props.decetragram.methods
      .tipImageOwner(index)
      .send({ from: props.account, value: tipAmount })
      .on("transactionHash", (hash) => {
        console.log("hash", hash);
      });
  };

  return (
    <PostWrapper>
      {props.images.map((image, key) => (
        <Post key={key}>
          <Header>
            <ProfileImage
              src={
                "https://deejayfarm.com/wp-content/uploads/2019/10/Profile-pic.jpg"
              }
            />
            <GrayAddress>{image.author}</GrayAddress>
          </Header>
          <PostDescription>{image.description}</PostDescription>
          <Image src={`https://ipfs.infura.io/ipfs/${image.hash}`} />
          <Footer>
            <GrayAddress>
              Total Tips:{" "}
              {window.web3.utils.fromWei(image.tipAmount.toString(), "Ether")}{" "}
              ETH
            </GrayAddress>
            <LongButton
              name={image.id}
              onClick={() => {
                tipToAuthor(image.author, image.id);
              }}
            >
              <AiOutlineDollar
                size={18}
                color="#b9a1fc"
                style={{
                  marginRight: "5px",
                }}
              />{" "}
              Tip to author (0.1 ETH)
            </LongButton>
          </Footer>
        </Post>
      ))}
    </PostWrapper>
  );
}
