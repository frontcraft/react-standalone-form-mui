import React from 'react'
import { withStyles } from '@material-ui/core/styles'


const FormActions = ({ children, classes }) =>
  <div className={classes.root}>{children}</div>

export default withStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  },

}))(FormActions)
