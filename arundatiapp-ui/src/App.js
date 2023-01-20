import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';

function App() {
  return (
    <BrowserRouter>
      <div className='container'>
        <div className='container'>
          <div className='column is-half is-offset-on-quarter'>
            <Routes>
              <Route exach path='/' element={<ProductList />} />
              <Route exach path='/add' element={<AddProduct />} />
              <Route exach path='/edit/:id' element={<EditProduct />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
