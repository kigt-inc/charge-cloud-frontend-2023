"use client";

import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiLogOut,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { useRouter } from "next/router";
import { signOut } from "@/services/auth";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxToolkit";
import { REMOVE_USER } from "@/redux/reducers/userSlice";
import { ReactNode } from "react";
import Image from "next/image";
import withAuth from "../Auth/WithAuth";

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
  href: string;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, href: "/home" },
  { name: "Terminals", icon: FiTrendingUp, href: "/terminals" },
  //{ name: "Throttling", icon: FiCompass },
  { name: "Account", icon: FiSettings, href: "/account" },
  { name: "Sign Out", icon: FiLogOut, href: "/signout" },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg="#121212"
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mx="8"
        justifyContent={{ base: "space-between", md: "center" }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Image
            width={100}
            height={100}
            src="/images/logo.svg"
            alt="KIGT logo"
          />
        </div>

        <CloseButton
          color={useColorModeValue("gray.200", "gray.700")}
          display={{ base: "flex", md: "none" }}
          onClick={onClose}
        />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} href={link.href}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, href, ...rest }: NavItemProps) => {
  const { pathname } = useRouter();
  const dispatch = useAppDispatch();
  const userSelector = useAppSelector((state) => state.user);
  const doesPathNameIncludeHref = pathname.includes(href);
  const routePrefix =
    userSelector?.role === "superadmin" ? "/superadmin" : "/client";

  const handleClick = async () => {
    if (href.includes("signout")) {
      signOut();
      await dispatch(REMOVE_USER(null));
    } else {
      return undefined;
    }
  };

  // TODO: <Box></Box> has a weird work around for onClick, fix when we have more time
  return (
    <Box
      as="a"
      href={href !== "/signout" ? routePrefix + href : undefined}
      color={doesPathNameIncludeHref ? "#00A067" : "#C6C9C8"}
      bgColor={doesPathNameIncludeHref ? "#303131" : undefined}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      onClick={handleClick}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        color="inherit"
        bgColor="inherit"
        _hover={{
          bg: "#303131",
          color: "#00A067",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "#00A067",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={{ base: "#121212", md: `${useColorModeValue("white", "gray.900")}` }}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
        color={useColorModeValue("gray.200", "gray.700")}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        {/* <img src="/images/logo.svg" alt="Desktop Kigt Logo" /> */}
        <Image
          width={100}
          height={100}
          src="/images/logo.svg"
          alt="Desktop Kigt Logo"
        />
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{user?.first_name}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {user?.role}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Acount</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem
                onClick={async () => {
                  signOut();
                  await dispatch(REMOVE_USER(null));
                }}
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const SidebarWithHeader = ({ children }: { children: ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* Mobile Nav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }}>
        {/* Content */}
        {children}
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
