import { useState } from 'react'
import '../../../CompnentsCSS/HomePage/Menu/Menu.css'
import ItemForm from './ItemForm'
import ItemBox from './ItemBox'

function Menu() {
    const [showForm, setShowForm] = useState(false)

    return (
        <div>
            <div className='nav2'>

                <h1 style={{ fontFamily: 'sans-serif', fontWeight: 'lighter' }}>Menu Items</h1>
                <button
                    onClick={() => showForm === false ? setShowForm(true) : setShowForm(false)}
                    className='addBtn'>+ Add Item</button>
            </div>
            {showForm === true &&
                <div className='modal-overlay'
                    onClick={() => setShowForm(false)}
                >
                    <div
                        className='modal-box'
                        onClick={(e) => e.stopPropagation()}>
                        <ItemForm />
                        <button
                            className='close-btn'
                            onClick={() => setShowForm(false)}>
                            ✕
                        </button>
                    </div>
                </div>
            }
            <div
                className='mainBox'>
                <ItemBox />
            </div>
        </div>
    )
}
export default Menu