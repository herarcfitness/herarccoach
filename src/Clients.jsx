import React, { useState } from 'react';
import { 
  EnvelopeIcon, 
  EyeIcon, 
  ArchiveBoxIcon, 
  ChatBubbleLeftIcon,
  FunnelIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

function Clients() {
  const [statusFilter, setStatusFilter] = useState('active');
  
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      status: 'active',
      lastSignIn: '2 hours ago',
      program: 'Weight Loss Pro',
      membership: 'Personal Arc',
      avatar: 'SJ'
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      status: 'active',
      lastSignIn: '1 day ago',
      program: 'Muscle Building',
      membership: 'Guided Arc',
      avatar: 'MC'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      email: 'emma.rodriguez@email.com',
      status: 'pending',
      lastSignIn: '3 days ago',
      program: 'Fitness Fundamentals',
      membership: 'Community Arc',
      avatar: 'ER'
    },
    {
      id: 4,
      name: 'David Thompson',
      email: 'david.thompson@email.com',
      status: 'deactivated',
      lastSignIn: '1 week ago',
      program: 'Strength Training',
      membership: 'Personal Arc',
      avatar: 'DT'
    },
    {
      id: 5,
      name: 'Lisa Park',
      email: 'lisa.park@email.com',
      status: 'active',
      lastSignIn: '5 hours ago',
      program: 'Cardio Blast',
      membership: 'Guided Arc',
      avatar: 'LP'
    },
    {
      id: 6,
      name: 'James Wilson',
      email: 'james.wilson@email.com',
      status: 'archived',
      lastSignIn: '2 weeks ago',
      program: 'Beginner Basics',
      membership: 'Community Arc',
      avatar: 'JW'
    },
    {
      id: 7,
      name: 'Amanda Foster',
      email: 'amanda.foster@email.com',
      status: 'active',
      lastSignIn: '1 hour ago',
      program: 'Yoga Flow',
      membership: 'Personal Arc',
      avatar: 'AF'
    },
    {
      id: 8,
      name: 'Robert Kim',
      email: 'robert.kim@email.com',
      status: 'pending',
      lastSignIn: '2 days ago',
      program: 'HIIT Training',
      membership: 'Guided Arc',
      avatar: 'RK'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'deactivated':
        return 'bg-red-100 text-red-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'pending':
        return 'Pending';
      case 'deactivated':
        return 'Deactivated';
      case 'archived':
        return 'Archived';
      default:
        return status;
    }
  };

  const getMembershipColor = (membership) => {
    switch (membership) {
      case 'Personal Arc':
        return 'bg-purple-100 text-purple-800';
      case 'Guided Arc':
        return 'bg-blue-100 text-blue-800';
      case 'Community Arc':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredClients = clients.filter(client => {
    if (statusFilter === 'all') return true;
    return client.status === statusFilter;
  });

  const handleStatusChange = (clientId, newStatus) => {
    setClients(clients.map(client => 
      client.id === clientId ? { ...client, status: newStatus } : client
    ));
  };

  const handleArchive = (clientId) => {
    handleStatusChange(clientId, 'archived');
  };

  const handleActivate = (clientId) => {
    handleStatusChange(clientId, 'active');
  };

  const handleDeactivate = (clientId) => {
    handleStatusChange(clientId, 'deactivated');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Clients</h1>
        <p className="text-gray-600">Manage your client relationships and track their progress</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FunnelIcon className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter by status:</span>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="deactivated">Deactivated</option>
              <option value="archived">Archived</option>
              <option value="all">All Clients</option>
            </select>
          </div>
          <button className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 flex items-center gap-2">
            <PlusIcon className="h-4 w-4" />
            Add Client
          </button>
        </div>
      </div>

      {/* Status Summary */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {filteredClients.length} of {clients.length} clients
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              Active: {clients.filter(c => c.status === 'active').length}
            </span>
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              Pending: {clients.filter(c => c.status === 'pending').length}
            </span>
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              Deactivated: {clients.filter(c => c.status === 'deactivated').length}
            </span>
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              Archived: {clients.filter(c => c.status === 'archived').length}
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Membership
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Sign-In
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Program
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-pink-200 flex items-center justify-center">
                          <span className="text-sm font-medium text-pink-700">
                            {client.avatar}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {client.name}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <EnvelopeIcon className="h-3 w-3" />
                          {client.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(client.status)}`}>
                      {getStatusText(client.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMembershipColor(client.membership)}`}>
                      {client.membership}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {client.lastSignIn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {client.program}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        className="text-pink-600 hover:text-pink-900 p-1 rounded"
                        title="Message client"
                      >
                        <ChatBubbleLeftIcon className="h-4 w-4" />
                      </button>
                      <button
                        className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        title="View profile"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      {client.status === 'active' && (
                        <button
                          onClick={() => handleDeactivate(client.id)}
                          className="text-yellow-600 hover:text-yellow-900 p-1 rounded"
                          title="Deactivate client"
                        >
                          <ArchiveBoxIcon className="h-4 w-4" />
                        </button>
                      )}
                      {client.status === 'deactivated' && (
                        <button
                          onClick={() => handleActivate(client.id)}
                          className="text-green-600 hover:text-green-900 p-1 rounded"
                          title="Activate client"
                        >
                          <PlusIcon className="h-4 w-4" />
                        </button>
                      )}
                      {client.status !== 'archived' && (
                        <button
                          onClick={() => handleArchive(client.id)}
                          className="text-gray-600 hover:text-gray-900 p-1 rounded"
                          title="Archive client"
                        >
                          <ArchiveBoxIcon className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Clients;