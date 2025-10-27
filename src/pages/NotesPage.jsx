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

  const deleteNote = (id) => setNotes(notes.filter((n) => n.id !== id));

  const changePriority = (id, newPriority) =>
    setNotes(notes.map((n) => (n.id === id ? { ...n, priority: newPriority } : n)));

  const PriorityCatgs = {
    important: { title: 'Important Notes', color: 'bg-red-100 border-red-300' },
    normal: { title: 'Normal Notes', color: 'bg-blue-100 border-blue-300' },
    delayed: { title: 'Delayed Notes', color: 'bg-gray-100 border-gray-300' }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onBack={() => onNavigate('dashboard')} backText="Back to Dashboard" />

      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Note Manager</h1>

        {/* Add Note Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Enter your note..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => e.key === 'Enter' && addNote()}
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
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </div>

        {['important', 'normal', 'delayed'].map((key) => {
          const pr_cat = PriorityCatgs[key];
          const notes_of_pr = notes.filter((n) => n.priority === key);

          return (
            <div
              key={key}
              className={`rounded-lg shadow-lg p-6 mb-6 border ${pr_cat.color}`}
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                {pr_cat.title}
              </h2>

              {notes_of_pr.length === 0 ? (
                <p className="text-gray-500">No notes yet.</p>
              ) : (
                <div className="space-y-3">
                  {notes_of_pr.map((note) => (
                    <div
                      key={note.id}
                      className="bg-white border border-gray-200 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between"
                    >
                      <p className="text-gray-800 mb-2 sm:mb-0">{note.text}</p>
                      <div className="flex gap-2">
                        <select
                          value={note.priority}
                          onChange={(e) =>
                            changePriority(note.id, e.target.value)
                          }
                          className="border rounded px-2 py-1 text-sm"
                        >
                          <option value="important">Important</option>
                          <option value="normal">Normal</option>
                          <option value="delayed">Delayed</option>
                        </select>
                        <button
                          onClick={() => deleteNote(note.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotesPage;
