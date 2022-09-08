import React from 'react';
import Button from 'react-bootstrap/Button';

export default function Home() {
    return (
        <React.Fragment>
            <div className="bg-height position-relative">
                <div id="bg-image" ></div>
                <div id="cta">
                    <big><p className="mb-3 px-2">Built with trust and confidence.</p></big>
                    <h1 className="display-4 mb-4">MEN WALLET</h1>
                    <Button variant="dark" href="/wallets">SHOP NOW</Button>
                </div>
            </div>
        </React.Fragment>
    )
}