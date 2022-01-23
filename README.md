# Challenge Wazuh

[Como Correr el proyecto](#como-correr-el-proyecto)
  - [Instalación](#instalacion)

## Como Correr el Front

### Instalación

```
git clone https://github.com/kelm2020/challenge-wz
cd challenge-wz/client
npm install

```
Levantar la app:

```
npm start
```

Automaticamente abrira el navegador en http://localhost:3000/ desde donde podemos visualizar el FrontEnd.

La aplicación es responsive, y está construida con React, Typescript, D3 js (para el gráfico) y material-ui.


## Como Correr el servidor

### Instalación

```
cd challenge-wz/server
npm install

```
Levantar la app:

```
node index.js o nodemon
```

Automaticamente quedará corriendo el server en http://localhost:5000/ 

El server está contruido con Node js y Express js, con los endpoints requeridos en el challenge.
