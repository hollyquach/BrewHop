import React, { useState } from "react";
import { useToken } from "../Hooks/useToken";
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';


function BootstrapInput(props) {
    const { id, placeholder, labelText, value, onChange, type } = props;

    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{labelText}</label>
            <input value={value} onChange={onChange} required type={type} className="form-control" id={id} placeholder={placeholder} />
        </div>
    )
}

export default function Login({
    showLoginForm,
    setShowLoginForm,
    setLoginStatus,
    setUserName,
    setUserID,
}) {
    const [login] = useToken();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false)
    const [showSpinner, setShowSpinner] = useState('d-none')
    const [showSubmitButton, setShowSubmitButton] = useState("btn btn-outline-secondary")

    const handleCloseLoginForm = () => setShowLoginForm(false);

    const loading = () => {
        setShowSubmitButton("d-none btn btn-outline-secondary");
        setShowSpinner('');
        setShowError(false);
    }

    const loginError = () => {
        setShowSubmitButton("btn btn-outline-secondary");
        setShowSpinner('d-none');
        setShowError(true);
    }

    const loginSuccess = () => {
        setShowSubmitButton("btn btn-outline-secondary");
        setShowSpinner('d-none');
        setShowError(false);
    }

    const clearForm = () => {
        setEmail('');
        setPassword('');
    }

    const handleSubmit = async e => {
        e.preventDefault();
        loading();
        const user = await login(email, password);
        if (user.email && user.ID && user.token) {
            setUserName(user.email);
            setUserID(user.ID);
            setLoginStatus(true);
            handleCloseLoginForm();
            loginSuccess();
            clearForm();
        } else {
            loginError();
        }
    };

    return (
        <Modal
            show={showLoginForm}
            onHide={handleCloseLoginForm}
            centered
        >
            <Modal.Header
                closeButton
                closeLabel="Close"
            >
                <Modal.Title id="contained-modal-title-vcenter">
                    Login
                </Modal.Title>
            </Modal.Header>
            <form className="register-form" onSubmit={handleSubmit}>
                <Modal.Body>
                    <BootstrapInput
                        id="email"
                        placeholder="name@example.com"
                        labelText="Email address"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="email" />
                    <BootstrapInput
                        id="password"
                        placeholder="Case Sensitive"
                        labelText="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password" />
                </Modal.Body>
                <Modal.Footer>
                    <Alert variant="danger" show={showError}>
                        Please enter valid user credentials.
                    </Alert>
                    <Spinner className={showSpinner} animation="border" variant="secondary" />
                    <button type="submit" className={showSubmitButton}>Submit</button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}
