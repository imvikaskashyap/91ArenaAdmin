import {
  CircleEllipsis,
  FilePlus,
  House,
  Newspaper,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Aside = () => {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setClicked(false);
  };

  useEffect(() => {
    // update active link state when the page is reloads
    setActiveLink(router.pathname);
  }, [router.pathname]);

  return (
    <aside className=" w-24 h-[100vh] fixed left-0 top-[97px] bg-white z-[99] shadow-xl">
      <ul>
        <Link href="/">
          <li
            className={`${
              activeLink === "/" ? "bg-purple-700 text-white" : ""
            } p-2 flex items-center justify-center`} onClick={()=>handleLinkClick("/")}
          >
            <div className="flex flex-col items-center justify-center">
              <House  />
              <p >Dashboard</p>
            </div>{" "}
          </li>
        </Link>
        <Link href="/blogs">
          <li
            className={`${
              activeLink === "/blogs" ? "bg-purple-700 text-white" : ""
            } p-2 flex items-center justify-center`}
            onClick={()=>handleLinkClick("/blogs")}
          >
            <div className="flex flex-col items-center justify-center">
              <Newspaper className="" />
              <p className="">Blogs</p>
            </div>
          </li>
        </Link>
        <Link href="/blogs/add-blog">
          <li
            className={`${
              activeLink === "/blog/add-blog" ? "bg-purple-700 text-white" : ""
            } p-2 flex items-center justify-center`}
            onClick={()=>handleLinkClick("/blog/add-blog")}
          >
            <div className="flex flex-col items-center justify-center">
              <FilePlus />
              <p >Add Blog</p>
            </div>
          </li>
        </Link>
        <Link href="/pending-blogs">
          <li
            className={`${
              activeLink === "/pending-blogs" ? "bg-purple-700 text-white" : ""
            } p-2 flex items-center justify-center`}
            onClick={()=>handleLinkClick("/pending-blogs")}
          >
            <div className="flex flex-col items-center justify-center">
              <CircleEllipsis  />
              <p >Pending</p>
            </div>{" "}
          </li>
        </Link>
        <Link href="/setting">
          <li
            className={`${
              activeLink === "/setting" ? "bg-purple-700 text-white" : ""
            } p-2 flex items-center justify-center`}
            onClick={()=>handleLinkClick("/setting")}
          >
            <div className="flex flex-col items-center justify-center">
              <Settings  />
              <p >Settings</p>
            </div>
          </li>
        </Link>
      </ul>
    </aside>
  );
};

export default Aside;
