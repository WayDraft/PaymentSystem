# PaymentSystem — Local developer README

This repository contains a Django backend (`store-backend`) and a Vite + React frontend (`store-frontend`).

This README explains how to run both locally, what the `/` → `/api/` redirect means, how to access the Django admin, and troubleshooting tips.

## High-level layout

- store-backend/ — Django project
  - `manage.py` — Django management entrypoint
  - `store_project/` — Django settings and URL conf
  - `product/`, `order/`, `user/` — Django apps
  - `payment/` — virtualenv used for the backend (contains Python executable and site-packages)
  - `db.sqlite3` — SQLite DB used for local development

- store-frontend/ — Vite + React frontend
  - `package.json`, `src/`, `index.html` etc.

## Why visiting `/` redirected to `/api/` and showed "Page not found"

The Django project is configured to serve API endpoints under `/api/` (for example `/api/products/` and auth token endpoints). If you visit the root path (`/`) with no frontend app mounted there, Django will return 404 because there is no route that matches the empty path.

To avoid a confusing 404 when someone opens the project root in a browser, the project now redirects `/` → `/api/`. That simply sends your browser to the API root list. It does not mean the admin or frontend is disabled — it only changes what happens when you open `/` in the browser.

## Admin UI vs API vs Frontend app

- Admin UI (Django admin): accessible at `/admin/` (e.g. `http://127.0.0.1:8000/admin/`). This is the built-in Django admin site — it is separate from the API and the React frontend.

- API: Django REST Framework endpoints under `/api/...`. These are JSON APIs intended to be called by the frontend or other clients.

- Frontend (React/Vite): served by Vite at `http://localhost:5173/` during development. The frontend talks to the API endpoints (e.g. `http://127.0.0.1:8000/api/`). The frontend may also be built and served by a web server in production — in dev we keep them separate.

So: redirecting `/` → `/api/` only affects the Django app's root URL. To see the frontend, open `http://localhost:5173/`. To use the admin UI, open `http://127.0.0.1:8000/admin/` and log in with a superuser account.

## How to run (development)

1) Backend (Django) — use the included virtualenv

macOS zsh example (from repo root):

```bash
# activate venv (optional) or call the venv python directly
source store-backend/payment/bin/activate

# run checks and migrations
python manage.py check
python manage.py migrate

# create superuser (for admin access)
python manage.py createsuperuser

# start dev server
python manage.py runserver 127.0.0.1:8000
```

If you prefer not to `activate`, call the venv python explicitly:

```bash
store-backend/payment/bin/python store-backend/manage.py runserver
```

2) Frontend (Vite + React)

```bash
cd store-frontend
npm install
npm run dev -- --port 5173
# open http://localhost:5173/
```

The frontend expects the backend API at `http://127.0.0.1:8000/api/` by default. If you have CORS restrictions, make sure `django-cors-headers` is installed (it is already present in the venv). If you need to change the API base URL, edit the frontend configuration or environment variables in `store-frontend/src`.

## Common tasks & troubleshooting

- If root `/` shows 404: open `/api/` or the frontend URL `http://localhost:5173/` instead. The repo now redirects `/` → `/api/`.

- If you cannot access the admin site: ensure you created a superuser (`python manage.py createsuperuser`) and that the Django server is running at `127.0.0.1:8000`.

- If the frontend fails to start: run `npm install` in `store-frontend` and check for syntax errors in any JSX files. The earlier issues were due to stray Markdown fences and duplicate `.js/.jsx` files; those have been cleaned up.

- If Django reports missing packages: ensure you're running `manage.py` with the project's venv python (`store-backend/payment/bin/python`) or activate the venv first.

## Files I added / changed

- `store-backend/requirements.txt` — generated from the project's venv.
- `store-backend/store_project/urls.py` — added root redirect to `/api/` and removed duplicate admin entry.
- `README.md` (this file)

## Next steps (optional)

- Add a small frontend proxy so Vite proxies API calls to Django during dev. That avoids CORS in dev and lets you open the frontend at `/` instead of the API. I can add `vite.config.js` proxy settings if you'd like.

- Bundle the frontend into Django static files for integrated deployment. That requires a production build (`npm run build`) and changing Django to serve the built static files (or use nginx). I can scaffold that.

If you'd like, I can now:
- Start both servers and keep them running while I monitor logs and fix any runtime frontend errors; or
- Add a Vite dev proxy to forward `/api` requests to the Django server so you can run the frontend at `/` without CORS; or
- Add a short developer guide (expanded README) showing environment variables and how to change API URLs.

Which of those would you prefer?