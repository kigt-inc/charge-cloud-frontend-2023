import SecondarySideBar from "@/components/Elements/SecondarySideBar";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import ChargingUtilizationGraph from "@/features/homepage/superadmin/components/ChargingUtilizationGraph";
import React from "react";

const playground = () => {
  return (
    <DashboardLayout>
      <ChargingUtilizationGraph />
    </DashboardLayout>
  );
};

export default playground;
