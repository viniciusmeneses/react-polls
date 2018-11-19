import React, { Component } from 'react'

import Poll from 'react-polls'

export default class App extends Component {
  render () {
    return (
      <div>
        <Poll question="What's your favourite JS framework?" answers={['React', 'Vue', 'Angular']} onVote={() => {}} />
      </div>
    )
  }
}
