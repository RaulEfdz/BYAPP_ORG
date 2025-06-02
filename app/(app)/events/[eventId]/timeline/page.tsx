"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Task {
  id: string;
  name: string;
  description?: string;
  dueDate?: string;
  status: string;
  assignedToId?: string;
  providerId?: string;
}

export default function TimelinePage() {
  const params = useParams();
  const eventId = params.eventId as string;

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchTasks() {
      setLoading(true);
      try {
        const res = await fetch(`/api/events/${eventId}/tasks`);
        const data = await res.json();
        setTasks(data || []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
      setLoading(false);
    }

    fetchTasks();
  }, [eventId]);

  // Group tasks by dueDate
  const groupedTasks = tasks.reduce((groups: Record<string, Task[]>, task) => {
    const date = task.dueDate
      ? new Date(task.dueDate).toLocaleDateString()
      : "Sin fecha";
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(task);
    return groups;
  }, {} as Record<string, Task[]>);

  const sortedDates = Object.keys(groupedTasks).sort((a, b) => {
    if (a === "Sin fecha") return 1;
    if (b === "Sin fecha") return -1;
    return new Date(a).getTime() - new Date(b).getTime();
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Cronograma del Evento</h2>
      {loading ? (
        <p>Cargando tareas...</p>
      ) : tasks.length === 0 ? (
        <p>No hay tareas para este evento.</p>
      ) : (
        <div className="space-y-6">
          {sortedDates.map((date) => (
            <div key={date}>
              <h3 className="text-xl font-semibold mb-2">{date}</h3>
              <ul className="space-y-2">
                {groupedTasks[date].map((task) => (
                  <li key={task.id} className="border p-4 rounded shadow">
                    <h4 className="font-semibold">{task.name}</h4>
                    <p>{task.description || "Sin descripción"}</p>
                    <p>Estado: {task.status}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
