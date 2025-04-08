
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Index';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Signup';
import Account from './pages/Account';
import Contact from './pages/Contact';
import About from './pages/About';
import HoneyQuiz from './pages/QuizPage';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import { ThemeProvider } from './context/ThemeContext';
import Settings from './pages/Settings';
import { Toaster } from './components/ui/sonner';

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/product/:id",
    element: <ProductDetails />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/quiz",
    element: <HoneyQuiz />,
  },
  {
    path: "/favorites",
    element: <Favorites />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
]);

function App() {
  return (
    <ThemeProvider>
      <Toaster />
      <RouterProvider router={routes} />
    </ThemeProvider>
  );
}

export default App;
