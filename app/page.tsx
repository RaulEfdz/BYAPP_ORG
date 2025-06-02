import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";

const requiredEnvVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
];

export default async function HomePage() {
  const missingEnvVars = requiredEnvVars.filter(
    (v) => !process.env[v] || process.env[v] === ""
  );

  if (missingEnvVars.length > 0) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-red-50">
        <div className="max-w-xl bg-red-100 border border-red-400 text-red-700 px-6 py-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">Error de Configuración</h1>
          <p className="mb-2">
            Faltan las siguientes variables de entorno necesarias para que la
            aplicación funcione:
          </p>
          <ul className="list-disc list-inside mb-4">
            {missingEnvVars.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
          <p>Por favor, configure estas variables y reinicie la aplicación.</p>
        </div>
      </main>
    );
  }

  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-white">
      <div className="max-w-2xl">
        <h1 className="text-5xl font-bold text-primary mb-6">
          FIREOrganizers: Tu Centro de Comando para Eventos Exitosos
        </h1>
        <p className="text-xl text-gray-700 mb-10">
          Planifica, gestiona y ejecuta tus eventos con herramientas intuitivas,
          seguimiento en tiempo real y colaboración eficiente. ¡Organizar nunca
          fue tan fácil!
        </p>
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mb-10">
          <Link
            href="/login"
            className="bg-primary hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105 inline-block"
          >
            Iniciar Sesión
          </Link>
          {/* Opcional: Descomenta si tienes página de registro
          <Link
            href="/auth/register"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out inline-block"
          >
            Crear Cuenta
          </Link>
          */}
        </div>
        <div className="flex justify-center space-x-12 text-gray-600">
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mb-2 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2v-7H3v7a2 2 0 002 2z"
              />
            </svg>
            <span>Planificación Eficaz</span>
          </div>
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mb-2 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m0 6H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v5"
              />
            </svg>
            <span>Gestión de Tareas Simplificada</span>
          </div>
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mb-2 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M12 12a4 4 0 100-8 4 4 0 000 8z"
              />
            </svg>
            <span>Colaboración con Proveedores</span>
          </div>
        </div>
        {/* Imagen o gráfico ilustrativo */}
        <div className="mt-10">
          <img
            src="/images/event-planning-illustration.svg"
            alt="Ilustración de organización de eventos"
            className="mx-auto max-w-full h-auto"
          />
        </div>
      </div>
      <footer className="absolute bottom-0 left-0 right-0 p-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} FIREPlatform
      </footer>
    </main>
  );
}
