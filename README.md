# Sorting Visualiser

This is a visualiser for popular sorting algorithms including quicksort, bubble sort and insertion sort.</br>

### Hosted at https://sort-visualiser-jg.netlify.app/

</br>
<img src='./public/sortvisualiser.gif'/>
</br>

## Table of Contents

- [About](#about)
  - [Features](#features)
- [Technologies](#technologies)
- [How to Use](#how-to-use)
  - [Code](#code)

## About

I made this visualiser as I was interested in learning more about different sorting algorithms. Beyond writing the algorithms themselves, this required finding a way to display ongoing changes to the user.
The approach I’ve used is to add ‘animation’ steps to a queue throughout execution of the sort functions. The steps in the queue contain target indices, action and colour change instructions that are played back to the user using `setTimeout` to add a delay. The references from `setTimeout` are stored so they may be cleared if the user chooses to stop the playback.
</br></br>
The complexity of queueing these animation steps varied with the sort method. E.g. recursive algorithms like quicksort required more adjustment than bubble sort. For this reason, the relative speed of these algorithms in the app should not be used as a true comparison. The chosen method of adding animations to the top level queue also meant that some functions had to be re-written in a more 'verbose' way.
</br></br>
Further developments would include adding more sort methods and some tooltips with details about the algorithms.

### Features

- Select from bubble sort, insertion sort or quicksort algorithms
- Select the size of the unsorted array
- Adjust the delay between animations to more clearly visualise steps
- Ability to stop execution mid way through a sort

## Technologies

- [React](https://reactjs.org/)
- [Styled Components](https://styled-components.com/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Jest](https://jestjs.io/)

## How to Use

Use the controls to select the sorting algorithm, array size and any additional delay between animations. After changing the array size, select `Randomise` to generate a new unsorted array. Begin the visualiser by selecting `Sort`. The visualiser may be stopped with the `Stop` button. From there you can choose to generate a new array, or restart with the part sorted array.

The app is deployed here: https://sort-visualiser-jg.netlify.app/

### Code

If you would like to run the app locally, fork and clone the repo and install dependencies

To install with all dependencies & start the react app:

```
$ cd ../sort-visualiser
$ npm i
$ npm start
```
