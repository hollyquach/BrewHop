import { useNavigate } from 'react-router';

export default function Empty() {
    const navigate = useNavigate()

    return (
        <>
            <div className="App">
                <div className="App-header">
                    <div className="text-center">
                        <h4>
                            Data has been lost, please return home.
                        </h4>
                        <button className="btn btn-secondary" onClick={() => navigate("/")}>Home</button>
                    </div>
                </div>
            </div>
        </>
    )
}
