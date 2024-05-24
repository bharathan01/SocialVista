import { GoHome } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { SiAzuredataexplorer } from "react-icons/si";
import { LuMessageSquarePlus } from "react-icons/lu";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiApps2AddLine } from "react-icons/ri";
import { IoNewspaperOutline } from "react-icons/io5";

 const content = [
  { name: "Home", icon: <GoHome />, type: "home" },
  { name: "Serach", icon: <IoSearch />, type: "Serach" },
  { name: "Explore", icon: <SiAzuredataexplorer />, type: "Explore" },
  { name: "Message", icon: <LuMessageSquarePlus />, type: "Message" },
  {
    name: "Notification",
    icon: <IoNotificationsOutline />,
    type: "Notification",
  },
  { name: "Create", icon: <RiApps2AddLine />, type: "Create" },
  { name: "News", icon: <IoNewspaperOutline />, type: "News" },
];

export default content