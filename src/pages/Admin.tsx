import { useState, useEffect } from "react";
import { Users, Award, Trash2, Plus, Edit2, ShieldCheck, Check, X, Camera, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { villages, initialReports, WasteReport } from "../data/mockData";

const INITIAL_USERS = [
  { id: "u1", name: "Ramesh Kumar", village: "Dharampura", points: 120, plastic_contributed: 15 },
  { id: "u2", name: "Suresh Singh", village: "Sarangpur", points: 80, plastic_contributed: 8 },
  { id: "u3", name: "Anita Devi", village: "Udaypur", points: 250, plastic_contributed: 35 },
  { id: "u4", name: "Vikram Yadav", village: "Bharni", points: 50, plastic_contributed: 5 },
];

const INITIAL_REWARDS = [
  { id: "r1", name: "Mobile Recharge (₹50)", points_required: 100, icon: "Smartphone" },
  { id: "r2", name: "Grocery Discount (10%)", points_required: 200, icon: "ShoppingBag" },
  { id: "r3", name: "Farming Seeds Packet", points_required: 300, icon: "Sprout" },
  { id: "r4", name: "School Supplies Kit", points_required: 400, icon: "BookOpen" },
];

export default function Admin() {
  const [users, setUsers] = useState<any[]>([]);
  const [rewards, setRewards] = useState<any[]>([]);
  const [reports, setReports] = useState<WasteReport[]>([]);
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    let initialU = INITIAL_USERS;
    let initialR = INITIAL_REWARDS;

    const storedUsers = localStorage.getItem("sc_users");
    const storedRewards = localStorage.getItem("sc_rewards");
    const storedReports = localStorage.getItem("wasteReports");

    if (storedUsers) {
      initialU = JSON.parse(storedUsers);
    } else {
      localStorage.setItem("sc_users", JSON.stringify(INITIAL_USERS));
    }

    if (storedRewards) {
      initialR = JSON.parse(storedRewards);
    } else {
      localStorage.setItem("sc_rewards", JSON.stringify(INITIAL_REWARDS));
    }

    if (storedReports) {
      setReports(JSON.parse(storedReports));
    } else {
      setReports(initialReports);
      localStorage.setItem("wasteReports", JSON.stringify(initialReports));
    }

    setUsers(initialU);
    setRewards(initialR);
  }, []);

  const handleAction = (userId: string, points: number) => {
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) return;

    const newUsers = [...users];
    newUsers[userIndex] = { ...newUsers[userIndex], points: newUsers[userIndex].points + points };
    
    setUsers(newUsers);
    localStorage.setItem("sc_users", JSON.stringify(newUsers));
    
    setActionMessage(`Added ${points} points to ${newUsers[userIndex].name}.`);
    setTimeout(() => setActionMessage(""), 3000);

    const storedVillages = localStorage.getItem("sc_villages");
    if (storedVillages) {
      const vData = JSON.parse(storedVillages);
      const villageIndex = vData.findIndex((v: any) => v.name === newUsers[userIndex].village);
      if (villageIndex !== -1) {
        vData[villageIndex].points_earned += points;
        localStorage.setItem("sc_villages", JSON.stringify(vData));
      }
    }
  };

  const handleAddUser = () => {
    const name = window.prompt("Enter new user name:");
    if (!name) return;
    const villageName = window.prompt(`Enter village name (e.g. ${villages[0].name}):`);
    if (!villageName) return;

    const newUser = { id: `u${Date.now()}`, name, village: villageName, points: 0, plastic_contributed: 0 };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("sc_users", JSON.stringify(updatedUsers));
    setActionMessage(`Added user ${name}`);
    setTimeout(() => setActionMessage(""), 3000);
  };

  const handleDeleteUser = (id: string) => {
    if (window.confirm("Delete this user?")) {
      const updated = users.filter(u => u.id !== id);
      setUsers(updated);
      localStorage.setItem("sc_users", JSON.stringify(updated));
      setActionMessage("User deleted.");
      setTimeout(() => setActionMessage(""), 3000);
    }
  };

  const handleAddReward = () => {
    const name = window.prompt("Enter new reward name:");
    if (!name) return;
    const pointsStr = window.prompt("Enter points required for this reward:");
    if (!pointsStr || isNaN(Number(pointsStr))) return;
    const pointsReq = Number(pointsStr);
    
    const newReward = { id: `r${Date.now()}`, name, points_required: pointsReq, icon: "Gift" };
    const updatedRewards = [...rewards, newReward];
    
    setRewards(updatedRewards);
    localStorage.setItem("sc_rewards", JSON.stringify(updatedRewards));
    setActionMessage(`Added new reward: ${name}`);
    setTimeout(() => setActionMessage(""), 3000);
  };

  const handleDeleteReward = (id: string) => {
    if (window.confirm("Are you sure you want to delete this reward?")) {
      const updatedRewards = rewards.filter(r => r.id !== id);
      setRewards(updatedRewards);
      localStorage.setItem("sc_rewards", JSON.stringify(updatedRewards));
      setActionMessage("Reward deleted.");
      setTimeout(() => setActionMessage(""), 3000);
    }
  };

  const handleApproveReport = (reportId: string, weight: number, villageId: string) => {
    const updatedReports = reports.map(r => r.id === reportId ? { ...r, status: 'approved' as const } : r);
    setReports(updatedReports);
    localStorage.setItem("wasteReports", JSON.stringify(updatedReports));

    const storedVillages = localStorage.getItem("sc_villages");
    if (storedVillages) {
      const vData = JSON.parse(storedVillages);
      const vIndex = vData.findIndex((v: any) => v.name === villageId || v.id === villageId);
      if (vIndex !== -1) {
        vData[vIndex].points_earned += Math.floor(weight * 10);
        vData[vIndex].plastic_collected += weight;
        localStorage.setItem("sc_villages", JSON.stringify(vData));
      }
    }
    setActionMessage(`Report approved & points awarded to village!`);
    setTimeout(() => setActionMessage(""), 3000);
  };

  const handleRejectReport = (reportId: string) => {
    const updatedReports = reports.map(r => r.id === reportId ? { ...r, status: 'rejected' as const } : r);
    setReports(updatedReports);
    localStorage.setItem("wasteReports", JSON.stringify(updatedReports));
    setActionMessage(`Report rejected.`);
    setTimeout(() => setActionMessage(""), 3000);
  };

  const pendingReports = reports.filter(r => !r.status || r.status === 'pending');

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-blue-600" />
            Admin Dashboard
          </h1>
          <p className="text-slate-500 mt-2">Manage users, approve waste reports, and track contributions.</p>
        </div>
      </header>

      {actionMessage && (
        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl border border-emerald-200 font-medium animate-in fade-in slide-in-from-top-4 duration-300 flex items-center gap-2">
          <Check className="w-5 h-5" />
          {actionMessage}
        </div>
      )}

      {/* Pending Submissions */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-amber-500" /> Pending Waste Reports ({pendingReports.length})
          </h2>
        </div>
        
        {pendingReports.length === 0 ? (
          <p className="text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">No pending reports to process.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {pendingReports.map((report) => {
              const village = villages.find(v => v.id === report.villageId);
              return (
                <div key={report.id} className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 flex flex-col">
                  <div className="h-40 bg-slate-200 relative">
                    {report.imageUrl ? (
                      <img src={report.imageUrl} alt="Waste report" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-slate-400 flex-col gap-2">
                        <Camera className="w-8 h-8 opacity-40" />
                        <span className="text-sm">No image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-1">
                    <div>
                      <h4 className="font-bold text-slate-900">{village?.name || 'Unknown Village'}</h4>
                      <p className="text-sm text-slate-500 mb-2">{report.plasticType}</p>
                      <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md text-sm">
                        {report.weight} kg
                      </span>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button 
                        onClick={() => handleApproveReport(report.id, report.weight, report.villageId)}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-1"
                      >
                        <Check className="w-4 h-4" /> Approve
                      </button>
                      <button 
                        onClick={() => handleRejectReport(report.id)}
                        className="flex-1 bg-white border border-red-200 hover:bg-red-50 hover:text-red-600 text-slate-600 py-2 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-1"
                      >
                        <X className="w-4 h-4" /> Reject
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Management */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-500" /> Manage Users
            </h2>
            <button 
              onClick={handleAddUser}
              className="flex items-center space-x-1 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add User</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-sm uppercase tracking-wider">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Points</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 font-medium text-slate-900">
                      {u.name}
                      <span className="block text-xs text-slate-500 font-normal">{u.village}</span>
                    </td>
                    <td className="py-4 text-emerald-600 font-bold">{u.points}</td>
                    <td className="py-4 text-right space-x-2">
                      <button 
                        onClick={() => handleAction(u.id, 10)}
                        className="px-2 py-1 bg-slate-100 hover:bg-emerald-100 hover:text-emerald-700 text-slate-600 rounded-lg text-xs font-medium transition-colors"
                        title="Add 10 pts for reporting waste"
                      >
                        +10
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(u.id)}
                        className="p-1 px-2 text-slate-400 hover:text-red-600 transition-colors rounded-md hover:bg-red-50 text-xs"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reward Management */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center">
              <Award className="w-5 h-5 mr-2 text-amber-500" /> Manage Rewards
            </h2>
            <button 
              onClick={handleAddReward}
              className="flex items-center space-x-1 text-sm font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Reward</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-sm uppercase tracking-wider">
                  <th className="pb-3 font-medium">Reward</th>
                  <th className="pb-3 font-medium">Cost</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rewards.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 font-medium text-slate-900">{r.name}</td>
                    <td className="py-4 text-emerald-600 font-bold">{r.points_required}</td>
                    <td className="py-4 text-right space-x-2 flex justify-end">
                      <button 
                        onClick={() => {
                          const newName = window.prompt("Edit reward name:", r.name);
                          if (newName) {
                            const newRewards = [...rewards];
                            const idx = newRewards.findIndex(rw => rw.id === r.id);
                            if(idx !== -1) newRewards[idx].name = newName;
                            setRewards(newRewards);
                            localStorage.setItem("sc_rewards", JSON.stringify(newRewards));
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors rounded-md hover:bg-blue-50"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteReward(r.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 transition-colors rounded-md hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
