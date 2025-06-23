import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import LandingNavigation from './assets/components/landing/Navigation.jsx';
import Hero from './assets/components/landing/Hero.jsx';
import Feature from './assets/components/landing/Feature.jsx';
import About from './assets/components/landing/About.jsx';
import CTA from './assets/components/landing/CTA.jsx';
import Login from './assets/components/authentication/Login.jsx';
import Register from './assets/components/authentication/Register.jsx';
import Dashboard from './assets/components/app/Dashboard.jsx';
import Expense from './assets/components/app/Expense.jsx';
import Income from './assets/components/app/Income.jsx';
import AppNavigation from './assets/components/app/Navigation.jsx';

const AppContent = () => {
  const location = useLocation();
  const appRoutes = ['/dashboard', '/expenses', '/income'];
  const isAppRoute = appRoutes.some(route => location.pathname.startsWith(route));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {isAppRoute ? <AppNavigation /> : <LandingNavigation />}
      <Routes>
        <Route path="/" element={
          <>
            <Hero/>
            <Feature/>
            <About/>
            <CTA/>
          </>
        }/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard/:userId" element={<Dashboard/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/expenses/:userId" element={<Expense/>}/>
        <Route path="/expenses" element={<Expense/>}/>
        <Route path="/income/:userId" element={<Income/>}/>
        <Route path="/income" element={<Income/>}/>
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;