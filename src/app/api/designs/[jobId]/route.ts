export async function GET(
  _request: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await params;
  const res = await fetch(`${process.env.OPENWAV_API_URL}/designs/${jobId}`, {
    headers: { Authorization: `Bearer ${process.env.OPENWAV_API_KEY}` },
  });
  const data = await res.json();
  return Response.json(data, { status: res.status });
}
