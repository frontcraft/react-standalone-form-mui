import React from 'react'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MUIRadio from '@material-ui/core/Radio'
import withFormControl from './FormControl'

const Radio = ({
  name,
  value,
  options,
  required,
  setValue,
  inline,
}) => {
  return (
    <RadioGroup
      aria-label={name}
      name={name}
      value={value || ''}
      onChange={event => {
        setValue(name, event.target.value, required)
      }}
      row={inline}
    >
      {options && options.map((option, index) => {
        const optionLabel = (typeof option === 'string') ? option : option.label
        const optionValue = (typeof option === 'string') ? option : option.value
        return (
          <FormControlLabel
            value={optionValue}
            control={<MUIRadio color='default' />}
            label={optionLabel}
            key={index}
          />
        )
      })}
    </RadioGroup>
  )
}

Radio.displayName = 'Radio'

export default withFormControl(Radio)
