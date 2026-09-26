import type { Metadata } from "next";
import { AdminConsole } from "@/components/admin/AdminConsole";

export const metadata: Metadata = {
  title: "內容管理 — 有種直送",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminConsole />;
}
