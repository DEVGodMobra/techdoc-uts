# TechDoc UTS 🛠

Base de conocimiento técnico del Área de Recursos Informáticos  
**Unidades Tecnológicas de Santander** — Acreditada Alta Calidad MEN 2025

---

## Estructura del proyecto

```
techdoc-uts/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx              ← Punto de entrada
    ├── App.jsx               ← Componente raíz + lógica de navegación
    │
    ├── data/
    │   ├── categories.js     ← Definición de categorías (colores, emojis)
    │   └── guides.js         ← Base de datos local de guías técnicas
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Sidebar.jsx   ← Navegación lateral
    │   │   └── TopBar.jsx    ← Barra superior
    │   ├── ui/
    │   │   ├── Badge.jsx     ← Etiqueta de categoría
    │   │   ├── CodeBlock.jsx ← Bloque de código con botón copiar
    │   │   ├── StepCard.jsx  ← Tarjeta expandible de paso
    │   │   └── Toast.jsx     ← Notificación temporal
    │   └── guides/
    │       ├── GuideCard.jsx     ← Tarjeta de preview
    │       └── RelatedGuides.jsx ← Sección "Ver también"
    │
    ├── pages/
    │   ├── HomePage.jsx         ← Inicio: buscador, categorías, listados
    │   ├── GuidePage.jsx        ← Vista completa de una guía
    │   ├── CreateGuidePage.jsx  ← Formulario de nueva guía
    │   └── DownloadsPage.jsx    ← Descargas y guía Firebase
    │
    ├── hooks/
    │   └── useGuides.js      ← Hook central de gestión de datos
    │
    └── styles/
        └── main.css          ← Variables CSS, reset, estilos globales
```

---

## Instalación y uso local

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev
# Abrir: http://localhost:3000

# 3. Construir para producción
npm run build
npm run preview
```

---

## Conectar a Firebase (base de datos en la nube)

1. Crear proyecto en [console.firebase.google.com](https://console.firebase.google.com)
2. Habilitar **Firestore Database** en modo Producción
3. Instalar SDK: `npm install firebase`
4. Crear `src/services/firebase.js` con tus credenciales
5. Crear `src/services/guidesService.js` con `loadGuides()` y `saveGuide()`
6. Reemplazar el array `INITIAL_GUIDES` en `useGuides.js` por la llamada a Firestore

Ver el código de ejemplo completo en la sección **Descargas** dentro de la aplicación.

---

## Agregar nuevas guías técnicas

### Opción A — Desde la interfaz
Usar el formulario en **Nueva guía** dentro de la aplicación.

### Opción B — Directamente en el código
Agregar un objeto al array `GUIDES` en `src/data/guides.js` siguiendo la estructura documentada al inicio del archivo.

---

## Equipos documentados

| Tipo      | Modelos                                                |
|-----------|--------------------------------------------------------|
| PC AIO    | HP All-in-One 440 G9 (81S76LS), Lenovo V530 AIO       |
| PC Torre  | Lenovo V520s, HP Compaq Pro 6300 Small, Lenovo M73     |
| Laptop    | HP ZBook X G1i 16"                                     |
| Impresora | HP LaserJet Pro MFP 4103fdw, MFP M281fdw, P1606dn      |

---

Desarrollado para el equipo de Soporte Técnico — UTS 2025
