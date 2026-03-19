export async function POST(request: Request) {
  const body = await request.json();
  const res = await fetch(`${process.env.OPENWAV_API_URL}/designs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENWAV_API_KEY}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return Response.json(data, { status: res.status });
}
