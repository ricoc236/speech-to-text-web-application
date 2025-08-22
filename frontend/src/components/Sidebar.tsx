import { Home, FileText, Mic } from "lucide-react";
import { useSidebar } from "./SidebarContext";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditTranscriptPopup from './EditTranscript';


type Transcript = {
  text: string | null;
  date: string | null;
};

const Sidebar = () => {
  const { isOpen } = useSidebar();
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTranscript, setSelectedTranscript] = useState<Transcript | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null); 
  useEffect(() => {
    const fetchTranscripts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/history`, {
          method: 'GET',
          credentials: 'include'
        });

        if (!response.ok) {
          console.error("Failed to fetch transcripts with status:", response.status);
          return;
        }

        const data = await response.json();
        if (data && data.transcriptions) {
          setTranscripts(data.transcriptions);
        } else {
          console.error("No transcripts array found in the response.");
        }
      } catch (error) {
        console.error("Error fetching transcripts:", error);
      }
    };

    if (isOpen) {
      fetchTranscripts();
    }
  }, [isOpen]);

  const handleEditClick = (transcript: Transcript, index : number) => {
    setSelectedTranscript(transcript);
    setSelectedIndex(index);
    setIsPopupOpen(true);
  };
  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setSelectedTranscript(null);
  };

const handleSaveTranscript = async (oldTranscript: Transcript, newText: string) => {
  // Update local state first for a more responsive UI
  setTranscripts(prevTranscripts =>
    prevTranscripts.map(t => t === oldTranscript ? { ...t, text: newText } : t)
  );
  
  // Make the API call to update the backend
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/history/update/${selectedIndex}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newText }) 
    });

    if (!response.ok) {
      console.error("Failed to save transcript to backend.");
    
    }

  
    handlePopupClose();
  } catch (error) {
    console.error("Error saving transcript:", error);
    
  }
};
  return (
    <>
      <div
        className={`fixed top-0 left-0 h-screen z-40
          ${isOpen ? "w-150" : "w-0"}
          bg-[#85D1DB] text-gray-100 border-r shadow-sm transition-all duration-300 flex flex-col`}
      >
        {/* Transcripts container */}
        <div className="flex-1 p-2 mt-12 overflow-y-auto">
          {isOpen && <h2 className="text-xl font-bold p-2">Transcripts</h2>}
          <ul className="space-y-2">
            {transcripts.map((transcript, index) => (
              <li
                key={index}
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-700 cursor-pointer"
                onClick={() => handleEditClick(transcript, index)}
              >
                {isOpen && <span>{index + 1}.</span>}
                <FileText size={20} />
                {isOpen && (
                  <span>
                    {transcript.text || "No text available"}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Fixed bottom navigation */}
        {isOpen && (
          <div className="p-2 border-t border-gray-600">
            <ul className="space-y-2">
              <Link to="/" className="flex items-center gap-2 p-2 rounded hover:bg-gray-700 cursor-pointer">
                <Home size={20} />
                {isOpen && <span>Home</span>}
              </Link>
              <Link to="/recorder" className="flex items-center gap-2 p-2 rounded hover:bg-gray-700 cursor-pointer">
                <Mic size={20} />
                {isOpen && <span>Recorder</span>}
              </Link>
            </ul>
          </div>
        )}
      </div>

      {isPopupOpen && selectedTranscript && (
        <EditTranscriptPopup
          transcript={selectedTranscript}
          onClose={handlePopupClose}
          onSave={handleSaveTranscript}
        />
      )}
    </>
  );
};

export default Sidebar;