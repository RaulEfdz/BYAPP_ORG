# Documento Técnico de Proyecto: FIRE-BY
**Plataforma Inteligente para la Gestión Integral de Eventos (MVP)**

**Versión:** 2.1 (Nombre actualizado)
**Fecha:** 26 de Octubre de 2023
**Lema:** ORIENTA - SUGIERE - CONECTA

---

## 1. Visión y Propósito del Proyecto

En el dinámico mundo de la organización de eventos, la eficiencia, la precisión y la capacidad de conectar con los recursos adecuados son cruciales. **FIRE-BY** nace con la visión de transformar la complejidad de la planificación de eventos en una experiencia ágil, intuitiva e inteligente. Nuestra plataforma se erige sobre tres pilares fundamentales: **Orientar** al usuario a través de cada fase, **Sugerir** las mejores opciones y recursos mediante un sistema progresivamente inteligente, y **Conectar** de manera efectiva a organizadores con proveedores.

Este documento detalla la arquitectura y funcionalidades del **Producto Mínimo Viable (MVP)**, diseñado para validar nuestras hipótesis centrales y entregar valor tangible desde el primer momento, utilizando **Next.js** como piedra angular tecnológica para una experiencia de usuario moderna y eficiente.

---

## 2. Objetivos Estratégicos del MVP

El MVP de **FIRE-BY** se concentrará en alcanzar los siguientes objetivos estratégicos:

1.  **Implantar un Sistema Fundamental de Recomendación de Proveedores:** Establecer una base de datos robusta y un sistema de filtrado avanzado que facilite a los usuarios la identificación y selección de proveedores, sentando las bases para futuras capacidades de IA.
2.  **Proveer una Organización Estructurada e Intuitiva del Evento:** Ofrecer herramientas esenciales para la creación, seguimiento y gestión cronológica de eventos y sus tareas asociadas, asegurando una planificación sin fisuras.

---

## 3. Alcance del Producto Mínimo Viable (MVP): Módulos Clave

Los siguientes módulos constituyen el núcleo funcional del MVP de **FIRE-BY**:

### A. Corazón de la Operación: Gestión de Eventos
*   **Funcionalidades Clave del MVP:**
    *   Creación, edición y eliminación intuitiva de eventos.
    *   Registro detallado de datos básicos: Nombre, fechas (inicio/fin), lugar, información del cliente, tipo de evento (seleccionable), presupuesto global y número de invitados.
    *   Gestión de presupuestos y cotizaciones: Registro centralizado de costos asociados a proveedores y capacidad para adjuntar/almacenar cotizaciones, facilitando un seguimiento financiero básico.
    *   Sistema de notificaciones (push o internas) para alertas y recordatorios críticos.
*   **Componentes Tecnológicos Clave:** Formularios dinámicos (Next.js), Endpoints API (Next.js API Routes o backend dedicado), Base de Datos, Servicio de Notificaciones.

### B. Planificación Visual: Panel de Cronograma (Timeline/Timming)
*   **Funcionalidades Clave del MVP:**
    *   Asignación de tareas a etapas específicas del evento (ej: pre-producción, montaje, ejecución, catering, sonido, desmontaje).
    *   Vistas temporales flexibles: Día, semana y mes para una visualización clara del progreso y plazos.
*   **Componentes Tecnológicos Clave:** Librerías UI para calendarios/Gantt (ej: FullCalendar, React Big Calendar), API Endpoints.

### C. Control Logístico: Gestión de Tareas
*   **Funcionalidades Clave del MVP:**
    *   Creación y asignación de tareas a usuarios responsables (dentro del equipo o al propio organizador).
    *   Seguimiento visual del estado de cada tarea: Pendiente, En Proceso, Terminado.
    *   Establecimiento de fechas límite con alertas automáticas para garantizar el cumplimiento.
*   **Componentes Tecnológicos Clave:** Interfaces de listas/Kanban, API Endpoints, Sistema de Notificaciones.

### D. Red de Soporte: Módulo de Proveedores y Recursos
*   **Funcionalidades Clave del MVP:**
    *   Base de datos de proveedores: Editable, con información esencial (nombre, tipo de servicio, contacto, ubicación).
    *   Vinculación directa de proveedores y recursos específicos a tareas del evento.
    *   Registro de costos, estado de reserva y disponibilidad básica de recursos asociados a proveedores o tareas.
*   **Componentes Tecnológicos Clave:** Operaciones CRUD para proveedores, API Endpoints, Lógica de asignación.

### E. Vista de Mando: Dashboard Básico de Seguimiento
*   **Funcionalidades Clave del MVP:**
    *   Listado consolidado de eventos activos bajo la gestión del usuario.
    *   Indicadores clave de rendimiento (KPIs) visuales: Progreso general del evento (basado en tareas completadas), identificación de tareas críticas y visualización de próximos vencimientos.
*   **Componentes Tecnológicos Clave:** Componentes UI para gráficos y KPIs, Agregación de datos vía API.

---

## 4. Flujos de Usuario Esenciales en el MVP

Los flujos de usuario primordiales para el MVP son:

1.  **Ciclo Completo de Creación y Gestión de Evento:**
    *   `Usuario Inicia:` Crea un nuevo evento (ingresando datos básicos).
    *   `Planifica:` Agrega y detalla tareas (manual o desde plantillas básicas).
    *   `Conecta:` Busca, filtra y asigna proveedores a las tareas.
    *   `Visualiza:` Revisa el cronograma global del evento.
    *   `Ejecuta y Cierra:` Marca tareas como completadas y sigue el progreso.
2.  **Seguimiento Proactivo y Alertas:**
    *   `Usuario Accede:` Realiza login en la plataforma.
    *   `Supervisa:` Visualiza el dashboard con el estado de sus eventos asignados.
    *   `Se Mantiene Informado:` Recibe alertas (notificaciones) sobre tareas pendientes, vencimientos o actualizaciones críticas.

---

## 5. Arquitectura Tecnológica Propuesta (MVP y Escalabilidad Futura)

*   **Frontend:** **Next.js (React)**, aprovechando SSR/SSG para optimización y CSR para interactividad.
*   **Backend:**
    *   **MVP:** **Next.js API Routes (Node.js)** para agilidad y desarrollo unificado.
    *   **Escalabilidad:** Preparado para migrar o complementar con un backend dedicado (ej: Node.js/NestJS, Python/FastAPI) según crezcan las necesidades.
*   **Autenticación:** **NextAuth.js** para una gestión de identidad robusta y flexible.
*   **Base de Datos:** **PostgreSQL** (recomendado por su fiabilidad y características avanzadas) o **Supabase** (PostgreSQL como BaaS para acelerar el desarrollo del MVP).
*   **ORM/Query Builder:** **Prisma** para una interacción segura y eficiente con la base de datos.
*   **Despliegue:** **Vercel** (ideal para Next.js), Netlify, o plataformas cloud (AWS, GCP) para mayor control.
*   **Notificaciones:** **Firebase Cloud Messaging (FCM)** u otro servicio PUSH robusto.

---

## 6. Modelo de Datos Esencial (MVP)

Las entidades principales para el MVP incluirán (con atributos clave):

*   `User`: (id, nombre, email, hashedPassword, rol)
*   `Event`: (id, userId (creador), nombre, fechaInicio, fechaFin, lugar, cliente, tipoEvento, presupuesto, invitados, estado)
*   `Task`: (id, eventId, nombre, descripcion, fechaLimite, estado, asignadoAUserId, proveedorId)
*   `Provider`: (id, nombre, tipoServicio, email, telefono, ubicacion, notas)
*   `EventProviderLink`: (eventId, providerId, taskId (opcional), costoAcordado, cotizacionUrl)
*   `Notification`: (id, userId, mensaje, tipo, leida, fecha, link)

*(Este modelo se refinará durante la fase de diseño detallado).*

---

## 7. La Inteligencia de FIRE-BY: Del MVP al Futuro

El lema "ORIENTA - SUGIERE - CONECTA" guiará la evolución de la inteligencia en la plataforma **FIRE-BY**:

*   **MVP - Inteligencia Asistida y Fundacional:**
    *   **ORIENTA:** A través de una interfaz clara, flujos de trabajo lógicos y la posibilidad de plantillas de tareas básicas.
    *   **SUGIERE:** Mediante un potente sistema de **búsqueda y filtrado avanzado** en el módulo de proveedores, permitiendo encontrar coincidencias por tipo de servicio, ubicación y palabras clave.
    *   **CONECTA:** Facilitando la asignación de proveedores a tareas específicas y centralizando la información del evento.

*   **Post-MVP - Desplegando el Potencial de la IA:**
    *   **Motor de Recomendación de Proveedores (Machine Learning):** Utilizando datos históricos y perfiles para ofrecer sugerencias personalizadas y altamente relevantes.
    *   **Asistente Inteligente de Planificación:** Sugerencias proactivas de tareas, estimaciones de tiempo y optimización de cronogramas basadas en IA.
    *   **Optimización Inteligente de Presupuestos:** Recomendaciones para maximizar el valor dentro de las restricciones presupuestarias.

---

## 8. Hoja de Ruta del Desarrollo (Foco MVP)

1.  **Fase 1: Diseño y Prototipado UX/UI:** Creación de wireframes y prototipos interactivos centrados en los flujos MVP.
2.  **Fase 2: Configuración de Entorno y Backend Core:** Establecimiento de la infraestructura, base de datos y APIs esenciales (Autenticación, Eventos, Tareas).
3.  **Fase 3: Desarrollo Frontend (Módulos A, C, E):** Implementación de Gestión de Eventos, Tareas y Dashboard.
4.  **Fase 4: Desarrollo Frontend (Módulos B, D):** Implementación del Cronograma y Módulo de Proveedores.
5.  **Fase 5: Integración, Pruebas Exhaustivas y Refinamiento:** Pruebas unitarias, de integración y de usuario. Corrección de errores.
6.  **Fase 6: Despliegue del MVP y Lanzamiento Inicial.**
7.  **Fase 7: Monitorización, Recopilación de Feedback e Iteración.**

---

## 9. Consideraciones Estratégicas y Riesgos Potenciales

*   **Adopción y Carga Inicial de Datos:** Estrategias para incentivar el registro de usuarios y la carga inicial de proveedores.
*   **Mantener el Foco en el MVP:** Evitar la desviación del alcance ("scope creep") para asegurar una entrega ágil.
*   **Escalabilidad Técnica:** Aunque el MVP se diseñe para ser eficiente, la arquitectura debe permitir un crecimiento futuro sin reescrituras masivas.
*   **Calidad de Datos para IA Futura:** Desde el MVP, asegurar la captura de datos estructurados que alimentarán los modelos de IA.

---

## 10. Conclusión y Próximos Pasos Inmediatos

**FIRE-BY** tiene el potencial de redefinir la gestión de eventos a través de una plataforma robusta, intuitiva y progresivamente inteligente. El MVP descrito aquí establece una base sólida para lograr esta visión.

**Próximos Pasos:**
1.  Validación final del alcance del MVP con los stakeholders.
2.  Inicio de la fase de Diseño UX/UI detallado.
3.  Planificación del sprint inicial de desarrollo.

---

Puntos Clave Unificadores para la IA Constructora:
Supabase como Backend Único: Todas las operaciones de base de datos y autenticación se centralizan en Supabase.
NextAuth.js con Supabase Adapter: Maneja las sesiones y la integración con Supabase Auth en cada aplicación Next.js.
Route Handlers en Next.js: Toda la lógica de API (backend) para cada aplicación reside dentro de su propia estructura app/api/....
RLS en Supabase: Es la principal capa de seguridad de datos, definida directamente en Supabase y basada en los roles de los usuarios (ORGANIZER, PROVIDER, ADMIN).
service_role Key para Admin: La app de Admin puede necesitar usar la service_role key de Supabase en su backend (Route Handlers) para operaciones que requieren bypass de RLS. Esto debe manejarse con extrema seguridad.
Diseño Unificado: Las tres aplicaciones deben compartir una biblioteca de componentes UI base (Tailwind CSS) para consistencia, pero cada una tendrá un color de acento distintivo para diferenciarlas visualmente.
Schema de Base de Datos Compartido: Un único schema.prisma (o definición de tablas en Supabase) sirve para las tres aplicaciones.
