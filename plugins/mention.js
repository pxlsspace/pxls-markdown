module.exports = function(opts) {
	this.Parser.prototype.inlineMethods.splice(0, 0, 'mention');

	tokenizeMention.notInLink = true;
	tokenizeMention.locator = function(value, fromIndex) {
		return value.indexOf('@', fromIndex);
	};
	this.Parser.prototype.inlineTokenizers.mention = tokenizeMention;

	function tokenizeMention(eat, value, silent) {
		const match = /^@([a-z0-9_-]+)/i.exec(value);
		if (match) {
			const [ all, username ] = match;

			if (opts && opts.mentionCallback) {
				opts.mentionCallback(username);
			}

			if (silent) {
				return true;
			}

			return eat(all)({
				type: 'mention',
				value: all,
				username: username
			});
		}

		return false;
	};
}
