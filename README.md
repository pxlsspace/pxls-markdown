# Pxls Markdown

Markdown implementation used on Pxls chat. Backed by [unified](https://www.npmjs.com/package/unified) and [remark-parse](https://www.npmjs.com/package/remark-parse)

## Usage
```sh
npm install
npm run build
```

Somewhere in your page:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/crel/4.2.1/crel.min.js"></script>
<script src="/pxlsMarkdown.min.js"></script>
```

In your code:
```js
// create processor
let processor = pxlsMarkdown.processor()
	.use(pxlsMarkdown.plugins.emoji, {
		emojiDB: window.emojiDB // See https://github.com/pxlsspace/Pxls/blob/master/resources/public/emojiDB.min.js
		emojiRegex: window.emojiRegex // For example, https://www.npmjs.com/package/emoji-regex
	})
	.use(pxlsMarkdown.plugins.mention, {
		mentionCallback: (username) => console.info(`found a mention for ${username}!`)
	})
	.use(pxlsMarkdown.plugins.methodWhitelist, {
		methodWhitelist: {
			block: [ 'blankLine' ],
			inline: [ 'coordinate', 'emoji_raw', 'emoji_name', 'mention', 'escape', 'autoLink', 'url', 'underline', 'strong', 'emphasis', 'deletion', 'code' ]
		}
	})
	.use(pxlsMarkdown.remarkToCrel, {
		customElements: {
			nodeType: (node, next) => crel('span', { 'class': `mdst-${node.type}` }, next())
		}
	});

// the processor is an unified Processor, you can use() any plugins you want.
// processor = processor.use(myNeatPlugin, neatPluginConfig);

// parse a markdown string
const src = '**my markdown**';
processor.process(src, function(file) {
	// populate an output element with results
	crel(outputElement, file.result);
});
```
