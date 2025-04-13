# API Carrito Inteligente 🛒🤖

Este proyecto es una API desarrollada en Node.js para controlar un carrito inteligente con ESP32. La API permite registrar movimientos, cambiar entre modos de operación (manual/automático), y cambiar datos como velocidadd e los motores y distancia del sensor ultrasonico.

---

## 📦 Tecnologías utilizadas

- Node.js
- Express
- MySQL2 (con promesas)
- CORS
- Dotenv

---

## 📁 Estructura del proyecto

```
apiCarrito/
├── controllers/
├── routes/
├── db/
├── .env
├── index.js
```

---

## ⚙️ Funcionalidades principales

- 📥 Guardar movimientos del carrito.
- 🔁 Cambiar entre modo manual y automático.
- 🚀 Actualizar velocidad de movimiento de los motores reductores.
- 📏 Actualizar distancia de lectura de un sensor ultrasonico.

---

## 🔌 Endpoints disponibles

### POST `/movimientos`
Guarda un nuevo movimiento del carrito.

**Body ejemplo:**
```json
{
  "direccion": "adelante", // "adelante", "atras", "izquierda", "derecha" 
  "velocidad": 45,
  "distancia": 30
}
```

---

### PUT `/modo`
Actualiza el modo de operación del carrito (`manual` o `automatico`).

**Body ejemplo:**
```json
{
  "modo": "manual"
}
```
  
  ---

### PUT `/velocidad`
Actualiza la velocidad de operación del carrito (0-255).

**Body ejemplo:**
```json
{
  "velocidad": 123 //int entre 0-255
}
```

---

### PUT `/distancia`
Actualiza la distancia de operación del carrito (2-400 "Respresentados en cm").

**Body ejemplo:**
```json
{
  "distancia": 10 //int 2-400
}
```

---

## 🛠 Instalación y uso

```bash
# Clonar el repositorio
git clone https://github.com/luisdev265/apiCarrito

# Instalar dependencias
npm install

# Crear archivo .env y agregar:
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=nombre_base_de_datos

# Iniciar el servidor
npm start
```

---

## 🧠 Notas

-Este proyecto se comunica con una ESP32, que actúa como cliente, enviando datos a esta API mediante HTTP. Ideal para proyectos de robótica y automatización educativa.

-Modo manual se hizo conla finalidad de controlar con una app hecha en android pero por su lentitud se diseño una solucion implementando webSockets Link de la solución: https://github.com/luisdev265/webSocketCarrito

---

## 👨‍💻 Autor

- Luis Dev (@luisdev265)
