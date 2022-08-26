import React, { useState, useEffect } from "react";
import { Form, Accordion, Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios';

const BASE_URL = "https://8000-jarednjk-jarednjkwallet-ufol4k5k2n3.ws-us63.gitpod.io"

export default function ProductListing() {
    const [materials, setMaterials] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const [oneProduct, setOneProduct] = useState({ products: "", variants: [] });
    const [searchInputs, setSearchInputs] = useState(true);

    const [nameSearch, setNameSearch] = useState("");
    const [featureSearch, setFeatureSearch] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            let response = await axios.get(BASE_URL + "/api/products");
            setProducts(response.data);
            console.log('setProducts', response.data)
           
        }
        fetchProducts()
    }, [])

    return (
        <React.Fragment>
            <Container>
                {/* header */}
                <div>
                    <h5>Shop</h5>
                    <h2>Men Wallets</h2>
                    <p>Crafted from premium, durable materials, our wallets feel great in your hand, and age beautifully as the years go by.</p>
                </div>

                <Row>
                    {/* Search bar */}
                    <Col lg={3}>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Search</Accordion.Header>
                                <Accordion.Body>

                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>

                    {/* Product Listing */}
                    <Col lg={9}>
                        <Row className="g-5">
                            {products.map(p => <React.Fragment key={p._id}>
                                <Col xs={12} md={6} lg={6} xl={4}>
                                    <Card className="h-100 rounded-3 shadow">
                                        <Link to={"/shop/" + p.id} className="text-reset text-decoration-none" >
                                            <Card.Img variant="top" src={p?.variants?.[0]?.image_url} />
                                            <div id="card-cta">
                                                <p className="text-center p-1" style={{ color: "white" }}>QUICK VIEW</p>
                                            </div>
                                            <Card.Body className="pt-0">
                                                <Card.Title>{p.name}</Card.Title>
                                                <Card.Text>
                                                    SGD {p.cost}
                                                </Card.Text>

                                            </Card.Body>
                                        </Link>
                                    </Card>
                                </Col>
                            </React.Fragment>)}
                        </Row>
                    </Col>
                </Row>

            </Container>
        </React.Fragment>
    )
}

