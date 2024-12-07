import Navbar from "../Navbar";
import Footer from "../../pages/Footer";
import { Outlet } from "react-router-dom";
import Banner from "../Banner";
// import AllPost from "../AllPost";
const MainLayout = () => {
  return (
    <div>
      {/* <h1>Home</h1> */}
      <nav>
        <Navbar />
      </nav>

      <Banner />
      <main>
        <Outlet />
      </main>
      {/* <AllPost />/ */}
      <Footer />
    </div>
  );
};

export default MainLayout;
