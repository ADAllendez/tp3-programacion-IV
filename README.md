# 🚚 Sistema de Gestión de Viajes – TP3 PROG IV

Proyecto fullstack para administrar **vehículos, conductores y viajes**, con API REST y frontend en React.

## 🔧 Tecnologías
- Backend: FastAPI + SQLite
- Frontend: React + Vite
- Auth: JWT
- Archivos `.http` para pruebas

## 📌 Funcionalidades
- Login / Registro
- CRUD de vehículos, conductores y viajes
- Dashboard simple
- Endpoints probables con archivos `.http`

## ▶️ Ejecución

### Backend
```
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 3000
```

### Frontend
```
cd frontend
npm install
npm run dev
```

## 🧪 Pruebas API
Incluye archivos `.http` listos para usar en VSCode.

## 📁 Estructura
```
backend/   → API
frontend/  → React App
```
