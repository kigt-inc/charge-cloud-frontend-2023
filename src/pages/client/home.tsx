import { Box } from "@chakra-ui/react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import ChargingUtilizationGraph from "@/features/homepage/superadmin/components/ChargingUtilizationGraph";
import withAuth from "@/components/Auth/WithAuth";

const ClientHome = () => {
  return (
    <DashboardLayout>
      <Box as="div" p="1.5rem">
        <ChargingUtilizationGraph />
      </Box>
    </DashboardLayout>
  );
};

export default withAuth(ClientHome, "client");
