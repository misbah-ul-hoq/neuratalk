import WelcomePage from "@/components/WelcomePage";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-6 sm:p-10 lg:p-24">
      <WelcomePage />
    </main>
  );
}
