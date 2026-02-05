import '../../CompnentsCSS/SignUpCSS/InputField.css'

function InputField({ inputType, name, register, placeholder, validationRules, error, label, variant}) {
    return (
        <div>
            {label && <label className='label'>{label}</label>}
            <input
                className={`${variant}`}
                type={inputType}
                placeholder={`${placeholder} *`}
                {...register(name, validationRules)}
            />
            {error && <p style={{ color: 'red', marginTop: '2px', marginBottom: '-11px', marginLeft: '5px', fontSize: '13px' }}>{error.message}</p>}
        </div>
    )
}

export default InputField
