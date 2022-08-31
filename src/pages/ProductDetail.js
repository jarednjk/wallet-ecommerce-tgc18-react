import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Form, Accordion, Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";

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
    let { product_id } = useParams()

    useEffect(() => {
        const fetchWallet = async () => {
            let response = await axios.get(BASE_URL + '/api/products/' + product_id + '/variants');
            console.log(response.data)
            setCurrentWallet(response.data)
        }

        fetchWallet()
    }, [product_id])




    return (
        <React.Fragment>
            <Container>
                <div className="my-4 mx-auto">
                    <nav aria-label="breadcrumb d-flex justify-content-center mb-2">
                        <ol className="breadcrumb d-flex justify-content-center">
                            <li className="breadcrumb-item text-secondary"><a className="text-reset text-decoration-none" href="/wallets">Wallets</a></li>
                            <li className="text-dark breadcrumb-item active" aria-current="page">{currentWallet.product?.name}</li>
                        </ol>
                    </nav>
                </div>


                <Row>
                    <Col xs={12} lg={8} xl={8}>
                        <Carousel variant="dark" fade>
                            <Carousel.Item>
                                {currentWallet.variants?.map((w) =>
                                    <img className="img-fluid" src={w.image_url} />
                                )}
                            </Carousel.Item>
                        </Carousel>

                    </Col>
                    <Col xs={12} lg={4} xl={4}>
                        <h2>{currentWallet.product?.name}</h2>
                        <p>SGD {currentWallet.product?.cost}</p>
                        <hr />
                        <p>{currentWallet.product?.description}</p>
                        {currentWallet.variants?.map((w) =>
                            <p><strong>Stocks Available:</strong> {w.stock}</p>
                        )}
                        <div className="d-grid mb-4">
                            <Button>ADD TO CART</Button>
                        </div>
                        <hr />

                        <h4>SPECIFICATIONS</h4>
                        <p><strong>Dimension:</strong> {currentWallet.product?.length} x {currentWallet.product?.width} x {currentWallet.product?.height} mm
                            <br /><strong>Card Slot:</strong> {currentWallet.product?.card_slot}
                            <br /><strong>Material:</strong> {currentWallet.product?.material?.name}
                            <br /><strong>Category:</strong> {currentWallet.product?.category?.name}</p>


                    </Col>
                </Row>
            </Container>


        </React.Fragment>
    )
}