import TabsContainer from "@/components/pages/tabs-container";

const Homepage = () => {
  return (
    <div className="container mx-auto">
      <main className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold tracking-tight text-primary">
          React Hook Form with Zod
        </h1>
        <TabsContainer />
      </main>
    </div>
  );
};

export default Homepage;
