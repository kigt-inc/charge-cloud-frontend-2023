import React from "react";
import SidebarWithHeader from "../Elements/Sidebar";

type Props = { children?: any };

const DashboardLayout = (props: Props) => {
  return <SidebarWithHeader>{props.children}</SidebarWithHeader>;
};

export default DashboardLayout;
