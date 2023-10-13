import { Box, IconButton, Text } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";

interface SecondarySidebarProps {
  children: any;
}

const LocationsSideBar = ({ children }: SecondarySidebarProps) => {
  return (
    // Sidebar Container
    <Box
      h="95vh"
      bgColor="white"
      border="1px solid #d2e0ea"
      borderTop="none"
      w="300px"
      mb="2"
    >
      {/* Title container */}
      <Box
        as="div"
        display="flex"
        flexDir="row"
        alignItems="center"
        justifyContent="space-between"
        borderBottom="1px solid #d2e0ea"
        textAlign="center"
        p="3"
      >
        <Text fontSize="l" fontWeight="semibold">
          Locations
        </Text>
        <IconButton
          variant="ghost"
          fontSize="18px"
          icon={<FiPlus />}
          aria-label="add location to account"
        />
      </Box>
      {/* Content container */}
      {children}
    </Box>
  );
};

export default LocationsSideBar;
