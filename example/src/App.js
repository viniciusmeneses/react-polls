import React, { Component } from 'react'

import Poll from 'react-polls'

const pollQuestion = 'What\'s your favourite JS framework?';

const pollAnswers = [
  { option: 'React', votes: 62 },
  { option: 'Vue', votes: 20 },
  { option: 'Angular', votes: 15 },
];

const pollStyles = {
  questionSeparator: true,
  questionSeparatorWidth: 'title',
  questionBold: false,
  questionColor: '#3a3a3a',
  align: 'center',
  theme: 'default'
}

export default class App extends Component {
  state = {
    pollAnswers
  }

  handleVote = (voteAnswer) => {
    const { pollAnswers } = this.state
    pollAnswers.forEach(answer => answer.option === voteAnswer ? answer.votes++ : answer.votes)
  }

  componentDidMount() {
    this.autoAddVotes()
  }

  autoAddVotes = () => {
    setTimeout(() => {
      const { pollAnswers } = this.state
      const choseAnswer = parseInt(Math.random() * 3, 10)
      pollAnswers[choseAnswer].votes++
      this.setState({
        pollAnswers
      })
      this.autoAddVotes()
    }, Math.random() * 5000)
  }

  render () {
    const { pollAnswers } = this.state

    return (
      <div>
        <Poll question={pollQuestion} answers={pollAnswers} onVote={this.handleVote} customStyles={pollStyles} />
      </div>
    )
  }
}
