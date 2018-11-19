import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

export default class Poll extends Component {
  static propTypes = {
    question: PropTypes.string,
    answers: PropTypes.array,
    onVote: PropTypes.func
  }

  state = {
    poll: {
      voted: false,
      option: ''
    }
  }

  componentDidMount() {
    this.checkVote()
  }

  checkVote = () => {
    const storage = this.getStoragePolls()
    const answer = storage.filter(answer => answer.question === this.props.question)

    if (answer.length) {
      this.setPollVote(answer[0].option)
    }
  }

  setPollVote = (answer) => {
    const newPoll = { ...this.state.poll }
    newPoll.voted = true
    newPoll.option = answer
    this.setState({
      poll: newPoll
    })
  }

  // Storage format: [ { question: '...', option: '...' } ]
  getStoragePolls = () => JSON.parse(localStorage.getItem('react-polls')) || []

  vote = answer => {
    const storage = this.getStoragePolls()
    storage.push({
      question: this.props.question,
      option: answer
    })
    localStorage.setItem('react-polls', JSON.stringify(storage))

    this.setPollVote(answer)
    this.props.onVote(answer)
  }

  render() {
    const { question, answers } = this.props
    const { poll } = this.state

    return (
      <article className={styles.poll}>
        <h3 className={styles.question}>{question}</h3>
        <ul className={styles.answers}>
          {answers.map(answer => (
            <li key={answer}>
              {!poll.voted ? (
                <button className={styles.option} type='button' onClick={() => this.vote(answer)}>
                  {answer}
                </button>
              ) : (
                <div className={styles.result}>
                  <div className={styles.fill} />
                  <div className={styles.labels}>
                    <span className={styles.percent}>10%</span>
                    <span className={styles.answer}>{answer}</span>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </article>
    )
  }
}
