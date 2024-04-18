import React from 'react'
import './WeatherGrid.css'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, } from "@mui/material"
import useGetWeather from '../hooks/useGetWeather'

const WeatherGrid = () => {

    const { weather, isError, dataGrid } = useGetWeather()

    if (isError) {
        return (
            <div className='button-container'>
                <p>Ocorreu um erro, tente novamente</p>
                <button variant='outlined' onClick={weather}>Tentar novamente</button>

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
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center"><Typography>Data</Typography></TableCell>
                                    <TableCell align="center"><Typography>Dia da Semana</Typography></TableCell>
                                    <TableCell align="center"><Typography>Temperatura</Typography></TableCell>
                                    <TableCell align="center"><Typography>Clima</Typography></TableCell>
                                    <TableCell align="center"><Typography>Comparativo</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataGrid.map((item) => (
                                    <TableRow key={item.date}>

                                        <TableCell align="center"><Typography>{item.date}</Typography></TableCell>
                                        <TableCell align="center"><Typography>{item.weekday}</Typography></TableCell>
                                        <TableCell align="center"><Typography>{item.min}°C - {item.max}°C</Typography></TableCell>
                                        <TableCell align="center"><Typography>{item.description}</Typography> <img className='w-6' src={`https://assets.hgbrasil.com/weather/icons/conditions/${item.condition}.svg`} alt="icon weather" /></TableCell>
                                        <TableCell align="center"><Typography>{item.comparative}</Typography></TableCell>
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

export default WeatherGrid