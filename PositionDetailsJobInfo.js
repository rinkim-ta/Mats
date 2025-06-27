const handlePositionStatusChange = (newStatus) => {
    setPositionStatus(newStatus);
    console.log('포지션 상태 변경:', newStatus);
  };

  // 공통 헤더 렌더링 함수
  const renderSharedHeader = (title, subtitle, children = null) => (
    <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-600 mt-1">{subtitle}</p>
        </div>
        <div className="flex items-center space-x-4">
          {children}
          
          {/* 병합 처리 버튼 */}
          <button
            onClick={() => alert('병합 화면을 준비중입니다.')}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            병합 처리
          </button>
          
          {/* 포지션 상태 드롭다운 */}
          <div className="relative">
            <select
              value={positionStatus}
              onChange={(e) => handlePositionStatusChange(e.target.value)}
              className={`text-sm px-3 py-1 rounded-full border-0 cursor-pointer font-medium ${positionStatusOptions[positionStatus].color} appearance-none pr-8`}
            >
              {Object.entries(positionStatusOptions).map(([key, option]) => (
                <option key={key} value={key}>{option.label}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500" />
          </div>
          
          {/* Status 표시 */}
          <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
            Status: Active
          </span>
          
          <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            {jobData.matsNumber.replace('JR', 'MATS')}
          </span>
        </div>
      </div>
    </div>
  );

  const jobData = {
    jobName: 'Frontend Engineer (29cm)',
    department: '29cm',
    jobFamily: 'Frontend Engineer',
    experience: '5년 이상',
    employmentType: '정규직',
    jobLevel: 'L4',
    openDate: '2025.06.10',
    matsNumber: jrNo || 'JR0000001111',
    recruiter: '김린',
    rc: '김린',
    hiringManager: '김태현',
    managingOrganization: '플랫폼본부',
    jobGroup: 'IT/개발',
    position: 'Frontend Engineer (29cm)',
    closeDate: '2025.08.10',
    headcounts: [
      { id: 'JR00000111', status: 'hiring', assignedRecruiter: '김린' },
      { id: 'JR00000112', status: 'completed', assignedRecruiter: '김린' },
      { id: 'JR00000113', status: 'hiring', assignedRecruiter: '차지현' }
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
      finalAccepted: 2
    },
    stageStats: {
      'totalApplications': { count: 47, percent: 100, wow: 92 },
      'documentReview': { count: 32, percent: 68, wow: 85 },
      'preAssignment': { count: 18, percent: 38, wow: 88 },
      'firstInterview': { count: 12, percent: 26, wow: 91 },
      'secondInterview': { count: 8, percent: 17, wow: 94 },
      'thirdInterview': { count: 5, percent: 11, wow: 89 },
      'offerNegotiation': { count: 3, percent: 6, wow: 76 },
      'finalAccepted': { count: 2, percent: 4, wow: 95 }
    },
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
    'finalAccepted': '최종합격'
  };

  const stageColors = {
    'totalApplications': 'bg-blue-500',
    'documentReview': 'bg-indigo-500',
    'preAssignment': 'bg-purple-500',
    'firstInterview': 'bg-orange-500',
    'secondInterview': 'bg-red-500',
    'thirdInterview': 'bg-pink-500',
    'offerNegotiation': 'bg-yellow-500',
    'finalAccepted': 'bg-green-500'
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

  const handleKickoffDocumentBack = () => {
    setActiveSection('overview');
  };

  const handleJDBack = () => {
    setActiveSection('overview');
  };

  const handleJobInfoBack = () => {
    setActiveSection('overview');
  };

  const handleApplicantsBack = () => {
    setActiveSection('overview');
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

  const handleStatsToggle = (statKey) => {
    setSelectedStats(prev => 
      prev.includes(statKey)
        ? prev.filter(key => key !== statKey)
        : [...prev, statKey]
    );
  };

  const handleSelectAllStats = () => {
    setSelectedStats(Object.keys(allStatsOptions));
  };

  const handleDeselectAllStats = () => {
    setSelectedStats([]);
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

  const getStatColor = (colorName) => {
    const colorMap = {
      'blue': 'bg-blue-50 text-blue-600',
      'indigo': 'bg-indigo-50 text-indigo-600',
      'purple': 'bg-purple-50 text-purple-600',
      'orange': 'bg-orange-50 text-orange-600',
      'red': 'bg-red-50 text-red-600',
      'pink': 'bg-pink-50 text-pink-600',
      'yellow': 'bg-yellow-50 text-yellow-600',
      'green': 'bg-green-50 text-green-600'
    };
    return colorMap[colorName] || 'bg-gray-50 text-gray-600';
  };

  const getDaysFromOpen = () => {
    const openDate = new Date(jobData.openDate.replace(/\./g, '-'));
    const today = new Date();
    const diffTime = today - openDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const renderOverviewContent = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              <label className="text-sm font-medium text-gray-600">Recruiter</label>
              <p className="text-gray-800">{jobData.recruiter}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">RC</label>
              <p className="text-gray-800">{jobData.rc}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">HM</label>
              <p className="text-gray-800">{jobData.hiringManager}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">관할 조직</label>
              <p className="text-gray-800">{jobData.managingOrganization}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">직무군</label>
              <p className="text-gray-800">{jobData.jobGroup}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">포지션</label>
              <p className="text-gray-800 font-medium">{jobData.position}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">레벨</label>
              <p className="text-gray-800">{jobData.jobLevel}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">부문</label>
              <p className="text-gray-800">{jobData.department}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">포지션 오픈일</label>
              <p className="text-gray-800">{jobData.openDate}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">포지션 마감일</label>
              <p className="text-gray-800">{jobData.closeDate}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">채용 통계</h3>
            </div>
            <button
              onClick={() => setShowStatsSettings(!showStatsSettings)}
              className="px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center"
              title="통계 설정"
            >
              <Settings className="w-4 h-4 mr-1" />
              설정
            </button>
          </div>
          
          {showStatsSettings && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-800">표시할 통계 선택</h4>
                <div className="flex space-x-2">
                  <button
                    onClick={handleSelectAllStats}
                    className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                  >
                    전체 선택
                  </button>
                  <button
                    onClick={handleDeselectAllStats}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                  >
                    전체 해제
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(allStatsOptions).map(([key, option]) => (
                  <label key={key} className="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-white transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedStats.includes(key)}
                      onChange={() => handleStatsToggle(key)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                    <span className="text-xs text-gray-500">({jobData.stats[key] || 0})</span>
                  </label>
                ))}
              </div>
              <div className="mt-3 text-xs text-gray-500">
                선택된 항목: {selectedStats.length}개
              </div>
            </div>
          )}

          {selectedStats.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <BarChart3 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>표시할 통계를 선택해주세요.</p>
              <button
                onClick={() => setShowStatsSettings(true)}
                className="mt-2 text-blue-600 hover:text-blue-800 underline"
              >
                설정하기
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3 mb-6">
              {selectedStats.map((statKey) => {
                const option = allStatsOptions[statKey];
                const value = jobData.stats[statKey] || 0;
                return (
                  <div key={statKey} className={`text-center p-3 rounded-lg ${getStatColor(option.color)}`}>
                    <div className="text-xl font-bold">{value}</div>
                    <div className="text-xs text-gray-600">{option.label}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Users className="w-5 h-5 mr-2 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">채용 현황</h3>
          </div>
          <button
            onClick={() => setShowStatusSettings(!showStatusSettings)}
            className="px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center"
            title="현황 설정"
          >
            <Settings className="w-4 h-4 mr-1" />
            설정
          </button>
        </div>

        {showStatusSettings && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-800">표시할 현황 선택</h4>
              <div className="flex space-x-2">
                <button
                  onClick={handleSelectAllStatus}
                  className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                >
                  전체 선택
                </button>
                <button
                  onClick={handleDeselectAllStatus}
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  전체 해제
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(allStatsOptions).map(([key, option]) => (
                <label key={key} className="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-white transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedStatusItems.includes(key)}
                    onChange={() => handleStatusToggle(key)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                  <span className="text-xs text-gray-500">({jobData.stageStats[key]?.count || 0})</span>
                </label>
              ))}
            </div>
            <div className="mt-3 text-xs text-gray-500">
              선택된 항목: {selectedStatusItems.length}개
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="font-medium text-gray-800 mb-4">단계별 현황</h4>
            {selectedStatusItems.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>표시할 현황을 선택해주세요.</p>
                <button
                  onClick={() => setShowStatusSettings(true)}
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
                  {jobData.recruitmentStatus === 'warning' && (
                    <div>
                      <div className="text-lg font-semibold text-yellow-600 mb-2">주의 필요</div>
                      <div className="text-sm text-gray-600">일부 단계에서 지연이 발생하고 있습니다</div>
                    </div>
                  )}
                  {jobData.recruitmentStatus === 'danger' && (
                    <div>
                      <div className="text-lg font-semibold text-red-600 mb-2">긴급 조치 필요</div>
                      <div className="text-sm text-gray-600">채용 진행에 심각한 문제가 있습니다</div>
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
                    <div className="flex justify-end items-center">
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
            <h2 className="text-lg font-semibold text-gray-800">포지션명</h2>
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
        {activeSection === 'candidates' ? (
          <PositionDetailsApplicants 
            onBack={handleApplicantsBack}
            positionData={jobData}
            jrNo={jrNo}
            positionStatus={positionStatus}
            onPositionStatusChange={handlePositionStatusChange}
          />
        ) : activeSection === 'jobinfo' ? (
          <JobInfoPage 
            onBack={handleJobInfoBack}
            positionData={jobData}
            jrNo={jrNo}
            positionStatus={positionStatus}
            onPositionStatusChange={handlePositionStatusChange}
          />
        ) : activeSection === 'kickoff' ? (
          <KickoffDocumentPage 
            onBack={handleKickoffDocumentBack}
            positionData={jobData}
            jrNo={jrNo}
          />
        ) : activeSection === 'jd' ? (
          <JobDescriptionPage 
            onBack={handleJDBack}
            positionData={jobData}
            jrNo={jrNo}
          />
        ) : (
          <>
            {renderSharedHeader(
              navigationItems.find(item => item.id === activeSection)?.label,
              jobData.jobName
            )}

            <div className="p-6">
              {activeSection === 'overview' && renderOverviewContent()}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PositionDetails;import React, { useState } from 'react';
import { User, MapPin, Calendar, Clock, AlertTriangle, CheckCircle, XCircle, FileText, MessageSquare, Star, TrendingUp, ChevronRight, Mail, Phone, Award, Briefcase, DollarSign, Upload, Tag, Send, Eye, ThumbsUp, ThumbsDown, ChevronDown, ChevronUp, Building, Users, Copy, Edit, Plus, Target, BookOpen, Filter, BarChart3, Lock, Info, Link, Settings, File, Play, Bell, ArrowLeft, Save, History, Download, Share2, X, Search, Trash2, GripVertical, Percent } from 'lucide-react';

// KickoffDocumentPage 컴포넌트
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

  return (
    <div className="bg-gray-50 min-h-screen">
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
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">킥오프 문서 내용</h3>
            <p className="text-gray-600">킥오프 문서의 상세 내용이 여기에 표시됩니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// JobDescriptionPage 컴포넌트
const JobDescriptionPage = ({ onBack, positionData, jrNo }) => {
  const [activeSection, setActiveSection] = useState('jd');
  const [jdSections, setJdSections] = useState({
    teamIntro: '',
    mainTasks: '',
    requirements: '',
    techStack: '',
    preferredQualifications: ''
  });

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">공고 관리</h1>
              <p className="text-gray-600 mt-1">{jobData.jobName} - {jobData.matsNumber}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <MessageSquare className="w-4 h-4 mr-2" />
              Slack 공유
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Job Description 관리</h3>
          <p className="text-gray-600">JD 편집 및 관리 기능이 여기에 표시됩니다.</p>
        </div>
      </div>
    </div>
  );
};

// PositionDetailsApplicants 컴포넌트
const PositionDetailsApplicants = ({ onBack, positionData, jrNo, positionStatus, onPositionStatusChange }) => {
  const [stageFilter, setStageFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('table');

  const positionStatusOptions = {
    'draft': { label: '드래프트', color: 'bg-gray-100 text-gray-800' },
    'active': { label: '활성', color: 'bg-green-100 text-green-800' },
    'paused': { label: '일시정지', color: 'bg-yellow-100 text-yellow-800' },
    'on_hold': { label: '보류', color: 'bg-orange-100 text-orange-800' },
    'closed': { label: '마감', color: 'bg-red-100 text-red-800' },
    'cancelled': { label: '취소', color: 'bg-gray-100 text-gray-600' },
    'completed': { label: '완료', color: 'bg-blue-100 text-blue-800' }
  };

  const candidates = [
    {
      id: 1,
      name: '김철수',
      email: 'kim.cs@email.com',
      position: 'Frontend Developer',
      experience: '5년',
      currentStage: 'first_interview',
      applicationDate: '2025.06.15',
      recruiter: '김린',
      rating: 4
    },
    {
      id: 2,
      name: '이영희',
      email: 'lee.yh@email.com',
      position: 'React Developer',
      experience: '7년',
      currentStage: 'offer_negotiation',
      applicationDate: '2025.06.12',
      recruiter: '차지현',
      rating: 5
    }
  ];

  const stageNames = {
    'document_review': '서류 검토',
    'pre_assignment': '사전 과제',
    'first_interview': '1차 인터뷰',
    'second_interview': '2차 인터뷰',
    'offer_negotiation': '처우 협의'
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesStage = stageFilter === 'all' || candidate.currentStage === stageFilter;
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStage && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">후보자 관리</h1>
            <p className="text-gray-600 mt-1">{positionData?.jobName || 'Frontend Engineer (29cm)'}</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => alert('병합 화면을 준비중입니다.')}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              병합 처리
            </button>
            
            <div className="relative">
              <select
                value={positionStatus}
                onChange={(e) => onPositionStatusChange(e.target.value)}
                className={`text-sm px-3 py-1 rounded-full border-0 cursor-pointer font-medium ${positionStatusOptions[positionStatus].color} appearance-none pr-8`}
              >
                {Object.entries(positionStatusOptions).map(([key, option]) => (
                  <option key={key} value={key}>{option.label}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500" />
            </div>
            
            <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
              Status: Active
            </span>
            
            <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {jrNo?.replace('JR', 'MATS') || 'MATS0000001111'}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="이름, 이메일 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64"
              />
            </div>
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
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              총 {filteredCandidates.length}명
            </span>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              후보자 추가
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {filteredCandidates.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-600 mb-2">후보자가 없습니다</h3>
              <p className="text-gray-500">새 후보자를 추가해보세요.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">지원자</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">현재 단계</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">경력</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">지원일</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">담당자</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">평가</th>
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
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                          {stageNames[candidate.currentStage]}
                        </span>
                      </td>
                      <td className="py-4 px-4">{candidate.experience}</td>
                      <td className="py-4 px-4">{candidate.applicationDate}</td>
                      <td className="py-4 px-4">{candidate.recruiter}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < candidate.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// JobInfoPage 컴포넌트
const JobInfoPage = ({ onBack, positionData, jrNo, positionStatus, onPositionStatusChange }) => {
  const [activeSection, setActiveSection] = useState('stages');

  const positionStatusOptions = {
    'draft': { label: '드래프트', color: 'bg-gray-100 text-gray-800' },
    'active': { label: '활성', color: 'bg-green-100 text-green-800' },
    'paused': { label: '일시정지', color: 'bg-yellow-100 text-yellow-800' },
    'on_hold': { label: '보류', color: 'bg-orange-100 text-orange-800' },
    'closed': { label: '마감', color: 'bg-red-100 text-red-800' },
    'cancelled': { label: '취소', color: 'bg-gray-100 text-gray-600' },
    'completed': { label: '완료', color: 'bg-blue-100 text-blue-800' }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">포지션 관리</h1>
            <p className="text-gray-600 mt-1">{positionData?.jobName || 'Frontend Engineer (29cm)'}</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => alert('병합 화면을 준비중입니다.')}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              병합 처리
            </button>
            
            <div className="relative">
              <select
                value={positionStatus}
                onChange={(e) => onPositionStatusChange(e.target.value)}
                className={`text-sm px-3 py-1 rounded-full border-0 cursor-pointer font-medium ${positionStatusOptions[positionStatus].color} appearance-none pr-8`}
              >
                {Object.entries(positionStatusOptions).map(([key, option]) => (
                  <option key={key} value={key}>{option.label}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500" />
            </div>
            
            <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
              Status: Active
            </span>
            
            <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {jrNo?.replace('JR', 'MATS') || 'MATS0000001111'}
            </span>
          </div>
        </div>
      </div>

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

      <div className="p-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">포지션 관리</h3>
          <p className="text-gray-600">포지션 관리 기능이 여기에 표시됩니다.</p>
          <div className="mt-4">
            <p className="text-sm text-gray-500">현재 섹션: {activeSection}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// 메인 PositionDetails 컴포넌트
const PositionDetails = ({ onBack, jrNo }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [positionStatus, setPositionStatus] = useState('active');
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
  
  const [showStatsSettings, setShowStatsSettings] = useState(false);
  const [selectedStats, setSelectedStats] = useState([
    'totalApplications', 
    'documentReview', 
    'preAssignment', 
    'firstInterview', 
    'secondInterview', 
    'thirdInterview', 
    'offerNegotiation', 
    'finalAccepted'
  ]);

  const [showStatusSettings, setShowStatusSettings] = useState(false);
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
    'finalAccepted': { label: '최종합격', color: 'green' }
  };

  const positionStatusOptions = {
    'draft': { label: '드래프트', color: 'bg-gray-100 text-gray-800' },
    'active': { label: '활성', color: 'bg-green-100 text-green-800' },
    'paused': { label: '일시정지', color: 'bg-yellow-100 text-yellow-800' },
    'on_hold': { label: '보류', color: 'bg-orange-100 text-orange-800' },
    'closed': { label: '마감', color: 'bg-red-100 text-red-800' },
    'cancelled': { label: '취소', color: 'bg-gray-100 text-gray-600' },
    'completed': { label: '완료', color: 'bg-blue-100 text-blue-800' }
  };

  const handlePositionStatusChange = (newStatus) => {
    setPositionStatus(new