import { useState, useEffect } from 'react'
import '../../../CompnentsCSS/HomePage/Menu/ItemBox.css'
import ItemForm from './ItemForm'

function ItemBox() {
    const [userItemData, setUserItemData] = useState([])
    const [loading, setLoading] = useState(true)
    const [editInfo, setEditInfo] = useState(false)
    const [selectedItem, setSelectedItem] = useState()

    {/*Item Data GET Req */ }
    const loadItemData = async () => {
        try {
            const token = localStorage.getItem("token")
            const res = await fetch("https://foodpandabackend-production.up.railway.app/itemdata", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await res.json()
            setUserItemData(data.items)
        } catch (error) {
            console.log("Item Get error", error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        loadItemData()
    }, [])

    const handleEdit = (item) => {
        setSelectedItem(item)
        setEditInfo(true)
    }

    const handleDelete = async (item) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${item.item_name}?`)
        if (!confirmDelete) return;
        try {
            const token = localStorage.getItem("token")

            const res = await fetch(`https://foodpandabackend-production.up.railway.app/itemdata/${item._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const data = await res.json();
            if (data.success) {
                alert("Item Deleted Successfully");
                loadItemData();
            } else {
                alert("Failed to delete item");
            }
        } catch (error) {
            console.log("Delete error", error);
        }
    }

    return (
        <div className='itemBoxWrapper'>
            {loading ? (
                <p className='noItem'>Loading...</p>) :
                userItemData.length === 0 ? (
                    <p className='noItem'>No items available</p>
                ) : (
                    userItemData.map((item) => (
                        <div key={item._id} className='item_box'>
                            <div className='img_frame'>
                                <img className='itemImg' src={item.item_image} alt="burger" />
                            </div>
                            <div className='item_content'>
                                <h1 className='itemTitle'>{item.item_name}</h1>
                                <h3 className='itemPrice'>Rs- {item.item_price}</h3>
                                <button
                                    className='actBtnEdit'
                                    onClick={() => handleEdit(item)}
                                >
                                    Edit
                                </button>
                                <button className='actBtnDel'
                                    onClick={() => handleDelete(item)}
                                >✕</button>
                            </div>
                        </div>
                    ))
                )}
            {editInfo && (
                <div
                    className='modal-overlay'
                    onClick={() => setEditInfo(false)}
                >
                    <div
                        className='modal-box'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ItemForm
                            editData={selectedItem}
                            refreshList={loadItemData}
                        />
                        <button
                            className='close-btn'
                            onClick={() => {
                                setEditInfo(false);
                                setSelectedItem(null);
                            }
                            }
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )
            }
        </div >
    )
}
export default ItemBox;
