import { useState } from 'react'

const Display = ({ text, count }) => {
  return (
    <p>
      {text}:{count}
    </p>
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

  const voteGood = () => {
    setGood(good + 1)
  }
  const voteNeutral = () => {
    setNeutral(neutral + 1)
  }
  const voteBad = () => {
    setBad(bad + 1)
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
    </div>
  )
}

export default App