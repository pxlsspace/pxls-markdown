module.exports = function(opts) {
	const parserProto = this.Parser.prototype;

	if (!opts) {
		return;
	}

	if (opts.block != null) {
		for (let idx = parserProto.blockMethods.length - 1; idx >= 0; idx--) {
			if (!opts.aggresive && parserProto.blockMethods[idx] === 'paragraph') {
				continue;
			}

			if (!opts.block.includes(parserProto.blockMethods[idx])) {
				parserProto.blockMethods.splice(idx, 1);
			}
		}
	}

	if (opts.inline != null) {
		for (let idx = parserProto.inlineMethods.length - 1; idx >= 0; idx--) {
			if (!opts.aggresive && parserProto.inlineMethods[idx] === 'text') {
				continue;
			}

			if (!opts.inline.includes(parserProto.inlineMethods[idx])) {
				parserProto.inlineMethods.splice(idx, 1);
			}
		}
	}
};
