import React, { useState } from 'react';
import { Filter, Link, Target, Users, Plus, Trash2, CheckCircle, ChevronUp, ChevronDown, X, User, Percent } from 'lucide-react';

const JobInfoPage = () => {
  const [activeTab, setActiveTab] = useState('funnel');
  const [isEditing, setIsEditing] = useState(false);

  // 채용 funnel 데이터
  const [funnelItems, setFunnelItems] = useState([
    { id: 1, name: '총 지원자', isSelected: true, isDefault: true },
    { id: 2, name: '서류 검토', isSelected: true, isDefault: true },
    { id: 3, name: '과제 전형', isSelected: true, isDefault: true },
    { id: 4, name: '1차 면접', isSelected: true, isDefault: true },
    { id: 5, name: '2차 면접', isSelected: true, isDefault: true },
    { id: 6, name: '3차 면접', isSelected: false, isDefault: true },
    { id: 7, name: '처우 협의', isSelected: true, isDefault: true },
    { id: 8, name: '최종 합격', isSelected: true, isDefault: true },
    { id: 9, name: '불합격', isSelected: true, isDefault: true }
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

  // 채용단계 데이터
  const [recruitmentStages, setRecruitmentStages] = useState([
    { 
      id: 1, 
      name: '서류 전형', 
      order: 1,
      evaluators: [3],
      evaluationAreas: [
        { name: '경력 적합성', weight: 30, description: '요구되는 기술 스택과 경험 부합도' },
        { name: '성장 잠재력', weight: 25, description: '학습 능력과 발전 가능성' },
        { name: '프로젝트 경험', weight: 25, description: '관련 프로젝트 수행 경험과 성과' },
        { name: '커뮤니케이션', weight: 20, description: '서류상 표현력과 논리성' }
      ]
    },
    { 
      id: 2, 
      name: '사전 과제', 
      order: 2,
      evaluators: [1],
      evaluationAreas: [
        { name: '코드 품질', weight: 35, description: '코드 구조, 가독성, 유지보수성' },
        { name: '기술 구현력', weight: 30, description: '요구사항 이해 및 기술적 해결 능력' },
        { name: '문제 해결 접근법', weight: 20, description: '문제 분석과 해결 과정의 논리성' },
        { name: '문서화 능력', weight: 15, description: 'README, 주석 등 문서화 품질' }
      ]
    },
    { 
      id: 3, 
      name: '1차 인터뷰', 
      order: 3,
      evaluators: [1, 4],
      evaluationAreas: [
        { name: '기술 역량', weight: 40, description: '프론트엔드 전문 지식과 실무 적용 능력' },
        { name: '문제 해결 능력', weight: 25, description: '기술적 문제 상황에서의 사고 과정' },
        { name: '학습 역량', weight: 20, description: '새로운 기술 습득과 적응 능력' },
        { name: '커뮤니케이션', weight: 15, description: '기술적 내용 전달 및 토론 능력' }
      ]
    }
  ]);

  // 평가자 데이터
  const [evaluators, setEvaluators] = useState([
    {
      id: 1,
      name: '김개발',
      role: '시니어 개발자',
      accessLevel: 'interviewer',
      canViewApplications: true,
      canScheduleInterviews: false,
      canEvaluate: true,
      canViewReports: false
    },
    {
      id: 2,
      name: '박팀장',
      role: '팀 리더',
      accessLevel: 'hiring_manager',
      canViewApplications: true,
      canScheduleInterviews: true,
      canEvaluate: true,
      canViewReports: true
    },
    {
      id: 3,
      name: '차지현',
      role: 'Recruiter',
      accessLevel: 'recruiter',
      canViewApplications: true,
      canScheduleInterviews: true,
      canEvaluate: false,
      canViewReports: true
    },
    {
      id: 4,
      name: '이프론트',
      role: 'Frontend Developer',
      accessLevel: 'interviewer',
      canViewApplications: true,
      canScheduleInterviews: false,
      canEvaluate: true,
      canViewReports: false
    }
  ]);

  // 탭 메뉴
  const tabs = [
    { id: 'funnel', label: '채용 프로세스 관리', icon: Filter },
    { id: 'related', label: '연관 포지션', icon: Link },
    { id: 'stages', label: '채용단계 구성', icon: Target },
    { id: 'evaluators', label: '평가자 구성', icon: Users }
  ];

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
      isDefault: false
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

  // 채용단계 함수들
  const addStage = () => {
    const newStage = {
      id: Date.now(),
      name: '새 단계',
      order: recruitmentStages.length + 1,
      evaluators: [],
      evaluationAreas: [{ name: '평가 영역', weight: 100, description: '평가 설명' }]
    };
    setRecruitmentStages([...recruitmentStages, newStage]);
  };

  const removeStage = (id) => {
    setRecruitmentStages(recruitmentStages.filter(stage => stage.id !== id));
  };

  const updateStageName = (id, newName) => {
    setRecruitmentStages(stages => 
      stages.map(stage => stage.id === id ? { ...stage, name: newName } : stage)
    );
  };

  // 평가자 함수들
  const addEvaluator = () => {
    const newEvaluator = {
      id: Date.now(),
      name: '',
      role: '',
      accessLevel: 'interviewer',
      canViewApplications: true,
      canScheduleInterviews: false,
      canEvaluate: true,
      canViewReports: false
    };
    setEvaluators([...evaluators, newEvaluator]);
  };

  const removeEvaluator = (id) => {
    setEvaluators(evaluators.filter(evaluator => evaluator.id !== id));
  };

  const updateEvaluator = (id, field, value) => {
    setEvaluators(evaluators.map(evaluator => 
      evaluator.id === id ? { ...evaluator, [field]: value } : evaluator
    ));
  };

  const getEvaluatorName = (id) => {
    const evaluator = evaluators.find(e => e.id === id);
    return evaluator ? evaluator.name : `평가자 ${id}`;
  };

  const calculateTotalWeight = (areas) => {
    return areas.reduce((sum, area) => sum + (parseFloat(area.weight) || 0), 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
        {activeTab === 'funnel' && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold">채용 프로세스 관리</h3>
                <p className="text-sm text-gray-600 mt-1">
                  채용 단계를 선택하고 관리하세요. 선택된 항목만 다른 화면에서 표시됩니다.
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
                  <button
                    onClick={addFunnelItem}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    추가
                  </button>
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
            <div className="space-y-3">
              {funnelItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`border rounded-lg p-4 ${
                    item.isSelected ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    {/* 체크박스 */}
                    <input
                      type="checkbox"
                      checked={item.isSelected}
                      onChange={() => toggleFunnelItem(item.id)}
                      className="w-5 h-5 text-blue-600 rounded"
                    />

                    {/* 체크 표시 */}
                    {item.isSelected && (
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    )}

                    {/* 순서 번호 */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      item.isSelected ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>

                    {/* 단계명 */}
                    <div className="flex-1">
                      {isEditing && !item.isDefault ? (
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => updateFunnelItemName(item.id, e.target.value)}
                          className="w-full p-2 border rounded text-sm"
                        />
                      ) : (
                        <span className={`font-medium ${
                          item.isSelected ? 'text-blue-800' : 'text-gray-600'
                        }`}>
                          {item.name}
                          {item.isDefault && (
                            <span className="ml-2 text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded-full">
                              기본
                            </span>
                          )}
                        </span>
                      )}
                    </div>

                    {/* 상태 */}
                    <div className="text-sm">
                      {item.isSelected ? (
                        <span className="text-blue-600 font-medium">활성화</span>
                      ) : (
                        <span className="text-gray-500">비활성화</span>
                      )}
                    </div>

                    {/* 삭제 버튼 */}
                    {isEditing && !item.isDefault && (
                      <button
                        onClick={() => removeFunnelItem(item.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* 도움말 */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">💡 사용 안내</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 체크박스로 단계를 활성화/비활성화할 수 있습니다</li>
                <li>• 활성화된 단계만 채용 현황에서 표시됩니다</li>
                <li>• 편집 모드에서 커스텀 단계를 추가할 수 있습니다</li>
                <li>• 기본 단계는 삭제할 수 없습니다</li>
              </ul>
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

        {/* 채용단계 구성 탭 */}
        {activeTab === 'stages' && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">채용단계 구성</h3>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {isEditing ? '완료' : '편집'}
                </button>
                {isEditing && (
                  <button
                    onClick={addStage}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    추가
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {recruitmentStages.map((stage, index) => (
                <div key={stage.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      {isEditing ? (
                        <input
                          type="text"
                          value={stage.name}
                          onChange={(e) => updateStageName(stage.id, e.target.value)}
                          className="text-lg font-semibold p-2 border border-gray-300 rounded"
                        />
                      ) : (
                        <h4 className="text-lg font-semibold">{stage.name}</h4>
                      )}
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => removeStage(stage.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      <User className="w-4 h-4 inline mr-2" />
                      평가자
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {stage.evaluators.map(evaluatorId => (
                        <span key={evaluatorId} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {getEvaluatorName(evaluatorId)}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      <Percent className="w-4 h-4 inline mr-2" />
                      평가 영역
                      <span className={`ml-2 text-xs px-2 py-1 rounded ${
                        calculateTotalWeight(stage.evaluationAreas) === 100 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        총 {calculateTotalWeight(stage.evaluationAreas)}%
                      </span>
                    </label>
                    <div className="space-y-2">
                      {stage.evaluationAreas.map((area, areaIndex) => (
                        <div key={areaIndex} className="grid grid-cols-12 gap-3 p-3 bg-gray-50 rounded">
                          <div className="col-span-4">
                            <div className="font-medium text-sm">{area.name}</div>
                          </div>
                          <div className="col-span-2">
                            <div className="text-sm font-medium">{area.weight}%</div>
                          </div>
                          <div className="col-span-6">
                            <div className="text-sm text-gray-600">{area.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 평가자 구성 탭 */}
        {activeTab === 'evaluators' && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">평가자 구성</h3>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {isEditing ? '완료' : '편집'}
                </button>
                {isEditing && (
                  <button
                    onClick={addEvaluator}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    추가
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {evaluators.map((evaluator) => (
                <div key={evaluator.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">이름</label>
                      <input
                        type="text"
                        value={evaluator.name}
                        onChange={(e) => updateEvaluator(evaluator.id, 'name', e.target.value)}
                        disabled={!isEditing}
                        className="w-full p-2 border border-gray-300 rounded text-sm disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">역할</label>
                      <input
                        type="text"
                        value={evaluator.role}
                        onChange={(e) => updateEvaluator(evaluator.id, 'role', e.target.value)}
                        disabled={!isEditing}
                        className="w-full p-2 border border-gray-300 rounded text-sm disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">접근 권한</label>
                      <select
                        value={evaluator.accessLevel}
                        onChange={(e) => updateEvaluator(evaluator.id, 'accessLevel', e.target.value)}
                        disabled={!isEditing}
                        className="w-full p-2 border border-gray-300 rounded text-sm disabled:bg-gray-100"
                      >
                        <option value="interviewer">인터뷰어</option>
                        <option value="hiring_manager">채용 담당자</option>
                        <option value="recruiter">리크루터</option>
                        <option value="admin">관리자</option>
                      </select>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium text-gray-800 mb-3">접근 범위</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { key: 'canViewApplications', label: '지원서 열람' },
                        { key: 'canScheduleInterviews', label: '인터뷰 일정' },
                        { key: 'canEvaluate', label: '평가 권한' },
                        { key: 'canViewReports', label: '리포트 열람' }
                      ].map(permission => (
                        <label key={permission.key} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={evaluator[permission.key]}
                            onChange={(e) => updateEvaluator(evaluator.id, permission.key, e.target.checked)}
                            disabled={!isEditing}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="text-sm">{permission.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end mt-4 pt-4 border-t">
                      <button
                        onClick={() => removeEvaluator(evaluator.id)}
                        className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded flex items-center"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 다른 탭들 (플레이스홀더) */}
        {!['funnel', 'related', 'stages', 'evaluators'].includes(activeTab) && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h3>
            <p className="text-gray-600">이 섹션은 곧 구현될 예정입니다.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default JobInfoPage;
