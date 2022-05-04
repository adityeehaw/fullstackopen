import { useState } from 'react'

const StatisticLine = ({text,value}) => <tr><td>{text}: {value} </td></tr>

const Statistics = (props) => {
  if (props.all === 0) {
    return ('No feedback given')
  }
  return (
    <table>
      <tbody>
      <StatisticLine text = "good" value = {props.good}/>
      <StatisticLine text = "bad" value = {props.bad}/>
      <StatisticLine text = "neutral" value = {props.neutral}/>
      <StatisticLine text = "all" value = {props.all}/>
      <StatisticLine text = "average" value = {props.average}/>
      <StatisticLine text = "positive" value = {props.positive + '%'}/>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + bad + neutral
  const average = (good - bad) / all
  const positive = (good/all)*100

  return (
    <div>
      <h1>give feedback</h1>
      <br/>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <br/>
      <h1>statistics</h1>
      <Statistics good = {good} bad = {bad} all = {all} neutral = {neutral} average = {average} positive = {positive}/>
    </div>
  )
}

export default App