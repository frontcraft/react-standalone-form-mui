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
}) =>
  <FormControlLabel
    control={
      <MUICheckbox
        checked={value}
        onChange={e => setValue(name, e.target.checked, required)}
      />
    }
    label={text}
    key={name}
  />

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  required: PropTypes.bool,
  text: PropTypes.node,
  small: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
}

export default withFormControl(Checkbox)
