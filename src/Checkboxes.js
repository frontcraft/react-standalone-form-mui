import React from 'react'
import {
  FormGroup,
  FormControlLabel,
  Checkbox as MUICheckbox,
} from '@material-ui/core'
import withFormControl from './FormControl'
import { checkboxHandler } from 'react-standalone-form'

const Checkbox = ({
  name,
  value,
  options,
  required,
  setValue,
}) =>
  <FormGroup>
    {options && options.map((option, index) => {
      const optionLabel = (typeof option === 'string') ? option : option.label
      const optionValue = (typeof option === 'string') ? option : option.value
      const checked = !!(value && value.includes(optionValue))
      return (
        <FormControlLabel
          control={
            <MUICheckbox
              checked={checked}
              onChange={() => {
                const finalValue = checkboxHandler(!checked, optionValue, value)
                setValue(name, finalValue, required, 'array')
              }}
              value={optionValue} />
          }
          label={optionLabel}
          key={index}
        />
      )
    })}
  </FormGroup>

Checkbox.displayName = 'Checkbox'

export default withFormControl(Checkbox)
