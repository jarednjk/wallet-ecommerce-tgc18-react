import React, { useState, useEffect } from "react";
import { Form, Accordion, Container, Row, Col, Card, Button } from "react-bootstrap";
import { FiSearch, FiFilter } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from 'axios';

const BASE_URL = "https://8000-jarednjk-jarednjkwallet-ufol4k5k2n3.ws-us63.gitpod.io"

export default function ProductListing() {
    const [materials, setMaterials] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [features, setFeatures] = useState([]);
    const [products, setProducts] = useState([]);

    const [nameSearch, setNameSearch] = useState("");
    const [materialSearch, setMaterialSearch] = useState("");
    const [categorySearch, setCategorySearch] = useState("");
    const [brandSearch, setBrandSearch] = useState("");
    const [featureSearch, setFeatureSearch] = useState([]);
    const [minCostSearch, setMinCostSearch] = useState("");
    const [maxCostSearch, setMaxCostSearch] = useState("");
    const [minCardSlotSearch, setMinCardSlotSearch] = useState("");
    const [maxCardSlotSearch, setMaxCardSlotSearch] = useState("");


    useEffect(() => {
        const fetchProducts = async () => {
            let response = await axios.get(BASE_URL + "/api/products");
            setProducts(response.data);

        }
        fetchProducts()
    }, [])

    useEffect(() => {
        const fetch = async () => {
            let response = await axios.get(BASE_URL + "/api/products/materials");
            setMaterials(response.data);
            console.log(response.data);
        }
        fetch()
    }, [])

    useEffect(() => {
        const fetch = async () => {
            let response = await axios.get(BASE_URL + "/api/products/brands");
            setBrands(response.data);
            console.log(response.data)
        }
        fetch()
    }, [])

    useEffect(() => {
        const fetch = async () => {
            let response = await axios.get(BASE_URL + "/api/products/categories");
            setCategories(response.data);
        }
        fetch()
    }, [])

    useEffect(() => {
        const fetch = async () => {
            let response = await axios.get(BASE_URL + "/api/products/features");
            setFeatures(response.data);
        }
        fetch()
    }, [])

    const updateMaterial = (e) => {
        setMaterialSearch(e.target.value)
    }

    const updateBrand = (e) => {
        setBrandSearch(e.target.value)
    }

    const updateCategory = (e) => {
        setCategorySearch(e.target.value)
    }

    const updateFeature = (e) => {
        if (featureSearch.includes(e.target.value)) {
            let index = featureSearch.indexOf(e.target.value)
            // clone the array
            let cloned = featureSearch.slice()
            // modify the array
            cloned.splice(index, 1)
            setFeatureSearch(cloned)
        } else {
            let cloned = featureSearch.slice()
            cloned.push(e.target.value)
            setFeatureSearch(cloned)
        }
    }

    const search = async () => {
        let getSearch = {};

        if (nameSearch) {
            getSearch.name = nameSearch
        }

        if (minCostSearch) {
            getSearch.min_cost = minCostSearch
        }

        if (maxCostSearch) {
            getSearch.max_cost = maxCostSearch
        }

        if (minCostSearch) {
            getSearch.min_cost = minCostSearch
        }

        if (minCardSlotSearch) {
            getSearch.min_card_slot = minCardSlotSearch
        }

        if (maxCardSlotSearch) {
            getSearch.max_card_slot = maxCardSlotSearch
        }

        if (materialSearch && materialSearch !== '0') {
            getSearch.material_id = materialSearch
        }

        if (brandSearch && brandSearch !== '0') {
            getSearch.brand_id = brandSearch
        }

        if (categorySearch && categorySearch !== '0') {
            getSearch.category_id = categorySearch
        }

        if (featureSearch && featureSearch.length !== 0) {
            getSearch.features = featureSearch
        }

        const response = await axios.post(BASE_URL + "/api/products/search", getSearch)
        console.log("search results", response.data)
        setProducts(response.data)
    }

    const resetSearch = async () => {
        setNameSearch("")
        setMaterialSearch("")
        setBrandSearch("")
        setCategorySearch("")
        setFeatureSearch([])
        setMinCostSearch("")
        setMaxCostSearch("")
        setMinCardSlotSearch("")
        setMaxCardSlotSearch("")

        const response = await axios.get(BASE_URL + "/api/products")
        setProducts(response.data)
    }

    return (
        <React.Fragment>
            <Container>
                {/* header */}
                <div className="text-center py-5">
                    <h5>Shop</h5>
                    <h2>Men Wallets</h2>
                    <p>Crafted from premium, durable materials, our wallets feel great in your hand, and age beautifully as the years go by.</p>
                </div>

                <Row className="g-4 g-lg-5">
                    {/* Search bar */}
                    <Col lg={3}>
                        <div className="input-box d-flex flex-row align-items-center ps-3 rounded mb-3">
                            <FiSearch className="ms-1" />
                            <Form.Control type="text" name="nameSearch" value={nameSearch} onChange={(e) => setNameSearch(e.target.value)} placeholder="Search Wallet" className="py-2 border-0 bg-transparent rounded-0" />
                        </div>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header><FiFilter className="me-1" />Filter</Accordion.Header>
                                <Accordion.Body>

                                    <div className="d-flex justify-content-between d-lg-block">
                                        <Form.Group className="mb-2 me-3 me-lg-0 search-box">
                                            <Form.Label>Min Cost</Form.Label>
                                            <Form.Control type="text" name="minCostSearch" value={minCostSearch} onChange={(e) => setMinCostSearch(e.target.value)} />
                                        </Form.Group>

                                        <Form.Group className="mb-2 search-box">
                                            <Form.Label>Max Cost</Form.Label>
                                            <Form.Control type="text" name="maxCostSearch" value={maxCostSearch} onChange={(e) => setMaxCostSearch(e.target.value)} />
                                        </Form.Group>
                                    </div>

                                    <div className="d-flex justify-content-between d-lg-block">
                                        <Form.Group className="mb-2 me-3 me-lg-0 search-box">
                                            <Form.Label>Min Card Slots</Form.Label>
                                            <Form.Control type="text" name="minCardSlotSearch" value={minCardSlotSearch} onChange={(e) => setMinCardSlotSearch(e.target.value)} />
                                        </Form.Group>

                                        <Form.Group className="mb-2 search-box">
                                            <Form.Label>Max Card Slots</Form.Label>
                                            <Form.Control type="text" name="maxCardSlotSearch" value={maxCardSlotSearch} onChange={(e) => setMaxCardSlotSearch(e.target.value)} />
                                        </Form.Group>
                                    </div>

                                    <div className="d-flex justify-content-between d-lg-block">
                                        <Form.Group className="mb-2 me-3 me-lg-0 search-box">
                                            <Form.Label>Material</Form.Label>
                                            <Form.Select value={materialSearch} onChange={updateMaterial}>
                                                {materials.map((m) =>
                                                    <option key={m[0]} name="materialSearch" value={m[0]}>
                                                        {m[1]}
                                                    </option>
                                                )}
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group className="mb-2 search-box">
                                            <Form.Label>Brand</Form.Label>
                                            <Form.Select value={brandSearch} onChange={updateBrand}>
                                                {brands.map((b) =>
                                                    <option key={b[0]} name="brandSearch" value={b[0]}>
                                                        {b[1]}
                                                    </option>
                                                )}
                                            </Form.Select>
                                        </Form.Group>
                                    </div>

                                    <div className="d-flex justify-content-between d-lg-block">
                                        <Form.Group className="mb-2 me-3 me-lg-0 search-box">
                                            <Form.Label>Category</Form.Label>
                                            <Form.Select value={categorySearch} onChange={updateCategory}>
                                                {categories.map((c) =>
                                                    <option key={c[0]} name="categorySearch" value={c[0]}>
                                                        {c[1]}
                                                    </option>
                                                )}
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group className="mb-3 search-box">
                                            <Form.Label>Features</Form.Label>
                                            {features.map((f) =>
                                                <Form.Check key={f[0]}
                                                    checked={featureSearch.includes(f[0].toString())}
                                                    label={f[1]}
                                                    value={f[0]}
                                                    onChange={updateFeature} />
                                            )}
                                        </Form.Group>
                                    </div>
                                    <div className="text-end">
                                        <Button onClick={search}>Search</Button>
                                        <Button onClick={resetSearch} className="ms-2">Reset</Button>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>

                    {/* Product Listing */}
                    <Col lg={9}>
                        <Row className="g-5">
                            {products.map(p => <React.Fragment key={p.id}>
                                <Col xs={12} md={6} lg={6} xl={4}>
                                    <Card className="h-100 rounded-3 shadow">
                                        <Link to={"/wallets/" + p.id} className="text-reset text-decoration-none" >
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

