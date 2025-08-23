import { Button } from "@/ui/button";

export default async function Home() {
  return (
    <div className="p-6 flex items-center gap-5">
      <Button variant={"primary"} size={"small"}>کلیک کنید!</Button>
      <Button variant={"primary"} size={"medium"}>کلیک کنید!</Button>
      <Button variant={"primary"} size={"large"}>کلیک کنید!</Button>
      <Button variant={"information"} size={"medium"}>کلیک کنید!</Button>
    </div>
  );
}
