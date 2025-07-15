import React, { useState } from 'react';
import './App.css';
import Positions from './Postitions';
import PositionDetails from './PositionDetails';

function App() {
  const [currentView, setCurrentView] = useState('positions');
  const [selectedPosition, setSelectedPosition] = useState(null);

  const handlePositionSelect = (position) => {
    setSelectedPosition(position);
    setCurrentView('details');
  };

  const handleBackToPositions = () => {
    setCurrentView('positions');
    setSelectedPosition(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mats - ATS System</h1>
        <nav>
          <button 
            className={currentView === 'positions' ? 'active' : ''}
            onClick={() => setCurrentView('positions')}
          >
            포지션 목록
          </button>
          {selectedPosition && (
            <button 
              className={currentView === 'details' ? 'active' : ''}
              onClick={() => setCurrentView('details')}
            >
              포지션 상세
            </button>
          )}
        </nav>
      </header>

      <main className="App-main">
        {currentView === 'positions' && (
          <Positions onPositionSelect={handlePositionSelect} />
        )}
        
        {currentView === 'details' && selectedPosition && (
          <PositionDetails 
            position={selectedPosition} 
            onBack={handleBackToPositions}
          />
        )}
      </main>
    </div>
  );
}

export default App;
