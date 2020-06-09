/* global crel */


// Taken from twemoji.convert.toCodePoint()
function toTwemojiCodepoints(src) {
  if (src.indexOf('\u200D') === -1) {
    src = src.replace('\uFE0F', '');
  }

  const result = [];
  let prevChar = 0;
  for (let i = 0; i < src.length; i++) {
    const char = src.charCodeAt(i);
    if (prevChar) {
      result.push((0x10000 + (prevChar - 0xd800 << 10) + (char - 0xdc00)).toString(16));
      prevChar = null;
    } else if (0xd800 <= char && char <= 0xdbff) {
      prevChar = char;
    } else {
      result.push(char.toString(16));
    }
  }
  return result.join('-');
}

const DEFAULT_RENDERERS = {
	_default: (node, next) => crel('span', { 'data-mdst-type': node.type }, next()),
  break: (node, next) => crel('br'),
  link: (node, next) => crel('a', { href: node.url, target: '_blank' }, next()),
  emphasis: (node, next) => crel('i', next()),
  strong: (node, next) => crel('b', next()),
  underline: (node, next) => crel('u', next()),
  delete: (node, next) => crel('s', next()),
  inlineCode: (node, next) => crel('code', next()),
  mention: (node, next) => crel('span', { class: 'mention' }, next()),
  coordinate: (node, next) => crel('a', { href: node.url }, next()),
  emoji: (node, next) => crel('img', {
    class: 'emoji',
    title: node.emojiName,
    src: `https://twemoji.maxcdn.com/v/13.0.0/72x72/${toTwemojiCodepoints(node.value)}.png`
  })
};

function toDOM(parentNode, renderers) {
  const result = [];

  if (parentNode.type === 'root') {
    for (let paragraphIdx = 0; paragraphIdx < parentNode.children.length; paragraphIdx++) {
      const paragraphNode = parentNode.children[paragraphIdx];

      if (!paragraphNode.children || paragraphNode.children.length === 0) {
        continue;
      }

      if (paragraphIdx > 0) {
        // NOTE(netux): this is needed to render more than one new line, as two new lines or more are the delimited for
        // paragraphs, and we can't turn paragraphs off.
        const lineDifference = paragraphNode.position.start.line - parentNode.children[paragraphIdx - 1].position.end.line;
        for (let j = 0; j < lineDifference; j++) {
          result.push('\n')
        }
      }

      result.push(... toDOM(paragraphNode, renderers));
    }
  } else {
    for (const node of parentNode.children) {
      if (node.type !== 'text') {
        const next = node.children ? (() => toDOM(node, renderers)) : (() => node.value);
        const nodeRenderer = renderers[node.type] || renderers._default || DEFAULT_RENDERERS._default;
        const el = nodeRenderer(node, next);
        result.push(el);
      } else {
        result.push(node.value);
      }
    }
  }

  return result;
}


module.exports = function(opts) {
	this.Compiler = Compiler;

	function Compiler(node) {
		return toDOM(node, Object.assign({}, DEFAULT_RENDERERS, opts ? opts.customRenderers : null));
	}
};
module.exports.DEFAULT_RENDERERS = DEFAULT_RENDERERS;
