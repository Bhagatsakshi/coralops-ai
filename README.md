# 🚀 CoralOps AI

AI-Powered Engineering Intelligence Platform built during the WeMakeDevs Coral Hackathon.

## 🌟 Overview

CoralOps AI unifies engineering workspace intelligence across GitHub and Slack using Coral SQL integrations.

The platform enables:

* Multi-source querying
* Engineering workspace visibility
* Repository intelligence
* AI-generated operational insights
* Interactive Coral SQL execution

Built with React, Express.js, Coral CLI, GitHub APIs, Slack APIs, and Tailwind CSS.

---

## ✨ Features

### 🔗 Coral Integrations

* GitHub Integration
* Slack Integration
* Multi-source operational intelligence

### 📊 Engineering Dashboard

* GitHub user intelligence
* Slack workspace analytics
* Repository intelligence section
* Interactive statistics cards

### 🤖 AI Engineering Insights

* Dynamic AI-generated workspace summaries
* Operational recommendations
* Engineering visibility analysis

### 🧠 Coral SQL Playground

Run live Coral SQL queries directly from the dashboard.

Example queries:

```sql
SELECT login, type FROM github.users LIMIT 5;
```

```sql
SELECT * FROM slack.users LIMIT 5;
```

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Framer Motion
* Axios

### Backend

* Express.js
* Node.js
* Coral CLI
* OpenAI SDK

### Integrations

* GitHub API
* Slack API
* Coral SQL Engine

---

## 🏗️ Architecture

GitHub + Slack → Coral CLI → Express Backend → React Frontend → AI Insights

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone <your-repo-url>
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
CORAL_PATH=your_coral_exe_path
OPENAI_API_KEY=your_key
```

Run backend:

```bash
node server.js
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🧪 Coral SQL Examples

```sql
SELECT login, avatar_url FROM github.users LIMIT 5;
```

```sql
SELECT * FROM slack.users LIMIT 5;
```

---

## 🎯 Hackathon Goal

CoralOps AI demonstrates how Coral can unify engineering data sources into a centralized AI-powered operational intelligence platform.

---

## 👩‍💻 Built For

WeMakeDevs Coral Hackathon 2026
