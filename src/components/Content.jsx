import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { generateNewArray } from "./utils/arrays";
import { bubbleSort, insertionSort, quickSortWrapper } from "./utils/sorting";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import logo from "../assets/logo.png";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  .headerWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    background-color: rgb(28, 48, 65);
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.2rem 3rem 0rem 3rem;
  width: 100%;
  max-width: 1900px;
  background-color: rgb(28, 48, 65);
  header {
    display: flex;
    align-items: flex-end;
    img {
      width: 3.8rem;
      margin: 0.3rem 0 0.3rem 0;
      padding: 0 0 0.3rem 0;
    }
    h1 {
      color: #fff;
      font-size: 2.6rem;
      margin: 0 0 0rem 0.3rem;
      padding: 0 0 0.3rem 0;
    }
  }
  @media only screen and (min-width: 900px) and (max-width: 1300px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.2rem 0 0 0;
  }
  @media only screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.2rem 0 0 0;
    header {
      h1 {
        font-size: 2rem;
      }
      img {
        width: 2rem;
      }
    }
  }
`;

const CustomForm = styled(Form)`
  display: flex;
  align-items: center;
  height: auto;
  color: #fff;
  .form-group {
    margin: 0 1rem 0 1rem;
    width: 8rem;
  }
  .form-label {
    margin: 0 0 0 0;
  }
  .algo {
    margin: 0 2rem 0 2rem;
    .dropdown-toggle {
      width: 9rem;
    }
  }
  .selectorGroup {
    display: flex;
    align-items: center;
  }
  button {
    height: 3rem;
    margin: 0 0.2rem 0 0.2rem;
    width: 7rem;
  }
  @media only screen and (max-width: 900px) {
    flex-direction: column;
    .selectorGroup {
      width: 100vw;
      justify-content: space-around;
      padding-right: 0.5rem;
    }
    .buttonGroup {
      width: 100vw;
      display: flex;
      justify-content: space-around;
      padding: 0 0.5rem 1rem 0.5rem;
      .btn {
        width: 9rem;
      }
    }
    .form-group {
      margin: 0 0.2rem 0 0.2rem;
      width: auto;
    }
    .form-label {
      font-size: 0.75rem;
    }
    .algo {
      margin: 0 0.3rem 0 0.3rem;
      .dropdown-toggle {
        width: 8rem;
        font-size: 1rem;
      }
    }
  }
`;

const Bars = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 90vw;
  height: 83vh;
  margin: 2rem 0 2rem 1rem;
`;

const Bar = styled.div`
  width: ${(props) => 100 / props.n}%;
  height: ${(props) => props.h / 2}%;
  margin: 0 1px 0 1px;
  border-radius: 5px;
  background: rgba(141, 141, 141, 0.349);
  background: ${(props) => theme[props.actionTheme]};
`;

const theme = {
  done: "rgba(141, 141, 141, 0.349)",
  comp: "rgba(52, 72, 173, 0.8)",
  key: "rgba(220, 186, 82, 0.8)",
  swap: "rgba(196, 64, 64, 0.8)",
  sorted: "rgba(92, 159, 77, 0.8)",
  base: "rgba(103, 77, 159, 0.8)",
};

export default function ContentScreen() {
  const [values, setValues] = useState([]);
  const [nBars, setNBars] = useState(50);
  const [delay, setDelay] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [timeouts, setTimeouts] = useState([]);
  const [algorithm, setAlgorithm] = useState("bubble");
  const maxA = 200;
  const minA = 5;
  const maxN = 150;
  const minN = 3;
  const algoRef = {
    bubble: { f: bubbleSort, title: "Bubble Sort" },
    insertion: { f: insertionSort, title: "Insertion Sort" },
    quick: { f: quickSortWrapper, title: "Quicksort" },
  };

  useEffect(() => {
    setValues(generateNewArray(maxA, minA, nBars));
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAlgoSelect = (event) => {
    const selected = event.target.name;
    console.log("selected>", selected);
    setAlgorithm(selected);
  };

  const handleBarNChange = (event) => {
    const newN = Number(event.target.value);
    setNBars(newN);
  };

  const handleRandomise = () => {
    setIsStopped(false);
    setValues(generateNewArray(maxA, minA, nBars));
    setIsSorted(false);
    setIsLoading(false);
  };

  const handleDelayChange = (event) => {
    const newDelay = Number(event.target.value);
    setDelay(newDelay);
  };

  const handleSort = (event) => {
    event.preventDefault();
    setIsSorting(true);
    // if restarting from a stop condition, need to reset the bar colors
    if (isStopped) {
      setValues((currentValues) => {
        return currentValues.map((barObj) => {
          return { ...barObj, class: "" };
        });
      });
      setIsStopped(false);
    }
    const valuesToSort = values.map((valueObj) => valueObj.value);
    const { animations } = algoRef[algorithm].f(valuesToSort);
    processAnimations(animations);
  };

  // add timeout references to the state so they may be cleared
  const processAnimations = (animations) => {
    animations.forEach(([i, j, action, iClass, jClass, k, kClass], aIndex) => {
      const timeout = setTimeout(() => {
        setValues((currentValues) => {
          const updatedArray = [...currentValues];
          if (action === "swap") {
            colourChange(updatedArray, i, j, iClass, jClass);
            [updatedArray[i], updatedArray[j]] = [
              updatedArray[j],
              updatedArray[i],
            ];
            if (algorithm === "quick") {
              colourChange(updatedArray, i, j, "done", "done");
            }
          } else if (action === "changePivot") {
            colourChange(updatedArray, i, null, "key");
          } else {
            colourChange(updatedArray, i, j, iClass, jClass, k, kClass);
          }
          return updatedArray;
        });
      }, delay * aIndex);
      setTimeouts((currentTimeouts) => {
        return [...currentTimeouts, timeout];
      });
    });
    const sortedTimeout = setTimeout(() => {
      animateIsSorted();
      setIsSorting(false);
      setIsSorted(true);
    }, animations.length * delay);
    setTimeouts((currentTimeouts) => {
      return [...currentTimeouts, sortedTimeout];
    });
  };

  const colourChange = (array, i, j, iClass, jClass, k, kClass) => {
    // conditionals added as in some sort algorithms array[j] will be undefined
    if (array[i]) {
      array[i].class = iClass;
    }
    if (array[j]) {
      array[j].class = jClass;
    }
    if (array[k]) {
      array[k].class = kClass;
    }
  };

  const handleStop = () => {
    setIsStopped(true);
    timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
    setIsSorting(false);
  };

  const animateIsSorted = () => {
    values.forEach((valueObj, index) => {
      setTimeout(() => {
        setValues((currentValues) => {
          const updatedArray = [...currentValues];
          updatedArray[index].class = "sorted";
          return updatedArray;
        });
      }, 5 * index);
    });
  };

  return (
    <ContentContainer>
      <div className="headerWrapper">
        <HeaderContainer>
          <header>
            <img src={logo} alt="sorted bars logo" />
            <h1>Sort Visualiser</h1>
          </header>
          <CustomForm>
            <div className="selectorGroup">
              <Form.Group className="algo">
                <DropdownButton title={algoRef[algorithm].title}>
                  {Object.keys(algoRef).map((algoKey) => {
                    return (
                      <DropdownItem
                        key={algoKey}
                        name={algoKey}
                        onClick={handleAlgoSelect}
                      >
                        {algoRef[algoKey].title}
                      </DropdownItem>
                    );
                  })}
                </DropdownButton>
              </Form.Group>
              <Form.Group>
                <Form.Label>Array Size: </Form.Label>
                <Form.Text>{nBars}</Form.Text>
                <Form.Control
                  type="range"
                  custom
                  value={nBars}
                  max={maxN}
                  min={minN}
                  onChange={handleBarNChange}
                  disabled={isSorting}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Animation Delay: </Form.Label>
                <Form.Text>{delay} ms</Form.Text>
                <Form.Control
                  type="range"
                  custom
                  value={delay}
                  max={1000}
                  min={0}
                  step={100}
                  onChange={handleDelayChange}
                  disabled={isSorting}
                />
              </Form.Group>
            </div>
            <div className="buttonGroup">
              <Button
                variant="info"
                onClick={handleRandomise}
                disabled={isSorting}
              >
                Randomise
              </Button>
              <Button
                variant="success"
                onClick={handleSort}
                disabled={isSorted || isSorting}
              >
                Sort
              </Button>
              <Button
                variant="danger"
                onClick={handleStop}
                disabled={!isSorting}
              >
                Stop
              </Button>
            </div>
          </CustomForm>
        </HeaderContainer>
      </div>
      {isLoading ? (
        <span>Loading</span>
      ) : (
        <Bars>
          {values.map((valueObj, index) => {
            return (
              <Bar
                h={valueObj.value}
                actionTheme={valueObj.class}
                key={index}
                n={values.length}
              ></Bar>
            );
          })}
        </Bars>
      )}
    </ContentContainer>
  );
}
