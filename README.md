# react-polls
[![NPM](https://img.shields.io/npm/v/react-polls.svg)](https://www.npmjs.com/package/react-polls) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> Customizable poll component for React

## Install

Use the package manager to install **react-polls** dependency to your project.

**NPM**
```bash
npm install --save react-polls
```
**Yarn**
```bash
yarn add react-polls
```

## Usage

After installation, import the **Poll** component from **react-polls** dependecy and start using.

*This is a basic example, for complex usage, see the **User Guide** and **Demo** sections.*

```jsx
import React, { Component } from 'react';
import Poll from 'react-polls';

// Declaring poll question and answers
const pollQuestion = 'Is react-polls useful?'
const pollAnswers = [
  { option: 'Yes', votes: 8 },
  { option: 'No', votes: 2 }
]

class App extends Component {
  state = {
    pollAnswers
  }

  // Handling user vote
  // Increments the votes count of answer when the user votes
  handleVote = voteAnswer => {
    const { pollAnswers } = this.state
    const newPollAnswers = pollAnswers.map(answer => {
      if (answer.option === voteAnswer) answer.votes++
      return answer
    })

    this.setState({
      pollAnswers: newPollAnswers
    })
  }

  render () {
    const { pollAnswers } = this.state

    return (
      <div>
        <Poll question={pollQuestion} answers={pollAnswers} onVote={this.handleVote} />
      </div>
    );
  }
};
```

## User guide

Below is listed all the props that can be passed to the **Poll** component:

|Prop|Description|Value|
|---|---|---|
|question|Defines the question that will be added to the top of the poll as title.|Type: `string`<br/>Example: `What's the best framework?`|
|answers|Defines the list of all avaible answers to the poll question and the current votes of each answer. It receives an array of objects that have `option` and `votes` properties.|Type: `array`<br/>Example: ```[{ option: 'React', votes: 23 }]```|
|onVote|Receives a callback function which will be executed when the user vote in a answer. The function receives the text answer as parameter.|Type: `function`<br/>Example: ```voteAnswer => console.log('User voted!')```|
|customStyles *(optional)*|Sets custom styles for the **Poll** component. It receives a object with the following optional properties: <ul><li>`questionSeparator`</li> <li>`questionSeparatorWidth`</li> <li>`questionBold`</li> <li>`questionColor`</li> <li>`align`</li> <li>`theme`</li></ul>|Type: `object`<br/>Example: See at ```examples/src/App.js```|
|noStorage *(optional)*|Disables the use of **LocalStorage** to save the user's vote.|Type: `boolean`<br/>Example: ```false```|
|vote *(optional)*|Receives the text answer and sets the user vote. If set, it will show the poll result. I'd recommend using this prop with **noStorage** prop.|Type: `string`<br/>Example: ```React```|

## License

MIT © [viniciusmeneses](https://github.com/viniciusmeneses)
