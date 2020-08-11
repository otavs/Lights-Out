import React, {useState} from 'react'
import {Slider, Switch, Button} from '@material-ui/core'
import game from 'game/game'
import styled from 'styled-components'
import {useGlobalState} from 'state' 

export default function Sidebar() {
  const [opened, setOpened] = useGlobalState('openSidebar')
  const [editMode, setEditMode] = useGlobalState('editMode')
  const [showSolution, setShowSolution] = useGlobalState('showSolution')
  const [isImpossible, setImpossible] = useState(game.isImpossible)
  game.setImpossibleGUI = setImpossible
  const [m, setM] = useState(game.m)
  const [n, setN] = useState(game.n)
  return <>
    <Div opened={opened} cursor={editMode ? 'copy' : 'auto'}>
      <h1>Lights Out!</h1>

      <h2>Width: {n}</h2>
      <Slider
        value={n}
        aria-labelledby="discrete-slider"
        // valueLabelDisplay="auto"
        step={1} marks min={1} max={10}
        onChange={(e, val) => {
          if(n == val) return
          game.updateN(val)
          setN(val)
          setImpossible(game.isImpossible)
        }}
        style={{
          width: '80%',
          margin: '0 0 20px 0'
        }}
      />

      <h2>Height: {m}</h2>
      <Slider
        value={m}
        aria-labelledby="discrete-slider"
        step={1} marks min={1} max={10}
        onChange={(e, val) => {
          if(m == val) return
          game.updateM(val)
          setM(val)
          setImpossible(game.isImpossible)
        }}
        style={{
          width: '80%',
          margin: '0 0 20px 0'
        }}
      />   
      
      <Button variant="outlined" color="primary" onClick={() => {
        game.reset()
        setM(game.m)
        setN(game.n)
        setShowSolution(game.showSolution)
        setEditMode(game.editMode)
        setImpossible(game.isImpossible)
      }}>
        Shuffle
      </Button>

      <h2>Show Solution</h2>
      <div style={{margin: '0 0 13px 0'}}>
        <Switch checked={showSolution} color="primary" onChange={e => {
          setShowSolution(e.target.checked)
          game.showSolution = e.target.checked
        }}/>
      </div>

      <h2>Edit Mode</h2>
      <div style={{margin: '0 0 13px 0'}}>
        <Switch checked={editMode} color="primary" onChange={e => {
          setEditMode(e.target.checked)
          game.editMode = e.target.checked
        }}/>
      </div>

      <h2 style={{
        visibility: isImpossible ? 'visible' : 'hidden',
        marginTop: '15px',
        color: 'red'
      }}>
        No Solution!
      </h2>

    </Div>
  </>
}

const Div = styled.div`
  flex: ${({opened}) => opened * 40};
  background-color: #d4faef;
  overflow-x: hidden;
  transition: flex .75s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: ${({cursor}) => cursor};

  h1 {
    margin: 15px 15px 30px 15px;
    text-align: center;
    font-size: 35px;
  }

  h2 {
    margin: 0 0 0 0;
    text-align: center;
    // align-self: flex-start;
  }

  Switch {
    margin: 0 0 20px 0;
  }

  Button {
    margin-bottom: 20px;
  }

  ::-webkit-scrollbar {
    width: 4px;
    background-color: #F5F5F5;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #000000;
    border: 2px solid #555555;
  }
`
