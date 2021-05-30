import dayjs from 'dayjs';

export const getType = (data) => {
  return Array.from(new Set(data.map((item) => {
    return item.type;
  })));
};

export const getPrice = (points) => {
  const data = Array(getType(points).length).fill(0);
  getType(points).map((type, index) => {
    points.filter((point) => {return point.type === type;})
      .map((item) => {
        data[index] += item.price;
      });
  });
  return data;
};


export const getCountType = (points) => {
  const data = Array(getType(points).length).fill(0);
  getType(points).map((item, index) => {
    points.filter((point) => {return point.type === item;})
      .map(() => {
        data[index] += 1;
      });
  });
  return data;
};

export const getDuration  = (points, type) => {
  const allPointsTypes = points.filter((point) => point.type === type);
  const duration = allPointsTypes.reduce((totalDuration, point) => {
    return totalDuration + dayjs(point.dateTo).diff(dayjs(point.dateFrom), 'm');
  }, 0);
  return duration;
};
