import ReactDOM from 'react-dom'
import axios from 'axios'

import App from './App'

const promise = axios.get('https://restcountries.com/v3.1/all')
console.log(promise)
promise.then(response => {
  const persons = response.data
  console.log(response)
})


ReactDOM.render(
  <App />,
  document.getElementById('root')
)