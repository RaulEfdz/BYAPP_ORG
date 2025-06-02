import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../../../lib/supabaseClient";

export async function GET(
  request: NextRequest,
  { params }: { params: { eventId: string } }
) {
  const { eventId } = params;

  const { data, error } = await supabase
    .from("Task")
    .select("*")
    .eq("eventId", eventId)
    .order("dueDate", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { eventId: string } }
) {
  const { eventId } = params;

  try {
    const body = await request.json();

    const { name, description, dueDate, status, assignedToId, providerId } =
      body;

    if (!name || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.from("Task").insert([
      {
        eventId,
        name,
        description,
        dueDate,
        status,
        assignedToId,
        providerId,
      },
    ]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
