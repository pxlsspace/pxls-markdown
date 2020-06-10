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

const processor = unified()
	// Parser
	.use(remarkParse, { gfm: true, commonmark: true })
	//   Parser plugins
	.use(plugins.underline)
	.use(plugins.mention)
	.use(plugins.emoji)
	.use(plugins.coordinate)
	.use(plugins.methodWhitelist)
	// Compiler
	.use(remarkToCrel)

module.exports = {
	processor,
	plugins,
	remarkToCrel
};
