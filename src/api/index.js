import axios from 'axios'
import {getName, registerLocale} from 'i18n-iso-countries'

const url = 'https://covid19.mathdro.id/api'
const todayApi = 'https://api.covid19api.com'

export const fetchData = async (country) => {
  let changeableUrl = url

  if (country) {
    changeableUrl = `${url}/countries/${country}`
  }

  try {
    const { data: {confirmed, recovered, deaths, lastUpdate} } = await axios.get(changeableUrl)

    return {
      confirmed,
      recovered,
      deaths,
      lastUpdate
    }
  } catch (e) {
    console.log(e)
  }
}

export const fetchDailyData = async () => {
  try {

    const { data } = await axios.get(`${url}/daily`)

    return data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate
    }))

  } catch (e) {
    console.log(e)
  }
}

export const fetchCountries = async () => {
  try {
    const {data: {countries}} = await axios.get(`${url}/countries`)

    // return countries.map((country) => country.name)
    return countries.map((country) => ({
      name: country.name,
      iso2: country.iso2,
      ruName: getName(country.iso2, "ru")
    }))
  } catch (e) {
    console.log(e)
  }
}

registerLocale(require("i18n-iso-countries/langs/ru.json"));



export const fetchTodayData = async () => {
  try {
    const {data: {Global: {NewConfirmed, NewRecovered, NewDeaths}}} = await axios.get(`${todayApi}/summary`)

    return {NewConfirmed, NewRecovered, NewDeaths}
  } catch (e) {
    console.log(e)
  }
}


export const fetchTodayByCountryData = async (country) => {
  if (!country) {
    return await fetchTodayData()
  }
  try {
    const {data: {Countries}} = await axios.get(`${todayApi}/summary`)

    const modifiedData = Countries.filter((c) => c["CountryCode"] === country).map((c) => ({
      NewConfirmed: c.NewConfirmed,
      NewRecovered: c.NewRecovered,
      NewDeaths: c.NewDeaths
    }))[0]

    if (!modifiedData) {
      return {
        NewConfirmed: 0,
        NewRecovered: 0,
        NewDeaths: 0
      }
    }

    return modifiedData
  } catch (e) {
    return {
      NewConfirmed: 0,
      NewRecovered: 0,
      NewDeaths: 0
    }
  }
}