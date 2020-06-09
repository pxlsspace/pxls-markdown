module.exports = function(opts) {
	const emojisCode = Object.keys(opts.emojiDB);
	const emojisRaw = Object.values(opts.emojiDB);

	// emoji_name
	this.Parser.prototype.inlineMethods.splice(0, 0, 'emoji_name');

	tokenizeEmojiName.notInLink = true;
	tokenizeEmojiName.locator = function(value, fromIndex) {
		return value.indexOf(':', fromIndex);
	};
	this.Parser.prototype.inlineTokenizers.emoji_name = tokenizeEmojiName;

	function tokenizeEmojiName(eat, value, silent) {
		const match = /^:([a-z0-9_-]+):/i.exec(value);
		if (match) {
			const [ all, code ] = match;
			const emojiName = code.toLowerCase();
			if (emojiName in opts.emojiDB) {
				if (silent) {
					return true;
				}

				return eat(all)({
					type: 'emoji',
					value: opts.emojiDB[emojiName],
					emojiName
				});
			}
		}

		return false;
	};

	// emoji_raw
	this.Parser.prototype.inlineMethods.splice(0, 0, 'emoji_raw');

	tokenizeEmojiRaw.notInLink = true;
	tokenizeEmojiRaw.locator = function(value, fromIndex) {
		const match = value.substr(fromIndex).match(opts.emojiRegex)
		return match ? fromIndex + match.index : -1; /* not implemented :( */
	};
	this.Parser.prototype.inlineTokenizers.emoji_raw = tokenizeEmojiRaw;

	function tokenizeEmojiRaw(eat, value, silent) {
		const match = value.match(opts.emojiRegex)
		if (match && match.index === 0) {
			const [ raw ] = match;

			let emojiIdx = null;
			for (let i = 0; i < emojisRaw.length; i++) {
				if (raw.startsWith(emojisRaw[i])) {
					emojiIdx = i;
					break;
				}
			}

			return eat(raw)({
				type: 'emoji',
				value: raw,
				emojiName: emojisCode[emojiIdx]
			});
		}

		return false;
	};
}
