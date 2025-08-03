import React, { useState, useRef, useEffect } from 'react';
import { PaperClipIcon, VideoCameraIcon, PlusIcon, UserMinusIcon } from '@heroicons/react/24/outline';

function Messages() {
  const initialMessages = [
    { 
      name: 'Jayda Harris', 
      preview: "Hope you're enjoying your program!", 
      date: 'Jul 1', 
      isNew: true,
      members: ['Jayda Harris', 'Coach Sarah']
    },
    { 
      name: 'Timmy Explorer', 
      preview: "How are you doing this week?", 
      date: 'Jun 18', 
      isNew: false,
      members: ['Timmy Explorer', 'Coach Sarah']
    },
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [activeConversation, setActiveConversation] = useState(initialMessages[0].name);
  const [newMemberName, setNewMemberName] = useState('');
  const [showAddMember, setShowAddMember] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);
  const chatRef = useRef(null);

  // Scroll to bottom when chat updates
  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const toggleUnread = (name) => {
    const updated = messages.map((msg) =>
      msg.name === name ? { ...msg, isNew: !msg.isNew } : msg
    );
    setMessages(updated);
  };

  const handleDelete = (name) => {
    setMessages(messages.filter((m) => m.name !== name));
    if (activeConversation === name) {
      setActiveConversation(messages[0]?.name || '');
    }
    setShowConfirmDelete(null);
  };

  const addMember = () => {
    if (newMemberName.trim()) {
      const copy = [...messages];
      const idx = copy.findIndex((m) => m.name === activeConversation);
      if (idx >= 0 && !copy[idx].members.includes(newMemberName.trim())) {
        copy[idx].members.push(newMemberName.trim());
        setMessages(copy);
        setNewMemberName('');
        setShowAddMember(false);
      }
    }
  };

  const removeMember = (memberName) => {
    const copy = [...messages];
    const idx = copy.findIndex((m) => m.name === activeConversation);
    if (idx >= 0) {
      copy[idx].members = copy[idx].members.filter((m) => m !== memberName);
      setMessages(copy);
    }
  };

  const activeConversationData = messages.find((m) => m.name === activeConversation);
  const activeMessage = messages.find((m) => m.name === activeConversation);

  return (
    <div className="flex h-full">
      {/* Left Sidebar */}
      <aside className="w-80 bg-white border-r p-4 space-y-4 relative">
        {/* Dropdown + Search */}
        <div className="flex items-center gap-2">
          <select className="border px-2 py-1 rounded w-1/2">
            <option>Active Messages</option>
            <option>Archived Messages</option>
          </select>
          <input
            type="text"
            placeholder="Search"
            className="border px-3 py-1 rounded w-1/2"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <button className="bg-pink-600 text-white px-3 py-1 rounded text-sm hover:bg-pink-700">
            + New
          </button>
          <button
            onClick={() => toggleUnread(activeConversation)}
            className="text-sm text-gray-600 hover:underline"
          >
            Mark as {activeMessage?.isNew ? 'Read' : 'Unread'}
          </button>
        </div>

        {/* Message List */}
        <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-200px)] pr-1">
        {messages.map((msg, index) => (
  <div
    key={index}
    onClick={() => setActiveConversation(msg.name)}
    className={`border rounded p-3 cursor-pointer transition relative 
      ${msg.name === activeConversation ? 'bg-pink-100 border-pink-300' : 'hover:bg-gray-100'}`}
  >
    {/* Delete icon */}
    <button
      onClick={(e) => {
        e.stopPropagation(); // Prevent opening the message
        setShowConfirmDelete(msg.name);
      }}
      className="absolute top-1 right-1 text-gray-400 hover:text-red-500 text-xs"
      title="Delete conversation"
    >
      ✖
    </button>

    <div className="flex justify-between items-center pr-5">
      <p className="font-semibold text-sm">{msg.name}</p>
      <span className="text-xs text-gray-500">{msg.date}</span>
    </div>
    <p className="text-sm text-gray-600 truncate">{msg.preview}</p>
    {msg.isNew && (
      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full mt-1 inline-block">
        NEW
      </span>
    )}
  </div>
))}
        </div>

        {/* Delete Confirmation Popup */}
        {showConfirmDelete && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md text-center space-y-4">
              <p>Are you sure you want to delete this conversation?</p>
              <div className="flex justify-center gap-4">
                <button 
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400" 
                  onClick={() => setShowConfirmDelete(null)}
                >
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
        {/* Right Side: Chat */}
        <div className="flex-1 flex flex-col p-6">
          {/* Header */}
          <div className="border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-800">{activeConversation}</h2>
            <p className="text-sm text-gray-500">Online</p>
          </div>

          {/* Chat */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {/* Avatar + Message - Client */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0" />
              <div className="bg-gray-200 text-gray-800 p-3 rounded-lg max-w-md">
                Hey Coach! I crushed my leg day today 🔥
              </div>
            </div>

            {/* Avatar + Message - You */}
            <div className="flex items-start gap-3 justify-end">
              <div className="bg-pink-600 text-white p-3 rounded-lg max-w-md">
                LET'S GOOO 💪 So proud of you!
              </div>
              <div className="w-8 h-8 rounded-full bg-pink-300 flex-shrink-0" />
            </div>

            {/* Another Client Message */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0" />
              <div className="bg-gray-200 text-gray-800 p-3 rounded-lg max-w-md">
                Think I should bump my weights up?
              </div>
            </div>

            <div ref={chatRef} />
          </div>

          {/* Message Input */}
          <div className="mt-6 border-t pt-4 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button className="text-gray-500 hover:text-pink-600">
              <PaperClipIcon className="h-5 w-5" />
            </button>
            <button className="text-gray-500 hover:text-pink-600">
              <VideoCameraIcon className="h-5 w-5" />
            </button>
            <button className="bg-pink-600 text-white px-5 py-2 rounded-full hover:bg-pink-700">
              Send
            </button>
          </div>
        </div>

        {/* Members Column */}
        <div className="w-64 bg-gray-50 border-l p-4">
          <div className="border-b pb-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Participants</h3>
            
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
                  Add Participant
                </button>
              )}
            </div>
          </div>

          {/* Members List */}
          <div className="space-y-2">
            {activeConversationData?.members.map((member) => (
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
                  title="Remove participant"
                >
                  <UserMinusIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Member Count */}
          <div className="mt-4 pt-4 border-t">
            <p className="text-xs text-gray-500">
              {activeConversationData?.members.length || 0} participant{activeConversationData?.members.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;