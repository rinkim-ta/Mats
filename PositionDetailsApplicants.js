import React, { useState } from 'react';
import { Filter, Plus, Eye, Edit, Download, Upload, Search, ChevronDown, Calendar, Clock, User, Mail, Phone, FileText, MessageSquare, Star, Award } from 'lucide-react';

const PositionDetailsApplicants = ({ onBack, positionData, jrNo, positionStatus, onPositionStatusChange }) => {
  const [stageFilter, setStageFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('application_date');
  const [viewMode, setViewMode] = useState('table');

  // 후보자 샘플 데이터
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: '김철수',
      email: 'kim.cs@email.com',
      phone: '010-1234-5678',
      position: 'Frontend Developer',
      experience: '5년',
      currentStage: 'first_interview',
      applicationDate: '2025.06.15',
      lastActivity: '2025.06.20',
      recruiter: '김린',
      rating: 4,
      status: 'active',
      notes: 'React 전문가, 포트폴리오 우수',
      resume: 'resume_kim.pdf',
      avatar: 'K',
      avatarColor: 'bg-blue-100 text-blue-600'
    },
    {
      id: 2,
      name: '이영희',
      email: 'lee.yh@email.com',
      phone: '010-2345-6789',
      position: 'React Developer',
      experience: '7년',
      currentStage: 'offer_negotiation',
      applicationDate: '2025.06.12',
      lastActivity: '2025.06.22',
      recruiter: '차지현',
      rating: 5,
      status: 'active',
      notes: '시니어 개발자, 리더십 경험 풍부',
      resume: 'resume_lee.pdf',
      avatar: '이',
      avatarColor: 'bg-green-100 text-green-600'
    },
    {
      id: 3,
      name: '박민수',
      email: 'park.ms@email.com',
      phone: '010-3456-7890',
      position: 'Full Stack Developer',
      experience: '3년',
      currentStage: 'document_review',
      applicationDate: '2025.06.18',
      lastActivity: '2025.06.19',
      recruiter: '차지현',
      rating: 3,
      status: 'active',
      notes: '백엔드 경험도 보유',
      resume: 'resume_park.pdf',
      avatar: '박',
      avatarColor: 'bg-purple-100 text-purple-600'
    },
    {
      id: 4,
      name: '최다혜',
      email: 'choi.dh@email.com',
      phone: '010-4567-8901',
      position: 'Frontend Developer',
      experience: '4년',
      currentStage: 'second_interview',
      applicationDate: '2025.06.10',
      lastActivity: '2025.06.21',
      recruiter: '김린',
      rating: 4,
      status: 'active',
      notes: 'Vue.js 전문가',
      resume: 'resume_choi.pdf',
      avatar: '최',
      avatarColor: 'bg-yellow-100 text-yellow-600'
    },
    {
      id: 5,
      name: '정수현',
      email: 'jung.sh@email.com',
      phone: '010-5678-9012',
      position: 'Frontend Developer',
      experience: '2년',
      currentStage: 'pre_assignment',
      applicationDate: '2025.06.20',
      lastActivity: '2025.06.20',
      recruiter: '차지현',
      rating: 3,
      status: 'active',
      notes: '신입급 개발자, 성장 가능성 높음',
      resume: 'resume_jung.pdf',
      avatar: '정',
      avatarColor: 'bg-red-100 text-red-600'
    }
  ]);

  const stageNames = {
    'casual_chat': '캐주얼 챗',
    'document_review': '서류 검토',
    'pre_assignment': '사전 과제',
    'first_interview': '1차 인터뷰',
    'second_interview': '2차 인터뷰',
    'offer_negotiation': '처우 협의',
    'joining_planned': '입사 예정',
    'rejected': '불합격',
    'withdrawn': '지원 철회'
  };

  const stageColors = {
    'casual_chat': 'bg-indigo-100 text-indigo-800',
    'document_review': 'bg-blue-100 text-blue-800',
    'pre_assignment': 'bg-purple-100 text-purple-800',
    'first_interview': 'bg-orange-100 text-orange-800',
    'second_interview': 'bg-red-100 text-red-800',
    'offer_negotiation': 'bg-yellow-100 text-yellow-800',
    'joining_planned': 'bg-green-100 text-green-800',
    'rejected': 'bg-gray-100 text-gray-800',
    'withdrawn': 'bg-gray-100 text-gray-600'
  };

  // 필터링된 후보자 목록
  const filteredCandidates = candidates.filter(candidate => {
    const matchesStage = stageFilter === 'all' || candidate.currentStage === stageFilter;
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStage && matchesSearch;
  });

  const handleCandidateClick = (candidateId) => {
    console.log('후보자 상세보기:', candidateId);
    alert(`후보자 ${candidateId} 상세 페이지로 이동합니다.`);
  };

  const handleStageChange = (candidateId, newStage) => {
    setCandidates(prev => 
      prev.map(candidate => 
        candidate.id === candidateId 
          ? { ...candidate, currentStage: newStage, lastActivity: new Date().toISOString().split('T')[0].replace(/-/g, '.') }
          : candidate
      )
    );
  };

  const handleAddCandidate = () => {
    alert('새 후보자 추가 모달을 열어야 합니다.');
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const renderTableView = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-600">지원자</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">현재 단계</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">경력</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">지원일</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">평가</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">담당자</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">액션</th>
          </tr>
        </thead>
        <tbody>
          {filteredCandidates.map((candidate) => (
            <tr key={candidate.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-4 px-4">
                <div>
                  <p className="font-medium text-gray-800">{candidate.name}</p>
                  <p className="text-sm text-gray-500">{candidate.position}</p>
                  <p className="text-xs text-gray-400">{candidate.email}</p>
                </div>
              </td>
              <td className="py-4 px-4">
                <select
                  value={candidate.currentStage}
                  onChange={(e) => handleStageChange(candidate.id, e.target.value)}
                  className={`text-xs px-2 py-1 rounded-full border-0 ${stageColors[candidate.currentStage]} cursor-pointer`}
                >
                  {Object.entries(stageNames).map(([key, name]) => (
                    <option key={key} value={key}>{name}</option>
                  ))}
                </select>
              </td>
              <td className="py-4 px-4">{candidate.experience}</td>
              <td className="py-4 px-4">
                <div>
                  <p className="text-sm">{candidate.applicationDate}</p>
                  <p className="text-xs text-gray-500">최근: {candidate.lastActivity}</p>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center space-x-1">
                  {renderStars(candidate.rating)}
                </div>
              </td>
              <td className="py-4 px-4">{candidate.recruiter}</td>
              <td className="py-4 px-4">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleCandidateClick(candidate.id)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    상세보기
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderCardView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredCandidates.map((candidate) => (
        <div key={candidate.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-medium text-gray-800">{candidate.name}</h4>
              <p className="text-sm text-gray-500">{candidate.position}</p>
              <p className="text-xs text-gray-400">{candidate.experience} 경력</p>
            </div>
            <div className="flex items-center space-x-1">
              {renderStars(candidate.rating)}
            </div>
          </div>

          <div className="mb-3">
            <span className={`text-xs px-2 py-1 rounded-full ${stageColors[candidate.currentStage]}`}>
              {stageNames[candidate.currentStage]}
            </span>
          </div>

          <div className="text-sm text-gray-600 mb-3">
            <p>지원일: {candidate.applicationDate}</p>
            <p>담당자: {candidate.recruiter}</p>
          </div>

          {candidate.notes && (
            <div className="text-xs text-gray-500 mb-3 p-2 bg-gray-50 rounded">
              {candidate.notes}
            </div>
          )}

          <div className="flex items-center justify-between">
            <button 
              onClick={() => handleCandidateClick(candidate.id)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              상세보기
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* 검색과 필터 컨트롤들 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            {/* 검색 */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="이름, 이메일, 포지션 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64"
              />
            </div>

            {/* 단계 필터 */}
            <select 
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="all">전체 단계</option>
              {Object.entries(stageNames).map(([key, name]) => (
                <option key={key} value={key}>{name}</option>
              ))}
            </select>

            {/* 정렬 */}
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="application_date">지원일순</option>
              <option value="last_activity">최근 활동순</option>
              <option value="name">이름순</option>
              <option value="rating">평가순</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              총 {filteredCandidates.length}명
            </span>
            <button 
              onClick={handleAddCandidate}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              후보자 추가
            </button>
            
            {/* 뷰 모드 변경 */}
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-2 text-sm ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'text-gray-600'} rounded-l-lg`}
              >
                테이블
              </button>
              <button
                onClick={() => setViewMode('card')}
                className={`px-3 py-2 text-sm ${viewMode === 'card' ? 'bg-blue-600 text-white' : 'text-gray-600'} rounded-r-lg`}
              >
                카드
              </button>
            </div>

            {/* 내보내기 */}
            <button className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" />
              내보내기
            </button>
          </div>
        </div>
      </div>

      {/* Content - 테이블/카드 내용 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {filteredCandidates.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-600 mb-2">후보자가 없습니다</h3>
            <p className="text-gray-500">검색 조건을 변경하거나 새 후보자를 추가해보세요.</p>
          </div>
        ) : (
          <>
            {viewMode === 'table' ? renderTableView() : renderCardView()}
          </>
        )}
      </div>
    </div>
  );
};

export default PositionDetailsApplicants;
