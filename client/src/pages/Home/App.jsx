import { useState, useEffect } from 'react';

import axios from 'axios';
import ProductForm from '../../components/ProductForm/ProductForm';
import ProductList from '../../components/ProductList/ProductList';
import { useNavigate } from 'react-router-dom';

function App() {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    } else {
      fetchProducts();
    }
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addProductToList = (newProductData) => {
    setProducts((prevProducts) => [...prevProducts, { ...newProductData }]);
  };
  
  
  const deleteProductFromList = (productId) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Add Products</h1>
      <ProductForm onProductAdd={addProductToList} />
      <ProductList products={products} onDeleteProduct={deleteProductFromList} />
    </div>
  );
}

export default App;
