import Smart from '../smart';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getType, getPrice, getCountType, getDuration} from '../utils/statistics';
import { ChartSet} from '../utils/const';
import {getTimeFormat} from '../utils/events.js';

const BAR_HEIGHT = 55;

const createMoneyChart = (moneyCtx, statistics) => {
  const sortByPrice = statistics.sort((elem1, elem2) => {
    return elem2.price - elem1.price;
  });

  const type = sortByPrice.map((i) => i.type);
  const price = sortByPrice.map((i) => i.price);

  return (new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: ChartSet.TYPE,
    data: {
      labels: type,
      datasets: [{
        data: price,
        backgroundColor: ChartSet.COLOR.WHITE,
        hoverBackgroundColor: ChartSet.COLOR.WHITE,
        anchor: ChartSet.ANCHOR.START,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: ChartSet.FONT_SIZE.DATA_LABELS,
          },
          color: ChartSet.COLOR.BLACK,
          anchor: ChartSet.ANCHOR.END,
          align: ChartSet.ALIGN,
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: ChartSet.DISPLAY.TRUE,
        text: ChartSet.TEXT.MONEY,
        fontColor: ChartSet.COLOR.BLACK,
        fontSize: ChartSet.FONT_SIZE.TITLE,
        position: ChartSet.POSITION,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: ChartSet.COLOR.BLACK,
            padding: ChartSet.PADDING,
            fontSize: ChartSet.FONT_SIZE.SCALES,
          },
          gridLines: {
            display: ChartSet.DISPLAY.FALSE,
            drawBorder: ChartSet.DRAW_BORDER.FALSE,
          },
          barThickness: ChartSet.BAR_THICKNESS,
        }],
        xAxes: [{
          ticks: {
            display: ChartSet.DISPLAY.FALSE,
            beginAtZero: ChartSet.BEGIN_AT_ZERO,
          },
          gridLines: {
            display: ChartSet.DISPLAY.FALSE,
            drawBorder: ChartSet.DRAW_BORDER.FALSE,
          },
          minBarLength: ChartSet.MIN_BAR_LENGTH,
        }],
      },
      legend: {
        display: ChartSet.DISPLAY.FALSE,
      },
      tooltips: {
        enabled: ChartSet.TOOLTIPS_ENABLED,
      },
    },
  }));
};


const createTimeSpendChart = (timeCtx, statistics) => {
  const sortByTime = statistics.sort((elem1, elem2) => {
    return elem2.duration - elem1.duration;
  });
  const type = sortByTime.map((i) => i.type);
  const time = sortByTime.map((i) => i.duration);

  return (
    new Chart(timeCtx, {
      plugins: [ChartDataLabels],
      type: ChartSet.TYPE,
      data: {
        labels: type,
        datasets: [{
          data: time,
          backgroundColor: ChartSet.COLOR.WHITE,
          hoverBackgroundColor: ChartSet.COLOR.WHITE,
          anchor: ChartSet.ANCHOR.START,
        }],
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: ChartSet.FONT_SIZE.DATA_LABELS,
            },
            color: ChartSet.COLOR.BLACK,
            anchor: ChartSet.ANCHOR.END,
            align: ChartSet.ALIGN,
            formatter: (val) => `${getTimeFormat(val)}`,
          },
        },
        title: {
          display: ChartSet.DISPLAY.TRUE,
          text: ChartSet.TEXT.TIME_SPEND,
          fontColor: ChartSet.COLOR.BLACK,
          fontSize: ChartSet.FONT_SIZE.TITLE,
          position: ChartSet.POSITION,
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: ChartSet.COLOR.BLACK,
              padding: ChartSet.PADDING,
              fontSize: ChartSet.FONT_SIZE.SCALES,
            },
            gridLines: {
              display: ChartSet.DISPLAY.FALSE,
              drawBorder: ChartSet.DRAW_BORDER.FALSE,
            },
            barThickness: ChartSet.BAR_THICKNESS,
          }],
          xAxes: [{
            ticks: {
              display: ChartSet.DISPLAY.FALSE,
              beginAtZero: ChartSet.BEGIN_AT_ZERO,
            },
            gridLines: {
              display: ChartSet.DISPLAY.FALSE,
              drawBorder: ChartSet.DRAW_BORDER.FALSE,
            },
            minBarLength: ChartSet.MIN_BAR_LENGTH,
          }],
        },
        legend: {
          display: ChartSet.DISPLAY.FALSE,
        },
        tooltips: {
          enabled: ChartSet.TOOLTIPS_ENABLED,
        },
      },
    }));
};

const createTypeChart = (typeCtx, statistics) => {
  const sortByType = statistics.sort((elem1, elem2) => {
    return elem2.count - elem1.count;
  });
  const type = sortByType.map((i) => i.type);
  const count = sortByType.map((i) => i.count);


  return (
    new Chart(typeCtx, {
      plugins: [ChartDataLabels],
      type: ChartSet.TYPE,
      data: {
        labels: type,
        datasets: [{
          data: count,
          backgroundColor: ChartSet.COLOR.WHITE,
          hoverBackgroundColor: ChartSet.COLOR.WHITE,
          anchor: ChartSet.ANCHOR.START,
        }],
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: ChartSet.FONT_SIZE.DATA_LABELS,
            },
            color: ChartSet.COLOR.BLACK,
            anchor: ChartSet.ANCHOR.END,
            align: ChartSet.ALIGN,
            formatter: (val) => `${val}x`,
          },
        },
        title: {
          display: ChartSet.DISPLAY.TRUE,
          text: ChartSet.TEXT.TYPE,
          fontColor: ChartSet.COLOR.BLACK,
          fontSize: ChartSet.FONT_SIZE.TITLE,
          position: ChartSet.POSITION,
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: ChartSet.COLOR.BLACK,
              padding: ChartSet.PADDING,
              fontSize: ChartSet.FONT_SIZE.SCALES,
            },
            gridLines: {
              display: ChartSet.DISPLAY.FALSE,
              drawBorder: ChartSet.DRAW_BORDER.FALSE,
            },
            barThickness: ChartSet.BAR_THICKNESS,
          }],
          xAxes: [{
            ticks: {
              display: ChartSet.DISPLAY.FALSE,
              beginAtZero: ChartSet.BEGIN_AT_ZERO,
            },
            gridLines: {
              display: ChartSet.DISPLAY.FALSE,
              drawBorder: ChartSet.DRAW_BORDER.FALSE,
            },
            minBarLength: ChartSet.MIN_BAR_LENGTH,
          }],
        },
        legend: {
          display: ChartSet.DISPLAY.FALSE,
        },
        tooltips: {
          enabled: ChartSet.TOOLTIPS_ENABLED,
        },
      },
    }));
};

const createTemplateStatistic = () => {
  return `<section class="statistics">
          <h2 class="visually-hidden">Trip statistics</h2>

          <div class="statistics__item statistics__item--money">
            <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
          </div>

          <div class="statistics__item statistics__item--transport">
            <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
          </div>

          <div class="statistics__item statistics__item--time-spend">
            <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
          </div>
        </section>`;
};

export default class Stats extends Smart {
  constructor(data) {
    super();
    this._data = data;
    this._moneyChart == null;
    this._typeChart == null;
    this._timeChart == null;

    this._setCharts();
  }

  removeElement() {
    super.removeElement();
  }

  getTemplate() {
    return createTemplateStatistic(this._data);
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {
    const moneyCtx = this.getElement().querySelector('.statistics__chart--money');
    const typeCtx = this.getElement().querySelector('.statistics__chart--transport');
    const timeCtx = this.getElement().querySelector('.statistics__chart--time');

    moneyCtx.height = BAR_HEIGHT * 5;
    typeCtx.height = BAR_HEIGHT * 5;
    timeCtx.height = BAR_HEIGHT * 5;

    const typeStat = getType(this._data);
    const priceStat = getPrice(this._data);
    const countTypeStat = getCountType(this._data);
    const durationStat = typeStat.map((item) => getDuration(this._data, item));


    const statistics = typeStat.map((item, index) => ({
      type: item,
      price: priceStat[index],
      count: countTypeStat[index],
      duration: durationStat[index],
    }));

    this._moneyChart = createMoneyChart(moneyCtx, statistics);
    this._timeChart = createTypeChart(timeCtx, statistics);
    this._typeChart = createTimeSpendChart(typeCtx, statistics);
  }
}
