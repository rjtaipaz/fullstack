import { useState, useEffect } from 'react'
import nameService from './services/persons'
import './index.css'

const Person = ({person, handleDelete}) =>{
return(
  <li>
    {person.name} {person.number} <button onClick={() => 
      handleDelete(person.id, person)}> Delete </button>
  </li>
)
}

const PersonForm = ({addName, handleNameChange, handleNumberChange, newName, newNumber}) =>
{
  return (
    <form onSubmit={addName}>
    <div>
      name: <input value={newName} onChange={handleNameChange}/>
    </div>
    <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Notification = ({ errorMessage, confirmationMessage }) => {
  if (errorMessage === null && confirmationMessage === null) {
    return null
  } else if (confirmationMessage !== null) {
    return (
      <div className="confirmation">
        {confirmationMessage}
      </div>
    )
  } else if(errorMessage !== null){
    return (
      <div className="error">
        {errorMessage}
      </div>
      )
  }

  
  
}

const Persons = ({personsToShow, handleDelete}) => 
{
  return(
    <ul>
    {personsToShow.map(person => <Person key={person.id} person={person} handleDelete={handleDelete}/>)}
  </ul>
  )
}

const Search = ({filter, handleFilterChange}) => {
  return (
    <div> Search: <input value={filter} onChange={handleFilterChange}/></div>
  )
}

const App = (props) => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [found, setFound] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [confirmationMessage, setConfirmationMessage] = useState(null)


  useEffect(() => {
    nameService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
      setPersons(initialPersons)
      console.log(initialPersons)
      console.log(persons)
    })
}, [])



  const addName = (event) => {

    

    event.preventDefault()
    console.log('Nimi lisätty:', event.target)
    const nameObject ={
      name: newName,
      id: persons.length+1,
      number: newNumber
    }
    const personSame = (persons.find(person => person.name === newName))
    console.log('personSame',personSame)
    console.log('addName newName',newName)
    console.log('newNumber', newNumber)
    const anyName = (persons.some(person => person.name === newName)) 
    ? 
    nameUpdate(personSame, newName)
    : 
    nameAdded(nameObject)
  }

  const nameAdded = (nameObject) => {
    setPersons(persons.concat(nameObject))
    setNewName('')
    
    
    nameService
    .create(nameObject)
    .then(returnedName => {
      setPersons(persons.concat(returnedName))
      setNewName('')
     
        setConfirmationMessage(
          `Person '${nameObject.name}' was added successfully`
        )
        setTimeout(() => {
          setConfirmationMessage(null)
        }, 5000)
        
      })
    
  }

  const nameUpdate = (personSame, newName) =>{
    window.confirm(`${newName} is already added to phonebook, do you want to update the number?`) 
    console.log('nameUpdate: person.id',personSame.id)
    let id = personSame.id
    console.log('nameUpdate: id',id)
    persons[id-1].number = newNumber
    nameService.update(id, personSame)
    .then(returnedName => {
      setPersons(persons.map(person => person.id !== personSame.id ? person : returnedName),
      console.log('returned name:', returnedName))
    }).catch(error => {
      console.log('catch')
      
      setErrorMessage(`The information of "${personSame.name}" was already deleted`)
      console.log(errorMessage)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setPersons(persons.filter(n => n.id !== id))
    })

  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
    console.log('kaikki nimet', persons)
    console.log(found)
   
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
    console.log('kaikki numerot', persons.number)
  }   
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
    setFound(true)
    console.log(found)
    console.log(persons.filter(person => person.name === setNewFilter))
  }

  const handleDelete = (id, person) => {
    console.log(id)
    if (window.confirm("Do you want to delete " + person.name + " ?"))
    console.log('handleDeletessä',nameService.getAll())
    
    nameService
    .getAll()
    .then(returnedName => {
      setPersons(persons.filter(person =>
      {
      return person.id !== id
      }))
      setNewName('')
      nameService.poisto(id)
    })
    

  }
  const personsToShow = found
  ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  : persons
  
  
  

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification errorMessage={errorMessage} confirmationMessage={confirmationMessage}/>
       <Search filter={filter} handleFilterChange={handleFilterChange}/>
      <h3>Add a new person</h3>
        <PersonForm addName={addName} handleNumberChange={handleNumberChange} handleNameChange={handleNameChange}
        newNumber={newNumber} newName={newName}/>
      <h2>Numbers</h2>
        <Persons personsToShow={personsToShow} handleDelete={handleDelete}/>
    </div>
  )

  }

export default App