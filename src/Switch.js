import React from 'react'
import { FormControlLabel, Switch as MUISwitch } from '@material-ui/core'
import withFormControl from './FormControl'


const Switch = ({
  name,
  value,
  small,
  checkedLabel,
  unCheckedLabel,
  required,
  setValue,
}) => {
  const safeValue = !!value
  return (
    <FormControlLabel control={
      <MUISwitch
        checked={safeValue}
        size={small ? 'small' : 'medium'}
        onChange={e => setValue(name, e.target.checked, required)}
        onClick={e => e.stopPropagation()}
      />
    } label={safeValue ? checkedLabel : unCheckedLabel} />
  )
}

Switch.displayName = 'Switch'

export default withFormControl(Switch)
