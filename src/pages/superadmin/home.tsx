import { Box, Flex, Container } from "@chakra-ui/react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import ChargingUtilizationGraph from "@/features/homepage/superadmin/components/ChargingUtilizationGraph";
import withAuth from "@/components/Auth/WithAuth";
import PowerFlowGraph from "@/features/homepage/superadmin/components/PowerFlowGraph";
import ChargingSessionsGraph from "@/features/homepage/ChargingSessionsGraph";

const SuperAdminHome = () => {
  return (
    <DashboardLayout>
      <Container maxW="6xl">
        <Flex flexDir="column" gap={4} p="1.5rem">
          <ChargingUtilizationGraph />
          <PowerFlowGraph labels={undefined} datasets={undefined} />
          <ChargingSessionsGraph />
        </Flex>
      </Container>
    </DashboardLayout>
  );
};

export default withAuth(SuperAdminHome, "superadmin");
