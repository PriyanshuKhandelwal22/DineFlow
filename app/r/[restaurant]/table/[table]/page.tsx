import { redirect } from "next/navigation";

type TableRouteProps = {
  params: Promise<{
    restaurant: string;
    table: string;
  }>;
};

export default async function TableRoute({ params }: TableRouteProps) {
  const { restaurant, table } = await params;

  redirect(
    `/?restaurant=${encodeURIComponent(restaurant)}&table=${encodeURIComponent(table)}`
  );
}