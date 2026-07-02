import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const Home = lazy(() => import('../pages/Home/Home'));
const Login = lazy(() => import('../pages/Login/Login'));
const Register = lazy(() => import('../pages/Register/Register'));
const Blog = lazy(() => import('../pages/blog/blog'));
const Contact = lazy(() => import('../pages/contact/contact'));
const AboutUs = lazy(() => import('../pages/about_us/about_us'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
