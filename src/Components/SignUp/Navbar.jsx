import '../../CompnentsCSS/SignUpCSS/Navbar.css'
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div>
            <nav className='navContainer'>
                <p className='pandaText'>panda <span className='partnerText'>partner</span></p>
                <button className='loginBtnNav'>
                    <Link to="/login" style={{ color: 'white', textDecoration: 'none' }} >Login</Link>
                </button>
            </nav>
        </div>
    )
}

export default Navbar
