import React, { useEffect } from 'react';

const ProductContext = React.createContext({

});

export default ProductContext;

export const ProductProvider = ({ children }) => {
    const [materials, setMaterials] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const [oneProduct, setOneProduct] = useState({ products: "", variants: [] });
    const [searchInputs, setSearchInputs] = useState(true);

    useEffect(() => {
        getProducts()
        getSearchSelection()
    }, [])

    const getProducts = async () => {
        try {
            const response = await 
        }
    }
}
