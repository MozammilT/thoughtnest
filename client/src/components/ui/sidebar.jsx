"use client";
import { cn } from "@/lib/utils";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconMenuDeep, IconX } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext.jsx";

const SidebarContext = createContext(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}) => {
  const [openState, setOpenState] = useState(false);
  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({ children, open, setOpen, animate }) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...props} />
    </>
  );
};

export const DesktopSidebar = ({ className, children, ...props }) => {
  const { open, setOpen, animate } = useSidebar();
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  return (
    <motion.div
      className={cn(
        `h-full px-4 py-4 hidden md:flex md:flex-col w-[300px] shrink-0 ${
          darkMode ? "bg-[#262626]" : "bg-neutral-100"
        }`,
        className
      )}
      animate={{
        width: animate ? (open ? "300px" : "60px") : "300px",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const MobileSidebar = ({ className, children, ...props }) => {
  const { theme } = useTheme();
  const darkMode = theme === "dark";
  const { open, setOpen } = useSidebar();
  return (
    <div
      className={cn(
        `${
          darkMode ? "bg-[#262626]" : "bg-neutral-100"
        } h-10 px-4 py-4 flex flex-row md:hidden items-center justify-between w-full`
      )}
      {...props}
    >
      <div className="flex justify-end z-20 w-full">
        <IconMenuDeep
          className={`${darkMode ? "text-neutral-300" : "text-neutral-800"}`}
          onClick={() => setOpen(!open)}
        />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className={cn(
              `${
                darkMode ? "bg-[#262626]" : "bg-white"
              } fixed h-full w-full inset-0 p-10 z-[100] flex flex-col justify-between`,
              className
            )}
          >
            <div
              className={`absolute right-10 top-10 z-50 ${
                darkMode ? "text-neutral-300" : "text-neutral-800"
              }`}
              onClick={() => setOpen(!open)}
            >
              <IconX />
            </div>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const SidebarLink = ({ link, className, ...props }) => {
  const { open, animate } = useSidebar();
  const location = useLocation();
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  const isActive = location.pathname === link.path;

  const baseClasses =
    "flex items-center justify-start gap-2 group/sidebar py-2 px-3 rounded transition-all duration-200";

  return (
    <Link
      to={link.path}
      className={cn(baseClasses, isActive && "bg-primary", className)}
      {...props}
    >
      <div className="shrink-0">{link.icon}</div>
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
      >
        {link.label}
      </motion.span>
    </Link>
  );
};
