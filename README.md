[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@adaws/flip-card)
# Flip Card Component
A card component based on the code-it notes by [Dan Harding](https://dev.to/danielharding).
flip-card elements can be used to create card style components on the page, with a front and back. The user can click the bottom left corner of the card to see if flip over, revealing its other side.

## Installation
Install the component from npm:

	npm install --save flip-card

or if you aren't using npm, a bundled component is available at bundle/flip-card.js. However this includes the whole Lit-Element library rolled up (~22KB total).

## Usage
Import the module to your .html file:
```html
<script type="module" src="path/to/flip-card.js"></script>
```

or .js file:
```js
import('path/to/flip-card.js');
```

Then use it like you would any other HTML tag:
```html
<flip-card></flip-card>
```

The content on the card can be edited by adding children to the element and giving their slot attribute one of the following names:

| Slot Name     | Description                           |
|---------------|---------------------------------------|
| front-content | The content for the front of the card |
| back-content  | The content for the back of the card  |

Slotted content can be styled just using css, like any other element on the page.

### Attributes

| Attrbiute Name | Type | Description |
| -------------- | ----- |----------- |
| facedown | boolean | Show the back side of the card. |

## Styling
Cards can be styled by setting css variables. The variables that can be set are: 

| Variable         | Description|
|------------------|--------------|
| accent           | Set the colour of the card border and flip button background. Defaults to rgb(255, 212, 45) |
| flipButtonColour | Set the colour of the flip button icon. Defaults to #000000                                 |

The following css sets the accent colour for all flip-cards on the page to green: 
```css
flip-card {
  --accent: green;
}
```

## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
## Credits
Based on [Code-it Notes](https://www.instagram.com/same_dev_different_day/?hl=en) by [Dan Harding](https://dev.to/danielharding),  
Implemented by Alex Dawson
## License
Licensed under [The Unlicense](https://unlicense.org/)