import { useEffect, useState } from 'react';
import '../../../CompnentsCSS/HomePage/Menu/ItemForm.css'
import InputField from '../../SignUp/InputField'
import { useForm } from 'react-hook-form';

function ItemForm({ editData, refreshList }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [previewImg, setPreviewImg] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (editData) {
            reset(editData);
            setPreviewImg(editData.item_image);
        }
    }, [editData, reset])

    const onSubmit = async (itemFormData) => {
        if (loading) return;
        setLoading(true)

        const formData = new FormData();
        for (const key in itemFormData) {
            if (key === 'item_image') continue;
            formData.append(key, itemFormData[key]);
        }

        if (itemFormData.item_image && itemFormData.item_image.length > 0) {
            formData.append('item_image', itemFormData.item_image[0]);
        }

        const token = localStorage.getItem('token');
        const method = editData ? 'PUT' : 'POST';
        const url = editData
            ? `https://foodpandabackend-production.up.railway.app/${editData._id}`
            : 'https://foodpandabackend-production.up.railway.app/itemdata'

        const options = {
            method: method,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData,
        }
        try {
            const res = await fetch(url, options)
            const data = await res.json()

            if (data.success) {
                alert(editData ? "Item Updated" : "Item Added");
                reset()
                setPreviewImg(null)
                refreshList()
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    const handleCancel = () => {
        reset()
        setPreviewImg(null)
    }
    return (
        <div>
            <div className='itemFormContainer'>
                <h1 className='addHeading'>{editData ? "Edit Item" : "Add Item"}</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/*Item Name Field */}
                    <InputField
                        variant='itemField'
                        label="Item name"
                        placeholder="Enter Item name"
                        name="item_name"
                        inputType="text"
                        register={register}
                        validationRules={{
                            required: "Item name is required",
                        }}
                        error={errors.item_name}
                    />
                    {/*Cuisine Select Field */}
                    <label className='label' >Select Cuisine</label>
                    <select
                        className="itemField"
                        {...register("cuisine_type", {
                            required: "Select Cuisine"
                        })}
                    >
                        <option value="" hidden>Select Cuisine</option>
                        <option value="Fast Food">Fast Food</option>
                        <option value="Pakistani/desi">Pakistani/desi</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Drinks">Drinks</option>
                    </select>
                    {errors.cuisine_type && (
                        <p style={{ color: 'red', fontSize: '13px', marginTop: '-10px', marginBottom: '-10px' }}>
                            {errors.cuisine_type.message}
                        </p>
                    )}
                    {/*Item Type Field */}
                    <InputField
                        variant='itemField'
                        label="Item type"
                        placeholder="pizza, burger..."
                        name="item_type"
                        inputType="text"
                        register={register}
                        validationRules={{
                            required: "Item type is required"
                        }}
                        error={errors.item_type}
                    />
                    {/*Price Field */}
                    <InputField
                        variant='itemField'
                        label="Price"
                        placeholder="Enter price"
                        name="item_price"
                        inputType="number"
                        register={register}
                        validationRules={{
                            required: "Price is required"
                        }}
                        error={errors.item_price}
                    />
                    {/*Image Field */}
                    <div className="imageFieldWrapper">
                        <h3 style={{ marginTop: '1px', marginBottom: '5px', fontFamily: 'sans-serif', fontWeight: 'lighter' }}>Add Image</h3>
                        <input
                            className="imageField"
                            type="file"
                            accept="image/*"
                            {...register("item_image", {
                                required: editData ? false : 'Add image',
                                onChange: (e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setPreviewImg(URL.createObjectURL(file));
                                    }
                                }
                            })}
                        />
                        {errors.item_image && (
                            <p style={{ color: 'red', fontSize: '13px', marginTop: '-6px', marginBottom: '2px' }}>
                                {errors.item_image.message}
                            </p>
                        )}
                        {previewImg && (
                            <img src={previewImg}
                                alt='Preview'
                                style={{
                                    width: '150px',
                                    height: 'auto',
                                    objectFit: 'cover'
                                }}
                            />
                        )
                        }
                        {/*Description Field */}
                        <textarea
                            className='itemField'
                            placeholder='Enter description'
                            {...register('item_description', {
                                required: 'Description is required',
                                maxLength: { value: 300, message: "Max length is 300" }
                            })}
                            rows={4} />
                        {errors.item_description && (
                            <p style={{ color: 'red', fontSize: '13px', marginTop: "10px" }}>
                                {errors.item_description.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <button
                            className='itemBtn'
                            type='button'
                            onClick={handleCancel}
                        >Cancel</button>
                        <button className='itemBtn'
                            disabled={loading}
                        >{loading ? "Uploading..." : (editData ? "Update" : "Save")}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ItemForm
