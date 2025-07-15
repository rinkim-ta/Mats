import React, { useState } from 'react';
import { Filter, Link, Users, Plus, Trash2, CheckCircle, X, User, Search } from 'lucide-react';

const JobInfoPage = () => {
  const [activeTab, setActiveTab] = useState('process');
  const [isEditing, setIsEditing] = useState(false);
  
  // 모달 상태 관리
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedStages, setSelectedStages] = useState([]);

  // 배정 히스토리 데이터 (실제로는 백엔드에서 관리)
  const [assignmentHistory, setAssignmentHistory] = useState([
    {
      id: 1,
      timestamp: '2024-01-15 09:30:00',
      action: 'assigned', // 'assigned' | 'removed'
      employee: { id: 3, name: '김린' },
      stage: { id: 2, name: '서류 검토' },
      performedBy: '관리자'
    },
    {
      id: 2,
      timestamp: '2024-01-15 10:15:00',
      action: 'assigned',
      employee: { id: 1, name: '김개발' },
      stage: { id: 3, name: '과제 전형' },
      performedBy: '관리자'
    },
    {
      id: 3,
      timestamp: '2024-01-16 14:20:00',
      action: 'assigned',
      employee: { id: 1, name: '김개발' },
      stage: { id: 4, name: '1차 면접' },
      performedBy: '관리자'
    },
    {
      id: 4,
      timestamp: '2024-01-17 11:45:00',
      action: 'assigned',
      employee: { id: 2, name: '박팀장' },
      stage: { id: 5, name: '2차 면접' },
      performedBy: '관리자'
    },
    {
      id: 5,
      timestamp: '2024-01-18 16:30:00',
      action: 'assigned',
      employee: { id: 3, name: '김린' },
      stage: { id: 7, name: '처우 협의' },
      performedBy: '관리자'
    }
  ]);

  // 전체 직원 데이터 (실제로는 API에서 가져올 데이터)
  const [allEmployees] = useState([
    { id: 1, name: '김개발', role: '시니어 개발자', department: '개발팀', email: 'kim.dev@company.com' },
    { id: 2, name: '박팀장', role: '팀 리더', department: '개발팀', email: 'park.leader@company.com' },
    { id: 3, name: '김린', role: 'Recruiter', department: 'HR팀', email: 'rin.kim@musinsa.com' },
    { id: 4, name: '이프론트', role: 'Frontend Developer', department: '개발팀', email: 'lee.front@company.com' },
    { id: 5, name: '정백엔드', role: 'Backend Developer', department: '개발팀', email: 'jung.back@company.com' },
    { id: 6, name: '최디자인', role: 'UI/UX Designer', department: '디자인팀', email: 'choi.design@company.com' },
    { id: 7, name: '한매니저', role: 'Product Manager', department: '기획팀', email: 'han.pm@company.com' },
    { id: 8, name: '송인사', role: 'HR Manager', department: 'HR팀', email: 'song.hr@company.com' }
  ]);

  // 채용 funnel 데이터 (평가자 정보 추가)
  const [funnelItems, setFunnelItems] = useState([
    { 
      id: 1, 
      name: '총 지원자', 
      isSelected: true, 
      isDefault: true,
      evaluators: [], // 평가자가 필요없는 단계
      hasEvaluators: false
    },
    { 
      id: 2, 
      name: '서류 검토', 
      isSelected: true, 
      isDefault: true,
      evaluators: [3], // 리크루터가 담당
      hasEvaluators: true
    },
    { 
      id: 3, 
      name: '과제 전형', 
      isSelected: true, 
      isDefault: true,
      evaluators: [1], // 시니어 개발자가 담당
      hasEvaluators: true
    },
    { 
      id: 4, 
      name: '1차 면접', 
      isSelected: true, 
      isDefault: true,
      evaluators: [1, 4], // 시니어 개발자 + Frontend Developer
      hasEvaluators: true
    },
    { 
      id: 5, 
      name: '2차 면접', 
      isSelected: true, 
      isDefault: true,
      evaluators: [2], // 팀 리더
      hasEvaluators: true
    },
    { 
      id: 6, 
      name: '3차 면접', 
      isSelected: false, 
      isDefault: true,
      evaluators: [],
      hasEvaluators: true
    },
    { 
      id: 7, 
      name: '처우 협의', 
      isSelected: true, 
      isDefault: true,
      evaluators: [2, 3], // 팀 리더 + 리크루터
      hasEvaluators: true
    },
    { 
      id: 8, 
      name: '최종 합격', 
      isSelected: true, 
      isDefault: true,
      evaluators: [], // 평가자가 필요없는 단계
      hasEvaluators: false
    },
    { 
      id: 9, 
      name: '불합격', 
      isSelected: true, 
      isDefault: true,
      evaluators: [], // 평가자가 필요없는 단계
      hasEvaluators: false
    }
  ]);

  // 연관 포지션 데이터
  const availablePositions = [
    { matsNumber: 'MATS001', title: 'Frontend Engineer (무신사)' },
    { matsNumber: 'MATS002', title: 'Frontend Engineer (코어 플랫폼)' },
    { matsNumber: 'MATS003', title: 'Senior Frontend Engineer (29cm)' },
    { matsNumber: 'MATS005', title: 'Backend Engineer (무신사)' },
    { matsNumber: 'MATS006', title: 'DevOps Engineer' },
    { matsNumber: 'MATS007', title: 'Product Manager' }
  ];

  const [relatedPositions, setRelatedPositions] = useState([
    { matsNumber: 'MATS001', title: 'Frontend Engineer (무신사)' },
    { matsNumber: 'MATS002', title: 'Frontend Engineer (코어 플랫폼)' },
    { matsNumber: 'MATS003', title: 'Senior Frontend Engineer (29cm)' }
  ]);

  // 탭 메뉴 (채용단계 구성 탭 제거)
  const tabs = [
    { id: 'process', label: '채용 프로세스 관리', icon: Filter },
    { id: 'related', label: '연관 포지션', icon: Link }
  ];

  // 모달 관련 함수들
  const openAssignModal = () => {
    setIsAssignModalOpen(true);
    setSearchTerm('');
    setSelectedEmployee(null);
    setSelectedStages([]);
  };

  const closeAssignModal = () => {
    setIsAssignModalOpen(false);
    setSearchTerm('');
    setSelectedEmployee(null);
    setSelectedStages([]);
  };

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    // 해당 직원이 이미 배정된 단계들을 자동으로 체크
    const assignedStages = funnelItems
      .filter(item => item.hasEvaluators && item.evaluators.includes(employee.id))
      .map(item => item.id);
    setSelectedStages(assignedStages);
  };

  const toggleStageSelection = (stageId) => {
    setSelectedStages(prev => 
      prev.includes(stageId) 
        ? prev.filter(id => id !== stageId)
        : [...prev, stageId]
    );
  };

  const assignEmployeeToStages = () => {
    if (!selectedEmployee) return;

    const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const newHistoryEntries = [];

    setFunnelItems(items => 
      items.map(item => {
        if (!item.hasEvaluators) return item;
        
        const wasAssigned = item.evaluators.includes(selectedEmployee.id);
        const shouldBeAssigned = selectedStages.includes(item.id);
        
        if (wasAssigned && !shouldBeAssigned) {
          // 제거 기록
          newHistoryEntries.push({
            id: Date.now() + Math.random(),
            timestamp: currentTime,
            action: 'removed',
            employee: { id: selectedEmployee.id, name: selectedEmployee.name },
            stage: { id: item.id, name: item.name },
            performedBy: '관리자'
          });
          return { ...item, evaluators: item.evaluators.filter(id => id !== selectedEmployee.id) };
        } else if (!wasAssigned && shouldBeAssigned) {
          // 배정 기록
          newHistoryEntries.push({
            id: Date.now() + Math.random(),
            timestamp: currentTime,
            action: 'assigned',
            employee: { id: selectedEmployee.id, name: selectedEmployee.name },
            stage: { id: item.id, name: item.name },
            performedBy: '관리자'
          });
          return { ...item, evaluators: [...item.evaluators, selectedEmployee.id] };
        }
        
        return item;
      })
    );
    
    // 히스토리에 새 항목들 추가
    if (newHistoryEntries.length > 0) {
      setAssignmentHistory(prev => [...newHistoryEntries, ...prev]);
    }
    
    closeAssignModal();
  };

  const getFilteredEmployeesForModal = () => {
    if (!searchTerm || searchTerm.length < 1) return allEmployees;
    
    return allEmployees.filter(employee => 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getAssignableStages = () => {
    return funnelItems.filter(item => item.hasEvaluators && item.isSelected);
  };

  // 히스토리 관련 함수들
  const openHistoryModal = () => {
    setIsHistoryModalOpen(true);
  };

  const closeHistoryModal = () => {
    setIsHistoryModalOpen(false);
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActionText = (action) => {
    return action === 'assigned' ? '배정됨' : '제거됨';
  };

  const getActionColor = (action) => {
    return action === 'assigned' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50';
  };

  // Funnel 관련 함수들
  const toggleFunnelItem = (id) => {
    setFunnelItems(items => 
      items.map(item => 
        item.id === id ? { ...item, isSelected: !item.isSelected } : item
      )
    );
  };

  const addFunnelItem = () => {
    const newItem = {
      id: Date.now(),
      name: '새 단계',
      isSelected: true,
      isDefault: false,
      evaluators: [],
      hasEvaluators: true
    };
    setFunnelItems(items => [...items, newItem]);
  };

  const removeFunnelItem = (id) => {
    setFunnelItems(items => items.filter(item => item.id !== id));
  };

  const updateFunnelItemName = (id, newName) => {
    setFunnelItems(items => 
      items.map(item => 
        item.id === id ? { ...item, name: newName } : item
      )
    );
  };

  const removeEvaluatorFromStage = (stageId, evaluatorId) => {
    const employee = allEmployees.find(e => e.id === evaluatorId);
    const stage = funnelItems.find(s => s.id === stageId);
    
    if (employee && stage) {
      // 히스토리에 제거 기록 추가
      const newHistoryEntry = {
        id: Date.now(),
        timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
        action: 'removed',
        employee: { id: employee.id, name: employee.name },
        stage: { id: stage.id, name: stage.name },
        performedBy: '관리자'
      };
      setAssignmentHistory(prev => [newHistoryEntry, ...prev]);
    }

    setFunnelItems(items => 
      items.map(item => 
        item.id === stageId 
          ? { ...item, evaluators: item.evaluators.filter(id => id !== evaluatorId) }
          : item
      )
    );
  };

  const getEmployeeName = (id) => {
    const employee = allEmployees.find(e => e.id === id);
    return employee ? employee.name : `직원 ${id}`;
  };

  const getEmployeeInfo = (id) => {
    const employee = allEmployees.find(e => e.id === id);
    return employee ? `${employee.name} (${employee.role})` : `직원 ${id}`;
  };

  // 연관 포지션 함수들
  const addRelatedPosition = () => {
    setRelatedPositions([...relatedPositions, { matsNumber: '', title: '' }]);
  };

  const removeRelatedPosition = (index) => {
    setRelatedPositions(relatedPositions.filter((_, i) => i !== index));
  };

  const updateRelatedPosition = (index, selectedTitle) => {
    const selectedPosition = availablePositions.find(pos => pos.title === selectedTitle);
    if (selectedPosition) {
      const updated = relatedPositions.map((pos, i) => 
        i === index ? selectedPosition : pos
      );
      setRelatedPositions(updated);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b">
        <div className="px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-900">포지션 상세 관리</h1>
          <p className="text-sm text-gray-600 mt-1">Frontend Engineer (29cm)</p>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="bg-white border-b">
        <div className="px-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* 컨텐츠 */}
      <div className="p-6 max-w-6xl mx-auto">
        
        {/* 채용 프로세스 관리 탭 */}
        {activeTab === 'process' && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-blue-600" />
                  채용 프로세스 관리
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  채용 단계를 선택하고 각 단계별 담당자를 검색해서 배정하세요.
                </p>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {isEditing ? '완료' : '편집'}
                </button>
                {isEditing && (
                  <>
                    <button
                      onClick={openAssignModal}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      담당자 배정
                    </button>
                    <button
                      onClick={addFunnelItem}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      단계 추가
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* 선택된 항목 미리보기 */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="text-sm font-medium text-blue-800 mb-2">
                활성화된 단계 ({funnelItems.filter(item => item.isSelected).length}개)
              </h4>
              <div className="flex flex-wrap gap-2">
                {funnelItems
                  .filter(item => item.isSelected)
                  .map((item, index) => (
                    <span key={item.id} className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      <span className="w-4 h-4 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center mr-2">
                        {index + 1}
                      </span>
                      {item.name}
                    </span>
                  ))}
              </div>
            </div>

            {/* Funnel 항목 리스트 */}
            <div className="space-y-4">
              {funnelItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`border rounded-lg p-4 transition-all ${
                    item.isSelected ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    {/* 체크박스 */}
                    <input
                      type="checkbox"
                      checked={item.isSelected}
                      onChange={() => toggleFunnelItem(item.id)}
                      className="w-5 h-5 text-blue-600 rounded mt-2 cursor-pointer"
                    />

                    {/* 순서 번호 */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      item.isSelected ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>

                    {/* 단계 정보 */}
                    <div className="flex-1">
                      {/* 단계명 */}
                      <div className="mb-3">
                        {isEditing && !item.isDefault ? (
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => updateFunnelItemName(item.id, e.target.value)}
                            className="text-lg font-medium p-2 border border-gray-300 rounded w-full"
                          />
                        ) : (
                          <div className="flex items-center">
                            <span className={`text-lg font-medium ${
                              item.isSelected ? 'text-blue-800' : 'text-gray-600'
                            }`}>
                              {item.name}
                            </span>
                            {item.isDefault && (
                              <span className="ml-2 text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded-full">
                                기본
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* 담당자 배정 (평가자가 필요한 단계만) */}
                      {item.hasEvaluators && (
                        <div className="mt-3">
                          <label className="text-sm font-medium text-gray-700 mb-2 block">
                            <Users className="w-4 h-4 inline mr-1" />
                            담당자
                          </label>
                          
                          {/* 담당자 목록과 간단한 추가 버튼 */}
                          <div className="flex flex-wrap gap-2 mb-2">
                            {item.evaluators.map(evaluatorId => (
                              <span key={evaluatorId} className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                {getEmployeeInfo(evaluatorId)}
                                {isEditing && (
                                  <button
                                    onClick={() => removeEvaluatorFromStage(item.id, evaluatorId)}
                                    className="ml-2 text-green-600 hover:text-green-800"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                )}
                              </span>
                            ))}
                            {item.evaluators.length === 0 && (
                              <span className="text-sm text-gray-500">배정된 담당자가 없습니다</span>
                            )}
                          </div>

                          {/* 편집 모드에서 간단한 안내 */}
                          {isEditing && item.isSelected && (
                            <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded border-l-2 border-blue-200">
                              💡 상단의 "담당자 배정" 버튼을 클릭해서 여러 단계에 담당자를 한번에 배정할 수 있습니다
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* 상태 & 삭제 버튼 */}
                    <div className="flex flex-col items-end space-y-2">
                      <div className="text-sm">
                        {item.isSelected ? (
                          <span className="text-blue-600 font-medium">활성화</span>
                        ) : (
                          <span className="text-gray-500">비활성화</span>
                        )}
                      </div>
                      
                      {isEditing && !item.isDefault && (
                        <button
                          onClick={() => removeFunnelItem(item.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                          title="단계 삭제"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 담당자 배정 히스토리 */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-gray-800 flex items-center">
                  📋 담당자 배정 현황
                </h4>
                <button
                  onClick={openHistoryModal}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex items-center"
                >
                  📜 히스토리 보기
                </button>
              </div>
              
              {/* 전체 담당자별 배정 현황 */}
              <div className="space-y-3">
                {allEmployees
                  .filter(employee => 
                    funnelItems.some(stage => stage.evaluators.includes(employee.id))
                  )
                  .map(employee => {
                    const assignedStages = funnelItems.filter(stage => 
                      stage.evaluators.includes(employee.id) && stage.isSelected
                    );
                    
                    return (
                      <div key={employee.id} className="bg-white p-3 rounded border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-600">
                                {employee.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium text-sm text-gray-900">{employee.name}</div>
                              <div className="text-xs text-gray-500">{employee.role} · {employee.department}</div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {assignedStages.length}개 단계 담당
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {assignedStages.map(stage => (
                            <span key={stage.id} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                              {stage.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                
                {/* 배정된 담당자가 없을 때 */}
                {allEmployees.filter(employee => 
                  funnelItems.some(stage => stage.evaluators.includes(employee.id))
                ).length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    <Users className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">아직 배정된 담당자가 없습니다</p>
                    <p className="text-xs text-gray-400 mt-1">편집 모드에서 "담당자 배정" 버튼을 클릭해서 담당자를 배정하세요</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 담당자 배정 히스토리 모달 */}
        {isHistoryModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
              {/* 모달 헤더 */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">담당자 배정 히스토리</h3>
                  <button
                    onClick={closeHistoryModal}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  모든 담당자 배정 및 제거 기록을 시간순으로 확인할 수 있습니다
                </p>
              </div>

              {/* 모달 내용 */}
              <div className="px-6 py-4">
                {assignmentHistory.length > 0 ? (
                  <div className="space-y-3">
                    {assignmentHistory.map((record) => (
                      <div key={record.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        {/* 시간 */}
                        <div className="w-32 text-xs text-gray-500">
                          {formatDateTime(record.timestamp)}
                        </div>
                        
                        {/* 액션 */}
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getActionColor(record.action)}`}>
                          {getActionText(record.action)}
                        </div>
                        
                        {/* 직원 정보 */}
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-blue-600">
                              {record.employee.name.charAt(0)}
                            </span>
                          </div>
                          <span className="font-medium text-sm">{record.employee.name}</span>
                        </div>
                        
                        {/* 화살표 */}
                        <div className="text-gray-400">
                          {record.action === 'assigned' ? '→' : '←'}
                        </div>
                        
                        {/* 단계 정보 */}
                        <div className="flex-1">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                            {record.stage.name}
                          </span>
                        </div>
                        
                        {/* 수행자 */}
                        <div className="text-xs text-gray-500">
                          by {record.performedBy}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <div className="text-4xl mb-4">📜</div>
                    <p>아직 배정 히스토리가 없습니다</p>
                    <p className="text-sm text-gray-400 mt-1">담당자를 배정하면 기록이 여기에 표시됩니다</p>
                  </div>
                )}
              </div>

              {/* 모달 푸터 */}
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
                <button
                  onClick={closeHistoryModal}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 담당자 배정 모달 */}
        {isAssignModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              {/* 모달 헤더 */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">담당자 배정</h3>
                  <button
                    onClick={closeAssignModal}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  담당자를 검색하고 여러 단계에 한번에 배정하세요
                </p>
              </div>

              {/* 모달 내용 */}
              <div className="px-6 py-4">
                {/* 직원 검색 */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Search className="w-4 h-4 inline mr-1" />
                    직원 검색
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="이름, 역할, 부서로 검색..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                    />
                  </div>
                </div>

                {/* 직원 목록 */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">직원 선택</label>
                  <div className="border border-gray-200 rounded-lg max-h-60 overflow-y-auto">
                    {getFilteredEmployeesForModal().map(employee => (
                      <button
                        key={employee.id}
                        onClick={() => handleEmployeeSelect(employee)}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${
                          selectedEmployee?.id === employee.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                        }`}
                      >
                        <div className="font-medium text-sm text-gray-900">{employee.name}</div>
                        <div className="text-xs text-gray-500">{employee.role} · {employee.department}</div>
                        <div className="text-xs text-gray-400 mt-1">{employee.email}</div>
                      </button>
                    ))}
                    {getFilteredEmployeesForModal().length === 0 && (
                      <div className="px-4 py-8 text-center text-gray-500">
                        {searchTerm ? '검색 결과가 없습니다' : '검색어를 입력해주세요'}
                      </div>
                    )}
                  </div>
                </div>

                {/* 단계 선택 */}
                {selectedEmployee && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <strong>{selectedEmployee.name}</strong>이(가) 담당할 단계를 선택하세요
                    </label>
                    <div className="space-y-2 border border-gray-200 rounded-lg p-4">
                      {getAssignableStages().map(stage => (
                        <label key={stage.id} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                          <input
                            type="checkbox"
                            checked={selectedStages.includes(stage.id)}
                            onChange={() => toggleStageSelection(stage.id)}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <div className="flex-1">
                            <span className="font-medium text-sm">{stage.name}</span>
                            {stage.evaluators.includes(selectedEmployee.id) && (
                              <span className="ml-2 text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                                현재 배정됨
                              </span>
                            )}
                          </div>
                        </label>
                      ))}
                      {getAssignableStages().length === 0 && (
                        <div className="text-center text-gray-500 py-4">
                          배정 가능한 활성화된 단계가 없습니다
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* 모달 푸터 */}
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={closeAssignModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  취소
                </button>
                <button
                  onClick={assignEmployeeToStages}
                  disabled={!selectedEmployee || selectedStages.length === 0}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  배정하기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 연관 포지션 탭 */}
        {activeTab === 'related' && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">연관 포지션 관리</h3>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {isEditing ? '완료' : '편집'}
                </button>
                {isEditing && (
                  <button
                    onClick={addRelatedPosition}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    추가
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {relatedPositions.map((position, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">포지션명</label>
                      {isEditing ? (
                        <select
                          value={position.title}
                          onChange={(e) => updateRelatedPosition(index, e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded text-sm"
                        >
                          <option value="">포지션을 선택하세요</option>
                          {availablePositions.map(pos => (
                            <option key={pos.matsNumber} value={pos.title}>
                              {pos.title}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={position.title}
                          disabled
                          className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-100"
                        />
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">MATS 번호</label>
                      <input
                        type="text"
                        value={position.matsNumber}
                        disabled
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-100"
                      />
                    </div>
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => removeRelatedPosition(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default JobInfoPage;
