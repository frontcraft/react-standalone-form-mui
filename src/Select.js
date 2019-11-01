import React from 'react'
import PropTypes from 'prop-types'
import MUISelect from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import withFormControl from './FormControl'

const Select = ({
  name,
  value,
  required,
  options = [],
  setValue,
}) =>
  <MUISelect
    value={value || ''}
    onChange={e => setValue(name, e.target.value, required)}
    inputProps={{
      name,
      id: name,
    }}
  >
    {!required &&
      <MenuItem value=''><em>None</em></MenuItem>
    }
    {options.map((item, index) =>
      typeof item === 'string'
        ? <MenuItem key={index} value={item}>{item}</MenuItem>
        : <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
    )}
  </MUISelect>

Select.propTypes = {
  name: PropTypes.any.isRequired,
  value: PropTypes.string,
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      value: PropTypes.any,
    }),
  ])),
}

export default withFormControl(Select)
