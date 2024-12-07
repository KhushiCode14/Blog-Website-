import { Routes, Route } from "react-router-dom";
// import Home from "../pages/Home";
import MainLayout from "../components/layout/MainLayout";
import SinglePost from "../components/ui/SinglePost";
import LoginForm from "../components/authentication/Login";
import Register from "../components/authentication/Register";
// import ProtectedRoutes from "./ProtectedRoutes";
import AllPost from "../components/AllPost";
// import Banner from "../components/Banner";
import Dashboard from "../components/user/Dashboard";
import UserHome from "../components/user/UserHome";
import CreatePost from "../components/post/CreatePost";
import AdminLayout from "../components/admin/AdminLayout";
import UserList from "../components/admin/UserList";
import AllPostList from "../components/admin/AllUsers";
import AllPostDetail from "../components/admin/AllPostDetail";
import UserPostDetail from "../components/user/UserPostDetail";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<AllPost />} />
        <Route path="/posts/:postId" element={<SinglePost />} />
      </Route>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<Register />} />
      <Route path="/user" element={<Dashboard />}>
        <Route index element={<UserHome />} />
        {/* <Route path="userdetail" element={<UserList />} /> */}
        <Route path="postsDetail" element={<UserPostDetail />} />
        <Route path="createPost" element={<CreatePost />} />
        <Route path="" />
      </Route>
      <Route path="/postsDetail" element={<UserPostDetail />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="userdetail" element={<UserList />} />
        <Route index element={<AllPostList />} />
        <Route path="postdetail" element={<AllPostDetail />} />
      </Route>
    </Routes>
  );
};

export default Router;
