import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentDetails } from "@/components/detail/content-details";

export const metadata: Metadata = {
  title: "Detalle de serie | Explorador de Cine",
};

type SeriesPageProps = {
  params: Promise<{ id: string }>;
};

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { id: rawId } = await params;
  const id = Number(rawId);

  if (!/^[1-9]\d*$/.test(rawId) || !Number.isSafeInteger(id)) {
    notFound();
  }

  return <ContentDetails id={id} mediaType="tv" />;
}
