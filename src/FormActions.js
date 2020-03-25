import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'


const FormActions = ({ children, classes }) =>
  <div className={classes.root}>{children}</div>

export default withStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    alignItems: 'center',
    margin: -theme.spacing(2),
    '& > *': {
      margin: theme.spacing(2),
    },
  },

}))(FormActions)
