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
import { useEffect, useState } from "react";
import { getFileFromUrl, processPowerFlow } from "@/utils";
import * as xlsx from "xlsx";

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

type PowerFlowGraphProps = {
  labels: string[] | undefined | null;
  datasets:
    | { label: string; data: number[]; backgroundColor: string }[]
    | undefined
    | null;
};

const PowerFlowGraph = () => {
  const [graphData, setGraphData] = useState<{
    labels: string[];
    datasets: { label: string; data: number[]; backgroundColor: string }[];
  }>({
    labels,
    datasets: [
      {
        label: "Dataset 1",
        // data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        data: [],
        backgroundColor: "#E3E4E4",
      },
    ],
  });
  const [totalKwh, setTotalKwh] = useState(0);

  useEffect(() => {
    const func = async () => {
      let file = await getFileFromUrl(
        "/rancho_chargers.xlsx",
        "charger_90_data"
      );
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = (e: any) => {
        const data = e.target.result;
        const wb = xlsx.read(data, { type: "binary" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const chargerData = xlsx.utils.sheet_to_json(ws);

        let res = processPowerFlow(chargerData);
        let newLabels = res.labels;
        let newGraphData = {
          labels: newLabels,
          datasets: [
            { label: "Dataset 1", data: res.data, backgroundColor: "#E3E4E4" },
          ],
        };

        setGraphData({ ...newGraphData });
        setTotalKwh(res.total);
      };
    };
    func();
  }, []);

  return (
    <Card alignItems="center" h="30rem" p="4rem" pb="8rem">
      <Flex w="full" justifyContent="space-between">
        <Text fontWeight="bold" fontSize="1.5rem">
          {`${totalKwh} Kwh`}
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
        redraw
        options={options}
        data={graphData}
        //plugins={[customCanvasBackgroundColor]}
      />
    </Card>
  );
};

export default PowerFlowGraph;
