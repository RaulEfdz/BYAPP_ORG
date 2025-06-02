import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "FIREOrganizers",
  description: "Platform for event organizers to plan and manage events",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-white text-gray-900">
        <div className="min-h-screen flex flex-col">
          <header className="bg-primary text-white p-4">
            <h1 className="text-2xl font-bold">FIREOrganizers</h1>
          </header>
          <main className="flex-grow container mx-auto p-4">{children}</main>
          <footer className="bg-gray-100 text-center p-4 text-sm text-gray-600">
            &copy; 2025 FIREPlatform
          </footer>
        </div>
      </body>
    </html>
  );
}
