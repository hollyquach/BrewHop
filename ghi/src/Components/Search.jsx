import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import States from './States';


export default function Search({setSearchCity, setSearchState}) {
    const [inputCity, setInputCity] = useState('')
    const [inputState, setInputState] = useState('')
    const navigate = useNavigate();
    return (
        <form>
            <div className="input-group">
                <input
                    required
                    value={inputCity}
                    onChange={e => {
                        e.preventDefault();
                        setInputCity(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    placeholder="City"
                />
                <States inputState={inputState} setInputState={setInputState} />
                <button
                    className="btn btn-outline-secondary"
                    onClick={e => {
                        e.preventDefault();
                        navigate('search/');
                        setSearchCity(inputCity);
                        setSearchState(inputState);
                    }}
                >
                    Search
                </button>
            </div>
        </form>
    )
};
