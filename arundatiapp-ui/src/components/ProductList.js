import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setProduct] = useState([])

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        const dataProduct = await axios.get('http://localhost:4000/api/product');
        setProduct(dataProduct.data.data)
    }

    const deleteProduct = async (id) => {
        await axios.delete(`http://localhost:4000/api/product/${id}`);
        getProducts();
    }

    return (
        <div>
            <Link to="/add">Add</Link>
            <table className="table is-striped is-fullwidth" border="1">
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Harga</th>
                        <th>Deksripsi</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, index) => (
                            <tr key={product._id}>
                                <td>{product.name_product}</td>
                                <td>{product.harga_product}</td>
                                <td>{product.deskripsi_product}</td>
                                <td>
                                    <Link to={`/edit/${product._id}`} className="button is-small is-info">Edit</Link>
                                    <button onClick={ () => deleteProduct(product._id) } className="button is-small is-danger">Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ProductList