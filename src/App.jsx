import { BrowserRouter , Routes, Route} from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Profile from './pages/profile';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import Header from './components/Header';
export default function App() {
  return (
    <BrowserRouter >
    <Header />

    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/About' element={<About />}/>
      <Route path='/Profile' element={<Profile />}/>
      <Route path='/SignIn' element={<SignIn />}/>
      <Route path='/SignUp' element={<SignUp />}/>
    </Routes>
    </BrowserRouter>
  )
}
