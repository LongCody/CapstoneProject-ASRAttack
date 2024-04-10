import { Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './pages/Home';
import Videos from './pages/Videos';
import Try from './pages/Explore';
import About from './pages/About';  
import Amazon from './pages/Amazon';
import Google from './pages/Google';
import Wav2vec from './pages/Wav2vec';
import Whisper from './pages/Whisper';
import Try from './pages/Try';
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
                    <Route path="/google" element={<Google />} />
                    <Route path="/wav2vec" element={<Wav2vec />} />
                    <Route path="/whisper" element={<Whisper />} />
                    <Route path="/try" element={<Try />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;
