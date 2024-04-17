import { useState } from 'react'

import './index.css'
import { useEffect } from 'react'
import api from './api'

function App() {
  
  useEffect(() => {
    (async() => {
      api.get('weather?woeid=457398')
    })()
  }, [])
  return (
    <>
      <div>
        <h1>teste</h1>
      </div>
    </>
  )
}

export default App
