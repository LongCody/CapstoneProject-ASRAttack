import NavBar from "./NavBar";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Try from "./pages/Try";
import About from "./pages/About";
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <NavBar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video" element={<Video />} />
          <Route path="/try-it" element={<Try />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  )
}

export default App;
