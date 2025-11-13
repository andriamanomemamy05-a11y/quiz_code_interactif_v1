import QuizLevelClient from "./QuizLevelClient";

type LevelPageProps = {
  params: {
    slug: string;
    level: string;
  };
};

export default function LevelPage({ params }: LevelPageProps) {
  // Ici, on est côté serveur : on a le droit de lire params.slug / params.level
  return <QuizLevelClient slug={params.slug} level={params.level} />;
}