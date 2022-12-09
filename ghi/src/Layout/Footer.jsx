import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import '../App.scss'

export default function FooterBar() {
    return (
        <Navbar variant="light" bg="light" fixed="bottom">
            <Navbar.Collapse>
                <Navbar.Brand className='footer-text'>
                    BrewHop   |   2022
                </Navbar.Brand>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Brand
                    href="https://gitlab.com/brewhoppers/brew-hop"
                    className='footer-text'
                >
                    <img
                        alt="Project Repository Link"
                        src={`${process.env.PUBLIC_URL}/gitlab-logo-600.svg`}
                        height="30"
                        className="d-inline-block align-middle"
                    />Project Repository
                </Navbar.Brand>
            </Navbar.Collapse>
        </Navbar>
    )
};
