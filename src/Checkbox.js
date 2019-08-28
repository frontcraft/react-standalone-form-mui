import React from 'react'
import PropTypes from 'prop-types'
import {
  FormControlLabel,
  Checkbox as MUICheckbox,
} from '@material-ui/core'
import withFormControl from './FormControl'


const Checkbox = ({
  name,
  value,
  text,
  required,
  setValue,
}) => {
  const safeValue = !!value
  return (
    <FormControlLabel
      control={
        <MUICheckbox
          checked={safeValue}
          onChange={e => setValue(name, e.target.checked, required)}
        />
      }
      label={text}
      key={name}
    />
  )
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  required: PropTypes.bool,
  text: PropTypes.node,
  setValue: PropTypes.func.isRequired,
}

export default withFormControl(Checkbox)
