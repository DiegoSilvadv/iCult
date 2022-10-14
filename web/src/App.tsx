import { useState } from 'react'
import { MapPage } from './pages/Map'
import './styles/main.css'
import { BrowserRouter } from "react-router-dom";
import { AppRoute } from './routes';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>        
    </div>
  )
}

export default App
