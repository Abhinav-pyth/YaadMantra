import { HomeClient } from "@/app/HomeClient";
import { categories } from "@/data/categories";
import { getCategoryCounts, getTrendingMnemonics, starterMnemonics } from "@/utils/data";

export default function HomePage() {
  return (
    <HomeClient
      categories={getCategoryCounts()}
      starterMnemonics={starterMnemonics}
      trendingMnemonics={getTrendingMnemonics()}
      totalCategories={categories.length}
    />
  );
}
