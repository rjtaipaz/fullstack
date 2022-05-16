import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'

import App from './App'

const promise = axios.get('http://localhost:3001/persons')
console.log(promise)
promise.then(response => {
  const persons = response.data
  console.log(response)
  ReactDOM.createRoot(document.getElementById('root')).render(
    <App persons={persons}/>,
    
  )
})


