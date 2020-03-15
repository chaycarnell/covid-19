const {
  formatCurrency,
  isProfitOrLoss,
  sumValues,
  getDuration,
  reduceHistory,
  filterByPeriod,
  groupByAccount,
  calcPercentChange,
  sortByDateKey
} = require('../../bot.helpers');
const {
  validClosedTrades,
  errorClosedTrades,
  mockAccounts
} = require('./mocks.js');

test('Format a value to currency', () => {
  expect(formatCurrency(1001)).toBe('£1,001.00');
  expect(formatCurrency(1)).toBe('£1.00');
  expect(formatCurrency(0.01)).toBe('£0.01');
  expect(formatCurrency('0.01')).toBe('£0.01');
  expect(formatCurrency(undefined)).toBe('£0.00');
  expect(formatCurrency('string')).toBe('£0.00');
});

test('Return profit or loss status', () => {
  expect(isProfitOrLoss(1)).toBe('Profit');
  expect(isProfitOrLoss(0.01)).toBe('Profit');
  expect(isProfitOrLoss('1')).toBe('Profit');
  expect(isProfitOrLoss(undefined)).toBe('Profit');
  expect(isProfitOrLoss(0)).toBe('Profit');
  expect(isProfitOrLoss(-1)).toBe('Loss');
  expect(isProfitOrLoss(-0.01)).toBe('Loss');
  expect(isProfitOrLoss('-1')).toBe('Loss');
});

test('Sum values of items by key', () => {
  expect(sumValues(validClosedTrades, 'total_profit')).toBe(86);
  expect(sumValues(errorClosedTrades, 'total_profit')).toBe(0);
  expect(sumValues(undefined, 'total_profit')).toBe(0);
});

test('Calculate the duration of a trade', () => {
  expect(getDuration('2019-10-11 19:00:00', '2019-10-11 19:00:00')).toBe('0s');
  expect(getDuration('2019-10-11 19:00:00', '2019-10-11 19:00:01')).toBe('1s');
  expect(getDuration('2019-10-11 19:00:00', '2019-10-11 19:01:30')).toBe(
    '1m 30s'
  );
  expect(getDuration('2019-10-11 19:00:00', '2019-10-11 20:35:15')).toBe(
    '1h 35m 15s'
  );
  expect(getDuration('2019-10-11 19:00:00', '2019-10-12 19:35:15')).toBe(
    '1d 35m 15s'
  );
});

test('Filter 6 week or older trades', () => {
  expect(reduceHistory(validClosedTrades).length).toBe(1);
  expect(reduceHistory(undefined).length).toBe(0);
});

test('Filter trades by period', () => {
  expect(
    filterByPeriod({ trades: validClosedTrades, period: 'month' }).length
  ).toBe(1);
  expect(
    filterByPeriod({ trades: validClosedTrades, period: 'day' }).length
  ).toBe(1);
  expect(filterByPeriod({ period: 'day' }).length).toBe(0);
});

test('Group trades by account', () => {
  expect(groupByAccount(mockAccounts, validClosedTrades).length).toBe(3);
  expect(
    groupByAccount(mockAccounts, validClosedTrades).find(
      acc => acc.id === 'accountone'
    ).profit
  ).toBe(125.5);
  expect(
    groupByAccount(mockAccounts, validClosedTrades).find(
      acc => acc.id === 'accounttwo'
    ).profit
  ).toBe(10.5);
  expect(
    groupByAccount(mockAccounts, validClosedTrades).find(
      acc => acc.id === 'accountthree'
    ).profit
  ).toBe(-50);
  expect(groupByAccount(mockAccounts)[0].profit).toBe(0);
  expect(groupByAccount(undefined, validClosedTrades).length).toBe(0);
});

test('Calculate percentage change', () => {
  expect(calcPercentChange(1000, 100)).toBe(10);
  expect(calcPercentChange(100, 0)).toBe(0);
  expect(calcPercentChange(1000, -100)).toBe(-10);
  expect(calcPercentChange(1000, 150)).toBe(15);
  expect(calcPercentChange('1000.00', '100')).toBe(10);
  expect(calcPercentChange('1000.00', '-100')).toBe(-10);
  expect(calcPercentChange(100)).toBe(0);
});

test('Sort items by date key', () => {
  expect(
    sortByDateKey({
      items: validClosedTrades,
      order: 'asc',
      key: 'open_time'
    })[0]
  ).toBe('1970-08-11 18:59:11');
  expect(
    sortByDateKey({
      items: validClosedTrades,
      order: 'desc',
      key: 'open_time'
    })[2]
  ).toBe('1970-08-11 18:59:11');
  expect(
    sortByDateKey({
      items: validClosedTrades
    })[2]
  ).toBe('1970-08-11 18:59:11');
});
