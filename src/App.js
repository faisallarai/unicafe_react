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
  const {good, neutral, bad, total, average, positive} = props

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
          <td><Statistics text="avg" value={average} /></td>
        </tr>
        <tr>
          <td><Statistics text="positive" value={positive} /></td>
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

  const calculateGood = () => {
    setGood(good + 1)
  }

  const calculateTotal = () => {
    setTotal(total + 1)
  }

  const handleGoodCount = () => {
    calculateGood()    
    calculateTotal()
    calculateAverage()
    calculatePositive()
  }

  const handleNeutralcount = () => {
    setNeutral(neutral + 1)
    calculateTotal()
    calculateAverage()
  }

  const handleBadCount = () => {
    setBad(bad + 1)
    calculateTotal()
    calculateAverage()
  }

  const calculatePositive = () => {
    console.log(good, total)
    if(good !== 0 && total !== 0) {
      let newpositive = ((good/total) * 100).toFixed(2)
      newpositive = newpositive.toString() + '%'
      return newpositive
    }
  }

  const calculateAverage = () => {

    let good_score = 1
    let neutral_score = 0
    let bad_score = -1

    let sum = (good_score * good) + (neutral_score * neutral) +  (bad_score * bad)
    if(total !== 0){
      return (sum/total).toFixed(2)
    }
  }

  const props = {
    good,
    neutral,
    bad,
    total,
    average: calculateAverage(),
    positive: calculatePositive()
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
