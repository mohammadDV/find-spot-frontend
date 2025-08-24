import { MainHeader } from "./_components/headers/MainHeader";
import Hero from "./_components/hero/Hero";

export default async function Home() {
  return (
    <>
      <MainHeader />
      <main>
        <Hero />
      </main>
    </>
  );
}
