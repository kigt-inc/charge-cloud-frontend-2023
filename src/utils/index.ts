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
