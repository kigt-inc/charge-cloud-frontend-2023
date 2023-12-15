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
import * as xlsx from "xlsx";
import { useEffect, useState } from "react";
import { getFileFromUrl, processTotalChargingSessionsData } from "@/utils";

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
let labels = [
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

export const graphData = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      backgroundColor: "#41C06D",
    },
  ],
};

const ChargingSessionsGraph = () => {
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
        backgroundColor: "#41C06D",
      },
    ],
  });
  const [totalChargingSessions, setTotalChargingSessions] = useState(0);
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

        let res = processTotalChargingSessionsData(chargerData);
        let newLabels = res.labels;
        let newGraphData = {
          labels: newLabels,
          datasets: [
            { label: "Dataset 1", data: res.data, backgroundColor: "#41C06D" },
          ],
        };

        setGraphData({ ...newGraphData });
        setTotalChargingSessions(res.total);
      };
    };
    func();
  }, []);

  return (
    <Card alignItems="center" h="30rem" p="4rem" pb="8rem">
      <Flex w="full" justifyContent="space-between">
        <Text fontWeight="bold" fontSize="1.5rem">
          {`${totalChargingSessions}`}
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
        Total Charging Sessions
      </Text>
      <Bar
        redraw
        options={options}
        data={graphData}
        // plugins={[customCanvasBackgroundColor]}
      />
    </Card>
  );
};

export default ChargingSessionsGraph;
