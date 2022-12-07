import React, { useState } from "react";
import { useToken } from "./useToken";
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';


function BootstrapInput(props) {
    const { id, placeholder, labelText, value, onChange, type } = props;

    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{labelText}</label>
            <input value={value} onChange={onChange} required type={type} className="form-control" id={id} placeholder={placeholder} />
        </div>
    )
}

export default function AccountForm({
    showSignupForm,
    setShowSignupForm,
    setLoginStatus,
    setUserName,
    setUserID
}) {
    const [ , , , signup, ] = useToken();
    const [email, setEmail] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false)

    const handleCloseSignupForm = () => setShowSignupForm(false);
    const handleShowError = () => setShowError(true);
    const handleCloseError = () => setShowError(false);

    const clearForm = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const user = await signup(password, email, firstname, lastname);
        setUserName(user.email);
        setUserID(user.ID);
        setLoginStatus(true);
        handleCloseSignupForm();
        handleCloseError();
        clearForm();
    }

    return (
        <Modal
            show={showSignupForm}
            onHide={handleCloseSignupForm}
            centered
        >
            <Modal.Header
                closeButton
                closeLabel="Close"
            >
                <Modal.Title id="contained-modal-title-vcenter">
                    Sign up for BrewHop!
                </Modal.Title>
            </Modal.Header>
            <form className="register-form" onSubmit={handleSubmit}>
                <Modal.Body>
                    <BootstrapInput
                        id="firstname"
                        placeholder="John"
                        labelText="First Name"
                        value={firstname}
                        onChange={e => setFirstName(e.target.value)}
                        type="name" />
                    <BootstrapInput
                        id="lastname"
                        placeholder="Doe"
                        labelText="Last Name"
                        value={lastname}
                        onChange={e => setLastName(e.target.value)}
                        type="name" />
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
                    <button type="submit" className="btn btn-outline-secondary">Submit</button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}
