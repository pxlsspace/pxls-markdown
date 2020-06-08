module.exports = function() {
	const parserProto = this.Parser.prototype;

	const insertAtIndex = Math.max(0, this.Parser.prototype.inlineMethods.indexOf('strong'));
	parserProto.inlineMethods.splice(insertAtIndex, 0, 'underline');

	tokenizer.notInLink = true;
	tokenizer.locator = function(value, fromIndex) {
		let index = value.indexOf('__', fromIndex);

		if (index === -1 || value.charAt(index - 1) === '_') {
			return -1;
		}

		return index;
	}

	parserProto.inlineTokenizers.underline = tokenizer;

	function tokenizer(eat, value, silent) {
		if (!value.startsWith('__')) {
			return false;
		}

		for (let i = 2; i < value.length; i++) {
			if (value.substr(i, 2) === '__' && value.charAt(i + 2) !== '_') {
				if (silent) {
					return true;
				}

				const now = eat.now();
				now.column++;
				now.offset++;

				const queue = value.substr(0, i + 2);
				const content = value.substring(2, i);
				if (queue.length === 4 || content.trim().length === 0) {
					return;
				}

				return eat(queue)({
					type: 'underline',
					children: this.tokenizeInline(content, now)
				});
			}
		}
	}
}
