# 📸 Snap-Link

Snap-Link is a full-stack **social media web application** built using the **MERN stack**.  
It allows users to **create posts, like photos, and comment on posts** — simulating a minimal social media experience.  
This project focuses on learning and implementing modern web development practices using MongoDB, Express.js, React.js, and Node.js.

---

## 🚀 Features

- 🧑‍🤝‍🧑 User authentication (Register / Login)
- 🖼️ Create, view, and delete posts with images
- ❤️ Like and unlike posts
- 💬 Add and view comments on posts
- 🧾 Dynamic feed of all user posts
- ⚡ RESTful API built with Express and MongoDB
- 🧱 Fully modular code with clean folder structure
- 🎨 Responsive UI built using React

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React.js, React Router, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Authentication** | JWT (JSON Web Token) |
| **State Management** | React Hooks / Context API |
| **Styling** | CSS / Tailwind (if used) |

---

## 📂 Project Structure

snap-link/
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ └── App.js
│ └── package.json
│
└── README.md
---

## ⚙️ Installation and Setup

Follow these steps to run the project locally.

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/snap-link.git
cd snap-link

cd server
npm install

Create a .env file inside the backend/ directory and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

Run the server side with:

nodemon app.js

Frontend Setup

Open a new terminal window:

cd client
npm install
npm start


The React app will start on http://localhost:3000
and the backend will run on http://localhost:5000.

```
🧑‍💻 Contributing

Contributions are welcome! 🎉
Follow the steps below to contribute to Snap-Link:

Fork the repository

Clone your fork

```git clone https://github.com/<your-username>/snap-link.git```


Create a new branch for your feature

```git checkout -b feature-name```


Make your changes and commit

```git commit -m "Added new feature: X"```


Push to your fork

```git push origin feature-name```


Create a Pull Request from your fork to the main repo
