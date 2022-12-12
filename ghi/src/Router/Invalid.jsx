export default function Invalid() {

    return (
        <div className="App">
            <header className="App-header">
                <img
                    src={`${process.env.PUBLIC_URL}/Rocky.png`}
                    alt="A Greyhound named Rocky"
                    height="400"
                />
                <p>Move along - nothing to see here except Rocky!</p>
            </header>
        </div>
    )
}
