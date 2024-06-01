import { GoHome } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { SiAzuredataexplorer } from "react-icons/si";
import { LuMessageSquarePlus } from "react-icons/lu";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiApps2AddLine } from "react-icons/ri";
import { IoNewspaperOutline } from "react-icons/io5";

 const content = [
  { name: "Home", icon: <GoHome />, path: "" },
  { name: "Serach", icon: <IoSearch />, path: "serach" },
  { name: "Explore", icon: <SiAzuredataexplorer />, path: "explore" },
  { name: "Message", icon: <LuMessageSquarePlus />, path: "message" },
  {
    name: "Notification",
    icon: <IoNotificationsOutline />,
    path: "notification",
  },
  { name: "Create", icon: <RiApps2AddLine />, path: "create" },
  { name: "News", icon: <IoNewspaperOutline />, path: "news" },
];

export default content