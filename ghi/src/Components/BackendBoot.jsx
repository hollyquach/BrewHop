import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from 'react-bootstrap/Alert';


export default function Booting({
    bootStatus,
    favoritesBootError,
    accountsBootError,
    externalAPIBootError
}) {
    const [loader, setLoader] = useState("");

    useEffect(() => {
        if (favoritesBootError || accountsBootError || externalAPIBootError) {
            setLoader("d-none");
        } else {
            setLoader("");
        }
    },[favoritesBootError, accountsBootError, externalAPIBootError]);


    return (
        <Modal
            centered
            backdrop="static"
            keyboard={false}
            show
            autoFocus={true}
            enforceFocus={true}
        >
            <Modal.Header>
                <img
                    alt="BrewHop Logo"
                    src={`${process.env.PUBLIC_URL}/navlogo.svg`}
                    height="50"
                    className="d-inline-block align-top"
                />
            </Modal.Header>
            <Modal.Body>
                <Alert variant="warning">
                    <Alert.Heading>Hey, thanks for visiting BrewHop!</Alert.Heading>
                    <hr />
                    <p>
                        BrewHop is a student project by Holly Quach, Jeff Pettit,
                        Sean Sainz, and Yanning Wang. The back-end servers which run it
                        are deployed entirely using free web-hosting services and automatically
                        shut down after a period of inactivity. We appreciate your patience
                        while we get everything booted up for you!
                    </p>
                    <p className="mb-0">
                        Best regards,
                        the BrewHoppers
                    </p>
                </Alert>
                <Alert variant="danger" show={favoritesBootError}>
                    <p className="mb-0">
                        There was an error loading the <strong>Favorites service</strong>.
                        Please refresh the page and try again.
                        If this happens again, please reach out for assistance.
                    </p>
                </Alert>
                <Alert variant="danger" show={accountsBootError}>
                    <p className="mb-0">
                        There was an error loading the <strong>Accounts service</strong>.
                        Please refresh the page and try again.
                        If this happens again, please reach out for assistance.
                    </p>
                </Alert>
                <Alert variant="danger" show={externalAPIBootError}>
                    <p className="mb-0">
                        There was an error loading the <strong>external API service</strong>.
                        Please refresh the page and try again.
                        If this happens again, please reach out for assistance.
                    </p>
                </Alert>
                <div className={loader}>
                    <br />
                    <LinearProgress
                        variant="determinate"
                        value={bootStatus}
                        color="inherit"
                    />
                    <br />
                </div>
            </Modal.Body>
        </Modal>
    );
};
