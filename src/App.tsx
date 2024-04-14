import PlayArea from "./components/play-area"

const App = () => {

  return (
    <>
      <main className="container flex items-center justify-center">
        <section className="flex items-center justify-center p-5 h-full w-full">
          <PlayArea></PlayArea>
        </section>
      </main>
    </>
  )
}

export default App
