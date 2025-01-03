import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';

// 페이지 컴포넌트 import
import Overview from './pages/Overview/Overview';
import AboutUs from './pages/AboutUs/AboutUs';
import OfficialEvents from './pages/OfficialEvents/OfficialEvents';
import LocalEvents from './pages/LocalEvents/LocalEvents';
import Recruit from './pages/Recruit/Recruit';
import Help from './pages/Help/Help';
import MyPage from './pages/MyPage/MyPage';

function App() {
  return (
    <div style={{ display: 'flex' }}>
      {/* 왼쪽 사이드바 */}
      <Sidebar />

      {/* 오른쪽 메인 영역 */}
      <div style={{ flex: 1, padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/about-us" element={<AboutUs />} />
          {/* ...<Route path="/about/gdg" element={<Gdg />} />
          <Route path="/about/gdg-ku" element={<GdgKu />} /> 각 하위 페이지 */}
          <Route path="/events/official" element={<OfficialEvents />} />
          <Route path="/events/local" element={<LocalEvents />} />
          <Route path="/recruit" element={<Recruit />} />
          <Route path="/help" element={<Help />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
