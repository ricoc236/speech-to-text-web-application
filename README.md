# Speech-to-Text Web Application

Convert speech to text using Meta's wav2vec2 Model. Users can record audio, transcribe speech, and manage their transcription history with editing capabilities.

---

## Features

- 🎤 **Speech-to-Text**: Record audio and get instant, accurate transcriptions using AI.
- 📝 **Edit & Save**: Edit your transcription history and save changes.
- 🔒 **Authentication**: Secure signup and login with JWT.
- 📜 **History**: View and manage your past transcriptions.
- 🐳 **Dockerized**: Easy deployment with Docker and Docker Compose.

---

## Project Structure

```
.
├── frontend/   # React + Vite + TypeScript client
└── server/     # Node.js + Express + MongoDB + Python ASR backend
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- [Python 3](https://www.python.org/) (for local development)
- [MongoDB](https://www.mongodb.com/) (local or cloud)

---

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/speech-to-text-web-application.git
cd speech-to-text-web-application
```

---

### 2. Environment Variables

#### Server

Create a `.env` file in the `server/` directory:

```
MONGO_URI=your_mongodb_connection_string
MONGO_NAME=your_db_name
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h
```

#### Frontend

Edit `frontend/.env` to point to your backend API:

```
VITE_API_URL=http://localhost:3001
```

---

### 3. Running with Docker Compose

From the `server/` directory, build and start the backend:

```sh
docker-compose up --build
```

This will:
- Build the Node.js server (with Python/ffmpeg for ASR)
- Install Python dependencies for the ASR model

---

### 4. Running Frontend Locally

Open a new terminal and start the frontend:

```sh
cd frontend
npm install
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

---

## Usage

1. **Sign Up / Login**: Create an account or log in.
2. **Record Audio**: Go to the Recorder page and start recording.
3. **Transcribe**: Stop recording to get your transcript.
4. **History**: View and edit your past transcriptions in the sidebar.

---

## Tech Stack

- **Frontend**: React, Vite, TypeScript, TailwindCSS
- **Backend**: Node.js, Express, MongoDB, JWT, Python (transformers, torch, soundfile)
- **ASR Model**: Meta wav2vec2 ([OthmaneJ/distil-wav2vec2](https://huggingface.co/OthmaneJ/distil-wav2vec2))
- **Deployment**: Docker, Docker Compose

---

## License

[MIT](LICENSE)

---

## Acknowledgements

- [Meta wav2vec2](https://huggingface.co/facebook/wav2vec2-base-960h)
- [Transformers](https://huggingface.co/docs/transformers/index)
