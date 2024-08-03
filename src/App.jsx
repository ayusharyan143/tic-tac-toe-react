import './App.css'
import Grid from './components/Grid/Grid'
import { useState } from 'react'

function App() {
  const [score, setScore] = useState({ O: 0, X: 0 })

  return (
    <>
      <Grid numberOfCards={9} score={score} setScore={setScore} />
    </>
  )
}

export default App
