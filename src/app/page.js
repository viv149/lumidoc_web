import { redirect } from "next/navigation";

export default function page() {
  redirect("/main/home");
  return null;
}
