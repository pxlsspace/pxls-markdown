module.exports = function() {
	this.Parser.prototype.inlineMethods.splice(0, 0, 'fontAwesomeIcon');

	tokenizeFontAwesomeIcon.notInLink = true;
	tokenizeFontAwesomeIcon.locator = function(value, fromIndex) {
		return value.indexOf('[fa', fromIndex);
	};
	this.Parser.prototype.inlineTokenizers.fontAwesomeIcon = tokenizeFontAwesomeIcon;

	function tokenizeFontAwesomeIcon(eat, value, silent) {
		const endIdx = value.indexOf(']');
		if (!value.startsWith('[fa') || endIdx === -1) {
			return false;
		}

		if (silent) {
			return true;
		}

		const classes = value.substring(1, endIdx).split('.');
		return eat(value.substr(0, endIdx + 1))({
			type: 'fontAwesomeIcon',
			classes
		});
	}
};
