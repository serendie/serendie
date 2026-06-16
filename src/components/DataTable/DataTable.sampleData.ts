export type DataRow = {
  id: number;
  area: string;
  time: string;
  status: string;
  connections: number;
  households: number;
  coverage: string;
  errorRate: string;
  process: string;
};

const areaList = [
  "東京",
  "大阪",
  "名古屋",
  "札幌",
  "福岡",
  "仙台",
  "広島",
  "神戸",
  "京都",
  "横浜",
];
const statusList = ["正常", "警告", "障害", "調査中"];
const processList = ["完了", "進行中", "未着手", "一時停止"];

const DEFAULT_SEED = 0x5e2e_7d15;

function createSeededRandom(seed: number) {
  let value = seed;

  return () => {
    value |= 0;
    value = (value + 0x6d2b_79f5) | 0;

    let result = Math.imul(value ^ (value >>> 15), 1 | value);
    result =
      (result + Math.imul(result ^ (result >>> 7), 61 | result)) ^ result;

    return ((result ^ (result >>> 14)) >>> 0) / 4_294_967_296;
  };
}

function randomInt(random: () => number, min: number, max: number) {
  return Math.floor(random() * (max - min + 1)) + min;
}

function randomPick<T>(random: () => number, arr: T[]): T {
  return arr[randomInt(random, 0, arr.length - 1)];
}

export function createDataTableRows(seed = DEFAULT_SEED): DataRow[] {
  const random = createSeededRandom(seed);

  return Array.from({ length: 10 }, (_, i) => {
    const area = randomPick(random, areaList);
    const status = randomPick(random, statusList);
    const process = randomPick(random, processList);
    const connections = randomInt(random, 50, 5000);
    const households = randomInt(random, 30, 4000);
    const coverage = `${randomInt(random, 60, 100)}%`;
    const errorRate = `${(random() * 5).toFixed(2)}%`;
    const hour = randomInt(random, 0, 23).toString().padStart(2, "0");
    const minute = randomInt(random, 0, 59).toString().padStart(2, "0");
    const time = `2025-04-${randomInt(random, 1, 30)
      .toString()
      .padStart(2, "0")} ${hour}:${minute}`;

    return {
      id: i + 1,
      area,
      time,
      status,
      connections,
      households,
      coverage,
      errorRate,
      process,
    };
  });
}
