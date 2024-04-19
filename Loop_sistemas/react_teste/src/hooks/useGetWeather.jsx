import React from 'react'
import { useEffect, useState } from 'react'
import api from '../service/api'

const useGetWeather = () => {
    const [weather, setWeather] = useState(JSON.parse(localStorage.getItem('weather')) || {})
    const [dataGrid, setDataGrid] = useState([])

    const [isError, setIsError] = useState(false)

    const getWeather = async () => {
        setIsError(false)

        try {
            const response = await api.get('weather', {
                params: { woeid: '457398', format: 'json-cors',  key: '66710766'},
            })
            setWeather(response.data.results)

            const data = response.data.results.forecast.map((item, index) => {
                if (index === 0) return { ...item, comparative: '---' }
                return {
                    ...item,
                    comparative: response.data.results.forecast[index - 1].max > item.max ? 'Diminuiu' : 'Aumentou',
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

    return {weather, isError, dataGrid}
}

export default useGetWeather