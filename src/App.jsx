import React from "react";
import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import ProductDescription from "./components/ProductDescription";

const App = () => (
  <div className="flex flex-col w-full min-h-screen">
   <Header />
   <main className="flex-grow">
        <HeroBanner />
        <ProductDescription />
      </main>
  </div>
);

export default App;
