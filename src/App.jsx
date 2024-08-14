import { RouterProvider } from "react-router-dom";
import { route } from "./router";
import RenewableEnergyHistory from './components/historico';

function App() {
  return <RouterProvider router={route} />;
}<RenewableEnergyHistory/>

export default App;
