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
    // Storage format: [ { question: '...', option: '...' } ]
    const storage = JSON.parse(localStorage.getItem('react-polls')) || []
    console.log(storage)
    const answer = storage.filter(answer => answer.question === this.props.question)

    if (answer.length) {
      const newPoll = { ...this.state.poll }
      newPoll.voted = true
      newPoll.option = answer[0].option

      this.setState({
        poll: newPoll
      })
    }
  }

  vote = answer => {
    const storage = JSON.parse(localStorage.getItem('react-polls')) || []
    storage.push({
      question: this.props.question,
      option: answer
    })
    localStorage.setItem('react-polls', JSON.stringify(storage))
    this.props.onVote()
  }

  render() {
    const { question, answers } = this.props

    return (
      <article className={styles.poll}>
        <h3 className={styles.question}>{question}</h3>
        <ul className={styles.answers}>
          {answers.map(answer => (
            <li key={answer}>
              <button type='button' onClick={() => this.vote(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </article>
    )
  }
}
