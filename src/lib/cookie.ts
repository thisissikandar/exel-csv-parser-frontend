import { cookies } from "next/headers";

export async function getToken() {
  const cookieStore = await cookies();
  const data = cookieStore.get("accessToken");
  return data?.value;
}