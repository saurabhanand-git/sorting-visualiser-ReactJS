import React, { Component } from "react";
import styled from "styled-components";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Bars = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 80vh;
`;

const Bar = styled.div`
  width: 5px;
  height: ${(props) => props.h / 2}%;
  margin: 0 2px 0 2px;
  background: red;
`;

class Content extends Component {
  state = {
    values: [20, 3, 50, 56, 70, 100],
  };

  componentDidMount() {}

  render() {
    return (
      <ContentContainer>
        <button>Randomise</button>
        <Bars>
          {this.state.values.map((value) => {
            return <Bar h={value}></Bar>;
          })}
        </Bars>
      </ContentContainer>
    );
  }
}

export default Content;
