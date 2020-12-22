import React, { Component } from "react";
import styled from "styled-components";
import { generateNewArray } from "./utils/arrays";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Controls = styled.div`
  display: flex;
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
  margin: 0 1px 0 1px;
  background: rgba(15, 145, 21, 0.349);
`;

class Content extends Component {
  state = {
    values: [],
    max: 200,
    min: 5,
    width: 200,
  };

  componentDidMount() {
    const { max, min, width } = this.state;
    this.setState({ values: generateNewArray(max, min, width) });
  }

  handleRandomise = () => {
    const { max, min, width } = this.state;
    this.setState({ values: generateNewArray(max, min, width) });
  };

  handleSort = () => {
    const sortedArr = this.state.values.sort((a, b) => a - b);
    this.setState({ values: sortedArr });
    console.log(this.state.values);
  };

  render() {
    return (
      <ContentContainer>
        <Controls>
          <button onClick={this.handleRandomise}>Randomise</button>
          <button onClick={this.handleSort}>Sort</button>
        </Controls>
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
