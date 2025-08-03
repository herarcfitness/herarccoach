import React, { useState } from 'react';
import { PaperClipIcon, VideoCameraIcon, XCircleIcon, PlusIcon, UserMinusIcon } from '@heroicons/react/24/outline';

function Groups() {
  const [groups, setGroups] = useState([
    {
      name: 'Accountability Queens',
      preview: 'Let\'s crush our steps this week!',
      date: 'Jul 2',
      isNew: true,
      members: ['Jayda', 'Tasha', 'Kim'],
    },
    {
      name: 'July Challenge',
      preview: 'Who\'s ready for legs day?!',
      date: 'Jun 30',
      isNew: false,
      members: ['Jayda', 'Marcus', 'Clara', 'Lex'],
    },
  ]);

  const [activeGroup, setActiveGroup] = useState(groups[0]?.name || '');
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);
  const [newMemberName, setNewMemberName] = useState('');
  const [showAddMember, setShowAddMember] = useState(false);

  const handleDelete = (index) => {
    const updated = groups.filter((_, i) => i !== index);
    setGroups(updated);
    if (groups[index].name === activeGroup) {
      setActiveGroup(updated[0]?.name || '');
    }
    setShowConfirmDelete(null);
  };

  const toggleUnread = (i) => {
    const copy = [...groups];
    copy[i].isNew = !copy[i].isNew;
    setGroups(copy);
  };

  const addMember = () => {
    if (newMemberName.trim()) {
      const copy = [...groups];
      const idx = copy.findIndex((g) => g.name === activeGroup);
      if (idx >= 0 && !copy[idx].members.includes(newMemberName.trim())) {
        copy[idx].members.push(newMemberName.trim());
        setGroups(copy);
        setNewMemberName('');
        setShowAddMember(false);
      }
    }
  };

  const removeMember = (memberName) => {
    const copy = [...groups];
    const idx = copy.findIndex((g) => g.name === activeGroup);
    if (idx >= 0) {
      copy[idx].members = copy[idx].members.filter((m) => m !== memberName);
      setGroups(copy);
    }
  };

  const [messageInput, setMessageInput] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  const activeGroupData = groups.find((g) => g.name === activeGroup);
  const activeGroupIndex = groups.findIndex((g) => g.name === activeGroup);

  return (
    <div className="flex h-full">
      <aside className="w-80 bg-white border-r p-4 space-y-4 relative">
        {/* Top Controls */}
        <div className="flex items-center gap-2">
          <select className="border px-2 py-1 rounded w-1/2">
            <option>Active Groups</option>
            <option>Archived</option>
          </select>
          <input type="text" placeholder="Search" className="border px-3 py-1 rounded w-1/2" />
        </div>

        <div className="flex justify-between items-center">
          <button className="bg-pink-600 text-white px-3 py-1 rounded text-sm hover:bg-pink-700">
            + New
          </button>
          <button
            onClick={() => {
              if (activeGroupIndex >= 0) toggleUnread(activeGroupIndex);
            }}
            className="text-sm text-gray-600 hover:underline"
          >
            Mark as {activeGroupIndex >= 0 && groups[activeGroupIndex]?.isNew ? 'Read' : 'Unread'}
          </button>
        </div>

        <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-200px)] pr-1">
          {groups.map((grp, index) => (
            <div
              key={grp.name}
              onClick={() => setActiveGroup(grp.name)}
              className={`border rounded p-3 cursor-pointer transition relative ${
                grp.name === activeGroup ? 'bg-pink-100 border-pink-300' : 'hover:bg-gray-100'
              }`}
            >
              {/* Delete */}
              <button
                onClick={(e) => { e.stopPropagation(); setShowConfirmDelete(index); }}
                className="absolute top-1 right-1 text-gray-400 hover:text-red-500 text-xs"
                title="Delete group"
              >
                ✖
              </button>

              <div className="flex justify-between items-center pr-5">
                <p className="font-semibold text-sm">{grp.name}</p>
                <span className="text-xs text-gray-500">{grp.date}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{grp.preview}</p>
              {grp.isNew && (
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full mt-1 inline-block">
                  NEW
                </span>
              )}
            </div>
          ))}
        </div>

        {showConfirmDelete !== null && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md text-center space-y-4">
              <p>Are you sure you want to delete this group?</p>
              <div className="flex justify-center gap-4">
                <button className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400" onClick={() => setShowConfirmDelete(null)}>
                  Cancel
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleDelete(showConfirmDelete)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </aside>

      <div className="flex-1 flex">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col p-6">
          <div className="border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-800">{activeGroup}</h2>
            <p className="text-sm text-gray-500">Group chat</p>
          </div>

          {/* Chat messages area */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {/* Placeholder chat bubble */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-300" />
              <div className="bg-gray-200 text-gray-800 p-3 rounded-lg max-w-md">
                Welcome to the group!
              </div>
            </div>
          </div>

          {/* Input + attachments + video */}
          <div className="mt-4 flex items-center gap-2">
            <input
              type="text"
              value={messageInput}
              placeholder="Type a message..."
              onChange={(e) => setMessageInput(e.target.value)}
              className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="file"
              onChange={(e) => setUploadedFile(e.target.files?.[0])}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="text-gray-500 hover:text-pink-600 cursor-pointer">
              <PaperClipIcon className="h-5 w-5" title="Attach file" />
            </label>
            <button className="text-gray-500 hover:text-pink-600">
              <VideoCameraIcon className="h-5 w-5" title="Start video call" />
            </button>
            <button className="bg-pink-600 text-white px-5 py-2 rounded-full hover:bg-pink-700">
              Send
            </button>
          </div>

          {uploadedFile && (
            <p className="mt-2 text-sm text-gray-600">Attached: {uploadedFile.name}</p>
          )}
        </div>

        {/* Members Column */}
        <div className="w-64 bg-gray-50 border-l p-4">
          <div className="border-b pb-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Members</h3>
            
            {/* Add Member Section */}
            <div className="space-y-2">
              {showAddMember ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    placeholder="Enter name..."
                    className="flex-1 border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
                    onKeyPress={(e) => e.key === 'Enter' && addMember()}
                  />
                  <button
                    onClick={addMember}
                    className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setShowAddMember(false);
                      setNewMemberName('');
                    }}
                    className="text-gray-500 hover:text-gray-700 text-xs"
                  >
                    ✖
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAddMember(true)}
                  className="flex items-center gap-1 text-sm text-pink-600 hover:text-pink-700"
                >
                  <PlusIcon className="h-4 w-4" />
                  Add Member
                </button>
              )}
            </div>
          </div>

          {/* Members List */}
          <div className="space-y-2">
            {activeGroupData?.members.map((member) => (
              <div key={member} className="flex items-center justify-between p-2 bg-white rounded border">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-pink-200 flex items-center justify-center text-xs font-medium text-pink-700">
                    {member.charAt(0)}
                  </div>
                  <span className="text-sm text-gray-700">{member}</span>
                </div>
                <button
                  onClick={() => removeMember(member)}
                  className="text-gray-400 hover:text-red-500 p-1"
                  title="Remove member"
                >
                  <UserMinusIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Member Count */}
          <div className="mt-4 pt-4 border-t">
            <p className="text-xs text-gray-500">
              {activeGroupData?.members.length || 0} member{activeGroupData?.members.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Groups;