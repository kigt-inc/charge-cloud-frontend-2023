import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Container,
  Text,
  useColorMode,
} from "@chakra-ui/react";

import { faker } from "@faker-js/faker";

import DashboardLayout from "@/components/Layout/DashboardLayout";
import withAuth from "@/components/Auth/WithAuth";
import StatusBadge from "@/components/Elements/StatusBadge";
import { useEffect } from "react";

const Terminals = () => {
  const { colorMode } = useColorMode();
  const generateFakeData = () => {
    let data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        name: faker.company.name(),
        serialNumber: faker.number.int({ min: 100000, max: 100010 }),
        kiosk: faker.number.int({ min: 100000, max: 100010 }),
        model: "IM30",
        merchant: faker.company.name(),
        createdAt: faker.date.recent().toLocaleString(),
        status: "connected",
      });
    }
    return data;
  };
  const data = [
    {
      name: "Rancho Charger 1",
      serialNumber: 1640083690,
      kiosk: "Rancho Charger 1",
      model: "IM30",
      merchant: "KIGT",
      createdAt: faker.date.recent().toLocaleString(),
      status: "connected",
    },
    {
      name: "Rancho Charger 2",
      serialNumber: 1640083657,
      kiosk: "Rancho Charger 2",
      model: "IM30",
      merchant: "KIGT",
      createdAt: faker.date.recent().toLocaleString(),
      status: "connected",
    },
  ];

  useEffect(() => {}, []);

  return (
    <DashboardLayout>
      <Container maxWidth="6xl" py="2rem">
        <Text
          color="#171818"
          fontSize="1.375rem"
          lineHeight="24px"
          fontWeight="600"
          mb="2rem"
        >
          Terminal Management
        </Text>
        <TableContainer
          maxHeight="40rem"
          overflowY="scroll"
          bgColor={colorMode === "dark" ? "#2d3748" : "white"}
        >
          <Table
            size="lg"
            variant="simple"
            colorScheme={colorMode === "dark" ? "blackAlpha" : "whiteAlpha"}
          >
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Serial No.</Th>
                <Th>Kiosk</Th>
                <Th>Model</Th>
                <Th>Merchant</Th>

                <Th>Status</Th>
                <Th>Created At</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((entry) => (
                <Tr
                  // _hover={{ cursor: "pointer", bgColor: "#F6F7F7" }}
                  _hover={{ cursor: "pointer" }}
                  key={entry.serialNumber}
                >
                  <Td>{entry.name}</Td>
                  <Td>{entry.serialNumber}</Td>
                  <Td isNumeric>{entry.kiosk}</Td>
                  <Td>{entry.model}</Td>
                  <Td>{entry.merchant}</Td>
                  <Td>
                    <StatusBadge
                      status={entry.status}
                      text={entry.status.toUpperCase()}
                    />
                  </Td>
                  <Td>{entry.createdAt}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </DashboardLayout>
  );
};

export default withAuth(Terminals, "superadmin");
