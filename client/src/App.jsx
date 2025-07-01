import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import { SidebarDemo } from "./pages/Admin/Layout";
import DashboardMenu from "./pages/Admin/DashboardMenu";
import AddblogMenu from "./pages/Admin/AddblogMenu";
import BloglistMenu from "./pages/Admin/BloglistMenu";
import CommentsMenu from "./pages/Admin/CommentsMenu";
import Login from "./components/admin/Login";
import SignUp from "./components/admin/SignUp";
import "quill/dist/quill.snow.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<SidebarDemo />}>
          <Route index element={<DashboardMenu />} />
          <Route path="addBlog" element={<AddblogMenu />} />
          <Route path="blogList" element={<BloglistMenu />} />
          <Route path="comments" element={<CommentsMenu />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
