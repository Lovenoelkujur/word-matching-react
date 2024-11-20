import { useState } from 'react';
import GameBoard from "./components/GameBoard";
import ConfigPanel from "./components/ConfigPanel";
import './App.css'

function App() {
  const [config, setConfig] = useState({
    groupSize: 2,
    itemCount: 8,
    columns: 4,
  });

  const [resetKey, setResetKey] = useState(0);

  const handleConfigChange = (newConfig) => {
    setConfig(newConfig);
    setResetKey(resetKey + 1); // Reset the game on config change
  };

  return (
    <>
       <div className="app">
        <h1>Word Connect</h1>
        <ConfigPanel config={config} onConfigChange={handleConfigChange} />
        <GameBoard key={resetKey} config={config} />
      </div>
    </>
  )
}

export default App;
