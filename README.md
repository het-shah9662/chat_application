# 💬 Real-Time Chat Application

A simple real-time chat application built with **React** (frontend) and **Node.js + Socket.IO + SQL Server** (backend). It supports multiple users, typing indicators, and message persistence via SQL Server.

---

## 🚀 Features

- Real-time messaging using WebSockets (Socket.IO)
- Typing indicator when users are composing a message
- Chat history fetched from SQL Server
- Basic login screen (username only)

---

## 🛠 Tech Stack

- **Frontend**: React
- **Backend**: Node.js, Express, Socket.IO
- **Database**: SQL Server

---

## 📦 Folder Structure
# 💬 Real-Time Chat Application

A simple real-time chat application built with **React** (frontend) and **Node.js + Socket.IO + SQL Server** (backend). It supports multiple users, typing indicators, and message persistence via SQL Server.

---

## 🚀 Features

- Real-time messaging using WebSockets (Socket.IO)
- Typing indicator when users are composing a message
- Chat history fetched from SQL Server
- Basic login screen (username only)

## 📦 1 .Folder DownLoad(project)(Clone Git Repo)
# Via below link


# 2.Create database db in Local Sql Server(Prerequisite Local Sql Server)
# 3.then Run db_script.sql File In Local Sql Server and Create new user with password for configuration in .env file

# 4. change .env file in backend folder(According To your user/password/Server Etc)
const config = {
  user: 'YOUR_USERNAME',
  password: 'YOUR_PASSWORD',
  server: 'localhost',
  database: 'ChatDB',
  options: {
    trustServerCertificate: true,
  },
};

---

## 🧑‍💻 Getting Started
# For Backend Port 5000 And Frontend port 3000

### 5.1️⃣ Prerequisites(Download Node Js And Npm Dependencies)(For Both Frontend And Backend)
# Use Below Command to Install Dependencies
npm install

- Node.js and npm
- SQL Server running and accessible
- (Optional) Visual Studio Code

---

### 6.2️⃣ Backend Setup (`chat-backend`)

bash/cmd
Run Below Command
cd backend
npm install

# 7. Frontend Setup (`chat-backend`)

bash/cmd
# Run Below Command
cd frontend
npm install

# 8.Project Run

bash/cmd
# Run Below Command For Backend
cd backend
npm start

bash/cmd
# Run Below Command For Forntend
cd backend
npm start

# 9. End
check the project chat using two diffrent browser tab.

# 10.Sample Test Users
Het
Liaplus User

Attached Screenshot Of Chat