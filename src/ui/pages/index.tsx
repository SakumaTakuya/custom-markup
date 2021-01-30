import React, { FC } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { Grid, Button, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import SEO from '../components/seo'

const useStyles = makeStyles((theme: Theme) => ({
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}))

const IndexPage: FC = () => {
  const classes = useStyles()
  return (
    <>
      <SEO title="Home" />
      first page
    </>
  )
}

export default IndexPage
