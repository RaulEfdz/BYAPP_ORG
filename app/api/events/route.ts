import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { supabase } from "../../../lib/supabaseClient";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    if (session.user.role !== "ORGANIZER") {
      return NextResponse.json({ error: "Prohibido" }, { status: 403 });
    }

    const { data, error } = await supabase
      .from("Event")
      .select("*")
      .eq("userId", session.user.id)
      .order("startDate", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    if (session.user.role !== "ORGANIZER") {
      return NextResponse.json({ error: "Prohibido" }, { status: 403 });
    }

    const body = await request.json();

    const {
      name,
      startDate,
      endDate,
      location,
      client,
      eventType,
      budget,
      guests,
      status,
    } = body;

    if (!name || !startDate || !endDate) {
      return NextResponse.json(
        { error: "Campos requeridos faltantes: name, startDate, endDate" },
        { status: 400 }
      );
    }

    // Validate budget and guests types if provided
    if (budget !== undefined && typeof budget !== "number") {
      return NextResponse.json(
        { error: "El campo budget debe ser un número" },
        { status: 400 }
      );
    }
    if (guests !== undefined && !Number.isInteger(guests)) {
      return NextResponse.json(
        { error: "El campo guests debe ser un entero" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("Event")
      .insert([
        {
          name,
          startDate,
          endDate,
          location: location ?? null,
          client: client ?? null,
          eventType: eventType ?? null,
          budget: budget ?? null,
          guests: guests ?? null,
          status: status ?? null,
          userId: session.user.id,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Solicitud inválida o error interno" },
      { status: 400 }
    );
  }
}
