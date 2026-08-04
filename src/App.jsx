import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Portfolio from "./pages/Portfolio";
import ProjectDetail from "./pages/ProjectDetail";
import SmoothScroll from "./components/SmoothScroll";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Grain from "./components/Grain";
import { Toaster } from "./components/ui/toaster";

/** Cross-fade between routes. Short and soft — a transition, not a production. */
function AnimatedRoutes() {
  const location = useLocation();
  const prefersReduced = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      {/* Opacity only — deliberately no transform. A transformed ancestor
          becomes the containing block for position:fixed descendants, which
          would size the fixed intro overlay to the whole page instead of the
          viewport. */}
      <motion.div
        key={location.pathname}
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={prefersReduced ? undefined : { opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Portfolio />} />
          <Route path="/work/:id" element={<ProjectDetail />} />
          <Route path="*" element={<Portfolio />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <div className="App min-h-screen bg-surface text-ink antialiased">
      <BrowserRouter>
        <SmoothScroll>
          <Grain />
          <Nav />
          <AnimatedRoutes />
          <Footer />
          <Toaster />
        </SmoothScroll>
      </BrowserRouter>
    </div>
  );
}

export default App;
