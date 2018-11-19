import React, { Component } from 'react'

import Poll from 'react-polls'

const pollQuestion = 'What\'s your favourite JS framework?';

const pollAnswers = [
  { option: 'React', votes: 62 },
  { option: 'Vue', votes: 20 },
  { option: 'Angular', votes: 15 },
];

export default class App extends Component {
  state = {
    pollAnswers
  }

  handleVote = (voteAnswer) => {
    const { pollAnswers } = this.state
    pollAnswers.forEach(answer => answer.option === voteAnswer ? answer.votes++ : answer.votes)
  }

  componentDidMount() {
    this.teste()
  }

  teste = () => {
    setTimeout(() => {
      const { pollAnswers } = this.state
      const choseAnswer = parseInt(Math.random() * 3, 10)
      pollAnswers[choseAnswer].votes++
      this.setState({
        pollAnswers
      })
      this.teste()
    }, 500)
  }

  render () {
    const { pollAnswers } = this.state

    return (
      <div>
        <Poll question={pollQuestion} answers={pollAnswers} onVote={this.handleVote} />
      </div>
    )
  }
}
