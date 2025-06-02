"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../lib/supabaseClient";

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

export default function EventDetailPage({
  params,
}: {
  params: { eventId: string };
}) {
  const { eventId } = params;
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchEvent() {
      setLoading(true);
      // Usar select con limit 1 para evitar error de tipos
      const { data, error } = await supabase
        .from("Event")
        .select("*")
        .eq("id", eventId)
        .limit(1);

      if (error) {
        console.error("Error fetching event:", error);
      } else {
        setEvent(data && data.length > 0 ? data[0] : null);
      }
      setLoading(false);
    }

    fetchEvent();
  }, [eventId]);

  if (loading) {
    return <p>Cargando detalles del evento...</p>;
  }

  if (!event) {
    return <p>Evento no encontrado.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{event.nombre}</h2>
      <p>
        {event.fechaInicio} - {event.fechaFin}
      </p>
      <p>Lugar: {event.lugar}</p>
      <p>Cliente: {event.cliente}</p>
      <p>Tipo: {event.tipoEvento}</p>
      <p>Presupuesto: ${event.presupuesto}</p>
      <p>Invitados: {event.invitados}</p>
      <p>Estado: {event.estado}</p>
      {/* Aquí se pueden agregar más detalles y funcionalidades */}
    </div>
  );
}
