"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../../components/ui/sidebar";
import {
  IconBrandTabler,
  IconMessageCircle,
  IconDeviceIpadHorizontalPlus,
  IconList,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Outlet, Link } from "react-router-dom";
import AdminNavbar from "@/components/admin/AdminNavbar";
import Loading from "../../components/Loading.jsx";
import { useAppContext } from "../../context/AppContext.jsx";

export function SidebarDemo() {
  const links = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700" />,
    },
    {
      label: "Add Blog",
      path: "/dashboard/addBlog",
      icon: (
        <IconDeviceIpadHorizontalPlus className="h-5 w-5 shrink-0 text-neutral-700" />
      ),
    },
    {
      label: "Blog List",
      path: "/dashboard/blogList",
      icon: <IconList className="h-5 w-5 shrink-0 text-neutral-700" />,
    },
    {
      label: "Comments",
      path: "/dashboard/comments",
      icon: <IconMessageCircle className="h-5 w-5 shrink-0 text-neutral-700" />,
    },
  ];
  const [open, setOpen] = useState(false);
  const { admin, navigate, loading, username } = useAppContext();

  useEffect(() => {
    if (!loading && !admin) {
      navigate("/");
    }
  }, [admin, loading]);
  if (loading) return <Loading />;
  return (
    <>
      <AdminNavbar />
      <div
        className={cn(
          "mx-auto flex w-full max-w-screen flex-1 flex-col overflow-hidden border border-neutral-200 bg-gray-100 md:flex-row h-[90vh]"
        )}
      >
        <Sidebar open={open} setOpen={setOpen} animate={false}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col gap-2 cursor-pointer">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
            <div>
              <SidebarLink
                link={{
                  label: username || "admin",
                  path: "#",
                  icon: (
                    <img
                      src={`https://ui-avatars.com/api/?name=${
                        username || "A"
                      }&background=fdc700&color=000&rounded=true`}
                      className="h-7 w-7 shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  ),
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>
        <div className="flex flex-1 flex-col bg-white border-l border-neutral-200">
          <Outlet />
        </div>
      </div>
    </>
  );
}
export const Logo = () => {
  return (
    <Link
      to="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-primary" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-gray-700"
      >
        Admin Page
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      to="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-primary" />
    </Link>
  );
};
