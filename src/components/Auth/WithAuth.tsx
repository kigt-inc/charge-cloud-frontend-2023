import { useRouter } from "next/router";
import { ComponentType, useCallback, useEffect } from "react";
import { Center, Spinner } from "@chakra-ui/react";
import { useAppSelector } from "@/hooks/useReduxToolkit";

export interface WithAuthProps {
  user: any;
}

const SIGNIN_ROUTE = "/signin";

const ROUTE_ROLES = [
  /**
   * For authentication pages
   * @example /signin /forgotpassword
   */
  "auth",
  /**
   * For all authenticated user
   * will push to login if user is not authenticated
   */
  "superadmin",
  /**
   * For all authenticated user
   * will push to login if user is not authenticated
   */
  "client",
] as const;

type RouteRole = (typeof ROUTE_ROLES)[number];

export default function withAuth<T extends WithAuthProps = WithAuthProps>(
  Component: ComponentType<T>,
  routeRole: RouteRole
) {
  const ComponentWithAuth = (props: Omit<T, keyof WithAuthProps>) => {
    const router = useRouter();
    const user = useAppSelector((state) => state.user);
    const authToken = localStorage.getItem("auth");
    let content = <Component {...(props as T)} />;

    const checkAuth = useCallback(() => {
      if (!authToken) {
        router.replace(SIGNIN_ROUTE);
      }
    }, []);

    useEffect(() => {
      checkAuth();
    }, [checkAuth]);

    if (!authToken) {
      content = (
        <Center h="100vh" bgColor="white">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      );
    } else {
      if (routeRole !== user?.role) {
        content = (
          <Center h="100vh">
            <h1>You do not have access to this page.</h1>
          </Center>
        );
      }
    }

    return content;
  };
  return ComponentWithAuth;
}
