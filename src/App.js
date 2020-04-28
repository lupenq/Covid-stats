import React from 'react'

import { Cards, Chart, CountryPicker} from './components'
import styles from './App.module.css'
import {fetchData, fetchTodayByCountryData, fetchTodayData} from './api'

import coronaImage from './images/image.png'

class App extends React.Component {
  state = {
    data: {},
    country: ''
  }


  async componentDidMount() {
    const fetchedData = await fetchData()
    const fetchedTodayData = await fetchTodayData()



    this.setState({data: {...fetchedData, ...fetchedTodayData}})
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country)
    const fetchedTodayByCountryData = await fetchTodayByCountryData(country)

    this.setState({data: {...fetchedData, ...fetchedTodayByCountryData}, country})
  }

  render() {
    const {data, country} = this.state

    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="COVID-19"/>
        <Cards data={data} />
        <CountryPicker data={data} handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country}/>
      </div>
    )
  }
}

export default App