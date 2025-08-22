import React, { useState } from 'react';

// Define the type for the props
interface EditTranscriptPopupProps {
  transcript: {
    text: string | null;
    date: string | null;
  };
  onClose: () => void;
  onSave: (oldTranscript: { text: string | null; date: string | null }, newText: string) => void;
}

const EditTranscriptPopup: React.FC<EditTranscriptPopupProps> = ({ transcript, onClose, onSave }) => {
  const [editedText, setEditedText] = useState(transcript.text || '');

  const handleSave = () => {
    onSave(transcript, editedText);
  };

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4 text-black">Edit Transcript</h2>
        <textarea
          className="w-full h-32 p-2 border rounded-md text-black"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTranscriptPopup;