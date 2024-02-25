import { Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './pages/Home';
import Videos from './pages/Videos';
import Try from './pages/Try';
import About from './pages/About';
import AboutClass from './pages/AboutClass';
import AboutGroup from './pages/AboutGroup';
import AboutProject from './pages/AboutProject';
import AboutAssignments from './pages/AboutAssignments';
import AboutResources from './pages/AboutResources';
import Tutorial from './pages/Tutorial';
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
                    <Route path="/try-it" element={<Try />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/about-class" element={<AboutClass />} />
                    <Route path="/about-group" element={<AboutGroup />} />
                    <Route path="/about-project" element={<AboutProject />} />
                    <Route path="/about-assignments" element={<AboutAssignments />} />
                    <Route path="/about-resources" element={<AboutResources />} />
                    <Route path="/tutorial" element={<Tutorial />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;
