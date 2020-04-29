import React, {useState, useEffect, useReducer} from 'react'

import {LanguageContext, initialLanguageState, languageReducer} from './Reducers/reducer'
import { Cards, Chart, CountryPicker, LanguagePicker} from './components'
import styles from './App.module.css'
import {fetchData, fetchTodayByCountryData, fetchTodayData} from './api'
import {Typography} from '@material-ui/core'

import microbe from './images/microbe.svg'


const App = () => {
  const [data, setData] = useState({})
  const [country, setCountry] = useState('')

  const [state, dispatch] = useReducer(languageReducer, initialLanguageState);

  useEffect(() => {
    const fetchAPI = async () => {
      setData({...await fetchData(), ...await fetchTodayData()})
    }
    dispatch({type: localStorage.getItem('language')})
    fetchAPI()
  }, [])

  useEffect(() => {
    localStorage.setItem('language', state.language);
  }, [state])

  const handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country)
    const fetchedTodayByCountryData = await fetchTodayByCountryData(country)

    setData({...fetchedData, ...fetchedTodayByCountryData})
    setCountry(country)
  }

    return (
      <LanguageContext.Provider value={{dispatch, state}}>
          <div className={styles.container}>
            <LanguagePicker />
            <Typography variant="h1" align="center" className={styles.logo}>C<img src={microbe} className={styles.image} alt="COVID-19"/>VID-19</Typography>
            <Cards data={data} />
            <CountryPicker data={data} handleCountryChange={handleCountryChange} />
            <Chart data={data} country={country}/>
          </div>
      </LanguageContext.Provider>
    )
}

export default App