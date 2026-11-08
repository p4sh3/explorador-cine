import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentDetails } from "@/components/detail/content-details";

export const metadata: Metadata = {
  title: "Detalle de película | Explorador de Cine",
};

type MoviePageProps = {
  params: Promise<{ id: string }>;
};

export default async function MoviePage({ params }: MoviePageProps) {
  const { id: rawId } = await params;
  const id = Number(rawId);

  if (!/^[1-9]\d*$/.test(rawId) || !Number.isSafeInteger(id)) {
    notFound();
  }

  return <ContentDetails id={id} mediaType="movie" />;
}
