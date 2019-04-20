<snippet>
  <content><![CDATA[
# ${1:Code Hint Cards}
A card component based on the code-it notes by Dan Harding &lt;https://dev.to/danielharding&gt;
## Installation
To install, copy the code from code-hinst-card.js, npm install --save lit-element and use it in your project!

## Usage
Import the module to your .js or .html file.

Then use it as a normal tag:

<code-hint-card></code-hint-card>

The content on the card can be edited by adding children to the element and giving their slot attribute on of the following names:

banner-text : The text to display in the cards banner.
front-title : The title for the front of the card.
front_content : The content for the front of the card.
back_title : The title for the back of the card.
back_content : The main content for the back of the card.


For example: 

<code-hints-card>
    <span slot="banner-text"><i class="fab fa-js-square"></i> JavaScript</span>
    <h1 slot="front_title"><i class="fas fa-filter"></i></i>array.filter()</h1>
    <ol slot="front_content">
        <li>Takes an array</li>
        <li>A callback function filters the array</li>
        <li>Filter is applied to each array item</li>
        <li>If the value matches the filter (truthy), it's added to a new array</li>
        <li>If it doesn't match (falsy), ignore it</li>
        <li>Returns a new array</li>
    </ol>
    <span slot="banner-text_back"><i class="fab fa-js-square"></i> JavaScript</span>
    <h1 slot="back_title"><i class="fas fa-filter"></i></i>array.filter()</h1>
    <ul slot="back_content">
        <li><code>var fruits = ['pear', 'banana', 'plum'];</code></li>
        <li class="comment">Fruits contains an array with 3 strings</li>
        <li><code>const result = fruits.filter(fruit => fruit.length < 5); </code></li>
        <li class="comment">Fruit represents each array item</li>
        <li><code>console.log(result);</code></li>
        <li class="comment">Values less than 5 characters are added to a new array and stored in result</li>
        <li><code>// output: Array ['pear', 'plum']</code></li>
    </ul>
</code-hints-card>

## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
## History
TODO: Write history
## Credits
Design by Dan Harding, Implemented by Alex Dawson
## License
TODO: Write license
]]></content>
  <tabTrigger>readme</tabTrigger>
</snippet>