import React, { useState, useEffect } from 'react';
import { 
  EnvelopeIcon, 
  EyeIcon, 
  ArchiveBoxIcon, 
  ChatBubbleLeftIcon,
  FunnelIcon,
  PlusIcon,
  XMarkIcon,
  PencilIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

function Clients() {
  const [statusFilter, setStatusFilter] = useState('active');
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [editingStatus, setEditingStatus] = useState(null);
  const [editingMembership, setEditingMembership] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    goals: '',
    assignedTrainer: '',
    membershipType: 'Community Arc'
  });

  // Fetch clients from API
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/clients');
      if (response.ok) {
        const data = await response.json();
        setClients(data);
      } else {
        console.error('Failed to fetch clients');
        // Fallback to sample data if API is not available
        setClients([
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
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
      // Fallback to sample data
      setClients([
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
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          status: 'active',
          lastSignIn: 'Just now',
          program: 'New Program',
          avatar: formData.name.split(' ').map(n => n[0]).join('').toUpperCase()
        }),
      });

      if (response.ok) {
        // Clear form
        setFormData({
          name: '',
          email: '',
          goals: '',
          assignedTrainer: '',
          membershipType: 'Community Arc'
        });
        
        // Close modal
        setShowModal(false);
        
        // Show success message
        setSuccessMessage('Client added successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        
        // Refresh client list
        await fetchClients();
      } else {
        console.error('Failed to add client');
        alert('Failed to add client. Please try again.');
      }
    } catch (error) {
      console.error('Error adding client:', error);
      alert('Error adding client. Please try again.');
    }
  };

  const handleEditClient = (client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      email: client.email,
      goals: client.goals || '',
      assignedTrainer: client.assignedTrainer || '',
      membershipType: client.membership
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:3000/api/clients/${editingClient.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editingClient,
          ...formData,
          avatar: formData.name.split(' ').map(n => n[0]).join('').toUpperCase()
        }),
      });

      if (response.ok) {
        // Update local state
        setClients(clients.map(client => 
          client.id === editingClient.id 
            ? { ...client, ...formData, avatar: formData.name.split(' ').map(n => n[0]).join('').toUpperCase() }
            : client
        ));
        
        // Close modal
        setShowEditModal(false);
        setEditingClient(null);
        
        // Show success message
        setSuccessMessage('Client updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        console.error('Failed to update client');
        alert('Failed to update client. Please try again.');
      }
    } catch (error) {
      console.error('Error updating client:', error);
      alert('Error updating client. Please try again.');
    }
  };

  const handleStatusChange = (clientId, newStatus) => {
    setClients(clients.map(client => 
      client.id === clientId ? { ...client, status: newStatus } : client
    ));
    setEditingStatus(null);
  };

  const handleMembershipChange = (clientId, newMembership) => {
    setClients(clients.map(client => 
      client.id === clientId ? { ...client, membership: newMembership } : client
    ));
    setEditingMembership(null);
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

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading clients...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Clients</h1>
        <p className="text-gray-600">Manage your client relationships and track their progress</p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {successMessage}
        </div>
      )}

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
          <button 
            onClick={() => setShowModal(true)}
            className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 flex items-center gap-2"
          >
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
                    {editingStatus === client.id ? (
                      <div className="flex items-center gap-2">
                        <select
                          value={client.status}
                          onChange={(e) => handleStatusChange(client.id, e.target.value)}
                          className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-pink-500"
                        >
                          <option value="active">Active</option>
                          <option value="pending">Pending</option>
                          <option value="deactivated">Deactivated</option>
                          <option value="archived">Archived</option>
                        </select>
                        <button
                          onClick={() => setEditingStatus(null)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <CheckIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(client.status)}`}>
                          {getStatusText(client.status)}
                        </span>
                        <button
                          onClick={() => setEditingStatus(client.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <PencilIcon className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingMembership === client.id ? (
                      <div className="flex items-center gap-2">
                        <select
                          value={client.membership}
                          onChange={(e) => handleMembershipChange(client.id, e.target.value)}
                          className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-pink-500"
                        >
                          <option value="Community Arc">Community Arc</option>
                          <option value="Guided Arc">Guided Arc</option>
                          <option value="Personal Arc">Personal Arc</option>
                        </select>
                        <button
                          onClick={() => setEditingMembership(null)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <CheckIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMembershipColor(client.membership)}`}>
                          {client.membership}
                        </span>
                        <button
                          onClick={() => setEditingMembership(client.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <PencilIcon className="h-3 w-3" />
                        </button>
                      </div>
                    )}
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
                        onClick={() => handleEditClient(client)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        title="Edit client"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
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

      {/* Add Client Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Add New Client</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter client name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter client email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Goals
                </label>
                <textarea
                  name="goals"
                  value={formData.goals}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter client goals"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assigned Trainer
                </label>
                <input
                  type="text"
                  name="assignedTrainer"
                  value={formData.assignedTrainer}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter trainer name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Membership Type *
                </label>
                <select
                  name="membershipType"
                  value={formData.membershipType}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="Community Arc">Community Arc</option>
                  <option value="Guided Arc">Guided Arc</option>
                  <option value="Personal Arc">Personal Arc</option>
                </select>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700"
                >
                  Add Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Client Modal */}
      {showEditModal && editingClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Edit Client</h2>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingClient(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter client name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter client email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Goals
                </label>
                <textarea
                  name="goals"
                  value={formData.goals}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter client goals"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assigned Trainer
                </label>
                <input
                  type="text"
                  name="assignedTrainer"
                  value={formData.assignedTrainer}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter trainer name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Membership Type *
                </label>
                <select
                  name="membershipType"
                  value={formData.membershipType}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="Community Arc">Community Arc</option>
                  <option value="Guided Arc">Guided Arc</option>
                  <option value="Personal Arc">Personal Arc</option>
                </select>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingClient(null);
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700"
                >
                  Update Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Clients;