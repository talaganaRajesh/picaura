import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import RemoveBG from './components/RemoveBG';
import NavBar from './components/NavBar';
import Enhancer from './components/Enhancer';
import AddText from './components/AddText';
import About from './components/about';

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/removeBG" element={<RemoveBG />} />
          <Route path="/enhancer" element={<Enhancer />} />
          <Route path="/addtext" element={<AddText />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<h1>hi rajesh ra , hey sorry 404 - Page Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;