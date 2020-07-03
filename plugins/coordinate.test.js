const { processor, expectProcessorParse } = require('../testUtil.js');
const coordinate = require('./coordinate.js');

processor.use(coordinate);

test('does not tokenize "(no coordinates)"', () => expectProcessorParse('(no coordinates)').toMatchSnapshot());
test('tokenizes "(10, 20)" correctly', () => expectProcessorParse('(10, 20)').toMatchSnapshot());
test('tokenizes "(10, 20, 30)" correctly', () => expectProcessorParse('(10, 20, 30)').toMatchSnapshot());
