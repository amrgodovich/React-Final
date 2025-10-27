import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';

const NotesPage = ({ onNavigate }) => {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [priority, setPriority] = useState('normal');

  const addNote = () => {
    if (noteText.trim()) {
      setNotes([...notes, { id: Date.now(), text: noteText, priority }]);
      setNoteText('');
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const changePriority = (id, newPriority) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, priority: newPriority } : note)));
  };

  const priorityConfig = {
    important: { color: 'bg-red-100 border-red-300', title: 'Important' },
    normal: { color: 'bg-blue-100 border-blue-300', title: 'Normal' },
    delayed: { color: 'bg-gray-100 border-gray-300', title: 'Delayed' }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onBack={() => onNavigate('dashboard')} backText="← Back to Dashboard" />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Note Manager</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex gap-4">
            <input
              type="text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Enter your note..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && addNote()
              }
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="important">Important</option>
              <option value="normal">Normal</option>
              <option value="delayed">Delayed</option>
            </select>
            <button
              onClick={addNote}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Note
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {["important", "normal", "delayed"].map((priority) => (
          <div key={priority} className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-bold mb-3">
              { priority.slice(0).toUpperCase()} Notes
            </h2>
            {
              notes.filter((n) => n.priority === priority).map((note) => (
                  <div key={note.id} className="border rounded p-3 mb-2">
                    <p className="mb-2">{note.text}</p>
                    <div className="flex gap-2">
                      <select
                        value={note.priority}
                        onChange={(e) => changePriority(note.id, e.target.value)}
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option value="important">Important</option>
                        <option value="normal">Normal</option>
                        <option value="delayed">Delayed</option>
                      </select>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                      >X</button>
                    </div>
                  </div>
                ))
            }
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default NotesPage;