import React, { Component } from 'react'
import GithubCorner from 'react-github-corner';
import reactLogo from './assets/react-logo.svg'
import './App.css'

import Poll from 'react-polls'


const pollQuestion1 = 'Is react-polls useful?'
const pollAnswers1 = [
  { option: 'Yes', votes: 24 },
  { option: 'No', votes: 3 },
  { option: 'I don\'t know', votes: 1 }
]
const pollStyles1 = {
  questionSeparator: true,
  questionSeparatorWidth: 'question',
  questionBold: true ,
  questionColor: '#303030',
  align: 'center',
  theme: 'purple'
}


const pollQuestion2 = 'What framework do you prefer?'
const pollAnswers2 = [
  { option: 'React', votes: 5 },
  { option: 'Vue', votes: 2 },
  { option: 'Angular', votes: 1 }
]
const pollStyles2 = {
  questionSeparator: false,
  questionSeparatorWidth: 'question',
  questionBold: false ,
  questionColor: '#4F70D6',
  align: 'center',
  theme: 'blue'
}


export default class App extends Component {
  state = {
    pollAnswers1: [...pollAnswers1],
    pollAnswers2: [...pollAnswers2]
  }

  handleVote = (voteAnswer, pollAnswers, pollNumber) => {
    const newPollAnswers = pollAnswers.map(answer => {
      if (answer.option === voteAnswer) answer.votes++
      return answer
    })

    if (pollNumber === 1) {
      this.setState({
        pollAnswers1: newPollAnswers
      })
    } else {
      this.setState({
        pollAnswers2: newPollAnswers
      })
    }
  }

  componentDidMount() {
    const { pollAnswers1, pollAnswers2 } = this.state
    this.autoAddVotes(pollAnswers1, 1)
    this.autoAddVotes(pollAnswers2, 2)
  }

  autoAddVotes = (pollAnswers, pollNumber) => {
    setTimeout(() => {
      const choseAnswer = parseInt(Math.random() * 2, 10)
      this.handleVote(pollAnswers[choseAnswer].option, pollAnswers, pollNumber)
      this.autoAddVotes(pollAnswers, pollNumber)
    }, Math.random() * 5000)
  }

  render () {
    const { pollAnswers1, pollAnswers2 } = this.state

    return (
      <div className='app'>
        <header className='header'>
          <img src={reactLogo} className='logo' alt='React Logo' />
          <h1 className='name'>react-polls</h1>
        </header>
        <main className='main'>
          <div>
            <Poll question={pollQuestion1} answers={pollAnswers1} onVote={voteAnswer => this.handleVote(voteAnswer, pollAnswers1, 1)} customStyles={pollStyles1} noStorage />
          </div>
          <div>
            <Poll question={pollQuestion2} answers={pollAnswers2} onVote={voteAnswer => this.handleVote(voteAnswer, pollAnswers2, 2)} customStyles={pollStyles2} noStorage />
          </div>
        </main>

        <GithubCorner
          href='https://github.com/viniciusmeneses/react-polls'
          bannerColor='#303030'
          size={80}
          direction='right'
        />
      </div>
    )
  }
}
