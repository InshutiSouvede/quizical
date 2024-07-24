import { useState } from 'react'
import './App.css'
import QandA from './compontents/QandA'

function App() {
  const question ="How would one say goodbye in Spanish?"
  const answers = ['Adiós','Hola','Au Revoir','Salir'] 
  return (
    <>
     <QandA question= {question} answers= {answers} />      
    </>
  )
}

export default App
