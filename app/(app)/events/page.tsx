"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

interface Event {
  id: string;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  lugar: string;
  cliente: string;
  tipoEvento: string;
  presupuesto: number;
  invitados: number;
  estado: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      const { data, error } = await supabase
        .from("Event")
        .select("*")
        .order("fechaInicio", { ascending: true });

      if (error) {
        console.error("Error fetching events:", error);
      } else {
        setEvents(data || []);
      }
      setLoading(false);
    }

    fetchEvents();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Mis Eventos</h2>
      {loading ? (
        <p>Cargando eventos...</p>
      ) : events.length === 0 ? (
        <p>No hay eventos disponibles.</p>
      ) : (
        <ul className="space-y-2">
          {events.map((event) => (
            <li key={event.id} className="border p-4 rounded shadow">
              <h3 className="text-xl font-semibold">{event.nombre}</h3>
              <p>
                {event.fechaInicio} - {event.fechaFin}
              </p>
              <p>Lugar: {event.lugar}</p>
              <p>Cliente: {event.cliente}</p>
              <p>Tipo: {event.tipoEvento}</p>
              <p>Presupuesto: ${event.presupuesto}</p>
              <p>Invitados: {event.invitados}</p>
              <p>Estado: {event.estado}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
