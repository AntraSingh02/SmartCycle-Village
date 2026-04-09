import { useState, useEffect } from "react";
import { Award, Gift, Star, Leaf, TrendingUp, Users, Smartphone, ShoppingBag, Sprout, BookOpen, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import routeResults from "../data/routeResults.json";

const iconMap: Record<string, any> = {
  Smartphone,
  ShoppingBag,
  Sprout,
  BookOpen
};

// Initial data for mocking
const INITIAL_USERS = [
  { id: "u1", name: "Ramesh Kumar", village: "Dharampura", points: 120, plastic_contributed: 15 },
  { id: "u2", name: "Suresh Singh", village: "Sarangpur", points: 80, plastic_contributed: 8 },
  { id: "u3", name: "Anita Devi", village: "Udaypur", points: 250, plastic_contributed: 35 },
  { id: "u4", name: "Vikram Yadav", village: "Bharni", points: 50, plastic_contributed: 5 },
];

const INITIAL_VILLAGES = routeResults.villages.map(v => ({
  name: v.name,
  plastic_collected: v.wasteAmount,
  points_earned: v.wasteAmount * 10
}));

const INITIAL_REWARDS = [
  { id: "r1", name: "Mobile Recharge (₹50)", points_required: 100, icon: "Smartphone" },
  { id: "r2", name: "Grocery Discount (10%)", points_required: 200, icon: "ShoppingBag" },
  { id: "r3", name: "Farming Seeds Packet", points_required: 300, icon: "Sprout" },
  { id: "r4", name: "School Supplies Kit", points_required: 400, icon: "BookOpen" },
];

export default function Rewards() {
  const [users, setUsers] = useState<any[]>([]);
  const [villages, setVillages] = useState<any[]>([]);
  const [rewards, setRewards] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("earn");
  const [currentUser, setCurrentUser] = useState("u1"); // Mock logged-in user
  const [redeemMessage, setRedeemMessage] = useState("");

  useEffect(() => {
    // Load data from localStorage or use initial data
    const storedUsers = localStorage.getItem("sc_users");
    const storedVillages = localStorage.getItem("sc_villages");
    const storedRewards = localStorage.getItem("sc_rewards");

    if (storedUsers) setUsers(JSON.parse(storedUsers));
    else {
      setUsers(INITIAL_USERS);
      localStorage.setItem("sc_users", JSON.stringify(INITIAL_USERS));
    }

    if (storedVillages) setVillages(JSON.parse(storedVillages));
    else {
      setVillages(INITIAL_VILLAGES);
      localStorage.setItem("sc_villages", JSON.stringify(INITIAL_VILLAGES));
    }

    if (storedRewards) setRewards(JSON.parse(storedRewards));
    else {
      setRewards(INITIAL_REWARDS);
      localStorage.setItem("sc_rewards", JSON.stringify(INITIAL_REWARDS));
    }
  }, []);

  const handleRedeem = (rewardId: string) => {
    const reward = rewards.find(r => r.id === rewardId);
    const userIndex = users.findIndex(u => u.id === currentUser);
    
    if (userIndex === -1 || !reward) return;

    const user = users[userIndex];
    if (user.points >= reward.points_required) {
      const newUsers = [...users];
      newUsers[userIndex] = { ...user, points: user.points - reward.points_required };
      setUsers(newUsers);
      localStorage.setItem("sc_users", JSON.stringify(newUsers));
      
      setRedeemMessage(`Successfully redeemed! Remaining points: ${newUsers[userIndex].points}`);
      setTimeout(() => setRedeemMessage(""), 3000);
    } else {
      setRedeemMessage("Error: Insufficient points");
      setTimeout(() => setRedeemMessage(""), 3000);
    }
  };

  const loggedInUser = users.find(u => u.id === currentUser);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10 pb-12">
      
      {/* Section 1: Introduction */}
      <section className="bg-gradient-to-br from-emerald-800 to-emerald-600 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
          <Leaf className="w-96 h-96" />
        </div>
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 bg-emerald-900/40 px-4 py-2 rounded-full text-emerald-100 text-sm font-semibold tracking-wide uppercase">
            <Star className="w-4 h-4" />
            <span>SmartCycle Green Rewards Program</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            स्मार्टसाइकिल ग्रीन रिवार्ड्स <br/> (SmartCycle Green Rewards)
          </h1>
          <p className="text-lg md:text-xl text-emerald-50 leading-relaxed">
            SmartCycle का उद्देश्य ग्रामीण क्षेत्रों में प्लास्टिक कचरे को कम करना और रीसायक्लिंग को बढ़ावा देना है।
            इस कार्यक्रम के तहत गांव के लोग प्लास्टिक कचरे को अलग करके और रिपोर्ट करके ग्रीन पॉइंट्स कमा सकते हैं।
          </p>
          {loggedInUser && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 inline-block border border-white/20">
              <p className="text-emerald-100 text-sm uppercase tracking-wider font-semibold mb-1">Your Green Points</p>
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-bold text-white">{loggedInUser.points}</span>
                <span className="text-emerald-200 font-medium">pts</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: "earn", label: "Earn Points", icon: TrendingUp },
          { id: "catalog", label: "Reward Catalog", icon: Gift },
          { id: "leaderboard", label: "Leaderboard", icon: Award },
          { id: "community", label: "Community Rewards", icon: Users }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-t-xl font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id 
                ? "bg-emerald-50 text-emerald-700 border-b-2 border-emerald-600" 
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Section 2: Earn Green Points */}
      {activeTab === "earn" && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">How to Earn Green Points</h2>
            <p className="text-slate-600 mt-2">Participate in waste management activities to earn points.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { action: "Reporting plastic waste", points: 10, desc: "प्लास्टिक कचरे की रिपोर्ट करें" },
              { action: "Uploading waste photo", points: 15, desc: "कचरे की फोटो अपलोड करें" },
              { action: "Proper plastic segregation", points: 20, desc: "प्लास्टिक को सही से अलग करें" },
              { action: "Giving plastic to collection truck", points: 30, desc: "कलेक्शन ट्रक को प्लास्टिक दें" },
              { action: "Community cleanup participation", points: 50, desc: "सफाई अभियान में भाग लें" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-100 transition-colors">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="inline-flex items-center space-x-1 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold">
                    <span>+{item.points}</span>
                    <span className="text-xs font-medium">pts</span>
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{item.action}</h3>
                <p className="text-slate-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Section 3: Reward Catalog */}
      {activeTab === "catalog" && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Reward Catalog</h2>
              <p className="text-slate-600 mt-2">Redeem your hard-earned points for valuable items.</p>
            </div>
            {loggedInUser && (
              <div className="text-right">
                <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Available Balance</p>
                <p className="text-2xl font-bold text-emerald-600">{loggedInUser.points} pts</p>
              </div>
            )}
          </div>
          
          {redeemMessage && (
            <div className={`p-4 rounded-xl mb-6 font-medium ${redeemMessage.includes("Error") || redeemMessage.includes("Insufficient") ? "bg-red-50 text-red-700 border border-red-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200"}`}>
              {redeemMessage}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewards.map((reward) => {
              const Icon = iconMap[reward.icon] || Gift;
              const canAfford = loggedInUser && loggedInUser.points >= reward.points_required;
              
              return (
                <div key={reward.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
                  <div className="p-4 bg-slate-50 text-slate-700 rounded-xl mb-4 self-start">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{reward.name}</h3>
                  <div className="mt-auto pt-6 flex items-center justify-between">
                    <span className="font-bold text-emerald-600">{reward.points_required} pts</span>
                    <button 
                      onClick={() => handleRedeem(reward.id)}
                      disabled={!canAfford}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        canAfford 
                          ? "bg-emerald-600 text-white hover:bg-emerald-700" 
                          : "bg-slate-100 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      Redeem
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>
      )}

      {/* Section 4: Leaderboard */}
      {activeTab === "leaderboard" && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Village Leaderboard</h2>
            <p className="text-slate-600 mt-2">Top contributing villages and active users.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Villages */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 flex items-center"><Award className="w-5 h-5 mr-2 text-amber-500" /> Top Villages</h3>
              </div>
              <ul className="divide-y divide-slate-100">
                {[...villages].sort((a, b) => b.plastic_collected - a.plastic_collected).map((v, i) => (
                  <li key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${i === 0 ? 'bg-amber-100 text-amber-700' : i === 1 ? 'bg-slate-200 text-slate-700' : i === 2 ? 'bg-orange-100 text-orange-800' : 'bg-slate-100 text-slate-500'}`}>
                        {i + 1}
                      </span>
                      <span className="font-semibold text-slate-900">{v.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900">{v.plastic_collected} kg</p>
                      <p className="text-sm text-emerald-600 font-medium">{v.points_earned} pts</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Users */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 flex items-center"><Users className="w-5 h-5 mr-2 text-blue-500" /> Most Active Users</h3>
              </div>
              <ul className="divide-y divide-slate-100">
                {[...users].sort((a, b) => b.points - a.points).map((u, i) => (
                  <li key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <span className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 font-bold text-sm">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-slate-900">{u.name}</p>
                        <p className="text-xs text-slate-500">{u.village}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-emerald-600">{u.points} pts</p>
                      <p className="text-sm text-slate-500">{u.plastic_contributed} kg</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>
      )}

      {/* Section 5: Community Rewards */}
      {activeTab === "community" && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Community Rewards</h2>
            <p className="text-slate-600 mt-2">When a village collects large amounts of plastic, everyone benefits.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { kg: 500, reward: "Tree Plantation Program", icon: Sprout, color: "text-green-600", bg: "bg-green-100" },
              { kg: 800, reward: "Solar Street Light", icon: Star, color: "text-amber-500", bg: "bg-amber-100" },
              { kg: 1000, reward: "Community Water Filter", icon: Leaf, color: "text-blue-500", bg: "bg-blue-100" }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden relative group">
                <div className="h-2 bg-slate-100 w-full absolute top-0 left-0">
                  <div className={`h-full ${item.bg.replace('bg-', 'bg-').replace('100', '500')}`} style={{ width: '100%' }}></div>
                </div>
                <div className="p-8 text-center space-y-4 mt-2">
                  <div className={`w-16 h-16 mx-auto rounded-full ${item.bg} ${item.color} flex items-center justify-center mb-6`}>
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{item.kg} kg</h3>
                  <p className="text-slate-500 font-medium uppercase tracking-wider text-sm">Target</p>
                  <div className="w-12 h-1 bg-slate-200 mx-auto my-4 rounded-full"></div>
                  <p className="text-lg font-bold text-slate-800">{item.reward}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

    </motion.div>
  );
}
