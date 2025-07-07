import React, { useState } from 'react';
import { User, MapPin, Calendar, Clock, AlertTriangle, CheckCircle, XCircle, FileText, MessageSquare, Star, TrendingUp, ChevronRight, Mail, Phone, Award, Briefcase, DollarSign, Upload, Tag, Send, Eye, ThumbsUp, ThumbsDown, ChevronDown, ChevronUp, Building, Users, Copy, Edit, Plus, Target, BookOpen, Filter, BarChart3, Lock, Info, Link, Settings, File, Play, Bell, X } from 'lucide-react';
import PositionDetailsJD from './PositionDetailsJD';
import PositionDetailsApplicants from './PositionDetailsApplicants';
import JobInfoPage from './PositionDetailsJobInfo';
import PositionDetailsMeeting from './PositionDetailsMeeting';

const PositionDetails = ({ onBack, jrNo }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [memos, setMemos] = useState([
    {
      id: 1,
      content: '초기 스크리닝 기준을 React 3년 이상 경력으로 설정했습니다. @김태현 확인 부탁드려요!',
      author: '차지현',
      createdAt: '2025-06-25 14:30',
      isEdited: false,
      tags: ['김태현']
    },
    {
      id: 2,
      content: 'HM과 논의 결과, TypeScript 필수 조건으로 추가 협의 중입니다. @김린 @차지현',
      author: '김태현',
      createdAt: '2025-06-24 09:15',
      isEdited: true,
      editedAt: '2025-06-24 16:20',
      tags: ['김린', '차지현']
    }
  ]);
  const [newMemo, setNewMemo] = useState('');
  const [editingMemoId, setEditingMemoId] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const [currentUser] = useState('김린');
  
  const availableUsers = ['김린', '차지현', '김태현', '박영수', '이미경'];

  const [showStatsSettings, setShowStatsSettings] = useState(false);

  const [selectedStatusItems, setSelectedStatusItems] = useState([
    'totalApplications', 
    'documentReview', 
    'preAssignment', 
    'firstInterview', 
    'secondInterview', 
    'thirdInterview', 
    'offerNegotiation', 
    'finalAccepted'
  ]);

  const allStatsOptions = {
    'totalApplications': { label: '총 지원자', color: 'blue' },
    'documentReview': { label: '서류 검토', color: 'indigo' },
    'preAssignment': { label: '과제 전형', color: 'purple' },
    'firstInterview': { label: '1차 면접', color: 'orange' },
    'secondInterview': { label: '2차 면접', color: 'red' },
    'thirdInterview': { label: '3차 면접', color: 'pink' },
    'offerNegotiation': { label: '처우 협의', color: 'yellow' },
    'finalAccepted': { label: '최종합격', color: 'green' },
    'rejected': { label: '불합격', color: 'gray' }
  };

  // 지원자 유입 추이 데이터
  const applicationTrendData = [
    { date: '2025.06.08 주간', value: 0 },
    { date: '2025.06.15 주간', value: 0 },
    { date: '2025.06.22 주간', value: 0 },
    { date: '2025.06.29 주간', value: 3.0 },
    { date: '2025.07.06 주간', value: 0 }
  ];

  const jobData = {
    jobName: 'Frontend Engineer (29cm)',
    department: '29cm',
    jobFamily: 'Frontend Engineer',
    experience: '5년 이상',
    employmentType: '정규직',
    jobLevel: 'L4',
    openDate: '2025.06.10',
    matsNumber: jrNo || 'MATS0000001111',
    recruiter: '김린',
    rc: '김린',
    hiringManager: '김태현',
    managingOrganization: '플랫폼본부',
    jobGroup: 'IT/개발',
    position: 'Frontend Engineer (29cm)',
    closeDate: '2025.08.10',
    // 새로 추가된 직무 설명 요약과 사유
    jobSummary: `29cm 서비스의 프론트엔드 개발을 담당할 시니어 엔지니어를 찾고 있습니다. 

주요 업무:
• React, TypeScript를 활용한 웹 애플리케이션 개발
• 사용자 경험 최적화 및 성능 개선
• 백엔드 팀과의 협업을 통한 API 연동
• 코드 리뷰 및 주니어 개발자 멘토링
• 새로운 기술 스택 도입 및 아키텍처 설계

필요 역량:
• React 5년 이상 실무 경험
• TypeScript, ES6+ 숙련
• 상태관리 라이브러리 경험 (Redux, Zustand 등)
• 웹 성능 최적화 경험
• 반응형 웹 개발 경험
• Git을 활용한 협업 경험

우대사항:
• Next.js 프레임워크 경험
• 테스트 코드 작성 경험 (Jest, Testing Library)
• 빌드 도구 설정 경험 (Webpack, Vite)
• UI/UX 디자인에 대한 이해
• 애자일 개발 방법론 경험`,
    hiringReason: `플랫폼본부 29cm 팀의 급속한 성장과 함께 다음과 같은 이유로 Frontend Engineer 채용이 필요합니다:

사업적 배경:
• 29cm 서비스 월 활성 사용자 300% 증가로 인한 개발 업무량 급증
• 신규 기능 개발 속도 향상 필요 (현재 배포 주기: 2주 → 목표: 1주)
• 모바일 트래픽 비중 증가로 인한 반응형 최적화 작업 증가

기술적 배경:
• 레거시 코드 리팩토링 프로젝트 진행 중 (jQuery → React 마이그레이션)
• 마이크로 프론트엔드 아키텍처 도입 계획
• 성능 최적화 프로젝트 (페이지 로딩 속도 50% 개선 목표)

조직적 배경:
• 현재 Frontend 팀 3명으로 업무량 대비 인력 부족
• 시니어 개발자 부재로 인한 기술적 의사결정 지연
• 주니어 개발자들의 성장을 위한 멘토 역할 필요

기대 효과:
• 개발 생산성 40% 향상 예상
• 코드 품질 개선 및 유지보수성 향상
• 팀원들의 기술적 성장 가속화
• 신규 서비스 런칭 일정 단축 (3개월 → 2개월)`,
    headcounts: [
      { id: 'MATS0000111', status: 'hiring', assignedRecruiter: '김린' },
      { id: 'MATS0000112', status: 'completed', assignedRecruiter: '김린' },
      { id: 'MATS0000113', status: 'hiring', assignedRecruiter: '차지현' }
    ],
    similarPositions: [
      { id: 'MATS001', title: 'Frontend Engineer (무신사)', status: 'active' },
      { id: 'MATS002', title: 'Frontend Engineer (코어 플랫폼)', status: 'active' },
      { id: 'MATS003', title: 'Frontend Engineer (글로벌)', status: 'closed' }
    ],
    stats: {
      totalApplications: 47,
      documentReview: 32,
      preAssignment: 18,
      firstInterview: 12,
      secondInterview: 8,
      thirdInterview: 5,
      offerNegotiation: 3,
      finalAccepted: 2,
      rejected: 15
    },
    stageStats: {
      'totalApplications': { count: 47, percent: 100, wow: 92 },
      'documentReview': { count: 32, percent: 68, wow: 85 },
      'preAssignment': { count: 18, percent: 38, wow: 88 },
      'firstInterview': { count: 12, percent: 26, wow: 91 },
      'secondInterview': { count: 8, percent: 17, wow: 94 },
      'thirdInterview': { count: 5, percent: 11, wow: 89 },
      'offerNegotiation': { count: 3, percent: 6, wow: 76 },
      'finalAccepted': { count: 2, percent: 4, wow: 95 },
      'rejected': { count: 15, percent: 32, wow: 88 }
    },
    dailyStats: [
      { date: '2025-06-10', applications: 3, stage_changes: 5 },
      { date: '2025-06-11', applications: 2, stage_changes: 8 },
      { date: '2025-06-12', applications: 1, stage_changes: 3 }
    ],
    recruitmentStatus: 'good',
    progressRate: 68,
    avgDays: 12,
    targetComparison: 85,
    passRate: 24
  };

  const stageNames = {
    'totalApplications': '총 지원자',
    'documentReview': '서류 검토',
    'preAssignment': '과제 전형',
    'firstInterview': '1차 면접',
    'secondInterview': '2차 면접',
    'thirdInterview': '3차 면접',
    'offerNegotiation': '처우 협의',
    'finalAccepted': '최종합격',
    'rejected': '불합격'
  };

  const stageColors = {
    'totalApplications': 'bg-blue-500',
    'documentReview': 'bg-indigo-500',
    'preAssignment': 'bg-purple-500',
    'firstInterview': 'bg-orange-500',
    'secondInterview': 'bg-red-500',
    'thirdInterview': 'bg-pink-500',
    'offerNegotiation': 'bg-yellow-500',
    'finalAccepted': 'bg-green-500',
    'rejected': 'bg-gray-500'
  };

  const navigationItems = [
    { id: 'overview', label: '포지션 상세', icon: Target },
    { id: 'jd', label: '공고 관리', icon: FileText },
    { id: 'candidates', label: '후보자 관리', icon: Users },
    { id: 'kickoff', label: '회의록 관리', icon: Play },
    { id: 'jobinfo', label: '포지션 관리', icon: Info }
  ];

  const handleJobNavigation = (jobId) => {
    console.log('직무 페이지로 이동:', jobId);
    alert(`${jobId} 직무 페이지로 이동합니다.`);
  };

  const getWowColor = (wow) => {
    if (wow >= 90) return 'text-green-600';
    if (wow >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleAddMemo = () => {
    if (newMemo.trim()) {
      const now = new Date();
      const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      const memo = {
        id: memos.length + 1,
        content: newMemo,
        author: currentUser,
        createdAt: timestamp,
        isEdited: false,
        tags: extractTags(newMemo)
      };
      
      setMemos([memo, ...memos]);
      setNewMemo('');
    }
  };

  const handleEditMemo = (memoId) => {
    const memo = memos.find(m => m.id === memoId);
    setEditingMemoId(memoId);
    setEditingContent(memo.content);
  };

  const handleSaveEdit = (memoId) => {
    if (editingContent.trim()) {
      const now = new Date();
      const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      setMemos(memos.map(memo => 
        memo.id === memoId 
          ? { 
              ...memo, 
              content: editingContent, 
              isEdited: true, 
              editedAt: timestamp,
              tags: extractTags(editingContent)
            }
          : memo
      ));
      
      setEditingMemoId(null);
      setEditingContent('');
    }
  };

  const handleCancelEdit = () => {
    setEditingMemoId(null);
    setEditingContent('');
  };

  const extractTags = (content) => {
    const tagRegex = /@([가-힣a-zA-Z0-9]+)/g;
    const matches = content.match(tagRegex);
    return matches ? matches.map(match => match.substring(1)) : [];
  };

  const renderContentWithTags = (content) => {
    const parts = content.split(/(@[가-힣a-zA-Z0-9]+)/g);
    return parts.map((part, index) => {
      if (part.startsWith('@')) {
        const username = part.substring(1);
        return (
          <span key={index} className="bg-blue-100 text-blue-800 px-1 rounded font-medium">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const handleStatusToggle = (statusKey) => {
    setSelectedStatusItems(prev => 
      prev.includes(statusKey)
        ? prev.filter(key => key !== statusKey)
        : [...prev, statusKey]
    );
  };

  const handleSelectAllStatus = () => {
    setSelectedStatusItems(Object.keys(allStatsOptions));
  };

  const handleDeselectAllStatus = () => {
    setSelectedStatusItems([]);
  };

  const getDaysFromOpen = () => {
    const openDate = new Date(jobData.openDate.replace(/\./g, '-'));
    const today = new Date();
    const diffTime = today - openDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const renderOverviewContent = () => (
    <div className="relative">
      {/* 우측 상단 설정 버튼 */}
      <div className="absolute top-0 right-0 z-10">
        <button
          onClick={() => setShowStatsSettings(!showStatsSettings)}
          className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors flex items-center text-gray-700 hover:text-blue-600 shadow-sm"
          title="현황 표시 설정"
        >
          <Settings className="w-4 h-4 mr-2" />
          표시 항목 설정
        </button>
      </div>

      <div className="space-y-8 pt-16">
        {/* 설정 모달 */}
        {showStatsSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
              {/* 모달 헤더 */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <Settings className="w-6 h-6 mr-3 text-blue-600" />
                  현황 표시 설정
                </h3>
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSelectAllStatus}
                      className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                    >
                      전체 선택
                    </button>
                    <button
                      onClick={handleDeselectAllStatus}
                      className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                    >
                      전체 해제
                    </button>
                  </div>
                  <button
                    onClick={() => setShowStatsSettings(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              {/* 모달 내용 */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(allStatsOptions).map(([key, option]) => (
                    <div key={key} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3 mb-3">
                        <input
                          type="checkbox"
                          checked={selectedStatusItems.includes(key)}
                          onChange={() => handleStatusToggle(key)}
                          className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="font-semibold text-gray-800">{option.label}</span>
                      </div>
                      <div className="ml-8 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>총 인원:</span>
                          <span className="font-medium">{jobData.stats[key] || 0}명</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 모달 푸터 */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">선택된 항목:</span> {selectedStatusItems.length}개
                  </div>
                  <button
                    onClick={() => setShowStatsSettings(false)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    완료
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 포지션 정보 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">포지션 정보</h3>
                <div className="ml-3 flex items-center text-sm text-amber-600 bg-amber-50 px-2 py-1 rounded">
                  <Lock className="w-4 h-4 mr-1" />
                  워크데이 연동
                </div>
              </div>
              <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {getDaysFromOpen()}일차
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Recruiter</label>
                <p className="text-sm font-semibold text-gray-900 mt-1">{jobData.recruiter}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">RC</label>
                <p className="text-sm font-semibold text-gray-900 mt-1">{jobData.rc}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">HM</label>
                <p className="text-sm font-semibold text-gray-900 mt-1">{jobData.hiringManager}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">관할 조직</label>
                <p className="text-sm font-semibold text-gray-900 mt-1">{jobData.managingOrganization}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">직무군</label>
                <p className="text-sm font-semibold text-gray-900 mt-1">{jobData.jobGroup}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">포지션</label>
                <p className="text-sm font-bold text-gray-900 mt-1">{jobData.position}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">레벨</label>
                <p className="text-sm font-semibold text-gray-900 mt-1">{jobData.jobLevel}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">부문</label>
                <p className="text-sm font-semibold text-gray-900 mt-1">{jobData.department}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">포지션 승인일</label>
                <p className="text-sm font-semibold text-gray-900 mt-1">{jobData.openDate}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">포지션 마감일</label>
                <p className="text-sm font-semibold text-gray-900 mt-1">{jobData.closeDate}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">후보자 입사일</label>
                <p className="text-sm font-semibold text-gray-900 mt-1">{jobData.closeDate}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">무슨 날짜든</label>
                <p className="text-sm font-semibold text-gray-900 mt-1">{jobData.closeDate}</p>
              </div>
            </div>
          </div>

          {/* 포지션 개요 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">포지션 개요</h3>
              </div>
            </div>
            
            <div className="max-h-80 overflow-y-auto">
              <div className="space-y-6">
                {/* 직무 설명 요약 */}
                <div>
                  <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    직무 설명 요약
                  </h4>
                  <div className="text-sm text-gray-700 leading-relaxed space-y-1">
                    <div>• 무신사 내 오프라인 베이스 신규 프로젝트 기획/실행, 오프라인 운영 프로세스 내재화, 신규 세일즈 체널 확보 등 업무를 통해 오프라인 경쟁력을 지속 제고함</div>
                  </div>
                </div>

                {/* 사유 */}
                <div>
                  <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    사유
                  </h4>
                  <div className="text-sm text-gray-700 leading-relaxed space-y-1">
                    <div>• 24년 기준 20명 이상이었던 무신사스튜디오 세일즈 및 운영 인력을 전반적인 구조 조정 및 운영 효율화를 통해 현재 7명 체제로 축소하였음. 불필요한 리소스는 과감히 정리한 반면, 효율성과 성과 중심의 조직으로 재편한 상황입니다. 하지만 신규 지점(동대문종합시장점) 오픈이 확정되었고, 기존 인력으로는 해당 지점 세일즈 및 운영 대응이 불가능한 상황이고, 또한 재계약 이탈을 방지하고, 매출 보존 및 확대를 위해 신규 계약을 체결할 전담 인력의 확보가 필수적으로 신규 채용 진행을 요청드립니다.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">채용 현황</h3>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium text-gray-800 mb-4">단계별 현황</h4>
              {selectedStatusItems.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>표시할 현황을 선택해주세요.</p>
                  <button
                    onClick={() => setShowStatsSettings(true)}
                    className="mt-2 text-blue-600 hover:text-blue-800 underline"
                  >
                    설정하기
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedStatusItems.map((stage) => {
                    const data = jobData.stageStats[stage];
                    if (!data) return null;
                    return (
                      <div key={stage} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${stageColors[stage]}`}></div>
                          <span className="text-sm text-gray-700">{stageNames[stage]}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <span className="font-medium text-gray-800">{data.count}명</span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-gray-500">WoW</span>
                            <span className={`font-medium ml-1 ${getWowColor(data.wow)}`}>
                              {data.wow}%
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-4">채용 상태</h4>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-center mb-6">
                  <div className="flex justify-center space-x-3 mb-4">
                    <div className={`w-6 h-6 rounded-full ${jobData.recruitmentStatus === 'good' ? 'bg-green-500 shadow-lg shadow-green-200' : 'bg-gray-300'}`}></div>
                    <div className={`w-6 h-6 rounded-full ${jobData.recruitmentStatus === 'warning' ? 'bg-yellow-500 shadow-lg shadow-yellow-200' : 'bg-gray-300'}`}></div>
                    <div className={`w-6 h-6 rounded-full ${jobData.recruitmentStatus === 'danger' ? 'bg-red-500 shadow-lg shadow-red-200' : 'bg-gray-300'}`}></div>
                  </div>
                  
                  <div className="mb-4">
                    {jobData.recruitmentStatus === 'good' && (
                      <div>
                        <div className="text-lg font-semibold text-green-600 mb-2">원활한 진행 중</div>
                        <div className="text-sm text-gray-600">채용이 계획대로 순조롭게 진행되고 있습니다</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-gray-500 mb-1">진행률</div>
                      <div className="font-semibold text-gray-800">{jobData.progressRate}%</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-gray-500 mb-1">서류 합격률</div>
                      <div className="font-semibold text-gray-800">{jobData.targetComparison}%</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-gray-500 mb-1">면접 합격률</div>
                      <div className="font-semibold text-gray-800">{jobData.passRate}%</div>
                    </div>
                    {selectedStatusItems.includes('firstInterview') && (
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-gray-500 mb-1">1차 면접 합격률</div>
                        <div className="font-semibold text-gray-800">75%</div>
                      </div>
                    )}
                    {selectedStatusItems.includes('secondInterview') && (
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-gray-500 mb-1">2차 면접 합격률</div>
                        <div className="font-semibold text-gray-800">67%</div>
                      </div>
                    )}
                    {selectedStatusItems.includes('thirdInterview') && (
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-gray-500 mb-1">3차 면접 합격률</div>
                        <div className="font-semibold text-gray-800">60%</div>
                      </div>
                    )}
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-gray-500 mb-1">최종 합격률</div>
                      <div className="font-semibold text-gray-800">{jobData.passRate}%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 지원자 유입 추이 - 개선된 버전 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">지원자 유입 추이</h3>
            </div>
            <div className="flex items-center space-x-2">
              <select className="text-sm border border-gray-300 rounded px-3 py-1">
                <option>지난 1개월</option>
                <option>지난 3개월</option>
                <option>지난 6개월</option>
              </select>
              <select className="text-sm border border-gray-300 rounded px-3 py-1">
                <option>포지션별: 주</option>
                <option>포지션별: 일</option>
                <option>포지션별: 월</option>
              </select>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="relative h-80 mb-4">
            <svg className="w-full h-full" viewBox="0 0 1000 300">
              {/* 그리드 라인 */}
              <defs>
                <pattern id="gridlines" width="200" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 200 0 L 0 0 0 60" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
                </pattern>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "#3b82f6", stopOpacity: 0.3 }} />
                  <stop offset="100%" style={{ stopColor: "#3b82f6", stopOpacity: 0 }} />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#gridlines)" />
              
              {/* Y축 라벨 */}
              <g className="text-sm fill-gray-500">
                <text x="40" y="50" textAnchor="end">3</text>
                <text x="40" y="80" textAnchor="end">2.8</text>
                <text x="40" y="110" textAnchor="end">2.6</text>
                <text x="40" y="140" textAnchor="end">2.4</text>
                <text x="40" y="170" textAnchor="end">2.2</text>
                <text x="40" y="200" textAnchor="end">2</text>
                <text x="40" y="230" textAnchor="end">1.8</text>
                <text x="40" y="260" textAnchor="end">1.6</text>
                <text x="40" y="290" textAnchor="end">1.4</text>
                <text x="40" y="320" textAnchor="end">1.2</text>
                <text x="40" y="350" textAnchor="end">1</text>
                <text x="40" y="380" textAnchor="end">0.8</text>
                <text x="40" y="410" textAnchor="end">0.6</text>
                <text x="40" y="440" textAnchor="end">0.4</text>
                <text x="40" y="470" textAnchor="end">0.2</text>
                <text x="40" y="280" textAnchor="end">0</text>
              </g>
              
              {/* 면적 채우기 */}
              <path
                d="M 80,280 L 280,280 L 480,280 L 680,180 L 880,280 L 880,300 L 80,300 Z"
                fill="url(#areaGradient)"
              />
              
              {/* 지원자 유입 추이 라인 */}
              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                points="80,280 280,280 480,280 680,180 880,280"
              />
              
              {/* 데이터 포인트 */}
              <circle cx="80" cy="280" r="5" fill="#3b82f6" className="hover:r-7 cursor-pointer transition-all" />
              <circle cx="280" cy="280" r="5" fill="#3b82f6" className="hover:r-7 cursor-pointer transition-all" />
              <circle cx="480" cy="280" r="5" fill="#3b82f6" className="hover:r-7 cursor-pointer transition-all" />
              <circle cx="680" cy="180" r="5" fill="#3b82f6" className="hover:r-7 cursor-pointer transition-all" />
              <circle cx="880" cy="280" r="5" fill="#3b82f6" className="hover:r-7 cursor-pointer transition-all" />
              
              {/* X축 라벨 */}
              <g className="text-sm fill-gray-500">
                <text x="80" y="320" textAnchor="middle">2025. 06. 08 주간</text>
                <text x="280" y="320" textAnchor="middle">2025. 06. 15 주간</text>
                <text x="480" y="320" textAnchor="middle">2025. 06. 22 주간</text>
                <text x="680" y="320" textAnchor="middle">2025. 06. 29 주간</text>
                <text x="880" y="320" textAnchor="middle">2025. 07. 06 주간</text>
              </g>
            </svg>
          </div>
          
          <div className="text-xs text-gray-500 flex justify-between items-center">
            <span>업데이트: 2025.07.07, 05:00</span>
            <button className="flex items-center text-gray-400 hover:text-gray-600">
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center mb-6">
            <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">포지션 메모</h3>
            <span className="ml-2 text-sm text-gray-500">({memos.length})</span>
          </div>
          
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <textarea
              value={newMemo}
              onChange={(e) => setNewMemo(e.target.value)}
              placeholder="포지션에 대한 메모나 코멘트를 남겨주세요... (@사용자명 으로 태그 가능)"
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
            />
            <div className="flex justify-end items-center mt-3">
              <button
                onClick={handleAddMemo}
                disabled={!newMemo.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                메모 추가
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {memos.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>아직 작성된 메모가 없습니다.</p>
                <p className="text-sm">첫 번째 메모를 작성해보세요!</p>
              </div>
            ) : (
              memos.map((memo) => (
                <div key={memo.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-800">{memo.author}</span>
                      <span className="text-sm text-gray-500">
                        {memo.isEdited ? memo.editedAt : memo.createdAt}
                        {memo.isEdited && <span className="ml-1 text-blue-600">(편집됨)</span>}
                      </span>
                    </div>
                    {memo.author === currentUser && (
                      <button
                        onClick={() => handleEditMemo(memo.id)}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        title="메모 편집"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  {editingMemoId === memo.id ? (
                    <div className="space-y-3">
                      <textarea
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows="3"
                        placeholder="@사용자명 으로 태그 가능"
                      />
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                          {availableUsers.map((user, index) => (
                            <span key={user} className="mr-2">
                              <button
                                onClick={() => setEditingContent(prev => prev + `@${user} `)}
                                className="text-blue-600 hover:text-blue-800 underline text-xs"
                              >
                                @{user}
                              </button>
                            </span>
                          ))}
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={handleCancelEdit}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                          >
                            취소
                          </button>
                          <button
                            onClick={() => handleSaveEdit(memo.id)}
                            disabled={!editingContent.trim()}
                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                          >
                            저장
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-700 leading-relaxed mb-2">
                        {renderContentWithTags(memo.content)}
                      </p>
                      {memo.tags && memo.tags.length > 0 && (
                        <div className="flex items-center space-x-1 text-sm">
                          <span className="text-gray-500">태그:</span>
                          {memo.tags.map((tag, index) => (
                            <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center mb-6">
              <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">TO 관리</h3>
            </div>
            <div className="space-y-4">
              {jobData.headcounts.map((hc, index) => (
                <div key={hc.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800">{hc.id}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      hc.status === 'hiring' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {hc.status === 'hiring' ? '채용 중' : '채용 완료'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Frontend Engineer L4</p>
                  <p className="text-xs text-gray-500">담당: {hc.assignedRecruiter}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center mb-6">
              <Link className="w-5 h-5 mr-2 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">연관 포지션</h3>
            </div>
            <div className="space-y-3">
              {jobData.similarPositions.map((position, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-800">{position.title}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      position.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {position.status === 'active' ? '활성' : '마감'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleJobNavigation(position.id)}
                      className="p-1 text-gray-600 hover:text-blue-600"
                      title="포지션 페이지로 이동"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-600 hover:text-green-600">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlaceholderContent = (title) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
      <div className="text-gray-400 mb-4">
        <File className="w-16 h-16 mx-auto" />
      </div>
      <h3 className="text-lg font-medium text-gray-600 mb-2">{title}</h3>
      <p className="text-gray-500">이 섹션의 내용이 곧 추가될 예정입니다.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-64 bg-white shadow-sm border-r border-gray-200 fixed h-full">
        <div className="p-6">
          <div className="mb-6">
            <button 
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              ← 포지션 목록
            </button>
            <h2 className="text-lg font-semibold text-gray-800">포지션 관리</h2>
            <p className="text-sm text-gray-500 mt-1">{jobData.matsNumber}</p>
          </div>
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                }}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon className={`w-5 h-5 mr-3 ${
                  activeSection === item.id ? 'text-blue-600' : 'text-gray-500'
                }`} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="flex-1 ml-64">
        {/* 공통 헤더 */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {navigationItems.find(item => item.id === activeSection)?.label}
              </h1>
              <p className="text-gray-600 mt-1">{jobData.jobName}</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => alert('병합 처리 창을 준비 중입니다.')}
                className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium"
              >
                병합 처리
              </button>
              
              <div className="relative">
                <select
                  defaultValue="active"
                  className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium border-0 cursor-pointer appearance-none pr-8 hover:bg-blue-200 transition-colors"
                >
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="closed">Closed</option>
                  <option value="draft">Draft</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-blue-600" />
              </div>
              
              <span className="text-sm bg-green-100 text-green-800 px-3 py-2 rounded-lg font-medium">
                Active
              </span>
              
              <span className="text-sm bg-gray-100 text-gray-700 px-3 py-2 rounded-lg font-medium">
                {jobData.matsNumber.replace(/^JR/, 'MATS')}
              </span>
            </div>
          </div>
        </div>

        {/* 컨텐츠 영역 */}
        <div className="p-6">
          {activeSection === 'overview' && renderOverviewContent()}
          {activeSection === 'candidates' && (
            <PositionDetailsApplicants 
              onBack={onBack} 
              positionData={jobData} 
              jrNo={jrNo}
              positionStatus="active"
              onPositionStatusChange={() => {}}
            />
          )}
          {activeSection === 'jd' && <PositionDetailsJD onBack={onBack} jrNo={jrNo} />}
          {activeSection === 'kickoff' && <PositionDetailsMeeting onBack={onBack} positionData={jobData} jrNo={jrNo} />}
          {activeSection === 'jobinfo' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <JobInfoPage 
                onBack={onBack} 
                positionData={jobData} 
                jrNo={jrNo} 
                positionStatus="active" 
                onPositionStatusChange={() => {}} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PositionDetails;
