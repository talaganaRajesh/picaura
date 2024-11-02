import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import RemoveBG from './components/RemoveBG'
import NavBar from './components/NavBar'
import Enhancer from './components/Enhancer';
import AddText from './components/AddText';


function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/removeBG" element={<RemoveBG />} />
          <Route path="/enhancer" element={<Enhancer/>}/>
          <Route path="/addtext" element={<AddText/>}/>
        </Routes>
        
      </Router>
    </div>
  )
}

export default App