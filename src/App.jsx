import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './components/ThemeContext'
import { WindowManagerProvider, useWindowManager } from './components/WindowManagerContext'
import DesktopShell from './components/DesktopShell'
import MobileShell from './components/MobileShell'
import LockScreen from './components/LockScreen'

const AppContent = () => {
  const { isLocked } = useWindowManager();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black font-sans selection:bg-accent selection:text-white">
      <AnimatePresence mode="wait">
        {isLocked && (
            <LockScreen key="lock-screen" />
        )}
      </AnimatePresence>
      
      {isMobile ? <MobileShell /> : <DesktopShell />}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <WindowManagerProvider>
        <Router>
          <AppContent />
        </Router>
      </WindowManagerProvider>
    </ThemeProvider>
  )
}

export default App