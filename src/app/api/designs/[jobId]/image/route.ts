import { type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await params;
  const type = request.nextUrl.searchParams.get("type") || "preview";

  const res = await fetch(
    `${process.env.OPENWAV_API_URL}/designs/${jobId}/image?type=${type}`,
    {
      headers: { Authorization: `Bearer ${process.env.OPENWAV_API_KEY}` },
    }
  );

  if (!res.ok) {
    return new Response("Image not found", { status: res.status });
  }

  const blob = await res.blob();
  return new Response(blob, {
    headers: {
      "Content-Type": res.headers.get("Content-Type") || "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
