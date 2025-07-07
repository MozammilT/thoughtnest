import { useState, useEffect } from "react";
import { dashboard_data } from "../../constants/assets.js";
import TableItem from "@/components/admin/TableItem.jsx";
import { toast } from "react-hot-toast";
import { useAppContext } from "../../context/AppContext.jsx";

function DashboardMenu() {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });
  const { axios } = useAppContext();

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard");
      data.success
        ? setDashboardData(data.dashboardData)
        : toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="flex-1 p-4 md:p-10 bg-yellow-50/30">
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center border border-gray-300 shadow rounded gap-4 bg-white cursor-pointer hover:scale-105 transition-all min-w-50 pl-3 py-2">
          <img src="/dashboard_icon_1.svg" alt="blog-icon" className="h-15" />
          <div className="pr-5 pl-2">
            <p className="text-gray-800 text-xl">{dashboardData.blogs}</p>
            <p className="text-gray-600 text-base font-light">Blogs</p>
          </div>
        </div>
        <div className="flex items-center border border-gray-300 shadow rounded gap-4 bg-white cursor-pointer hover:scale-105 transition-all min-w-45 pl-3 py-2">
          <img
            src="/dashboard_icon_2.svg"
            alt="comments-icon"
            className="h-15"
          />
          <div className="pr-5 pl-2">
            <p className="text-gray-800 text-xl">{dashboardData.comments}</p>
            <p className="text-gray-600 text-base font-light">Comments</p>
          </div>
        </div>
        <div className="flex items-center border border-gray-300 shadow rounded gap-4 bg-white cursor-pointer hover:scale-105 transition-all min-w-45 pl-3 py-2">
          <img src="/dashboard_icon_3.svg" alt="drafts-icon" className="h-15" />
          <div className="pr-5 pl-2">
            <p className="text-gray-800 text-xl">{dashboardData.drafts}</p>
            <p className="text-gray-600 text-base font-light">Drafts</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex m-4 mt-15 items-center gap-3 text-gray-600">
          <img src="/dashboard_icon_4.svg" />
          <p>Latest Blogs</p>
        </div>

        <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-600 text-left uppercase">
              <tr>
                <th scope="col" className="px-2 py-4 xl:px-6">
                  #
                </th>
                <th scope="col" className="px-2 py-4">
                  blog title
                </th>
                <th scope="col" className="px-2 py-4">
                  Category
                </th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">
                  date
                </th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">
                  status
                </th>
                <th scope="col" className="px-2 py-4">
                  actions
                </th>
              </tr>
            </thead>

            <tbody>
              {dashboardData.recentBlogs.map((blog, idx) => (
                <TableItem
                  blog={blog}
                  key={idx + 1}
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
