import '../../CompnentsCSS/SignUpCSS/BodyContent.css'

import Footer from './Footer'

import RegistrationForm from './RegistrationForm'
function BodyContent() {
    return (
        <div className='bodyContainer'>
            <RegistrationForm />
            <div className='t'>
                <p className='t1'>foodpanda brings</p>
                <p className='t2'>new opportunities</p>
            </div>
          
        </div>
    )
}

export default BodyContent
