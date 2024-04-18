
import { useEffect, useState } from 'react'
import './index.css'
import './App.css'
import api from './axios/api'

import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from "@mui/material"


function App() {
  const [weather, setWeather] = useState(JSON.parse(localStorage.getItem('weather')) || {})
  const [dataGrid, setDataGrid] = useState([])

  const [isError, setIsError] = useState(false)


  const getWeather = async () => {


    try {
      const response = await api.get('weather', {
        params: { woeid: '457398', format: 'json-cors' },
      })
      setWeather(response.data.results)

      const data = response.data.results.forecast.map((item, index) => {
        if (index === 0) return { ...item, condition: '---' }
        return {
          ...item,
          condition: response.data.results.forecast[index - 1].max > item.max ? 'diminuiu' : 'aumentou',
        }
      })

      setDataGrid(data)
      localStorage.setItem('weather', JSON.stringify(response.data))
    } catch (error) {
      setIsError(true)
    }
  }

  useEffect(() => {
    getWeather()
  }, [])

  if (isError) {
    return (
      <div>
        <p>Ocorreu um erro, tente novamente</p>
        <Button variant='contained' onClick={getWeather}>Tentar novamente</Button>

      </div>
    )
  }

  return (
    <>
      <main>
        <aside>
          <h1>{weather.city}</h1>
          <p>{weather.temp}°C, {weather.description}</p>
          <img src={`https://assets.hgbrasil.com/weather/icons/conditions/${weather.condition_slug}.svg`} alt="icon weather" />
          <p>{weather.date}</p>
        </aside>
        <section>
          <TableContainer>
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell align="center">Data</TableCell>
                  <TableCell align="center">Dia da semana</TableCell>
                  <TableCell align="center">Temperatura </TableCell>
                  <TableCell align="center">Clima</TableCell>
                  <TableCell align="center">Comparativo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataGrid.map((item) => (
                  <TableRow key={item.date}>

                    <TableCell align="center">{item.date}</TableCell>
                    <TableCell align="center">{item.weekday}</TableCell>
                    <TableCell align="center">{item.min}°C - {item.max}°C</TableCell>
                    <TableCell align="center">{item.description}</TableCell>
                    <TableCell align="center">{item.condition}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </section>
      </main>

    </>
  )
}

export default App
