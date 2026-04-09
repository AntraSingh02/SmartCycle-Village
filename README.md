# SmartCycle Villages

SmartCycle Villages is a comprehensive web platform dedicated to optimizing plastic waste management, rewarding rural communities with Green Points, and proactively monitoring environmental impact through an analytical dashboard.

## 🌟 Key Features

- **Waste Reporting System:** Users can quickly submit plastic waste collection logs, complete with optional photo uploads.
- **Analytical Dashboard:** Real-time metrics visualizing the total collected plastic, simulated route distances, and waste composition.
- **Green Rewards Program:** Gamified community engagement where residents earn "Green Points" for waste segregation that can be redeemed for real-world items.
- **Functional Admin Panel:** A secure interface for administrators to approve pending waste reports, manually evaluate user accounts, and maintain rewards.

## 🚀 Tech Stack

- **Framework:** React 19 + TypeScript
- **Tooling:** Vite
- **Styling & Animation:** Tailwind CSS, Lucide Icons, and Motion
- **Data Visualization:** Chart.js, React-ChartJS-2

## 💻 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your system.

### Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AntraSingh02/SmartCycle-Village.git
   cd SmartCycle-Village/used
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the local development server:**
   ```bash
   npm run dev
   ```

4. Open your web browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

---

## 🤖 AI Waste Segregation (Local Setup)

To use the **AI Waste Segregation** feature with a local real-time webcam scanner, you need to run the detection model separately.

### 1. Clone the Detection Repository
```bash
git clone https://github.com/AntraSingh02/YOLO-Waste-Detection.git
cd YOLO-Waste-Detection
```

### 2. Install Python Dependencies
Make sure you have [Python](https://www.python.org/) installed, then run:
```bash
pip install -r used/requirements.txt
```

### 3. Run the AI Model
```bash
streamlit run used/app.py
```
*Note: The main platform will automatically interface with your local model once it is running on `http://localhost:8501`.*

### ☁️ Cloud vs Local
- The **Cloud Version** (built into the platform) uses a snapshot interface for compatibility.
- The **Local Version** (via the setup above) allows for continuous, real-time webcam scanning.

---
*Built to empower communities and keep the environment clean.*
