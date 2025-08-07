import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SidebarItems from './SidebarItems';

import Overview from './Overview';
import Messages from './Messages';
import Groups from './Groups';
import Challenges from './Challenges';
import Clients from './Client Components/Clients';
import Team from './Team';
import Payments from './Payments';
import MasterLibraries from './MasterLibraries';
import Scheduling from './Scheduling';
import Settings from './Settings';

function AppLayout() {
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <SidebarItems />
      <main className="flex-1 p-6 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/team" element={<Team />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/master-libraries" element={<MasterLibraries />} />
          <Route path="/scheduling" element={<Scheduling />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}