import "./App.css"
import Profile from "./pages/profile/Profile";

import Home from "./pages/home/Home";
import Auth from "./pages/auth/Auth";
import {Routes, Route, Navigate, useLocation} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Chat from "./pages/chat/Chat";
import CityMap from "./pages/cityMap/CityMap";
import StoryBook from "./pages/storyBook/StoryBook";
import Welcome from "./pages/welcome/Welcome";
import Story from "./pages/story/Story";
import NotFound from "./pages/notFound/NotFound";

function App() {

  const user = useSelector((state) => state.authReducer.authData)
  const location = useLocation()
  return (
    <div className="App">
        {/* <div className="blur" style={{top: '-18%', right: '0'}}></div>
        <div className="blur" style={{top: '36%', left: '-8rem'}}></div> */}
        
          <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/home' element={user? <Home/> : <Navigate to='../auth' />} />
            <Route path='/auth' element={user? <Navigate to={location.state?.from ? location.state.from : '../home'}/>:<Auth />} />
            <Route path='/profile/:id' element={user? <Profile />:<Navigate to='../auth' state={{from: location.pathname}}/>} />
            <Route path='/chat' element={user ? <Chat /> : <Navigate to='../auth' state={{from: location.pathname}}/>} />
            <Route path='/city_map' element={<CityMap />} />
            <Route path='/storybook' element={user?<StoryBook />:<Navigate to='../auth' state={{from: location.pathname}}/>} />
            <Route path='/story/:id/:storyId' element={user?<Story />:<Navigate to='../auth' state={{from: location.pathname}}/>} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        
    </div>
  );
}

export default App;
