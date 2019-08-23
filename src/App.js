import React, {useState} from 'react';
import './App.css';

const Feedback = () => <div>Give Feedback</div>
const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>
const Statistics = ({text, value}) => {
  return(
    <div>
      {text}: {value}
    </div>
  )
}
const StatisticsTable = (props) => {
  const {good, neutral, bad, total, avg, pos} = props

  if(good === 0 && neutral === 0 && bad === 0){
    return(
      <div>No data</div>
    )
  }

  return(
    <table>
      <tbody>
        <tr>
          <td><Statistics text="good" value={good} /></td>
        </tr>
        <tr>
          <td><Statistics text="neutral" value={neutral} /></td>
        </tr>
        <tr>
          <td><Statistics text="bad" value={bad} /></td>
        </tr>
        <tr>
          <td><Statistics text="all" value={total} /></td>
        </tr>
        <tr>
          <td><Statistics text="avg" value={avg} /></td>
        </tr>
        <tr>
          <td><Statistics text="positive" value={pos} /></td>
        </tr>
      </tbody>
      
    </table>
  )
  
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGoodCount = () => {
    setTotal(total + 1)
    setGood(good + 1)
  }

  const handleNeutralcount = () => {
    setTotal(total + 1 )
    setNeutral(neutral + 1)
  }

  const handleBadCount = () => {
    setTotal(total + 1)
    setBad(bad + 1)
  }

  let pos = 0
  if(good !== 0 && total !== 0) {
    pos = (good/total) * 100
    pos = pos.toString() + '%'
    console.log(pos)
  }

  let avg = 0
  let sum = 0
  let good_score = 1
  let neutral_score = 0
  let bad_score = -1

  sum = (good_score * good) + (neutral_score * neutral) +  (bad_score * bad)
  if(total !== 0){
    avg = sum/total
  }

  const props = {
    good,
    neutral,
    bad,
    total,
    avg,
    pos
  }
  
  return(
    <div>
      <Feedback />
      <Button handleClick={handleGoodCount} text='good' />
      <Button handleClick={handleNeutralcount} text='neutral' />
      <Button handleClick={handleBadCount} text='bad' />
      <StatisticsTable {...props} />
    </div>
  )
}

export default App;
