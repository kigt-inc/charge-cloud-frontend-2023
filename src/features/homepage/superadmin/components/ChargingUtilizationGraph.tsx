import { Card, Text, Flex } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.defaults.backgroundColor = "#000";

const customCanvasBackgroundColor = {
  id: "customCanvasBackgroundColor",
  beforeDatasetsDraw: (chart: any) => {
    const {
      ctx,
      chartArea: { top, left, width, height },
    } = chart;
    ctx.save();
    ctx.fillStyle = "white";
    ctx.fillRect(left, top, width, height);
  },
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { grid: { display: false } },
    y: { grid: { display: false } },
  },
  plugins: {
    legend: { display: false },
    title: {
      display: false,
    },
  },
};
const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      backgroundColor: "#1A82EC",
    },
  ],
};

const ChargingUtilizationGraph = () => {
  return (
    <Card alignItems="center" h="30rem" p="4rem" pb="8rem">
      <Flex w="full" justifyContent="space-between">
        <Text fontWeight="bold" fontSize="1.5rem">
          $3,278
        </Text>
      </Flex>
      <Text
        w="100%"
        textAlign="left"
        fontWeight="500"
        fontSize="0.875rem"
        color="#A2A6A5"
        mb="2rem"
      >
        Charging Utilization Revenue
      </Text>
      <Bar
        options={options}
        data={data}
        plugins={[customCanvasBackgroundColor]}
      />
    </Card>
  );
};

export default ChargingUtilizationGraph;
