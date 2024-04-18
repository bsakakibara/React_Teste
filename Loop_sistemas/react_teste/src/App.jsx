
import { useEffect, useState } from 'react'
import './index.css'
import './App.css'
import WeatherGrid from './components/WeatherGrid'
import theme from './theme'
import { ThemeProvider } from '@mui/material/styles';


function App() {

  return (
    <ThemeProvider theme={theme}>
      <WeatherGrid />
    </ThemeProvider>
  )
}

export default App
