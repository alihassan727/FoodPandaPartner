import '../../CompnentsCSS/SignUpCSS/Navbar.css'

function Navbar() {
    return (
        <div>
            <nav className='navContainer'>
                <p className='pandaText'>panda <span className='partnerText'>partner</span></p>
                <button className='loginBtnNav'><a href="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</a></button>
            </nav>
        </div>
    )
}

export default Navbar
