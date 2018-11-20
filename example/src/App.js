import React, { Component } from 'react'

import Poll from 'react-polls'

const pollQuestion = 'What framework do you prefer?';

const pollAnswers = [
  { option: 'React', votes: 5 },
  { option: 'Vue', votes: 2 },
  { option: 'Angular', votes: 1 },
];

const pollStyles = {
  questionSeparator: true,
  questionSeparatorWidth: 'question',
  questionBold: false,
  questionColor: '#474747',
  align: 'center',
  theme: 'black'
}

export default class App extends Component {
  state = {
    pollAnswers: [...pollAnswers]
  }

  handleVote = (voteAnswer) => {
    const { pollAnswers } = this.state
    const newPollAnswers = pollAnswers.map(answer => {
      if (answer.option === voteAnswer) answer.votes++
      return answer
    })

    this.setState({
      pollAnswers: newPollAnswers
    })
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
        <Poll question={pollQuestion} answers={pollAnswers} onVote={this.handleVote} customStyles={pollStyles} noStorage vote="" />
      </div>
    )
  }
}
