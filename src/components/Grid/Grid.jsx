import { useState } from "react"
import Card from "../Card/Card"
import isWinner from "../../healpers/checkWinner"
import './Grid.css'

function Grid({ numberOfCards, score, setScore }) {
  const [board, setBoard] = useState(Array(numberOfCards).fill(""))
  const [turn, setTurn] = useState(true) // true => O, false => X
  const [winner, setWinner] = useState(null)
  const [history, setHistory] = useState([])

  function play(index) {
    if (board[index] !== "" || winner) return

    const newBoard = [...board]
    newBoard[index] = turn ? 'O' : 'X'
    setBoard(newBoard)
    setHistory([...history, { player: turn ? 'O' : 'X', index }])
    const win = isWinner(newBoard, turn ? 'O' : 'X')

    if (win) {
      setWinner(win)
      setScore({ ...score, [turn ? 'O' : 'X']: score[turn ? 'O' : 'X'] + 1 })
    } else if (!newBoard.includes("")) {
      setWinner('Tie')
    }

    setTurn(!turn)
  }

  function reset() {
    setTurn(true)
    setWinner(null)
    setBoard(Array(numberOfCards).fill(""))
    setHistory([])
  }

  function resetScore() {
    setScore({ O: 0, X: 0 })
    reset()
  }

  return (
    <div className="grid-wrapper">
      {winner && (
        <>
          <h1 className="turn-highlight">Winner is {winner}</h1>
          <button className="reset" onClick={reset}>Reset Game</button>
        </>
      )}
      <h1 className="turn-highlight">Current turn: {turn ? 'O' : 'X'}</h1>
      <div className="scoreboard">
        <p>O: {score.O}</p>
        <p>X: {score.X}</p>
        <button className="reset" onClick={resetScore}>Reset Scores</button>
      </div>
      <div className="grid">
        {board.map((el, idx) => <Card gameEnd={!!winner} key={idx} onPlay={play} player={el} index={idx} />)}
      </div>
      <div className="history">
        <h2>Game History</h2>
        <ul>
          {history.map((move, index) => (
            <li key={index}>{move.player} moved to {move.index + 1}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Grid
