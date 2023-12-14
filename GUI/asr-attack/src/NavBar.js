import { Link } from 'react-router-dom';

export default function NavBar() {
    //Navigation Bar components
    return (
        <nav className="nav">
            <Link to="/" className="site-title">ASR Attack</Link>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/videos">Videos</Link></li>
                <li><Link to="/try-it">Try It</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
    )
}
