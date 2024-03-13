import { FaPlus, FaMinus } from 'react-icons/fa';
import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'; 

const ProductForm = ({onProductAdd}) => {

    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [productType, setProductType] = useState('matte');
  
    const handleQuantityChange = (delta) => {
        setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
      };
    
      const handleSubmit = async () => {
    
        const productData = {
          productName,
          quantity,
          productType,
        };
    
        try {
          const response = await axios.post("http://localhost:3001/product", productData);
          console.log("Product added:", response.data);
          setProductName("");
          setQuantity(1);
          setProductType("matte");
    
          if (onProductAdd) {
            onProductAdd(response.data);
          }
        } catch (error) {
          console.error("Error: ", error);
        }
      };

  return (
    <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
      <input type="text" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
    </div>

    <div className="mb-4 flex items-center">
      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mr-4">Quantity</label>
      <button type="button" onClick={() => handleQuantityChange(-1)} className="p-2 border border-gray-300 rounded-l-md"><FaMinus /></button>
      <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="w-16 text-center border-t border-b border-gray-300" readOnly />
      <button type="button" onClick={() => handleQuantityChange(1)} className="p-2 border border-gray-300 rounded-r-md"><FaPlus /></button>
    </div>

    <div className="mb-4">
      <label htmlFor="productType" className="block text-sm font-medium text-gray-700">Product Type</label>
      <select id="productType" value={productType} onChange={(e) => setProductType(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
        <option value="matte">Matte</option>
        <option value="polished">Polished</option>
      </select>
    </div>

    <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">Add Product</button>
  </form>
  )
}

ProductForm.propTypes = {
    onProductAdd: PropTypes.func.isRequired,
  };

export default ProductForm