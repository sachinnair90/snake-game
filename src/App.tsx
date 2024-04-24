import { PlayArea } from "./components";

export const App = () => {
  return (
    <>
      <main className="container flex items-center justify-center">
        <section className="flex items-center justify-center p-5 h-full w-full flex-col">
          <PlayArea></PlayArea>
        </section>
      </main>
    </>
  );
};
