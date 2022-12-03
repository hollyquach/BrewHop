import { useToken } from "./useToken";
import {useAuthContext} from './useToken';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"

function BootstrapInput(props) {
    const { id, placeholder, labelText, value, onChange, type } = props;

  return (
    <div className="mb-3">
        <label htmlFor={id} className="form-label">{labelText}</label>
        <input value={value} onChange={onChange} required type={type} className="form-control" id={id} placeholder={placeholder} />
    </div>
  )
} 

function Login() {
  const [token, login] = useToken();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async e => {
        e.preventDefault();
        await login(email, password);
        navigate('/');
    };

    return (
        <div>
            <form className="register-form" onSubmit={handleSubmit}>
                <BootstrapInput 
                    id="email"
                    placeholder="name@example.com"
                    labelText="Your email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email" />
                <BootstrapInput 
                    id="password"
                    placeholder="password"
                    labelText="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password" />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}


export default Login;
