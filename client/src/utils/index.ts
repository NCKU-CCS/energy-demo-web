interface IEgauge {
  gen: number;
  use: number;
  grid: number;
}

const sumGaugeData = (data: IEgauge[]) => {
  return data.reduce((accum, value) => ({
    gen: accum.gen + value.gen,
    use: accum.use + value.use,
    grid: accum.grid + value.grid,
  }), {
    gen: 0,
    use: 0,
    grid: 0,
  });
};

export default {
  sumGaugeData,
};

