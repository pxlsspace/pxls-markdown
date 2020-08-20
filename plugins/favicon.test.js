const { processor, expectProcessorParse } = require('../testUtil.js');
const favicon = require('./favicon.js');

processor.use(favicon);

test(
	'tokenizes "[fa]" as a favicon',
	() => expectProcessorParse('[fa]').toMatchSnapshot()
);
test(
	'tokenizes "[fab.fa-discord]" correctly',
	() => expectProcessorParse('[fab.fa-discord]').toMatchSnapshot()
);
