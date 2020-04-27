import axios from 'axios'

const url = 'https://covid19.mathdro.id/api'

export const fetchData = async () => {
  try {
    const { data: {confirmed, recovered, death, lastUpdate} } = await axios.get(url)

    return {
      confirmed,
      recovered,
      death,
      lastUpdate
    }
  } catch (e) {
    console.log(e)
  }
}