# 🐾 Padfoot_Coder

> A fast, elegant online code editor for students and beginners — write, run, and experiment with code right in your browser.

![Status](https://img.shields.io/badge/status-stable-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)

---

## ✨ Features

- ⚡ **Real-time code execution** — run your code instantly without leaving the browser
- 🎨 **Multiple themes & dark mode** — choose a coding environment that suits your eyes
- 🌐 **Multi-language support** — write code in:
  - Java
  - Python
  - C
  - C++
  - JavaScript
- 📦 **Monorepo architecture** — clean, scalable project structure powered by Turborepo
- 🐳 **Dockerized** — consistent and reproducible execution environments

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript |
| Backend | Node.js |
| Monorepo | Turborepo |
| Containerization | Docker |

---

## 📁 Project Structure

```
padfoot_coder/
├── apps/
│   ├── web/          # React + TypeScript frontend
│   └── api/          # Node.js backend
├── packages/         # Shared packages / configs
├── docker/           # Docker configuration
├── turbo.json        # Turborepo pipeline config
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or above)
- [Docker](https://www.docker.com/)
- [pnpm](https://pnpm.io/) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/luckyCohle/padfoot_coder.git

# Navigate into the project
cd padfoot_coder

# Install dependencies
pnpm install
```

### Running the App

```bash
# Start all apps in development mode
pnpm dev
```

Or use Docker:

```bash
# Build and start all services
docker-compose up --build
```

The app should now be running at `http://localhost:3000`.

---

## 🧑‍💻 Supported Languages

| Language | Extension |
|---|---|
| Python | `.py` |
| JavaScript | `.js` |
| Java | `.java` |
| C | `.c` |
| C++ | `.cpp` |

---

## 🤝 Contributing

Contributions are very welcome! Whether it's a bug fix, a new feature, or a docs improvement — feel free to open a PR.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please make sure your code is clean and tested before submitting.

---

## 🐛 Reporting Issues

Found a bug or have a suggestion? [Open an issue](https://github.com/luckyCohle/padfoot_coder/issues) and describe it clearly.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👤 Author

**luckyCohle**
- GitHub: [@luckyCohle](https://github.com/luckyCohle)

---

> *"The best way to learn to code is to write code."* — happy coding with Padfoot_Coder! 🐾
