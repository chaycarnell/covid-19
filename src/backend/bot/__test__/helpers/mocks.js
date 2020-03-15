const moment = require('moment');

const validClosedTrades = [
  {
    account: 'accountone',
    balance: '1050',
    bias: 'sell',
    category: 'trade',
    close_time: '1970-08-11 19:02:54',
    equity: '1050',
    lots: '0.10',
    open_time: '1970-08-11 18:59:11',
    symbol: 'USDCAD',
    ticket: '206366873',
    // Valid value
    total_profit: 125.5,
    type: 'trade_close'
  },
  {
    account: 'accounttwo',
    balance: '1050',
    bias: 'sell',
    category: 'trade',
    close_time: new Date(moment().subtract(5, 'week')),
    equity: '1050',
    lots: '0.10',
    open_time: new Date(moment().subtract(5, 'week')),
    symbol: 'USDCAD',
    ticket: '206366873',
    //Throw in a string value
    total_profit: '10.5',
    type: 'trade_close'
  },
  {
    account: 'accountthree',
    balance: '1050',
    bias: 'sell',
    category: 'trade',
    close_time: new Date(),
    equity: '1050',
    lots: '0.10',
    open_time: new Date(),
    symbol: 'USDCAD',
    ticket: '206366873',
    // Valid negative value
    total_profit: -50,
    type: 'trade_close'
  }
];

const errorClosedTrades = [
  {
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
    // string profit value
    total_profit: 'string',
    type: 'trade_close'
  },
  {
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
    //no totalprofit value
    type: 'trade_close'
  },
  {
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
    // undefined profit value
    total_profit: undefined,
    type: 'trade_close'
  }
];

const mockAccounts = [
  {
    accounts: [
      {
        trade_acc_id: 'accountone',
        strategy_id: '0001',
        total_deposit: 1000,
        tracked_profit: 0,
        risk_multiplier: 0,
        type: 'REAL'
      },
      {
        trade_acc_id: 'accounttwo',
        strategy_id: '0001',
        total_deposit: 1000,
        tracked_profit: 0,
        risk_multiplier: 0,
        type: 'REAL'
      }
    ],
    telegram_id: 'user1',
    name: 'dev user 1',
    email: null,
    fee_rate: 0,
    fee_history: []
  },
  {
    accounts: [
      {
        trade_acc_id: 'accountthree',
        strategy_id: '0001',
        total_deposit: 1000,
        tracked_profit: 0,
        risk_multiplier: 0,
        type: 'REAL'
      }
    ],
    telegram_id: 'user2',
    name: 'dev user 2',
    email: null,
    fee_rate: 0,
    fee_history: []
  }
];

module.exports = {
  validClosedTrades,
  errorClosedTrades,
  mockAccounts
};
