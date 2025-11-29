import React, { useState, useMemo, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { Plus, Trash2, Printer, IndianRupee, PieChart as PieIcon, Calculator, User, Box, ArrowLeft, Receipt, Paperclip, Eye, LogOut, Lock, Shield } from 'lucide-react';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#6366F1', '#14B8A6'];

const TEAM_MEMBERS = ["Zafar", "Yash", "Shobhit", "Inzy", "Nomaan", "Sani", "Kabir"];

// Authorized users with IDs and passwords
const AUTHORIZED_USERS = {
  "admin": "qwerty@12345",

};

// Login Component
const LoginView = ({ onLogin }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!userId || !password) {
      setError("Please enter both User ID and Password");
      return;
    }

    const lowerUserId = userId.toLowerCase();
    if (AUTHORIZED_USERS[lowerUserId] && AUTHORIZED_USERS[lowerUserId] === password) {
      onLogin(lowerUserId);
    } else {
      setError("Invalid User ID or Password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Budget Report</h1>
          <p className="text-slate-500">Enter your credentials to access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-slate-700 mb-2">
              User ID
            </label>
            <input
              id="userId"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter your User ID"
              autoComplete="username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter your Password"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-200">
          <p className="text-xs text-slate-500 text-center">
            Authorized users only. Contact administrator for access.
          </p>
        </div>
      </div>
    </div>
  );
};

// Invoice Template Component
const InvoiceView = ({ person, items, total, onBack }) => {
  const date = new Date().toLocaleDateString();
  
  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden print:shadow-none print:max-w-full">
        
        {/* Invoice Toolbar */}
        <div className="bg-slate-800 text-white p-4 flex justify-between items-center no-print">
          <button onClick={onBack} className="flex items-center gap-2 hover:text-blue-300 transition-colors">
            <ArrowLeft size={18} /> Back to Dashboard
          </button>
          <button onClick={() => window.print()} className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Printer size={18} /> Print Claim Slip
          </button>
        </div>

        {/* Invoice Content */}
        <div className="p-8 md:p-12 print:p-0">
          <div className="border-b-2 border-slate-100 pb-8 mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 uppercase tracking-wide">Expense Claim</h1>
              <p className="text-slate-500 mt-1">Reimbursement Slip</p>
            </div>
            <div className="text-right">
              <div className="font-bold text-xl text-slate-800">{person}</div>
              <div className="text-slate-500 text-sm">Team Member</div>
              <div className="mt-2 text-slate-400 text-sm">Date: {date}</div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase text-slate-400 mb-4 tracking-wider">Expense Details</h3>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 font-semibold text-slate-600 w-1/4">Invoice / Bill #</th>
                  <th className="py-3 font-semibold text-slate-600 w-1/2">Item Description</th>
                  <th className="py-3 font-semibold text-slate-600 text-right">Amount</th>
                  <th className="py-3 font-semibold text-slate-600 text-center w-1/12 print:hidden">Ref</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.length === 0 ? (
                  <tr><td colSpan="4" className="py-8 text-center text-slate-400 italic">No expenses recorded.</td></tr>
                ) : (
                  items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-4 text-slate-600 font-mono text-sm">{item.invoice || "N/A"}</td>
                      <td className="py-4">
                        <div className="font-medium text-slate-900">{item.name}</div>
                        <div className="text-sm text-slate-500">{item.description}</div>
                        {item.attachmentName && (
                          <div className="text-xs text-blue-500 mt-1 flex items-center gap-1 print:text-slate-400">
                            <Paperclip size={10} /> Receipt Attached: {item.attachmentName}
                          </div>
                        )}
                      </td>
                      <td className="py-4 text-right font-bold text-slate-800">₹{item.amount.toLocaleString()}</td>
                      <td className="py-4 text-center print:hidden">
                        {item.attachment && (
                           <a href={item.attachment} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800" title="View Receipt">
                             <Eye size={16} />
                           </a>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-slate-800">
                  <td colSpan="2" className="pt-4 text-right font-bold text-slate-900 uppercase text-sm">Total Claim Amount</td>
                  <td className="pt-4 text-right font-bold text-2xl text-blue-600">₹{total.toLocaleString()}</td>
                  <td className="print:hidden"></td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 grid grid-cols-2 gap-12">
            <div>
              <div className="h-16 border-b border-slate-300 mb-2"></div>
              <p className="text-xs text-slate-400 uppercase font-bold">Signature of Claimant</p>
            </div>
            <div>
              <div className="h-16 border-b border-slate-300 mb-2"></div>
              <p className="text-xs text-slate-400 uppercase font-bold">Approved By</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  // Load data from localStorage on initial load
  const loadFromStorage = (key, defaultValue) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return defaultValue;
    }
  };

  // Save data to localStorage
  const saveToStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  const defaultItems = [
    { id: 1, name: "Frame Construction", person: "Yash", amount: 3000, invoice: "INV-001", description: "Frame base materials", attachment: null, attachmentName: null },
    { id: 2, name: "Structural Parts", person: "Nomaan", amount: 1760, invoice: "BILL-29A", description: "Frame (1130) + Rod (350) + Joints (280)", attachment: null, attachmentName: null },
    { id: 3, name: "Mech & Electrical", person: "Zafar", amount: 6485, invoice: "", description: "Nutbolt (1850) + Bearing (250) + Elect (2380)", attachment: null, attachmentName: null },
    { id: 4, name: "Adv. Electronics", person: "Shobhit", amount: 8279, invoice: "AMZ-9923", description: "Electronics (2000) + 3D Print + Lipo Battery", attachment: null, attachmentName: null },
    { id: 5, name: "Basic Electronics", person: "Kabir", amount: 2000, invoice: "", description: "General Electronics components", attachment: null, attachmentName: null },
    { id: 6, name: "Logistics", person: "Inzy", amount: 0, invoice: "", description: "Transport & Misc", attachment: null, attachmentName: null },
    { id: 7, name: "Testing Bed", person: "Sani", amount: 0, invoice: "", description: "Testing equipment", attachment: null, attachmentName: null },
  ];

  const [projectName, setProjectName] = useState(() => loadFromStorage('budget-projectName', "Hardware Project Expenses"));
  const [totalBudget, setTotalBudget] = useState(() => loadFromStorage('budget-totalBudget', 30000));
  const [viewInvoiceFor, setViewInvoiceFor] = useState(null);
  
  const [items, setItems] = useState(() => loadFromStorage('budget-items', defaultItems));
  
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem('budget-authenticated');
    return savedAuth === 'true';
  });
  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem('budget-currentUser') || null;
  });

  // Handle login
  const handleLogin = (userId) => {
    setIsAuthenticated(true);
    setCurrentUser(userId);
    localStorage.setItem('budget-authenticated', 'true');
    localStorage.setItem('budget-currentUser', userId);
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('budget-authenticated');
    localStorage.removeItem('budget-currentUser');
  };

  // Auto-save to localStorage whenever data changes
  useEffect(() => {
    saveToStorage('budget-projectName', projectName);
  }, [projectName]);

  useEffect(() => {
    saveToStorage('budget-totalBudget', totalBudget);
  }, [totalBudget]);

  useEffect(() => {
    saveToStorage('budget-items', items);
  }, [items]);

  // Calculations
  const totalAllocated = useMemo(() => items.reduce((sum, item) => sum + Number(item.amount), 0), [items]);
  const remainingBudget = totalBudget - totalAllocated;
  const percentageAllocated = Math.round((totalAllocated / totalBudget) * 100);

  const itemsByPerson = useMemo(() => {
    const grouped = {};
    TEAM_MEMBERS.forEach(member => {
      grouped[member] = items.filter(i => i.person === member);
    });
    return grouped;
  }, [items]);

  const personTotals = useMemo(() => {
    const totals = {};
    TEAM_MEMBERS.forEach(member => {
      totals[member] = items
        .filter(i => i.person === member)
        .reduce((sum, i) => sum + Number(i.amount), 0);
    });
    return totals;
  }, [items]);

  // Handlers
  const handleAddItemForPerson = (personName) => {
    const newItem = {
      id: Date.now(),
      name: "New Component",
      person: personName,
      amount: 0,
      invoice: "",
      description: "Details...",
      attachment: null,
      attachmentName: null
    };
    setItems([...items, newItem]);
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleUpdateItem = (id, field, value) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleFileUpload = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setItems(items.map(item => 
        item.id === id ? { ...item, attachment: url, attachmentName: file.name } : item
      ));
    }
  };

  const chartData = useMemo(() => {
    const aggregated = items.reduce((acc, item) => {
      const val = Number(item.amount);
      const name = item.name.trim() || "Untitled";
      if (val > 0) {
        acc[name] = (acc[name] || 0) + val;
      }
      return acc;
    }, {});

    const data = Object.entries(aggregated).map(([name, value]) => ({ name, value }));
    
    if (remainingBudget > 0) {
      data.push({ name: "Unallocated", value: remainingBudget, isRemaining: true });
    }
    return data;
  }, [items, remainingBudget]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-md text-sm">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="text-slate-600">
            ₹{payload[0].value.toLocaleString()} 
            <span className="text-slate-400 ml-1">
              ({((payload[0].value / totalBudget) * 100).toFixed(1)}%)
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Render Invoice View if selected
  if (viewInvoiceFor) {
    return (
      <InvoiceView 
        person={viewInvoiceFor} 
        items={itemsByPerson[viewInvoiceFor]} 
        total={personTotals[viewInvoiceFor]} 
        onBack={() => setViewInvoiceFor(null)} 
      />
    );
  }

  // Dashboard Render
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 md:p-8 print:p-0 print:bg-white">
      
      {/* Print Styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-full { width: 100% !important; }
          body { background: white; }
          .card-shadow { box-shadow: none !important; border: 1px solid #ddd; }
          .break-inside-avoid { break-inside: avoid; }
        }
      `}</style>

      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6 mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Project Budget Report</div>
              {isAuthenticated ? (
                <div className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  <Shield size={12} />
                  <span>Authenticated</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                  <Lock size={12} />
                  <span>View Only</span>
                </div>
              )}
            </div>
            <input 
              type="text" 
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              readOnly={!isAuthenticated}
              className="text-3xl md:text-4xl font-bold bg-transparent border-none focus:ring-0 focus:outline-none placeholder-slate-300 w-full md:w-auto text-slate-900 disabled:opacity-75"
            />
            <div className="text-slate-500 mt-1">
              Generated: {new Date().toLocaleDateString()}
              {isAuthenticated && currentUser ? (
                <span className="ml-2 text-xs">• Logged in as: <span className="font-semibold capitalize">{currentUser}</span></span>
              ) : (
                <span className="ml-2 text-xs text-yellow-600">• Login required to edit</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 no-print">
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors shadow-sm"
            >
              <Printer size={18} />
              <span>Print Report</span>
            </button>
            {isAuthenticated ? (
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                title="Logout"
              >
                <LogOut size={18} />
                <span className="hidden md:inline">Logout</span>
              </button>
            ) : (
              <button 
                onClick={() => {
                  // Show a simple login modal
                  const userId = prompt("Enter User ID to login and edit:");
                  if (userId) {
                    const password = prompt("Enter Password:");
                    if (password) {
                      const lowerUserId = userId.toLowerCase();
                      if (AUTHORIZED_USERS[lowerUserId] && AUTHORIZED_USERS[lowerUserId] === password) {
                        handleLogin(lowerUserId);
                        alert("Login successful! You can now edit the report.");
                      } else {
                        alert("Invalid User ID or Password");
                      }
                    }
                  }
                }}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                title="Login to Edit"
              >
                <Lock size={18} />
                <span className="hidden md:inline">Login to Edit</span>
              </button>
            )}
          </div>
        </header>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card-shadow bg-white p-6 rounded-xl border-l-4 border-blue-500">
            <div className="flex justify-between items-start mb-2">
              <span className="text-slate-500 font-medium text-sm">Total Budget</span>
              <IndianRupee size={18} className="text-blue-500" />
            </div>
            <div className="flex items-center text-3xl font-bold text-slate-900">
              <span className="text-xl mr-1 self-start mt-1">₹</span>
              <input 
                type="number" 
                value={totalBudget}
                onChange={(e) => setTotalBudget(Number(e.target.value))}
                readOnly={!isAuthenticated}
                className="w-full bg-transparent border-none focus:ring-0 p-0 disabled:opacity-75"
              />
            </div>
            <p className="text-xs text-slate-400 mt-1">Click to edit total funds</p>
          </div>

          <div className="card-shadow bg-white p-6 rounded-xl border-l-4 border-emerald-500">
             <div className="flex justify-between items-start mb-2">
              <span className="text-slate-500 font-medium text-sm">Allocated Funds</span>
              <PieIcon size={18} className="text-emerald-500" />
            </div>
            <div className="text-3xl font-bold text-slate-900">
              ₹{totalAllocated.toLocaleString()}
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 mt-3">
              <div 
                className="bg-emerald-500 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${Math.min(percentageAllocated, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-400 mt-1">{percentageAllocated}% of budget used</p>
          </div>

          <div className={`card-shadow bg-white p-6 rounded-xl border-l-4 ${remainingBudget < 0 ? 'border-red-500' : 'border-slate-300'}`}>
             <div className="flex justify-between items-start mb-2">
              <span className="text-slate-500 font-medium text-sm">Remaining</span>
              <Calculator size={18} className={remainingBudget < 0 ? 'text-red-500' : 'text-slate-400'} />
            </div>
            <div className={`text-3xl font-bold ${remainingBudget < 0 ? 'text-red-500' : 'text-slate-900'}`}>
              ₹{remainingBudget.toLocaleString()}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {remainingBudget < 0 ? "Over Budget Warning" : "Available for unexpected costs"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main List Section - NOW GROUPED BY PERSON */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-end mb-2">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <User size={20} className="text-slate-500"/>
                Member Expense Sheets
              </h2>
            </div>

            {TEAM_MEMBERS.map((member) => (
              <div key={member} className="card-shadow bg-white rounded-xl overflow-hidden border border-slate-200 break-inside-avoid">
                {/* Member Header */}
                <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                      {member.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-800 leading-none">{member}</h3>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setViewInvoiceFor(member)}
                      className="flex items-center gap-1 bg-white border border-slate-200 shadow-sm text-slate-600 text-xs px-3 py-1.5 rounded hover:bg-slate-50 hover:text-blue-600 transition-colors no-print"
                    >
                      <Receipt size={14} />
                      View Claim Slip
                    </button>
                  </div>
                </div>

                {/* Member Items Table */}
                <div className="p-0">
                   <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-xs uppercase text-slate-400 font-medium">
                        <th className="p-3 pl-4 w-3/12">Component</th>
                        <th className="p-3 w-3/12">Notes</th>
                        <th className="p-3 w-3/12">Invoice / Bill</th>
                        <th className="p-3 w-2/12 text-right">Amount</th>
                        <th className="p-3 w-1/12 text-center no-print"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {itemsByPerson[member].length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-4 text-center text-slate-400 text-sm italic">
                            No expenses added yet.
                          </td>
                        </tr>
                      )}
                      {itemsByPerson[member].map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 group">
                          <td className="p-2 pl-4">
                            <input 
                              type="text" 
                              value={item.name}
                              onChange={(e) => handleUpdateItem(item.id, 'name', e.target.value)}
                              readOnly={!isAuthenticated}
                              className="w-full font-medium bg-transparent border-none focus:ring-0 p-1 text-slate-800 placeholder-slate-400 rounded hover:bg-white focus:bg-white focus:shadow-sm transition-all disabled:opacity-75 disabled:cursor-not-allowed"
                              placeholder="Item Name"
                            />
                          </td>
                          <td className="p-2">
                            <input 
                              type="text" 
                              value={item.description}
                              onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                              readOnly={!isAuthenticated}
                              className="w-full text-sm text-slate-500 bg-transparent border-none focus:ring-0 p-1 placeholder-slate-300 rounded hover:bg-white focus:bg-white focus:shadow-sm transition-all disabled:opacity-75 disabled:cursor-not-allowed"
                              placeholder="Description"
                            />
                          </td>
                          <td className="p-2">
                            <div className="flex items-center gap-2">
                              <input 
                                type="text" 
                                value={item.invoice}
                                onChange={(e) => handleUpdateItem(item.id, 'invoice', e.target.value)}
                                readOnly={!isAuthenticated}
                                className="w-full text-sm font-mono text-blue-600 bg-transparent border-none focus:ring-0 p-1 placeholder-slate-300 rounded hover:bg-white focus:bg-white focus:shadow-sm transition-all disabled:opacity-75 disabled:cursor-not-allowed"
                                placeholder="No."
                              />
                              {isAuthenticated && (
                                <label className="cursor-pointer text-slate-400 hover:text-blue-600 flex-shrink-0" title="Attach Receipt">
                                  <input type="file" className="hidden" onChange={(e) => handleFileUpload(item.id, e)} accept="image/*,application/pdf" />
                                  {item.attachment ? <Eye size={16} className="text-blue-600" /> : <Paperclip size={16} />}
                                </label>
                              )}
                              {!isAuthenticated && item.attachment && (
                                <a href={item.attachment} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800" title="View Receipt">
                                  <Eye size={16} />
                                </a>
                              )}
                            </div>
                            {item.attachmentName && <div className="text-[10px] text-slate-400 truncate max-w-[100px] pl-1">{item.attachmentName}</div>}
                          </td>
                          <td className="p-2 text-right">
                            <input 
                              type="number" 
                              value={item.amount}
                              onChange={(e) => handleUpdateItem(item.id, 'amount', Number(e.target.value))}
                              readOnly={!isAuthenticated}
                              className="w-full text-right font-mono text-slate-700 bg-transparent border-none focus:ring-0 p-1 rounded hover:bg-white focus:bg-white focus:shadow-sm transition-all disabled:opacity-75 disabled:cursor-not-allowed"
                            />
                          </td>
                          <td className="p-2 text-center no-print">
                            {isAuthenticated && (
                              <button 
                                onClick={() => handleDeleteItem(item.id)}
                                className="text-slate-300 hover:text-red-500 transition-colors p-1"
                                title="Delete"
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                   </table>
                </div>

                {/* Add Button per person */}
                {isAuthenticated && (
                  <div className="p-3 border-t border-slate-100 bg-slate-50/50 no-print">
                    <button 
                      onClick={() => handleAddItemForPerson(member)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full"
                    >
                      <Plus size={14} />
                      Add Expense for {member}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Visualization Section - Kept sticky on the right */}
          <div className="lg:col-span-1 space-y-6">
            <div className="card-shadow bg-white p-6 rounded-xl border border-slate-200 sticky top-6">
              <h3 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2">
                <Box size={18} className="text-slate-400"/>
                Overall Breakdown
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.isRemaining ? '#E2E8F0' : COLORS[index % COLORS.length]} 
                          stroke="none"
                        />
                      ))}
                    </Pie>
                    <RechartsTooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {chartData.map((entry, index) => (
                  !entry.isRemaining && (
                    <div key={index} className="flex justify-between items-center text-sm border-b border-slate-50 last:border-0 pb-1 last:pb-0">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-2.5 h-2.5 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span className="text-slate-600 truncate max-w-[120px]" title={entry.name}>
                          {entry.name}
                        </span>
                      </div>
                      <div className="text-right">
                         <span className="block font-bold text-slate-800 text-xs">₹{entry.value.toLocaleString()}</span>
                      </div>
                    </div>
                  )
                ))}
                {remainingBudget > 0 && (
                   <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-100 mt-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                        <span className="text-slate-600">Unallocated</span>
                      </div>
                      <span className="font-mono font-medium text-slate-700">
                        {Math.round((remainingBudget / totalBudget) * 100)}%
                      </span>
                    </div>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Footer Notes */}
        <div className="border-t border-slate-200 pt-6 text-sm text-slate-500">
          <p><strong>Note:</strong> This report is for planning purposes only. Ensure actual quotes are obtained before finalizing budget allocations.</p>
        </div>
      </div>
    </div>
  );
}