import React, {useState, useEffect, useContext} from 'react'
import {NativeSelect, FormControl} from '@material-ui/core'

import styles from './CountryPicker.module.css'

import TRANSLATE from '../../translate'

import {fetchCountries} from '../../api'
import {LanguageContext} from '../../Reducers/reducer'

const CountryPicker = ({handleCountryChange}) => {
  const [fetchedCountries, setFetchedCountries] = useState([])
  const {state} = useContext(LanguageContext);


  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedCountries(await fetchCountries())
    }

    fetchAPI()

  }, [setFetchedCountries])

  return (
    <FormControl className={styles.FormControl}>
      <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
        <option value="">{TRANSLATE[state.language].countryPicker.global}</option>
        {fetchedCountries.map((country, i) => <option key={i} value={country.iso2}>{state.language === 'En' ? country.name : country.ruName ?? country.name}</option>)}
      </NativeSelect>
    </FormControl>
  )
}

export default CountryPicker