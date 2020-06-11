const { processor, expectProcessorParse } = require('../testUtil.js');
const mention = require('./mention.js');

processor.use(mention);

test('tokenizes "@mention" correctly', () => expectProcessorParse('@mention').toMatchSnapshot());

test('tokenizes "@Mock_Username-09" and calls mentionCallback with argument "Mock_Username-09"', () => {
	const mentionCallback = jest.fn();
	const processorWithCallback = processor().use(mention, { mentionCallback });
	processorWithCallback.parse('@Mock_Username-09');
	expect(mentionCallback).toHaveBeenNthCalledWith(1, 'Mock_Username-09');
});
