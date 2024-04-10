import { Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './pages/Home';
import Videos from './pages/Videos';
import Try from './pages/Explore';
import About from './pages/About';  
import Amazon from './pages/Amazon';
import { CssBaseline, Container } from '@mui/material';

function App() {
    return (
        <>
            <CssBaseline />
            <NavBar />
            <Container>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/videos" element={<Videos />} />
                    <Route path="/Explore" element={<Try />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/amazon" element={<Amazon />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;
