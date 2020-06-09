const unified = require('unified');
const remarkParse = require('remark-parse');

const remarkToCrel = require('./remarkToCrel.js');

const plugins = {
	methodWhitelist: require('./plugins/methodWhitelist.js'),
	underline: require('./plugins/underline.js'),
	mention: require('./plugins/mention.js'),
	emoji: require('./plugins/emoji.js'),
	coordinate: require('./plugins/coordinate')
};

function makeProcessor(opts) {
	return unified()
		// Parser
		.use(remarkParse, Object.assign({ gfm: true, commonmark: true }, opts.remark))
		//   Parser plugins
		.use(plugins.underline, opts.underline)
		.use(plugins.mention, opts.mention)
		.use(plugins.emoji, opts.emoji)
		.use(plugins.coordinate, opts.coordinate)
		.use(plugins.methodWhitelist, opts.methodWhitelist)
		// Compiler
		.use(remarkToCrel, opts.remarkToCrel)
}

module.exports = {
	makeProcessor,
	plugins
};
