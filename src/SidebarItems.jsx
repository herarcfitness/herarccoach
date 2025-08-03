import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  ChatBubbleBottomCenterTextIcon,
  UserGroupIcon,
  TrophyIcon,
  UsersIcon,
  BriefcaseIcon,
  CreditCardIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const SidebarItems = () => {
  const location = useLocation();

  return (
    <aside className="w-52 bg-black shadow-md px-4 py-6 hidden md:block">
      <h1 className="text-2xl font-bold text-pink-600 mb-10">Her Arc</h1>
      <nav className="flex flex-col gap-2 text-white">
        <NavLink to="/" icon={HomeIcon} label="Overview" current={location.pathname === '/'} />
        <NavLink to="/messages" icon={ChatBubbleBottomCenterTextIcon} label="Messages" current={location.pathname === '/messages'} />
        <NavLink to="/groups" icon={UserGroupIcon} label="Groups" current={location.pathname === '/groups'} />
        <NavLink to="/challenges" icon={TrophyIcon} label="Challenges" current={location.pathname === '/challenges'} />
        <NavLink to="/clients" icon={UsersIcon} label="Clients" current={location.pathname === '/clients'} />
        <NavLink to="/team" icon={BriefcaseIcon} label="Team" current={location.pathname === '/team'} />
        <NavLink to="/payments" icon={CreditCardIcon} label="Payments" current={location.pathname === '/payments'} />

        {/* Master Libraries dropdown */}
        <Dropdown
          icon={BookOpenIcon}
          label="Master Libraries"
          routes={[
            { to: '/master-libraries/programs', label: 'Programs' },
            { to: '/master-libraries/workouts', label: 'Workouts' },
            { to: '/master-libraries/exercises', label: 'Exercises' },
            { to: '/master-libraries/habits', label: 'Habits' },
          ]}
          current={location.pathname.startsWith('/master-libraries')}
        />

        {/* Scheduling dropdown */}
        <Dropdown
          icon={CalendarDaysIcon}
          label="Scheduling"
          routes={[
            { to: '/scheduling/calendar', label: 'Calendar' },
            { to: '/scheduling/sessions', label: 'Sessions' },
            { to: '/scheduling/availability', label: 'Availability' },
          ]}
          current={location.pathname.startsWith('/scheduling')}
        />

        <NavLink to="/settings" icon={Cog6ToothIcon} label="Settings" current={location.pathname === '/settings'} />
      </nav>
    </aside>
  );
};

const NavLink = ({ to, icon: Icon, label, current }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
      current ? 'bg-pink-600 text-white' : 'hover:text-pink-500'
    }`}
  >
    <Icon className="h-5 w-5" />
    {label}
  </Link>
);

const Dropdown = ({ icon: Icon, label, routes, current }) => (
  <div className="relative group">
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer ${
        current ? 'bg-pink-600 text-white' : 'hover:text-pink-500'
      }`}
    >
      <Icon className="h-5 w-5" />
      {label}
    </div>
    <div className="absolute left-full top-0 ml-1 hidden group-hover:flex flex-col bg-white text-black shadow-md border rounded-sm z-50">
      {routes.map((r) => (
        <Link
          key={r.to}
          to={r.to}
          className={`px-4 py-2 whitespace-nowrap rounded-md ${
            location.pathname === r.to ? 'bg-pink-100 text-pink-600 font-semibold' : 'hover:bg-pink-100'
          }`}
        >
          {r.label}
        </Link>
      ))}
    </div>
  </div>
);

export default SidebarItems;