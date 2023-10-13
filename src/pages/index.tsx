import { Center, Spinner } from "@chakra-ui/react";

const Home = () => {
  return (
    <Center h="100vh">
      <Spinner />
    </Center>
  );
};

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/signin",
      permanent: false,
    },
  };
}

export default Home;
