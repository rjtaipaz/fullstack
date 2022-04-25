import { useState } from 'react'

const Button = ({handleClick, text}) => {
return (
  <div>
    <button onClick={handleClick}>{text} </button>
  </div>
)
}

const Winner = (props) => {
  return (
    <div>
      <h1>
        Anecdote with most votes
      </h1>
      <p> {props.anecdote}</p>
      <p>has {props.votes} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0])
  const [viineri, setViineri] = useState(0)

  let apustajaVotes = [0, 0, 0, 0, 0, 0, 0]
  let apuViineri = Math.max(...votes)
  let max = 0

  const getRandomInt= (max) => {
    return (Math.floor(Math.random() * max))
    }

  const handleClickNext = () => {
    setSelected(getRandomInt(6))
  }

  const handleClickVote = () => {
    apuViineri = viineri
    max = Math.max(...votes)
    apuViineri = votes.indexOf(max)
    console.log("votes.indexOf(Math.max(...votes))", votes.indexOf(Math.max(...votes)))
    console.log(Math.max(...votes))
    console.log("votes", votes )
    console.log("apuviineri", apuViineri)
    setViineri(apuViineri)
    apuViineri = viineri
    apustajaVotes = votes.map((x) => x)
    console.log("votes ennen", votes)
    console.log("ennen lisäystä apustuslista", apustajaVotes)
    console.log("ennen lisäystä arvo", apustajaVotes[selected])
    apustajaVotes[selected] += 1
    console.log("määrä kopion indeksissä", apustajaVotes[selected])
    console.log("apustuslista lisäyksen jälkeen", apustajaVotes)
    setVotes(apustajaVotes)
    
  }
  
  return (
    <div>
      {anecdotes[selected]}
     <p>has {votes[selected]} votes</p> 
      <Button handleClick={handleClickNext} text="Next anecdote"/>
      <Button handleClick = {handleClickVote} text="Updoot" />
      <Winner anecdote={anecdotes[viineri]} votes={votes[viineri]}/>
    </div>

  )
}

export default App
