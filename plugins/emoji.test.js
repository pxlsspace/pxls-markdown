const { processor, expectProcessorParse } = require('../testUtil.js');
const emoji = require('./emoji.js');

const emojiDB = { dog: '🐶' };
const emojiRegex = /🐶/i;

test('crashes when the processor isn\'t configured correctly', () => {
	// Freeze processors so that plugins run.
	expect(() => processor().use(emoji).freeze()).toThrow();
	expect(() => processor().use(emoji, { emojiDB }).freeze()).toThrow();
	expect(() => processor().use(emoji, { emojiRegex }).freeze()).toThrow();
})

const configuredProcessor = processor().use(emoji, {
	emojiDB,
	emojiRegex
});

test('tokenizes ":dog:"', () => expectProcessorParse(':dog:', false, configuredProcessor).toMatchSnapshot());
test('tokenizes "🐶"', () => expectProcessorParse('🐶', false, configuredProcessor).toMatchSnapshot());

