import { useState } from 'react'



 const Header = () => {

 return (
  <div>
    <h1>Give feedback</h1>
  </div>
 )



 }
 const History = (props) =>{
   if (props.good == 0 && props.neutral == 0 && props.bad == 0) {
   return(
     <div>
        <p>No feedback given yet</p>
     </div>
   )
   } else {
     return (
    <div>
      <table>
        <tbody>
      <StatisticLine text="Good" value={props.good} />
      <StatisticLine text="Neutral" value={props.neutral} />
      <StatisticLine text="Bad" value={props.bad} />
      <StatisticLine text="All" value={props.good + props.neutral + props.bad} />
      <StatisticLine text="Average" value={(props.good - props.bad) / (props.good + props.neutral + props.bad) }/>
      <StatisticLine text="Positive" value={props.good / (props.good + props.neutral + props.bad) * 100 + "%" } />
      </tbody>
      </table>
    </div>
     )
   }
 }
 const Statistics = (props) => {

  return (
  <div>
    <h1>statistics</h1>
    <History good={props.good} neutral={props.neutral} bad={props.bad}/>
  </div>
  
    )
  }



  const Button = ({handleClick, text}) => {
    
    return(
  <div>
    <button onClick={handleClick}>{text}</button>
  </div>
    )
  }


  const StatisticLine = (props) => {
  
    return(
  
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>  
  
    )
  }



const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => {
    console.log(good)
    setGood(good + 1)
  }

  const handleClickNeutral = () => {
    console.log(neutral)
    setNeutral(neutral + 1)
  }

  const handleClickBad = () => {
    console.log(bad)
    setBad(bad + 1)
  }

  return (
    <div>
      <Header />
      <Button text="Good" handleClick={handleClickGood}/>
      <Button text="Neutral" handleClick={handleClickNeutral}/>
      <Button text="Bad" handleClick={handleClickBad}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App