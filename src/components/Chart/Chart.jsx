import React, {useState, useEffect, useContext} from 'react'
import {fetchDailyData} from '../../api'
import { Line, Bar } from 'react-chartjs-2'

import styles from './Chart.module.css'
import TRANSLATE from '../../translate'
import {LanguageContext} from '../../Reducers/reducer'

const Chart = ({data: {recovered, confirmed, deaths}, country}) => {
  const [dailyData, setDailyData] = useState([])
  const {state} = useContext(LanguageContext);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData())
    }

    fetchAPI()
  }, [])

  const lineChart = (
    dailyData.length
      ? (
      <Line
      data={{
        labels: dailyData.map(({date}) => date),
        datasets: [{
          data: dailyData.map(({confirmed}) => confirmed),
          label: TRANSLATE[state.language].cards.infected.title,
          borderColor: '#3333ff',
          fill: true
        }, {
          data: dailyData.map(({deaths}) => deaths),
          label: TRANSLATE[state.language].cards.deaths.title,
          borderColor: 'red',
          backgroundColor: 'rgba(255, 0, 0, .5)',
          fill: true
        }],
      }}
    />) : null
  )

  const barChart = (
    confirmed
      ? (
        <Bar
          data={{
            labels: [TRANSLATE[state.language].cards.infected.title, TRANSLATE[state.language].cards.recovered.title, TRANSLATE[state.language].cards.deaths.title],
            datasets: [{
              label: `People`,
              backgroundColor: [`rgba(0, 0, 255, 0.5)`, `rgba(0, 255, 0, 0.5)`, `rgba(255, 0, 0, 0.5)`],
              data: [confirmed.value, recovered.value, deaths.value]
            }]
          }}
          options={{
            legend: {display: false},
            title: {display: true, text: `${TRANSLATE[state.language].cards.chartTitle} ${country}`}
          }}
        />
      ) : null
  )

  return (
    <div className={styles.container}>
      {country ? barChart : lineChart}
    </div>
  )
}

export default Chart