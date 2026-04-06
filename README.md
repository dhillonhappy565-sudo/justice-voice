#  JusticeVoice

### A Structured Digital Testimony Platform

JusticeVoice is an AI-powered web platform designed to help survivors of violence, abuse, or trauma securely document their experiences and convert them into structured legal evidence.

---

##  Features

###  User Features

* Secure Registration & Login (JWT Authentication)
* Submit structured testimonies (cases)
* Upload supporting evidence (images, PDFs)
* View submitted cases
* Generate downloadable reports

###  Admin Features

* Single admin access (based on email)
* View all registered users
* View all submitted cases
* Monitor platform activity

---

##  Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas (Cloud)

### Authentication & Security

* JWT (JSON Web Token)
* bcrypt (password hashing)

### File Handling

* Multer (for file uploads)

---

##  Project Structure

```
justice-voice/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── App.jsx
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/        # stores evidence files
│   └── server.js
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️ Clone the Repository

```
git clone https://github.com/your-username/justicevoice.git
cd justicevoice
```

---

### 2️ Setup Backend

```
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start backend:

```
npm run dev
```

---

### 3️ Setup Frontend

```
cd frontend
npm install
npm run dev
```

---

##  MongoDB Setup

1. Create account on MongoDB Atlas
2. Create cluster
3. Add IP address (`0.0.0.0/0`)
4. Create Database User
5. Copy connection string
6. Replace in `.env` file

---

##  Admin Access

To access admin panel:

* Register using:

```
admin@gmail.com
```

* This email is automatically assigned admin role

---

##  Data Storage

* **Text Data (Users, Cases):** Stored in MongoDB Atlas
* **Evidence Files:** Stored locally in

```
backend/uploads/
```

---

##  Security Features

* Password hashing using bcrypt
* JWT-based authentication
* Protected API routes
* Secure file upload handling

---

##  Future Enhancements

* AI-based timeline reconstruction
* Multi-language support
* Cloud file storage (AWS S3)
* Advanced analytics dashboard

---

##  Contribution

Contributions are welcome!
Feel free to fork the repo and submit pull requests.

---

##  License

This project is licensed under the MIT License.

---

##  Author

Developed by Harpreet Singh 
