---
date: 2026-01-16
authors:
  - pablo
categories:
  - Tutorial
tags:
  - MkDocs
  - Documentación
  - GitHub Actions
readtime: 8
---

# Creando mi Repositorio con Material for MkDocs

En este tutorial completo, te guío paso a paso para crear un sitio de documentación profesional usando **Material for MkDocs**, incluyendo entorno virtual, despliegue automático y buenas prácticas.

<!-- more -->

## ¿Por qué Material for MkDocs?

Material for MkDocs es una herramienta excelente para crear documentación técnica profesional:

| Característica | Beneficio |
| :--- | :--- |
| :material-language-markdown: **Markdown** | Escribir documentación es simple y rápido |
| :material-palette: **Material Design** | Tema moderno con modo oscuro/claro automático |
| :material-puzzle: **Plugins** | Blog, tags, búsqueda, social cards, lightbox... |
| :material-currency-usd-off: **Gratis** | Deploy gratuito en GitHub Pages |
| :material-rocket-launch: **CI/CD** | Automatización con GitHub Actions |

---

## Paso 1: Crear Entorno Virtual

!!! warning "¿Por qué usar entorno virtual?"
    - **Aislamiento**: Las dependencias del proyecto no afectan al sistema
    - **Reproducibilidad**: Puedes recrear el entorno exacto en otro equipo
    - **Limpieza**: Al borrar el proyecto, se borran sus dependencias
    - **Versiones**: Puedes tener diferentes versiones de paquetes por proyecto

=== "Windows (PowerShell)"
    ```powershell
    # Crear entorno virtual
    python -m venv venv
    
    # Activar entorno
    .\venv\Scripts\Activate
    
    # Verificar (aparece (venv) en el prompt)
    ```

=== "Linux / Mac"
    ```bash
    # Crear entorno virtual
    python3 -m venv venv
    
    # Activar entorno
    source venv/bin/activate
    
    # Verificar (aparece (venv) en el prompt)
    ```

---

## Paso 2: Instalar MkDocs Material

Con el entorno virtual activado:

```bash
pip install mkdocs-material mkdocs-glightbox
```

!!! tip "Plugins recomendados"
    - `mkdocs-glightbox`: Zoom en imágenes al hacer clic
    - El blog ya viene incluido en Material for MkDocs

---

## Paso 3: Crear el Proyecto

```bash
mkdocs new mi-portfolio
cd mi-portfolio
```

Esto crea la estructura básica:

```
mi-portfolio/
├── docs/
│   └── index.md      # Página principal
├── mkdocs.yml        # Configuración
└── venv/             # Entorno virtual (ya lo tenías)
```

---

## Paso 4: Configurar .gitignore

!!! danger "Importante"
    Nunca subas el entorno virtual ni archivos de caché a Git.

Crea un archivo `.gitignore` en la raíz del proyecto:

```gitignore title=".gitignore"
# Entorno virtual
venv/
.venv/

# Archivos de Python
__pycache__/
*.pyc

# Build de MkDocs
site/

# Caché de MkDocs
.cache/

# IDE
.vscode/
.idea/

# Sistema
.DS_Store
Thumbs.db
```

---

## Paso 5: Ejecutar en Local

Para ver tu sitio mientras trabajas:

=== "Opción 1: Activar y ejecutar"
    ```powershell
    .\venv\Scripts\Activate
    mkdocs serve
    ```

=== "Opción 2: Ejecutar directo"
    ```powershell
    .\venv\Scripts\mkdocs.exe serve
    ```

Abre tu navegador en: `http://127.0.0.1:8000`

!!! success "Hot Reload"
    Cualquier cambio que guardes se refleja automáticamente en el navegador.

---

## Paso 6: Automatizar Despliegue con GitHub Actions

Esta es la magia: cada vez que hagas `git push`, tu sitio se actualiza automáticamente en GitHub Pages.

### Crear el workflow

Crea el archivo `.github/workflows/ci.yml`:

```yaml title=".github/workflows/ci.yml"
name: ci 
on:
  push:
    branches:
      - main
permissions:
  contents: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Configure Git Credentials
        run: |
          git config user.name github-actions[bot]
          git config user.email 41898282+github-actions[bot]@users.noreply.github.com
      
      - uses: actions/setup-python@v5
        with:
          python-version: 3.x
      
      - run: echo "cache_id=$(date --utc '+%V')" >> $GITHUB_ENV 
      
      - uses: actions/cache@v4
        with:
          key: mkdocs-material-${{ env.cache_id }}
          path: .cache
          restore-keys: |
            mkdocs-material-
      
      - run: pip install mkdocs-material mkdocs-glightbox
      
      - run: mkdocs gh-deploy --force
```

### Configurar GitHub Pages

1. Ve a tu repositorio en GitHub
2. **Settings** → **Pages**
3. En "Source" selecciona: **Deploy from a branch**
4. Selecciona la rama `gh-pages` (se crea automáticamente)
5. Haz `git push` y espera unos minutos

!!! success "¡Listo!"
    Tu sitio estará disponible en: `https://TU_USUARIO.github.io/TU_REPO/`

---

## Estructura Final del Proyecto

```
mi-portfolio/
├── .github/
│   └── workflows/
│       └── ci.yml          # GitHub Actions
├── docs/
│   ├── assets/
│   │   ├── images/         # Capturas y logos
│   │   └── stylesheets/    # CSS personalizado
│   ├── blog/
│   │   ├── posts/          # Artículos del blog
│   │   └── index.md
│   └── index.md            # Página principal
├── .gitignore
├── mkdocs.yml              # Configuración principal
└── venv/                   # NO se sube a Git
```

---

## Resumen de Comandos

| Acción | Comando |
| :--- | :--- |
| Crear entorno virtual | `python -m venv venv` |
| Activar entorno | `.\venv\Scripts\Activate` |
| Instalar dependencias | `pip install mkdocs-material mkdocs-glightbox` |
| Ejecutar en local | `mkdocs serve` |
| Subir cambios | `git add . && git commit -m "mensaje" && git push` |

---

!!! abstract "Próximo paso"
    ¿Ya tienes tu entorno configurado? Aprende a documentar tus proyectos con mi [Plantilla de Documentación](2026-01-23-plantilla-documentacion.md).

---

¡Gracias por leer! Si tienes preguntas, no dudes en contactarme.
