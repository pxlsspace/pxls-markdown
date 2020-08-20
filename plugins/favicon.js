module.exports = function() {
	this.Parser.prototype.inlineMethods.splice(0, 0, 'favicon');

	tokenizeFavicon.notInLink = true;
	tokenizeFavicon.locator = function(value, fromIndex) {
		return value.indexOf('[fa', fromIndex);
	};
	this.Parser.prototype.inlineTokenizers.favicon = tokenizeFavicon;

	function tokenizeFavicon(eat, value, silent) {
		const endIdx = value.indexOf(']');
		if (!value.startsWith('[fa') || endIdx === -1) {
			return false;
		}

		if (silent) {
			return true;
		}

		const classes = value.substring(1, endIdx).split('.');
		return eat(value.substr(0, endIdx + 1))({
			type: 'favicon',
			classes
		});
	}
};
