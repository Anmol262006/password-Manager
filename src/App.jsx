import { useState } from 'react'
import Footer from './components/Footer'
import Content from './Content'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
   <Content />
    <Footer />
    </>
  )
}

export default App
