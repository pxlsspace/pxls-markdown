module.exports = function() {
	this.Parser.prototype.inlineMethods.splice(0, 0, 'coordinate');

	tokenizeCoordinate.notInLink = true;
	tokenizeCoordinate.locator = function(value, fromIndex) {
		return value.indexOf('(', fromIndex);
	};
	this.Parser.prototype.inlineTokenizers.coordinate = tokenizeCoordinate;

	function tokenizeCoordinate(eat, value, silent) {
		const match = /^\(([0-9]+)[., ]{1,2}([0-9]+)[., ]{0,2}([0-9]+)?x?\)/i.exec(value);
		if (match) {
			const [ x, y, scale ] = match.slice(1).map((i) => parseInt(i));

			if (isNaN(x) || isNaN(y)) {
				return false;
			}

			if (silent) {
				return true;
			}

			// enter and exit link to avoid parsing coordinates and entering an infinite loop
			const exitLink = this.enterLink();
			const children = this.tokenizeInline(match[0], eat.now());
			exitLink();

			return eat(match[0])({
				type: 'coordinate',
				children,
				x,
				y,
				scale: isNaN(scale) ? null : scale,
				url: `#x=${x}&y=${y}${isNaN(scale) ? '' : `&scale=${scale}`}`,
			});
		}

		return false;
	};
}
