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
const options = {
	remark: {
		// remark-parse config
	},
	emoji: {
		emojiDB: window.emojiDB // See https://github.com/pxlsspace/Pxls/blob/master/resources/public/emojiDB.min.js
		emojiRegex: window.emojiRegex // For example, https://www.npmjs.com/package/emoji-regex
	},
	mention: {
		mentionCallback: (username) => console.info(`found a mention for ${username}!`)
	},
	methodWhitelist: {
		block: [ 'paragraph', 'blankLine' ],
		inline: [ 'coordinate', 'emoji_raw', 'emoji_name', 'mention', 'escape', 'autoLink', 'url', 'underline', 'strong', 'emphasis', 'deletion', 'code', 'text' ]
	},
	remarkToCrel: {
		customElements: {
			myCustomElement
		}
	}
};
let processor = pxlsMarkdown.createProcessor(options);

// the processor is an unified Processor, you can use() any plugins you want.
// processor = processor.use(myNeatPlugin, neatPluginConfig);

// parse a markdown string
const src = '**my markdown**';
const results = processor.process(src); // returns a list of dom elements

// populate an output element with results
crel(outputElement, results);
```
