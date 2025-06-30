import React, { useState } from 'react';
import { Link, Plus, X, Users, Target, ChevronDown, ChevronUp, Trash2, GripVertical, User, Percent } from 'lucide-react';

const JobInfoPage = ({ onBack, positionData, jrNo, positionStatus, onPositionStatusChange }) => {
  const [activeSection, setActiveSection] = useState('stages');
  const [isEditing, setIsEditing] = useState(false);

  // 전체 포지션 목록 (실제로는 API에서 가져올 데이터)
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

  const [recruitmentStages, setRecruitmentStages] = useState([
    { 
      id: 1, 
      name: '서류 전형', 
      order: 1,
      evaluators: [3], // 리크루터
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
      evaluators: [1], // 시니어 개발자
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
      evaluators: [1, 4], // 시니어 개발자 + 추가 개발자
      evaluationAreas: [
        { name: '기술 역량', weight: 40, description: '프론트엔드 전문 지식과 실무 적용 능력' },
        { name: '문제 해결 능력', weight: 25, description: '기술적 문제 상황에서의 사고 과정' },
        { name: '학습 역량', weight: 20, description: '새로운 기술 습득과 적응 능력' },
        { name: '커뮤니케이션', weight: 15, description: '기술적 내용 전달 및 토론 능력' }
      ]
    },
    { 
      id: 4, 
      name: '2차 인터뷰 (컬처핏)', 
      order: 4,
      evaluators: [2, 5], // 팀 리더 + HR
      evaluationAreas: [
        { name: '고객과 브랜드 중심', weight: 15, description: '고객 가치와 브랜드 철학 이해 및 실천 의지' },
        { name: '오너십', weight: 15, description: '주도적 문제 해결과 책임감' },
        { name: '학습 역량', weight: 15, description: '지속적 성장과 자기계발 의지' },
        { name: '결과 집중', weight: 15, description: '목표 달성과 성과 창출에 대한 집중력' },
        { name: '높은 기준', weight: 15, description: '품질과 완성도에 대한 기준과 추구' },
        { name: '단순화', weight: 12.5, description: '복잡한 문제를 단순하게 해결하는 능력' },
        { name: '경계를 넘는 협업', weight: 12.5, description: '팀/부서 간 협업과 소통 능력' }
      ]
    },
    { 
      id: 5, 
      name: '처우 협의', 
      order: 5,
      evaluators: [2, 3], // 팀 리더 + 리크루터
      evaluationAreas: [
        { name: '조건 협상력', weight: 40, description: '합리적이고 현실적인 조건 제시' },
        { name: '입사 의지', weight: 30, description: '회사와 포지션에 대한 확고한 의지' },
        { name: '상호 이해도', weight: 30, description: '회사 문화와 업무 환경 이해도' }
      ]
    },
    { 
      id: 6, 
      name: '입사 제안', 
      order: 6,
      evaluators: [2], // 팀 리더
      evaluationAreas: [
        { name: '최종 적합성', weight: 100, description: '전체적인 적합성 종합 평가' }
      ]
    }
  ]);

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
    },
    {
      id: 5,
      name: '김인사',
      role: 'HR Manager',
      accessLevel: 'recruiter',
      canViewApplications: true,
      canScheduleInterviews: true,
      canEvaluate: true,
      canViewReports: true
    }
  ]);

  // 연관 포지션 관련 함수들
  const handleAddRelatedPosition = () => {
    if (availablePositions.length > relatedPositions.length) {
      setRelatedPositions([...relatedPositions, { matsNumber: '', title: '' }]);
    }
  };

  const handleRemoveRelatedPosition = (index) => {
    setRelatedPositions(relatedPositions.filter((_, i) => i !== index));
  };

  const handleRelatedPositionChange = (index, selectedTitle) => {
    const selectedPosition = availablePositions.find(pos => pos.title === selectedTitle);
    if (selectedPosition) {
      const updated = relatedPositions.map((pos, i) => 
        i === index ? { matsNumber: selectedPosition.matsNumber, title: selectedPosition.title } : pos
      );
      setRelatedPositions(updated);
    }
  };

  // 채용단계 관련 함수들
  const handleAddStage = () => {
    const newStage = {
      id: Date.now(),
      name: '새 단계',
      order: recruitmentStages.length + 1,
      evaluators: [],
      evaluationAreas: [
        { name: '평가 영역', weight: 100, description: '평가 설명' }
      ]
    };
    setRecruitmentStages([...recruitmentStages, newStage]);
  };

  const handleRemoveStage = (id) => {
    const filtered = recruitmentStages.filter(stage => stage.id !== id);
    // 순서 재정렬
    const reordered = filtered.map((stage, index) => ({ ...stage, order: index + 1 }));
    setRecruitmentStages(reordered);
  };

  const handleStageNameChange = (id, newName) => {
    const updated = recruitmentStages.map(stage => 
      stage.id === id ? { ...stage, name: newName } : stage
    );
    setRecruitmentStages(updated);
  };

  const handleStageEvaluatorChange = (stageId, evaluatorIds) => {
    const updated = recruitmentStages.map(stage => 
      stage.id === stageId ? { ...stage, evaluators: evaluatorIds } : stage
    );
    setRecruitmentStages(updated);
  };

  const handleAddEvaluationArea = (stageId) => {
    const updated = recruitmentStages.map(stage => 
      stage.id === stageId ? {
        ...stage,
        evaluationAreas: [...stage.evaluationAreas, { name: '새 평가 영역', weight: 0, description: '평가 설명' }]
      } : stage
    );
    setRecruitmentStages(updated);
  };

  const handleRemoveEvaluationArea = (stageId, areaIndex) => {
    const updated = recruitmentStages.map(stage => 
      stage.id === stageId ? {
        ...stage,
        evaluationAreas: stage.evaluationAreas.filter((_, index) => index !== areaIndex)
      } : stage
    );
    setRecruitmentStages(updated);
  };

  const handleEvaluationAreaChange = (stageId, areaIndex, field, value) => {
    const updated = recruitmentStages.map(stage => 
      stage.id === stageId ? {
        ...stage,
        evaluationAreas: stage.evaluationAreas.map((area, index) => 
          index === areaIndex ? { ...area, [field]: value } : area
        )
      } : stage
    );
    setRecruitmentStages(updated);
  };

  const moveStage = (id, direction) => {
    const currentIndex = recruitmentStages.findIndex(stage => stage.id === id);
    if (
      (direction === 'up' && currentIndex === 0) || 
      (direction === 'down' && currentIndex === recruitmentStages.length - 1)
    ) {
      return;
    }

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const newStages = [...recruitmentStages];
    [newStages[currentIndex], newStages[newIndex]] = [newStages[newIndex], newStages[currentIndex]];
    // 순서 재정렬
    const reordered = newStages.map((stage, index) => ({ ...stage, order: index + 1 }));
    setRecruitmentStages(reordered);
  };

  // 평가자 관련 함수들
  const handleAddEvaluator = () => {
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

  const handleRemoveEvaluator = (id) => {
    setEvaluators(evaluators.filter(evaluator => evaluator.id !== id));
  };

  const handleEvaluatorChange = (id, field, value) => {
    const updated = evaluators.map(evaluator => 
      evaluator.id === id ? { ...evaluator, [field]: value } : evaluator
    );
    setEvaluators(updated);
  };

  const accessLevelOptions = [
    { value: 'interviewer', label: '인터뷰어' },
    { value: 'hiring_manager', label: '채용 담당자' },
    { value: 'recruiter', label: '리크루터' },
    { value: 'admin', label: '관리자' }
  ];

  const getEvaluatorName = (id) => {
    const evaluator = evaluators.find(e => e.id === id);
    return evaluator ? evaluator.name : `평가자 ${id}`;
  };

  const calculateTotalWeight = (evaluationAreas) => {
    return evaluationAreas.reduce((sum, area) => sum + (parseFloat(area.weight) || 0), 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <nav className="flex space-x-8">
          {[
            { id: 'related', label: '연관 포지션', icon: Link },
            { id: 'stages', label: '채용단계 구성', icon: Target },
            { id: 'evaluators', label: '평가자 구성', icon: Users }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm ${
                activeSection === tab.id
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

      {/* Content */}
      <div className="p-6 max-w-6xl mx-auto">
        {/* 연관 포지션 섹션 */}
        {activeSection === 'related' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">연관 포지션 관리</h3>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {isEditing ? '편집 완료' : '편집'}
                </button>
                {isEditing && (
                  <button
                    onClick={handleAddRelatedPosition}
                    className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    포지션 추가
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
                          onChange={(e) => handleRelatedPositionChange(index, e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded text-sm"
                        >
                          <option value="">포지션을 선택하세요</option>
                          {availablePositions
                            .filter(pos => !relatedPositions.some(rp => rp.matsNumber === pos.matsNumber) || pos.matsNumber === position.matsNumber)
                            .map(pos => (
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
                      onClick={() => handleRemoveRelatedPosition(index)}
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

        {/* 채용단계 구성 섹션 */}
        {activeSection === 'stages' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">채용단계 구성</h3>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {isEditing ? '편집 완료' : '편집'}
                </button>
                {isEditing && (
                  <button
                    onClick={handleAddStage}
                    className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    단계 추가
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {recruitmentStages
                .sort((a, b) => a.order - b.order)
                .map((stage, index) => (
                <div key={stage.id} className="border border-gray-200 rounded-lg p-6">
                  {/* 단계 헤더 */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {stage.order}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      {isEditing ? (
                        <input
                          type="text"
                          value={stage.name}
                          onChange={(e) => handleStageNameChange(stage.id, e.target.value)}
                          className="text-lg font-semibold p-2 border border-gray-300 rounded"
                          placeholder="단계명을 입력하세요"
                        />
                      ) : (
                        <h4 className="text-lg font-semibold text-gray-800">{stage.name}</h4>
                      )}
                    </div>

                    {isEditing && (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => moveStage(stage.id, 'up')}
                          disabled={index === 0}
                          className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => moveStage(stage.id, 'down')}
                          disabled={index === recruitmentStages.length - 1}
                          className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleRemoveStage(stage.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded ml-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* 평가자 선택 */}
                  <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700 mb-3 block">
                      <User className="w-4 h-4 inline mr-2" />
                      평가자
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {stage.evaluators.map(evaluatorId => (
                        <span key={evaluatorId} className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {getEvaluatorName(evaluatorId)}
                          {isEditing && (
                            <button
                              onClick={() => {
                                const newEvaluators = stage.evaluators.filter(id => id !== evaluatorId);
                                handleStageEvaluatorChange(stage.id, newEvaluators);
                              }}
                              className="ml-2 text-blue-600 hover:text-blue-800"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </span>
                      ))}
                      {isEditing && (
                        <select
                          value=""
                          onChange={(e) => {
                            const evaluatorId = parseInt(e.target.value);
                            if (evaluatorId && !stage.evaluators.includes(evaluatorId)) {
                              handleStageEvaluatorChange(stage.id, [...stage.evaluators, evaluatorId]);
                            }
                          }}
                          className="px-3 py-1 border border-gray-300 rounded text-sm"
                        >
                          <option value="">평가자 추가</option>
                          {evaluators
                            .filter(evaluator => !stage.evaluators.includes(evaluator.id))
                            .map(evaluator => (
                              <option key={evaluator.id} value={evaluator.id}>
                                {evaluator.name} ({evaluator.role})
                              </option>
                            ))}
                        </select>
                      )}
                    </div>
                  </div>

                  {/* 평가 영역 */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="text-sm font-medium text-gray-700">
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
                      {isEditing && (
                        <button
                          onClick={() => handleAddEvaluationArea(stage.id)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          <Plus className="w-4 h-4 inline mr-1" />
                          평가 영역 추가
                        </button>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      {stage.evaluationAreas.map((area, areaIndex) => (
                        <div key={areaIndex} className="grid grid-cols-12 gap-3 items-start p-3 bg-gray-50 rounded-lg">
                          <div className="col-span-3">
                            <label className="text-xs text-gray-600">평가 영역</label>
                            {isEditing ? (
                              <input
                                type="text"
                                value={area.name}
                                onChange={(e) => handleEvaluationAreaChange(stage.id, areaIndex, 'name', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded text-sm"
                                placeholder="평가 영역명"
                              />
                            ) : (
                              <div className="font-medium text-sm">{area.name}</div>
                            )}
                          </div>
                          
                          <div className="col-span-2">
                            <label className="text-xs text-gray-600">가중치 (%)</label>
                            {isEditing ? (
                              <input
                                type="number"
                                value={area.weight}
                                onChange={(e) => handleEvaluationAreaChange(stage.id, areaIndex, 'weight', parseFloat(e.target.value) || 0)}
                                className="w-full p-2 border border-gray-300 rounded text-sm"
                                min="0"
                                max="100"
                                step="0.1"
                              />
                            ) : (
                              <div className="text-sm font-medium">{area.weight}%</div>
                            )}
                          </div>
                          
                          <div className="col-span-6">
                            <label className="text-xs text-gray-600">설명</label>
                            {isEditing ? (
                              <textarea
                                value={area.description}
                                onChange={(e) => handleEvaluationAreaChange(stage.id, areaIndex, 'description', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded text-sm resize-none"
                                rows="2"
                                placeholder="평가 영역 설명"
                              />
                            ) : (
                              <div className="text-sm text-gray-600">{area.description}</div>
                            )}
                          </div>
                          
                          {isEditing && (
                            <div className="col-span-1 flex justify-end">
                              <button
                                onClick={() => handleRemoveEvaluationArea(stage.id, areaIndex)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 평가자 구성 섹션 */}
        {activeSection === 'evaluators' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">평가자 구성</h3>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {isEditing ? '편집 완료' : '편집'}
                </button>
                {isEditing && (
                  <button
                    onClick={handleAddEvaluator}
                    className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    평가자 추가
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {evaluators.map((evaluator) => (
                <div key={evaluator.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <label className="text-sm font-medium text-gray-600">이름</label>
                      <input
                        type="text"
                        value={evaluator.name}
                        onChange={(e) => handleEvaluatorChange(evaluator.id, 'name', e.target.value)}
                        disabled={!isEditing}
                        className="w-full p-2 border border-gray-300 rounded text-sm disabled:bg-gray-100"
                        placeholder="김개발"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">역할</label>
                      <input
                        type="text"
                        value={evaluator.role}
                        onChange={(e) => handleEvaluatorChange(evaluator.id, 'role', e.target.value)}
                        disabled={!isEditing}
                        className="w-full p-2 border border-gray-300 rounded text-sm disabled:bg-gray-100"
                        placeholder="시니어 개발자"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">접근 권한</label>
                      <select
                        value={evaluator.accessLevel}
                        onChange={(e) => handleEvaluatorChange(evaluator.id, 'accessLevel', e.target.value)}
                        disabled={!isEditing}
                        className="w-full p-2 border border-gray-300 rounded text-sm disabled:bg-gray-100"
                      >
                        {accessLevelOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
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
                            onChange={(e) => handleEvaluatorChange(evaluator.id, permission.key, e.target.checked)}
                            disabled={!isEditing}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
                          />
                          <span className="text-sm text-gray-700">{permission.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end mt-4 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => handleRemoveEvaluator(evaluator.id)}
                        className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
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
      </div>
    </div>
  );
};

export default JobInfoPage;
