"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";

interface Event {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: string;
}

interface Task {
  id: string;
  eventId: string;
  status: string;
  dueDate?: string;
}

export default function DashboardPage() {
  const params = useParams();
  const userId = params.userId as string;

  const [events, setEvents] = useState<Event[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { data: eventsData, error: eventsError } = await supabase
          .from("Event")
          .select("*", { count: "exact" })
          .eq("userId", userId)
          .order("startDate", { ascending: true });

        if (eventsError) {
          console.error("Error fetching events:", eventsError);
          setLoading(false);
          return;
        }

        setEvents(eventsData || []);

        const eventIds = eventsData?.map((e) => e.id) || [];

        if (eventIds.length > 0) {
          const { data: tasksData, error: tasksError } = await supabase
            .from("Task")
            .select("*")
            .in("eventId", eventIds);

          if (tasksError) {
            console.error("Error fetching tasks:", tasksError);
            setLoading(false);
            return;
          }

          setTasks(tasksData || []);
        } else {
          setTasks([]);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
      setLoading(false);
    }

    fetchData();
  }, [userId]);

  const totalEvents = events.length;
  const completedTasks = tasks.filter((t) => t.status === "Terminado").length;
  const pendingTasks = tasks.filter((t) => t.status !== "Terminado").length;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard del Organizador</h2>
      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Eventos Activos</h3>
            <p className="text-3xl">{totalEvents}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Tareas Completadas</h3>
            <p className="text-3xl">{completedTasks}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Tareas Pendientes</h3>
            <p className="text-3xl">{pendingTasks}</p>
          </div>
        </div>
      )}
    </div>
  );
}
