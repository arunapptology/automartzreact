import React from "react";
import Clock from "./Clock";

const App = ({ deadliness }) => {
  return (
    <>
      {deadliness && (
        <div className="App">
          <Clock deadline={deadliness} />
        </div>
      )}
    </>
  );
};

export default App;
