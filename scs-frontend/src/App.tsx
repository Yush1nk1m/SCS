import React, { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const [page, setPage] = useState<string>("home");

  return (
    <div className="App">
      <Header setPage={setPage} />
      <Main page={page} />
      <Footer />
    </div>
  );
};

export default App;
