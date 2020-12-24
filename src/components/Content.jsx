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
  width: 80vw;
  height: 80vh;
`;

const theme = {
  comp: "blue",
  swap: "red",
  sorted: "green",
};

const Bar = styled.div`
  width: ${(props) => 100 / props.n}%;
  height: ${(props) => props.h / 2}%;
  margin: 0 1px 0 1px;
  background: rgba(141, 141, 141, 0.349);
  background: ${(props) => theme[props.actionTheme]};
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

  handleSubmit = (event) => {
    event.preventDefault();
    this.handleSort();
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
    setTimeout(() => {
      this.isSorted();
    }, animations.length * delay);
  };

  isSorted = () => {
    const { values } = this.state;
    values.forEach((valueObj, index) => {
      setTimeout(() => {
        this.setState((currentState) => {
          currentState.values[index].class = "sorted";
          return { currentState };
        });
      }, 1 * index);
    });
  };

  handleDelayChange = (event) => {
    const newDelay = event.target.value;
    this.setState({ delay: newDelay });
  };

  handleWidthChange = (event) => {
    const newWidth = Number(event.target.value);
    //const { max, min } = this.state;
    this.setState({
      width: newWidth,
    });
  };

  render() {
    const { delay, width } = this.state;
    const nBars = this.state.values.length;
    return (
      <ContentContainer>
        <Controls>
          <label>
            Array Size
            <input
              type="number"
              value={width}
              min="3"
              max="150"
              onChange={this.handleWidthChange}></input>
          </label>
          <button onClick={this.handleRandomise}>Randomise</button>
          <input
            type="range"
            min="1"
            max="2000"
            value={delay}
            onChange={this.handleDelayChange}></input>
          <input
            type="number"
            value={delay}
            onChange={this.handleDelayChange}></input>
          <button onClick={this.handleSort}>Sort</button>
        </Controls>
        <Bars>
          {this.state.values.map((valueObj, index) => {
            return (
              <Bar
                h={valueObj.value}
                actionTheme={valueObj.class}
                key={index}
                n={nBars}></Bar>
            );
          })}
        </Bars>
      </ContentContainer>
    );
  }
}

export default Content;
