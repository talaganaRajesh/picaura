import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import RemoveBG from './components/RemoveBG'
import NavBar from './components/NavBar'
function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/removeBG" element={<RemoveBG />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App