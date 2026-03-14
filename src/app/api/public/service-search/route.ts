import { NextResponse } from "next/server";

import { searchPublicServices } from "@/lib/public-catalog";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const query = searchParams.get("q");
  const city = searchParams.get("city");
  const limit = Number(searchParams.get("limit") ?? "8");
  const result = await searchPublicServices({
    city,
    limit: Number.isFinite(limit) ? limit : 8,
    query,
  });

  return NextResponse.json(result);
}
