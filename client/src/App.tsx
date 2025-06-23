import type { Pull } from "./components/api/Pull"
import { PullNode } from "./components/PullNode/PullNode"
const testPull: Pull = {
  title: "Fuck you",
  text: "lorem",
  createdAt: 1678886400000,
  authorId: "asdasdasdasd",
}

function App() {
  return (
    <>
      <PullNode pull={testPull} />
    </>
  )
}

export default App
