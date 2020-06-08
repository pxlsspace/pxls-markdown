const unified = require('unified');
const remarkParse = require('remark-parse');

const remarkToCrel = require('./remarkToCrel.js');

const plugins = {
	methodWhitelist: require('./plugins/methodWhitelist.js'),
	underline: require('./plugins/underline.js'),
	mention: require('./plugins/mention.js'),
	emoji: require('./plugins/emoji.js')
};

function makeProcessor(opts) {
	return unified()
		// Parser
		.use(remarkParse, Object.assign({ gfm: true, commonmark: true }, opts.remark))
		//   Parser plugins
		.use(plugins.underline)
		.use(plugins.mention, { mentionCallback: opts.mentionCallback })
		.use(plugins.emoji, { emojiDB: opts.emojiDB, emojiRegex: opts.emojiRegex })
		.use(plugins.methodWhitelist, opts.whitelist)
		// Compiler
		.use(remarkToCrel, opts.remarkToCrelOpts)
}

module.exports = {
	makeProcessor,
	plugins
};
