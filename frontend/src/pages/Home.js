import { Fragment, useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

export default function Home() {

    const [products, setProducts] = useState([]);

   useEffect(() => {
    console.log("HOME COMPONENT LOADED");

    fetch(process.env.PUBLIC_URL + '/mockData.json')
        .then(response => {
            console.log("FETCH RESPONSE:", response.status);
            return response.json();
        })
        .then(data => {
            console.log("PRODUCT DATA:", data);
            setProducts(data);
        })
        .catch(error => {
            console.error("FETCH ERROR:", error);
        });
}, []);

    return (
        <Fragment>
            <h1 id="products_heading">Latest Products</h1>

            <section id="products" className="container mt-5">
                <div className="row">
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            </section>
        </Fragment>
    );
}