# Cinema Roles

Una aplicación web estática que muestra información detallada sobre los roles y departamentos en la producción cinematográfica.

## Descripción

Cinema Roles es un recurso educativo que cataloga los siete departamentos principales de una producción de cine, presentando perfiles detallados de cada rol con sus responsabilidades, conocimientos requeridos y habilidades.

## Características

- **7 Departamentos**: Dirección, Fotografía, Grips/Mecánica, Arte, Sonido, Producción y Postproducción
- Perfiles detallados de roles con responsabilidades y habilidades
- Diseño responsive con CSS Grid y variables personalizadas
- Navegación con botón de "volver arriba"
- Iconos de Material Symbols Outlined

## Tecnologías

- HTML5 semántico
- CSS3 (Grid, Custom Properties)
- JavaScript ES6+ Modules (.mjs)
- Google Fonts (Material Symbols Outlined)

## Estructura del Proyecto

```
cinema-roles/
├── index.html              # Punto de entrada principal
├── css/
│   └── main.css            # Estilos (Grid, variables, tarjetas)
├── js/
│   ├── index.mjs           # Entry point principal
│   ├── fillData.mjs        # Popula la página con datos
│   └── scrollFunction.mjs # Funcionalidad scroll-to-top
├── data/
│   ├── roles.mjs           # Datos de roles (módulo ES)
│   └── roles.json          # Datos en formato JSON (alternativo)
└── .vscode/
    └── settings.json       # Configuración de VS Code
```

## Uso

No requiere proceso de build ni dependencias. Simplemente abre `index.html` en el navegador.

Para desarrollo local, puedes usar:

- Extensión Live Server en VS Code
- Cualquier servidor HTTP local

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
