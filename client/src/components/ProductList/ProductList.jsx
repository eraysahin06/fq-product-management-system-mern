import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import PropTypes from 'prop-types';

function ProductList({ products, onDeleteProduct }) {
  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:3001/product/${productId}`);
      onDeleteProduct(productId);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <div key={index} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{product.productName}</h2>
            <p>Quantity: {product.quantity}</p>
            <p>Type: {product.productType}</p>
            <button
              className="text-red-500"
              onClick={() => deleteProduct(product._id)}
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

ProductList.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      productName: PropTypes.string,
      quantity: PropTypes.number,
      productType: PropTypes.string,
    })),
    onDeleteProduct: PropTypes.func,
  };
  

export default ProductList;
