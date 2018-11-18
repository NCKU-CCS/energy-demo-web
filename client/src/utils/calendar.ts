import dayjs, { Dayjs } from 'dayjs';

const today = dayjs();
const aYearAgo = today.subtract(370, 'day');

const genCalendarData = (start: Dayjs, end: Dayjs) => {
  const data = [];
  const weekToMonth = {};
  let iterDate = start.clone();
  let week = 0;
  let preMonth;
  while (iterDate <= end) {
    const month = iterDate.format('MMM');
    if (preMonth !== month) {
      weekToMonth[week] = month;
      preMonth = month;
    }
    data.push({
      date: iterDate.format('YYYY-MM-DD'),
      value: Math.random() * 10,
      day: iterDate.day(),
      week,
    });
    if (iterDate.day() === 6) {
      week += 1;
    }
    iterDate = iterDate.add(1, 'day');
  }
  return {
    data,
    weekToMonth,
  };
}

export default {
  ...genCalendarData(aYearAgo, today),
  today,
  aYearAgo,
};

