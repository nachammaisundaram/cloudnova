# CloudNova — CI/CD Deployment Pipeline (DevOps Internship Final Task)

A responsive landing page for a fictional DevOps company, "CloudNova", built to demonstrate
a full CI/CD workflow: Git → GitHub → Jenkins → Docker → Vercel & Netlify.

## Tech Stack
- HTML, CSS, JavaScript (static site)
- Docker (nginx:alpine base image)
- Jenkins (declarative pipeline)
- GitHub (version control + branching)
- Vercel & Netlify (production deployment)

## Project Structure
```
cloudnova/
├── index.html
├── style.css
├── script.js
├── Dockerfile
├── Jenkinsfile
└── README.md
```

## Run Locally (no Docker)
Just open `index.html` in a browser, or serve it:
```bash
npx serve .
```

## Run With Docker
```bash
docker build -t cloudnova-site .
docker run -d --name cloudnova-container -p 8080:80 cloudnova-site
```
Visit: http://localhost:8080

Check / stop / remove:
```bash
docker ps
docker logs cloudnova-container
docker stop cloudnova-container
docker rm cloudnova-container
```

## Git Workflow Used
```bash
git init
git add .
git commit -m "Initial Project"
git commit -m "Added About Section"
git commit -m "Added Contact Form"
git commit -m "Improved UI"
git commit -m "Added Latest Projects section"
git log --oneline
```

Branches: `main`, `development`, `feature/navbar`, `feature/contact`
- Feature branches merged into `development` via Pull Requests
- `development` merged into `main` via Pull Request
- One intentional merge conflict resolved manually (see PR history)

## Jenkins Pipeline Stages
1. Clone Repository
2. Build Docker Image
3. Run Container
4. Verify Deployment
5. Clean Workspace

## Deployment
- **Netlify:** Connected to GitHub repo, auto-deploy on push to `main`, HTTPS enabled by default.
- **Vercel:** Connected to GitHub repo, auto-deploy on push to `main`, live URL provided by Vercel.

## Live URLs
- Netlify: `<add your Netlify URL here>`
- Vercel: `<add your Vercel URL here>`

## Author
Naz — DevOps & Cloud Intern, Devine Innovation
