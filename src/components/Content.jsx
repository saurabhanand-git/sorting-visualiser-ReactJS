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

const theme = {
  comp: "green",
  swap: "red",
};

const Bar = styled.div`
  width: 5px;
  height: ${(props) => props.h / 2}%;
  margin: 0 1px 0 1px;
  background: rgba(141, 141, 141, 0.349);
  background: ${(props) => theme[props.class]};
`;

class Content extends Component {
  state = {
    values: [],
    max: 200,
    min: 5,
    width: 100,
    delay: 20,
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
    const valuesToSort = this.state.values.map((valueObj) => valueObj.value);
    const { animations } = bubbleSort(valuesToSort);
    this.processAnimations(animations);
  };

  processAnimations = (animations) => {
    const { delay } = this.state;
    animations.forEach(([i, j, action], aIndex) => {
      setTimeout(() => {
        this.setState((currentState) => {
          const updatedArray = [...currentState.values];
          updatedArray[i].class = action;
          updatedArray[j].class = action;
          if (action === "swap") {
            [updatedArray[i], updatedArray[j]] = [
              updatedArray[j],
              updatedArray[i],
            ];
          }
          return { values: updatedArray };
        });
      }, delay * aIndex);
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
          {this.state.values.map((valueObj, index) => {
            return (
              <Bar h={valueObj.value} class={valueObj.class} key={index}></Bar>
            );
          })}
        </Bars>
      </ContentContainer>
    );
  }
}

export default Content;
