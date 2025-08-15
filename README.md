<h1 align="center">🪶 ThoughtNest</h1>

<p align="center">
  <em>Capture, organize, and share your thoughts beautifully.</em>
</p>

---

## 🌟 Overview

ThoughtNest is a modern blogging and idea-sharing platform that helps you store, organize, and revisit your thoughts effortlessly.  
Whether you're a writer, student, or just a thinker — ThoughtNest gives your stories a home.

---

## ✨ Features

- 📝 **Create & Edit Blogs** — Write in a distraction-free, clean editor with AI.
- 📂 **Organize Ideas** — Categorize and search your notes instantly.
- 🌙 **Dark/Light Mode** — Perfect for day & night productivity.
- 🔒 **Secure Authentication** — User data is safe with session-based auth and Google O'Auth.
- ☁️ **Cloud Storage** — Upload images securely with Cloudinary
- 📱 **Responsive Design** — Works seamlessly on mobile, tablet, and desktop.

## 🛠️ Tech Stack

**Frontend:** React, TailwindCSS, Framer Motion  
**Backend:** Node.js, Express.js, MongoDB  
**Auth:** Passport.js (O'Auth & Session based)  
**Other Tools:** Cloudinary (image uploads), React Router, Axios

<p align="center">
  <img
   src="https://skillicons.dev/icons?i=react,nodejs,express,mongodb,tailwind,js,vercel"
  />
</p>

---

## ⚡ Getting Started

### 1️⃣ Clone the repo

```bash
git clone https://github.com/yourusername/thoughtNest.git
cd thoughtNest
```

## 2️⃣ Install dependencies

```bash
# Install frontend
cd client
npm install

# Install backend
cd ../server
npm install
```

## 3️⃣ Set up environment variables

Create a `.env` file in server and client directories:

Client

```bash
VITE_BACKEND_URL=http://localhost:3000
```

Server

````bash
MONGDB_URI=<your_mongo_db_URI>
SALT_ROUNDS=<your_salt_rounds>
SESSION_SECRET=<your_secret>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
GEMINI_API_KEY=<your_gemini_api_key>
GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>
NODE_ENV=deployment

## 4️⃣ Run the project
```bash
# Server
cd server
node server.js

# Client
cd ../client
npm run dev
````

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch (feature/new-feature)
3. Commit your changes
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

<p align="center">Built with ❤️ by <a href="https://github.com/MozammilT">Mozammil</a></p>
