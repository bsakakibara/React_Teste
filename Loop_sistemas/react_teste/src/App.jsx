
import { useEffect, useState } from 'react'
import './index.css'
import api from './axios/api'


function App() {

  const [weather, setWeather] = useState(JSON.parse(localStorage.getItem('weather')) || {})
  const [isError, setIsError] = useState(false)

  const getWeather = async () => {

    try {
      const response = await api.get('weather', {
        params: { woeid: '457398', format: 'json-cors' },
      })
      setWeather(response.data)
      localStorage.setItem('weather', JSON.stringify(response.data))
    } catch (error) {
      setIsError(true)
    }
    }

    useEffect(() => {
      getWeather()
    }, [])

    if (isError) {
      return(
      <div>
        <p>Ocorreu um erro, tente novamente</p>
        <button onClick={getWeather}>Tentar novamente</button>
      </div>
      )
    }


    return (
      <>
        <div>
          <h1>teste</h1>
        </div>
      </>
    )
  }

  export default App
