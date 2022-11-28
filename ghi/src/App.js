import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginSignupForm from './LoginSignupForm'

function App() {
  return (
    <BrowserRouter>
      <div className='container'>
        <Routes>
          <Route path="/" element={<LoginSignupForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;