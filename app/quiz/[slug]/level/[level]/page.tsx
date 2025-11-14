import QuizLevelClient from "./QuizLevelClient";

export default async function LevelPage({
  params,
}: {
  params: Promise<{ slug: string; level: string }>;
}) {
  // ⚠️ Avec Next 16, params est un Promise
  const { slug, level } = await params;

  return <QuizLevelClient slug={slug} level={level} />;
}