import { useEffect, useState } from 'react';
import Construct from './Construct.js'
import ErrorNotification from './ErrorNotification';
import {Route, Routes} from 'react-router-dom'
import './App.css';
import Featured from './Router/Featured'
import Layout from './Router/Layout'
import Results from './Router/Results';
import Favorites from './Router/Favorites.jsx';
import Brewery from './Router/Brewery.jsx';
import Invalid from './Router/Invalid.jsx';

function App() {
  const [launch_info, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function getData() {
  //     let url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/launch-details`;
  //     console.log('fastapi url: ', url);
  //     let response = await fetch(url);
  //     console.log("------- hello? -------");
  //     let data = await response.json();

  //     if (response.ok) {
  //       console.log("got launch data!");
  //       setLaunchInfo(data.launch_details);
  //     } else {
  //       console.log("drat! something happened");
  //       setError(data.message);
  //     }
  //   }
  //   getData();
  // }, [])


  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Featured />} />
          <Route path="search/" element={<Results />} />
          <Route path="favorites/" element={<Favorites />} />
          <Route path="brewery/" element={<Brewery />} />
          <Route path="*" element={<Invalid />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
