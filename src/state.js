import {createGlobalState} from 'react-hooks-global-state'
import game from 'game/game'

export const {useGlobalState} = createGlobalState({
  openSidebar: false,
  editMode: game.editMode,
  showSolution: game.showSolution
})
