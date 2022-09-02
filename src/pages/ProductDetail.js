import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Form, Accordion, Container, Row, Col, Card, Button, Carousel, Toast } from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

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

    const [currentWallet, setCurrentWallet] = useState('');
    const [selectedVariant, setSelectedVariant] = useState('');
    let { product_id } = useParams()

    useEffect(() => {
        const fetchWallet = async () => {
            let response = await axios.get(BASE_URL + '/api/products/' + product_id + '/variants');
            console.log(response.data)
            setCurrentWallet(response.data)
        }

        fetchWallet()
    }, [product_id])

    const updateVariant = (e) => {
        setSelectedVariant(e.target.value)
    }

    const addToCart = async () => {
        if (localStorage.getItem("accessToken")) {
            console.log(localStorage.getItem("accessToken"))
            // let accessToken = localStorage.getItem("accessToken")
            let variant_id = selectedVariant;
            console.log(variant_id)
            try {
                let response = await axios.post(BASE_URL + `/api/cart/${variant_id}/add`,
                {},
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                })
                console.log(response.data);
                toast.success("Successfully added to cart");
                return true;
            } catch (error) {
                console.log(error)
                toast.error("You can't add anymore quantity");
                return false;
            }
        } else {
            toast.error('You have to log in to add to cart')
        }
    }

    return (
        <React.Fragment>
            <Container className="p-5">
                <div className="mx-auto">
                    <nav aria-label="breadcrumb d-flex justify-content-center mb-2">
                        <ol className="breadcrumb d-flex justify-content-center">
                            <li className="breadcrumb-item text-secondary"><a className="text-reset text-decoration-none" href="/wallets">Wallets</a></li>
                            <li className="text-dark breadcrumb-item active" aria-current="page">{currentWallet.product?.name}</li>
                        </ol>
                    </nav>
                </div>


                <Row className="g-4">
                    <Col xs={12} lg={8}>
                        <Carousel variant="dark" fade>

                            {currentWallet.variants?.map((w) =>
                                <Carousel.Item>
                                    <img className="img-fluid" src={w.image_url} />
                                </Carousel.Item>

                            )}
                        </Carousel>

                    </Col>
                    <Col xs={12} lg={4}>
                        <h2>{currentWallet.product?.name}</h2>
                        <p>SGD {currentWallet.product?.cost}</p>
                        <hr />
                        <p>{currentWallet.product?.description}</p>

                        <div className="">
                            {currentWallet.variants?.map(v => {
                                return (
                                    <React.Fragment>

                                        <span key={v.id}>
                                            <input type="radio" name="sizeVariant" id={v.id} className="d-none"
                                                value={v.id} onChange={updateVariant} checked={selectedVariant === `${v.id}`} />

                                            <label htmlFor={v.id} key={v.name} style={{ cursor: "pointer" }}>
                                                <span style={{ backgroundColor: `${v.color.name.toLowerCase()}` }} className={selectedVariant === `${v.id}` ? 'checked-circle me-2' : 'me-2 unchecked-circle'}
                                                ></span>
                                            </label>
                                        </span>
                                    </React.Fragment>
                                )
                            })}
                        </div>
                        {currentWallet.variants?.map(v => <div>{selectedVariant === `${v.id}` ?

                            (parseInt(v.stock) > 5) ? <span key={v.id}>{v.stock} stocks available </span> : <span key={v.id} style={{ color: 'red' }}> Only {v.stock} stocks left </span>
                            : null}</div>)}

                        <div className="d-grid mt-3 mb-4">
                            <Button onClick={()=>{addToCart()}}>ADD TO CART</Button>
                        </div>
                        <hr />

                        <h4>SPECIFICATIONS</h4>
                        <p><strong>Dimension:</strong> {currentWallet.product?.length} x {currentWallet.product?.width} x {currentWallet.product?.height} mm
                            <br /><strong>Card Slot:</strong> {currentWallet.product?.card_slot}
                            <br /><strong>Material:</strong> {currentWallet.product?.material?.name}
                            <br /><strong>Category:</strong> {currentWallet.product?.category?.name}
                            <br /><span><strong>Feature: </strong>

                                {currentWallet.product?.features?.map((p, index) =>
                                    index === currentWallet.product?.features?.length - 1 ? <span>{p.name}</span> : <span>{p.name}, </span>
                                )}
                            </span>
                        </p>


                    </Col>
                </Row>
                <ToastContainer />
            </Container>


        </React.Fragment>
    )
}