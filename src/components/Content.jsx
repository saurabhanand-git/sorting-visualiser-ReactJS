import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { generateNewArray } from "./utils/arrays";
import { bubbleSort } from "./utils/sorting";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  form {
    display: flex;
  }
`;

const Bars = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 80vw;
  height: 80vh;
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
  swap: "rgba(196, 64, 64, 0.8)",
  sorted: "rgba(92, 159, 77, 0.8)",
};

export default function ContentScreen() {
  const [values, setValues] = useState([]);
  const [nBars, setNBars] = useState(15);
  const [delay, setDelay] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [timeouts, setTimeouts] = useState([]);
  const maxA = 200;
  const minA = 5;
  const maxN = 150;
  const minN = 3;

  useEffect(() => {
    setValues(generateNewArray(maxA, minA, nBars));
    setIsLoading(false);
  }, []);

  const handleBarNChange = (event) => {
    const newN = Number(event.target.value);
    setNBars(newN);
  };

  const handleRandomise = async () => {
    setIsStopped(false);
    setValues(generateNewArray(maxA, minA, nBars));
    setIsSorted(false);
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
    const { animations } = bubbleSort(valuesToSort);
    processAnimations(animations);
  };

  // add timeout references to the satte so they may be cleared
  const processAnimations = (animations) => {
    animations.forEach(([i, j, action], aIndex) => {
      const timeout = setTimeout(() => {
        setValues((currentValues) => {
          const updatedArray = [...currentValues];
          if (action === "swap") {
            colourChange(updatedArray, i, j, action);
            [updatedArray[i], updatedArray[j]] = [
              updatedArray[j],
              updatedArray[i],
            ];
          } else {
            colourChange(updatedArray, i, j, action);
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

  const colourChange = (array, i, j, action) => {
    array[i].class = action;
    array[j].class = action;
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
      <Form>
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
        <Button variant="info" onClick={handleRandomise} disabled={isSorting}>
          Randomise
        </Button>
        <Form.Group>
          <Form.Label>Animation Delay: </Form.Label>
          <Form.Text>{delay} ms</Form.Text>
          <Form.Control
            type="range"
            custom
            value={delay}
            max={2000}
            min={0}
            onChange={handleDelayChange}
            disabled={isSorting}
          />
        </Form.Group>
        <Button
          variant="primary"
          onClick={handleSort}
          disabled={isSorted || isSorting}
        >
          Sort
        </Button>
        <Button variant="danger" onClick={handleStop} disabled={!isSorting}>
          Stop
        </Button>
      </Form>
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

// const processAnimations = (animations) => {
//   animations.forEach(([i, j, action], aIndex) => {
//     setTimeout(() => {
//       setValues((currentValues) => {
//         const updatedArray = [...currentValues];
//         if (action === "comp") {
//           colourChange(updatedArray, i, j, action);
//           // updatedArray[i].class = action;
//           // updatedArray[j].class = action;
//         } else if (action === "swap") {
//           colourChange(updatedArray, i, j, action);
//           [updatedArray[i], updatedArray[j]] = [
//             updatedArray[j],
//             updatedArray[i],
//           ];
//         }
//         return updatedArray;
//       });
//     }, delay * aIndex);
//   });
//   setTimeout(() => {
//     isSorted();
//   }, animations.length * delay);
// };

// const colourChange = (array, i, j, action) => {
//   setTimeout(() => {
//     array[i].class = action;
//     array[j].class = action;
//   }, delay);
//   setTimeout(() => {
//     array[i].class = "base";
//     array[j].class = "base";
//   }, delay * 2);
// };
