# 🎭 Plataforma de Gestion de Eventos culturales - GEC

Este proyecto fue desarrollado en el marco de la **Tecnicatura Superior en Desarrollo de Software** del ISPC (Instituto Superior Politécnico Córdoba), como parte de la evaluacion del módulo **Full Stack I**.

Los espacios participantes fueron:

- **Programación II**  
- **Modelado y Arquitectura de Software**  
- **Práctica Profesionalizante**
---

## 📌 Descripción

**Gestor de Eventos Culturales** es una aplicación web destinada a facilitar la **organización, difusión e inscripción** a eventos culturales. Este sistema permite a usuarios de distintas categorías interactuar con la agenda cultural local mediante una interfaz intuitiva y responsive.

**Wiki del Proyecto:**  
📚 [Documentación del Proyecto](https://github.com/LosDesprogramadores/gestor-eventos-culturales-ispc/wiki)  

---

## 🧠 Objetivo del Proyecto

### 🎯 Objetivo General
Desarrollar una aplicación web que permita organizar y gestionar actividades culturales, facilitando a los usuarios la búsqueda, visualización, inscripción y gestión de su agenda de eventos.

### ✅ Objetivos Específicos
- Crear una interfaz adaptable para visualizar e inscribirse en eventos culturales.
- Implementar autenticación y gestión de perfiles de usuario.
- Desarrollar funcionalidades CRUD para gestores de eventos.
- Implementar un panel administrativo para supervisión de la plataforma.
- Incluir filtros de búsqueda, gestión de cupos, notificaciones y recordatorios.

---

## 💡 Problemática

Los organizadores de eventos culturales carecen de una herramienta centralizada para difundir y gestionar sus actividades. La plataforma busca **facilitar la interacción entre organizadores y el público**, mejorando la comunicación y promoviendo la participación ciudadana.

---

## 🛠️ Funcionalidades Principales

### Gestión de Usuarios
- Registro, login y recuperación de contraseña.
- Diferenciación de roles: visitante, usuario, gestor, administrador.

### Exploración de Eventos
- Filtros por fecha, categoría y ubicación.
- Visualización clara y detallada de eventos.

### Inscripción y Agenda
- Inscripción con control de cupos.
- Agenda personal con notificaciones por correo.

### Gestión de Eventos
- Creación, edición y eliminación de eventos (CRUD).
- Aprobación o rechazo de eventos por parte de administradores.

---

## 🗂️ Casos de Uso Principales

| Nº  | Caso de Uso                  | Descripción                                                                 |
|-----|------------------------------|-----------------------------------------------------------------------------|
| 1   | Inscribirse a evento         | Usuarios comunes se inscriben/cancelan inscripción.                        |
| 2   | Iniciar sesión               | Autenticación por roles.                                                   |
| 3   | Crear evento                 | Gestores registran eventos.                                                |
| 4   | Administrar eventos          | Admin supervisa, aprueba o rechaza eventos.                                |
| 5   | Explorar eventos             | Cualquier visitante puede navegar eventos.                                 |

---

## 🧩 Tecnologías Utilizadas

- **Frontend:** HTML5, CSS3 (con diseño responsive)
- **Backend:** En desarrollo 
- **Base de Datos:** En desarrollo
- **Control de versiones:** Git / GitHub
- **Metodología de trabajo:** Scrum
- **Documentación:** IEEE 830, Issues, Kanban board

---

## 👥 Equipo de Desarrollo - *Los Desprogramadores*

| Integrante        | Usuario GitHub     | Rol  |
|-------------------|--------------------|------|
| Aland Marini      | [@AlandMarini](https://github.com/AlandMarini)     | Developer |
| Julio Martín      | [@JulioMartin12](https://github.com/JulioMartin12) | Developer |
| Marcelo Portillo  | [@mapolab](https://github.com/mapolab)             | Developer |
| Juan I. Moreno    | [@Monky033](https://github.com/Monky033)           | Developer |
| TMonton           | [@TMonton](https://github.com/TMonton)             | Developer |

---

## 🔁 Avance SPRINT 1

Cada miembro del equipo aportó desde su rol a:
- Maquetado de páginas (Login, Registro, Quienes somos, Detalle de evento, Dashboard de usuario y Formulario de contacto)
- Construcción de base de datos (tablas, relaciones, atributos)
- Organización del repositorio y estandarización de commits
- Gestión del tablero Kanban e historias de usuario

---
## 🔁 Avance SPRINT 2 
Durante este Sprint 2, el equipo trabajó colaborativamente en el maquetado estático responsive de las páginas principales del proyecto, utilizando HTML, CSS y Bootstrap. Se logró cumplir con los objetivos planteados y se registraron los cambios en la rama principal (main).

- Cada integrante creó su portafolio web estático responsive, el portafolio se encuentra en la carpeta portfolio/ y los nombres de cada integrante.
- Actualización del Kanban y seguimiento del progreso de tareas asignadas.
- Se actualizo la documentación correspondiente de ser necesaria.

---
## 🔁 Avance SPRINT 3
Durante el Sprint 3, el equipo avanzó en la transformación del proyecto en una Aplicación de una Sola Página (SPA) utilizando Angular. Nos enfocamos en el desarrollo de componentes clave y en la implementación de un sistema de ruteo eficiente, así como en la integración de funcionalidades de formularios reactivos con validaciones.

Objetivos logrados
Creación de componentes: Se desarrollaron componentes para páginas esenciales como la landing page inicio(Home), Dashboard (panel usuario), Registro de Usuario, inicio sesión, Quiénes Somos y contacto.

-Sistema de ruteo: Se implementó un sistema de routing para permitir la navegación entre las diferentes vistas de la aplicación, garantizando que el usuario pueda moverse sin recargar la página.

-Formularios reactivos: Se crearon formularios reactivos con validaciones en los componentes de Login y Registro de Usuario, mejorando la experiencia del usuario y asegurando la integridad de los datos.

-Gestión de contenido (CRUD): Se inició el CRUD (Crear, Leer, Actualizar, Borrar) con la funcionalidad de alta de contenido, en línea con la perspectiva del modelo de negocio.

-Gestión de ramas: Se trabajó con la nueva rama Release (v0.1.0-alpha), siguiendo el sistema de branching definido, lo que permitió un control de versiones más organizado.

-Actualización del Kanban: Se mantuvo el Kanban actualizado para el seguimiento y gestión de las tareas asignadas.

---
## 🔁 Avance SPRINT 4

En este sprint, el equipo se enfocó en el desarrollo de una Aplicación de una Sola Página (SPA) con Angular, logrando un frontend dinámico y avanzando en el diseño de la base de datos. La principal meta fue implementar la integración de servicios que consumen APIs de prueba para evitar el uso de datos "hardcodeados" en las vistas.

Gestión de la Base de Datos:

Se trabajó en la creación del Diagrama de Entidad-Relación (DER), el modelo relacional y el script de la base de datos. También se implementó el dinamismo de la aplicación utilizando una base de datos simulada en formato JSON (db.json).

Desarrollo del Frontend:

Se implementó el dinamismo en la vista de registro de nuevos usuarios y se creó un servicio para gestionar el flujo de registro.

Se desarrollaron los servicios de autenticación para el inicio de sesión y deslogueo, con la sesión guardada en localStorage. Se definieron y mapearon los roles de usuario (ANON, USER, GESTOR).

El Navbar se hizo dinámico para que cambie según el rol del usuario, mostrando opciones personalizadas.

Se dio dinamismo al panel de gestor y panel de usuario, permitiendo la creación y eliminación de eventos a través de formularios.

Se actualizaron los estilos de formularios, como el de la sección de contacto, y se agregó validación lógica para mejorar la experiencia de usuario.

Se creó un servicio para consumir de manera dinámica la lista de miembros del equipo en la sección "Quiénes Somos".

Objetivos del Sprint Cumplidos
App SPA (frontend dinámico - Angular): Se desarrollaron y dinamizaron las páginas de Registro, Inicio de Sesión, Dashboards, Gestión de Contenido (CRUD) y Quiénes Somos. Se implementaron servicios que consumen APIs de prueba para los datos de la aplicación, eliminando el uso de datos estáticos.

Diseño de Base de Datos: Se completó el diseño de la base de datos en sus modelos conceptual (DER), lógico (modelo relacional) y físico (definición de tipos de datos), además de generar el script de creación de la base de datos.

---
## 🔁 Avance SPRINT 5

El Sprint 5 estuvo enfocado en la transición del proyecto hacia una arquitectura fullstack, con un fuerte énfasis en el desarrollo del backend (API Rest con Django) y la preparación para el despliegue, con el fin de cumplir con el objetivo de tener una aplicación SPA conectada a una API real.

Desarrollo del Backend y la API Rest
El foco principal fue la implementación de la capa de servicio (Django) para dar soporte a las funcionalidades del Goal. Se preparó el entorno de desarrollo y se inició la definición de los módulos y endpoints REST necesarios para gestionar usuarios, eventos y datos. Esto incluye la lógica esencial de registro, login y las operaciones CRUD, además de la implementación de medidas básicas de seguridad como el hashing de contraseñas.

Infraestructura y Base de Datos
Se armó todo pensando en el despliegue del proyecto en Render y que la base de datos esté pensada para PostgreSQL, cumpliendo con la sugerencia técnica del goal. Asimismo, se realizaron tareas en el diseño de datos, corrigiendo los modelos y el script de la base de datos para asegurar una estructura sólida.

Ajustes en el Frontend y la Gestión
Aunque el foco fue el backend, se ejecutaron mejoras de refactoring y corrección de bugs en el frontend (CSS, formularios) para mantener la calidad del SPA. El equipo también dedicó tiempo a las Ceremonias y la Documentación, asegurando una correcta planificación del sprint y la formalización de los procesos.
