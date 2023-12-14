import NavBar from "./NavBar";
import Home from "./pages/Home";
import Videos from "./pages/Videos";
import Try from "./pages/Try";
import About from "./pages/About";
import { Route, Routes } from 'react-router-dom';

function App() {
  //Base of the app and its react components
  return (
    <>
      <NavBar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/try-it" element={<Try />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  )
}

export default App;
