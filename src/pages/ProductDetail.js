import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BASE_URL = "https://8000-jarednjk-jarednjkwallet-ufol4k5k2n3.ws-us63.gitpod.io"

export default function ProductDetail() {

    // const [currentWallet, setCurrentWallet] = useState("");
    // const [currentPrice, setCurrentPrice] = useState(0);
    // const [currentLength, setCurrentLength] = useState("");
    // const [currentWidth, setCurrentWidth] = useState("");
    // const [currentDepth, setCurrentDepth] = useState("");
    // const [currentDescription, setCurrentDescription] = useState("");
    // const [currentCardSlot, setCurrentCardSlot] = useState(0);
    // const [currentMaterial, setCurrentMaterial] = useState("");
    // const [currentFeature, setCurrentFeature] = useState([]);
    // const [currentColor, setCurrentColor] = useState([]);
    // const [currentImage, setCurrentImage] = useState("");

    // const [show, setShow] = useState(false);
    // const navigate = useNavigate();

    const [currentProduct, setCurrentProduct] = useState('');
    let { product_id } = useParams()

    useEffect(() => {
        const fetchWallet = async () => {
            let response = await axios.get(BASE_URL + '/api/products/' + product_id + '/variants');
            console.log(response.data)
            setCurrentProduct(response.data)
        }

        fetchWallet()
    }, [product_id])




    return (
        <React.Fragment>
            <h1>Product details</h1>
        </React.Fragment>
    )
}