import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  width: 100%;
  height: 100px;
  /* background-color: #2c2c2c; */
`;

const Container = styled.div`
  width: 80%;
  height: 100px;
  padding: 20px;
  margin: 0 auto;
  font-size: 60px;
  border-top: 1px solid white;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Container>Footer</Container>
    </FooterContainer>
  );
};

export default Footer;
