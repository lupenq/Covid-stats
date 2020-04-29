import React, {useContext} from 'react'
// import cs from 'classnames'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {LanguageContext} from '../../Reducers/reducer'

const LanguagePicker = () => {
  const {state, dispatch} = useContext(LanguageContext);

  return (
    <ToggleButtonGroup
      value={state.language}
      exclusive
      aria-label="Set language"
    >
      <ToggleButton value="Ru" aria-label="Russian" onClick={() => {
        dispatch({type: 'Ru'})
      }}>
        Ru
      </ToggleButton>
      <ToggleButton value="En" aria-label="English" onClick={() => {
        dispatch({type: 'En'})
      }}>
        En
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default LanguagePicker