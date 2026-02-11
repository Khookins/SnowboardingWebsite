import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Cookies from "js-cookie"

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (Cookies.get("lemonjuice") == undefined){
      Cookies.set("lemonjuice", count)
    }
    else{
      setCount(Cookies.get("lemonjuice"))
    }
  })

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => {
          const newCount = Number(count) + 1
          Cookies.set("lemonjuice", newCount)
          setCount(newCount)
          }}>
          Your Score Is {count}
        </button>
        <br />
        <br />
        <button className="reset-score" onClick={() =>{
          setCount(0)
          Cookies.set("lemonjuice",0)
        }}>Reset Score (Warning This Will Reset Your Score Permanently!)</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
