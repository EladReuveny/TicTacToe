import React from 'react'
import PropTypes from 'prop-types'

const GameBoard = props => {
  return (
    <div className="board">
        <div className="board-row">
            {}
        </div>
    </div>
  )
}

GameBoard.propTypes = {
    isSinglePlayer: PropTypes.bool.isRequired
}

GameBoard.defaultProps = {
    isSinglePlayer: false
};

export default GameBoard