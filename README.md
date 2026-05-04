# Kitchen Druzhbata

Web application with two parts:

- frontend: Next.js (React, TypeScript, Sass)
- backend: Django REST Framework (basic initialization)

## Project Structure

- [frontend](frontend) - client application
- [backend](backend) - server application (DRF)
- [docker-compose.dev.yml](docker-compose.dev.yml) - Docker setup for development
- [docker-compose.prod.yml](docker-compose.prod.yml) - Docker setup for production

## Run with Docker

Requirements:

- Docker Desktop (or Docker Engine + Compose plugin)

Start development environment (frontend + backend):

```bash
docker compose -f docker-compose.dev.yml up --build
```

Start production environment (frontend + backend):

```bash
docker compose -f docker-compose.prod.yml up --build -d
```

Stop containers:

```bash
docker compose -f docker-compose.dev.yml down
docker compose -f docker-compose.prod.yml down
```

Available services:

- frontend (prod compose): http://localhost:3001
- backend (prod compose): http://localhost:8004
- backend admin (prod compose): http://localhost:8004/admin

## Local Development Without Docker

### Frontend (Next.js)

Requirements:

- Node.js 20+
- npm

Commands:

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at http://localhost:3000.

### Backend (Django DRF)

Requirements:

- Python 3.12+
- pip

Commands (Windows PowerShell):

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend will be available at http://localhost:8000.

## Before Production

- Replace `SECRET_KEY` in [docker-compose.prod.yml](docker-compose.prod.yml)
- Set your domain in [docker-compose.prod.yml](docker-compose.prod.yml):
	- `ALLOWED_HOSTS=sofiafood.bg,www.sofiafood.bg,...`
	- `CORS_ALLOWED_ORIGINS=https://sofiafood.bg,https://www.sofiafood.bg`
	- `CSRF_TRUSTED_ORIGINS=https://sofiafood.bg,https://www.sofiafood.bg`
	- `NEXT_PUBLIC_API_BASE_URL=https://sofiafood.bg/api`
