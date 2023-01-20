import { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
 
const EditProduct = () => {
    const [name,setName] = useState('')
    const [harga,setHarga] = useState('')
    const [deskripsi,setDeskripsi] = useState('')
    const navigate = useNavigate();
    const { id } = useParams();
 
    const updateProduct = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:4000/api/product/${id}`,{
            name_product: name,
            harga_product: harga,
            deskripsi_product: deskripsi
        });
        navigate("/");
    }
 
    useEffect(() => {
        getProductById();
    }, []);
 
    const getProductById = async () => {
        const response = await axios.get(`http://localhost:4000/api/product/${id}`);
        setName(response.data.name_product);
        setHarga(response.data.harga_product);
        setDeskripsi(response.data.deskripsi_product);
    }
 
    return (
        <div>
            <form onSubmit={ updateProduct }>
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
                    <button className="button is-primary">Update</button>
                </div>
            </form>
        </div>
    )
}
 
export default EditProduct
