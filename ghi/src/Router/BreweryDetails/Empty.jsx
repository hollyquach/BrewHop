import { useNavigate } from 'react-router';

export default function Empty() {
    const navigate = useNavigate()

    return (
        <>
        <div className="text-center">
            <header>
                You must select a brewery to view the details. Return to home and select one from either search or featured breweries.
            </header>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back to Search</button>
        </div>
        </>
    )
}