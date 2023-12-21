import { useState } from 'react'

const ShowAverageAndPostive = ({ sum, total, good }) => {
  const average = sum / total
  const percentage = good / total

  if (total == 0) {
    return (
      <p>doesnt have votes yet</p>
    )
  }
  return (
    <>
      <Display count={average} text="average" />
      positive {percentage * 100} %
    </>
  )
}

const Display = ({ text, count }) => {
  return (
    <>
      {text} {count}
      <br />
    </>
  )
}

const Button = ( {handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [all, setAll] = useState(0)

  const [sum, setSum] = useState(0)

  const voteGood = () => {
    setGood(good + 1)
    setAll(all + 1)
    setSum(sum + 1)
  }
  const voteNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }
  const voteBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setSum(sum - 1)
  }

  return (
    <div>
      <h1> give feedback </h1>
      <Button handleClick={voteGood} text="good" />
      <Button handleClick={voteNeutral} text="neutral" />
      <Button handleClick={voteBad} text="bad" />

      <h1> statistics </h1>
      <Display count={good} text="good" />
      <Display count={neutral} text="neutral" />
      <Display count={bad} text="bad" />
      <Display count={all} text="all" />
      <ShowAverageAndPostive sum={sum} total={all} good={good}/> 
    </div>
  )
}

export default App