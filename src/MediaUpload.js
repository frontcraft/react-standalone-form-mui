import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import ClearIcon from '@material-ui/icons/Clear'
import MovieIcon from '@material-ui/icons/Movie'
import withFormControl from './FormControl'


const MediaUpload = ({
  name,
  type,
  value,
  required,
  setValue,
  classes,
}) =>
  !value
    ? <div className={classes.imageUploadWrapper}>
      <input
        accept={`${type === 'media' ? 'video/*,' : ''}image/*`}
        className={classes.imageUpload}
        id={name}
        type='file'
        onChange={e => {
          const fileReader = new FileReader()
          const { name: fileName, type: fileType } = e.target.files[0]
          const dataFile = e.target.files[0]
          fileReader.readAsDataURL(e.target.files[0])
          fileReader.onload = () => {
            const data = fileReader.result
            setValue(name, {
              fileName,
              type: fileType.split('/')[0],
              data,
              dataFile,
            }, required, { type })
          }
        }}
      />
      <label htmlFor={name} className={classes.imageUploadLabel}>
        <Button component='span' size='small'>
          <CloudUploadIcon />&nbsp;Upload image{type === 'media' && ' or video'}
        </Button>
      </label>
    </div>
    : <div className={classes.imageUploadWrapper}>
      {typeof value === 'string' || value.type === 'image'
        ? <img
          src={
            typeof value === 'string' && value.includes('http')
              ? value
              : value.data
          }
          className={classes.imageUploadImage}
          alt='Uploaded file'
        />
        : <MovieIcon className={classes.imageUploadIcon} />
      }
      <Typography variant='caption' gutterBottom>{value.name}</Typography>
      <Button
        component='span'
        size='small'
        onClick={() => setValue(name, '', required, { type })}
      ><ClearIcon />&nbsp;Delete {value.type}</Button>
    </div>

MediaUpload.defaultProps = {
  type: 'image',
}

export default withStyles(theme => ({
  imageUploadWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
    paddingBottom: theme.spacing(3),
    backgroundColor: theme.palette.grey[100],
    marginTop: theme.spacing(8),
    maxWidth: 300,
  },
  imageUpload: {
    display: 'none',
  },
  imageUploadImage: {
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    maxWidth: '100%',
  },
  imageUploadIcon: {
    fontSize: theme.spacing(10),
    color: theme.palette.grey[400],
  },
}))(withFormControl(MediaUpload))
