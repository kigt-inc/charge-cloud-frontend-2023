import { Card, Text, Flex } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { test } from "node:test";

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

export const options: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { grid: { display: false } },
    y: { grid: { display: false } },
  },
  plugins: {
    legend: { display: true, position: "bottom", labels: { boxWidth: 10 } },
    title: {
      display: false,
    },
  },
};
const testLabels = [
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

type PowerFlowGraphProps = {
  labels: string[] | undefined | null;
  datasets:
    | { label: string; data: number[]; backgroundColor: string }[]
    | undefined
    | null;
};

const PowerFlowGraph = ({ labels, datasets }: PowerFlowGraphProps) => {
  labels = labels ?? testLabels;
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        backgroundColor: "#FFC702",
      },
      {
        label: "Dataset 2",
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        backgroundColor: "#E3E4E4",
      },
    ],
  };
  return (
    <Card alignItems="center" h="30rem" p="4rem" pb="8rem">
      <Flex w="full" justifyContent="space-between">
        <Text fontWeight="bold" fontSize="1.5rem">
          4.627 kW
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
        Power Flow
      </Text>
      <Bar
        options={options}
        data={data}
        plugins={[customCanvasBackgroundColor]}
      />
    </Card>
  );
};

export default PowerFlowGraph;
