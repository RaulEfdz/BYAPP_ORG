import React from "react";

const requiredEnvVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
];

export default function HomePage() {
  const missingEnvVars = requiredEnvVars.filter(
    (v) => !process.env[v] || process.env[v] === ""
  );

  if (missingEnvVars.length > 0) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white rounded-lg shadow-lg max-w-lg mx-auto">
        <h1 className="text-4xl font-extrabold mb-6 drop-shadow-lg">
          FIRE-BY Organizers
        </h1>
        <div className="bg-red-700 bg-opacity-80 p-6 rounded-lg shadow-inner">
          <h2 className="text-2xl font-semibold mb-4">
            Error de configuración
          </h2>
          <p className="mb-4">
            Faltan las siguientes variables de entorno necesarias para que la
            aplicación funcione correctamente:
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg font-medium">
            {missingEnvVars.map((v) => (
              <li key={v} className="bg-red-800 p-2 rounded">
                {v}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-lg">
            Por favor, configure estas variables en su archivo <code>.env</code>{" "}
            y reinicie la aplicación.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-6">
        Bienvenido a FIRE-BY Organizers
      </h1>
      <p className="mb-4">Seleccione una opción para comenzar:</p>
      <nav className="space-x-4">
        <a href="/dashboard" className="text-blue-600 hover:underline">
          Dashboard
        </a>
        <a href="/events" className="text-blue-600 hover:underline">
          Eventos
        </a>
      </nav>
    </main>
  );
}
