const { processor, expectProcessorParse } = require('../testUtil.js');
const underline = require('./underline.js');

processor.use(underline);

test(
	'tokenizes "__underline text__" correctly',
	() => expectProcessorParse('__underline text__').toMatchSnapshot()
);
test(
	'tokenizes "___underline and italic text___" correctly',
	() => expectProcessorParse('___underline and italic text___').toMatchSnapshot()
);
test(
	'tokenizes "____" correctly',
	// The "some text" padding is needed to avoid parsing thematic break
	() => expectProcessorParse('some text ____').toMatchSnapshot()
);
test(
	'tokenizes "__ __" correctly',
	// The "some text" padding is needed to avoid parsing thematic break
	() => expectProcessorParse('some test __ __').toMatchSnapshot()
);
test(
	'tokenizes "__\\n__" correctly',
	() => expectProcessorParse('__\n__').toMatchSnapshot()
);
