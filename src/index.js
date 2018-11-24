import React, { Component } from 'react'
import PropTypes from 'prop-types'
import animate from 'animate.css'

import styles from './styles.css'

const themes = {
  purple: ['#6D4B94', '#7C6497', '#6D4B943B'],
  red: ['#E23D3D', '#EF4545', '#FF28283B'],
  blue: ['#5674E0', '#5674E0', '#5674E03B'],
  black: ['#303030', '#303030', '#3030303B'],
  white: ['#ffffff', '#ffffff', '#ffffff3B'],
  cyan: ['#00BCDD', '#00BCDD', '#00BCDD3B']
}

export default class Poll extends Component {
  // Answers prop format: [ { option: string, votes: number } ]
  static propTypes = {
    question: PropTypes.string.isRequired,
    answers: PropTypes.array.isRequired,
    onVote: PropTypes.func.isRequired,
    customStyles: PropTypes.object,
    noStorage: PropTypes.bool,
    vote: PropTypes.string
  }

  static defaultProps = {
    customStyles: {
      questionSeparator: true,
      questionSeparatorWidth: 'question',
      questionBold: true,
      questionColor: '#303030',
      align: 'center',
      theme: 'black'
    },
    noStorage: false
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
      totalVotes: answers.reduce((total, answer) => total + answer.votes, 0)
    })
    if (vote) this.setPollVote(vote)
  }

  setPollVote = (answer) => {
    const { answers, vote } = this.props
    const optionsOnly = answers.map(item => item.option)

    if (optionsOnly.includes(answer)) {
      const { poll, totalVotes } = this.state
      const newPoll = { ...poll }
      newPoll.voted = true
      newPoll.option = answer

      if (!vote) {
        this.setState({
          poll: newPoll,
          totalVotes: totalVotes + 1
        })
      } else {
        this.setState({
          poll: newPoll
        })
      }
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

  calculatePercent = (votes, total) => {
    if (votes === 0 && total === 0) {
      return '0%'
    }
    return `${parseInt((votes / total) * 100)}%`
  }

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
      return themes['black']
    }
    return colors
  }

  render() {
    const { question, answers, customStyles } = this.props
    const { poll, totalVotes } = this.state
    const colors = this.obtainColors(customStyles.theme)

    return (
      <article className={`${animate.animated} ${animate.fadeIn} ${animate.faster} ${styles.poll}`} style={{ textAlign: customStyles.align, alignItems: this.alignPoll(customStyles.align) }}>
        <h3 className={styles.question} style={{ borderWidth: customStyles.questionSeparator ? '1px' : '0', alignSelf: customStyles.questionSeparatorWidth === 'question' ? 'center' : 'stretch', fontWeight: customStyles.questionBold ? 'bold' : 'normal', color: customStyles.questionColor }}>{question}</h3>
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
