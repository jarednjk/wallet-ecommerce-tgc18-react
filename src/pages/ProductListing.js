import React, { useState, useEffect } from "react";
import { Form, Accordion, Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios';

const BASE_URL = "https://8000-jarednjk-jarednjkwallet-ufol4k5k2n3.ws-us63.gitpod.io"

export default function ProductListing() {
    const [materials, setMaterials] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [features, setFeatures] = useState([]);
    const [products, setProducts] = useState([]);
    const [oneProduct, setOneProduct] = useState({ products: "", variants: [] });
    const [searchInputs, setSearchInputs] = useState(true);

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

    // const updateMaterial = (e) => {
    //     if (materialSearch.includes(e.target.value)) {
    //         let index = materialSearch.indexOf(e.target.value)
    //         // clone the array
    //         let cloned = materialSearch.slice()
    //         // modify the array
    //         cloned.splice(index, 1)
    //         setMaterialSearch(cloned)
    //     } else {
    //         let cloned = materialSearch.slice()
    //         cloned.push(e.target.value)
    //         setMaterialSearch(cloned)
    //     }
    // }

    // const updateBrand = (e) => {
    //     if (brandSearch.includes(e.target.value)) {
    //         let index = brandSearch.indexOf(e.target.value)
    //         // clone the array
    //         let cloned = brandSearch.slice()
    //         // modify the array
    //         cloned.splice(index, 1)
    //         setBrandSearch(cloned)
    //     } else {
    //         let cloned = brandSearch.slice()
    //         cloned.push(e.target.value)
    //         setBrandSearch(cloned)
    //     }
    // }

    // const updateCategory = (e) => {
    //     if (categorySearch.includes(e.target.value)) {
    //         let index = categorySearch.indexOf(e.target.value)
    //         // clone the array
    //         let cloned = categorySearch.slice()
    //         // modify the array
    //         cloned.splice(index, 1)
    //         setCategorySearch(cloned)
    //     } else {
    //         let cloned = categorySearch.slice()
    //         cloned.push(e.target.value)
    //         setCategorySearch(cloned)
    //     }
    // }

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

        if(minCostSearch) {
            getSearch.min_cost = minCostSearch
        }

        if(maxCostSearch) {
            getSearch.max_cost = maxCostSearch
        }

        if(minCostSearch) {
            getSearch.min_cost = minCostSearch
        }

        if(minCardSlotSearch) {
            getSearch.min_card_slot = minCardSlotSearch
        }

        if(maxCardSlotSearch) {
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

    return (
        <React.Fragment>
            <Container>
                {/* header */}
                <div className="text-center py-5">
                    <h5>Shop</h5>
                    <h2>Men Wallets</h2>
                    <p>Crafted from premium, durable materials, our wallets feel great in your hand, and age beautifully as the years go by.</p>
                </div>

                <Row>
                    {/* Search bar */}
                    <Col lg={3}>
                        <Accordion defaultActiveKey="0" className="mt-3" alwaysOpen>
                            {/* <Accordion.Item eventKey="0">
                                <Accordion.Header>Materials</Accordion.Header>
                                <Accordion.Body>
                                    {materials.map((m) =>
                                        <Form.Check key={m[0]}
                                            checked={materialSearch.includes(m[0].toString())}
                                            label={m[1]}
                                            value={m[0]}
                                            onChange={updateMaterial} />
                                    )}

                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Brands</Accordion.Header>
                                <Accordion.Body>
                                    {brands.map((b) =>
                                        <Form.Check key={b[0]}
                                            checked={brandSearch.includes(b[0].toString())}
                                            label={b[1]}
                                            value={b[0]}
                                            onChange={updateBrand} />
                                    )}

                                </Accordion.Body>
                            </Accordion.Item> */}
                            <Form.Group>
                                <Form.Label>Search Wallet Name</Form.Label>
                                <Form.Control type="text" name="nameSearch" value={nameSearch} onChange={(e) => setNameSearch(e.target.value)} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Min Cost</Form.Label>
                                <Form.Control type="text" name="minCostSearch" value={minCostSearch} onChange={(e) => setMinCostSearch(e.target.value)} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Max Cost</Form.Label>
                                <Form.Control type="text" name="maxCostSearch" value={maxCostSearch} onChange={(e) => setMaxCostSearch(e.target.value)} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Min Card Slots</Form.Label>
                                <Form.Control type="text" name="minCardSlotSearch" value={minCardSlotSearch} onChange={(e) => setMinCardSlotSearch(e.target.value)} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Max Card Slots</Form.Label>
                                <Form.Control type="text" name="maxCardSlotSearch" value={maxCardSlotSearch} onChange={(e) => setMaxCardSlotSearch(e.target.value)} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Materials</Form.Label>
                                <Form.Select value={materialSearch} onChange={updateMaterial}>
                                    {materials.map((m) =>
                                        <option key={m[0]} name="materialSearch" value={m[0]}>
                                            {m[1]}
                                        </option>
                                    )}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Brands</Form.Label>
                                <Form.Select value={brandSearch} onChange={updateBrand}>
                                    {brands.map((b) =>
                                        <option key={b[0]} name="brandSearch" value={b[0]}>
                                            {b[1]}
                                        </option>
                                    )}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Categories</Form.Label>
                                <Form.Select value={categorySearch} onChange={updateCategory}>
                                    {categories.map((c) =>
                                        <option key={c[0]} name="categorySearch" value={c[0]}>
                                            {c[1]}
                                        </option>
                                    )}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Features</Form.Label>
                                {features.map((f) =>
                                    <Form.Check key={f[0]}
                                        checked={featureSearch.includes(f[0].toString())}
                                        label={f[1]}
                                        value={f[0]}
                                        onChange={updateFeature} />
                                )}
                            </Form.Group>

                            <div>
                                <Button onClick={search}>Search</Button>
                                <Button>Reset</Button>
                            </div>


                        </Accordion>
                    </Col>

                    {/* Product Listing */}
                    <Col lg={9}>
                        <Row className="g-5">
                            {products.map(p => <React.Fragment key={p.id}>
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

