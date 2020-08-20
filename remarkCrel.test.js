const { processor, expectProcessorOutput } = require('./testUtil');
const remarkCrel = require('./remarkCrel');

processor.use(remarkCrel);

test('compiles "test" correctly', () => expectProcessorOutput('test').toMatchSnapshot());
test('compiles "test" with ignoreParagraphs = true correctly', () => {
	const configuredProcessor = processor().use(remarkCrel, { ignoreParagraphs: true });
	expectProcessorOutput('test', configuredProcessor).toMatchSnapshot();
});
test('compiles "*test*" correctly', () => expectProcessorOutput('*test*').toMatchSnapshot());
test('compiles "__test__" with the underline plugin correctly', () => {
	const configuredProcessor = processor().use(require('./plugins/underline'));
	expectProcessorOutput('__test__', configuredProcessor).toMatchSnapshot();
});
test('compiles "[fa.fa-discord]" with the favicon plugin correctly', () => {
	const configuredProcessor = processor().use(require('./plugins/favicon'));
	expectProcessorOutput('[fa.fa-discord]', configuredProcessor).toMatchSnapshot();
});
