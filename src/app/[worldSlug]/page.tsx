import { notFound } from "next/navigation";
import { validateWorldSlug } from "@/lib/worlds";
import WorldClient from "./WorldClient";

export default async function WorldPage({ params }: { params: Promise<{ worldSlug: string }> }) {
  const { worldSlug } = await params;

  if (!validateWorldSlug(worldSlug) || worldSlug === "cellbook") {
    notFound();
  }

  return <WorldClient worldSlug={worldSlug} />;
}
