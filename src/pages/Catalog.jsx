import { useEffect, useState } from 'react';

export default function Catalog() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Errore nel fetch");
                }
                return response.json();
            })
            .then((data) => {
                setProducts(data);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="container mt-5"><p>Caricamento...</p></div>;
    if (error) return <div className="container mt-5"><p>Errore: {error}</p></div>;

    return (
        <div className="container mt-5">
            <h1>Catalogo Prodotti</h1>
            <div className="row">
                {products.map(product => (
                    <div key={product.id} className="col-md-4 mb-4">
                        <div className="card h-100">
                            <img
                                src={product.image}
                                className="card-img-top"
                                alt={product.title}
                                style={{ height: '250px', objectFit: 'contain', padding: '10px' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text text-truncate">{product.description}</p>
                                <p className="card-text"><strong>${product.price}</strong></p>
                                <button className="btn btn-primary">Aggiungi al carrello</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}