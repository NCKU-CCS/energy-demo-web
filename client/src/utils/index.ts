interface IHouseState {
  houseID: string;
  waterUsage: number;
  powerUsage: number;
  gasUsage: number;
}

const sumGaugeData = (data: IHouseState[]) => {
  return data.reduce((accum, value) => ({
    waterUsage: accum.waterUsage + value.waterUsage,
    powerUsage: accum.powerUsage + value.powerUsage,
    gasUsage: accum.gasUsage + value.gasUsage,
  }), {
    waterUsage: 0,
    powerUsage: 0,
    gasUsage: 0,
  });
};

const reduceBy = (states: any, key: string) => (
  states.reduce((a: any, b: any) => ({
    ...a,
    [b[key]]: b, 
  }), {})
);

export default {
  reduceBy,
  sumGaugeData,
};

