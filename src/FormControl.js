import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  FormControl as MUIFormControl,
  FormHelperText,
  InputLabel,
  Typography,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import {
  FormConsumer,
  FormControlLogic,
} from 'react-standalone-form'


const withFormControl = InputComponent => {
  const FormControl = ({
    name,
    label,
    initialValue,
    type,
    help,
    className,
    addon,
    narrow,
    large,
    inlineLabel,
    inline,
    noBottomGutter,
    disabled,
    classes,
    ...otherProps
  }) =>
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
          ['Slider', 'MultiFormInput', 'Geocode'].includes(children.type.displayName)
          ? { shrink: true } : {}

        return (
          <FormControlLogic {...logicProps}>
            <MUIFormControl
              error={(validation === 'error')}
              className={classNames(classes.root, {
                [classes.bottomMargin]: bottomMargin,
                [classes.fullWidth]: fullWidth,
                [className]: className,
              })}
              disabled={disabled}
            >
              {label && ['Checkbox', 'Radio', 'Wysiwyg'].includes(children.type.displayName)
                ? <Typography variant='h6'>{label}</Typography>
                : label &&
                  <InputLabel
                    htmlFor={name}
                    {...shrinkLabel}
                  >{label}</InputLabel>
              }
              <InputComponent {...inputProps} />
              {help && <FormHelperText>{fieldsDataHelp || help}</FormHelperText>}
            </MUIFormControl>
            {/* <div
              className={classNames(classes.formControl, 'form-control', {
                [classes.inlineLabel]: inlineLabel,
                [classes.inline]: inline,
                [classes.narrow]: narrow,
                [classes.large]: large,
                [classes.noBottomGutter]: noBottomGutter,
                [classes[validation]]: validation,
                [classes.disabled]: disabled,
                [className]: className,
              })}
            >
              {label && InputComponent.displayName &&
                ['Checkbox', 'Checkboxes', 'Radio', 'Switch'].find(item => InputComponent.displayName.includes(item))
                ? <span className={classes.label}>{label}</span>
                : <label className={classes.label} htmlFor={name}>{label}</label>
              }
              <InputComponent {...inputProps} />
              {addon && <div className={classes.addon}>{addon}</div>}
              {help && <span className={classes.help}>{fieldsDataHelp || help}</span>}
            </div> */}
          </FormControlLogic>
        )
      }}
    </FormConsumer>

  withStyles(theme => ({
    root: {
      width: 220,
      maxWidth: `100%`,
      [theme.breakpoints.up('sm')]: {
        width: 290,
      },
      [theme.breakpoints.up('md')]: {
        width: 315,
      },
    },
    bottomMargin: {
      marginBottom: theme.spacing(7),
    },
    fullWidth: {
      width: '100%',
    },
  }))(FormControl)
}


withFormControl.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.node,
  className: PropTypes.string,
  addon: PropTypes.node,
  help: PropTypes.string,
  disabled: PropTypes.bool,
  validation: PropTypes.oneOf(['success', 'error']),
  inlineLabel: PropTypes.bool,
  inline: PropTypes.bool,
  narrow: PropTypes.bool,
  large: PropTypes.bool,
  noBottomGutter: PropTypes.bool,
  initialValue: PropTypes.any,
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}


export default withFormControl
