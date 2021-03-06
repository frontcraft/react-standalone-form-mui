import React from 'react'
import PropTypes from 'prop-types'
import Chip from '@material-ui/core/Chip'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import withStyles from '@material-ui/core/styles/withStyles'
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
    onChange={e => setValue(name, e.target.value, required)}
    input={<Input id={name} />}
    renderValue={selected =>
      <div className={classes.chips}>
        {selected.map(item => {
          const selectedOption = options.find(option => option.value === item)
          return <Chip
            key={item}
            label={typeof selectedOption === 'string'
              ? item
              : selectedOption.label
            }
            className={classes.chip}
          />
        })}
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
    PropTypes.shape({ label: PropTypes.node, value: PropTypes.any }),
  ])),
}

export default withFormControl(withStyles(theme => ({
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(1),
  },
}))(MultiSelect))
