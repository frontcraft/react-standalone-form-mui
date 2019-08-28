import React from 'react'
import PropTypes from 'prop-types'
import {
  Chip,
  Input,
  MenuItem,
  Select,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import withFormControl from './FormControl'


const MultiSelect = ({
  name,
  value,
  required,
  setValue,
  options,
  classes,
}) =>
  <Select
    multiple
    value={value || []}
    onChange={e => setValue(name, e.target.value, required, 'array')}
    input={<Input id={name} />}
    renderValue={selected =>
      <div className={classes.chips}>
        {selected.map(item =>
          typeof options[0] === 'string'
            ? <Chip key={item} label={item} className={classes.chip} />
            : <Chip
              key={item}
              label={options.filter(option => option.value === item)[0].label}
              className={classes.chip}
            />
        )}
      </div>
    }
  >
    {options.map((item, index) =>
      typeof item === 'string'
        ? <MenuItem key={index} value={item}>{item}</MenuItem>
        : <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
    )}
  </Select>


MultiSelect.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
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

export default withFormControl(withStyles(theme => ({
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(4),
  },
}))(MultiSelect))
