
import { useEffect, useState } from 'react'
import './index.css'
import './App.css'
import api from './axios/api'

import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material"


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
          <p>{weather.temp}, {weather.description}</p>
        </aside>
        <section>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Data</TableCell>
                <TableCell align="right">Dia da semana</TableCell>
                <TableCell align="right">Temperatura</TableCell>
                <TableCell align="right">Clima</TableCell>
                <TableCell align="right">Comparativo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataGrid.map((item) => (
                <TableRow key={item.date}>

                  <TableCell align="right">{item.date}</TableCell>
                  <TableCell align="right">{item.weekday}</TableCell>
                  <TableCell align="right">{item.min} - {item.max}</TableCell>
                  <TableCell align="right">{item.description}</TableCell>
                  <TableCell align="right">{item.condition}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </main>

    </>
  )
}

export default App
