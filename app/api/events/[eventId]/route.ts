import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { supabase } from "../../../../lib/supabaseClient";

export async function GET(
  request: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    if (session.user.role !== "ORGANIZER") {
      return NextResponse.json({ error: "Prohibido" }, { status: 403 });
    }

    const { eventId } = params;

    const { data, error } = await supabase
      .from("Event")
      .select("*")
      .eq("id", eventId)
      .eq("userId", session.user.id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // No rows found
        return NextResponse.json(
          { error: "Evento no encontrado" },
          { status: 404 }
        );
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json(
        { error: "Evento no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    if (session.user.role !== "ORGANIZER") {
      return NextResponse.json({ error: "Prohibido" }, { status: 403 });
    }

    const { eventId } = params;
    const body = await request.json();

    // Verify event ownership before update
    const { data: existingEvent, error: fetchError } = await supabase
      .from("Event")
      .select("id")
      .eq("id", eventId)
      .eq("userId", session.user.id)
      .single();

    if (fetchError || !existingEvent) {
      return NextResponse.json(
        { error: "Evento no encontrado o no autorizado" },
        { status: 404 }
      );
    }

    // Validate fields if present
    const allowedFields = [
      "name",
      "startDate",
      "endDate",
      "location",
      "client",
      "eventType",
      "budget",
      "guests",
      "status",
    ];

    const updateData: Record<string, any> = {};
    for (const key of allowedFields) {
      if (key in body) {
        updateData[key] = body[key];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No hay campos válidos para actualizar" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("Event")
      .update(updateData)
      .eq("id", eventId)
      .eq("userId", session.user.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Solicitud inválida o error interno" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    if (session.user.role !== "ORGANIZER") {
      return NextResponse.json({ error: "Prohibido" }, { status: 403 });
    }

    const { eventId } = params;

    // Verify event ownership before delete
    const { data: existingEvent, error: fetchError } = await supabase
      .from("Event")
      .select("id")
      .eq("id", eventId)
      .eq("userId", session.user.id)
      .single();

    if (fetchError || !existingEvent) {
      return NextResponse.json(
        { error: "Evento no encontrado o no autorizado" },
        { status: 404 }
      );
    }

    const { error } = await supabase
      .from("Event")
      .delete()
      .eq("id", eventId)
      .eq("userId", session.user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Evento eliminado correctamente" },
      { status: 204 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
