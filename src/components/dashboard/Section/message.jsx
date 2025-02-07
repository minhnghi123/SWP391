import React, { useState } from "react";
import { FiSearch, FiSend } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

const users = [
  { id: 1, name: "John Doe", role: "Patient", avatar: "https://png.pngtree.com/png-clipart/20211009/original/pngtree-cute-boy-doctor-avatar-logo-png-image_6848835.png", lastMessage: "I need to reschedule..." },
  { id: 2, name: "Dr. Emily Smith", role: "Doctor", avatar: "https://png.pngtree.com/png-clipart/20211009/original/pngtree-cute-boy-doctor-avatar-logo-png-image_6848835.png", lastMessage: "Please review the test results..." },
  { id: 3, name: "Mary Johnson", role: "Patient", avatar: "https://png.pngtree.com/png-clipart/20211009/original/pngtree-cute-boy-doctor-avatar-logo-png-image_6848835.png", lastMessage: "Thank you for the care..." }
];

const messages = {
  1: [
    { from: "John Doe", text: "Can I reschedule my appointment?", time: "09:30 AM", sentByUser: false },
    { from: "You", text: "Sure, let me check the available slots.", time: "09:35 AM", sentByUser: true }
  ],
  2: [
    { from: "Dr. Emily Smith", text: "Please review the test results for Patient X.", time: "10:15 AM", sentByUser: false },
    { from: "You", text: "I will check and get back to you.", time: "10:20 AM", sentByUser: true }
  ],
  3: [
    { from: "Mary Johnson", text: "Thank you for the excellent care!", time: "10:20 AM", sentByUser: false },
    { from: "You", text: "You're welcome! Let us know if you need anything else.", time: "10:25 AM", sentByUser: true }
  ]
};

const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [messageInput, setMessageInput] = useState("");

  const handleSendMessage = () => {
    if (messageInput.trim() === "") return;
    messages[selectedUser.id].push({ from: "You", text: messageInput, time: "Just now", sentByUser: true });
    setMessageInput("");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/3 bg-white p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Messages</h2>
        <div className="relative mb-4">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input type="text" placeholder="Search..." className="w-full pl-10 p-2 border rounded-lg" />
        </div>
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              className={`flex items-center gap-4 p-3 cursor-pointer rounded-lg hover:bg-gray-200 ${selectedUser.id === user.id ? "bg-gray-300" : ""}`}
              onClick={() => setSelectedUser(user)}
            >
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
              <div>
                <h3 className="text-md font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.lastMessage}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Chat Section */}
      <div className="w-2/3 flex flex-col bg-white shadow-lg">
        <div className="p-4 border-b flex items-center gap-4">
          <img src={selectedUser.avatar} alt={selectedUser.name} className="w-12 h-12 rounded-full" />
          <div>
            <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
            <p className="text-sm text-gray-600">{selectedUser.role}</p>
          </div>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {messages[selectedUser.id].map((msg, index) => (
            <div key={index} className={`mb-4 ${msg.sentByUser ? "text-right" : "text-left"}`}>
              <p className={`inline-block px-4 py-2 rounded-lg ${msg.sentByUser ? "bg-blue-500 text-white" : "bg-gray-200"}`}>{msg.text}</p>
              <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
            </div>
          ))}
        </div>
        <div className="p-4 border-t flex items-center">
          <input
            type="text"
            className="flex-1 p-2 border rounded-lg"
            placeholder="Type a message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button onClick={handleSendMessage} className="ml-2 p-2 bg-blue-500 text-white rounded-lg">
            <FiSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;