import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../lib/supabaseClient";

export async function GET(request: NextRequest) {
  // Get user session from request headers or cookies (implementation depends on auth setup)
  // For now, fetch all events (to be restricted later)
  const { data, error } = await supabase
    .from("Event")
    .select("*")
    .order("startDate", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
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
      userId,
    } = body;

    if (!name || !startDate || !endDate || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.from("Event").insert([
      {
        userId,
        name,
        startDate,
        endDate,
        location,
        client,
        eventType,
        budget,
        guests,
        status,
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
