import React, { Component } from "react";
import styled from "styled-components";
import { generateNewArray } from "./utils/arrays";
import { bubbleSort } from "./utils/sorting";

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
  width: 15px;
  height: ${(props) => props.h / 2}%;
  margin: 0 1px 0 1px;
  background: rgba(141, 141, 141, 0.349);
  .comparing {
    background: green;
  }
  .swapping {
    background: red;
  }
`;

class Content extends Component {
  state = {
    values: [],
    max: 200,
    min: 5,
    width: 5,
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
    const { sortedArray, animations } = bubbleSort(this.state.values);
    //const sortedArr = this.state.values.sort((a, b) => a - b);

    //this.setState({ values: sortedArray });
    this.processAnimations(animations);
  };

  processAnimations = (animations) => {
    animations.forEach(([i, j, action]) => {
      console.log(i, j, action);
    });
  };

  render() {
    return (
      <ContentContainer>
        <Controls>
          <button onClick={this.handleRandomise}>Randomise</button>
          <button onClick={this.handleSort}>Sort</button>
        </Controls>
        <Bars>
          {this.state.values.map((value, index) => {
            return <Bar h={value} key={index}></Bar>;
          })}
        </Bars>
      </ContentContainer>
    );
  }
}

export default Content;
