import PizzaVisualization from "~/components/pizza-visualization";
import { fetchCalorieData } from "~/utils/api";
import type { Route } from "./+types/home";

export const loader = async () => {
  const calories = await fetchCalorieData();
  return { calories };
};

export default function Home({ loaderData }: Route.ComponentProps) {
  const { calories } = loaderData;
  const totalSlices = Math.ceil(calories / 285);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Pizza Calorie Visualizer</h1>
      <PizzaVisualization slices={totalSlices} maxSlices={8} />
    </div>
  );
}
