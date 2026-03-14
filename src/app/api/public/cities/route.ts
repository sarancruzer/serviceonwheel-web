import { NextResponse } from "next/server";

import { listPublicCities } from "@/lib/public-catalog";

export async function GET() {
  const result = await listPublicCities();

  return NextResponse.json(result);
}
