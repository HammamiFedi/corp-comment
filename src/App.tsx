import { Container, Footer, HashtagList } from "./components";
import FeedbackItemsContextProvider from "./contexts/FeedbackItemsContextProvider";

function App() {
  return (
    <div className="app">
      <Footer />

      <FeedbackItemsContextProvider>
        <Container />
        <HashtagList />
      </FeedbackItemsContextProvider>
    </div>
  );
}

export default App;
