import React from 'react'
import GameBoard from './GameBoard'

const App = () => {
  return (
    <div id="container">
      <GameBoard isSinglePlayer={true}/>
    </div>
  )
}

export default App