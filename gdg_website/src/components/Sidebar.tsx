import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

interface SubItem {
  label: string;
  path: string;
}

interface MainItem {
  label: string;
  subItems?: SubItem[];
}

const menuData: MainItem[] = [
  {
    label: 'About us',
    subItems: [
      { label: 'GDG', path: '/about/gdg' },
      { label: 'GDG KU', path: '/about/gdg-ku' },
      { label: 'Members', path: '/about/members' },
      { label: 'Rules', path: '/about/rules' },
      { label: 'Calendar', path: '/about/calendar' },
    ],
  },
  {
    label: 'Official Events',
    subItems: [
      { label: 'Google Solution Challenge', path: '/events/official/solution-challenge' },
      { label: 'Google Cloud Skills Boost', path: '/events/official/cloud-skills' },
      { label: 'Google I/O Extended', path: '/events/official/io-extended' },
      { label: 'Devfest', path: '/events/official/devfest' },
    ],
  },
  {
    label: 'Local Events',
    subItems: [
      { label: 'Branch', path: '/events/local/branch' },
      { label: 'Fetch', path: '/events/local/fetch' },
      { label: 'Worktree', path: '/events/local/worktree' },
      { label: 'Hotfix', path: '/events/local/hotfix' },
      { label: 'Merge', path: '/events/local/merge' },
    ],
  },
  {
    label: 'Recruit',
    subItems: [
      { label: 'SWE', path: '/recruit/swe' },
      { label: 'Designer', path: '/recruit/designer' },
      { label: 'DevRel', path: '/recruit/devrel' },
    ],
  },
  {
    label: 'Help',
    subItems: [
      { label: 'Contact', path: '/help/contact' },
      { label: 'FAQ', path: '/help/faq' },
    ],
  },
];

const Sidebar: React.FC = () => {
  /** 
   * 현재 마우스를 올린(또는 서브바가 열려 있는) 상위메뉴 인덱스
   * null이면 어떤 메뉴에도 마우스가 없고, 서브 사이드바도 닫힘
   */
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // 마우스가 메인 메뉴 위에 올라갔을 때
  const handleMainMenuMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  // 마우스가 메인 메뉴에서 나갔을 때
  // 단, 서브 사이드바 위로 바로 이동하는 경우도 있으므로,
  // 실제로 서브 사이드바를 벗어났는지까지 체크해야 함
  const handleMainMenuMouseLeave = () => {
    // 여기서 바로 setHoveredIndex(null) 하면
    // 서브 사이드바로 마우스 이동시 꺼질 수 있으니 주의
    // -> onMouseEnter(서브 사이드바)에서 다시 방어 가능
  };

  // 서브 사이드바에 마우스 들어옴
  const handleSubSidebarEnter = (index: number) => {
    setHoveredIndex(index);
  };

  // 서브 사이드바에서 마우스 나감 -> 닫기
  const handleSubSidebarLeave = () => {
    setHoveredIndex(null);
  };

  // 프로필 (하단)
  const userProfileImage =
    'https://cdn-icons-png.flaticon.com/512/847/847969.png';

  return (
    <aside className="main-sidebar">
      {/* 로고 */}
      <div className="logo-area">
        <Link to="/overview">
          <img
            src="https://cdn-icons-png.flaticon.com/512/732/732221.png"
            alt="Logo"
            className="logo-image"
          />
        </Link>
      </div>

      {/* 메인 메뉴 목록 */}
      <div className="main-menu">
        {menuData.map((item, index) => (
          <div
            key={item.label}
            className="main-menu-item"
            onMouseEnter={() => handleMainMenuMouseEnter(index)}
            onMouseLeave={handleMainMenuMouseLeave}
          >
            {item.label}
          </div>
        ))}
      </div>

      {/* 유저(마이페이지) 아이콘 */}
      <div className="user-area">
        <Link to="/mypage">
          <img
            src={userProfileImage}
            alt="User"
            className="user-profile-image"
          />
        </Link>
      </div>

      {/* 서브 사이드바 (마우스 올라간 메뉴가 있을 때만 열림) */}
      {hoveredIndex !== null && menuData[hoveredIndex].subItems && (
        <div
          className={`sub-sidebar ${hoveredIndex !== null ? 'open' : ''}`}
          onMouseEnter={() => handleSubSidebarEnter(hoveredIndex)}
          onMouseLeave={handleSubSidebarLeave}
        >
          <div className="sub-menu-title">
            {menuData[hoveredIndex].label}
          </div>
          <div className="sub-menu-items">
            {menuData[hoveredIndex].subItems!.map((sub) => (
              <Link
                key={sub.label}
                to={sub.path}
                className="sub-menu-link"
              >
                {sub.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
