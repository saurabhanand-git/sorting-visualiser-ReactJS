import React, { Component } from "react";
import "./App.css";
import styled from "styled-components";
import Content from "./Content";
import "bootstrap/dist/css/bootstrap.min.css";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

class App extends Component {
  state = {};
  render() {
    return (
      <Wrapper>
        <Content />
      </Wrapper>
    );
  }
}

export default App;
