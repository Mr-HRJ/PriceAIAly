import { PriceExplorer } from "@/components/PriceExplorer";
import { SubmissionFloater } from "@/components/SubmissionFloater";
import { getDashboardData } from "@/lib/data";

export default async function Home() {
  const data = await getDashboardData();

  return (
    <>
      <PriceExplorer data={data} />
      <SubmissionFloater />
    </>
  );
}
