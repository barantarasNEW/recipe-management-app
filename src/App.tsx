import { Navigate, Route, Routes } from "react-router";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Recipes from "./pages/Recipes/Recipes";
import Recipe from "./pages/Recipe/Recipe";
import Start from "./pages/Start/Start";
import Auth from "./pages/Auth/Auth";
import User from "./pages/User/User";
import NotFound from "./components/NotFound/NotFound";
import Liked from "./pages/Liked/Liked";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/recipes">
          <Route index element={<Recipes />} />
          <Route path=":id">
            <Route index element={<Recipe />} />
            <Route path="start" element={<Start />} />
          </Route>
        </Route>
        <Route path="/liked" element={<Liked />} />
        <Route path="/signIn" element={<Auth />} />
        <Route path="/signUp" element={<Auth />} />
        <Route path="/user" element={<User />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
