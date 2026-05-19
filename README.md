# WanderLust 🌍

*A Full-Stack Airbnb Clone for Property Listing & Travel Experiences*

## 📌 Overview

**WanderLust** is a full-stack Airbnb-inspired web application where users can explore, create, edit, and manage property listings.
The platform provides secure authentication, authorization, CRUD functionality, and responsive UI for a smooth user experience.

This project was built to strengthen full-stack development skills using the **MERN ecosystem** and modern backend architecture practices.

---

## 🚀 Features

### 👤 User Authentication & Authorization

* Secure login & signup system
* Passport.js authentication
* Session management
* Protected routes
* Authorization for listing ownership

### 🏡 Property Listings

* Create new property listings
* Edit existing listings
* Delete listings
* View all available properties
* Detailed listing pages

### 📱 Responsive UI

* Mobile-friendly design
* Clean and modern interface
* User-friendly navigation

### ⚙️ Backend Functionality

* RESTful routing architecture
* Middleware integration
* Error handling
* MongoDB database integration

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* EJS Templates

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* Passport.js
* Express Session

### Tools & Utilities

* Git & GitHub
* Cloudinary (if used)
* Method Override
* Connect Flash

---

## 📂 Project Structure

```bash
Wander-Lust/
│
├── controllers/      # Route logic
├── init/             # Database initialization
├── models/           # MongoDB schemas/models
├── public/           # Static assets (CSS, JS, Images)
├── routes/           # Express routes
├── utils/            # Utility functions
├── views/            # EJS templates
│
├── app.js            # Main server file
├── cloudConfig.js    # Cloudinary configuration
├── middleware.js     # Custom middleware
├── schema.js         # Joi validation schemas
└── .gitignore
```

---

## ⚡ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Abhishek-Singh1111/Wander-Lust.git
```

### 2️⃣ Navigate to Project Directory

```bash
cd Wander-Lust
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Setup Environment Variables

Create a `.env` file in the root directory and add:

```env
ATLASDB_URL=your_mongodb_connection_string

SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

---

## ▶️ Run the Application

### Development Mode

```bash
node app.js or nodemon app.js
```

Server will start on:

```bash
http://localhost:8080
```

---

## 📸 Screenshots

<img width="1846" height="952" alt="Screenshot 2026-05-20 002238" src="https://github.com/user-attachments/assets/88811fc2-a297-4361-9828-980f64d42407" />


## 🧠 Learning Outcomes

Through this project, I improved my understanding of:

* Full-stack web development
* RESTful APIs
* Authentication & authorization
* MVC architecture
* Database modeling with MongoDB
* Backend routing & middleware
* Responsive web design

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Added new feature"
```

4. Push to branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

## 📧 Contact

### Abhishek Singh

📍 Himachal Pradesh, India

* GitHub: [Abhishek-Singh1111 GitHub](https://github.com/Abhishek-Singh1111)
* Email: [abhishekgtn7890@gmail.com](mailto:abhishekgtn7890@gmail.com)

---

## ⭐ Support

If you found this project useful, consider giving it a **star ⭐** on GitHub.
