import React, { useState, useRef, useEffect } from 'react';
import { UserRole } from '../types';
import { transcribeAudio } from '../services/geminiService';

// --- Icons ---
export const IconHome = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
export const IconLeaf = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.77 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>;
export const IconUser = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
export const IconShoppingBag = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>;
export const IconChefHat = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/><line x1="6" y1="17" x2="18" y2="17"/></svg>;
export const IconList = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>;
export const IconCreditCard = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>;
export const IconMic = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>;
export const IconStop = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="6" width="12" height="12" /></svg>;

// --- Components ---

export const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button', disabled = false }: any) => {
  const baseStyle = "px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-agriGreen text-white shadow-md hover:bg-green-800",
    secondary: "bg-accentBlue text-white shadow-md hover:bg-blue-700",
    outline: "border-2 border-agriGreen text-agriGreen hover:bg-agriGreen hover:text-white",
    ghost: "text-earthBrown hover:bg-softBeige"
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`}>
      {children}
    </button>
  );
};

export const Input = ({ label, type = 'text', value, onChange, placeholder, required = false }: any) => (
  <div className="mb-4">
    {label && <label className="block text-earthBrown text-sm font-semibold mb-2">{label}</label>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-milletGold bg-white text-earthBrown"
    />
  </div>
);

interface VoiceInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  multiline?: boolean;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({ label, value, onChange, placeholder, multiline = false }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        setIsProcessing(true);
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        try {
          const text = await transcribeAudio(audioBlob);
          // Append transcription to existing text or replace? Let's append if there's text, otherwise set.
          const newText = value ? `${value} ${text}` : text;
          onChange(newText);
        } catch (err) {
          alert('Failed to transcribe audio.');
        } finally {
          setIsProcessing(false);
          setIsRecording(false);
          stream.getTracks().forEach(track => track.stop());
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Mic error", err);
      alert("Microphone access denied or not available.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
         {label && <label className="block text-earthBrown text-sm font-semibold">{label}</label>}
         <button 
           type="button"
           onClick={isRecording ? stopRecording : startRecording}
           disabled={isProcessing}
           className={`text-xs flex items-center gap-1 px-2 py-1 rounded ${isRecording ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-600'}`}
         >
            {isProcessing ? 'Processing...' : isRecording ? <><IconStop /> Stop</> : <><IconMic /> Voice Input</>}
         </button>
      </div>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-milletGold bg-white text-earthBrown"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-milletGold bg-white text-earthBrown"
        />
      )}
    </div>
  );
};

export const BottomNav = ({ role, currentScreen, navigate }: { role: UserRole, currentScreen: string, navigate: (screen: string) => void }) => {
  const NavItem = ({ screen, icon: Icon, label }: any) => {
    const isActive = currentScreen === screen;
    return (
      <button 
        onClick={() => navigate(screen)}
        className={`flex flex-col items-center justify-center w-full py-3 ${isActive ? 'text-agriGreen' : 'text-gray-400'}`}
      >
        <Icon />
        <span className="text-[10px] mt-1 font-medium">{label}</span>
      </button>
    );
  };

  if (role === UserRole.FARMER) {
    return (
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around pb-safe safe-area-bottom z-50">
        <NavItem screen="farmer_dashboard" icon={IconHome} label="Home" />
        <NavItem screen="farmer_submissions" icon={IconList} label="Submissions" />
        <NavItem screen="farmer_payments" icon={IconCreditCard} label="Payments" />
        <NavItem screen="profile" icon={IconUser} label="Profile" />
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around pb-safe safe-area-bottom z-50">
      <NavItem screen="buyer_home" icon={IconHome} label="Home" />
      <NavItem screen="buyer_marketplace" icon={IconShoppingBag} label="Market" />
      <NavItem screen="buyer_recipes" icon={IconChefHat} label="Recipes" />
      <NavItem screen="profile" icon={IconUser} label="Profile" />
    </div>
  );
};
