const { processor, expectProcessorParse } = require('../testUtil.js');
const fontAwesome = require('./fontAwesomeIcon.js');

processor.use(fontAwesome);

test(
	'tokenizes "[fa]" as a FontAwesome icon',
	() => expectProcessorParse('[fa]').toMatchSnapshot()
);
test(
	'tokenizes "[fab.fa-discord]" correctly',
	() => expectProcessorParse('[fab.fa-discord]').toMatchSnapshot()
);
