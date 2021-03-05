import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Products from '../Products/Product';

const ProductDetail = () => {
    const {productkey} = useParams()
    const product = fakeData.find( pd => pd.key  === productkey)
    console.log(product);
    return (
        <div>
            {/* <h1>Product Details is comming</h1> */}
            <Products showAddcartBtn={false} products={product}></Products>
        </div>
    );
};

export default ProductDetail;