import type { ContactSubmission } from "./storage";

export type CreateContactPayload = Omit<
  ContactSubmission,
  "id" | "submittedAt" | "status"
> & { source?: string };

const ADMIN_TOKEN_KEY = "sb_admin_token";

export function setAdminToken(token: string): void {
  try {
    localStorage.setItem(ADMIN_TOKEN_KEY, token);
  } catch {
    // ignore
  }
}

export function getAdminToken(): string | null {
  try {
    return localStorage.getItem(ADMIN_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function clearAdminToken(): void {
  try {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
  } catch {
    // ignore
  }
}

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export async function createContactApi(
  payload: CreateContactPayload,
): Promise<ContactSubmission> {
  const res = await fetch("/api/contacts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handle<ContactSubmission>(res);
}

function adminHeaders(): HeadersInit {
  const token = getAdminToken() ?? "";
  return {
    "Content-Type": "application/json",
    "x-admin-token": token,
  };
}

export async function listContactsApi(): Promise<ContactSubmission[]> {
  const res = await fetch("/api/contacts", { headers: adminHeaders() });
  return handle<ContactSubmission[]>(res);
}

export async function patchContactStatusApi(
  id: string,
  status: ContactSubmission["status"],
): Promise<ContactSubmission> {
  const res = await fetch(`/api/contacts/${id}`, {
    method: "PATCH",
    headers: adminHeaders(),
    body: JSON.stringify({ status }),
  });
  return handle<ContactSubmission>(res);
}

export async function deleteContactApi(id: string): Promise<void> {
  const res = await fetch(`/api/contacts/${id}`, {
    method: "DELETE",
    headers: adminHeaders(),
  });
  await handle<void>(res);
}
