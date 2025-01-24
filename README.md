# WebSockets Express Project

Este proyecto demuestra la comunicación entre dos servidores utilizando WebSockets y Express.

## Estructura del Proyecto

- `servidor A`
  - `server_a.js`: Configura el Servidor A y se conecta al Servidor B.
- `servidor B`
  - `server_b.js`: Configura el Servidor B y se conecta al Servidor A.

## Requisitos

- Node.js
- npm

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd websockets-express
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```

## Uso

1. Inicia el Servidor A:
   ```bash
   node servidor\ A/server_a.js
   ```
2. Inicia el Servidor B:
   ```bash
   node servidor\ B/server_b.js
   ```

## Endpoints

- **Servidor A**

  - `GET /`: Devuelve un mensaje indicando que es el Servidor A.
  - `POST /mensaje`: Envía un mensaje al Servidor B.

- **Servidor B**
  - `GET /`: Devuelve un mensaje indicando que es el Servidor B.

## Comunicación entre Servidores

- El Servidor A se conecta al Servidor B y viceversa utilizando Socket.io.
- Ambos servidores pueden enviar y recibir mensajes entre sí.

## Ejemplo de Uso

1. Envía un mensaje desde el Servidor A al Servidor B:

   ```bash
   curl -X POST http://localhost:3000/mensaje -H "Content-Type: application/json" -d '{"message": "Hola B"}'
   ```

2. Observa la consola del Servidor B para ver el mensaje recibido y la respuesta enviada.
