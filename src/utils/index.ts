import * as xlsx from "xlsx";

interface resultType {
  labels: string[];
  data: number[];
  total: number;
}

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export async function getFileFromUrl(url: string, name: string) {
  const response = await fetch(url);
  const data = await response.blob();
  return new File([data], name, {
    type: data.type,
  });
}

export function processTotalChargingSessionsData(data: any) {
  let result: resultType = {
    labels: [],
    data: [],
    total: 0,
  };
  for (let i = 0; i < data.length; i += 2) {
    let startSession = data[i];
    let endSession = data[i + 1];
    let chargeSessionDate = new Date(startSession.timestamp);
    let month = months[chargeSessionDate.getMonth()];

    if (result.labels.includes(month)) {
      let index = result.labels.indexOf(month);
      result.data[index]++;
      result.total++;
    } else {
      result.labels.push(month);
      result.data.push(1);
      result.total++;
    }
  }

  return result;
}

export function processChargingUtilizationRevenue(data: any) {
  let result: resultType = {
    labels: [],
    data: [],
    total: 0,
  };
  for (let i = 0; i < data.length; i += 2) {
    let startSession = data[i];
    let endSession = data[i + 1];
    let chargeSessionDate = new Date(startSession.timestamp);
    let month = months[chargeSessionDate.getMonth()];
    let lastTransactionAmount = Number(
      startSession["`EVSE Last Transaction Amount`"]
    );

    if (result.labels.includes(month)) {
      let index = result.labels.indexOf(month);
      result.data[index] += lastTransactionAmount * 0.01;
      result.total += lastTransactionAmount * 0.01;
    } else {
      result.labels.push(month);
      result.data.push(lastTransactionAmount * 0.01);
      result.total += lastTransactionAmount * 0.01;
    }
  }
  result.total = Math.trunc(result.total);
  return result;
}

export function processPowerFlow(data: any) {
  let result: resultType = {
    labels: [],
    data: [],
    total: 0,
  };
  for (let i = 0; i < data.length; i += 2) {
    let startSession = data[i];
    let endSession = data[i + 1];
    let chargeSessionDate = new Date(startSession.timestamp);
    let month = months[chargeSessionDate.getMonth()];
    let kwh = Number(startSession["kwh"]);

    if (result.labels.includes(month)) {
      let index = result.labels.indexOf(month);
      result.data[index] += kwh;
      result.total += kwh;
    } else {
      result.labels.push(month);
      result.data.push(kwh);
      result.total += kwh;
    }
  }
  result.total = Math.trunc(result.total);
  return result;
}

export async function loadChargerDataFromExcelSheet() {
  let file = await getFileFromUrl("/rancho_chargers.xlsx", "rancho_chargers");
  let res = {};
  const reader = new FileReader();
  reader.readAsBinaryString(file);
  reader.onload = (e: any) => {
    let res = {};
    const data = e.target.result;
    const wb = xlsx.read(data, { type: "binary" });
    const ws1 = wb.Sheets[wb.SheetNames[0]];
    const ws2 = wb.Sheets[wb.SheetNames[1]];

    const ws1Data = xlsx.utils.sheet_to_json(ws1);
    const ws2Data = xlsx.utils.sheet_to_json(ws2);
    let chargerData = ws1Data.concat(ws2Data);
    let res2 = processChargingUtilizationRevenue(chargerData);
    res = { ...res2 };

    // let newLabels = res.labels;
    // let newGraphData = {
    //   labels: newLabels,
    //   datasets: [
    //     { label: "Dataset 1", data: res.data, backgroundColor: "#1a82ec" },
    //   ],
    // };

    // setGraphData({ ...newGraphData });
    // setTotalRevenue(res.total);
    return;
  };
  return res;
}
