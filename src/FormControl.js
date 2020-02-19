import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import MUIFormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import {
  FormConsumer,
  FormControlLogic,
} from 'react-standalone-form'


const withFormControl = InputComponent => ({
  name,
  label,
  initialValue,
  type,
  help,
  className,
  addon,
  narrow,
  large,
  variant,
  noBottomGutter,
  fullWidth,
  disabled,
  ...otherProps
}) => {
  const classes = useStyles()
  return (
    <FormConsumer>
      {({ fieldsData, setValue }) => {
        if (!fieldsData[name]) return null

        const { value, validation, required, help: fieldsDataHelp } = fieldsData[name]
        const logicProps = {
          name,
          initialValue,
          required,
          type,
          setValue,
        }
        const inputProps = {
          name,
          value: (value !== null ? value : initialValue) || '',
          required,
          type,
          setValue,
          ...otherProps,
        }

        const shrinkLabel = (type && (type.includes('date') || type.includes('time'))) ||
          (InputComponent.displayName && ['Slider', 'MultiFormInput', 'Geocode']
            .find(item => InputComponent.displayName.includes(item)))
          ? { shrink: true } : {}

        return (
          <FormControlLogic {...logicProps}>
            <MUIFormControl
              error={(validation === 'error')}
              className={classNames(classes.root, {
                [classes.noBottomGutter]: noBottomGutter,
                [className]: className,
              })}
              fullWidth={fullWidth}
              variant={variant}
              disabled={disabled}
            >
              {label
                ? InputComponent.displayName && ['Checkbox', 'Radio', 'Wysiwyg']
                  .find(item => InputComponent.displayName.includes(item))
                  ? <Typography variant='h6'>{label}</Typography>
                  : label &&
                    <InputLabel
                      htmlFor={name}
                      {...shrinkLabel}
                    >{label}</InputLabel>
                : null
              }
              <InputComponent {...inputProps} />
              {(fieldsDataHelp || help) &&
                <FormHelperText>{fieldsDataHelp || help}</FormHelperText>
              }
            </MUIFormControl>
          </FormControlLogic>
        )
      }}
    </FormConsumer>
  )
}


const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: `100%`,
    display: 'flex',
  },
  noBottomGutter: {
    marginBottom: 0,
  },
}))


withFormControl.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.node,
  className: PropTypes.string,
  addon: PropTypes.node,
  help: PropTypes.string,
  disabled: PropTypes.bool,
  validation: PropTypes.oneOf(['success', 'error']),
  narrow: PropTypes.bool,
  large: PropTypes.bool,
  noBottomGutter: PropTypes.bool,
  initialValue: PropTypes.any,
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}


export default withFormControl
