import React from 'react'
import PropTypes from 'prop-types'

const GameBoard = props => {
  return (
    <div>GameBoardh</div>
  )
}

GameBoard.propTypes = {
    isSinglePlayer: PropTypes.bool.isRequired
}

GameBoard.defaultProps = {
    isSinglePlayer: false
};

export default GameBoard