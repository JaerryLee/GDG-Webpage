import React, { useState, useMemo } from 'react';
import Sidebar from '../../components/Sidebar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 캘린더 기본 스타일
import './Overview.css';
import ActivityModal from './ActivityModal';

// 날짜별 이벤트(활동) 정보를 정의
interface ActivityItem {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  category: string; 
  startTime?: string; // "HH:MM"
  endTime?: string;   // "HH:MM"
  description?: string;
}

const sampleActivities: ActivityItem[] = [
  {
    id: '1',
    title: 'branch 세미나',
    date: '2024-12-01',
    category: 'branch',
    startTime: '10:00',
    endTime: '12:00',
    description: 'branch 사용법 관련 세미나'
  },
  {
    id: '2',
    title: 'fetch 스터디',
    date: '2024-12-05',
    category: 'fetch',
    startTime: '14:00',
    endTime: '15:30',
    description: 'fetch 활용 프로젝트 스터디'
  },
  {
    id: '3',
    title: 'worktree 발표',
    date: '2024-12-15',
    category: 'worktree',
    startTime: '09:00',
    endTime: '10:00',
    description: 'Git worktree 발표 및 실습'
  },
  {
    id: '4',
    title: 'Solution Challenge 준비',
    date: '2024-12-20',
    category: 'solution',
    startTime: '19:00',
    endTime: '21:00',
    description: 'Google Solution Challenge 아이디어 논의'
  },
];

// 날짜(객체)를 'YYYY-MM-DD' 문자열로 변환
function formatDate(dateObj: Date): string {
  return dateObj.toISOString().split('T')[0];
}

const Overview: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalActivities, setModalActivities] = useState<ActivityItem[]>([]);

  // 날짜를 클릭했을 때: 해당 날짜의 이벤트 배열을 모달에 전달
  const handleDayClick = (value: Date) => {
    const clickedDate = formatDate(value);
    const matched = sampleActivities.filter((act) => act.date === clickedDate);
    setModalActivities(matched);
    setSelectedDate(value);
    setModalOpen(true);
  };

  // 달력에서 각 '타일'(날짜 셀)에 추가 컨텐츠/클래스를 줄 수 있는 옵션
  // 1) tileContent: 날짜 셀 내부에 표시될 ReactNode
  // 2) tileClassName: 날짜 셀에 CSS 클래스를 부여
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    // 월(월간) 뷰에서만 표시
    if (view === 'month') {
      const yyyymmdd = formatDate(date);
      const matched = sampleActivities.filter((act) => act.date === yyyymmdd);
      // 일정이 있다면 작은 점/뱃지 등을 표시 (예시)
      if (matched.length > 0) {
        return (
          <div className="tile-badge">
            {matched.length}건
          </div>
        );
      }
    }
    return null;
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const yyyymmdd = formatDate(date);
      const matched = sampleActivities.filter((act) => act.date === yyyymmdd);
      if (matched.length > 0) {
        // 일정이 있는 날짜에는 별도 CSS class 부여
        return 'has-activities';
      }
    }
    return '';
  };

  // 모달 닫기 핸들러
  const closeModal = () => setModalOpen(false);

  // 선택된 날짜의 YYYY-MM-DD
  const formattedDate = formatDate(selectedDate);

  return (
    <div className="overview-container">

      <main className="overview-main">
        <h1>Overview</h1>
        <p>캘린더에 일정이 표시되며, 날짜 클릭 시 모달로 상세 정보를 확인할 수 있습니다.</p>

        {/* 리액트-캘린더 */}
        <div className="calendar-wrapper">
          <Calendar
            onClickDay={handleDayClick}
            tileContent={tileContent}
            tileClassName={tileClassName}
            locale="en-GB"  // or "ko-KR"
          />
        </div>

        <p>선택된 날짜: {formattedDate}</p>

        {/* 날짜 클릭 시 모달 띄워 상세 일정 표시 */}
        {modalOpen && (
          <ActivityModal
            date={selectedDate}
            activities={modalActivities}
            onClose={closeModal}
          />
        )}
      </main>
    </div>
  );
};

export default Overview;
