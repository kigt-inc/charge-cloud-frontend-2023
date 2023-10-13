import {
  Tab,
  TabList,
  TabPanels,
  Tabs,
  TabPanel,
  Container,
} from "@chakra-ui/react";
import React from "react";
import withAuth from "@/components/Auth/WithAuth";
import DashboardLayout from "@/components/Layout/DashboardLayout";

const ChargerDetails = () => {
  return (
    <DashboardLayout>
      <Container maxW="6xl" py="2rem">
        <Tabs>
          <TabList>
            <Tab>Details</Tab>
            <Tab>Settings</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>One</p>
            </TabPanel>
            <TabPanel>
              <p>Two</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </DashboardLayout>
  );
};

export default withAuth(ChargerDetails, "superadmin");
