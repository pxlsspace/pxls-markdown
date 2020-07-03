const unified = require('unified');
const remarkParse = require('remark-parse');

let testProcessor = unified().use(remarkParse);
module.exports.processor = testProcessor;

module.exports.setProcessor = (processor) => {
	testProcessor = processor;
	module.exports.processor = processor;
}

function removePositionsFromNodes(tree) {
	return tree.map((node) => {
		delete node.position;
		if (node.children) {
			node.children = removePositionsFromNodes(node.children);
		}
		return node;
	})
}

function expectProcessorParse(source, includePositions = false, processor = null) {
	if (processor === null) {
		processor = testProcessor;
	}

	let tree = processor.parse(source).children;
	if (!includePositions) {
		tree = removePositionsFromNodes(tree);
	}

	return expect(tree);
}
module.exports.expectProcessorParse = expectProcessorParse;

function expectProcessorOutput(source, processor = null) {
	if (processor === null) {
		processor = testProcessor;
	}

	return expect(processor.processSync(source).result);
}
module.exports.expectProcessorOutput = expectProcessorOutput;
