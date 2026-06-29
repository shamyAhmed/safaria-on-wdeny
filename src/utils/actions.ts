"use server";

import { cookies } from "next/headers";

export async function getCookie(name: string): Promise<string | undefined> {
  // Ensure cookies() is interpreted correctly
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
}
