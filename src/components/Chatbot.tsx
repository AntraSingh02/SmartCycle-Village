import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import routeResults from "../data/routeResults.json";

// Predefined FAQ Data in Hindi
const FAQ_DATA = [
  {
    q: "स्मार्टसाइकिल (SmartCycle) क्या है?",
    a: "स्मार्टसाइकिल गाँवों में प्लास्टिक कचरा प्रबंधन और रीसायक्लिंग के लिए एक एआई-पावर्ड प्लेटफॉर्म है। यह कचरा कम करने और पर्यावरण बचाने में मदद करता है।"
  },
  {
    q: "ग्रीन पॉइंट्स (Green Points) कैसे कमाएं?",
    a: "आप कचरे की रिपोर्ट करके (10 pts), फोटो अपलोड करके (15 pts), कचरा अलग करके (20 pts), और कलेक्शन ट्रक को कचरा देकर (30 pts) पॉइंट्स कमा सकते हैं।"
  },
  {
    q: "पॉइंट्स को रिवार्ड्स में कैसे बदलें?",
    a: "आप 'Rewards' पेज पर जाकर अपने पॉइंट्स को मोबाइल रिचार्ज, राशन डिस्काउंट, या खेती के बीज जैसे इनामों के लिए रिडीम (Redeem) कर सकते हैं।"
  },
  {
    q: "सबसे ज्यादा कचरा किस गांव ने जमा किया?",
    a: `अभी तक ${routeResults.villages[0].name} गाँव ने सबसे ज्यादा कचरा (${routeResults.villages[0].wasteAmount}kg) जमा किया है।`
  },
  {
    q: "मोबाइल रिचार्ज के लिए कितने पॉइंट्स चाहिए?",
    a: "50 रुपये के मोबाइल रिचार्ज के लिए आपको 100 ग्रीन पॉइंट्स की आवश्यकता होगी।"
  },
  {
    q: "कचरा रिपोर्ट (Report Waste) कैसे करें?",
    a: "ऊपर दिए गए 'Report Waste' बटन पर क्लिक करें, अपने गाँव का नाम चुनें, कचरे का प्रकार और वजन भरें और फोटो अपलोड करें।"
  },
  {
    q: "कलेक्शन ट्रक (Collection Truck) कब आएगा?",
    a: "कलेक्शन ट्रक आपके गाँव के रिपोर्ट किए गए कचरे के आधार पर आता है। आप 'GIS Map' पेज पर ट्रक का लाइव रूट देख सकते हैं।"
  },
  {
    q: "प्लास्टिक अलग करना (Segregation) क्यों जरूरी है?",
    a: "प्लास्टिक को अलग करने से उसे रीसायकल करना आसान हो जाता है। आप हमारे 'Waste Segregation' एआई टूल का उपयोग करके सही प्रकार पहचान सकते हैं।"
  },
  {
    q: "खेती के बीज (Farming Seeds) कैसे मिलेंगे?",
    a: "300 ग्रीन पॉइंट्स जमा करने पर आप रिवार्ड्स पेज से खेती के उन्नत बीजों का पैकेट प्राप्त कर सकते हैं।"
  },
  {
    q: "गाँव की रैंकिंग (Village Ranking) कैसे देखें?",
    a: "रिवार्ड्स पेज में 'Leaderboard' टैब पर क्लिक करके आप अपने गाँव की रैंकिंग और प्रदर्शन देख सकते हैं।"
  },
  {
    q: "खतरनाक कचरा (Hazardous Waste) क्या है?",
    a: "केमिकल की बोतलें, बैटरी और इलेक्ट्रॉनिक कचरा खतरनाक श्रेणी में आते हैं। इन्हें साधारण प्लास्टिक के साथ न मिलाएं।"
  },
  {
    q: "क्या यह सर्विस फ्री (Free) है?",
    a: "हाँ, स्मार्टसाइकिल ग्रामीणों के लिए पूरी तरह से मुफ्त है। बल्कि कचरा देने पर आपको इनाम भी मिलते हैं!"
  },
  {
    q: "रीसायकलिंग सेंटर कहाँ है?",
    a: "हमारा मुख्य रीसायकलिंग हब (Hub) आपके क्षेत्र के केंद्र में स्थित है, जहाँ सारा कचरा प्रोसेस किया जाता है।"
  },
  {
    q: "संपर्क (Contact) कैसे करें?",
    a: "किसी भी समस्या के लिए आप अपने गाँव के सरपंच (Sarpanch) या हमारे लोकल वालंटियर से संपर्क कर सकते हैं।"
  },
  {
    q: "कचरे का वजन कैसे नापें?",
    a: "आप साधारण तराजू का उपयोग कर सकते हैं या कलेक्शन ट्रक के आने पर डिजिटल वेइंग स्केल (Digital Scale) पर वजन करवा सकते हैं।"
  }
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "bot", text: string }[]>([
    { role: "bot", text: "नमस्ते! मैं स्मार्टसाइकिल सहायक हूँ। आप नीचे दिए गए सवालों में से चुन सकते हैं या पूछ सकते हैं।" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { role: "user", text }]);
    setInput("");

    // Simple matching or default response
    setTimeout(() => {
      const match = FAQ_DATA.find(item => item.q.toLowerCase().includes(text.toLowerCase()) || text.toLowerCase().includes(item.q.toLowerCase()));
      const response = match ? match.a : "क्षमा करें, मुझे इसके बारे में जानकारी नहीं है। कृपया नीचे दिए गए सुझायें गए सवाल देखें।";
      setMessages(prev => [...prev, { role: "bot", text: response }]);
    }, 500);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-emerald-600 text-white rounded-full shadow-2xl hover:bg-emerald-700 transition-all transform hover:scale-110 z-40 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 w-80 sm:w-[400px] bg-white rounded-3xl shadow-2xl border border-slate-200 z-50 overflow-hidden flex flex-col"
            style={{ height: "620px", maxHeight: "90vh" }}
          >
            {/* Header */}
            <div className="bg-emerald-600 p-5 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">SmartCycle सहायक</h3>
                  <p className="text-xs text-emerald-100 flex items-center gap-1">
                    असिस्टेंट (Offline Mode)
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="hover:bg-white/10 p-2 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                    msg.role === "user" 
                      ? "bg-emerald-600 text-white rounded-tr-none shadow-md" 
                      : "bg-white text-slate-800 border border-slate-100 rounded-tl-none shadow-sm"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions Chips */}
            <div className="p-2 border-t border-slate-100 bg-white">
              <p className="text-[10px] text-slate-400 mb-2 px-2 flex items-center gap-1 uppercase tracking-wider font-bold">
                <HelpCircle className="w-3 h-3" /> अक्षर पूछे जाने वाले सवाल (Suggestions)
              </p>
              <div className="flex flex-nowrap overflow-x-auto pb-2 gap-2 scrollbar-hide px-2">
                {FAQ_DATA.slice(0, 6).map((item, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(item.q)}
                    className="whitespace-nowrap px-4 py-2 bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 rounded-full text-xs font-medium border border-slate-100 hover:border-emerald-200 transition-all shadow-sm"
                  >
                    {item.q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-slate-100">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                  placeholder="यहाँ लिखें..."
                  className="w-full bg-slate-100 text-slate-900 rounded-2xl pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-slate-400"
                />
                <button 
                  onClick={() => handleSend(input)}
                  disabled={!input.trim()}
                  className="absolute right-2 p-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
