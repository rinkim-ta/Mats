import React, { useState } from 'react';
import { ArrowLeft, FileText, Edit, Copy, Eye, Save, History, CheckCircle, AlertCircle, Upload, Download, MessageSquare, X, Settings, Plus, Minus } from 'lucide-react';

// JD 섹션 컴포넌트
const JDSection = ({ title, content, isEditable, isTemplate, onEdit, onTemplateSelect, availableTemplates = [] }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const handleEdit = () => {
    setIsEditing(true);
    setEditContent(content);
  };

  const handleSave = () => {
    setIsEditing(false);
    onEdit && onEdit(editContent);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditContent(content);
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    if (onTemplateSelect) {
      const templateContent = availableTemplates.find(t => t.name === template)?.content || '';
      setEditContent(templateContent);
      onTemplateSelect(template, templateContent);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-md font-semibold text-gray-800">{title}</h4>
        <div className="flex items-center space-x-2">
          {isTemplate && availableTemplates.length > 0 && (
            <select
              value={selectedTemplate}
              onChange={(e) => handleTemplateSelect(e.target.value)}
              className="text-xs border border-gray-300 rounded px-2 py-1"
            >
              <option value="">템플릿 선택</option>
              {availableTemplates.map((template, index) => (
                <option key={index} value={template.name}>{template.name}</option>
              ))}
            </select>
          )}
          {isEditable && !isEditing && (
            <button
              onClick={handleEdit}
              className="flex items-center px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded"
            >
              <Edit className="w-3 h-3 mr-1" />
              편집
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={`${title} 내용을 입력하세요...`}
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleCancel}
              className="px-3 py-1 text-xs border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              저장
            </button>
          </div>
        </div>
      ) : (
        <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
          {content || `${title} 내용이 없습니다. ${isTemplate ? '템플릿을 선택하거나' : ''} 편집 버튼을 클릭해 추가하세요.`}
        </div>
      )}
    </div>
  );
};

// 메인 컴포넌트
const JobDescriptionPage = ({ onBack, positionData, jrNo }) => {
  const [selectedSimilarJob, setSelectedSimilarJob] = useState('');
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [activeSection, setActiveSection] = useState('jd');

  // JD 섹션들의 상태
  const [jdSections, setJdSections] = useState({
    // 템플릿 섹션
    musinsaTechIntro: '',
    musinsaTechWay: '',
    company29cmIntro: '',
    applicationDocs: '',
    workConditions: '',
    recruitmentProcess: '',
    benefits: '',
    additionalInfo: '',
    
    // 비슷한 JD 참고하기 섹션
    teamIntro: '',
    mainTasks: '',
    requirements: '',
    techStack: '',
    preferredQualifications: ''
  });

  // 전달받은 포지션 데이터를 기반으로 Job 데이터 구성
  const jobData = {
    jobName: positionData?.jobName || 'Frontend Engineer (29cm)',
    department: positionData?.department || '29cm',
    matsNumber: jrNo || 'MATS004',
    similarPositions: [
      'Frontend Engineer (무신사)',
      'Frontend Engineer (코어 플랫폼)',
      'Frontend Engineer (글로벌)'
    ]
  };

  // 템플릿 데이터
  const templates = {
    musinsaTechIntro: [
      {
        name: '무신사 테크 표준',
        content: '무신사 테크 조직은 혁신의 원동력이자, 가장 먼저 변화를 이끌어 낼 핵심 기술 조직입니다. 고객과 입점 브랜드 모두가 고유한 개성을 마음껏 표현할 수 있도록 데이터와 기술을 바탕으로 개인화된 경험을 제공합니다. 무신사 테크 조직은 항상 새로운 영역에서의 성공을 꿈꾸며 도전하는 것을 두려워하지 않습니다. 무신사와 함께 한국을 넘어 글로벌 무대에서 경쟁력 있는 서비스를 만들어갈 인재를 찾고 있습니다.'
      }
    ],
    musinsaTechWay: [
      {
        name: '무신사 테크 방식',
        content: `고객의 경험을 최우선합니다.
고객의 니즈를 이해하고, 그들의 경험을 개선하기 위해 노력합니다. 사용자가 직면하는 문제를 해결하고 사용성을 향상시키는 것이 핵심 목표입니다.

비즈니스 임팩트를 지향합니다.
비즈니스 요구사항을 이해하고 이를 기술적으로 해결하는 것에 집중합니다. 새로운 기술을 도입하는 것도 중요하지만, 기존 시스템의 안정성과 성능을 유지하면서 비즈니스 목표를 달성하는 데 집중합니다.

새로운 제안은 되도록 먼저 시도하고 회고합니다.
새로운 아이디어나 기술적인 변화를 빠르게 테스트하고, 실험을 통해 효과를 검증합니다. 실패를 두려워하지 않고, 실패로부터 배우며 지속적으로 성장합니다.

서로 간의 신뢰 기반으로 자유롭게 결정합니다.
팀 내에서 서로를 신뢰하고, 각자의 역할과 책임을 인정하며 일합니다. 문제가 발생했을 때는 개방적으로 의견을 나누고 해결책을 찾아냅니다.

업무 효율성을 추구합니다.
업무 효율성을 높이기 위해 지속적으로 개선하고, 효율적인 도구나 프로세스를 도입합니다. 효율적인 개발 방법을 고민하며, 코드의 품질과 유지보수성을 고려하여 작업합니다.`
      }
    ],
    company29cmIntro: [
      {
        name: '29CM 소개 표준',
        content: '29CM는 고객의 라이프스타일에 어울리는 최적의 상품들을 발견하고 소개하는 온/오프라인 셀렉트샵입니다. 2011년, \'고객의 더 나은 선택을 돕는다\'라는 미션으로부터 출발한 후, 2024년 거래액 1조를 돌파했으며, 매년 두 자릿수의 성장율을 지속하며 고속 성장 중입니다. 더 많고 더 저렴한 상품을 추구하는 다른 기업들과 달리 우리는 29CM만의 방식이 담긴 콘텐츠를 선보이며 브랜드와 고객 모두에게 대체 불가능한 커머스 플랫폼을 만들어가고 있습니다.'
      }
    ],
    applicationDocs: [
      {
        name: '표준 지원서류',
        content: `이력서/ 포트폴리오(선택)
(참고) 이력서/포트폴리오 작성팁
이력서/포트폴리오에는 왜 해당 문제를 해결해야 했는지, 어떤 전략을 세웠는지, 어떤 성과가 있었는지 등에 대한 문제 정의, 문제 해결, 성과에 대한 전반적인 내용을 담아주세요. 프로젝트의 성공과 실패를 떠나, 1차 면접에서 인터뷰어와 심도있는 이야기를 나눌 수 있도록 프로젝트의 이해도가 높은 이력서로 구성해주세요. (프로젝트별 기여도 표시)`
      }
    ],
    workConditions: [
      {
        name: '정규직 표준',
        content: '정규직'
      }
    ],
    recruitmentProcess: [
      {
        name: '기술직 표준',
        content: `접수 기간 : 상시지원
전형 절차 : 서류 전형 - 과제전형 - 1차 인터뷰 (기술 인터뷰) - 2차 인터뷰 - 처우 협의 - 최종합격
문의사항 : recruit@musinsa.com`
      }
    ],
    benefits: [
      {
        name: '무신사 표준 복지',
        content: `<근무환경>
선택적 근로시간제 적용 (월 소정 근로시간 내 유연근무, 코어타임: 11-16시)
자율 복장 근무 (슬리퍼부터 정장까지 자유롭게 입는 문화)
직급 없이 '님'으로 소통

<사내지원>
업무에 필요한 모든 물품(MRO) 지원, 최고급 사양의 업무장비 및 허먼밀러 의자 지원
사내 식당 '모락모락'(조식/중식/석식/To-go Bag) 운영
사내카페 '아즈니섬' 운영 (임직원 55%할인)
사내 건강관리실 'CLINIC' 운영 (휴식, 기본 의약품 제공, 인바디/혈압 측정 지원)

<생활지원>
연 350만 복지 포인트 지급 : 복지카드와 연동하여 온/오프라인에서 자유롭게 사용 가능합니다.
임직원의 결혼자금, 주택자금, 의료비에 한해 사내 대출 지원 및 은행 금리 지원
자녀의 초등학교 입학 시 50만원 축하금 지원, 대학등록금 학기마다 150만원 지원
경조휴가 및 경조금 지원

<스토어 혜택>
쇼핑 지원금: 매월 10만원 지원
생일 축하 지원금: 해당 월 20만원 지원
매월 할인 쿠폰 지원 (무신사 최대 40% 상품 쿠폰 7장, 29CM 20% 장바구니 쿠폰 5장)

<건강/휴식>
연 1회 건강검진, 연 10회 심리상담 지원
휴가는 1일(8시간), 0.5일(4시간), 0.25일(2시간)으로 유연하게 사용 가능
단체 상해보험 지원(본인/배우자/자녀)
장기 근속 년수에 따라 추가 리프레쉬 휴가 및 휴가비(복지포인트) 제공`
      }
    ],
    additionalInfo: [
      {
        name: '표준 기타사항',
        content: `본 채용은 수시 진행으로 우수 인재 채용 시 마감될 수 있습니다.
최종 합격자는 3개월간의 수습기간이 적용되며, 해당 기간 중 급여는 100% 지급됩니다.
입사지원 서류에 허위사실이 발견될 경우, 채용확정 이후라도 채용이 취소될 수 있습니다.`
      }
    ]
  };

  // 비슷한 JD 데이터 (무신사 29CM 실제 데이터)
  const similarJDData = {
    teamIntro: '29CM 엔지니어링 조직에는 3개의 프론트엔드 팀이 구성되어있습니다. Customer Engagement Frontend Team(검색, 추천, 회원, 컨텐츠 등), Commerce Core Frontend Team(주문, 결제, 배송, 쿠폰, 정산 등)과 Frontend Platform Team(프론트엔드 전반적인 기술 지원)으로 도메인을 나누어 각 영역에 전문 지식을 가지고 개발을 진행합니다.\n프론트엔드의 모든 구성원은 고객이 29CM에서 즐거운 쇼핑 경험을 누릴 수 있도록 기술 혁신과 빠른 도전을 이어가며, 29CM의 가치를 고객에게 안정적이고 정확하게 전달하는 데 집중하고 있습니다.',
    mainTasks: `고객 경험을 우선으로 한 검색, 추천, 콘텐츠, 주문 및 결제, 정산, 배송, 선물하기 등의 서비스 구현
웹, 모바일웹, 웹뷰 영역의 고객 경험을 극대화 할 수 있는 인터페이스 구현
프로덕트, 디자인, UI/UX, 백엔드 팀과의 긴밀한 협업
성능지표를 중심으로 한 어플리케이션 향상 및 개선
대량의 트래픽을 처리할 수 있는 시스템 설계 및 지속적인 모니터링
최신 프론트엔드 기술 스택을 활용하여 효율적인 개발 환경 구축
동료 개발자와 함께 가치있는 개발자의 역량을 키울 수 있는 리딩 및 멘토링`,
    requirements: `7년 이상의 프론트엔드 개발 경험이 있으신 분 혹은 그에 준하는 역량을 갖춘 분
프론트엔드 생태계에 대한 깊은 이해와 팀에 적합한 기술 스택 또는 도구를 선택할 수 있는 능력을 가진 분
비즈니스 목표를 달성하기 위해 노력하는 엔지니어로서 문제 해결에 열정적인 분
React, Vue.js, Angular 등을 이용한 SPA 개발 경험이 있는 분
Next.js, Nuxt 등을 이용한 SSR 개발 경험이 있는 분
읽기 쉽고 효율적인 코드를 작성하고자 하는 의지를 가진 분
다양한 직군과의 원활한 커뮤니케이션을 즐기고 협업하는 분`,
    techStack: `코어: React, TypeScript, Next.js
상태 관리: TanStack Query, Zustand
스타일링: TailwindCSS, Emotion
패키지 매니저: PNPM, Yarn Berry
빌드: Webpack, SWC, Babel, Vite
배포: GitHub Actions, Jenkins, ArgoCD`,
    preferredQualifications: `리더쉽을 발휘하여 팀을 리딩하거나 매니징을 하신 경험이 있는 분
웹사이트 성능 측정과 최적화, SEO에 대한 경험이 있는 분
커머스 도메인에 대한 이해도가 높은 분
Backend, DevOps, Database 등의 영역에 대해 깊은 이해가 있거나 경험이 있는 분`
  };

  const versionHistory = [
    { version: 'v1.2', date: '2025-06-10', author: '차지현', changes: '기술 스택 업데이트, 자격요건 수정', isCurrent: true },
    { version: 'v1.1', date: '2025-06-08', author: '차지현', changes: '주요업무 세부사항 추가', isCurrent: false },
    { version: 'v1.0', date: '2025-06-05', author: '차지현', changes: '초기 JD 작성', isCurrent: false }
  ];

  const handleSectionEdit = (sectionKey, content) => {
    setJdSections(prev => ({
      ...prev,
      [sectionKey]: content
    }));
  };

  const handleTemplateSelect = (sectionKey, templateName, content) => {
    setJdSections(prev => ({
      ...prev,
      [sectionKey]: content
    }));
  };

  const handleSlackShare = () => {
    alert('JD가 Slack에 공유되었습니다!');
  };

  const handleVersionSelect = (version) => {
    console.log('버전 선택:', version);
    setShowVersionHistory(false);
  };

  const handleSimilarJobSelect = (jobTitle) => {
    setSelectedSimilarJob(jobTitle);
    // 실제로는 해당 JD 데이터를 불러와서 비슷한 JD 참고하기 섹션에 채움
    if (jobTitle) {
      setJdSections(prev => ({
        ...prev,
        teamIntro: similarJDData.teamIntro,
        mainTasks: similarJDData.mainTasks,
        requirements: similarJDData.requirements,
        techStack: similarJDData.techStack,
        preferredQualifications: similarJDData.preferredQualifications
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              v1.2
            </span>
            <button 
              onClick={() => alert('공고가 등록되었습니다!')}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              공고 등록
            </button>
            <button 
              onClick={handleSlackShare}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Slack 공유
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <nav className="flex space-x-8">
          {[
            { id: 'jd', label: 'JD 편집', icon: FileText },
            { id: 'preview', label: '공고 미리보기', icon: Eye }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
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
        {/* JD 편집 섹션 */}
        {activeSection === 'jd' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* JD 메인 컨텐츠 */}
            <div className="lg:col-span-3 space-y-6">
              {/* JD 헤더 정보 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">문서 정보</h3>
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Download className="w-4 h-4 mr-2" />
                      내보내기
                    </button>
                    <button className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Upload className="w-4 h-4 mr-2" />
                      가져오기
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">최종 수정:</span>
                    <p className="font-medium">2025-06-10</p>
                  </div>
                  <div>
                    <span className="text-gray-600">버전:</span>
                    <p className="font-medium">v1.2</p>
                  </div>
                  <div>
                    <span className="text-gray-600">MATS 번호:</span>
                    <p className="font-medium">{jobData.matsNumber}</p>
                  </div>
                </div>

                {selectedSimilarJob && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Copy className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">
                        {selectedSimilarJob} JD를 참고하여 자동 완성
                      </span>
                    </div>
                    <p className="text-sm text-blue-700 mt-1">
                      기존 JD 템플릿을 기반으로 수정할 수 있습니다.
                    </p>
                  </div>
                )}
              </div>

              {/* JD 섹션들 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Job Description</h3>
                
                {/* 비슷한 JD 참고하기 섹션들 */}
                <div className="space-y-1">
                  <h5 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">비슷한 JD 참고하기 (포지션별 맞춤)</h5>
                  
                  <JDSection
                    title="팀 소개"
                    content={jdSections.teamIntro}
                    isEditable={true}
                    onEdit={(content) => handleSectionEdit('teamIntro', content)}
                  />
                  
                  <JDSection
                    title="주요 업무"
                    content={jdSections.mainTasks}
                    isEditable={true}
                    onEdit={(content) => handleSectionEdit('mainTasks', content)}
                  />
                  
                  <JDSection
                    title="자격 요건"
                    content={jdSections.requirements}
                    isEditable={true}
                    onEdit={(content) => handleSectionEdit('requirements', content)}
                  />
                  
                  <JDSection
                    title="주요 기술 스택 및 도구"
                    content={jdSections.techStack}
                    isEditable={true}
                    onEdit={(content) => handleSectionEdit('techStack', content)}
                  />
                  
                  <JDSection
                    title="우대사항"
                    content={jdSections.preferredQualifications}
                    isEditable={true}
                    onEdit={(content) => handleSectionEdit('preferredQualifications', content)}
                  />
                </div>
              </div>
              
              {/* 액션 버튼 */}
              <div className="flex justify-end space-x-4">
                <button 
                  onClick={() => setShowVersionHistory(true)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  버전 히스토리
                </button>
                <button 
                  onClick={handleSlackShare}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Slack 공유
                </button>
              </div>
            </div>

            {/* 사이드바 */}
            <div className="space-y-6">
              {/* 비슷한 JD 참고하기 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <h4 className="font-semibold text-gray-800 mb-4">비슷한 JD 참고하기</h4>
                <div className="space-y-2">
                  <select 
                    value={selectedSimilarJob}
                    onChange={(e) => handleSimilarJobSelect(e.target.value)}
                    className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="">비슷한 JD 선택</option>
                    {jobData.similarPositions.map((position, index) => (
                      <option key={index} value={position}>{position}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-2">
                    선택하면 팀 소개, 주요 업무, 자격 요건, 기술 스택, 우대사항이 자동으로 채워집니다.
                  </p>
                </div>
              </div>

              {/* 최근 버전 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <h4 className="font-semibold text-gray-800 mb-4">최근 버전</h4>
                <div className="space-y-3">
                  {versionHistory.slice(0, 3).map((version, index) => (
                    <div 
                      key={index} 
                      className={`border-l-2 pl-3 cursor-pointer hover:bg-gray-50 p-2 rounded ${
                        version.isCurrent ? 'border-blue-500 bg-blue-50' : 'border-blue-200'
                      }`}
                      onClick={() => handleVersionSelect(version.version)}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${
                          version.isCurrent ? 'text-blue-800' : 'text-gray-800'
                        }`}>
                          {version.version}
                          {version.isCurrent && <span className="ml-2 text-xs">(현재)</span>}
                        </span>
                        <span className="text-xs text-gray-500">{version.date}</span>
                      </div>
                      <p className="text-xs text-gray-600">{version.author}</p>
                      <p className="text-xs text-gray-500 mt-1">{version.changes}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 유용한 기능 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <h4 className="font-semibold text-gray-800 mb-4">유용한 기능</h4>
                <div className="space-y-2">
                  <button 
                    onClick={() => setShowVersionHistory(true)}
                    className="w-full flex items-center justify-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <History className="w-4 h-4 mr-2" />
                    버전 히스토리
                  </button>
                  <button className="w-full flex items-center justify-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Copy className="w-4 h-4 mr-2" />
                    JD 복사
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 공고 미리보기 섹션 */}
        {activeSection === 'preview' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            {/* 미리보기 헤더 */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">공고 미리보기</h3>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-500">TIPS 투자 누적투자 100억↑</span>
                </div>
              </div>
              
              {/* 회사 정보 */}
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center rounded text-xl font-bold">
                  R
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">(주)멋진회사</h1>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Frontend Engineer (29cm)</h2>
                </div>
              </div>
            </div>

            {/* 공고 내용 */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 메인 콘텐츠 */}
                <div className="lg:col-span-2">
                  {/* 탭 네비게이션 */}
                  <div className="border-b border-gray-200 mb-6">
                    <nav className="flex space-x-8">
                      {[
                        '공고소개',
                        '주요업무', 
                        '자격요건',
                        '우대사항',
                        '채용절차',
                        '기타안내'
                      ].map((tab, index) => (
                        <button
                          key={tab}
                          className={`py-3 px-1 border-b-2 font-medium text-sm ${
                            index === 0 
                              ? 'border-blue-500 text-blue-600' 
                              : 'border-transparent text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* 공고 상세 내용 */}
                  <div className="space-y-8">
                    <section>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">무신사 테크 소개</h3>
                      <div className="text-gray-700 leading-relaxed">
                        {/* 비워둠 */}
                      </div>
                    </section>

                    <section>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">주요업무</h3>
                      <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {jdSections.mainTasks}
                      </div>
                    </section>

                    <section>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">자격요건</h3>
                      <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {jdSections.requirements}
                      </div>
                    </section>

                    <section>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">우대사항</h3>
                      <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {jdSections.preferredQualifications}
                      </div>
                    </section>

                    <section>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">채용절차</h3>
                      <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {/* 비워둠 */}
                      </div>
                    </section>

                    <section>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">기타안내</h3>
                      <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {/* 비워둠 */}
                      </div>
                    </section>

                    {/* 공고 목록 보기 버튼 */}
                    <div className="pt-8 border-t border-gray-200">
                      <button className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
                        ← 공고 목록 보기
                      </button>
                    </div>
                  </div>
                </div>

                {/* 사이드바 */}
                <div className="space-y-6">
                  {/* 기본 정보 */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-600">직급/직책</span>
                        <span className="text-gray-900">사원,대리</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-600">연봉</span>
                        <span className="text-gray-900">협의</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-600">근무지</span>
                        <span className="text-gray-900">서울특별시 강남구</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-600">경력</span>
                        <span className="text-gray-900">경력 무관</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-600">마감일</span>
                        <span className="text-gray-900">2022년 05월 18일</span>
                      </div>
                    </div>

                    {/* 지원 버튼 */}
                    <button className="w-full mt-6 bg-gray-400 text-white py-3 rounded-lg font-medium">
                      마감된 공고
                    </button>

                    {/* 저장 버튼 */}
                    <button className="w-full mt-3 border border-gray-300 text-gray-700 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors">
                      <span>저장</span>
                    </button>
                  </div>

                  {/* 공고 공유 */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-center">
                      <p className="text-gray-700 mb-3">이 공고를 주변에도 알려주세요</p>
                      <button className="w-full text-blue-600 hover:text-blue-800 transition-colors">
                        🔗
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 버전 히스토리 모달 */}
      {showVersionHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">버전 히스토리</h3>
              <button 
                onClick={() => setShowVersionHistory(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-4">
                {versionHistory.map((version, index) => (
                  <div 
                    key={index}
                    className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                      version.isCurrent ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
                    }`}
                    onClick={() => handleVersionSelect(version.version)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className={`text-lg font-semibold ${
                          version.isCurrent ? 'text-blue-700' : 'text-gray-800'
                        }`}>
                          {version.version}
                        </span>
                        {version.isCurrent && (
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            현재 버전
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">{version.date}</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">작성자: {version.author}</div>
                    <div className="text-sm text-gray-700">{version.changes}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end p-6 border-t border-gray-200">
              <button 
                onClick={() => setShowVersionHistory(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDescriptionPage;
export { JDSection };
