const unified = require('unified');
const remarkParse = require('remark-parse');

const remarkCrel = require('./remarkCrel.js');

const plugins = {
	methodWhitelist: require('./plugins/methodWhitelist.js'),
	underline: require('./plugins/underline.js'),
	mention: require('./plugins/mention.js'),
	emoji: require('./plugins/emoji.js'),
	coordinate: require('./plugins/coordinate'),
	favicon: require('./plugins/favicon')
};

const processor = unified()
	// Parser
	.use(remarkParse, { gfm: true, commonmark: true })
	//   Parser plugins
	.use(plugins.underline)
	.use(plugins.mention)
	.use(plugins.emoji)
	.use(plugins.coordinate)
	.use(plugins.favicon)
	.use(plugins.methodWhitelist)
	// Compiler
	.use(remarkCrel, { ignoreParagraphs: true });

module.exports = {
	processor,
	plugins,
	remarkCrel
};
