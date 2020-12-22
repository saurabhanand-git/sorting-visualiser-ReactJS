import React, { Component } from "react";
import "./App.css";
import styled from "styled-components";
import Content from "./Content";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
const Header = styled.div``;

class App extends Component {
  state = {};
  render() {
    return (
      <Wrapper>
        <Header>Sort Visualiser</Header>
        <Content />
      </Wrapper>
    );
  }
}

export default App;
