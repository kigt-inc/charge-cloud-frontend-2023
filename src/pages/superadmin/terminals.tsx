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
} from "@chakra-ui/react";

import { faker } from "@faker-js/faker";

import DashboardLayout from "@/components/Layout/DashboardLayout";
import withAuth from "@/components/Auth/WithAuth";
import StatusBadge from "@/components/Elements/StatusBadge";

const Terminals = () => {
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
  const data = generateFakeData();
  console.log("data = ", data);
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
        <TableContainer maxHeight="40rem" overflowY="scroll" bgColor="white">
          <Table size="lg" variant="simple">
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
                  _hover={{ cursor: "pointer", bgColor: "#F6F7F7" }}
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
