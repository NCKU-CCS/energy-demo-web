interface IEgauge {
  waterUsage: number;
  powerUsage: number;
  gasUsage: number;
}

const sumGaugeData = (data: IEgauge[]) => {
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

export default {
  sumGaugeData,
};

