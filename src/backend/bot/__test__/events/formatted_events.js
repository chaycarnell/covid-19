const formatted_open_event = {
  account: '20684668',
  balance: '1000',
  bias: 'sell',
  category: 'trade',
  close_time: null,
  equity: '998.82',
  lots: '0.10',
  open_time: '2019-10-11 18:59:11',
  symbol: 'USDCAD',
  ticket: '206366873',
  total_profit: -1.18,
  type: 'trade_open'
};

const formatted_close_event = {
  account: '20684668',
  balance: '1050',
  bias: 'sell',
  category: 'trade',
  close_time: '2019-10-11 19:02:54',
  equity: '1050',
  lots: '0.10',
  open_time: '2019-10-11 18:59:11',
  symbol: 'USDCAD',
  ticket: '206366873',
  total_profit: 50,
  type: 'trade_close'
};

const formatted_equity_event = {
  account: '20684668',
  balance: '1500',
  category: 'account',
  equity: '1500',
  type: 'equity_change'
};

const formatted_balance_event = {
  account: '20684668',
  balance: '1000',
  category: 'account',
  equity: '1100',
  type: 'balance_change'
};

module.exports = {
  formatted_open_event,
  formatted_close_event,
  formatted_equity_event,
  formatted_balance_event
};
