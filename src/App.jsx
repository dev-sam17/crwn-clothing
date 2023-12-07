import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.component";
import SignIn from "./routes/sign-in/sign-in.component";
import NavigationBar from "./routes/navigation/navigation.component";

const Shop = () => {
  return <h1>This Is OUR Shop Page</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;
