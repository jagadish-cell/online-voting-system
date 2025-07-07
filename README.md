# 🗳️ Online Voting System using Blockchain and Facial Recognition

A secure, transparent, and modern online voting system built with **React**, **Node.js**, **PostgreSQL**, and **Ethereum blockchain**, integrated with **facial recognition** for user verification.

---

## 🚀 Features

✅ Secure voter authentication using **JWT** and **Face Recognition (face-api.js)**  
✅ **Blockchain-based voting** using **Ethereum, Truffle, Ganache, and MetaMask**  
✅ **One vote per user** enforcement  
✅ Real-time voting updates with **WebSockets**  
✅ AES-encrypted voter data  
✅ Admin dashboard and results viewing  
✅ Professional UI/UX with responsive design  

---

## 🛠️ Tech Stack

| Layer        | Technology                  |
|--------------|-----------------------------|
| Frontend     | React.js                    |
| Backend      | Node.js, Express.js         |
| Database     | PostgreSQL + Prisma ORM     |
| Blockchain   | Ethereum, Solidity, Truffle, Ganache, MetaMask |
| Authentication | JWT + Facial Recognition (face-api.js) |
| Real-time    | WebSockets                  |
| Security     | Helmet.js, Rate Limiting, AES |
| Deployment   | GitHub + Future: Vercel / Render / AWS |

---

## 📦 Folder Structure

online-voting-system/
├── client/ # React frontend
│ ├── components/
│ ├── pages/
│ └── ...
├── server/ # Node.js backend
│ ├── routes/
│ ├── controllers/
│ └── ...
├── contracts/ # Smart contracts (Solidity)
├── prisma/ # PostgreSQL schema & migrations
├── .env # Environment variables (not included)
└── README.md



---

## ⚙️ How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/your-username/online-voting-system.git
cd online-voting-system
2. Set up the backend
bash
Copy
Edit
cd server
npm install
Create a .env file with DB and JWT settings:

env
Copy
Edit
DATABASE_URL=postgresql://user:password@localhost:5432/voting
JWT_SECRET=your_jwt_secret
Then start the backend:

bash
Copy
Edit
npx prisma generate
npx prisma migrate dev
npm start
3. Set up the frontend
bash
Copy
Edit
cd ../client
npm install
npm start
4. Blockchain Setup (Ganache + Truffle)
bash
Copy
Edit
cd contracts
npm install
truffle compile
truffle migrate --network development
5. Connect MetaMask to localhost:7545 and import account from Ganache
🔐 Security Measures
Voter identity verified via face-api.js

Encrypted user data using AES

Helmet.js and rate limiting for backend security

Voters can only vote once per election

Voting records stored on the blockchain

📸 Screenshots
Add screenshots of:

Landing Page
Images/Landing page.png

Face Verification
Images/Register Page.png

Voting Page
Images/Voting Page.png
Images/Vote Submitted.png

Result Dashboard
Images/Results.png

🌐 Demo
Coming Soon — Will be deployed on Render / Vercel / Netlify + Ethereum testnet.

📣 Contributors
Bandi Naga Jagadish – Developer & Project Lead
Sake Sravanthi
devarakonda Mankikanta 

Feel free to contribute via pull requests!

📄 License
This project is licensed under the MIT License.
Feel free to use, modify, and build upon it.

