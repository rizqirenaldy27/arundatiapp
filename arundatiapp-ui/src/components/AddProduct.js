import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [name,setName] = useState('')
    const [harga,setHarga] = useState('')
    const [deskripsi,setDeskripsi] = useState('')
    const navigate = useNavigate()

    const saveProduct = async (e) => {
        e.preventDefault()

        await axios.post('http://localhost:4000/api/product', {
            name_product: name,
            harga_product: harga,
            deskripsi_product: deskripsi
        })

        navigate("/")
    }

    return (
        <div>
            <form onSubmit={ saveProduct }>
                <div className="field">
                    <label className="label">Nama</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Nama"
                        value={ name }
                        onChange={ (e) => setName(e.target.value) }
                    />
                </div>
 
                <div className="field">
                    <label className="label">Harga</label>
                    <input 
                        className="input"
                        type="number"
                        placeholder="Harga"
                        value={ harga }
                        onChange={ (e) => setHarga(e.target.value) }
                    />
                </div>

                <div className="field">
                    <label className="label">Deskripsi</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Deskripsi"
                        value={ deskripsi }
                        onChange={ (e) => setDeskripsi(e.target.value) }
                    />
                </div>
 
                <div className="field">
                    <button className="button is-primary">Save</button>
                </div>
            </form>
        </div>
    )
}

export default AddProduct