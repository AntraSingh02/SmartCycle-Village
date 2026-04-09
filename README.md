# SmartCycle Villages

SmartCycle Villages is a comprehensive AI-powered web platform dedicated to optimizing plastic waste management, rewarding rural communities with Green Points, and proactively monitoring environmental impact through an analytical dashboard.

---

## 🌟 Key Features

### ♻️ Waste Reporting System
Users can quickly submit plastic waste collection logs, complete with optional photo uploads. Each submission is reviewed by an Admin and, once approved, auto-distributes Green Points to the user.

### 📊 Analytical Dashboard
Real-time metrics visualizing total collected plastic, active routes, simulated distances, and a waste composition breakdown via Chart.js charts.

### 🏆 Green Rewards Program
A gamified community engagement system where residents earn **"Green Points"** for waste segregation activities. Points can be redeemed for real-world rewards including:
- 📱 Mobile recharge vouchers
- 🌾 Farming seed packages
- 🛒 Ration store discounts

A **village-level leaderboard** fosters healthy competition between communities to maximize collection.

### 🛡️ Functional Admin Panel
A secure interface for administrators to:
- **Approve/Reject** pending waste reports
- **Automatically distribute** Green Points upon report approval
- **Manage users** — add or remove community accounts
- Monitor platform-wide reports and activity

### 🗺️ GIS Map Visualization & Route Optimization
An interactive Leaflet.js map displaying real-world, street-level optimized collection routes across 25 villages. Key technical details:

| Property | Details |
|---|---|
| **Core Algorithm** | Ant Colony Optimization (ACO) — a swarm intelligence algorithm inspired by ant foraging behavior |
| **Problem Type** | Capacitated Vehicle Routing Problem (CVRP) — assigns villages to trucks while respecting load capacity |
| **Distance Engine** | OSRM (Open Source Routing Machine) — computes real-world road distances between villages |
| **Visualization** | Folium (Python) + Leaflet.js embedded as an interactive HTML map |
| **GIS Engine** | Python-generated `route_map.html` rendered in-browser via iframe |

**ACO Hyperparameters used:**
- `num_ants = 30`, `iterations = 100`
- `alpha = 1.0` (pheromone weight), `beta = 2.5` (visibility weight)
- `evaporation_rate = 0.1` — prevents premature convergence

The result: a fleet of **7 electric trucks** assigned optimized, non-overlapping tours that minimize total travel distance and fuel consumption.

### 🤖 AI Waste Segregation
Powered by a **YOLOv8** object detection model trained on 10,000+ images, the segregation tool classifies waste into:
- ✅ **Recyclable** — cardboard boxes, plastic bottles, cans, etc.
- ⚠️ **Non-Recyclable** — plastic bags, straws, snack bags, etc.
- 🔴 **Hazardous** — batteries, chemical spray cans, paint buckets, etc.

Available in two variants:
- **Cloud** (embedded in platform): Snapshot-based detection via `app_cloud.py`
- **Local** (real-time): Continuous webcam scanning via OpenCV

### 💬 Multilingual AI Chatbot
A floating chatbot assistant supporting Hindi FAQ interactions for accessible rural usage. Includes real-time data from route results (e.g., highest-collecting village stats). Works fully **offline** — no external API calls required.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19 + TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS |
| **Animation** | Motion (Framer Motion) |
| **Icons** | Lucide React |
| **Data Visualization** | Chart.js + React-ChartJS-2 |
| **GIS / Maps** | Leaflet.js + Folium (Python) |
| **AI Detection Model** | YOLOv8 (Ultralytics) + Streamlit |
| **Route Optimization** | Python (NumPy), OSRM, Ant Colony Optimization |
| **Routing Algorithm** | ACO-CVRP (custom implementation) |

---

## 💻 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Python](https://www.python.org/) (v3.10+) — only required for AI model or route generation

### 1. Clone & Run the Web Platform

```bash
git clone https://github.com/AntraSingh02/SmartCycle-Village.git
cd SmartCycle-Village
npm install
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## 🤖 Local AI Waste Segregation Setup

To run the YOLOv8 detection model locally with real-time webcam scanning:

### 1. Clone the Detection Repository
```bash
git clone https://github.com/AntraSingh02/YOLO-Waste-Detection.git
cd YOLO-Waste-Detection
```

### 2. Install Dependencies
```bash
pip install -r used/requirements.txt
```

### 3. Run the Local Webcam Scanner
```bash
streamlit run used/app.py
```
*Runs a continuous real-time detection stream at `http://localhost:8501`.*

> **Cloud vs Local:** The platform's built-in Segregation tool uses the cloud-hosted snapshot version. The local setup above enables full real-time webcam inference.

---

## 🗺️ Regenerating Route Optimization Data

The optimized route data (`src/data/routeResults.json`) was pre-generated using the ACO-CVRP algorithm. To re-run it:

```bash
cd notused
pip install numpy requests
python export_json.py
```

This fetches live road distances from **OSRM**, runs **100 ACO iterations with 30 ants**, and outputs the optimized fleet assignments to `src/data/routeResults.json`.

---

*Built to empower communities and keep the environment clean.*
