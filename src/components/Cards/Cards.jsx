import React, {useContext} from 'react'
import CountUp from 'react-countup'
import cs from 'classnames'
import {Card, CardContent, Typography, Grid} from '@material-ui/core'

import TRANSLATE from '../../translate'

import styles from './Cards.module.css'
import {LanguageContext} from '../../Reducers/reducer'

const Cards = ({data: {confirmed, recovered, deaths, lastUpdate, NewConfirmed, NewRecovered, NewDeaths}}) => {
  const {state} = useContext(LanguageContext);

  // const optionsDate = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
  const optionsDate = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'};

  if (!confirmed) {
    return 'Loading...'
  }

  return (
    <div className={styles.container}>
      <Grid container spacing={3} jusify="center" className={styles.cardsContainer}>
        <Grid item component={Card} xs={12} md={3} className={cs(styles.card, styles.infected)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>{TRANSLATE[state.language].cards.infected.title}</Typography>
            <Typography variant="h5">
              <CountUp start={0} end={confirmed.value} duration={2.5} separator="," />
              <Typography variant="caption" className={styles.daily} display="inline">{` +${NewConfirmed.toLocaleString('en-IN')}`}</Typography>
            </Typography>
            <Typography color="textSecondary">{new Date(lastUpdate).toLocaleDateString(state.language, optionsDate)}</Typography>
            <Typography variant="body2">{TRANSLATE[state.language].cards.infected.description}</Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card} xs={12} md={3} className={cs(styles.card, styles.recovered)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>{TRANSLATE[state.language].cards.recovered.title}</Typography>
            <Typography variant="h5">
              <CountUp start={0} end={recovered.value} duration={2.5} separator="," />
              <Typography variant="caption" className={styles.daily} display="inline">{` +${NewRecovered.toLocaleString('en-IN')}`}</Typography>
            </Typography>
            <Typography color="textSecondary">{new Date(lastUpdate).toLocaleDateString(state.language, optionsDate)}</Typography>
            <Typography variant="body2">{TRANSLATE[state.language].cards.recovered.description}</Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card} xs={12} md={3} className={cs(styles.card, styles.deaths)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>{TRANSLATE[state.language].cards.deaths.title}</Typography>
            <Typography variant="h5">
              <CountUp start={0} end={deaths.value} duration={2.5} separator="," />
              <Typography variant="caption" className={styles.daily} display="inline">{` +${NewDeaths.toLocaleString('en-IN')}`}</Typography>
            </Typography>
            <Typography color="textSecondary">{new Date(lastUpdate).toLocaleDateString(state.language, optionsDate)}</Typography>
            <Typography variant="body2">{TRANSLATE[state.language].cards.deaths.description}</Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  )
}

export default Cards