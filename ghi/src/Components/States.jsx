import React from 'react';
import states from '/app/src/assets/usstates.json';


export default function State({inputState, setInputState}) {
    return (
        <select
            required
            value={inputState}
            onChange={e => {
                e.preventDefault();
                setInputState(e.target.value);
            }}
            name="state"
            className="form-control"
        >
            <option value="">State</option>
            <option disabled>----------</option>
            {
                states.map(state => {
                    return (
                        <option key={state.code} value={state.code}>
                            {state.state}
                        </option>
                    )
                }
                )
            }
        </select>
    )
};
