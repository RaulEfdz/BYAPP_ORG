"use client";

import { useState, useEffect } from "react";

interface Provider {
  id: string;
  name: string;
  serviceType?: string;
  email?: string;
  phone?: string;
  location?: string;
  notes?: string;
}

export default function ProviderSearchPage() {
  const [query, setQuery] = useState<string>("");
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchProviders() {
      setLoading(true);
      try {
        const url = query
          ? `/api/providers?q=${encodeURIComponent(query)}`
          : "/api/providers";
        const res = await fetch(url);
        const data = await res.json();
        setProviders(data || []);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
      setLoading(false);
    }

    fetchProviders();
  }, [query]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Buscar Proveedores</h2>
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />
      {loading ? (
        <p>Cargando proveedores...</p>
      ) : providers.length === 0 ? (
        <p>No se encontraron proveedores.</p>
      ) : (
        <ul className="space-y-2">
          {providers.map((provider) => (
            <li key={provider.id} className="border p-4 rounded shadow">
              <h3 className="text-xl font-semibold">{provider.name}</h3>
              <p>Tipo de Servicio: {provider.serviceType || "N/A"}</p>
              <p>Email: {provider.email || "N/A"}</p>
              <p>Teléfono: {provider.phone || "N/A"}</p>
              <p>Ubicación: {provider.location || "N/A"}</p>
              <p>Notas: {provider.notes || "N/A"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
