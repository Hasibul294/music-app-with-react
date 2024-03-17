import { useState } from "react";
import Aside from "../ui/Aside";

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  return (
    <>
      <Aside
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      ></Aside>
    </>
  );
};

export default Sidebar;
