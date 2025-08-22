import { useState, useRef, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { MicrophoneIcon } from "@heroicons/react/24/solid"; 
import Sidebar from "../../components/Sidebar";
import { nav } from "framer-motion/client";
import { useNavigate } from "react-router-dom";

export default function Recorder() {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated when the component mounts
    const checkAuthentication = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/getUser`, {
          method: 'GET',
          credentials: 'include'
        });

        // If the user is not authenticated, redirect to login
        if (response.status === 401) {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuthentication();
  }, [navigate]);
  const startRecording = async () => {

    try {

          
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      audioChunksRef.current = [];
      recorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      recorder.onstop = async () => {
        setIsLoading(true); 
        const blob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        const formData = new FormData();
        formData.append("audio", blob, "recording.wav");

        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/transcribe`, {
            method: "POST",
            body: formData,
            credentials: "include", 
          });
          const data = await response.json();
          setTranscript(data.transcript || "No transcription found.");
        } catch (err) {
          console.error("Error sending audio:", err);
          setTranscript("Error transcribing audio.");
        } finally {
          setIsLoading(false);
        }
      };

      setIsRecording(true);
      recorder.start();
      mediaRecorderRef.current = recorder;
    } catch (err) {
      console.error("Microphone access denied:", err);
      alert("Please allow microphone access to record.");
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false); 
  };

  return (
    <div className="flex min-h-screen">
 
      <Sidebar />


      <div className="flex flex-col flex-1">
        <Navbar />
        
        <div className="flex flex-1 justify-center items-center p-6">
          <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
            <h1 className="text-3xl font-bold text-[#85D1DB] mb-4">
              Voice Recorder
            </h1>
            <p className="text-gray-600 mb-6">
              Record your voice and get an instant transcription.
            </p>

            {/* Microphone Icon with Circle */}
            <div className="flex justify-center mb-6">
              <div
                className={`w-20 h-20 flex items-center justify-center rounded-full transition-colors duration-300 ${
                  isRecording ? "bg-red-500 animate-pulse" : "bg-green-500"
                }`}
              >
                <MicrophoneIcon className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Record Button */}
            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isLoading}
              className={`w-full py-3 font-bold text-white rounded-xl transition-colors duration-300 mb-4 ${
                isRecording || isLoading ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
              } ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
            >
              {isRecording ? "Stop Recording" : (isLoading ? "Transcribing..." : "Start Recording")}
            </button>
            {isLoading ? (
              <div className="flex justify-center items-center mt-6">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <p className="ml-3 text-gray-600">Transcribing...</p>
              </div>
            ): (
              transcript && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-left text-gray-700">
                <h2 className="font-semibold mb-2 text-gray-800">Transcript:</h2>
                <p>{transcript}</p>
              </div>
            )

            )}
          </div>
        </div>
      </div>
    </div>
  );
}
