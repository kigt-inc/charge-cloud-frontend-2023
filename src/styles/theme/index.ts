// import { extendTheme } from "@chakra-ui/react";

// export default extendTheme();

import { ThemeConfig, extendTheme } from "@chakra-ui/react";
import "@fontsource-variable/inter";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  config,
  fonts: {
    header: `'Inter Variable', sans-serif`,
    body: `'Inter Variable', sans-serif`,
  },
  components: {
    Tabs: {
      baseStyle: {
        tab: {
          _selected: {
            color: "#00A067",
          },
        },
      },
    },
  },
  colors: {
    brand: {
      50: "#1E1E1E",
      100: "#D0FBE3",
      200: "#A4F6CC",
      300: "#6AEBB2",
      400: "#2FD892",
      500: "#0ABF7B",
      600: "#00A067",
      700: "#007C53",
      800: "#036243",
      900: "#045039",
      950: "#012D21",
    },
  },
});

export { theme };
