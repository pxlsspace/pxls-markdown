const { setProcessor, expectProcessorOutput } = require('./testUtil.js');

const { processor, plugins } = require('./index.js');

setProcessor(
	processor()
		.use(plugins.emoji, {
			emojiDB: { dog: '🐶', grinning: '😁' },
			emojiRegex: /🐶|😁/i
		})
		.use(plugins.methodWhitelist, {
			block: [ 'blankLine' ],
			inline: [ 'coordinate', 'emoji_raw', 'emoji_name', 'mention', 'escape', 'autoLink', 'url', 'underline', 'strong', 'emphasis', 'deletion', 'code' ]
		})
);

test('renders everything correctly', () => {
	expectProcessorOutput(`
	*italic* _italic_
	**bold**
	__underline__
	~~strikethrough~~
	\`inline code\`
	https://a.link
	@mention
	:dog: 😁
	(1234, 567, 50x)
	\\*escaping* \\_any_ \\**markup** \\__like__ \\~~this~~ (\\\`with\` \\:a: \\@backslash)
	`).toMatchSnapshot();
})
