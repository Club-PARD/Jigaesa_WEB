import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import KaKaoLogin from './Components/Login_Components/KaKaoLogin';
import ListPage from './Pages/ListPage';
import SelectRegionPage from './Pages/SelectRegionPage';
import Header from './Components/Layout_Components/Header';
import NotFound from './Pages/NotFound';
import MyPage from './Pages/MyPage';
import Postit from './Pages/Postit';
import WritingPage from './Pages/WritingPage';
import AboutPage from './Components/About_Components/AboutPage';

//Pages 폴더로부터 컴포넌트를 가져와서 라우터 연결  
function App() {
  return (
    <Routes>  
      <Route element={<Header/>}>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/list' element={<ListPage/>}/>
        <Route path='/mypage' element={<MyPage/>}/>
        <Route path='/writing' element={<WritingPage/>}/>
        <Route path='/postit' element={<Postit/>}/>
        <Route path='/about' element={<AboutPage/>}/>
      </Route>
      <Route path='/login/oauth2/code/kakao' element={<KaKaoLogin/>}/>
      <Route path='/selectregion' element={<SelectRegionPage/>}/>
      <Route path="/*" element={<NotFound/>} />
    </Routes>

  );
}

export default App;
