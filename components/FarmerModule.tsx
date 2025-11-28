import React, { useState } from 'react';
import { Button, Input, VoiceInput, IconLeaf } from './Shared';
import { MilletType, Submission, SubmissionStatus, User } from '../types';
import { ESTIMATED_PRICES, LAB_NAME } from '../constants';

interface FarmerModuleProps {
  user: User;
  screen: string;
  navigate: (s: string) => void;
  submissions: Submission[];
  addSubmission: (s: Submission) => void;
  payments: any[];
}

export const FarmerDashboard = ({ navigate, submissions, payments }: any) => {
  const pendingPayments = payments.filter((p: any) => p.status === 'Pending').length;
  const recentSubmissions = submissions.length;

  return (
    <div className="p-6 pb-24">
      <h1 className="text-2xl font-heading font-bold text-earthBrown mb-6">Farmer Dashboard</h1>
      
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border-l-4 border-milletGold">
        <h2 className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Summary</h2>
        <div className="mt-2 flex justify-between">
          <div>
             <span className="block text-3xl font-bold text-agriGreen">{recentSubmissions}</span>
             <span className="text-xs text-gray-500">Total Submissions</span>
          </div>
          <div className="text-right">
             <span className="block text-3xl font-bold text-earthBrown">{pendingPayments}</span>
             <span className="text-xs text-gray-500">Pending Payments</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => navigate('farmer_add')} className="bg-agriGreen text-white p-4 rounded-xl shadow-md flex flex-col items-center justify-center gap-2 hover:bg-green-800 transition">
          <IconLeaf />
          <span className="font-medium">Add Millet</span>
        </button>
        <button onClick={() => navigate('farmer_submissions')} className="bg-milletGold text-white p-4 rounded-xl shadow-md flex flex-col items-center justify-center gap-2 hover:bg-yellow-600 transition">
          <span className="text-xl font-bold">📋</span>
          <span className="font-medium">Submissions</span>
        </button>
        <button onClick={() => navigate('farmer_payments')} className="bg-white text-earthBrown p-4 rounded-xl shadow-md flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition border border-gray-100">
          <span className="text-xl">₹</span>
          <span className="font-medium">Payments</span>
        </button>
        <button onClick={() => navigate('profile')} className="bg-white text-earthBrown p-4 rounded-xl shadow-md flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition border border-gray-100">
          <span className="text-xl">👤</span>
          <span className="font-medium">Profile</span>
        </button>
      </div>
    </div>
  );
};

export const AddMillet = ({ navigate, addSubmission, user }: any) => {
  const [type, setType] = useState<MilletType>(MilletType.FOXTAIL);
  const [qty, setQty] = useState('');
  const [unit, setUnit] = useState('kg');
  const [notes, setNotes] = useState(''); // Added to demonstrate Voice Input usage for farmers

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSub: Submission = {
      id: `sub_${Date.now()}`,
      farmerId: user.id,
      milletType: type,
      quantity: Number(qty),
      unit,
      photoUrl: `https://picsum.photos/400/300?random=${Date.now()}`,
      marketPricePerKg: ESTIMATED_PRICES[type],
      status: SubmissionStatus.SUBMITTED,
      submittedAt: Date.now(),
      labName: LAB_NAME,
    };
    addSubmission(newSub);
    navigate('farmer_submissions');
  };

  return (
    <div className="p-6 pb-24">
      <h1 className="text-2xl font-heading font-bold text-earthBrown mb-6">Add Millet</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-sm">
        <div>
          <label className="block text-earthBrown text-sm font-semibold mb-2">Millet Type</label>
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value as MilletType)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-milletGold bg-white text-earthBrown"
          >
            {Object.values(MilletType).map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
             <Input label="Quantity" type="number" value={qty} onChange={(e: any) => setQty(e.target.value)} required placeholder="0.0" />
          </div>
          <div className="w-1/3">
            <label className="block text-earthBrown text-sm font-semibold mb-2">Unit</label>
            <select 
              value={unit} 
              onChange={(e) => setUnit(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-milletGold bg-white text-earthBrown"
            >
              <option value="kg">kg</option>
              <option value="qtl">qtl</option>
              <option value="ton">ton</option>
            </select>
          </div>
        </div>

        <div className="p-4 bg-softBeige rounded-lg">
          <span className="text-xs text-earthBrown uppercase tracking-wider font-bold">Estimated Price</span>
          <div className="text-2xl font-bold text-agriGreen">₹{ESTIMATED_PRICES[type]}/kg</div>
        </div>

        {/* Added Voice Input Feature */}
        <VoiceInput 
          label="Additional Notes (Optional - Speak to add)" 
          value={notes} 
          onChange={setNotes} 
          placeholder="e.g., Organic, harvested yesterday..." 
          multiline 
        />

        <Button type="submit" className="w-full mt-4">Submit Produce</Button>
      </form>
    </div>
  );
};

export const SubmissionsList = ({ submissions }: { submissions: Submission[] }) => {
  return (
    <div className="p-6 pb-24">
      <h1 className="text-2xl font-heading font-bold text-earthBrown mb-6">My Submissions</h1>
      <div className="space-y-4">
        {submissions.length === 0 && <p className="text-gray-500 text-center mt-10">No submissions yet.</p>}
        {submissions.map((sub) => (
          <div key={sub.id} className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-milletGold">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-heading font-bold text-lg text-earthBrown">{sub.milletType}</h3>
              <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">{new Date(sub.submittedAt).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-600 mb-2">{sub.quantity} {sub.unit}</p>
            
            {/* Timeline UI */}
            <div className="mt-4 border-t pt-4">
               <Timeline status={sub.status} />
            </div>

            {sub.status === SubmissionStatus.APPROVED && (
              <div className="mt-3 text-center">
                 <span className="inline-block px-3 py-1 bg-green-100 text-agriGreen text-xs font-bold rounded-full">Added to Marketplace</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Timeline = ({ status }: { status: SubmissionStatus }) => {
  const steps = [
    { label: 'Submitted', active: true },
    { label: 'Lab Test', active: status !== SubmissionStatus.SUBMITTED },
    { label: status === SubmissionStatus.REJECTED ? 'Rejected' : 'Approved', active: status === SubmissionStatus.APPROVED || status === SubmissionStatus.REJECTED, error: status === SubmissionStatus.REJECTED },
  ];

  return (
    <div className="flex justify-between items-center relative">
       {/* Line */}
       <div className="absolute top-2 left-0 w-full h-0.5 bg-gray-200 -z-10"></div>
       {steps.map((step, idx) => (
         <div key={idx} className="flex flex-col items-center">
            <div className={`w-4 h-4 rounded-full border-2 ${step.active ? (step.error ? 'bg-red-500 border-red-500' : 'bg-agriGreen border-agriGreen') : 'bg-white border-gray-300'}`}></div>
            <span className={`text-[10px] mt-1 ${step.active ? 'text-earthBrown font-bold' : 'text-gray-400'}`}>{step.label}</span>
         </div>
       ))}
    </div>
  );
};

export const PaymentHistory = ({ payments }: any) => {
  return (
    <div className="p-6 pb-24">
      <h1 className="text-2xl font-heading font-bold text-earthBrown mb-6">Payment History</h1>
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-softBeige text-earthBrown uppercase text-xs font-bold">
            <tr>
              <th className="p-4">Millet</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p: any) => (
              <tr key={p.id} className="border-b border-gray-100 last:border-0">
                <td className="p-4">
                  <div className="font-bold text-earthBrown">{p.milletType}</div>
                  <div className="text-xs text-gray-400">{new Date(p.date).toLocaleDateString()}</div>
                </td>
                <td className="p-4 font-bold">₹{p.amount}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs ${p.status === 'Paid' ? 'bg-green-100 text-agriGreen' : 'bg-yellow-100 text-yellow-800'}`}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-center">
        <Button variant="ghost" className="w-full text-sm">Download CSV</Button>
      </div>
    </div>
  );
};
