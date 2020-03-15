const moment = require('moment');

/**
 * Format a webhook account event to a flattened format
 * @param {*} event webhook event to be formatted
 */
const mapEvent = ({ event }) => ({
  type: event.type,
  category: event.category,
  account: event.account.number,
  balance: event.account.balance,
  equity: event.account.equity,
  count: event.account.count
});

/**
 * Format a webhook trade event to a flattened format
 * @param {*} event webhook event to be formatted
 */
const mapOpenTrade = ({ event }) => ({
  type: event.type,
  category: event.category,
  account: event.account.number,
  ticket: event.trade.order_id,
  symbol: event.trade.symbol,
  bias: event.trade.type,
  lots: event.trade.lots,
  open_time: event.trade.open_time,
  open_balance: event.account.balance,
  equity: event.account.equity
});

/**
 * Format a webhook trade event to a flattened format
 * @param {*} event webhook event to be formatted
 */
const mapCloseTrade = ({ event }) => {
  let total_profit =
    Number(event.trade.profit || 0) +
    Number(event.trade.swap || 0) +
    Number(event.trade.commission || 0);
  return {
    type: event.type,
    category: event.category,
    account: event.account.number,
    ticket: event.trade.order_id,
    symbol: event.trade.symbol,
    bias: event.trade.type,
    lots: event.trade.lots,
    close_time: event.trade.close_time,
    close_balance: event.account.balance,
    equity: event.account.equity,
    total_profit
  };
};

/**
 * Process a webhook event body to a flattened format
 * @param {*} body webhook body to be processed
 */
const processBody = ({ body = {} }) => {
  let data = false;
  try {
    if (!body.event) {
      data = JSON.parse(Object.keys(body)[0]);
    } else {
      data = body;
    }
    if (data && data.event.category === 'account')
      return mapEvent({ event: data.event });
    if (data && data.event.category === 'trade') {
      if (data.event.type === 'trade_open')
        return mapOpenTrade({ event: data.event });
      if (data.event.type === 'trade_close')
        return mapCloseTrade({ event: data.event });
    }
  } catch (err) {
    console.log('Body process error:', err);
    return false;
  }
};

/**
 * Format curreny function by mapping currency to symbol and formatting
 * @param {*} value number to be formatted
 */
const formatCurrency = (value = 0) =>
  Number(value)
    ? `£${Number(value)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
    : '£0.00';

/**
 * Determine profit or loss trade
 * @param {*} value number to be determined as profit or loss
 */
const isProfitOrLoss = (value = 0) => (Number(value) >= 0 ? 'Profit' : 'Loss');

/**
 * Sum items by value key
 * @param {*} items array of items to be sum'd
 */
const sumValues = (items = [], key = 'total_profit') =>
  items.reduce((acc, i) => acc + (Number(i[key]) ? Number(i[key]) : 0), 0);

/**
 * Work out the duration of a position in days, hours, minutes, seconds
 * @param {*} startDate position start date
 * @param {*} endDate position end date
 */
const getDuration = (startDate, endDate) => {
  let delta = moment(endDate).diff(moment(startDate)) / 1000 || 0;
  const days = Math.floor(delta / 86400) || 0;
  delta -= days * 86400;
  const hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;
  const minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;
  const seconds = (delta % 60).toFixed(0);
  return `${days > 0 ? `${days}d ` : ''}${hours > 0 ? `${hours}h ` : ''}${
    minutes > 0 ? `${minutes}m ` : ''
  }${seconds}s`;
};

/**
 * Reduce historic trades to remove all trades greater than 10 weeks in age
 * @param {*} trades array of closed trades to reduce
 */
const reduceHistory = (trades = []) =>
  trades.filter(
    t => new Date(t.close_time) <= new Date(moment().subtract(10, 'weeks'))
  );

/**
 * Filter trades by a defined period
 * @param {*} trades array of trades to filter
 * @param {*} period period to filter by i.e. 'week', 'month'
 */
const filterByPeriod = ({ trades = [], period = 'day' }) =>
  trades.filter(
    t => new Date(t.close_time) >= new Date(moment().startOf(period))
  );

/**
 * Filter trades by a defined period
 * @param {*} trades array of trades to filter
 * @param {*} date date for period to start/end on
 * @param {*} period period range to filter by i.e. 'week', 'month'
 */
const filterByPeriodRange = ({ trades = [], date = '', period = 'month' }) =>
  trades.filter(
    t =>
      new Date(t.close_time) >= new Date(moment(date).startOf(period)) &&
      new Date(t.close_time) <= new Date(moment(date).endOf(period))
  );

/**
 * Group an array of trades by their respective users
 * @param {*} users array of users to group by
 * @param {*} reducedTrades array of trades to be grouped
 */
const groupByAccount = (users = [], reducedTrades = []) =>
  users.reduce(
    (acc, user) => [
      ...user.accounts.reduce(
        (arr, acc) => [
          {
            id: acc.trade_acc_id,
            profit: sumValues(
              reducedTrades.filter(trade => trade.account === acc.trade_acc_id),
              'total_profit'
            )
          },
          ...arr
        ],
        []
      ),
      ...acc
    ],
    []
  );

/**
 * Return the percentage change
 * @param {*} open trade open price
 * @param {*} profit trade profit value
 */
const calcPercentChange = (open, profit) => {
  if (!open || !profit) return 0;
  return Number((profit / open) * 100);
};

/**
 * Sort items by open time date
 * @param {*} items array of items to sort
 */
const sortByDateKey = ({ items = [], order = 'desc', key = 'open_time' }) => {
  const desc = order === 'asc';
  return items
    .sort(
      (a, b) =>
        new Date(desc ? a[key] : b[key]) - new Date(desc ? b[key] : a[key])
    )
    .map(i => i[key]);
};

module.exports = {
  formatCurrency,
  isProfitOrLoss,
  sumValues,
  getDuration,
  processBody,
  reduceHistory,
  filterByPeriod,
  filterByPeriodRange,
  groupByAccount,
  calcPercentChange,
  sortByDateKey
};
