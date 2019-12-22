import React from 'react'
import PropTypes from 'prop-types'
import MUIInput from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import withFormControl from './FormControl'

const Input = ({
  name,
  type,
  value,
  placeholder,
  required,
  maxChars,
  multiline,
  addon,
  disableUnderline,
  setValue,
}) =>
  <MUIInput
    id={name}
    type={type}
    onChange={e => {
      const finalValue = (maxChars && e.target.value.length > maxChars)
        ? e.target.value.substring(0, maxChars)
        : e.target.value
      setValue(name, finalValue, required, { type })
    }}
    value={value || ''}
    placeholder={placeholder}
    startAdornment={maxChars
      ? <InputAdornment position='end'>
        {`${value ? value.length : 0}/${maxChars}`}
      </InputAdornment>
      : addon || null
    }
    disableUnderline={disableUnderline}
    multiline={multiline}
  />


Input.defaultProps = {
  type: 'text',
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.any,
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
}

export default withFormControl(Input)
