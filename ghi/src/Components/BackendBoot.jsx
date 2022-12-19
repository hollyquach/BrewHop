import React from "react";
import Modal from 'react-bootstrap/Modal';
import LinearProgress from '@mui/material/LinearProgress';


export default function Booting({ bootStatus }) {
    return (
        <>
            <Modal
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>
                        Test
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LinearProgress variant="determinate" value={bootStatus} />
                </Modal.Body>
                <Modal.Footer>
                    Test
                </Modal.Footer>
            </Modal>
        </>
    );
};
