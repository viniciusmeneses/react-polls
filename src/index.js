import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

export default class Poll extends Component {
  // Answers prop format: [ { option: string, votes: number } ]
  static propTypes = {
    question: PropTypes.string,
    answers: PropTypes.array,
    onVote: PropTypes.func
  }

  state = {
    poll: {
      voted: false,
      option: ''
    },
    totalVotes: 0
  }

  componentDidMount() {
    this.checkVote()
    this.loadVotes()
  }

  componentWillReceiveProps() {
    this.loadVotes()
  }

  checkVote = () => {
    const { question } = this.props
    const storage = this.getStoragePolls()
    const answer = storage.filter(answer => answer.question === question)

    if (answer.length) {
      this.setPollVote(answer[0].option)
    }
  }

  loadVotes = () => {
    const { answers } = this.props
    const totalVotes = answers.reduce((total, answer) => total + answer.votes, 0)
    this.setState({
      totalVotes
    })
  }

  setPollVote = (answer) => {
    const { poll } = this.state
    const newPoll = { ...poll }
    newPoll.voted = true
    newPoll.option = answer
    this.setState({
      poll: newPoll
    })
  }

  // Storage format: [ { question: string, option: string } ]
  getStoragePolls = () => JSON.parse(localStorage.getItem('react-polls')) || []

  vote = answer => {
    const { question, onVote } = this.props
    const storage = this.getStoragePolls()
    storage.push({
      question: question,
      option: answer
    })
    localStorage.setItem('react-polls', JSON.stringify(storage))

    this.setPollVote(answer)
    onVote(answer)
  }

  calculatePercent = (votes, total) => `${parseInt((votes / total) * 100)}%`

  render() {
    const { question, answers } = this.props
    const { poll, totalVotes } = this.state

    return (
      <article className={styles.poll}>
        <h3 className={styles.question}>{question}</h3>
        <ul className={styles.answers}>
          {answers.map(answer => (
            <li key={answer.option}>
              {!poll.voted ? (
                <button className={styles.option} type='button' onClick={() => this.vote(answer.option)}>
                  {answer.option}
                </button>
              ) : (
                <div className={styles.result}>
                  <div className={styles.fill} style={{ width: this.calculatePercent(answer.votes, totalVotes) }} />
                  <div className={styles.labels}>
                    <span className={styles.percent}>{this.calculatePercent(answer.votes, totalVotes)}</span>
                    <span className={styles.answer}>{answer.option}</span>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
        <p className={styles.votes}>{`${totalVotes} vote${totalVotes !== 1 ? 's' : ''}`}</p>
      </article>
    )
  }
}
