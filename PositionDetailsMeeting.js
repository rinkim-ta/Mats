import React, { useState } from 'react';
import { ArrowLeft, Edit, Save, Copy, FileText, Users, Target, MessageSquare, Plus, ChevronDown, ChevronUp, BookOpen, Building, User, Calendar, Clock, Eye, Download, Share2 } from 'lucide-react';

const KickoffDocumentPage = ({ onBack, positionData, jrNo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedReference, setSelectedReference] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    context: true,
    responsibilities: true,
    interviews: true,
    reference: false
  });

  // 전달받은 포지션 데이터를 기반으로 킥오프 데이터 구성
  const kickoffData = {
    positionTitle: positionData?.jobName || 'Frontend Engineer',
    department: positionData?.department || '29cm',
    hiringManager: '이태우',
    targetLevel: positionData?.jobLevel || 'L4',
    role: 'IC',
    targetCount: 1,
    expectedStartDate: '2025.08.01',
    lastModified: '2025.06.10',
    version: 'v1.0',
    jrNumber: jrNo || 'JR0000001111',
    context: '해당 포지션은 리커머스실의 부족한 리소스를 빠르게 대응할 수 있도록 채용을 진행하고자 합니다.',
    teamMission: '무신사 리커머스개발실의 미션은 누구나 신뢰하고 즐길 수 있는 리커머스(중고, 리셀) 경험을 제공하는 것입니다.',
    responsibilities: [
      '무신사의 리커머스 서비스와 리셀 서비스의 프론트엔드를 안정적으로 개발',
      '고객에게 보다 빠르고 편리한 경험을 제공하기 위한 제품 개발',
      '사업/프로덕트 실을 비롯한 다양한 유관 부서와의 협업 주도'
    ],
    interviewers: [
      {
        name: '한종완',
        role: '협업 리더',
        focusAreas: ['결과 집중', '학습 역량', '높은 기준', '오너십'],
        description: '비즈니스적 임팩트를 고려한 문제 해결 경험, 새로운 기술 습득 및 적용 능력, 코드 품질과 아키텍처 설계 기준',
        interviewType: '기술 면접'
      },
      {
        name: '장서현',
        role: '협업 리더',
        focusAreas: ['고객과 브랜드 중심', '경계를 넘는 협업'],
        description: '고객 경험 최우선 사고, 브랜드 가치 실현 기여, 다양한 부서와의 효과적인 협업 경험',
        interviewType: '문화 적합성'
      }
    ]
  };

  const templates = [
    { id: 'frontend', name: 'Frontend Engineer 템플릿', category: '개발' },
    { id: 'backend', name: 'Backend Engineer 템플릿', category: '개발' },
    { id: 'mobile', name: 'Mobile Developer 템플릿', category: '개발' },
    { id: 'product', name: 'Product Manager 템플릿', category: '기획' },
    { id: 'designer', name: 'UX Designer 템플릿', category: '디자인' }
  ];

  const referenceDocuments = [
    {
      id: 'fe-musinsa',
      title: 'Frontend Engineer (무신사)',
      department: '무신사',
      level: 'L4-L5',
      lastUpdated: '2025.05.15',
      status: 'completed'
    },
    {
      id: 'fe-global',
      title: 'Frontend Engineer (글로벌)',
      department: '글로벌',
      level: 'L4',
      lastUpdated: '2025.04.20',
      status: 'active'
    },
    {
      id: 'fe-platform',
      title: 'Frontend Engineer (코어 플랫폼)',
      department: '플랫폼',
      level: 'L3-L4',
      lastUpdated: '2025.03.10',
      status: 'completed'
    }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('킥오프 문서가 저장되었습니다.');
  };

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    alert(`${templates.find(t => t.id === templateId)?.name} 템플릿이 적용되었습니다.`);
  };

  const Header = () => (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">면접 킥오프 문서</h1>
              <p className="text-gray-600 mt-1">{kickoffData.positionTitle} ({kickoffData.department}) - {kickoffData.jrNumber}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">
              최종 수정: {kickoffData.lastModified} ({kickoffData.version})
            </span>
            <button 
              onClick={() => toggleSection('reference')}
              className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Eye className="w-4 h-4 mr-2" />
              참고 문서
            </button>
            <button className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" />
              PDF 다운로드
            </button>
            {isEditing ? (
              <button 
                onClick={handleSave}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Save className="w-4 h-4 mr-2" />
                저장
              </button>
            ) : (
              <button 
                onClick={handleEdit}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Edit className="w-4 h-4 mr-2" />
                편집
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const ReferencePanel = () => (
    expandedSections.reference && (
      <div className="mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">참고 문서</h3>
            <button 
              onClick={() => toggleSection('reference')}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronUp className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-3">템플릿 선택</h4>
              <div className="space-y-2">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateSelect(template.id)}
                    className={`w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors ${
                      selectedTemplate === template.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <div className="text-left">
                        <div className="font-medium text-gray-800">{template.name}</div>
                        <div className="text-sm text-gray-500">{template.category}</div>
                      </div>
                    </div>
                    <Copy className="w-4 h-4 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-800 mb-3">비슷한 포지션 킥오프 문서</h4>
              <div className="space-y-2">
                {referenceDocuments.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedReference(doc.id)}
                    className={`w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors ${
                      selectedReference === doc.id ? 'border-green-500 bg-green-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <BookOpen className="w-4 h-4 text-gray-500" />
                      <div className="text-left">
                        <div className="font-medium text-gray-800">{doc.title}</div>
                        <div className="text-sm text-gray-500">{doc.department} • {doc.level}</div>
                        <div className="text-xs text-gray-400">{doc.lastUpdated}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        doc.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {doc.status === 'completed' ? '완료' : '진행중'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {(selectedTemplate || selectedReference) && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <Copy className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  {selectedTemplate && `${templates.find(t => t.id === selectedTemplate)?.name} 적용됨`}
                  {selectedReference && `${referenceDocuments.find(d => d.id === selectedReference)?.title} 참고중`}
                </span>
              </div>
              <p className="text-sm text-blue-700 mt-1">
                선택한 문서의 구조와 내용을 참고하여 편집할 수 있습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    )
  );

  const BasicInfoSection = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <User className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">기본 정보</h3>
        </div>
        <button 
          onClick={() => toggleSection('basic')}
          className="p-1 hover:bg-gray-100 rounded"
        >
          {expandedSections.basic ? 
            <ChevronUp className="w-5 h-5 text-gray-500" /> : 
            <ChevronDown className="w-5 h-5 text-gray-500" />
          }
        </button>
      </div>
      
      {expandedSections.basic && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Position Title</label>
            {isEditing ? (
              <input 
                type="text" 
                defaultValue={kickoffData.positionTitle}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="text-gray-800 font-medium">{kickoffData.positionTitle}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">부문</label>
            {isEditing ? (
              <input 
                type="text" 
                defaultValue={kickoffData.department}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="text-gray-800">{kickoffData.department}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">JR 번호</label>
            <p className="text-gray-800 font-medium">{kickoffData.jrNumber}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Hiring Manager</label>
            {isEditing ? (
              <input 
                type="text" 
                defaultValue={kickoffData.hiringManager}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="text-gray-800">{kickoffData.hiringManager}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Target Level</label>
            {isEditing ? (
              <select 
                defaultValue={kickoffData.targetLevel}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="L3">L3</option>
                <option value="L4">L4</option>
                <option value="L5">L5</option>
                <option value="L6">L6</option>
              </select>
            ) : (
              <p className="text-gray-800">{kickoffData.targetLevel}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Manager or IC</label>
            {isEditing ? (
              <select 
                defaultValue={kickoffData.role}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="IC">IC</option>
                <option value="Manager">Manager</option>
              </select>
            ) : (
              <p className="text-gray-800">{kickoffData.role}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">채용 목표 인원</label>
            {isEditing ? (
              <input 
                type="number" 
                defaultValue={kickoffData.targetCount}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="text-gray-800">{kickoffData.targetCount}명</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">입사 희망일</label>
            {isEditing ? (
              <input 
                type="date" 
                defaultValue="2025-08-01"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="text-gray-800">{kickoffData.expectedStartDate}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const ContextSection = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-800">포지션 오픈 맥락</h3>
        </div>
        <button 
          onClick={() => toggleSection('context')}
          className="p-1 hover:bg-gray-100 rounded"
        >
          {expandedSections.context ? 
            <ChevronUp className="w-5 h-5 text-gray-500" /> : 
            <ChevronDown className="w-5 h-5 text-gray-500" />
          }
        </button>
      </div>
      
      {expandedSections.context && (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600 mb-2 block">오픈 배경</label>
            {isEditing ? (
              <textarea 
                defaultValue={kickoffData.context}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg">{kickoffData.context}</p>
            )}
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-600 mb-2 block">팀 미션</label>
            {isEditing ? (
              <textarea 
                defaultValue={kickoffData.teamMission}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="text-gray-700 leading-relaxed bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">{kickoffData.teamMission}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const ResponsibilitiesSection = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Building className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-800">주요 담당 업무</h3>
        </div>
        <div className="flex items-center space-x-2">
          {isEditing && (
            <button className="p-1 text-purple-600 hover:bg-purple-50 rounded">
              <Plus className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={() => toggleSection('responsibilities')}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {expandedSections.responsibilities ? 
              <ChevronUp className="w-5 h-5 text-gray-500" /> : 
              <ChevronDown className="w-5 h-5 text-gray-500" />
            }
          </button>
        </div>
      </div>
      
      {expandedSections.responsibilities && (
        <div className="space-y-3">
          {kickoffData.responsibilities.map((resp, index) => (
            <div key={index} className="flex items-start space-x-3 group">
              <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                {index + 1}
              </div>
              {isEditing ? (
                <textarea 
                  defaultValue={resp}
                  rows={2}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="flex-1 text-gray-700 leading-relaxed">{resp}</p>
              )}
              {isEditing && (
                <button className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:bg-red-50 rounded transition-opacity">
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const InterviewsSection = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-orange-600" />
          <h3 className="text-lg font-semibold text-gray-800">인터뷰에서 검증해야 하는 영역</h3>
        </div>
        <div className="flex items-center space-x-2">
          {isEditing && (
            <button className="p-1 text-orange-600 hover:bg-orange-50 rounded">
              <Plus className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={() => toggleSection('interviews')}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {expandedSections.interviews ? 
              <ChevronUp className="w-5 h-5 text-gray-500" /> : 
              <ChevronDown className="w-5 h-5 text-gray-500" />
            }
          </button>
        </div>
      </div>
      
      {expandedSections.interviews && (
        <div className="space-y-6">
          {kickoffData.interviewers.map((interviewer, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {isEditing ? (
                    <input 
                      type="text" 
                      defaultValue={interviewer.name}
                      className="font-medium text-gray-800 px-2 py-1 border border-gray-300 rounded"
                    />
                  ) : (
                    <h4 className="font-medium text-gray-800">{interviewer.name}</h4>
                  )}
                  <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                    {interviewer.role}
                  </span>
                  <span className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                    {interviewer.interviewType}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">검증 영역</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {interviewer.focusAreas.map((area, areaIndex) => (
                      <span key={areaIndex} className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">세부 설명</label>
                  {isEditing ? (
                    <textarea 
                      defaultValue={interviewer.description}
                      rows={3}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-sm text-gray-700 leading-relaxed mt-1 bg-gray-50 p-3 rounded-lg">
                      {interviewer.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const ActionButtons = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <FileText className="w-4 h-4 mr-2" />
            템플릿으로 저장
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <Clock className="w-4 h-4 mr-2" />
            버전 히스토리
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            <Share2 className="w-4 h-4 mr-2" />
            인터뷰어에게 공유
          </button>
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            <MessageSquare className="w-4 h-4 mr-2" />
            승인 요청
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <ReferencePanel />
        <BasicInfoSection />
        <ContextSection />
        <ResponsibilitiesSection />
        <InterviewsSection />
        <ActionButtons />
      </div>
    </div>
  );
};

export default KickoffDocumentPage;