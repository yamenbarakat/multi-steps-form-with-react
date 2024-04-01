import { Route, Routes } from "react-router";
import Main from "./components/Main";
import Steps from "./components/Steps";
import InfoForm from "./pages/InfoForm";
import SelectPlan from "./pages/SelectPlan";
import AddOns from "./pages/AddOns";
import Summary from "./pages/Summary";
import Finish from "./pages/Finish";

function App() {
  return (
    <div className="app">
      <Steps />
      <Main>
        <Routes>
          <Route path="/" element={<InfoForm />} />
          <Route path="/plan" element={<SelectPlan />} />
          <Route path="/add-ons" element={<AddOns />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/finish" element={<Finish />} />
        </Routes>
      </Main>
    </div>
  );
}

export default App;
