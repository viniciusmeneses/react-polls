import React, { Component } from 'react'
import PropTypes from 'prop-types'
import animate from 'animate.css'

import styles from './styles.css'

const themes = {
  default: ['#6d4b94', '#7c6497', '#6d4b943b']
}

export default class Poll extends Component {
  // Answers prop format: [ { option: string, votes: number } ]
  static propTypes = {
    question: PropTypes.string,
    answers: PropTypes.array,
    onVote: PropTypes.func,
    customStyles: PropTypes.object,
    noStorage: PropTypes.bool,
    vote: PropTypes.string
  }

  state = {
    poll: {
      voted: false,
      option: ''
    },
    totalVotes: 0
  }

  componentDidMount() {
    const { noStorage } = this.props
    if (!noStorage) this.checkVote()
    this.loadVotes()
  }

  componentWillReceiveProps() {
    this.loadVotes()
  }

  checkVote = () => {
    const { question } = this.props
    const storage = this.getStoragePolls()
    const answer = storage.filter(answer => answer.question === question && answer.url === location.href)

    if (answer.length) {
      this.setPollVote(answer[0].option)
    }
  }

  loadVotes = () => {
    const { answers, vote } = this.props
    const totalVotes = answers.reduce((total, answer) => total + answer.votes, 0)
    this.setState({
      totalVotes
    })
    if (vote) this.setPollVote(vote)
  }

  setPollVote = (answer) => {
    const { answers } = this.props
    const optionsOnly = answers.map(item => item.option)

    if (optionsOnly.includes(answer)) {
      const { poll } = this.state
      const newPoll = { ...poll }
      newPoll.voted = true
      newPoll.option = answer

      this.setState({
        poll: newPoll
      })
    }
  }

  // Storage format: [ { url: string, question: string, option: string } ]
  getStoragePolls = () => JSON.parse(localStorage.getItem('react-polls')) || []

  vote = answer => {
    const { question, onVote, noStorage } = this.props
    if (!noStorage) {
      const storage = this.getStoragePolls()
      storage.push({
        url: location.href,
        question: question,
        option: answer
      })
      localStorage.setItem('react-polls', JSON.stringify(storage))
    }

    this.setPollVote(answer)
    onVote(answer)
  }

  calculatePercent = (votes, total) => `${parseInt((votes / total) * 100)}%`

  alignPoll = (customAlign) => {
    if (customAlign === 'left') {
      return 'flex-start'
    } else if (customAlign === 'right') {
      return 'flex-end'
    } else {
      return 'center'
    }
  }

  obtainColors = customTheme => {
    const colors = themes[customTheme]
    if (!colors) {
      return themes['default']
    }
    return colors
  }

  render() {
    const { question, answers, customStyles } = this.props
    const { poll, totalVotes } = this.state
    const colors = this.obtainColors(customStyles.theme)

    return (
      <article className={`${animate.animated} ${animate.fadeIn} ${animate.faster} ${styles.poll}`} style={{ textAlign: customStyles.align, alignItems: this.alignPoll(customStyles.align) }}>
        <h3 className={styles.question} style={{ borderWidth: customStyles.questionSeparator ? '1px' : '0', alignSelf: customStyles.questionSeparatorWidth === 'title' ? 'center' : 'stretch', fontWeight: customStyles.questionBold ? 'bold' : 'normal', color: customStyles.questionColor, borderBottomColor: colors[2] }}>{question}</h3>
        <ul className={styles.answers}>
          {answers.map(answer => (
            <li key={answer.option}>
              {!poll.voted ? (
                <button className={`${animate.animated} ${animate.fadeIn} ${animate.faster} ${styles.option} ${styles[customStyles.theme]}`} style={{ color: colors[0], borderColor: colors[1] }} type='button' onClick={() => this.vote(answer.option)}>
                  {answer.option}
                </button>
              ) : (
                <div className={`${animate.animated} ${animate.fadeIn} ${animate.faster} ${styles.result}`} style={{ color: colors[0], borderColor: colors[1] }}>
                  <div className={styles.fill} style={{ width: this.calculatePercent(answer.votes, totalVotes), backgroundColor: colors[2] }} />
                  <div className={styles.labels}>
                    <span className={styles.percent} style={{ color: colors[0] }}>{this.calculatePercent(answer.votes, totalVotes)}</span>
                    <span className={`${styles.answer} ${answer.option === poll.option ? styles.vote : ''}`} style={{ color: colors[0] }}>{answer.option}</span>
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
