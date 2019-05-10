/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const t=new WeakMap,e=e=>"function"==typeof e&&t.has(e),s=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,i=(t,e,s=null)=>{let i=e;for(;i!==s;){const e=i.nextSibling;t.removeChild(i),i=e}},n={},r={},o=`{{lit-${String(Math.random()).slice(2)}}}`
/**
 * An expression marker used text-positions, multi-binding attributes, and
 * attributes with markup-like text values.
 */,a=`\x3c!--${o}--\x3e`,l=new RegExp(`${o}|${a}`),d="$lit$";
/**
 * An updateable Template that tracks the location of dynamic parts.
 */
class h{constructor(t,e){this.parts=[],this.element=e;let s=-1,i=0;const n=[],r=e=>{const a=e.content,h=document.createTreeWalker(a,133
/* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */,null,!1);// Edge needs all 4 parameters present; IE11 needs 3rd parameter to be
// null
// Keeps track of the last index associated with a part. We try to delete
// unnecessary nodes, but we never want to associate two different parts
// to the same index. They must have a constant node between.
let c=0;for(;h.nextNode();){s++;const e=h.currentNode;if(1
/* Node.ELEMENT_NODE */===e.nodeType){if(e.hasAttributes()){const n=e.attributes;// Per
// https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
// attributes are not guaranteed to be returned in document order.
// In particular, Edge/IE can return them out of order, so we cannot
// assume a correspondance between part index and attribute index.
let r=0;for(let t=0;t<n.length;t++)n[t].value.indexOf(o)>=0&&r++;for(;r-- >0;){
// Get the template literal section leading up to the first
// expression in this attribute
const n=t.strings[i],r=u.exec(n)[2],o=r.toLowerCase()+d,a=e.getAttribute(o).split(l);// Find the attribute name
this.parts.push({type:"attribute",index:s,name:r,strings:a}),e.removeAttribute(o),i+=a.length-1}}"TEMPLATE"===e.tagName&&r(e)}else if(3
/* Node.TEXT_NODE */===e.nodeType){const t=e.data;if(t.indexOf(o)>=0){const r=e.parentNode,o=t.split(l),a=o.length-1;// Generate a new text node for each literal section
// These nodes are also used as the markers for node parts
for(let t=0;t<a;t++)r.insertBefore(""===o[t]?p():document.createTextNode(o[t]),e),this.parts.push({type:"node",index:++s});// If there's no text, we must insert a comment to mark our place.
// Else, we can trust it will stick around after cloning.
""===o[a]?(r.insertBefore(p(),e),n.push(e)):e.data=o[a],// We have a part for each match found
i+=a}}else if(8
/* Node.COMMENT_NODE */===e.nodeType)if(e.data===o){const t=e.parentNode;// Add a new marker node to be the startNode of the Part if any of
// the following are true:
//  * We don't have a previousSibling
//  * The previousSibling is already the start of a previous part
null!==e.previousSibling&&s!==c||(s++,t.insertBefore(p(),e)),c=s,this.parts.push({type:"node",index:s}),// If we don't have a nextSibling, keep this node so we have an end.
// Else, we can remove it to save future costs.
null===e.nextSibling?e.data="":(n.push(e),s--),i++}else{let t=-1;for(;-1!==(t=e.data.indexOf(o,t+1));)
// Comment node has a binding marker inside, make an inactive part
// The binding won't work, but subsequent bindings will
// TODO (justinfagnani): consider whether it's even worth it to
// make bindings in comments work
this.parts.push({type:"node",index:-1})}}};r(e);// Remove text binding nodes after the walk to not disturb the TreeWalker
for(const t of n)t.parentNode.removeChild(t)}}const c=t=>-1!==t.index,p=()=>document.createComment(""),u=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;// Allows `document.createComment('')` to be renamed for a
// small manual size-savings.
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * An instance of a `Template` that can be attached to the DOM and updated
 * with new values.
 */
class m{constructor(t,e,s){this._parts=[],this.template=t,this.processor=e,this.options=s}update(t){let e=0;for(const s of this._parts)void 0!==s&&s.setValue(t[e]),e++;for(const t of this._parts)void 0!==t&&t.commit()}_clone(){
// When using the Custom Elements polyfill, clone the node, rather than
// importing it, to keep the fragment in the template's document. This
// leaves the fragment inert so custom elements won't upgrade and
// potentially modify their contents by creating a polyfilled ShadowRoot
// while we traverse the tree.
const t=s?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=this.template.parts;let i=0,n=0;const r=t=>{
// Edge needs all 4 parameters present; IE11 needs 3rd parameter to be
// null
const s=document.createTreeWalker(t,133
/* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */,null,!1);let o=s.nextNode();// Loop through all the nodes and parts of a template
for(;i<e.length&&null!==o;){const t=e[i];// Consecutive Parts may have the same node index, in the case of
// multiple bound attributes on an element. So each iteration we either
// increment the nodeIndex, if we aren't on a node with a part, or the
// partIndex if we are. By not incrementing the nodeIndex when we find a
// part, we allow for the next part to be associated with the current
// node if neccessasry.
if(c(t))if(n===t.index){if("node"===t.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(o.previousSibling),this._parts.push(t)}else this._parts.push(...this.processor.handleAttributeExpressions(o,t.name,t.strings,this.options));i++}else n++,"TEMPLATE"===o.nodeName&&r(o.content),o=s.nextNode();else this._parts.push(void 0),i++}};return r(t),s&&(document.adoptNode(t),customElements.upgrade(t)),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */class f{constructor(t,e,s,i){this.strings=t,this.values=e,this.type=s,this.processor=i}
/**
   * Returns a string of HTML used to create a `<template>` element.
   */getHTML(){const t=this.strings.length-1;let e="";for(let s=0;s<t;s++){const t=this.strings[s],i=u.exec(t);// This exec() call does two things:
// 1) Appends a suffix to the bound attribute name to opt out of special
// attribute value parsing that IE11 and Edge do, like for style and
// many SVG attributes. The Template class also appends the same suffix
// when looking up attributes to create Parts.
// 2) Adds an unquoted-attribute-safe marker for the first expression in
// an attribute. Subsequent attribute expressions will use node markers,
// and this is safe since attributes with multiple expressions are
// guaranteed to be quoted.
// We're starting a new bound attribute.
// Add the safe attribute suffix, and use unquoted-attribute-safe
// marker.
e+=i?t.substr(0,i.index)+i[1]+i[2]+d+i[3]+o:t+a}return e+this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const g=t=>null===t||!("object"==typeof t||"function"==typeof t);
/**
 * Sets attribute values for AttributeParts, so that the value is only set once
 * even if there are multiple parts for an attribute.
 */class y{constructor(t,e,s){this.dirty=!0,this.element=t,this.name=e,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}
/**
   * Creates a single part. Override this to create a differnt type of part.
   */_createPart(){return new _(this)}_getValue(){const t=this.strings,e=t.length-1;let s="";for(let i=0;i<e;i++){s+=t[i];const e=this.parts[i];if(void 0!==e){const t=e.value;if(null!=t&&(Array.isArray(t)||// tslint:disable-next-line:no-any
"string"!=typeof t&&t[Symbol.iterator]))for(const e of t)s+="string"==typeof e?e:String(e);else s+="string"==typeof t?t:String(t)}}return s+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class _{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===n||g(t)&&t===this.value||(this.value=t,// If the value is a not a directive, dirty the committer so that it'll
// call setAttribute. If the value is a directive, it'll dirty the
// committer if it calls setValue().
e(t)||(this.committer.dirty=!0))}commit(){for(;e(this.value);){const t=this.value;this.value=n,t(this)}this.value!==n&&this.committer.commit()}}class v{constructor(t){this.value=void 0,this._pendingValue=void 0,this.options=t}
/**
   * Inserts this part into a container.
   *
   * This part must be empty, as its contents are not automatically moved.
   */appendInto(t){this.startNode=t.appendChild(p()),this.endNode=t.appendChild(p())}
/**
   * Inserts this part between `ref` and `ref`'s next sibling. Both `ref` and
   * its next sibling must be static, unchanging nodes such as those that appear
   * in a literal section of a template.
   *
   * This part must be empty, as its contents are not automatically moved.
   */insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}
/**
   * Appends this part into a parent part.
   *
   * This part must be empty, as its contents are not automatically moved.
   */appendIntoPart(t){t._insert(this.startNode=p()),t._insert(this.endNode=p())}
/**
   * Appends this part after `ref`
   *
   * This part must be empty, as its contents are not automatically moved.
   */insertAfterPart(t){t._insert(this.startNode=p()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this._pendingValue=t}commit(){for(;e(this._pendingValue);){const t=this._pendingValue;this._pendingValue=n,t(this)}const t=this._pendingValue;t!==n&&(g(t)?t!==this.value&&this._commitText(t):t instanceof f?this._commitTemplateResult(t):t instanceof Node?this._commitNode(t):Array.isArray(t)||// tslint:disable-next-line:no-any
t[Symbol.iterator]?this._commitIterable(t):t===r?(this.value=r,this.clear()):
// Fallback, will render the string representation
this._commitText(t))}_insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}_commitNode(t){this.value!==t&&(this.clear(),this._insert(t),this.value=t)}_commitText(t){const e=this.startNode.nextSibling;t=null==t?"":t,e===this.endNode.previousSibling&&3
/* Node.TEXT_NODE */===e.nodeType?
// If we only have a single text node between the markers, we can just
// set its value, rather than replacing it.
// TODO(justinfagnani): Can we just check if this.value is primitive?
e.data=t:this._commitNode(document.createTextNode("string"==typeof t?t:String(t))),this.value=t}_commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof m&&this.value.template===e)this.value.update(t.values);else{
// Make sure we propagate the template processor from the TemplateResult
// so that we use its syntax extension, etc. The template factory comes
// from the render function options so that it can control template
// caching and preprocessing.
const s=new m(e,t.processor,this.options),i=s._clone();s.update(t.values),this._commitNode(i),this.value=s}}_commitIterable(t){
// For an Iterable, we create a new InstancePart per item, then set its
// value to the item. This is a little bit of overhead for every item in
// an Iterable, but it lets us recurse easily and efficiently update Arrays
// of TemplateResults that will be commonly returned from expressions like:
// array.map((i) => html`${i}`), by reusing existing TemplateInstances.
// If _value is an array, then the previous render was of an
// iterable and _value will contain the NodeParts from the previous
// render. If _value is not an array, clear this part and make a new
// array for NodeParts.
Array.isArray(this.value)||(this.value=[],this.clear());// Lets us keep track of how many items we stamped so we can clear leftover
// items from a previous render
const e=this.value;let s,i=0;for(const n of t)
// Try to reuse an existing part
// If no existing part, create a new one
void 0===(s=e[i])&&(s=new v(this.options),e.push(s),0===i?s.appendIntoPart(this):s.insertAfterPart(e[i-1])),s.setValue(n),s.commit(),i++;i<e.length&&(
// Truncate the parts array so _value reflects the current state
e.length=i,this.clear(s&&s.endNode))}clear(t=this.startNode){i(this.startNode.parentNode,t.nextSibling,this.endNode)}}
/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */class b{constructor(t,e,s){if(this.value=void 0,this._pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=s}setValue(t){this._pendingValue=t}commit(){for(;e(this._pendingValue);){const t=this._pendingValue;this._pendingValue=n,t(this)}if(this._pendingValue===n)return;const t=!!this._pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)),this.value=t,this._pendingValue=n}}
/**
 * Sets attribute values for PropertyParts, so that the value is only set once
 * even if there are multiple parts for a property.
 *
 * If an expression controls the whole property value, then the value is simply
 * assigned to the property under control. If there are string literals or
 * multiple expressions, then the strings are expressions are interpolated into
 * a string first.
 */class w extends y{constructor(t,e,s){super(t,e,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new S(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,// tslint:disable-next-line:no-any
this.element[this.name]=this._getValue())}}class S extends _{}// Detect event listener options support. If the `capture` property is read
// from the options object, then options are supported. If not, then the thrid
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.
let x=!1;try{const t={get capture(){return x=!0,!1}};// tslint:disable-next-line:no-any
window.addEventListener("test",t,t),// tslint:disable-next-line:no-any
window.removeEventListener("test",t,t)}catch(t){}class P{constructor(t,e,s){this.value=void 0,this._pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=s,this._boundHandleEvent=(t=>this.handleEvent(t))}setValue(t){this._pendingValue=t}commit(){for(;e(this._pendingValue);){const t=this._pendingValue;this._pendingValue=n,t(this)}if(this._pendingValue===n)return;const t=this._pendingValue,s=this.value,i=null==t||null!=s&&(t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive),r=null!=t&&(null==s||i);i&&this.element.removeEventListener(this.eventName,this._boundHandleEvent,this._options),r&&(this._options=C(t),this.element.addEventListener(this.eventName,this._boundHandleEvent,this._options)),this.value=t,this._pendingValue=n}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}// We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.
const C=t=>t&&(x?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Creates Parts when a template is instantiated.
 */const N=new class{
/**
   * Create parts for an attribute-position binding, given the event, attribute
   * name, and string literals.
   *
   * @param element The element containing the binding
   * @param name  The attribute name
   * @param strings The string literals. There are always at least two strings,
   *   event for fully-controlled bindings with a single expression.
   */
handleAttributeExpressions(t,e,s,i){const n=e[0];return"."===n?new w(t,e.slice(1),s).parts:"@"===n?[new P(t,e.slice(1),i.eventContext)]:"?"===n?[new b(t,e.slice(1),s)]:new y(t,e,s).parts}
/**
   * Create parts for a text-position binding.
   * @param templateFactory
   */handleTextExpression(t){return new v(t)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * The default TemplateFactory which caches Templates keyed on
 * result.type and result.strings.
 */function A(t){let e=E.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},E.set(t.type,e));let s=e.stringsArray.get(t.strings);if(void 0!==s)return s;// If the TemplateStringsArray is new, generate a key from the strings
// This key is shared between all templates with identical content
const i=t.strings.join(o);// Check if we already have a Template for this key
return void 0===(s=e.keyString.get(i))&&(
// If we have not seen this key before, create a new Template
s=new h(t,t.getTemplateElement()),// Cache the Template for this key
e.keyString.set(i,s)),// Cache all future queries for this TemplateStringsArray
e.stringsArray.set(t.strings,s),s}const E=new Map,k=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time
(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.0.0");
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */
const T=(t,...e)=>new f(t,e,"html",N),V=133
/* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Removes the list of nodes from a Template safely. In addition to removing
 * nodes from the Template, the Template part indices are updated to match
 * the mutated Template DOM.
 *
 * As the template is walked the removal state is tracked and
 * part indices are adjusted as needed.
 *
 * div
 *   div#1 (remove) <-- start removing (removing node is div#1)
 *     div
 *       div#2 (remove)  <-- continue removing (removing node is still div#1)
 *         div
 * div <-- stop removing since previous sibling is the removing node (div#1,
 * removed 4 nodes)
 */
function R(t,e){const{element:{content:s},parts:i}=t,n=document.createTreeWalker(s,V,null,!1);let r=M(i),o=i[r],a=-1,l=0;const d=[];let h=null;for(;n.nextNode();){a++;const t=n.currentNode;// End removal if stepped past the removing node
for(t.previousSibling===h&&(h=null),// A node to remove was found in the template
e.has(t)&&(d.push(t),// Track node we're removing
null===h&&(h=t)),// When removing, increment count by which to adjust subsequent part indices
null!==h&&l++;void 0!==o&&o.index===a;)
// If part is in a removed node deactivate it by setting index to -1 or
// adjust the index as needed.
o.index=null!==h?-1:o.index-l,o=i[// go to the next active part.
r=M(i,r)]}d.forEach(t=>t.parentNode.removeChild(t))}const O=t=>{let e=11
/* Node.DOCUMENT_FRAGMENT_NODE */===t.nodeType?0:1;const s=document.createTreeWalker(t,V,null,!1);for(;s.nextNode();)e++;return e},M=(t,e=-1)=>{for(let s=e+1;s<t.length;s++){const e=t[s];if(c(e))return s}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const U=(t,e)=>`${t}--${e}`;let z=!0;void 0===window.ShadyCSS?z=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected.Please update to at least @webcomponents/webcomponentsjs@2.0.2 and@webcomponents/shadycss@1.3.1."),z=!1)
/**
 * Template factory which scopes template DOM using ShadyCSS.
 * @param scopeName {string}
 */;const B=t=>e=>{const s=U(e.type,t);let i=E.get(s);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},E.set(s,i));let n=i.stringsArray.get(e.strings);if(void 0!==n)return n;const r=e.strings.join(o);if(void 0===(n=i.keyString.get(r))){const s=e.getTemplateElement();z&&window.ShadyCSS.prepareTemplateDom(s,t),n=new h(e,s),i.keyString.set(r,n)}return i.stringsArray.set(e.strings,n),n},j=["html","svg"],q=new Set,H=(t,e,s)=>{q.add(s);// Move styles out of rendered DOM and store.
const i=t.querySelectorAll("style");// If there are no styles, skip unnecessary work
if(0===i.length)
// Ensure prepareTemplateStyles is called to support adding
// styles via `prepareAdoptedCssText` since that requires that
// `prepareTemplateStyles` is called.
return void window.ShadyCSS.prepareTemplateStyles(e.element,s);const n=document.createElement("style");// Collect styles into a single style. This helps us make sure ShadyCSS
// manipulations will not prevent us from being able to fix up template
// part indices.
// NOTE: collecting styles is inefficient for browsers but ShadyCSS
// currently does this anyway. When it does not, this should be changed.
for(let t=0;t<i.length;t++){const e=i[t];e.parentNode.removeChild(e),n.textContent+=e.textContent}// Remove styles from nested templates in this scope.
if((t=>{j.forEach(e=>{const s=E.get(U(e,t));void 0!==s&&s.keyString.forEach(t=>{const{element:{content:e}}=t,s=new Set;// IE 11 doesn't support the iterable param Set constructor
Array.from(e.querySelectorAll("style")).forEach(t=>{s.add(t)}),R(t,s)})})})(s),// And then put the condensed style into the "root" template passed in as
// `template`.
/**
 * Inserts the given node into the Template, optionally before the given
 * refNode. In addition to inserting the node into the Template, the Template
 * part indices are updated to match the mutated Template DOM.
 */
function(t,e,s=null){const{element:{content:i},parts:n}=t;// If there's no refNode, then put node at end of template.
// No part indices need to be shifted in this case.
if(null==s)return void i.appendChild(e);const r=document.createTreeWalker(i,V,null,!1);let o=M(n),a=0,l=-1;for(;r.nextNode();)for(l++,r.currentNode===s&&(a=O(e),s.parentNode.insertBefore(e,s));-1!==o&&n[o].index===l;){
// If we've inserted the node, simply adjust all subsequent parts
if(a>0){for(;-1!==o;)n[o].index+=a,o=M(n,o);return}o=M(n,o)}}(e,n,e.element.content.firstChild),// Note, it's important that ShadyCSS gets the template that `lit-html`
// will actually render so that it can update the style inside when
// needed (e.g. @apply native Shadow DOM case).
window.ShadyCSS.prepareTemplateStyles(e.element,s),window.ShadyCSS.nativeShadow){
// When in native Shadow DOM, re-add styling to rendered content using
// the style ShadyCSS produced.
const s=e.element.content.querySelector("style");t.insertBefore(s.cloneNode(!0),t.firstChild)}else{
// When not in native Shadow DOM, at this point ShadyCSS will have
// removed the style from the lit template and parts will be broken as a
// result. To fix this, we put back the style node ShadyCSS removed
// and then tell lit to remove that node from the template.
// NOTE, ShadyCSS creates its own style so we can safely add/remove
// `condensedStyle` here.
e.element.content.insertBefore(n,e.element.content.firstChild);const t=new Set;t.add(n),R(e,t)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
 * replaced at compile time by the munged name for object[property]. We cannot
 * alias this function, so we have to use a small shim that has the same
 * behavior when not compiling.
 */
window.JSCompiler_renameProperty=((t,e)=>t);const I={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:
// if the value is `null` or `undefined` pass this through
// to allow removing/no change behavior.
return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},L=(t,e)=>e!==t&&(e==e||t==t),F={attribute:!0,type:String,converter:I,reflect:!1,hasChanged:L},$=Promise.resolve(!0),J=1,W=4,D=8,Y=16,G=32;
/**
 * Change function that returns true if `value` is different from `oldValue`.
 * This method is used as the default for a property's `hasChanged` function.
 */
/**
 * Base element class which manages element properties and attributes. When
 * properties change, the `update` method is asynchronously called. This method
 * should be supplied by subclassers to render updates as desired.
 */
class K extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=$,this._hasConnectedResolver=void 0,
/**
     * Map with keys for any properties that have changed since the last
     * update cycle with previous values.
     */
this._changedProperties=new Map,
/**
     * Map with keys of properties that should be reflected when updated.
     */
this._reflectingProperties=void 0,this.initialize()}
/**
   * Returns a list of attributes corresponding to the registered properties.
   * @nocollapse
   */static get observedAttributes(){
// note: piggy backing on this to ensure we're finalized.
this.finalize();const t=[];// Use forEach so this works even if for/of loops are compiled to for loops
// expecting arrays
return this._classProperties.forEach((e,s)=>{const i=this._attributeNameForProperty(s,e);void 0!==i&&(this._attributeToPropertyMap.set(i,s),t.push(i))}),t}
/**
   * Ensures the private `_classProperties` property metadata is created.
   * In addition to `finalize` this is also called in `createProperty` to
   * ensure the `@property` decorator can add property metadata.
   */
/** @nocollapse */static _ensureClassProperties(){
// ensure private storage for property declarations.
if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;// NOTE: Workaround IE11 not supporting Map constructor argument.
const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}
/**
   * Creates a property accessor on the element prototype if one does not exist.
   * The property setter calls the property's `hasChanged` property option
   * or uses a strict identity check to determine whether or not to request
   * an update.
   * @nocollapse
   */static createProperty(t,e=F){// Do not generate an accessor if the prototype already has one, since
// it would be lost otherwise and that would never be the user's intention;
// Instead, we expect users to call `requestUpdate` themselves from
// user-defined accessors. Note that if the super has an accessor we will
// still overwrite it
if(
// Note, since this can be called by the `@property` decorator which
// is called before `finalize`, we ensure storage exists for property
// metadata.
this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const s="symbol"==typeof t?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{
// tslint:disable-next-line:no-any no symbol in index
get(){return this[s]},set(e){
// tslint:disable-next-line:no-any no symbol in index
const i=this[t];// tslint:disable-next-line:no-any no symbol in index
this[s]=e,this._requestUpdate(t,i)},configurable:!0,enumerable:!0})}
/**
   * Creates property accessors for registered properties and ensures
   * any superclasses are also finalized.
   * @nocollapse
   */static finalize(){if(this.hasOwnProperty(JSCompiler_renameProperty("finalized",this))&&this.finalized)return;// finalize any superclasses
const t=Object.getPrototypeOf(this);// make any properties
// Note, only process "own" properties since this element will inherit
// any properties defined on the superClass, and finalization ensures
// the entire prototype chain is finalized.
if("function"==typeof t.finalize&&t.finalize(),this.finalized=!0,this._ensureClassProperties(),// initialize Map populated in observedAttributes
this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];// support symbols in properties (IE11 does not support this)
// This for/of is ok because propKeys is an array
for(const s of e)
// note, use of `any` is due to TypeSript lack of support for symbol in
// index types
// tslint:disable-next-line:no-any no symbol in index
this.createProperty(s,t[s])}}
/**
   * Returns the property name for the given attribute `name`.
   * @nocollapse
   */static _attributeNameForProperty(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}
/**
   * Returns true if a property should request an update.
   * Called when a property value is set and uses the `hasChanged`
   * option for the property if present or a strict identity check.
   * @nocollapse
   */static _valueHasChanged(t,e,s=L){return s(t,e)}
/**
   * Returns the property value for the given attribute value.
   * Called via the `attributeChangedCallback` and uses the property's
   * `converter` or `converter.fromAttribute` property option.
   * @nocollapse
   */static _propertyValueFromAttribute(t,e){const s=e.type,i=e.converter||I,n="function"==typeof i?i:i.fromAttribute;return n?n(t,s):t}
/**
   * Returns the attribute value for the given property value. If this
   * returns undefined, the property will *not* be reflected to an attribute.
   * If this returns null, the attribute will be removed, otherwise the
   * attribute will be set to the value.
   * This uses the property's `reflect` and `type.toAttribute` property options.
   * @nocollapse
   */static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const s=e.type,i=e.converter;return(i&&i.toAttribute||I.toAttribute)(t,s)}
/**
   * Performs element initialization. By default captures any pre-set values for
   * registered properties.
   */initialize(){this._saveInstanceProperties(),// ensures first update will be caught by an early access of `updateComplete`
this._requestUpdate()}
/**
   * Fixes any properties set on the instance before upgrade time.
   * Otherwise these would shadow the accessor and break these properties.
   * The properties are stored in a Map which is played back after the
   * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
   * (<=41), properties created for native platform properties like (`id` or
   * `name`) may not have default values set in the element constructor. On
   * these browsers native properties appear on instances and therefore their
   * default value will overwrite any element default (e.g. if the element sets
   * this.id = 'id' in the constructor, the 'id' will become '' since this is
   * the native platform default).
   */_saveInstanceProperties(){
// Use forEach so this works even if for/of loops are compiled to for loops
// expecting arrays
this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}
/**
   * Applies previously saved instance properties.
   */_applyInstanceProperties(){
// Use forEach so this works even if for/of loops are compiled to for loops
// expecting arrays
// tslint:disable-next-line:no-any
this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|G,// Ensure first connection completes an update. Updates cannot complete before
// connection and if one is pending connection the `_hasConnectionResolver`
// will exist. If so, resolve it to complete the update, otherwise
// requestUpdate.
this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}
/**
   * Allows for `super.disconnectedCallback()` in extensions while
   * reserving the possibility of making non-breaking feature additions
   * when disconnecting at some point in the future.
   */disconnectedCallback(){}
/**
   * Synchronizes property values when attributes change.
   */attributeChangedCallback(t,e,s){e!==s&&this._attributeToProperty(t,s)}_propertyToAttribute(t,e,s=F){const i=this.constructor,n=i._attributeNameForProperty(t,s);if(void 0!==n){const t=i._propertyValueToAttribute(e,s);// an undefined value does not change the attribute.
if(void 0===t)return;// Track if the property is being reflected to avoid
// setting the property again via `attributeChangedCallback`. Note:
// 1. this takes advantage of the fact that the callback is synchronous.
// 2. will behave incorrectly if multiple attributes are in the reaction
// stack at time of calling. However, since we process attributes
// in `update` this should not be possible (or an extreme corner case
// that we'd like to discover).
// mark state reflecting
this._updateState=this._updateState|D,null==t?this.removeAttribute(n):this.setAttribute(n,t),// mark state not reflecting
this._updateState=this._updateState&~D}}_attributeToProperty(t,e){
// Use tracking info to avoid deserializing attribute value if it was
// just set from a property setter.
if(this._updateState&D)return;const s=this.constructor,i=s._attributeToPropertyMap.get(t);if(void 0!==i){const t=s._classProperties.get(i)||F;// mark state reflecting
this._updateState=this._updateState|Y,this[i]=// tslint:disable-next-line:no-any
s._propertyValueFromAttribute(e,t),// mark state not reflecting
this._updateState=this._updateState&~Y}}
/**
   * This private version of `requestUpdate` does not access or return the
   * `updateComplete` promise. This promise can be overridden and is therefore
   * not free to access.
   */_requestUpdate(t,e){let s=!0;// If we have a property key, perform property update steps.
if(void 0!==t){const i=this.constructor,n=i._classProperties.get(t)||F;i._valueHasChanged(this[t],e,n.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),// Add to reflecting properties set.
// Note, it's important that every change has a chance to add the
// property to `_reflectingProperties`. This ensures setting
// attribute + property reflects correctly.
!0!==n.reflect||this._updateState&Y||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,n))):
// Abort the request if the property should not be considered changed.
s=!1}!this._hasRequestedUpdate&&s&&this._enqueueUpdate()}
/**
   * Requests an update which is processed asynchronously. This should
   * be called when an element should update based on some state not triggered
   * by setting a property. In this case, pass no arguments. It should also be
   * called when manually implementing a property setter. In this case, pass the
   * property `name` and `oldValue` to ensure that any configured property
   * options are honored. Returns the `updateComplete` Promise which is resolved
   * when the update completes.
   *
   * @param name {PropertyKey} (optional) name of requesting property
   * @param oldValue {any} (optional) old value of requesting property
   * @returns {Promise} A Promise that is resolved when the update completes.
   */requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}
/**
   * Sets up the element to asynchronously update.
   */async _enqueueUpdate(){let t,e;
// Mark state updating...
this._updateState=this._updateState|W;const s=this._updatePromise;this._updatePromise=new Promise((s,i)=>{t=s,e=i});try{
// Ensure any previous update has resolved before updating.
// This `await` also ensures that property changes are batched.
await s}catch(t){}// Ignore any previous errors. We only care that the previous cycle is
// done. Any error should have been handled in the previous update.
// Make sure the element has connected before updating.
this._hasConnected||await new Promise(t=>this._hasConnectedResolver=t);try{const t=this.performUpdate();// If `performUpdate` returns a Promise, we await it. This is done to
// enable coordinating updates with a scheduler. Note, the result is
// checked to avoid delaying an additional microtask unless we need to.
null!=t&&await t}catch(t){e(t)}t(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&G}get _hasRequestedUpdate(){return this._updateState&W}get hasUpdated(){return this._updateState&J}
/**
   * Performs an element update. Note, if an exception is thrown during the
   * update, `firstUpdated` and `updated` will not be called.
   *
   * You can override this method to change the timing of updates. If this
   * method is overridden, `super.performUpdate()` must be called.
   *
   * For instance, to schedule updates to occur just before the next frame:
   *
   * ```
   * protected async performUpdate(): Promise<unknown> {
   *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
   *   super.performUpdate();
   * }
   * ```
   */performUpdate(){
// Mixin instance properties once, if they exist.
this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{(t=this.shouldUpdate(e))&&this.update(e)}catch(e){
// Prevent `firstUpdated` and `updated` from running when there's an
// update exception.
throw t=!1,e}finally{
// Ensure element can accept additional updates after an exception.
this._markUpdated()}t&&(this._updateState&J||(this._updateState=this._updateState|J,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~W}
/**
   * Returns a Promise that resolves when the element has completed updating.
   * The Promise value is a boolean that is `true` if the element completed the
   * update without triggering another update. The Promise result is `false` if
   * a property was set inside `updated()`. If the Promise is rejected, an
   * exception was thrown during the update. This getter can be implemented to
   * await additional state. For example, it is sometimes useful to await a
   * rendered element before fulfilling this Promise. To do this, first await
   * `super.updateComplete` then any subsequent state.
   *
   * @returns {Promise} The Promise returns a boolean that indicates if the
   * update resolved without triggering another update.
   */get updateComplete(){return this._updatePromise}
/**
   * Controls whether or not `update` should be called when the element requests
   * an update. By default, this method always returns `true`, but this can be
   * customized to control when to update.
   *
   * * @param _changedProperties Map of changed properties with old values
   */shouldUpdate(t){return!0}
/**
   * Updates the element. This method reflects property values to attributes.
   * It can be overridden to render and keep updated element DOM.
   * Setting properties inside this method will *not* trigger
   * another update.
   *
   * * @param _changedProperties Map of changed properties with old values
   */update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(
// Use forEach so this works even if for/of loops are compiled to for
// loops expecting arrays
this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0)}
/**
   * Invoked whenever the element is updated. Implement to perform
   * post-updating tasks via DOM APIs, for example, focusing an element.
   *
   * Setting properties inside this method will trigger the element to update
   * again after this update cycle completes.
   *
   * * @param _changedProperties Map of changed properties with old values
   */updated(t){}
/**
   * Invoked when the element is first updated. Implement to perform one time
   * work on the element after update.
   *
   * Setting properties inside this method will trigger the element to update
   * again after this update cycle completes.
   *
   * * @param _changedProperties Map of changed properties with old values
   */firstUpdated(t){}}
/**
 * Marks class as having finished creating properties.
 */K.finalized=!0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const Q="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// This line will be used in regexes to search for LitElement usage.
// TODO(justinfagnani): inject version number at build time
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// This line will be used in regexes to search for LitElement usage.
// TODO(justinfagnani): inject version number at build time
(window.litElementVersions||(window.litElementVersions=[])).push("2.0.1");
/** Deeply flattens styles array. Uses native flat if available. */
const X=t=>t.flat?t.flat(1/0):
/**
 * Minimal implementation of Array.prototype.flat
 * @param arr the array to flatten
 * @param result the accumlated result
 */
function t(e,s=[]){for(let i=0,n=e.length;i<n;i++){const n=e[i];Array.isArray(n)?t(n,s):s.push(n)}return s}(t);class Z extends K{
/** @nocollapse */
static finalize(){super.finalize(),// Prepare styling that is stamped at first render time. Styling
// is built from user provided `styles` or is inherited from the superclass.
this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}
/** @nocollapse */static _getUniqueStyles(){
// Take care not to call `this.styles` multiple times since this generates
// new CSSResults each time.
// TODO(sorvell): Since we do not cache CSSResults by input, any
// shared styles will generate new stylesheet objects, which is wasteful.
// This should be addressed when a browser ships constructable
// stylesheets.
const t=this.styles,e=[];if(Array.isArray(t)){// Array.from does not work on Set in IE
X(t).reduceRight((t,e)=>(t.add(e),t),new Set).forEach(t=>e.unshift(t))}else t&&e.push(t);return e}
/**
   * Performs element initialization. By default this calls `createRenderRoot`
   * to create the element `renderRoot` node and captures any pre-set values for
   * registered properties.
   */initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),// Note, if renderRoot is not a shadowRoot, styles would/could apply to the
// element's getRootNode(). While this could be done, we're choosing not to
// support this now since it would require different logic around de-duping.
window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}
/**
   * Returns the node into which the element should render and by default
   * creates and returns an open shadowRoot. Implement to customize where the
   * element's DOM is rendered. For example, to render into the element's
   * childNodes, return `this`.
   * @returns {Element|DocumentFragment} Returns a node into which to render.
   */createRenderRoot(){return this.attachShadow({mode:"open"})}
/**
   * Applies styling to the element shadowRoot using the `static get styles`
   * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where
   * available and will fallback otherwise. When Shadow DOM is polyfilled,
   * ShadyCSS scopes styles and adds them to the document. When Shadow DOM
   * is available but `adoptedStyleSheets` is not, styles are appended to the
   * end of the `shadowRoot` to [mimic spec
   * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
   */adoptStyles(){const t=this.constructor._styles;0!==t.length&&(// There are three separate cases here based on Shadow DOM support.
// (1) shadowRoot polyfilled: use ShadyCSS
// (2) shadowRoot.adoptedStyleSheets available: use it.
// (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after
// rendering
void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?Q?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):
// This must be done after rendering so the actual style insertion is done
// in `update`.
this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),// Note, first update/render handles styleElement so we only call this if
// connected after first update.
this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}
/**
   * Updates the element. This method reflects property values to attributes
   * and calls `render` to render DOM via lit-html. Setting properties inside
   * this method will *not* trigger another update.
   * * @param _changedProperties Map of changed properties with old values
   */update(t){super.update(t);const e=this.render();e instanceof f&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),// When native Shadow DOM is used but adoptedStyles are not supported,
// insert styling after rendering to ensure adoptedStyles have highest
// priority.
this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}
/**
   * Invoked on each update to perform rendering tasks. This method must return
   * a lit-html TemplateResult. Setting properties inside this method will *not*
   * trigger the element to update.
   */render(){}}
/**
 * Ensure this class is marked as `finalized` as an optimization ensuring
 * it will not needlessly try to `finalize`.
 */Z.finalized=!0,
/**
 * Render method used to render the lit-html TemplateResult to the element's
 * DOM.
 * @param {TemplateResult} Template to render.
 * @param {Element|DocumentFragment} Node into which to render.
 * @param {String} Element name.
 * @nocollapse
 */
Z.render=((t,e,s)=>{const n=s.scopeName,r=k.has(e),o=e instanceof ShadowRoot&&z&&t instanceof f,a=o&&!q.has(n),l=a?document.createDocumentFragment():e;// When performing first scope render,
// (1) We've rendered into a fragment so that there's a chance to
// `prepareTemplateStyles` before sub-elements hit the DOM
// (which might cause them to render based on a common pattern of
// rendering in a custom element's `connectedCallback`);
// (2) Scope the template with ShadyCSS one time only for this scope.
// (3) Render the fragment into the container and make sure the
// container knows its `part` is the one we just rendered. This ensures
// DOM will be re-used on subsequent renders.
if(((t,e,s)=>{let n=k.get(e);void 0===n&&(i(e,e.firstChild),k.set(e,n=new v(Object.assign({templateFactory:A},s))),n.appendInto(e)),n.setValue(t),n.commit()})(t,l,Object.assign({templateFactory:B(n)},s)),a){const t=k.get(l);k.delete(l),t.value instanceof m&&H(l,t.value.template,n),i(e,e.firstChild),e.appendChild(l),k.set(e,t)}// After elements have hit the DOM, update styling if this is the
// initial render to this container.
// This is needed whenever dynamic changes are made so it would be
// safest to do every render; however, this would regress performance
// so we leave it up to the user to call `ShadyCSSS.styleElement`
// for dynamic changes.
!r&&o&&window.ShadyCSS.styleElement(e.host)});window.customElements.define("flip-card",
/**
 * `flip-card`
 * A card component based on the code-it notes by Dan Harding &lt;https://dev.to/danielharding&gt;
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class extends Z{render(){return T`
      <style>
        :host {
          width:300px;
          height:auto;
          display: inline-block;
        }

        :host * {
          box-sizing: border-box;
        }

        #card {
          background-color: transparent;
          width: 100%;
          perspective: 1000px; /* Remove this if you don't want the 3D effect */
          position: relative;
          flex: 1 1 auto;
          transition: height 0.2s;
        }

        /* Used to style the front and back sides of the card*/
        .card {
          color: ${this._mainTextColour};
          background: ${this._mainBackgroundColour};
          border-right: 4px solid var(--accent, rgb(255, 212, 45));
          border-bottom: 4px solid var(--accent, rgb(255, 212, 45));
          border-left: 4px solid var(--accent, rgb(255, 212, 45));
          border-top: 4px solid var(--accent, rgb(255, 212, 45));
          border-radius: 10px 10px 10px 10px;
          box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
          transition: transform 0.5s ease-in-out;
					overflow: hidden;

					padding-bottom: 32px;
        }

        /* Position the front and back side */
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          backface-visibility: hidden;
        }

        /* Style the back side */
        .flip-card-back {
          transform: rotateY(180deg);
        }

        .flip-button {
          position:absolute;
					width: 80px;
					height: 80px;
          right: -40px;
          bottom: -40px;
          cursor: pointer;

					border: 4px solid var(--accent, rgb(255, 212, 45));;
					background: var(--accent, rgb(255, 212, 45));;
					border-radius: 50%;
        }

				.flip-button-icon {
					display:inline-block;
					position: relative;
					top: -14px;
					left: -14px;
					width:20px;
					height:20px;
					background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M8.192 0C4.638 6.439 4.039 16.259 18 15.932V8l12 12-12 12v-7.762C1.282 24.674-.58 9.481 8.192 0z"/></svg>');
					background-repeat: no-repeat;
					background-size: contain;

					color: var(--flipButtonColour, #000);
				}

        :host([facedown]) .flip-card-front {
          transform: rotateY(180deg);
        }

        :host([facedown]) .flip-card-back {
          transform: rotateY(0deg);
        }

        .animateJump .card {
          animation: jump 0.4s linear 0s 1;
        }

        @keyframes jump {
          0% {
            margin-top: 0;
          }
          50% {
            margin-top: -32px;
          }
          100% {
            margin-top: 0;
          }
        }
      </style>

			<main id="card">
        <section id="front" class="flip-card-front card">
            <slot name="front-content">Front side content!</slot>
            <button class="flip-button" @click=${()=>this.toggleAttribute("facedown")}>
							<span class="flip-button-icon"></span>
						</button>
        </section>

        <section id="back" class="flip-card-back card">
					<slot name="back-content">Back side content!</slot>
          <button class="flip-button" @click=${()=>this.toggleAttribute("facedown")}>
						<span class="flip-button-icon"></span>
					</button>
        </section>
      </main>
    `}constructor(){super(),this.cardHeight="0px",this.facedown=!1}firstUpdated(t){this.resize()}static get properties(){return{cardHeight:{type:String,reflect:!1},facedown:{type:Boolean,relfect:!0}}}attributeChangedCallback(t,e,s){switch(super.attributeChangedCallback(t,e,s),t){case"facedown":this.flip()}}flip(t){let e=this.shadowRoot.getElementById("card");e.classList.add("animateJump"),e.addEventListener("animationend",()=>{e.classList.remove("animateJump")})}
/**
   * Recalculate the size of the card based on the content.
   */resize(){let t=this.shadowRoot.getElementById("front"),e=this.shadowRoot.getElementById("back"),s=Math.max(t.offsetHeight,e.offsetHeight)+"px";t.style.height=s,e.style.height=s,this.cardHeight=s,this.shadowRoot.getElementById("card").style.height=s,this.requestUpdate()}});//# sourceMappingURL=flip-card.js.map
