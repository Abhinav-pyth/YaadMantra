import type { Metadata } from "next";
import { CreateClient } from "@/app/create/CreateClient";

export const metadata: Metadata = {
  title: "Create Your Own",
  description: "Create, edit, delete, and locally save your own Hindi mnemonics."
};

export default function CreatePage() {
  return <CreateClient />;
}
