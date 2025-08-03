import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];

const Overview = () => {
  const clientGrowthData = {
    labels: months,
    datasets: [{
      label: 'Clients',
      data: [0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 3],
      borderColor: '#ec4899',
      backgroundColor: '#f472b6',
      tension: 0.3,
      fill: true,
    }]
  };

  const avgSigninsData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Sign-ins',
      data: [1.5, 2.2, 2.8, 3.1],
      backgroundColor: '#ec4899',
    }]
  };

  const avgWorkoutsData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Workouts',
      data: [2.3, 3.0, 3.4, 4.2],
      backgroundColor: '#f472b6',
    }]
  };

  const complianceData = {
    labels: ['Completed', 'Missed'],
    datasets: [{
      data: [78, 22],
      backgroundColor: ['#ec4899', '#e5e7eb'],
      hoverOffset: 4,
    }]
  };

  return (
    <div className="space-y-8">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-gray-800">Welcome back, Coach</h2>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button className="bg-pink-600 text-white p-4 rounded-lg shadow hover:bg-pink-700 transition">+ New Client</button>
          <button className="bg-pink-600 text-white p-4 rounded-lg shadow hover:bg-pink-700 transition">+ New Program</button>
          <button className="bg-pink-600 text-white p-4 rounded-lg shadow hover:bg-pink-700 transition">📢 Send Message</button>
          <button className="bg-pink-600 text-white p-4 rounded-lg shadow hover:bg-pink-700 transition">📆 Schedule Session</button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { label: 'Total Clients', value: 12 },
          { label: 'Active Programs', value: 4 },
          { label: 'Unread Messages', value: 7 },
          { label: 'Ongoing Challenges', value: 3 },
          { label: 'Pending Payments', value: 2 },
          { label: 'Check-ins Due Today', value: 5 },
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-sm text-gray-500">{stat.label}</h3>
            <p className="text-3xl font-bold text-pink-500">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Today's Tasks */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Today’s Tasks</h3>
        <ul className="space-y-3">
          <li className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
            <span>Review workout log for Jane D.</span>
            <button className="text-pink-600 font-medium hover:underline">Open</button>
          </li>
          <li className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
            <span>Message check-in for Marcus R.</span>
            <button className="text-pink-600 font-medium hover:underline">Message</button>
          </li>
          <li className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
            <span>Update program for Clara S.</span>
            <button className="text-pink-600 font-medium hover:underline">Edit</button>
          </li>
        </ul>
      </div>

      {/* Charts + Recent Activity */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left side: Vertical stacked graphs */}
        <div className="flex flex-col gap-6 flex-1">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Client Growth (12 Months)</h3>
            <Line data={clientGrowthData} />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Avg Client Sign-ins / Week</h3>
            <Bar data={avgSigninsData} />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Avg Workouts Logged / Week</h3>
            <Bar data={avgWorkoutsData} />
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Exercise Compliance</h3>
            <div className="w-full max-w-xs mx-auto">
              <Doughnut data={complianceData} />
              </div>
              </div>
        </div>

        {/* Right side: Recent Activity */}
        <div className="bg-white p-4 rounded shadow w-full lg:max-w-xs">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <ul className="text-sm space-y-3">
            <li>🏋️‍♀️ Jane D. completed “Upper Body Burn”<br /><span className="text-xs text-gray-400">2 hours ago</span></li>
            <li>📩 Message from Marcus R.<br /><span className="text-xs text-gray-400">3 hours ago</span></li>
            <li>🎯 Clara S. hit 10,000 steps<br /><span className="text-xs text-gray-400">Yesterday</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Overview;