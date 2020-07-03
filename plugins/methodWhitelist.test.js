const { processor, expectProcessorParse } = require('../testUtil.js');
const methodWhitelist = require('./methodWhitelist');

processor().use(methodWhitelist);

test('does not do anything when no options are passed', () => expectProcessorParse('# All _off_ **these** `should`\n1. still!\n2. work!').toMatchSnapshot());

test('does not tokenize "*not italic*"', () => {
	const configuredProcessor = processor().use(methodWhitelist, { inline: [] });
	expectProcessorParse('*not italic*', false, configuredProcessor);
});

test('does not tokenize "1. raw\\n2. list"', () => {
	const configuredProcessor = processor().use(methodWhitelist, { block: [] });
	expectProcessorParse('1. raw\n2. list', false, configuredProcessor);
});

