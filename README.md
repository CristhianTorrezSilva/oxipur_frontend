# OXIPUR - Portal Logístico de Oxígeno Medicinal

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Security](https://img.shields.io/badge/Security-First-red?style=for-the-badge&logo=google-cloud-security&logoColor=white)

**OXIPUR** es una solución integral diseñada para optimizar la cadena de suministro y distribución de oxígeno medicinal. Este portal facilita la gestión de pedidos, la planificación de rutas logísticas y el control de entregas en tiempo real, garantizando la eficiencia en un sector donde cada minuto cuenta.

---

## 🛡️ Enfoque en Seguridad (Security-First)

Como **Jr Penetration Tester & Dev Jr**, este proyecto ha sido desarrollado bajo principios de **Defensa en Profundidad**. Aunque es un entorno Frontend, se han implementado capas de seguridad robustas para mitigar riesgos comunes:

- **Sanitización de Inputs:** Prevención activa contra ataques **XSS (Cross-Site Scripting)** mediante la limpieza y validación rigurosa de entradas de usuario antes de ser procesadas o renderizadas.
- **Simulación de MFA (Multi-Factor Authentication):** Proceso de login en dos pasos que requiere una segunda validación, elevando el estándar de seguridad de las cuentas.
- **RBAC (Role-Based Access Control) Estricto:** Protección de rutas mediante componentes de orden superior (`ProtectedRoute`) que validan roles y permisos antes de permitir el acceso a módulos críticos.
- **Gestión Segura de Sesiones:** Implementación de persistencia de tokens simulados y limpieza de datos sensibles al cerrar la sesión.
- **Integridad de Datos (Soft Delete):** Los registros críticos (como usuarios) utilizan una lógica de "borrado suave", permitiendo la auditoría y recuperación de datos en caso de errores operativos.

---

## 🏗️ Arquitectura y Clean Code

El proyecto sigue una arquitectura modular enfocada en la escalabilidad y mantenibilidad:

- **Componentes Atómicos:** UI construida a partir de componentes reutilizables y desacoplados (Buttons, Cards, Badges).
- **Separation of Concerns (SoC):** Clara distinción entre la lógica de negocio (hooks y utilidades), la gestión de estado y la capa de presentación.
- **Optimización de UI:** Uso de Tailwind CSS para un diseño responsivo, moderno y consistente.

---

## 🚀 Funcionalidades Clave

### 📍 Planificador Logístico Inteligente
Optimización de rutas de entrega mediante el **Algoritmo Nearest Neighbor**. El sistema calcula automáticamente la secuencia más eficiente para los choferes, minimizando tiempos y consumo de combustible basándose en la ubicación de los pedidos.

### 📱 App Móvil para Choferes
Interfaz dedicada y optimizada para dispositivos móviles que permite a los transportistas:
- Visualizar su ruta asignada.
- Acceder a información detallada del cliente y pedido.
- Confirmar entregas con validación de coordenadas (Simulación GPS).
- Acceso directo a contactos de emergencia.

### 👥 Gestión de Identidades y Usuarios
Módulo administrativo para el ciclo de vida completo del personal:
- Altas, bajas (bloqueo) y edición de perfiles.
- Asignación de roles operativos (Admin, Ventas, Logística, Chofer).
- Registro de última actividad para auditoría interna.

---

## 🛠️ Stack Tecnológico

- **Core:** React 18 + Vite
- **Estilos:** Tailwind CSS
- **Iconografía:** Lucide React
- **Navegación:** React Router DOM (v6)

---

## 🔧 Instalación y Ejecución

Sigue estos pasos para levantar el entorno de desarrollo localmente:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/oxipur-frontend.git
   ```
2. **Instalar dependencias:**
   ```bash
   npm install
   ```
3. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```
4. **Acceso de prueba:**
   - **Usuario:** `admin` | **Password:** `Cualquier valor`
   - **Código MFA:** `1234` (o cualquier código de 4 dígitos)

---

## 👨‍💻 Autores

**Cristhian Torrez Silva**  
*Jr Penetration Tester & Dev Jr*

**Guillermo Torres**  
*Dev Jr*

---
*Este proyecto es parte de nuestro portafolio, demostrando un enfoque proactivo en seguridad y desarrollo de software.*
