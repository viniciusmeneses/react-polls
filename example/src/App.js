import React, { Component } from 'react'

import ExampleComponent from 'react-polls'

export default class App extends Component {
  render () {
    return (
      <div>
        <ExampleComponent question="What's your favourite JS framework?" answers={['React', 'Vue', 'Angular']} />
      </div>
    )
  }
}
