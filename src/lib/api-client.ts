import type {
  CreateDesignRequest,
  CreateDesignResponse,
  DesignDetailResponse,
  DesignStatusResponse,
} from "@/types/api";

async function apiFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error?.message || `Request failed (${res.status})`);
  }
  return res.json();
}

export function createDesign(req: CreateDesignRequest): Promise<CreateDesignResponse> {
  return apiFetch("/api/designs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
}

export function getDesignStatus(jobId: string): Promise<DesignStatusResponse> {
  return apiFetch(`/api/designs/${jobId}/status`);
}

export function getDesignDetail(jobId: string): Promise<DesignDetailResponse> {
  return apiFetch(`/api/designs/${jobId}`);
}
