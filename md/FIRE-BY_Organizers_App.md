# Especificaciones para la App de Organizadores FIRE(MVP)

**Objetivo General:** Construir una aplicación web Next.js para **Organizadores de Eventos** que les permita planificar, gestionar y ejecutar eventos de manera eficiente, utilizando la plataforma FIRE-BY.

**Tecnologías Principales:**
1.  **Framework Frontend/Backend:** Next.js (con React)
2.  **Lenguaje:** TypeScript
3.  **Gestión de Estado (Frontend):** Zustand o Context API
4.  **Estilos:** Tailwind CSS (con un tema base unificado y un color distintivo para Organizadores)
5.  **Autenticación:** NextAuth.js, utilizando el **Proveedor de Supabase Auth**. La gestión de usuarios (roles, etc.) se hará a través de Supabase y se reflejará en los tokens/sesiones de NextAuth.
6.  **Backend Logic:** Implementada exclusivamente en **Route Handlers (`app/**/route.ts`)** de Next.js.
7.  **Base de Datos:** PostgreSQL en **Supabase** (instancia única compartida por las 3 apps). El acceso a datos se regirá por **Políticas de Seguridad a Nivel de Fila (RLS)** en Supabase, basadas en el rol del usuario autenticado.

---

## 1. Estructura del Proyecto (App Organizadores)

*   **Inicializar Proyecto Next.js:** `fire-by-organizers`
*   **Estructura de Carpetas Sugerida:**
    ```
    /fire-by-organizers
    ├── /app
    │   ├── (auth) # Rutas para el flujo de autenticación NextAuth/Supabase
    │   │   ├── login/page.tsx
    │   │   └── register/page.tsx
    │   ├── (app) # Rutas protegidas para Organizadores
    │   │   ├── dashboard/page.tsx
    │   │   ├── events/
    │   │   │   ├── page.tsx
    │   │   │   ├── [eventId]/
    │   │   │   │   ├── page.tsx
    │   │   │   │   └── timeline/page.tsx
    │   │   ├── providers/search/page.tsx
    │   │   ├── profile/page.tsx
    │   │   └── layout.tsx # Layout para rutas de Organizador (con color distintivo)
    │   ├── api/ # Contiene todos los Route Handlers (backend)
    │   │   ├── auth/[...nextauth]/route.ts # Configuración de NextAuth con Supabase Adapter
    │   │   ├── events/route.ts
    │   │   ├── events/[eventId]/route.ts
    │   │   ├── events/[eventId]/tasks/route.ts
    │   │   ├── events/[eventId]/tasks/[taskId]/route.ts
    │   │   ├── providers/route.ts # Para buscar proveedores
    │   │   ├── events/[eventId]/assign-provider/route.ts
    │   │   └── notifications/route.ts
    │   ├── layout.tsx # Root layout
    │   └── page.tsx
    ├── /components
    │   ├── /ui # Componentes UI genéricos, siguiendo el diseño unificado
    │   ├── /auth
    │   ├── /events
    │   ├── /tasks
    │   └── /providers # Componentes para MOSTRAR proveedores
    ├── /lib
    │   ├── supabaseClient.ts # Configuración del cliente Supabase JS
    │   └── prismaClient.ts # O cliente Supabase si no se usa Prisma para RLS
    └── /prisma # Si se usa Prisma para definir el schema y migraciones (schema.prisma)
    ```

---

## 2. Modelo de Datos y Acceso (Supabase con RLS)

*   **Schema:** Utilizar el `schema.prisma` definido centralmente (o la estructura de tablas directamente en Supabase).
*   **Rol de Usuario:** En la tabla `Users` (o `auth.users` de Supabase), habrá un campo `role` (ej. `ORGANIZER`, `PROVIDER`, `ADMIN`).
*   **Políticas RLS en Supabase:**
    *   Los organizadores solo pueden crear, leer, actualizar y eliminar (`CRUD`) sus propios `Events`.
    *   Los organizadores pueden `CRUD` `Tasks` pertenecientes a sus eventos.
    *   Los organizadores pueden leer todos los `Providers` (para búsqueda).
    *   Los organizadores pueden `CRUD` `EventProviderLink` para sus eventos.
    *   Los organizadores pueden leer sus `Notifications`.

---

## 3. Funcionalidades Clave para Organizadores (MVP)

*(Las funcionalidades se mantienen como en la versión anterior, pero la implementación de backend se hará en Route Handlers)*

**A. Autenticación y Perfil (Supabase Auth + NextAuth):**
    *   Registro e inicio de sesión como Organizador. (Supabase Auth asignará el rol `ORGANIZER`).
    *   Gestión básica del perfil (datos en tabla `Users` o perfil asociado).

**B. Gestión de Eventos.**
**C. Gestión de Tareas dentro de un Evento.**
**D. Gestión de Proveedores para un Evento.**
**E. Panel de Cronograma (Timeline).**
**F. Dashboard de Organizador.**
**G. Notificaciones.**

---

## 4. API Backend (Route Handlers en `/app/api/...`)

*   **Autenticación (`/app/api/auth/[...nextauth]/route.ts`):**
    *   Configurar NextAuth.js con el `SupabaseAdapter` y el proveedor de credenciales/OAuth de Supabase.
    *   La sesión de NextAuth contendrá la información del usuario de Supabase, incluyendo su rol.
*   **Eventos (`/app/api/events/...route.ts`):**
    *   Los Route Handlers interactuarán con Supabase (usando el cliente JS de Supabase o Prisma con RLS) para realizar operaciones CRUD.
    *   La lógica de autorización (verificar que el evento pertenece al organizador) se basará en el `userId` de la sesión y las políticas RLS de Supabase.
*   **Tareas, Proveedores (búsqueda), Asignación Proveedor-Evento, Notificaciones:**
    *   Implementar la lógica correspondiente en sus respectivos Route Handlers, siempre respetando los permisos definidos por RLS y el rol del usuario.

---

## 5. Diseño y UX

*   **Diseño Unificado:** Compartir una base de componentes UI (Tailwind CSS) con las otras apps FIRE-BY.
*   **Color Distintivo:** La app de Organizadores tendrá un color primario/acento específico que la diferencie visualmente.
*   Flujos de usuario intuitivos para la planificación.

---

## 6. Consideraciones Específicas

*   La IA debe generar la configuración de NextAuth.js para integrarse con Supabase Auth.
*   Los Route Handlers deben usar el cliente Supabase JS (o Prisma configurado para respetar RLS) para todas las interacciones con la base de datos.
*   Las políticas RLS en Supabase son fundamentales y deben ser definidas correctamente para asegurar la segregación de datos.