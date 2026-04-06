import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => (
  <div className="flex flex-col min-h-screen overflow-x-hidden">
    <Navbar />
    <main className="flex-1 overflow-x-hidden pt-16 md:pt-18">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
