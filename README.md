# Cinema Roles

Una aplicación web estática que muestra información detallada sobre los roles y departamentos en la producción cinematográfica.

## Descripción

Cinema Roles es un recurso educativo que cataloga los siete departamentos principales de una producción de cine, presentando perfiles detallados de cada rol con sus responsabilidades, conocimientos requeridos y habilidades.

## Características

- **7 Departamentos**: Dirección, Fotografía, Grips/Mecánica, Arte, Sonido, Producción y Postproducción
- Perfiles detallados de roles con responsabilidades y habilidades
- Búsqueda y filtrado por departamento y favoritos
- Modo oscuro/claro con persistencia
- Guardar favoritos (bookmarks) con localStorage
- Modal de detalles de rol
- Diseño responsive con CSS Grid y variables personalizadas
- Navegación con botón de "volver arriba"
- Iconos de Material Symbols Outlined

## Tecnologías

- HTML5 semántico
- CSS3 (Grid, Custom Properties)
- JavaScript ES6+ Modules (.mjs)
- Google Fonts (Material Symbols Outlined)
- Vitest para pruebas unitarias

## Estructura del Proyecto

```
cinema-roles/
├── index.html              # Punto de entrada principal
├── css/
│   └── main.css            # Estilos (Grid, variables, tarjetas)
├── js/
│   ├── index.mjs           # Entry point principal
│   ├── bookmarks.mjs       # Gestión de favoritos
│   ├── fillData.mjs        # Popula la página con datos
│   ├── modal.mjs           # Modal de detalles
│   ├── scrollFunction.mjs  # Funcionalidad scroll-to-top
│   ├── searchFunction.mjs  # Búsqueda y filtrado
│   └── themeToggle.mjs     # Toggle de tema oscuro/claro
├── data/
│   ├── roles.mjs           # Datos de roles (módulo ES)
│   └── roles.json          # Datos en formato JSON (alternativo)
├── test/                   # Pruebas unitarias (Vitest)
│   ├── bookmarks.test.js
│   ├── fillData.test.js
│   ├── modal.test.js
│   ├── roles.test.js
│   ├── scroll.test.js
│   ├── search.test.js
│   └── theme.test.js
├── vitest.config.mjs       # Configuración de Vitest
├── eslint.config.mjs       # Configuración de ESLint
├── .prettierrc            # Configuración de Prettier
└── .vscode/
    └── settings.json       # Configuración de VS Code
```

## Uso

No requiere proceso de build ni dependencias. Simplemente abre `index.html` en el navegador.

Para desarrollo local, puedes usar:

- Extensión Live Server en VS Code
- Cualquier servidor HTTP local

## Pruebas

El proyecto utiliza Vitest para pruebas unitarias. Para ejecutar las pruebas:

```bash
npm test           # Ejecutar pruebas en modo watch
npm run test:coverage  # Ejecutar con reporte de cobertura
```

Cobertura actual:

- Statements: 99.39%
- Branches: 84.04%
- Functions: 100%
- Lines: 99.36%

## Estructura de Datos

Los datos de los roles se encuentran en `data/roles.mjs` e incluyen:

- Descripción del departamento
- Nombre y descripción del rol
- Responsabilidades
- Áreas de conocimiento
- Habilidades requeridas
- Ejemplos de profesionales (opcional)

## Licencia

MIT
