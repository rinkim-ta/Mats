import React, { useState } from 'react';
import { Search, ChevronUp, ChevronDown } from 'lucide-react';

const Positions = ({ onBack, onRowClick }) => {  // ← onRowClick 추가
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // 정렬 함수
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // 정렬 아이콘 렌더링
  const renderSortIcon = (columnKey) => {
    if (sortConfig.key === columnKey) {
      return sortConfig.direction === 'asc' ? 
        <ChevronUp className="w-4 h-4" /> : 
        <ChevronDown className="w-4 h-4" />;
    }
    return (
      <div className="flex flex-col">
        <ChevronUp className="w-3 h-3 text-gray-300" />
        <ChevronDown className="w-3 h-3 text-gray-300 -mt-1" />
      </div>
    );
  };

  // 헤더 컬럼 정의
  const columns = [
    { key: 'jrNo', label: 'JR No.', width: 'w-32' },
    { key: 'status', label: 'Status', width: 'w-24' },
    { key: 'recruiter', label: 'Recruiter', width: 'w-28' },
    { key: 'rc', label: 'RC', width: 'w-24' },
    { key: 'hm', label: 'HM', width: 'w-24' },
    { key: 'requestReason', label: '요청 사유', width: 'w-32' },
    { key: 'recruitStartDate', label: '채용 시작일', width: 'w-28' },
    { key: 'level', label: '레벨', width: 'w-20' },
    { key: 'employmentType', label: '고용 형태', width: 'w-24' },
    { key: 'positionName', label: '포지션명', width: 'w-40' },
    { key: 'resigneeName', label: '퇴사자명', width: 'w-28' },
    { key: 'hirerName', label: '입사자명', width: 'w-28' },
    { key: 'requestDivision', label: '요청 부문', width: 'w-28' },
    { key: 'requestHq', label: '요청 본부', width: 'w-28' },
    { key: 'requestOffice', label: '요청 실', width: 'w-24' },
    { key: 'requestTeam', label: '요청 팀', width: 'w-24' },
    { key: 'requestPart', label: '요청 파트', width: 'w-24' },
    { key: 'progress', label: '경과', width: 'w-20' },
    { key: 'greetingId', label: '그리팅 공고 ID', width: 'w-32' },
    { key: 'greetingUrl', label: '그리팅 공고 URL', width: 'w-40' },
    { key: 'jobTitle', label: '공고명', width: 'w-40' },
    { key: 'positionStartDate', label: '포지션 시작일', width: 'w-32' },
    { key: 'totalApplicants', label: '전체 지원자', width: 'w-28' },
    { key: 'passed', label: '합격', width: 'w-20' },
    { key: 'failed', label: '불합격', width: 'w-20' },
    { key: 'documentReview', label: '서류 검토', width: 'w-24' },
    { key: 'firstInterview', label: '1차 면접', width: 'w-24' },
    { key: 'secondInterview', label: '2차 면접', width: 'w-24' },
    { key: 'jobOffer', label: '입사 제안', width: 'w-24' }
  ];

  // 샘플 데이터
  const sampleData = [
    {
      jrNo: 'JR0000001111',
      status: '모집중',
      recruiter: '김린',
      rc: '박RC',
      hm: '이HM',
      requestReason: '신규 포지션',
      recruitStartDate: '2025-06-01',
      level: 'L4',
      employmentType: '정규직',
      positionName: '프론트엔드 개발자',
      resigneeName: '-',
      hirerName: '-',
      requestDivision: '개발부문',
      requestHq: '기술본부',
      requestOffice: '개발실',
      requestTeam: 'FE팀',
      requestPart: 'React파트',
      progress: '15일',
      greetingId: 'GR001',
      greetingUrl: 'https://greeting.com/job/001',
      jobTitle: '프론트엔드 개발자 모집',
      positionStartDate: '2025-07-01',
      totalApplicants: 23,
      passed: 2,
      failed: 3,
      documentReview: 8,
      firstInterview: 6,
      secondInterview: 4,
      jobOffer: 0
    },
    {
      jrNo: 'JR0000002222',
      status: '마감',
      recruiter: '박리크루터',
      rc: '최RC',
      hm: '김HM',
      requestReason: '대체 인력',
      recruitStartDate: '2025-05-15',
      level: 'L5',
      employmentType: '정규직',
      positionName: '백엔드 개발자',
      resigneeName: '홍길동',
      hirerName: '신입사',
      requestDivision: '개발부문',
      requestHq: '기술본부',
      requestOffice: '개발실',
      requestTeam: 'BE팀',
      requestPart: 'API파트',
      progress: '45일',
      greetingId: 'GR002',
      greetingUrl: 'https://greeting.com/job/002',
      jobTitle: '백엔드 개발자 채용',
      positionStartDate: '2025-06-15',
      totalApplicants: 18,
      passed: 1,
      failed: 12,
      documentReview: 2,
      firstInterview: 2,
      secondInterview: 1,
      jobOffer: 1
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={onBack} className="text-gray-600 hover:text-gray-900">
                ← Home
              </button>
              <h1 className="text-xl font-semibold text-gray-900">포지션 관리</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-full mx-auto px-6 py-8">
        {/* 검색 및 필터 */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input 
                type="text" 
                placeholder="전체 검색..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg" 
              />
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-lg">
              <option>전체</option>
              <option>JR No.</option>
              <option>Status</option>
              <option>Recruiter</option>
              <option>RC</option>
              <option>HM</option>
              <option>요청 사유</option>
              <option>채용 시작일</option>
              <option>레벨</option>
              <option>고용 형태</option>
              <option>포지션명</option>
              <option>퇴사자명</option>
              <option>입사자명</option>
              <option>요청 부문</option>
              <option>요청 본부</option>
              <option>요청 실</option>
              <option>요청 팀</option>
              <option>요청 파트</option>
              <option>경과</option>
              <option>그리팅 공고 ID</option>
              <option>그리팅 공고 URL</option>
              <option>공고명</option>
              <option>포지션 시작일</option>
              <option>전체 지원자</option>
              <option>합격</option>
              <option>불합격</option>
              <option>서류 검토</option>
              <option>1차 면접</option>
              <option>2차 면접</option>
              <option>입사 제안</option>
            </select>
          </div>
        </div>

        {/* 포지션 목록 테이블 */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">포지션 목록</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">총 {sampleData.length}개</span>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                  필터
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                  내보내기
                </button>
              </div>
            </div>
          </div>
          
          {/* 테이블 */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((column) => (
                    <th key={column.key} className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.width}`}>
                      <button
                        onClick={() => handleSort(column.key)}
                        className="flex items-center justify-between w-full group hover:bg-gray-100 px-2 py-1 rounded transition-colors"
                      >
                        <span className="truncate">{column.label}</span>
                        <div className="ml-2 flex-shrink-0">
                          {renderSortIcon(column.key)}
                        </div>
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sampleData.map((item, index) => (
                  <tr 
                    key={index} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => onRowClick && onRowClick(item.jrNo)}
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                        {item.jrNo}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        item.status === '모집중' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.recruiter}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.rc}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.hm}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.requestReason}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{item.recruitStartDate}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.level}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.employmentType}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.positionName}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.resigneeName}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.hirerName}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.requestDivision}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.requestHq}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.requestOffice}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.requestTeam}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.requestPart}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.progress}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.greetingId}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-blue-600 truncate max-w-40">
                      <a 
                        href={item.greetingUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {item.greetingUrl}
                      </a>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.jobTitle}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{item.positionStartDate}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{item.totalApplicants}명</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-green-600 font-medium">{item.passed}명</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-red-600 font-medium">{item.failed}명</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">{item.documentReview}명</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-purple-600 font-medium">{item.firstInterview}명</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-orange-600 font-medium">{item.secondInterview}명</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-green-600 font-medium">{item.jobOffer}명</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>  
    </div>   
  );
};

export default Positions;