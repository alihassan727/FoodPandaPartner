import '../../CompnentsCSS/SignUpCSS/Footer.css'
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

function Footer() {
    return (
        <div>
            <footer className='footerContainer'>
                <div className='footerContent'>
                    <p className='pandaText' style={{ marginLeft: '-490px' }}>panda <span className='partnerText'>partner</span></p>
                    <div className='footerList'>

                        <ul>
                            <ol>Company</ol>
                            <ol>About us</ol>
                            <ol>Resources</ol>
                            <ol>Terms</ol>
                            <ol>Privacy Policy</ol>
                        </ul>
                        <ul>
                            <ol>Contact us</ol>
                            <ol>Contact us</ol>
                            <ol>Whatapps</ol>
                            <ol>Phone number</ol>
                        </ul>
                    </div>
                    <div className=''>
                    <FaLinkedinIn />
                    <FaYoutube />
                    <BsTwitterX />
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
