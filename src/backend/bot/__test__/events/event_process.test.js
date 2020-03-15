const { processBody } = require('../../bot.helpers');
const {
  trade_open,
  trade_close,
  equity_change,
  balance_change
} = require('./event_mocks.js');

test('Format a open trade event', () => {
  expect(processBody({ body: trade_open })).toMatchSnapshot();
});

test('Format a close trade event', () => {
  expect(processBody({ body: trade_close })).toMatchSnapshot();
});

test('Format a equity change event', () => {
  expect(processBody({ body: equity_change })).toMatchSnapshot();
});

test('Format a balance change event', () => {
  expect(processBody({ body: balance_change })).toMatchSnapshot();
});
