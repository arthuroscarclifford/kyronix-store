import { NextRequest, NextResponse } from "next/server";
import { fetchOpenLibraryResults } from "../../../../lib/openLibrary";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query") ?? "";
  const limit = Number(url.searchParams.get("limit") ?? "8");

  try {
    const payload = await fetchOpenLibraryResults({
      query,
      limit,
      type: "manga",
    });

    return NextResponse.json(payload);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to fetch manga data" },
      { status: 502 }
    );
  }
}
