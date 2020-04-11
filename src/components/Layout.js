import React from 'react';
import styled from 'styled-components';
import NavBar from './NavBar';
import Footer from './Footer';

const LayoutWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: hsl(0, 0%, 98%);
`;

const LayoutMain = styled.div`
  flex: 1;
`;

export default props => (
  <LayoutWrapper>
    <NavBar/>
    <LayoutMain>{props.children}</LayoutMain>
    <Footer/>
  </LayoutWrapper>
);