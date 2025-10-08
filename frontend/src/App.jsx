import Rect, { useState } from 'rect';
import { Tabs, Tab } from '@mui/material'; 
import ProcessMonitor from './componets/ProcessMonitor';
import HardawareDashboard from './components/HardawareDashboard';
import StartupManager from './componets/StartupManager';

function App() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="app">
            <header className="app-header">
                <h1>Windows Task Manager</h1>
                </header>

            <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
                <Tabs label="Process Monitor" />
                <Tabs label="HardareDashboard" />
                <Tabs label="Startup Manager" />
                </Tabs>

                <div className="tab-content">
                    {activateTab === 0 && <ProcessMonitor />}
                    {activeTab === 1 && <HardawareDashboard />}
                    {activeTab === 2 && <StartupManager />}
                </div>
            </div>
    );
}

export default App;