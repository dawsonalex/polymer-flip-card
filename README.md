
# Flip Card Component
A card component based on the code-it notes by [Dan Harding](https://dev.to/danielharding).
flip-card elements can be used to create revision cards for a variety of subjects. Take a look at code-it notes for examples on how to format your card content
## Installation
Install the component from npm:

	npm install --save flip-card

## Usage
Import the module to your .html file:

	<script type="module" src="path/to/flip-card.js"></script>

or .js file:

	import('path/to/flip-card.js');


Then use it like you would any other HTML tag:

	<flip-card></flip-card>

The content on the card can be edited by adding children to the element and giving their slot attribute on of the following names:

| Slot Name     | Description                                |
|---------------|--------------------------------------------|
| banner-text   | The text to display in the cards banner.   |
| front-title   | The title for the front of the card.       |
| front_content | The content for the front of the card.     |
| back_title    | The title for the back of the card.        |
| back_content  | The main content for the back of the card. |

### Attributes

| Attrbiute Name | Type | Description |
| -------------- | ----- |----------- |
| facedown | boolean | Show the back side of the card. |
| accent | string | Set an accent colour for the card. Defaults to rgb(255, 212, 45) but any valid CSS colour can be used.

## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
## Credits
Based on code-hints by [Dan Harding](https://dev.to/danielharding,  
Implemented by Alex Dawson
## License
Licensed under [GPL-3.0](https://github.com/dawsonalex/flip-card/blob/master/LICENSE)