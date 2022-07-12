import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import banner from "../assets/img/cover/cover1.jpg";

const EmailSend = () => {
  const userInfo = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [authNumber, setAuthNumber] = useState();
  const [errorcheck, setError] = useState("");

  const Mailsend = async () => {
    await axios
      .post("http://14.34.139.253:3000/api/auth/local", {
        email: userInfo.email,
        password: userInfo.password,
        confirmPassword: userInfo.password,
        userName: userInfo.userName,
      })
      .then((res) => {
        console.log(res);
        navigate("/emailsend");
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.msg);
      });
  };

  const Submit = async () => {
    // 인증번호 확인 & 회원가입완료
    await axios
      .post("http://14.34.139.253:3000/api/auth/verifyNumberForNew", {
        authNumber,
        email: userInfo.email,
        password: userInfo.password,
        confirmPassword: userInfo.password,
        userName: userInfo.userName,
      })
      .then((res) => {
        console.log(res);
        navigate("/signupsuccess");
      })
      .catch((error) => {
        setError(error.response.data.msg);
        console.error(error);
      });
  };
  return (
    <EmailWrap>
      <Header>
        <Banner src={banner} alt="" />
        <TitleText>
          <Title>인증메일을 전송했어요!</Title>
          <SubTitle>인증 메일 확인하러 메일함으로 고고</SubTitle>
        </TitleText>
      </Header>
      <Main>
        <Email>{userInfo?.email}</Email>

        <Input
          type="text"
          placeholder="인증번호 입력"
          onChange={(event) => {
            setAuthNumber(event.target.value);
          }}
          errorcheck={errorcheck}
        />
        {errorcheck ? (
          <>
            <ErrorCheck>{errorcheck}</ErrorCheck>
            <SignUpBtn onClick={Mailsend}>인증메일 재발송하기</SignUpBtn>
          </>
        ) : (
          ""
        )}

        <SignUpBtn onClick={Submit}>인증번호 확인하기</SignUpBtn>
      </Main>
    </EmailWrap>
  );
};

export default EmailSend;
const EmailWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 0 35px;
  background-color: var(--blue1);
  input {
    outline: none;
    padding: 18px 23px;
    background: #ffffff;
    border: 1px solid var(--blue2);
    border-radius: 6px;
    ::placeholder {
      color: var(--blue3);
      font-weight: 500;
      font-size: 16px;
    }
  }
`;
const Header = styled.header`
  position: relative;
  width: 100%;
  padding-bottom: 50px;
  margin-bottom: 73px;
`;
const TitleText = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 70%;
  width: 100%;
  text-align: center;
`;
const Title = styled.h1`
  font-weight: 700;
  font-size: 24px;
`;
const SubTitle = styled.p`
  font-weight: 500;
  font-size: 14px;
  color: var(--gray4);
  margin-top: 16px;
`;
const Banner = styled.img`
  width: 100%;
  border-radius: 26px;
`;
const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;
const SignUpBtn = styled.button`
  background: var(--blue4);
  border-radius: 6px;
  padding: 17px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  font-size: 18px;
  color: #fff !important;
  margin-bottom: 8px;
`;
const Email = styled.p`
  font-weight: 800;
  font-size: 16px;
  color: var(--blue3);
  text-align: center;
  margin-bottom: 55px;
`;
const ErrorCheck = styled.p`
  font-weight: 600;
  font-size: 14px;
  color: var(--blue3);
  text-align: center;
  margin-top: 39px;
  margin-bottom: 24px;
`;
const Input = styled.input`
  border: ${(props) =>
    props.errorcheck !== "" ? "2px solid var(--point3)" : ""}!important;
  color: ${(props) => (props.errorcheck !== "" ? "var(--point3)" : "")};
  ::placeholder {
    color: ${(props) =>
      props.errorcheck && props.errorcheck !== ""
        ? "var(--point3)"
        : ""}!important;
  }
`;
