import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

export default class ExampleComponent extends Component {
  static propTypes = {
    question: PropTypes.string,
    answers: PropTypes.array,
    onVote: PropTypes.func
  }

  render() {
    const { question, answers } = this.props

    return (
      <article className={styles.poll}>
        <h3 className={styles.question}>{question}</h3>
        <ul className={styles.answers}>
          {answers.map(answer => (
            <li key={answer}>
              <button>{answer}</button>
            </li>
          ))}
        </ul>
      </article>
    )
  }
}
