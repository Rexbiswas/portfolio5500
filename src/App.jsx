import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Home from './pages/Home'
import Loader from './components/Loader'

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-[#66ad69] selection:text-white overflow-hidden">
      {/* Global Grain/Noise Texture */}
      <div className="noise-overlay" />

      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.main 
            key="content" 
            className="w-full relative"
            initial={{ 
                scale: 0.8, 
                opacity: 0, 
                y: 100, // Slight push down for momentum
                filter: 'blur(30px) brightness(0.6)' 
            }}
            animate={{ 
                scale: 1, 
                opacity: 1, 
                y: 0,
                filter: 'blur(0px) brightness(1)' 
            }}
            transition={{ 
                duration: 0.6, 
                ease: [0.16, 1, 0.3, 1],
                delay: 0
            }}
          >
            <Home />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App