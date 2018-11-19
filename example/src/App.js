import React, { Component } from 'react'

import Poll from 'react-polls'

const answers = [
  { option: 'React', votes: 62 },
  { option: 'Vue', votes: 20 },
  { option: 'Angular', votes: 15 },
]

export default class App extends Component {
  render () {
    return (
      <div>
        <Poll question="What's your favourite JS framework?" answers={answers} onVote={() => {}} />
      </div>
    )
  }
}
