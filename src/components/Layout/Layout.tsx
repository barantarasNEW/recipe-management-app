import { Suspense, useCallback, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setUser } from "../../redux/slices/userSlice";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";
import Footer from "../Footer/Footer";
import { Liked } from "../../context/Liked";
import { useAppSelector, useAppDispatch } from "../../hooks/useRedux";
import { useLocaleStorage } from "../../hooks/useLocaleStorage";
import { getAdditionalUserData } from "../../helpers/getAdditionUserData";
import { User } from "../../types/User";
import { Recipe } from "../../types/Recipe";
import './Layout.scss';
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

const Layout = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.user);

  const auth = getAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [liked, setLiked] = useLocaleStorage<Recipe[]>(
    [],
    'liked',
  );
  const [isLoading, setIsLoading] = useState(true);

  const changeLikeRecipe = useCallback((recipe: Recipe) => {
    setLiked((prev: Recipe[]) => {
      if (prev.find(currRecipe => currRecipe.id === recipe.id)) {
        return prev.filter(currRecipe => currRecipe.id !== recipe.id)
      }

      return [...prev, recipe];
    });
  }, [setLiked]);

  useEffect(() => {
    if (!user.email.length) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          getAdditionalUserData(user.uid)
            .then(data => {
              const result = {
                email: user.email,
                password: data?.password,
                firstName: data?.firstName,
              };
  
              dispatch(setUser(result as User));

              if (pathname === '/signUp' || pathname === '/signIn') {
                navigate("/");
              }
            }).catch(error => console.log(error))
            .finally(() => setIsLoading(false));
        } else {
          setIsLoading(false);
        }
      });
    }
  }, []);

  return (
    <>
      {isLoading
        ? <Loader />
        : (
          <>
            <Liked.Provider value={{ liked, changeLikeRecipe }}>
              <Header />
    
              <main className="main">
                <ErrorBoundary>
                  <Suspense fallback={<Loader />}>
                    <Outlet />
                  </Suspense>
                </ErrorBoundary>
              </main>
            </Liked.Provider>
      
            <Footer />
          </>
        )}
    </>
  );
};

export default Layout;