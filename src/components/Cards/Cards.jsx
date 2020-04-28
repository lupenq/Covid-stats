import React from 'react'
import CountUp from 'react-countup'
import cs from 'classnames'
import {Card, CardContent, Typography, Grid} from '@material-ui/core'

import styles from './Cards.module.css'

const Cards = ({data: {confirmed, recovered, deaths, lastUpdate, NewConfirmed, NewRecovered, NewDeaths}}) => {
  if (!confirmed) {
    return 'Loading...'
  }

  return (
    <div className={styles.container}>
      <Grid container spacing={3} jusify="center" className={styles.cardsContainer}>
        <Grid item component={Card} xs={12} md={3} className={cs(styles.card, styles.infected)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>Infected</Typography>
            <Typography variant="h5">
              <CountUp start={0} end={confirmed.value} duration={2.5} separator="," />
              <Typography variant="caption" className={styles.daily} display="inline">{` +${NewConfirmed.toLocaleString('en-IN')}`}</Typography>
            </Typography>
            <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
            <Typography variant="body2">Number of active cases of COVID19</Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card} xs={12} md={3} className={cs(styles.card, styles.recovered)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>Recovered</Typography>
            <Typography variant="h5">
              <CountUp start={0} end={recovered.value} duration={2.5} separator="," />
              <Typography variant="caption" className={styles.daily} display="inline">{` +${NewRecovered.toLocaleString('en-IN')}`}</Typography>
            </Typography> 
            <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
            <Typography variant="body2">Number of recoveries cases of COVID19</Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card} xs={12} md={3} className={cs(styles.card, styles.deaths)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>Deaths</Typography>
            <Typography variant="h5">
              <CountUp start={0} end={deaths.value} duration={2.5} separator="," />
              <Typography variant="caption" className={styles.daily} display="inline">{` +${NewDeaths.toLocaleString('en-IN')}`}</Typography>
            </Typography>
            <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
            <Typography variant="body2">Number of deaths cases of COVID19</Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  )
}

export default Cards