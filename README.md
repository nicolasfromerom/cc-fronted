# Fronted - Prueba de Desarrollador Full-Stack
Este proyecto fue generado con Vue CLI 5.0.4

## Installation

- Clonar el repositorio

- Instalar proyecto con npm

    - Dentro de la raíz del proyecto ejecutar:

```bash
  npm install
```
    
## Deployment

En la carpeta src/environment se encontrará el archivo environment.js, en el cual se debe configurar la url del api del backend de la prueba



```bash
    const environment = {
        api: 'http://127.0.0.1:8000/api',
    }
```
Para desplegar este proyecto en modo de desarrollo ejecutar: 

```bash
  npm run serve
```
Para desplegar este proyecto en modo produccion ejecutar

```bash
  npm run build
```