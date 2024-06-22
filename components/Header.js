import {
  AlignJustify,
  Bell,
  CircleUserRound,
  Maximize,
  Minimize,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";

const Header = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const { data: session } = useSession();

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullScreen(true);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullScreen(false);
        });
      }
    }
  };

  return (
    <div>
      <header className="h-24 w-full p-8 fixed top-0 flex  justify-between bg-white z-[99] shadow-xl">
        <div className="relative flex gap-2 cursor-pointer">
          <h1>Admin Dashboard</h1>
          <div className="flex items-center">
            <AlignJustify />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="cursor-pointer" onClick={toggleFullScreen}>
            {isFullScreen ? <Minimize /> : <Maximize />}
          </div>
          <div className="cursor-pointer">
            <Bell />
          </div>
          <div className="cursor-pointer">
            {session ? (
              <div className="w-9 h-9 rounded-full overflow-hidden">
                <Image
                  src={session.user.image}
                  width={32}
                  height={32}
                  alt="user"
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <CircleUserRound />
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
