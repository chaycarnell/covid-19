const trade_open = {
  '{"event":{"type":"trade_open","category":"trade","trade":{"order_id":"206366873","open_time":"2019-10-11 18:59:11","symbol":"USDCAD","type":"sell","lots":"0.10","open_price":"1.31822","stop_loss":null,"take_profit":null,"close_price":"1.31825","close_time":null,"commission":"-1.00","swap":null,"profit":"-0.18"},"account":{"number":"20684668","currency":"GBP","balance":"1000","equity":"998.82"}}}':
    ''
};

const trade_close = {
  '{"event":{"type":"trade_close","category":"trade","trade":{"order_id":"206366873","open_time":"2019-10-11 18:59:11","symbol":"USDCAD","type":"sell","lots":"0.10","open_price":"1.31822","stop_loss":null,"take_profit":null,"close_price":"1.31853","close_time":"2019-10-11 19:02:54","commission":"-1.00","swap":"-1.00","profit":"52"},"account":{"number":"20684668","currency":"GBP","balance":"1050","equity":"1050"}}}':
    ''
};

const equity_change = {
  '{"event":{"type":"equity_change","category":"account","account":{"number":"20684668","currency":"GBP","balance":"1500","equity":"1500","count":"1"}}}':
    ''
};

const balance_change = {
  '{"event":{"type":"balance_change","category":"account","account":{"number":"20684668","currency":"GBP","balance":"1000","equity":"1100","count":"1"}}}':
    ''
};

module.exports = {
  trade_open,
  trade_close,
  equity_change,
  balance_change
};
