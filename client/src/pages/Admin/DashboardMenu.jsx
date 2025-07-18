import { useState, useEffect } from "react";
import TableItem from "@/components/admin/TableItem.jsx";
import { toast } from "react-hot-toast";
import { useAppContext } from "../../context/AppContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import Loading from "../../components/Loading.jsx";

function DashboardMenu() {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const { axios, admin, navigate, loading } = useAppContext();
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard", {
        withCredentials: true,
      });
      data.success
        ? setDashboardData(data.dashboardData)
        : toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    }
  };
  useEffect(() => {
    fetchDashboard();
  }, []);

  useEffect(() => {
    if (admin === false) {
      navigate("/");
    }
  }, [admin]);
  if (admin === null || loading) return <Loading />;

  return (
    <div
      className={`flex-1 p-4 md:p-10 ${
        darkMode ? "bg-[#171717]" : "bg-yellow-50/30"
      }`}
    >
      {/* Top Stats Cards */}
      <div className="flex flex-wrap gap-4">
        {/* Blogs */}
        <div
          className={`flex items-center border shadow rounded-xl gap-4 cursor-pointer hover:scale-105 transition-transform min-w-50 pl-4 py-3 ${
            darkMode
              ? "border-gray-700 bg-[#111827]"
              : "border-gray-300 bg-white"
          }`}
        >
          <img
            src="/dashboard_icon_1.svg"
            alt="blog-icon"
            className="h-12 w-12"
          />
          <div className="pr-5 pl-2">
            <p
              className={`text-2xl font-medium ${
                darkMode ? "text-gray-100" : "text-gray-700"
              }`}
            >
              {dashboardData.blogs}
            </p>
            <p
              className={`text-sm font-medium tracking-wide ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Blogs
            </p>
          </div>
        </div>

        {/* Comments */}
        <div
          className={`flex items-center border shadow rounded-xl gap-4 cursor-pointer hover:scale-105 transition-transform min-w-45 pl-4 py-3 ${
            darkMode
              ? "border-gray-700 bg-[#111827]"
              : "border-gray-300 bg-white"
          }`}
        >
          <img
            src="/dashboard_icon_2.svg"
            alt="comments-icon"
            className="h-12 w-12"
          />
          <div className="pr-5 pl-2">
            <p
              className={`text-2xl font-medium ${
                darkMode ? "text-gray-100" : "text-gray-700"
              }`}
            >
              {dashboardData.comments}
            </p>
            <p
              className={`text-sm font-medium tracking-wide ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Comments
            </p>
          </div>
        </div>

        {/* Drafts */}
        <div
          className={`flex items-center border shadow rounded-xl gap-4 cursor-pointer hover:scale-105 transition-transform min-w-45 pl-4 py-3 ${
            darkMode
              ? "border-gray-700 bg-[#111827]"
              : "border-gray-300 bg-white"
          }`}
        >
          <img
            src="/dashboard_icon_3.svg"
            alt="drafts-icon"
            className="h-12 w-12"
          />
          <div className="pr-5 pl-2">
            <p
              className={`text-2xl font-medium ${
                darkMode ? "text-gray-100" : "text-gray-700"
              }`}
            >
              {dashboardData.drafts}
            </p>
            <p
              className={`text-sm font-medium tracking-wide ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Drafts
            </p>
          </div>
        </div>
      </div>

      {/* Latest Blogs Table */}
      <div>
        <div
          className={`flex m-4 mt-10 items-center gap-3 ${
            darkMode ? "text-gray-200" : "text-gray-600"
          }`}
        >
          <img src="/dashboard_icon_4.svg" alt="latest-blogs-icon" />
          <p className="text-lg font-semibold">Latest Blogs</p>
        </div>

        <div
          className={`relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide ${
            darkMode ? "bg-[#111827]" : "bg-white"
          }`}
        >
          <table className="w-full text-sm text-gray-500">
            <thead
              className={`text-xs text-left uppercase ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <tr>
                <th className="px-2 py-4 xl:px-6">#</th>
                <th className="px-2 py-4">Blog Title</th>
                <th className="px-2 py-4">Category</th>
                <th className="px-2 py-4 max-sm:hidden">Date</th>
                <th className="px-2 py-4 max-sm:hidden">Status</th>
                <th className="px-2 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {dashboardData.recentBlogs.map((blog, idx) => (
                <TableItem
                  key={idx + 1}
                  blog={blog}
                  index={idx + 1}
                  fetchBlogs={fetchDashboard}
                  isAlternate={idx % 2 === 0}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardMenu;
