import React, {useEffect} from 'react'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import styled from 'styled-components'
import {useGlobalState} from 'state' 
import p5 from 'p5'
import config from 'game/game'

const div = React.createRef()

export default function CanvasDiv() {
  const [openSidebar, setOpenSidebar] = useGlobalState('openSidebar')
  const [editMode] = useGlobalState('editMode')
  const portrait = useMediaQuery('(orientation: portrait)')
  
  useEffect(() => {
    new p5(p5 => {
      config.initP5(p5)
    }, div.current)
  }, [])
  return <>
    <Div cursor={editMode ? 'copy' : 'auto'}>
      <div id="canvasDiv" ref={div}></div>
      {sidebarButton()}
      <p>:D</p>
    </Div>
  </>

  function sidebarButton() {
    const openIcon = portrait ? <KeyboardArrowDownIcon /> : <ChevronLeftIcon />
    const closeIcon = portrait ? <KeyboardArrowUpIcon /> : <ChevronRightIcon />
    return <>
      <button onClick={() => setOpenSidebar(x => !x)}>
        {openSidebar ? openIcon : closeIcon}
      </button>
    </>
  }
}

const Div = styled.div`
  flex: 100;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  cursor: ${({cursor}) => cursor};

  #canvasDiv {
    flex: 1;
    background-color: #dbf7ff;
    overflow: hidden;
  }

  button {
    position: absolute;
    margin: 3px;
    background-color: #dbf7ff;
    display: inline-block;
    opacity: .7;
    border: 0;
    padding: 0;
    z-index: 10;
    outline: none;
    width: 30px;
    height: 30px;
  }

  button:hover {
    outline: solid;
    outline-color: #002fff;
    outline-width: 1px;
  }

  p {
    display: none;
    position: absolute;
    margin: 3px;
    color: #ff0000;
    background-color: transparent;
    font-size: 25px;
    bottom: 5px;
    right: 5px;
    opacity: .7;
    border: 0;
    padding: 0;
    z-index: 10;
    outline: none;
  }

`