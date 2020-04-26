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
const directives = new WeakMap();
/**
 * Brands a function as a directive factory function so that lit-html will call
 * the function during template rendering, rather than passing as a value.
 *
 * A _directive_ is a function that takes a Part as an argument. It has the
 * signature: `(part: Part) => void`.
 *
 * A directive _factory_ is a function that takes arguments for data and
 * configuration and returns a directive. Users of directive usually refer to
 * the directive factory as the directive. For example, "The repeat directive".
 *
 * Usually a template author will invoke a directive factory in their template
 * with relevant arguments, which will then return a directive function.
 *
 * Here's an example of using the `repeat()` directive factory that takes an
 * array and a function to render an item:
 *
 * ```js
 * html`<ul><${repeat(items, (item) => html`<li>${item}</li>`)}</ul>`
 * ```
 *
 * When `repeat` is invoked, it returns a directive function that closes over
 * `items` and the template function. When the outer template is rendered, the
 * return directive function is called with the Part for the expression.
 * `repeat` then performs it's custom logic to render multiple items.
 *
 * @param f The directive factory function. Must be a function that returns a
 * function of the signature `(part: Part) => void`. The returned function will
 * be called with the part object.
 *
 * @example
 *
 * import {directive, html} from 'lit-html';
 *
 * const immutable = directive((v) => (part) => {
 *   if (part.value !== v) {
 *     part.setValue(v)
 *   }
 * });
 */
const directive = (f) => ((...args) => {
    const d = f(...args);
    directives.set(d, true);
    return d;
});
const isDirective = (o) => {
    return typeof o === 'function' && directives.has(o);
};
//# sourceMappingURL=directive.js.map

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
 * True if the custom elements polyfill is in use.
 */
const isCEPolyfill = window.customElements !== undefined &&
    window.customElements.polyfillWrapFlushCallback !==
        undefined;
/**
 * Removes nodes, starting from `start` (inclusive) to `end` (exclusive), from
 * `container`.
 */
const removeNodes = (container, start, end = null) => {
    while (start !== end) {
        const n = start.nextSibling;
        container.removeChild(start);
        start = n;
    }
};
//# sourceMappingURL=dom.js.map

/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
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
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
const noChange = {};
/**
 * A sentinel value that signals a NodePart to fully clear its content.
 */
const nothing = {};
//# sourceMappingURL=part.js.map

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
 * An expression marker with embedded unique key to avoid collision with
 * possible text in templates.
 */
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
/**
 * An expression marker used text-positions, multi-binding attributes, and
 * attributes with markup-like text values.
 */
const nodeMarker = `<!--${marker}-->`;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
/**
 * Suffix appended to all bound attribute names.
 */
const boundAttributeSuffix = '$lit$';
/**
 * An updateable Template that tracks the location of dynamic parts.
 */
class Template {
    constructor(result, element) {
        this.parts = [];
        this.element = element;
        const nodesToRemove = [];
        const stack = [];
        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
        const walker = document.createTreeWalker(element.content, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
        // Keeps track of the last index associated with a part. We try to delete
        // unnecessary nodes, but we never want to associate two different parts
        // to the same index. They must have a constant node between.
        let lastPartIndex = 0;
        let index = -1;
        let partIndex = 0;
        const { strings, values: { length } } = result;
        while (partIndex < length) {
            const node = walker.nextNode();
            if (node === null) {
                // We've exhausted the content inside a nested template element.
                // Because we still have parts (the outer for-loop), we know:
                // - There is a template in the stack
                // - The walker will find a nextNode outside the template
                walker.currentNode = stack.pop();
                continue;
            }
            index++;
            if (node.nodeType === 1 /* Node.ELEMENT_NODE */) {
                if (node.hasAttributes()) {
                    const attributes = node.attributes;
                    const { length } = attributes;
                    // Per
                    // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
                    // attributes are not guaranteed to be returned in document order.
                    // In particular, Edge/IE can return them out of order, so we cannot
                    // assume a correspondence between part index and attribute index.
                    let count = 0;
                    for (let i = 0; i < length; i++) {
                        if (endsWith(attributes[i].name, boundAttributeSuffix)) {
                            count++;
                        }
                    }
                    while (count-- > 0) {
                        // Get the template literal section leading up to the first
                        // expression in this attribute
                        const stringForPart = strings[partIndex];
                        // Find the attribute name
                        const name = lastAttributeNameRegex.exec(stringForPart)[2];
                        // Find the corresponding attribute
                        // All bound attributes have had a suffix added in
                        // TemplateResult#getHTML to opt out of special attribute
                        // handling. To look up the attribute value we also need to add
                        // the suffix.
                        const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
                        const attributeValue = node.getAttribute(attributeLookupName);
                        node.removeAttribute(attributeLookupName);
                        const statics = attributeValue.split(markerRegex);
                        this.parts.push({ type: 'attribute', index, name, strings: statics });
                        partIndex += statics.length - 1;
                    }
                }
                if (node.tagName === 'TEMPLATE') {
                    stack.push(node);
                    walker.currentNode = node.content;
                }
            }
            else if (node.nodeType === 3 /* Node.TEXT_NODE */) {
                const data = node.data;
                if (data.indexOf(marker) >= 0) {
                    const parent = node.parentNode;
                    const strings = data.split(markerRegex);
                    const lastIndex = strings.length - 1;
                    // Generate a new text node for each literal section
                    // These nodes are also used as the markers for node parts
                    for (let i = 0; i < lastIndex; i++) {
                        let insert;
                        let s = strings[i];
                        if (s === '') {
                            insert = createMarker();
                        }
                        else {
                            const match = lastAttributeNameRegex.exec(s);
                            if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                                s = s.slice(0, match.index) + match[1] +
                                    match[2].slice(0, -boundAttributeSuffix.length) + match[3];
                            }
                            insert = document.createTextNode(s);
                        }
                        parent.insertBefore(insert, node);
                        this.parts.push({ type: 'node', index: ++index });
                    }
                    // If there's no text, we must insert a comment to mark our place.
                    // Else, we can trust it will stick around after cloning.
                    if (strings[lastIndex] === '') {
                        parent.insertBefore(createMarker(), node);
                        nodesToRemove.push(node);
                    }
                    else {
                        node.data = strings[lastIndex];
                    }
                    // We have a part for each match found
                    partIndex += lastIndex;
                }
            }
            else if (node.nodeType === 8 /* Node.COMMENT_NODE */) {
                if (node.data === marker) {
                    const parent = node.parentNode;
                    // Add a new marker node to be the startNode of the Part if any of
                    // the following are true:
                    //  * We don't have a previousSibling
                    //  * The previousSibling is already the start of a previous part
                    if (node.previousSibling === null || index === lastPartIndex) {
                        index++;
                        parent.insertBefore(createMarker(), node);
                    }
                    lastPartIndex = index;
                    this.parts.push({ type: 'node', index });
                    // If we don't have a nextSibling, keep this node so we have an end.
                    // Else, we can remove it to save future costs.
                    if (node.nextSibling === null) {
                        node.data = '';
                    }
                    else {
                        nodesToRemove.push(node);
                        index--;
                    }
                    partIndex++;
                }
                else {
                    let i = -1;
                    while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
                        // Comment node has a binding marker inside, make an inactive part
                        // The binding won't work, but subsequent bindings will
                        // TODO (justinfagnani): consider whether it's even worth it to
                        // make bindings in comments work
                        this.parts.push({ type: 'node', index: -1 });
                        partIndex++;
                    }
                }
            }
        }
        // Remove text binding nodes after the walk to not disturb the TreeWalker
        for (const n of nodesToRemove) {
            n.parentNode.removeChild(n);
        }
    }
}
const endsWith = (str, suffix) => {
    const index = str.length - suffix.length;
    return index >= 0 && str.slice(index) === suffix;
};
const isTemplatePartActive = (part) => part.index !== -1;
// Allows `document.createComment('')` to be renamed for a
// small manual size-savings.
const createMarker = () => document.createComment('');
/**
 * This regex extracts the attribute name preceding an attribute-position
 * expression. It does this by matching the syntax allowed for attributes
 * against the string literal directly preceding the expression, assuming that
 * the expression is in an attribute-value position.
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#elements-attributes
 *
 * " \x09\x0a\x0c\x0d" are HTML space characters:
 * https://www.w3.org/TR/html5/infrastructure.html#space-characters
 *
 * "\0-\x1F\x7F-\x9F" are Unicode control characters, which includes every
 * space character except " ".
 *
 * So an attribute is:
 *  * The name: any character except a control character, space character, ('),
 *    ("), ">", "=", or "/"
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */
const lastAttributeNameRegex = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
//# sourceMappingURL=template.js.map

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
class TemplateInstance {
    constructor(template, processor, options) {
        this.__parts = [];
        this.template = template;
        this.processor = processor;
        this.options = options;
    }
    update(values) {
        let i = 0;
        for (const part of this.__parts) {
            if (part !== undefined) {
                part.setValue(values[i]);
            }
            i++;
        }
        for (const part of this.__parts) {
            if (part !== undefined) {
                part.commit();
            }
        }
    }
    _clone() {
        // There are a number of steps in the lifecycle of a template instance's
        // DOM fragment:
        //  1. Clone - create the instance fragment
        //  2. Adopt - adopt into the main document
        //  3. Process - find part markers and create parts
        //  4. Upgrade - upgrade custom elements
        //  5. Update - set node, attribute, property, etc., values
        //  6. Connect - connect to the document. Optional and outside of this
        //     method.
        //
        // We have a few constraints on the ordering of these steps:
        //  * We need to upgrade before updating, so that property values will pass
        //    through any property setters.
        //  * We would like to process before upgrading so that we're sure that the
        //    cloned fragment is inert and not disturbed by self-modifying DOM.
        //  * We want custom elements to upgrade even in disconnected fragments.
        //
        // Given these constraints, with full custom elements support we would
        // prefer the order: Clone, Process, Adopt, Upgrade, Update, Connect
        //
        // But Safari dooes not implement CustomElementRegistry#upgrade, so we
        // can not implement that order and still have upgrade-before-update and
        // upgrade disconnected fragments. So we instead sacrifice the
        // process-before-upgrade constraint, since in Custom Elements v1 elements
        // must not modify their light DOM in the constructor. We still have issues
        // when co-existing with CEv0 elements like Polymer 1, and with polyfills
        // that don't strictly adhere to the no-modification rule because shadow
        // DOM, which may be created in the constructor, is emulated by being placed
        // in the light DOM.
        //
        // The resulting order is on native is: Clone, Adopt, Upgrade, Process,
        // Update, Connect. document.importNode() performs Clone, Adopt, and Upgrade
        // in one step.
        //
        // The Custom Elements v1 polyfill supports upgrade(), so the order when
        // polyfilled is the more ideal: Clone, Process, Adopt, Upgrade, Update,
        // Connect.
        const fragment = isCEPolyfill ?
            this.template.element.content.cloneNode(true) :
            document.importNode(this.template.element.content, true);
        const stack = [];
        const parts = this.template.parts;
        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
        const walker = document.createTreeWalker(fragment, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
        let partIndex = 0;
        let nodeIndex = 0;
        let part;
        let node = walker.nextNode();
        // Loop through all the nodes and parts of a template
        while (partIndex < parts.length) {
            part = parts[partIndex];
            if (!isTemplatePartActive(part)) {
                this.__parts.push(undefined);
                partIndex++;
                continue;
            }
            // Progress the tree walker until we find our next part's node.
            // Note that multiple parts may share the same node (attribute parts
            // on a single element), so this loop may not run at all.
            while (nodeIndex < part.index) {
                nodeIndex++;
                if (node.nodeName === 'TEMPLATE') {
                    stack.push(node);
                    walker.currentNode = node.content;
                }
                if ((node = walker.nextNode()) === null) {
                    // We've exhausted the content inside a nested template element.
                    // Because we still have parts (the outer for-loop), we know:
                    // - There is a template in the stack
                    // - The walker will find a nextNode outside the template
                    walker.currentNode = stack.pop();
                    node = walker.nextNode();
                }
            }
            // We've arrived at our part's node.
            if (part.type === 'node') {
                const part = this.processor.handleTextExpression(this.options);
                part.insertAfterNode(node.previousSibling);
                this.__parts.push(part);
            }
            else {
                this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
            }
            partIndex++;
        }
        if (isCEPolyfill) {
            document.adoptNode(fragment);
            customElements.upgrade(fragment);
        }
        return fragment;
    }
}
//# sourceMappingURL=template-instance.js.map

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
const commentMarker = ` ${marker} `;
/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */
class TemplateResult {
    constructor(strings, values, type, processor) {
        this.strings = strings;
        this.values = values;
        this.type = type;
        this.processor = processor;
    }
    /**
     * Returns a string of HTML used to create a `<template>` element.
     */
    getHTML() {
        const l = this.strings.length - 1;
        let html = '';
        let isCommentBinding = false;
        for (let i = 0; i < l; i++) {
            const s = this.strings[i];
            // For each binding we want to determine the kind of marker to insert
            // into the template source before it's parsed by the browser's HTML
            // parser. The marker type is based on whether the expression is in an
            // attribute, text, or comment poisition.
            //   * For node-position bindings we insert a comment with the marker
            //     sentinel as its text content, like <!--{{lit-guid}}-->.
            //   * For attribute bindings we insert just the marker sentinel for the
            //     first binding, so that we support unquoted attribute bindings.
            //     Subsequent bindings can use a comment marker because multi-binding
            //     attributes must be quoted.
            //   * For comment bindings we insert just the marker sentinel so we don't
            //     close the comment.
            //
            // The following code scans the template source, but is *not* an HTML
            // parser. We don't need to track the tree structure of the HTML, only
            // whether a binding is inside a comment, and if not, if it appears to be
            // the first binding in an attribute.
            const commentOpen = s.lastIndexOf('<!--');
            // We're in comment position if we have a comment open with no following
            // comment close. Because <-- can appear in an attribute value there can
            // be false positives.
            isCommentBinding = (commentOpen > -1 || isCommentBinding) &&
                s.indexOf('-->', commentOpen + 1) === -1;
            // Check to see if we have an attribute-like sequence preceeding the
            // expression. This can match "name=value" like structures in text,
            // comments, and attribute values, so there can be false-positives.
            const attributeMatch = lastAttributeNameRegex.exec(s);
            if (attributeMatch === null) {
                // We're only in this branch if we don't have a attribute-like
                // preceeding sequence. For comments, this guards against unusual
                // attribute values like <div foo="<!--${'bar'}">. Cases like
                // <!-- foo=${'bar'}--> are handled correctly in the attribute branch
                // below.
                html += s + (isCommentBinding ? commentMarker : nodeMarker);
            }
            else {
                // For attributes we use just a marker sentinel, and also append a
                // $lit$ suffix to the name to opt-out of attribute-specific parsing
                // that IE and Edge do for style and certain SVG attributes.
                html += s.substr(0, attributeMatch.index) + attributeMatch[1] +
                    attributeMatch[2] + boundAttributeSuffix + attributeMatch[3] +
                    marker;
            }
        }
        html += this.strings[l];
        return html;
    }
    getTemplateElement() {
        const template = document.createElement('template');
        template.innerHTML = this.getHTML();
        return template;
    }
}
//# sourceMappingURL=template-result.js.map

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
const isPrimitive = (value) => {
    return (value === null ||
        !(typeof value === 'object' || typeof value === 'function'));
};
const isIterable = (value) => {
    return Array.isArray(value) ||
        // tslint:disable-next-line:no-any
        !!(value && value[Symbol.iterator]);
};
/**
 * Writes attribute values to the DOM for a group of AttributeParts bound to a
 * single attibute. The value is only set once even if there are multiple parts
 * for an attribute.
 */
class AttributeCommitter {
    constructor(element, name, strings) {
        this.dirty = true;
        this.element = element;
        this.name = name;
        this.strings = strings;
        this.parts = [];
        for (let i = 0; i < strings.length - 1; i++) {
            this.parts[i] = this._createPart();
        }
    }
    /**
     * Creates a single part. Override this to create a differnt type of part.
     */
    _createPart() {
        return new AttributePart(this);
    }
    _getValue() {
        const strings = this.strings;
        const l = strings.length - 1;
        let text = '';
        for (let i = 0; i < l; i++) {
            text += strings[i];
            const part = this.parts[i];
            if (part !== undefined) {
                const v = part.value;
                if (isPrimitive(v) || !isIterable(v)) {
                    text += typeof v === 'string' ? v : String(v);
                }
                else {
                    for (const t of v) {
                        text += typeof t === 'string' ? t : String(t);
                    }
                }
            }
        }
        text += strings[l];
        return text;
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            this.element.setAttribute(this.name, this._getValue());
        }
    }
}
/**
 * A Part that controls all or part of an attribute value.
 */
class AttributePart {
    constructor(committer) {
        this.value = undefined;
        this.committer = committer;
    }
    setValue(value) {
        if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
            this.value = value;
            // If the value is a not a directive, dirty the committer so that it'll
            // call setAttribute. If the value is a directive, it'll dirty the
            // committer if it calls setValue().
            if (!isDirective(value)) {
                this.committer.dirty = true;
            }
        }
    }
    commit() {
        while (isDirective(this.value)) {
            const directive = this.value;
            this.value = noChange;
            directive(this);
        }
        if (this.value === noChange) {
            return;
        }
        this.committer.commit();
    }
}
/**
 * A Part that controls a location within a Node tree. Like a Range, NodePart
 * has start and end locations and can set and update the Nodes between those
 * locations.
 *
 * NodeParts support several value types: primitives, Nodes, TemplateResults,
 * as well as arrays and iterables of those types.
 */
class NodePart {
    constructor(options) {
        this.value = undefined;
        this.__pendingValue = undefined;
        this.options = options;
    }
    /**
     * Appends this part into a container.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendInto(container) {
        this.startNode = container.appendChild(createMarker());
        this.endNode = container.appendChild(createMarker());
    }
    /**
     * Inserts this part after the `ref` node (between `ref` and `ref`'s next
     * sibling). Both `ref` and its next sibling must be static, unchanging nodes
     * such as those that appear in a literal section of a template.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterNode(ref) {
        this.startNode = ref;
        this.endNode = ref.nextSibling;
    }
    /**
     * Appends this part into a parent part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendIntoPart(part) {
        part.__insert(this.startNode = createMarker());
        part.__insert(this.endNode = createMarker());
    }
    /**
     * Inserts this part after the `ref` part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterPart(ref) {
        ref.__insert(this.startNode = createMarker());
        this.endNode = ref.endNode;
        ref.endNode = this.startNode;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while (isDirective(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        const value = this.__pendingValue;
        if (value === noChange) {
            return;
        }
        if (isPrimitive(value)) {
            if (value !== this.value) {
                this.__commitText(value);
            }
        }
        else if (value instanceof TemplateResult) {
            this.__commitTemplateResult(value);
        }
        else if (value instanceof Node) {
            this.__commitNode(value);
        }
        else if (isIterable(value)) {
            this.__commitIterable(value);
        }
        else if (value === nothing) {
            this.value = nothing;
            this.clear();
        }
        else {
            // Fallback, will render the string representation
            this.__commitText(value);
        }
    }
    __insert(node) {
        this.endNode.parentNode.insertBefore(node, this.endNode);
    }
    __commitNode(value) {
        if (this.value === value) {
            return;
        }
        this.clear();
        this.__insert(value);
        this.value = value;
    }
    __commitText(value) {
        const node = this.startNode.nextSibling;
        value = value == null ? '' : value;
        // If `value` isn't already a string, we explicitly convert it here in case
        // it can't be implicitly converted - i.e. it's a symbol.
        const valueAsString = typeof value === 'string' ? value : String(value);
        if (node === this.endNode.previousSibling &&
            node.nodeType === 3 /* Node.TEXT_NODE */) {
            // If we only have a single text node between the markers, we can just
            // set its value, rather than replacing it.
            // TODO(justinfagnani): Can we just check if this.value is primitive?
            node.data = valueAsString;
        }
        else {
            this.__commitNode(document.createTextNode(valueAsString));
        }
        this.value = value;
    }
    __commitTemplateResult(value) {
        const template = this.options.templateFactory(value);
        if (this.value instanceof TemplateInstance &&
            this.value.template === template) {
            this.value.update(value.values);
        }
        else {
            // Make sure we propagate the template processor from the TemplateResult
            // so that we use its syntax extension, etc. The template factory comes
            // from the render function options so that it can control template
            // caching and preprocessing.
            const instance = new TemplateInstance(template, value.processor, this.options);
            const fragment = instance._clone();
            instance.update(value.values);
            this.__commitNode(fragment);
            this.value = instance;
        }
    }
    __commitIterable(value) {
        // For an Iterable, we create a new InstancePart per item, then set its
        // value to the item. This is a little bit of overhead for every item in
        // an Iterable, but it lets us recurse easily and efficiently update Arrays
        // of TemplateResults that will be commonly returned from expressions like:
        // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
        // If _value is an array, then the previous render was of an
        // iterable and _value will contain the NodeParts from the previous
        // render. If _value is not an array, clear this part and make a new
        // array for NodeParts.
        if (!Array.isArray(this.value)) {
            this.value = [];
            this.clear();
        }
        // Lets us keep track of how many items we stamped so we can clear leftover
        // items from a previous render
        const itemParts = this.value;
        let partIndex = 0;
        let itemPart;
        for (const item of value) {
            // Try to reuse an existing part
            itemPart = itemParts[partIndex];
            // If no existing part, create a new one
            if (itemPart === undefined) {
                itemPart = new NodePart(this.options);
                itemParts.push(itemPart);
                if (partIndex === 0) {
                    itemPart.appendIntoPart(this);
                }
                else {
                    itemPart.insertAfterPart(itemParts[partIndex - 1]);
                }
            }
            itemPart.setValue(item);
            itemPart.commit();
            partIndex++;
        }
        if (partIndex < itemParts.length) {
            // Truncate the parts array so _value reflects the current state
            itemParts.length = partIndex;
            this.clear(itemPart && itemPart.endNode);
        }
    }
    clear(startNode = this.startNode) {
        removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
    }
}
/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */
class BooleanAttributePart {
    constructor(element, name, strings) {
        this.value = undefined;
        this.__pendingValue = undefined;
        if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
            throw new Error('Boolean attributes can only contain a single expression');
        }
        this.element = element;
        this.name = name;
        this.strings = strings;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while (isDirective(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        if (this.__pendingValue === noChange) {
            return;
        }
        const value = !!this.__pendingValue;
        if (this.value !== value) {
            if (value) {
                this.element.setAttribute(this.name, '');
            }
            else {
                this.element.removeAttribute(this.name);
            }
            this.value = value;
        }
        this.__pendingValue = noChange;
    }
}
/**
 * Sets attribute values for PropertyParts, so that the value is only set once
 * even if there are multiple parts for a property.
 *
 * If an expression controls the whole property value, then the value is simply
 * assigned to the property under control. If there are string literals or
 * multiple expressions, then the strings are expressions are interpolated into
 * a string first.
 */
class PropertyCommitter extends AttributeCommitter {
    constructor(element, name, strings) {
        super(element, name, strings);
        this.single =
            (strings.length === 2 && strings[0] === '' && strings[1] === '');
    }
    _createPart() {
        return new PropertyPart(this);
    }
    _getValue() {
        if (this.single) {
            return this.parts[0].value;
        }
        return super._getValue();
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            // tslint:disable-next-line:no-any
            this.element[this.name] = this._getValue();
        }
    }
}
class PropertyPart extends AttributePart {
}
// Detect event listener options support. If the `capture` property is read
// from the options object, then options are supported. If not, then the thrid
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.
let eventOptionsSupported = false;
try {
    const options = {
        get capture() {
            eventOptionsSupported = true;
            return false;
        }
    };
    // tslint:disable-next-line:no-any
    window.addEventListener('test', options, options);
    // tslint:disable-next-line:no-any
    window.removeEventListener('test', options, options);
}
catch (_e) {
}
class EventPart {
    constructor(element, eventName, eventContext) {
        this.value = undefined;
        this.__pendingValue = undefined;
        this.element = element;
        this.eventName = eventName;
        this.eventContext = eventContext;
        this.__boundHandleEvent = (e) => this.handleEvent(e);
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while (isDirective(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        if (this.__pendingValue === noChange) {
            return;
        }
        const newListener = this.__pendingValue;
        const oldListener = this.value;
        const shouldRemoveListener = newListener == null ||
            oldListener != null &&
                (newListener.capture !== oldListener.capture ||
                    newListener.once !== oldListener.once ||
                    newListener.passive !== oldListener.passive);
        const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
        if (shouldRemoveListener) {
            this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
        }
        if (shouldAddListener) {
            this.__options = getOptions(newListener);
            this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
        }
        this.value = newListener;
        this.__pendingValue = noChange;
    }
    handleEvent(event) {
        if (typeof this.value === 'function') {
            this.value.call(this.eventContext || this.element, event);
        }
        else {
            this.value.handleEvent(event);
        }
    }
}
// We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.
const getOptions = (o) => o &&
    (eventOptionsSupported ?
        { capture: o.capture, passive: o.passive, once: o.once } :
        o.capture);
//# sourceMappingURL=parts.js.map

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
 */
class DefaultTemplateProcessor {
    /**
     * Create parts for an attribute-position binding, given the event, attribute
     * name, and string literals.
     *
     * @param element The element containing the binding
     * @param name  The attribute name
     * @param strings The string literals. There are always at least two strings,
     *   event for fully-controlled bindings with a single expression.
     */
    handleAttributeExpressions(element, name, strings, options) {
        const prefix = name[0];
        if (prefix === '.') {
            const committer = new PropertyCommitter(element, name.slice(1), strings);
            return committer.parts;
        }
        if (prefix === '@') {
            return [new EventPart(element, name.slice(1), options.eventContext)];
        }
        if (prefix === '?') {
            return [new BooleanAttributePart(element, name.slice(1), strings)];
        }
        const committer = new AttributeCommitter(element, name, strings);
        return committer.parts;
    }
    /**
     * Create parts for a text-position binding.
     * @param templateFactory
     */
    handleTextExpression(options) {
        return new NodePart(options);
    }
}
const defaultTemplateProcessor = new DefaultTemplateProcessor();
//# sourceMappingURL=default-template-processor.js.map

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
 */
function templateFactory(result) {
    let templateCache = templateCaches.get(result.type);
    if (templateCache === undefined) {
        templateCache = {
            stringsArray: new WeakMap(),
            keyString: new Map()
        };
        templateCaches.set(result.type, templateCache);
    }
    let template = templateCache.stringsArray.get(result.strings);
    if (template !== undefined) {
        return template;
    }
    // If the TemplateStringsArray is new, generate a key from the strings
    // This key is shared between all templates with identical content
    const key = result.strings.join(marker);
    // Check if we already have a Template for this key
    template = templateCache.keyString.get(key);
    if (template === undefined) {
        // If we have not seen this key before, create a new Template
        template = new Template(result, result.getTemplateElement());
        // Cache the Template for this key
        templateCache.keyString.set(key, template);
    }
    // Cache all future queries for this TemplateStringsArray
    templateCache.stringsArray.set(result.strings, template);
    return template;
}
const templateCaches = new Map();
//# sourceMappingURL=template-factory.js.map

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
const parts = new WeakMap();
/**
 * Renders a template result or other value to a container.
 *
 * To update a container with new values, reevaluate the template literal and
 * call `render` with the new result.
 *
 * @param result Any value renderable by NodePart - typically a TemplateResult
 *     created by evaluating a template tag like `html` or `svg`.
 * @param container A DOM parent to render to. The entire contents are either
 *     replaced, or efficiently updated if the same result type was previous
 *     rendered there.
 * @param options RenderOptions for the entire render tree rendered to this
 *     container. Render options must *not* change between renders to the same
 *     container, as those changes will not effect previously rendered DOM.
 */
const render = (result, container, options) => {
    let part = parts.get(container);
    if (part === undefined) {
        removeNodes(container, container.firstChild);
        parts.set(container, part = new NodePart(Object.assign({ templateFactory }, options)));
        part.appendInto(container);
    }
    part.setValue(result);
    part.commit();
};
//# sourceMappingURL=render.js.map

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
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time
(window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.1.2');
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */
const html = (strings, ...values) => new TemplateResult(strings, values, 'html', defaultTemplateProcessor);
//# sourceMappingURL=lit-html.js.map

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
const walkerNodeFilter = 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */;
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
function removeNodesFromTemplate(template, nodesToRemove) {
    const { element: { content }, parts } = template;
    const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
    let partIndex = nextActiveIndexInTemplateParts(parts);
    let part = parts[partIndex];
    let nodeIndex = -1;
    let removeCount = 0;
    const nodesToRemoveInTemplate = [];
    let currentRemovingNode = null;
    while (walker.nextNode()) {
        nodeIndex++;
        const node = walker.currentNode;
        // End removal if stepped past the removing node
        if (node.previousSibling === currentRemovingNode) {
            currentRemovingNode = null;
        }
        // A node to remove was found in the template
        if (nodesToRemove.has(node)) {
            nodesToRemoveInTemplate.push(node);
            // Track node we're removing
            if (currentRemovingNode === null) {
                currentRemovingNode = node;
            }
        }
        // When removing, increment count by which to adjust subsequent part indices
        if (currentRemovingNode !== null) {
            removeCount++;
        }
        while (part !== undefined && part.index === nodeIndex) {
            // If part is in a removed node deactivate it by setting index to -1 or
            // adjust the index as needed.
            part.index = currentRemovingNode !== null ? -1 : part.index - removeCount;
            // go to the next active part.
            partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
            part = parts[partIndex];
        }
    }
    nodesToRemoveInTemplate.forEach((n) => n.parentNode.removeChild(n));
}
const countNodes = (node) => {
    let count = (node.nodeType === 11 /* Node.DOCUMENT_FRAGMENT_NODE */) ? 0 : 1;
    const walker = document.createTreeWalker(node, walkerNodeFilter, null, false);
    while (walker.nextNode()) {
        count++;
    }
    return count;
};
const nextActiveIndexInTemplateParts = (parts, startIndex = -1) => {
    for (let i = startIndex + 1; i < parts.length; i++) {
        const part = parts[i];
        if (isTemplatePartActive(part)) {
            return i;
        }
    }
    return -1;
};
/**
 * Inserts the given node into the Template, optionally before the given
 * refNode. In addition to inserting the node into the Template, the Template
 * part indices are updated to match the mutated Template DOM.
 */
function insertNodeIntoTemplate(template, node, refNode = null) {
    const { element: { content }, parts } = template;
    // If there's no refNode, then put node at end of template.
    // No part indices need to be shifted in this case.
    if (refNode === null || refNode === undefined) {
        content.appendChild(node);
        return;
    }
    const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
    let partIndex = nextActiveIndexInTemplateParts(parts);
    let insertCount = 0;
    let walkerIndex = -1;
    while (walker.nextNode()) {
        walkerIndex++;
        const walkerNode = walker.currentNode;
        if (walkerNode === refNode) {
            insertCount = countNodes(node);
            refNode.parentNode.insertBefore(node, refNode);
        }
        while (partIndex !== -1 && parts[partIndex].index === walkerIndex) {
            // If we've inserted the node, simply adjust all subsequent parts
            if (insertCount > 0) {
                while (partIndex !== -1) {
                    parts[partIndex].index += insertCount;
                    partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
                }
                return;
            }
            partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
        }
    }
}
//# sourceMappingURL=modify-template.js.map

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
// Get a key to lookup in `templateCaches`.
const getTemplateCacheKey = (type, scopeName) => `${type}--${scopeName}`;
let compatibleShadyCSSVersion = true;
if (typeof window.ShadyCSS === 'undefined') {
    compatibleShadyCSSVersion = false;
}
else if (typeof window.ShadyCSS.prepareTemplateDom === 'undefined') {
    console.warn(`Incompatible ShadyCSS version detected. ` +
        `Please update to at least @webcomponents/webcomponentsjs@2.0.2 and ` +
        `@webcomponents/shadycss@1.3.1.`);
    compatibleShadyCSSVersion = false;
}
/**
 * Template factory which scopes template DOM using ShadyCSS.
 * @param scopeName {string}
 */
const shadyTemplateFactory = (scopeName) => (result) => {
    const cacheKey = getTemplateCacheKey(result.type, scopeName);
    let templateCache = templateCaches.get(cacheKey);
    if (templateCache === undefined) {
        templateCache = {
            stringsArray: new WeakMap(),
            keyString: new Map()
        };
        templateCaches.set(cacheKey, templateCache);
    }
    let template = templateCache.stringsArray.get(result.strings);
    if (template !== undefined) {
        return template;
    }
    const key = result.strings.join(marker);
    template = templateCache.keyString.get(key);
    if (template === undefined) {
        const element = result.getTemplateElement();
        if (compatibleShadyCSSVersion) {
            window.ShadyCSS.prepareTemplateDom(element, scopeName);
        }
        template = new Template(result, element);
        templateCache.keyString.set(key, template);
    }
    templateCache.stringsArray.set(result.strings, template);
    return template;
};
const TEMPLATE_TYPES = ['html', 'svg'];
/**
 * Removes all style elements from Templates for the given scopeName.
 */
const removeStylesFromLitTemplates = (scopeName) => {
    TEMPLATE_TYPES.forEach((type) => {
        const templates = templateCaches.get(getTemplateCacheKey(type, scopeName));
        if (templates !== undefined) {
            templates.keyString.forEach((template) => {
                const { element: { content } } = template;
                // IE 11 doesn't support the iterable param Set constructor
                const styles = new Set();
                Array.from(content.querySelectorAll('style')).forEach((s) => {
                    styles.add(s);
                });
                removeNodesFromTemplate(template, styles);
            });
        }
    });
};
const shadyRenderSet = new Set();
/**
 * For the given scope name, ensures that ShadyCSS style scoping is performed.
 * This is done just once per scope name so the fragment and template cannot
 * be modified.
 * (1) extracts styles from the rendered fragment and hands them to ShadyCSS
 * to be scoped and appended to the document
 * (2) removes style elements from all lit-html Templates for this scope name.
 *
 * Note, <style> elements can only be placed into templates for the
 * initial rendering of the scope. If <style> elements are included in templates
 * dynamically rendered to the scope (after the first scope render), they will
 * not be scoped and the <style> will be left in the template and rendered
 * output.
 */
const prepareTemplateStyles = (scopeName, renderedDOM, template) => {
    shadyRenderSet.add(scopeName);
    // If `renderedDOM` is stamped from a Template, then we need to edit that
    // Template's underlying template element. Otherwise, we create one here
    // to give to ShadyCSS, which still requires one while scoping.
    const templateElement = !!template ? template.element : document.createElement('template');
    // Move styles out of rendered DOM and store.
    const styles = renderedDOM.querySelectorAll('style');
    const { length } = styles;
    // If there are no styles, skip unnecessary work
    if (length === 0) {
        // Ensure prepareTemplateStyles is called to support adding
        // styles via `prepareAdoptedCssText` since that requires that
        // `prepareTemplateStyles` is called.
        //
        // ShadyCSS will only update styles containing @apply in the template
        // given to `prepareTemplateStyles`. If no lit Template was given,
        // ShadyCSS will not be able to update uses of @apply in any relevant
        // template. However, this is not a problem because we only create the
        // template for the purpose of supporting `prepareAdoptedCssText`,
        // which doesn't support @apply at all.
        window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
        return;
    }
    const condensedStyle = document.createElement('style');
    // Collect styles into a single style. This helps us make sure ShadyCSS
    // manipulations will not prevent us from being able to fix up template
    // part indices.
    // NOTE: collecting styles is inefficient for browsers but ShadyCSS
    // currently does this anyway. When it does not, this should be changed.
    for (let i = 0; i < length; i++) {
        const style = styles[i];
        style.parentNode.removeChild(style);
        condensedStyle.textContent += style.textContent;
    }
    // Remove styles from nested templates in this scope.
    removeStylesFromLitTemplates(scopeName);
    // And then put the condensed style into the "root" template passed in as
    // `template`.
    const content = templateElement.content;
    if (!!template) {
        insertNodeIntoTemplate(template, condensedStyle, content.firstChild);
    }
    else {
        content.insertBefore(condensedStyle, content.firstChild);
    }
    // Note, it's important that ShadyCSS gets the template that `lit-html`
    // will actually render so that it can update the style inside when
    // needed (e.g. @apply native Shadow DOM case).
    window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
    const style = content.querySelector('style');
    if (window.ShadyCSS.nativeShadow && style !== null) {
        // When in native Shadow DOM, ensure the style created by ShadyCSS is
        // included in initially rendered output (`renderedDOM`).
        renderedDOM.insertBefore(style.cloneNode(true), renderedDOM.firstChild);
    }
    else if (!!template) {
        // When no style is left in the template, parts will be broken as a
        // result. To fix this, we put back the style node ShadyCSS removed
        // and then tell lit to remove that node from the template.
        // There can be no style in the template in 2 cases (1) when Shady DOM
        // is in use, ShadyCSS removes all styles, (2) when native Shadow DOM
        // is in use ShadyCSS removes the style if it contains no content.
        // NOTE, ShadyCSS creates its own style so we can safely add/remove
        // `condensedStyle` here.
        content.insertBefore(condensedStyle, content.firstChild);
        const removes = new Set();
        removes.add(condensedStyle);
        removeNodesFromTemplate(template, removes);
    }
};
/**
 * Extension to the standard `render` method which supports rendering
 * to ShadowRoots when the ShadyDOM (https://github.com/webcomponents/shadydom)
 * and ShadyCSS (https://github.com/webcomponents/shadycss) polyfills are used
 * or when the webcomponentsjs
 * (https://github.com/webcomponents/webcomponentsjs) polyfill is used.
 *
 * Adds a `scopeName` option which is used to scope element DOM and stylesheets
 * when native ShadowDOM is unavailable. The `scopeName` will be added to
 * the class attribute of all rendered DOM. In addition, any style elements will
 * be automatically re-written with this `scopeName` selector and moved out
 * of the rendered DOM and into the document `<head>`.
 *
 * It is common to use this render method in conjunction with a custom element
 * which renders a shadowRoot. When this is done, typically the element's
 * `localName` should be used as the `scopeName`.
 *
 * In addition to DOM scoping, ShadyCSS also supports a basic shim for css
 * custom properties (needed only on older browsers like IE11) and a shim for
 * a deprecated feature called `@apply` that supports applying a set of css
 * custom properties to a given location.
 *
 * Usage considerations:
 *
 * * Part values in `<style>` elements are only applied the first time a given
 * `scopeName` renders. Subsequent changes to parts in style elements will have
 * no effect. Because of this, parts in style elements should only be used for
 * values that will never change, for example parts that set scope-wide theme
 * values or parts which render shared style elements.
 *
 * * Note, due to a limitation of the ShadyDOM polyfill, rendering in a
 * custom element's `constructor` is not supported. Instead rendering should
 * either done asynchronously, for example at microtask timing (for example
 * `Promise.resolve()`), or be deferred until the first time the element's
 * `connectedCallback` runs.
 *
 * Usage considerations when using shimmed custom properties or `@apply`:
 *
 * * Whenever any dynamic changes are made which affect
 * css custom properties, `ShadyCSS.styleElement(element)` must be called
 * to update the element. There are two cases when this is needed:
 * (1) the element is connected to a new parent, (2) a class is added to the
 * element that causes it to match different custom properties.
 * To address the first case when rendering a custom element, `styleElement`
 * should be called in the element's `connectedCallback`.
 *
 * * Shimmed custom properties may only be defined either for an entire
 * shadowRoot (for example, in a `:host` rule) or via a rule that directly
 * matches an element with a shadowRoot. In other words, instead of flowing from
 * parent to child as do native css custom properties, shimmed custom properties
 * flow only from shadowRoots to nested shadowRoots.
 *
 * * When using `@apply` mixing css shorthand property names with
 * non-shorthand names (for example `border` and `border-width`) is not
 * supported.
 */
const render$1 = (result, container, options) => {
    if (!options || typeof options !== 'object' || !options.scopeName) {
        throw new Error('The `scopeName` option is required.');
    }
    const scopeName = options.scopeName;
    const hasRendered = parts.has(container);
    const needsScoping = compatibleShadyCSSVersion &&
        container.nodeType === 11 /* Node.DOCUMENT_FRAGMENT_NODE */ &&
        !!container.host;
    // Handle first render to a scope specially...
    const firstScopeRender = needsScoping && !shadyRenderSet.has(scopeName);
    // On first scope render, render into a fragment; this cannot be a single
    // fragment that is reused since nested renders can occur synchronously.
    const renderContainer = firstScopeRender ? document.createDocumentFragment() : container;
    render(result, renderContainer, Object.assign({ templateFactory: shadyTemplateFactory(scopeName) }, options));
    // When performing first scope render,
    // (1) We've rendered into a fragment so that there's a chance to
    // `prepareTemplateStyles` before sub-elements hit the DOM
    // (which might cause them to render based on a common pattern of
    // rendering in a custom element's `connectedCallback`);
    // (2) Scope the template with ShadyCSS one time only for this scope.
    // (3) Render the fragment into the container and make sure the
    // container knows its `part` is the one we just rendered. This ensures
    // DOM will be re-used on subsequent renders.
    if (firstScopeRender) {
        const part = parts.get(renderContainer);
        parts.delete(renderContainer);
        // ShadyCSS might have style sheets (e.g. from `prepareAdoptedCssText`)
        // that should apply to `renderContainer` even if the rendered value is
        // not a TemplateInstance. However, it will only insert scoped styles
        // into the document if `prepareTemplateStyles` has already been called
        // for the given scope name.
        const template = part.value instanceof TemplateInstance ?
            part.value.template :
            undefined;
        prepareTemplateStyles(scopeName, renderContainer, template);
        removeNodes(container, container.firstChild);
        container.appendChild(renderContainer);
        parts.set(container, part);
    }
    // After elements have hit the DOM, update styling if this is the
    // initial render to this container.
    // This is needed whenever dynamic changes are made so it would be
    // safest to do every render; however, this would regress performance
    // so we leave it up to the user to call `ShadyCSS.styleElement`
    // for dynamic changes.
    if (!hasRendered && needsScoping) {
        window.ShadyCSS.styleElement(container.host);
    }
};
//# sourceMappingURL=shady-render.js.map

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
var _a;
/**
 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
 * replaced at compile time by the munged name for object[property]. We cannot
 * alias this function, so we have to use a small shim that has the same
 * behavior when not compiling.
 */
window.JSCompiler_renameProperty =
    (prop, _obj) => prop;
const defaultConverter = {
    toAttribute(value, type) {
        switch (type) {
            case Boolean:
                return value ? '' : null;
            case Object:
            case Array:
                // if the value is `null` or `undefined` pass this through
                // to allow removing/no change behavior.
                return value == null ? value : JSON.stringify(value);
        }
        return value;
    },
    fromAttribute(value, type) {
        switch (type) {
            case Boolean:
                return value !== null;
            case Number:
                return value === null ? null : Number(value);
            case Object:
            case Array:
                return JSON.parse(value);
        }
        return value;
    }
};
/**
 * Change function that returns true if `value` is different from `oldValue`.
 * This method is used as the default for a property's `hasChanged` function.
 */
const notEqual = (value, old) => {
    // This ensures (old==NaN, value==NaN) always returns false
    return old !== value && (old === old || value === value);
};
const defaultPropertyDeclaration = {
    attribute: true,
    type: String,
    converter: defaultConverter,
    reflect: false,
    hasChanged: notEqual
};
const microtaskPromise = Promise.resolve(true);
const STATE_HAS_UPDATED = 1;
const STATE_UPDATE_REQUESTED = 1 << 2;
const STATE_IS_REFLECTING_TO_ATTRIBUTE = 1 << 3;
const STATE_IS_REFLECTING_TO_PROPERTY = 1 << 4;
const STATE_HAS_CONNECTED = 1 << 5;
/**
 * The Closure JS Compiler doesn't currently have good support for static
 * property semantics where "this" is dynamic (e.g.
 * https://github.com/google/closure-compiler/issues/3177 and others) so we use
 * this hack to bypass any rewriting by the compiler.
 */
const finalized = 'finalized';
/**
 * Base element class which manages element properties and attributes. When
 * properties change, the `update` method is asynchronously called. This method
 * should be supplied by subclassers to render updates as desired.
 */
class UpdatingElement extends HTMLElement {
    constructor() {
        super();
        this._updateState = 0;
        this._instanceProperties = undefined;
        this._updatePromise = microtaskPromise;
        this._hasConnectedResolver = undefined;
        /**
         * Map with keys for any properties that have changed since the last
         * update cycle with previous values.
         */
        this._changedProperties = new Map();
        /**
         * Map with keys of properties that should be reflected when updated.
         */
        this._reflectingProperties = undefined;
        this.initialize();
    }
    /**
     * Returns a list of attributes corresponding to the registered properties.
     * @nocollapse
     */
    static get observedAttributes() {
        // note: piggy backing on this to ensure we're finalized.
        this.finalize();
        const attributes = [];
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        this._classProperties.forEach((v, p) => {
            const attr = this._attributeNameForProperty(p, v);
            if (attr !== undefined) {
                this._attributeToPropertyMap.set(attr, p);
                attributes.push(attr);
            }
        });
        return attributes;
    }
    /**
     * Ensures the private `_classProperties` property metadata is created.
     * In addition to `finalize` this is also called in `createProperty` to
     * ensure the `@property` decorator can add property metadata.
     */
    /** @nocollapse */
    static _ensureClassProperties() {
        // ensure private storage for property declarations.
        if (!this.hasOwnProperty(JSCompiler_renameProperty('_classProperties', this))) {
            this._classProperties = new Map();
            // NOTE: Workaround IE11 not supporting Map constructor argument.
            const superProperties = Object.getPrototypeOf(this)._classProperties;
            if (superProperties !== undefined) {
                superProperties.forEach((v, k) => this._classProperties.set(k, v));
            }
        }
    }
    /**
     * Creates a property accessor on the element prototype if one does not exist.
     * The property setter calls the property's `hasChanged` property option
     * or uses a strict identity check to determine whether or not to request
     * an update.
     * @nocollapse
     */
    static createProperty(name, options = defaultPropertyDeclaration) {
        // Note, since this can be called by the `@property` decorator which
        // is called before `finalize`, we ensure storage exists for property
        // metadata.
        this._ensureClassProperties();
        this._classProperties.set(name, options);
        // Do not generate an accessor if the prototype already has one, since
        // it would be lost otherwise and that would never be the user's intention;
        // Instead, we expect users to call `requestUpdate` themselves from
        // user-defined accessors. Note that if the super has an accessor we will
        // still overwrite it
        if (options.noAccessor || this.prototype.hasOwnProperty(name)) {
            return;
        }
        const key = typeof name === 'symbol' ? Symbol() : `__${name}`;
        Object.defineProperty(this.prototype, name, {
            // tslint:disable-next-line:no-any no symbol in index
            get() {
                return this[key];
            },
            set(value) {
                const oldValue = this[name];
                this[key] = value;
                this._requestUpdate(name, oldValue);
            },
            configurable: true,
            enumerable: true
        });
    }
    /**
     * Creates property accessors for registered properties and ensures
     * any superclasses are also finalized.
     * @nocollapse
     */
    static finalize() {
        // finalize any superclasses
        const superCtor = Object.getPrototypeOf(this);
        if (!superCtor.hasOwnProperty(finalized)) {
            superCtor.finalize();
        }
        this[finalized] = true;
        this._ensureClassProperties();
        // initialize Map populated in observedAttributes
        this._attributeToPropertyMap = new Map();
        // make any properties
        // Note, only process "own" properties since this element will inherit
        // any properties defined on the superClass, and finalization ensures
        // the entire prototype chain is finalized.
        if (this.hasOwnProperty(JSCompiler_renameProperty('properties', this))) {
            const props = this.properties;
            // support symbols in properties (IE11 does not support this)
            const propKeys = [
                ...Object.getOwnPropertyNames(props),
                ...(typeof Object.getOwnPropertySymbols === 'function') ?
                    Object.getOwnPropertySymbols(props) :
                    []
            ];
            // This for/of is ok because propKeys is an array
            for (const p of propKeys) {
                // note, use of `any` is due to TypeSript lack of support for symbol in
                // index types
                // tslint:disable-next-line:no-any no symbol in index
                this.createProperty(p, props[p]);
            }
        }
    }
    /**
     * Returns the property name for the given attribute `name`.
     * @nocollapse
     */
    static _attributeNameForProperty(name, options) {
        const attribute = options.attribute;
        return attribute === false ?
            undefined :
            (typeof attribute === 'string' ?
                attribute :
                (typeof name === 'string' ? name.toLowerCase() : undefined));
    }
    /**
     * Returns true if a property should request an update.
     * Called when a property value is set and uses the `hasChanged`
     * option for the property if present or a strict identity check.
     * @nocollapse
     */
    static _valueHasChanged(value, old, hasChanged = notEqual) {
        return hasChanged(value, old);
    }
    /**
     * Returns the property value for the given attribute value.
     * Called via the `attributeChangedCallback` and uses the property's
     * `converter` or `converter.fromAttribute` property option.
     * @nocollapse
     */
    static _propertyValueFromAttribute(value, options) {
        const type = options.type;
        const converter = options.converter || defaultConverter;
        const fromAttribute = (typeof converter === 'function' ? converter : converter.fromAttribute);
        return fromAttribute ? fromAttribute(value, type) : value;
    }
    /**
     * Returns the attribute value for the given property value. If this
     * returns undefined, the property will *not* be reflected to an attribute.
     * If this returns null, the attribute will be removed, otherwise the
     * attribute will be set to the value.
     * This uses the property's `reflect` and `type.toAttribute` property options.
     * @nocollapse
     */
    static _propertyValueToAttribute(value, options) {
        if (options.reflect === undefined) {
            return;
        }
        const type = options.type;
        const converter = options.converter;
        const toAttribute = converter && converter.toAttribute ||
            defaultConverter.toAttribute;
        return toAttribute(value, type);
    }
    /**
     * Performs element initialization. By default captures any pre-set values for
     * registered properties.
     */
    initialize() {
        this._saveInstanceProperties();
        // ensures first update will be caught by an early access of
        // `updateComplete`
        this._requestUpdate();
    }
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
     */
    _saveInstanceProperties() {
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        this.constructor
            ._classProperties.forEach((_v, p) => {
            if (this.hasOwnProperty(p)) {
                const value = this[p];
                delete this[p];
                if (!this._instanceProperties) {
                    this._instanceProperties = new Map();
                }
                this._instanceProperties.set(p, value);
            }
        });
    }
    /**
     * Applies previously saved instance properties.
     */
    _applyInstanceProperties() {
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        // tslint:disable-next-line:no-any
        this._instanceProperties.forEach((v, p) => this[p] = v);
        this._instanceProperties = undefined;
    }
    connectedCallback() {
        this._updateState = this._updateState | STATE_HAS_CONNECTED;
        // Ensure first connection completes an update. Updates cannot complete
        // before connection and if one is pending connection the
        // `_hasConnectionResolver` will exist. If so, resolve it to complete the
        // update, otherwise requestUpdate.
        if (this._hasConnectedResolver) {
            this._hasConnectedResolver();
            this._hasConnectedResolver = undefined;
        }
    }
    /**
     * Allows for `super.disconnectedCallback()` in extensions while
     * reserving the possibility of making non-breaking feature additions
     * when disconnecting at some point in the future.
     */
    disconnectedCallback() {
    }
    /**
     * Synchronizes property values when attributes change.
     */
    attributeChangedCallback(name, old, value) {
        if (old !== value) {
            this._attributeToProperty(name, value);
        }
    }
    _propertyToAttribute(name, value, options = defaultPropertyDeclaration) {
        const ctor = this.constructor;
        const attr = ctor._attributeNameForProperty(name, options);
        if (attr !== undefined) {
            const attrValue = ctor._propertyValueToAttribute(value, options);
            // an undefined value does not change the attribute.
            if (attrValue === undefined) {
                return;
            }
            // Track if the property is being reflected to avoid
            // setting the property again via `attributeChangedCallback`. Note:
            // 1. this takes advantage of the fact that the callback is synchronous.
            // 2. will behave incorrectly if multiple attributes are in the reaction
            // stack at time of calling. However, since we process attributes
            // in `update` this should not be possible (or an extreme corner case
            // that we'd like to discover).
            // mark state reflecting
            this._updateState = this._updateState | STATE_IS_REFLECTING_TO_ATTRIBUTE;
            if (attrValue == null) {
                this.removeAttribute(attr);
            }
            else {
                this.setAttribute(attr, attrValue);
            }
            // mark state not reflecting
            this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE;
        }
    }
    _attributeToProperty(name, value) {
        // Use tracking info to avoid deserializing attribute value if it was
        // just set from a property setter.
        if (this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE) {
            return;
        }
        const ctor = this.constructor;
        const propName = ctor._attributeToPropertyMap.get(name);
        if (propName !== undefined) {
            const options = ctor._classProperties.get(propName) || defaultPropertyDeclaration;
            // mark state reflecting
            this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY;
            this[propName] =
                // tslint:disable-next-line:no-any
                ctor._propertyValueFromAttribute(value, options);
            // mark state not reflecting
            this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY;
        }
    }
    /**
     * This private version of `requestUpdate` does not access or return the
     * `updateComplete` promise. This promise can be overridden and is therefore
     * not free to access.
     */
    _requestUpdate(name, oldValue) {
        let shouldRequestUpdate = true;
        // If we have a property key, perform property update steps.
        if (name !== undefined) {
            const ctor = this.constructor;
            const options = ctor._classProperties.get(name) || defaultPropertyDeclaration;
            if (ctor._valueHasChanged(this[name], oldValue, options.hasChanged)) {
                if (!this._changedProperties.has(name)) {
                    this._changedProperties.set(name, oldValue);
                }
                // Add to reflecting properties set.
                // Note, it's important that every change has a chance to add the
                // property to `_reflectingProperties`. This ensures setting
                // attribute + property reflects correctly.
                if (options.reflect === true &&
                    !(this._updateState & STATE_IS_REFLECTING_TO_PROPERTY)) {
                    if (this._reflectingProperties === undefined) {
                        this._reflectingProperties = new Map();
                    }
                    this._reflectingProperties.set(name, options);
                }
            }
            else {
                // Abort the request if the property should not be considered changed.
                shouldRequestUpdate = false;
            }
        }
        if (!this._hasRequestedUpdate && shouldRequestUpdate) {
            this._enqueueUpdate();
        }
    }
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
     */
    requestUpdate(name, oldValue) {
        this._requestUpdate(name, oldValue);
        return this.updateComplete;
    }
    /**
     * Sets up the element to asynchronously update.
     */
    async _enqueueUpdate() {
        // Mark state updating...
        this._updateState = this._updateState | STATE_UPDATE_REQUESTED;
        let resolve;
        let reject;
        const previousUpdatePromise = this._updatePromise;
        this._updatePromise = new Promise((res, rej) => {
            resolve = res;
            reject = rej;
        });
        try {
            // Ensure any previous update has resolved before updating.
            // This `await` also ensures that property changes are batched.
            await previousUpdatePromise;
        }
        catch (e) {
            // Ignore any previous errors. We only care that the previous cycle is
            // done. Any error should have been handled in the previous update.
        }
        // Make sure the element has connected before updating.
        if (!this._hasConnected) {
            await new Promise((res) => this._hasConnectedResolver = res);
        }
        try {
            const result = this.performUpdate();
            // If `performUpdate` returns a Promise, we await it. This is done to
            // enable coordinating updates with a scheduler. Note, the result is
            // checked to avoid delaying an additional microtask unless we need to.
            if (result != null) {
                await result;
            }
        }
        catch (e) {
            reject(e);
        }
        resolve(!this._hasRequestedUpdate);
    }
    get _hasConnected() {
        return (this._updateState & STATE_HAS_CONNECTED);
    }
    get _hasRequestedUpdate() {
        return (this._updateState & STATE_UPDATE_REQUESTED);
    }
    get hasUpdated() {
        return (this._updateState & STATE_HAS_UPDATED);
    }
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
     */
    performUpdate() {
        // Mixin instance properties once, if they exist.
        if (this._instanceProperties) {
            this._applyInstanceProperties();
        }
        let shouldUpdate = false;
        const changedProperties = this._changedProperties;
        try {
            shouldUpdate = this.shouldUpdate(changedProperties);
            if (shouldUpdate) {
                this.update(changedProperties);
            }
        }
        catch (e) {
            // Prevent `firstUpdated` and `updated` from running when there's an
            // update exception.
            shouldUpdate = false;
            throw e;
        }
        finally {
            // Ensure element can accept additional updates after an exception.
            this._markUpdated();
        }
        if (shouldUpdate) {
            if (!(this._updateState & STATE_HAS_UPDATED)) {
                this._updateState = this._updateState | STATE_HAS_UPDATED;
                this.firstUpdated(changedProperties);
            }
            this.updated(changedProperties);
        }
    }
    _markUpdated() {
        this._changedProperties = new Map();
        this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;
    }
    /**
     * Returns a Promise that resolves when the element has completed updating.
     * The Promise value is a boolean that is `true` if the element completed the
     * update without triggering another update. The Promise result is `false` if
     * a property was set inside `updated()`. If the Promise is rejected, an
     * exception was thrown during the update.
     *
     * To await additional asynchronous work, override the `_getUpdateComplete`
     * method. For example, it is sometimes useful to await a rendered element
     * before fulfilling this Promise. To do this, first await
     * `super._getUpdateComplete()`, then any subsequent state.
     *
     * @returns {Promise} The Promise returns a boolean that indicates if the
     * update resolved without triggering another update.
     */
    get updateComplete() {
        return this._getUpdateComplete();
    }
    /**
     * Override point for the `updateComplete` promise.
     *
     * It is not safe to override the `updateComplete` getter directly due to a
     * limitation in TypeScript which means it is not possible to call a
     * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
     * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
     * This method should be overridden instead. For example:
     *
     *   class MyElement extends LitElement {
     *     async _getUpdateComplete() {
     *       await super._getUpdateComplete();
     *       await this._myChild.updateComplete;
     *     }
     *   }
     */
    _getUpdateComplete() {
        return this._updatePromise;
    }
    /**
     * Controls whether or not `update` should be called when the element requests
     * an update. By default, this method always returns `true`, but this can be
     * customized to control when to update.
     *
     * * @param _changedProperties Map of changed properties with old values
     */
    shouldUpdate(_changedProperties) {
        return true;
    }
    /**
     * Updates the element. This method reflects property values to attributes.
     * It can be overridden to render and keep updated element DOM.
     * Setting properties inside this method will *not* trigger
     * another update.
     *
     * * @param _changedProperties Map of changed properties with old values
     */
    update(_changedProperties) {
        if (this._reflectingProperties !== undefined &&
            this._reflectingProperties.size > 0) {
            // Use forEach so this works even if for/of loops are compiled to for
            // loops expecting arrays
            this._reflectingProperties.forEach((v, k) => this._propertyToAttribute(k, this[k], v));
            this._reflectingProperties = undefined;
        }
    }
    /**
     * Invoked whenever the element is updated. Implement to perform
     * post-updating tasks via DOM APIs, for example, focusing an element.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * * @param _changedProperties Map of changed properties with old values
     */
    updated(_changedProperties) {
    }
    /**
     * Invoked when the element is first updated. Implement to perform one time
     * work on the element after update.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * * @param _changedProperties Map of changed properties with old values
     */
    firstUpdated(_changedProperties) {
    }
}
_a = finalized;
/**
 * Marks class as having finished creating properties.
 */
UpdatingElement[_a] = true;
//# sourceMappingURL=updating-element.js.map

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
const supportsAdoptingStyleSheets = ('adoptedStyleSheets' in Document.prototype) &&
    ('replace' in CSSStyleSheet.prototype);
const constructionToken = Symbol();
class CSSResult {
    constructor(cssText, safeToken) {
        if (safeToken !== constructionToken) {
            throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
        }
        this.cssText = cssText;
    }
    // Note, this is a getter so that it's lazy. In practice, this means
    // stylesheets are not created until the first element instance is made.
    get styleSheet() {
        if (this._styleSheet === undefined) {
            // Note, if `adoptedStyleSheets` is supported then we assume CSSStyleSheet
            // is constructable.
            if (supportsAdoptingStyleSheets) {
                this._styleSheet = new CSSStyleSheet();
                this._styleSheet.replaceSync(this.cssText);
            }
            else {
                this._styleSheet = null;
            }
        }
        return this._styleSheet;
    }
    toString() {
        return this.cssText;
    }
}
const textFromCSSResult = (value) => {
    if (value instanceof CSSResult) {
        return value.cssText;
    }
    else if (typeof value === 'number') {
        return value;
    }
    else {
        throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`);
    }
};
/**
 * Template tag which which can be used with LitElement's `style` property to
 * set element styles. For security reasons, only literal string values may be
 * used. To incorporate non-literal values `unsafeCSS` may be used inside a
 * template string part.
 */
const css = (strings, ...values) => {
    const cssText = values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1], strings[0]);
    return new CSSResult(cssText, constructionToken);
};
//# sourceMappingURL=css-tag.js.map

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
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for LitElement usage.
// TODO(justinfagnani): inject version number at build time
(window['litElementVersions'] || (window['litElementVersions'] = []))
    .push('2.2.1');
/**
 * Minimal implementation of Array.prototype.flat
 * @param arr the array to flatten
 * @param result the accumlated result
 */
function arrayFlat(styles, result = []) {
    for (let i = 0, length = styles.length; i < length; i++) {
        const value = styles[i];
        if (Array.isArray(value)) {
            arrayFlat(value, result);
        }
        else {
            result.push(value);
        }
    }
    return result;
}
/** Deeply flattens styles array. Uses native flat if available. */
const flattenStyles = (styles) => styles.flat ? styles.flat(Infinity) : arrayFlat(styles);
class LitElement extends UpdatingElement {
    /** @nocollapse */
    static finalize() {
        // The Closure JS Compiler does not always preserve the correct "this"
        // when calling static super methods (b/137460243), so explicitly bind.
        super.finalize.call(this);
        // Prepare styling that is stamped at first render time. Styling
        // is built from user provided `styles` or is inherited from the superclass.
        this._styles =
            this.hasOwnProperty(JSCompiler_renameProperty('styles', this)) ?
                this._getUniqueStyles() :
                this._styles || [];
    }
    /** @nocollapse */
    static _getUniqueStyles() {
        // Take care not to call `this.styles` multiple times since this generates
        // new CSSResults each time.
        // TODO(sorvell): Since we do not cache CSSResults by input, any
        // shared styles will generate new stylesheet objects, which is wasteful.
        // This should be addressed when a browser ships constructable
        // stylesheets.
        const userStyles = this.styles;
        const styles = [];
        if (Array.isArray(userStyles)) {
            const flatStyles = flattenStyles(userStyles);
            // As a performance optimization to avoid duplicated styling that can
            // occur especially when composing via subclassing, de-duplicate styles
            // preserving the last item in the list. The last item is kept to
            // try to preserve cascade order with the assumption that it's most
            // important that last added styles override previous styles.
            const styleSet = flatStyles.reduceRight((set, s) => {
                set.add(s);
                // on IE set.add does not return the set.
                return set;
            }, new Set());
            // Array.from does not work on Set in IE
            styleSet.forEach((v) => styles.unshift(v));
        }
        else if (userStyles) {
            styles.push(userStyles);
        }
        return styles;
    }
    /**
     * Performs element initialization. By default this calls `createRenderRoot`
     * to create the element `renderRoot` node and captures any pre-set values for
     * registered properties.
     */
    initialize() {
        super.initialize();
        this.renderRoot =
            this.createRenderRoot();
        // Note, if renderRoot is not a shadowRoot, styles would/could apply to the
        // element's getRootNode(). While this could be done, we're choosing not to
        // support this now since it would require different logic around de-duping.
        if (window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot) {
            this.adoptStyles();
        }
    }
    /**
     * Returns the node into which the element should render and by default
     * creates and returns an open shadowRoot. Implement to customize where the
     * element's DOM is rendered. For example, to render into the element's
     * childNodes, return `this`.
     * @returns {Element|DocumentFragment} Returns a node into which to render.
     */
    createRenderRoot() {
        return this.attachShadow({ mode: 'open' });
    }
    /**
     * Applies styling to the element shadowRoot using the `static get styles`
     * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where
     * available and will fallback otherwise. When Shadow DOM is polyfilled,
     * ShadyCSS scopes styles and adds them to the document. When Shadow DOM
     * is available but `adoptedStyleSheets` is not, styles are appended to the
     * end of the `shadowRoot` to [mimic spec
     * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
     */
    adoptStyles() {
        const styles = this.constructor._styles;
        if (styles.length === 0) {
            return;
        }
        // There are three separate cases here based on Shadow DOM support.
        // (1) shadowRoot polyfilled: use ShadyCSS
        // (2) shadowRoot.adoptedStyleSheets available: use it.
        // (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after
        // rendering
        if (window.ShadyCSS !== undefined && !window.ShadyCSS.nativeShadow) {
            window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map((s) => s.cssText), this.localName);
        }
        else if (supportsAdoptingStyleSheets) {
            this.renderRoot.adoptedStyleSheets =
                styles.map((s) => s.styleSheet);
        }
        else {
            // This must be done after rendering so the actual style insertion is done
            // in `update`.
            this._needsShimAdoptedStyleSheets = true;
        }
    }
    connectedCallback() {
        super.connectedCallback();
        // Note, first update/render handles styleElement so we only call this if
        // connected after first update.
        if (this.hasUpdated && window.ShadyCSS !== undefined) {
            window.ShadyCSS.styleElement(this);
        }
    }
    /**
     * Updates the element. This method reflects property values to attributes
     * and calls `render` to render DOM via lit-html. Setting properties inside
     * this method will *not* trigger another update.
     * * @param _changedProperties Map of changed properties with old values
     */
    update(changedProperties) {
        super.update(changedProperties);
        const templateResult = this.render();
        if (templateResult instanceof TemplateResult) {
            this.constructor
                .render(templateResult, this.renderRoot, { scopeName: this.localName, eventContext: this });
        }
        // When native Shadow DOM is used but adoptedStyles are not supported,
        // insert styling after rendering to ensure adoptedStyles have highest
        // priority.
        if (this._needsShimAdoptedStyleSheets) {
            this._needsShimAdoptedStyleSheets = false;
            this.constructor._styles.forEach((s) => {
                const style = document.createElement('style');
                style.textContent = s.cssText;
                this.renderRoot.appendChild(style);
            });
        }
    }
    /**
     * Invoked on each update to perform rendering tasks. This method must return
     * a lit-html TemplateResult. Setting properties inside this method will *not*
     * trigger the element to update.
     */
    render() {
    }
}
/**
 * Ensure this class is marked as `finalized` as an optimization ensuring
 * it will not needlessly try to `finalize`.
 *
 * Note this property name is a string to prevent breaking Closure JS Compiler
 * optimizations. See updating-element.ts for more information.
 */
LitElement['finalized'] = true;
/**
 * Render method used to render the lit-html TemplateResult to the element's
 * DOM.
 * @param {TemplateResult} Template to render.
 * @param {Element|DocumentFragment} Node into which to render.
 * @param {String} Element name.
 * @nocollapse
 */
LitElement.render = render$1;
//# sourceMappingURL=lit-element.js.map

var styles = css`:host{--base-button-padding:0 var(--base-space-md);--base-button-bg-color:var(--base-color-ui-lighter);--base-button-border:0;--base-button-border-radius:none;--base-button-font-size:var(--base-font-size-sm);--base-button-text-color:var(--base-font-color);--base-button-box-shadow:0 0;--base-button-transform:scale(1);--base-button-transition:all .2s ease;--base-button-cursor:pointer;--base-button-display:inline-block;--base-button-height:var(--base-size-md);vertical-align:middle;margin-bottom:var(--base-space-xs)}:host,:host button{display:inline-block}:host([full]),:host button{display:block;width:100%}:host([size=sm]){--base-button-height:var(--base-size-sm);--base-button-padding:0 var(--base-space-sm)}:host([size=md]){--base-button-height:var(--base-size-md);--base-button-padding:0 var(--base-space-md)}:host([size=lg]){--base-button-height:var(--base-size-lg);--base-button-padding:0 var(--base-space-lg)}:host button{height:var(--base-button-height);outline:0;color:var(--base-button-text-color);cursor:var(--base-button-cursor);display:var(--base-button-display);box-shadow:var(--base-button-box-shadow);border-radius:var(--base-button-border-radius);font-size:var(--base-button-font-size);padding:var(--base-button-padding);background:var(--base-button-bg-color);border:var(--base-button-border);-webkit-transform:var(--base-button-transform);transform:var(--base-button-transform);-webkit-transition:var(--base-button-transition);transition:var(--base-button-transition)}:host button:hover{--base-button-bg-color:var(--base-color-ui-light)}:host button:focus{--base-button-box-shadow:0 0 0 2px var(--base-color-focus)}:host[full] button{width:100%;display:block}:host([type=primary]) button{--base-button-bg-color:var(--base-color-primary);--base-button-text-color:var(--base-color-white)}:host([type=primary]) button:hover{--base-button-bg-color:var(--base-color-primary-dark)}:host([type=secondary]) button{--base-button-bg-color:var(--base-color-secondary);--base-button-text-color:var(--base-color-primary)}:host([type=secondary]) button:hover{--base-button-bg-color:var(--base-color-secondary-dark)}:host([type=transparent]) button{--base-button-bg-color:transparent;--base-button-text-color:var(--base-color-black)}:host([type=transparent]) button:hover{--base-button-bg-color:var(--base-color-ui-lighter)}:host([type=success]) button{--base-button-bg-color:var(--base-color-success);--base-button-text-color:var(--base-color-white)}:host([type=success]) button:hover{--base-button-bg-color:var(--base-color-success-dark)}:host([type=danger]) button{--base-button-bg-color:var(--base-color-danger);--base-button-text-color:var(--base-color-white)}:host([type=danger]) button:hover{--base-button-bg-color:var(--base-color-danger-dark)}:host([outline]) button{--base-button-border:2px solid var(--base-button-bg-color);color:var(--base-button-bg-color);background:none !important}:host([outline]):not([type]){color:var(--base-color-black)}::slotted([slot=prepend]){vertical-align:text-bottom;margin-right:var(--base-space-sm)}::slotted([slot=append]){vertical-align:text-bottom;margin-left:var(--base-space-sm)}`;

var sharedStyles = css`:host{font-family:var(--base-font-family);box-sizing:border-box}:host([hidden]){display:none}*,:after,:before{box-sizing:inherit}`;

class BaseButton extends LitElement {
  constructor() {
    super();
    /**
     * Button state
     * @type {"primary"|"secondary"|"transparent"|"success"|"danger"}
     * @attr
     */

    this.type = "";
    this.outline = false;
    /**
     * Full button
     * @type {Boolean}
     * @attr
     */

    this.full = false;
    /**
     * Button size
     * @type {"sm"|"md"|"lg"}
     * @attr
     */

    this.size = "";
  }

  static get properties() {
    return {
      type: {
        type: String
      },
      outline: {
        type: Boolean
      },
      size: {
        type: String
      },
      full: {
        type: Boolean
      }
    };
  }

  static get styles() {
    return [styles, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
      <button part="button">
        <slot name="prepend" part="prepend"></slot>
        <slot></slot>
        <slot name="append" part="append"></slot>
      </button>
    `;
  }

}

if (!customElements.get("base-button")) {
  customElements.define("base-button", BaseButton);
}

var styles$1 = css`:host{--base-checkbox-bg-color:var(--base-color-white);--base-checkbox-border:2px solid var(--base-color-ui-light);--base-checkbox-cursor:pointer;--base-checkbox-box-shadow:none;--base-checkbox-height:var(--base-size-md);--base-checkbox-border-radius:none;vertical-align:middle;height:var(--base-checkbox-height);display:-webkit-inline-box;display:inline-flex;-webkit-box-align:center;align-items:center;margin-right:var(--base-space-sm)}:host([full]){display:-webkit-box;display:flex;width:100%;margin-right:0}:host([size=sm]){--base-checkbox-indicator-font-size:.8em;--base-checkbox-height:var(--base-size-sm)}:host([size=md]){--base-checkbox-indicator-font-size:1em;--base-checkbox-height:var(--base-size-md)}:host([size=lg]){--base-checkbox-indicator-font-size:1.4em;--base-checkbox-height:var(--base-size-lg)}:host([disabled]){color:var(--base-color-font-light)}:host label{display:inline-block}input{position:absolute;clip:rect(1px 1px 1px 1px);clip:rect(1px,1px,1px,1px);vertical-align:middle}input~[part=box]{box-shadow:var(--base-button-box-shadow);background-color:var(--base-checkbox-bg-color);color:var(--base-color-font);width:calc(var(--base-checkbox-height) - var(--base-space-md));height:calc(var(--base-checkbox-height) - var(--base-space-md));border-radius:var(--base-checkbox-border-radius);border:var(--base-checkbox-border);margin-right:var(--base-space-sm);position:relative;vertical-align:middle;display:-webkit-inline-box;display:inline-flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center}input:focus~[part=box]{--base-button-box-shadow:0 0 0 2px var(--base-color-focus)}input:hover~[part=box]{--base-checkbox-bg-color:var(--base-color-ui-lighter)}input:checked~[part=box]{--base-checkbox-bg-color:var(--base-color-focus);--base-checkbox-border:1px solid var(--base-color-focus)}[part=box] [part=indicator]{font-size:var(--base-checkbox-indicator-font-size);color:var(--base-color-white);fill:currentColor;display:block;opacity:0}input:checked~[part=box] [part=indicator]{opacity:1}`;

class BaseCheckbox extends LitElement {
  constructor() {
    super();
    this.full = false;
    this.disabled = false;
    /**
     * Sizes
     * @type {"sm"|"md"|"lg"}
     * @attr
     */

    this.size = "";
    this.value = "";
    this._checked = false;
    this._handleChange = this._handleChange.bind(this);
  }

  static get properties() {
    return {
      checked: {
        type: Boolean,
        reflect: true
      },
      disabled: {
        type: Boolean
      },
      full: {
        type: Boolean
      },
      size: {
        type: String,
        reflect: true
      },
      value: {
        type: String
      }
    };
  }

  static get styles() {
    return [styles$1, sharedStyles];
  }

  get inputEl() {
    return this.shadowRoot.querySelector("input");
  }

  get checked() {
    return this._checked;
  }

  set checked(checked) {
    if (this._checked === checked) return;
    if (checked) this.setAttribute("checked", "");else this.removeAttribute("checked");
    this._checked = checked;

    if (this.inputEl) {
      this.inputEl.checked = checked;
    }

    this.dispatchEvent(new CustomEvent("change"));
    this.requestUpdate();
  }

  _handleChange(e) {
    e.stopPropagation();
    this.checked = e.target.checked;
  }

  render() {
    return html`
      <label>
        <input
          ?disabled=${this.disabled}
          @change=${this._handleChange}
          ?checked=${this.checked}
          value=${this.value}
          type="checkbox"
        />
        <span part="box">
          <slot name="indicator" part="indicator">&#10003;</slot>
        </span>
        <span part="label"><slot></slot></span>
      </label>
    `;
  }

}

if (!customElements.get("base-checkbox")) {
  customElements.define("base-checkbox", BaseCheckbox);
}

var styles$2 = css`:host{--base-modal-backdrop-bg-color:rgba(0,0,0,0.4);--base-modal-backdrop-transition:all .2s cubic-bezier(0.785,0.135,0.15,0.86);--base-modal-box-transition:all .4s cubic-bezier(0.785,0.135,0.15,0.86);--base-modal-box-box-shadow:none;--base-modal-content-padding:var(--base-space-md);--base-modal-box-border:1px solid var(--base-color-ui);position:fixed;left:0;top:0;width:100%;height:100%;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;-webkit-transition:all .5s cubic-bezier(.785,.135,.15,.86);transition:all .5s cubic-bezier(.785,.135,.15,.86);z-index:999;overflow-y:inherit;visibility:hidden;opacity:0}:host([open]){opacity:1;visibility:visible}:host [part=backdrop]{opacity:0;-webkit-transition:var(--base-modal-backdrop-transition);transition:var(--base-modal-backdrop-transition);overflow:visible;z-index:400;position:absolute;width:100vw;height:100vh;background:var(--base-modal-backdrop-bg-color)}:host([open]) [part=backdrop]{opacity:1}:host([no-backdrop]) [part=backdrop]{background:transparent}:host [part=box]{position:relative;margin:var(--base-space-sm);border-radius:var(--base-border-radius-sm);border:var(--base-modal-box-border);box-shadow:var(--base-modal-box-box-shadow);-webkit-transition:var(--base-modal-box-transition);transition:var(--base-modal-box-transition);-webkit-transform:translateY(50px);transform:translateY(50px);width:100%;max-width:600px;min-width:200px;min-height:200px;height:auto;background:var(--base-color-white);z-index:1000;overflow-y:scroll;overflow-x:hidden;-webkit-overflow-scrolling:touch}:host([open]) [part=box]{-webkit-transform:translateY(0);transform:translateY(0)}::slotted([slot=header]){box-sizing:border-box;display:block;position:-webkit-sticky;position:sticky;background:var(--ab-color-white);left:0;top:0;width:100%;padding:var(--base-modal-content-padding);display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;border-bottom:1px solid var(--ab-color-ui-400)}:host [part=close-button]{z-index:1;display:inline-block;border:0;font-size:var(--base-font-size-sm);color:var(--base-color-font);background:transparent;cursor:pointer;position:absolute;right:var(--base-space-sm);top:var(--base-space-sm);width:var(--base-space-md);height:var(--base-space-md);fill:currentColor}:host [part=content]{padding:var(--base-modal-content-padding)}::slotted([slot=error]),::slotted([slot=success]){box-sizing:border-box;display:block;border:1px solid var(--base-color-danger)}`;

class BaseModal extends LitElement {
  constructor() {
    super();
    this.open = false;
    this.noBackdrop = false;
    this._onToggle = this._onToggle.bind(this);
    this.close = this.close.bind(this);
    this.show = this.show.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  static get properties() {
    return {
      open: {
        type: Boolean,
        reflect: true,

        hasChanged(newVal, oldVal) {
          if (newVal) {
            document.body.style.overflow = "hidden";
          } else {
            document.body.style.overflow = "visible";
          }

          return true;
        }

      },
      noBackdrop: {
        type: Boolean,
        reflect: true,
        attribute: "no-backdrop"
      }
    };
  }

  static get styles() {
    return [styles$2, sharedStyles];
  }

  _onToggle() {
    this.dispatchEvent(new CustomEvent("toggle"));
  }

  close() {
    this.open = false;

    this._onToggle();
  }

  show() {
    this.open = true;

    this._onToggle();
  }

  toggle(e) {
    this.open = !this.open;

    this._onToggle();
  }

  render() {
    return html`
      <div part="backdrop" @click=${this.close}></div>
      <div part="box">
        <slot part="close-button" name="close-button" @click=${this.close}>
          &#10005;
        </slot>

        <slot part="header" name="header"></slot>

        <div part="content"><slot></slot></div>
      </div>
    `;
  }

}

if (!customElements.get("base-modal")) {
  customElements.define("base-modal", BaseModal);
}

/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
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
 * For AttributeParts, sets the attribute if the value is defined and removes
 * the attribute if the value is undefined.
 *
 * For other part types, this directive is a no-op.
 */
const ifDefined = directive((value) => (part) => {
    if (value === undefined && part instanceof AttributePart) {
        if (value !== part.value) {
            const name = part.committer.name;
            part.committer.element.removeAttribute(name);
        }
    }
    else {
        part.setValue(value);
    }
});
//# sourceMappingURL=if-defined.js.map

var tokens = {
  "0": {
    pattern: /\d/,
    _default: "0"
  },
  "9": {
    pattern: /\d/,
    optional: true
  },
  "#": {
    pattern: /\d/,
    optional: true,
    recursive: true
  },
  A: {
    pattern: /[a-zA-Z0-9]/
  },
  S: {
    pattern: /[a-zA-Z]/
  },
  U: {
    pattern: /[a-zA-Z]/,
    transform: function (c) {
      return c.toLocaleUpperCase();
    }
  },
  L: {
    pattern: /[a-zA-Z]/,
    transform: function (c) {
      return c.toLocaleLowerCase();
    }
  },
  $: {
    escape: true
  }
};

function isEscaped(pattern, pos) {
  var count = 0;
  var i = pos - 1;
  var token = {
    escape: true
  };

  while (i >= 0 && token && token.escape) {
    token = tokens[pattern.charAt(i)];
    count += token && token.escape ? 1 : 0;
    i--;
  }

  return count > 0 && count % 2 === 1;
}

function calcOptionalNumbersToUse(pattern, value) {
  var numbersInP = pattern.replace(/[^0]/g, "").length;
  var numbersInV = value.replace(/[^\d]/g, "").length;
  return numbersInV - numbersInP;
}

function concatChar(text, character, options, token) {
  if (token && typeof token.transform === "function") {
    character = token.transform(character);
  }

  if (options.reverse) {
    return character + text;
  }

  return text + character;
}

function hasMoreTokens(pattern, pos, inc) {
  var pc = pattern.charAt(pos);
  var token = tokens[pc];

  if (pc === "") {
    return false;
  }

  return token && !token.escape ? true : hasMoreTokens(pattern, pos + inc, inc);
}

function hasMoreRecursiveTokens(pattern, pos, inc) {
  var pc = pattern.charAt(pos);
  var token = tokens[pc];

  if (pc === "") {
    return false;
  }

  return token && token.recursive ? true : hasMoreRecursiveTokens(pattern, pos + inc, inc);
}

function insertChar(text, char, position) {
  var t = text.split("");
  t.splice(position, 0, char);
  return t.join("");
}

function StringMask(pattern, opt) {
  this.options = opt || {};
  this.options = {
    reverse: this.options.reverse || false,
    usedefaults: this.options.usedefaults || this.options.reverse
  };
  this.pattern = pattern;
}

StringMask.prototype.process = function proccess(value) {
  if (!value) {
    return {
      result: "",
      valid: false
    };
  }

  value = value + "";
  var pattern2 = this.pattern;
  var valid = true;
  var formatted = "";
  var valuePos = this.options.reverse ? value.length - 1 : 0;
  var patternPos = 0;
  var optionalNumbersToUse = calcOptionalNumbersToUse(pattern2, value);
  var escapeNext = false;
  var recursive = [];
  var inRecursiveMode = false;
  var steps = {
    start: this.options.reverse ? pattern2.length - 1 : 0,
    end: this.options.reverse ? -1 : pattern2.length,
    inc: this.options.reverse ? -1 : 1
  };

  function continueCondition(options) {
    if (!inRecursiveMode && !recursive.length && hasMoreTokens(pattern2, patternPos, steps.inc)) {
      // continue in the normal iteration
      return true;
    } else if (!inRecursiveMode && recursive.length && hasMoreRecursiveTokens(pattern2, patternPos, steps.inc)) {
      // continue looking for the recursive tokens
      // Note: all chars in the patterns after the recursive portion will be handled as static string
      return true;
    } else if (!inRecursiveMode) {
      // start to handle the recursive portion of the pattern
      inRecursiveMode = recursive.length > 0;
    }

    if (inRecursiveMode) {
      var pc = recursive.shift();
      recursive.push(pc);

      if (options.reverse && valuePos >= 0) {
        patternPos++;
        pattern2 = insertChar(pattern2, pc, patternPos);
        return true;
      } else if (!options.reverse && valuePos < value.length) {
        pattern2 = insertChar(pattern2, pc, patternPos);
        return true;
      }
    }

    return patternPos < pattern2.length && patternPos >= 0;
  }
  /**
   * Iterate over the pattern's chars parsing/matching the input value chars
   * until the end of the pattern. If the pattern ends with recursive chars
   * the iteration will continue until the end of the input value.
   *
   * Note: The iteration must stop if an invalid char is found.
   */


  for (patternPos = steps.start; continueCondition(this.options); patternPos = patternPos + steps.inc) {
    // Value char
    var vc = value.charAt(valuePos); // Pattern char to match with the value char

    var pc = pattern2.charAt(patternPos);
    var token = tokens[pc];

    if (recursive.length && token && !token.recursive) {
      // In the recursive portion of the pattern: tokens not recursive must be seen as static chars
      token = null;
    } // 1. Handle escape tokens in pattern
    // go to next iteration: if the pattern char is a escape char or was escaped


    if (!inRecursiveMode || vc) {
      if (this.options.reverse && isEscaped(pattern2, patternPos)) {
        // pattern char is escaped, just add it and move on
        formatted = concatChar(formatted, pc, this.options, token); // skip escape token

        patternPos = patternPos + steps.inc;
        continue;
      } else if (!this.options.reverse && escapeNext) {
        // pattern char is escaped, just add it and move on
        formatted = concatChar(formatted, pc, this.options, token);
        escapeNext = false;
        continue;
      } else if (!this.options.reverse && token && token.escape) {
        // mark to escape the next pattern char
        escapeNext = true;
        continue;
      }
    } // 2. Handle recursive tokens in pattern
    // go to next iteration: if the value str is finished or
    //                       if there is a normal token in the recursive portion of the pattern


    if (!inRecursiveMode && token && token.recursive) {
      // save it to repeat in the end of the pattern and handle the value char now
      recursive.push(pc);
    } else if (inRecursiveMode && !vc) {
      // in recursive mode but value is finished. Add the pattern char if it is not a recursive token
      formatted = concatChar(formatted, pc, this.options, token);
      continue;
    } else if (!inRecursiveMode && recursive.length > 0 && !vc) {
      // recursiveMode not started but already in the recursive portion of the pattern
      continue;
    } // 3. Handle the value
    // break iterations: if value is invalid for the given pattern


    if (!token) {
      // add char of the pattern
      formatted = concatChar(formatted, pc, this.options, token);

      if (!inRecursiveMode && recursive.length) {
        // save it to repeat in the end of the pattern
        recursive.push(pc);
      }
    } else if (token.optional) {
      // if token is optional, only add the value char if it matchs the token pattern
      //                       if not, move on to the next pattern char
      if (token.pattern.test(vc) && optionalNumbersToUse) {
        formatted = concatChar(formatted, vc, this.options, token);
        valuePos = valuePos + steps.inc;
        optionalNumbersToUse--;
      } else if (recursive.length > 0 && vc) {
        valid = false;
        break;
      }
    } else if (token.pattern.test(vc)) {
      // if token isn't optional the value char must match the token pattern
      formatted = concatChar(formatted, vc, this.options, token);
      valuePos = valuePos + steps.inc;
    } else if (!vc && token._default && this.options.usedefaults) {
      // if the token isn't optional and has a default value, use it if the value is finished
      formatted = concatChar(formatted, token._default, this.options, token);
    } else {
      // the string value don't match the given pattern
      valid = false;
      break;
    }
  }

  return {
    result: formatted,
    valid: valid
  };
};

StringMask.prototype.apply = function (value) {
  return this.process(value).result;
};

StringMask.prototype.validate = function (value) {
  return this.process(value).valid;
};

StringMask.process = function (value, pattern, options) {
  return new StringMask(pattern, options).process(value);
};

StringMask.apply = function (value, pattern, options) {
  return new StringMask(pattern, options).apply(value);
};

StringMask.validate = function (value, pattern, options) {
  return new StringMask(pattern, options).validate(value);
};

var styles$3 = css`:host{--base-input-bg-color:var(--base-color-white);--base-input-height:var(--base-size-md);--base-input-border-color:var(--base-color-ui-light);--base-input-border-radius:none;--base-input-box-shadow:none;--base-input-placeholder-color:var(--base-color-font-light);--base-input-font-size:var(--base-font-size-sm);vertical-align:middle;min-width:200px;display:inline-block}:host([full]){width:100%;display:block}:host [part=input]{display:-webkit-box;display:flex;-webkit-box-pack:justify;justify-content:space-between;-webkit-box-align:center;align-items:center;box-shadow:var(--base-input-box-shadow);border-radius:var(--base-input-border-radius);height:var(--base-input-height);border:2px solid var(--base-input-border-color)}:host([type=number]) [part=input-field]::-webkit-inner-spin-button,:host([type=number]) [part=input-field]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}:host [part=input]:hover{--base-input-border-color:var(--base-color-ui)}:host([focused]) [part=input]{--base-input-box-shadow:0 0 0 1px var(--base-color-focus);--base-input-border-color:var(--base-color-focus)}:host(:not([focused])[valid]) [part=input]{--base-input-border-color:var(--base-color-success)}:host(:not([focused])[invalid]) [part=input]{--base-input-border-color:var(--base-color-danger)}:host [part=input-field]{color:var(--base-color-font);background-color:var(--base-input-bg-color);width:100%;font-size:var(--base-font-size-sm);border-radius:var(--base-input-border-radius);height:100%;outline:0;border:0;padding:0 var(--base-space-md)}:host [part=input-field]::-webkit-input-placeholder{font-size:var(--base-input-font-size);color:var(--base-input-placeholder-color)}:host [part=input-field]::-moz-placeholder{font-size:var(--base-input-font-size);color:var(--base-input-placeholder-color)}:host [part=input-field]:-ms-input-placeholder{font-size:var(--base-input-font-size);color:var(--base-input-placeholder-color)}:host [part=input-field]::-ms-input-placeholder{font-size:var(--base-input-font-size);color:var(--base-input-placeholder-color)}:host [part=input-field]::placeholder{font-size:var(--base-input-font-size);color:var(--base-input-placeholder-color)}::slotted([slot=help]){color:var(--base-color-font-light)}::slotted([slot=error]),::slotted([slot=help]){display:block;font-size:var(--base-font-size-xs);margin-top:var(--base-space-sm)}::slotted([slot=error]){color:var(--base-color-danger)}::slotted([slot=prepend]){margin-left:var(--base-space-sm)}::slotted([slot=append]){margin-right:var(--base-space-sm)}`;

class BaseInput extends LitElement {
  constructor() {
    super();
    /**
     * Full input
     * @type {Boolean}
     * @attr
     */

    this.full = false;
    this._value = "";
    this.required = false;
    this.full = false;
    this.valid = false;
    this.invalid = false;
    this.disabled = false;
    this.autocomplete = "";
    /**
     * Input type
     * @type {"text"|"password"|"email"|"tel"|"number"|"url"|"search"}
     * @attr
     */

    this.type = "text";
    this.type = "placeholder";
    this.mask = "";
    this.errormessage = "";
    this.max = undefined;
    this.maxlength = undefined;
    this.min = undefined;
    this.minlength = undefined;
    this.pattern = undefined;
    this.readonly = false;
    this.autovalidate = false;
    this.focused = false;
    this.autofocus = false;
    this._handleInvalidEvent = this._handleInvalidEvent.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
    this._handleInputEvent = this._handleInputEvent.bind(this);
    this._handleChangeEvent = this._handleChangeEvent.bind(this);
    this._handleKeypress = this._handleKeypress.bind(this);
    this._handleBlurEvent = this._handleBlurEvent.bind(this);
    this._handleFocusEvent = this._handleFocusEvent.bind(this);
  }

  static get properties() {
    return {
      errormessage: {
        type: String
      },
      max: {
        type: String
      },
      maxlength: {
        type: String
      },
      min: {
        type: String
      },
      minlength: {
        type: String
      },
      pattern: {
        type: String
      },
      placeholder: {
        type: String
      },
      autocomplete: {
        type: String
      },
      readonly: {
        type: Boolean
      },
      disabled: {
        type: Boolean
      },
      full: {
        type: Boolean,
        reflect: true
      },
      autovalidate: {
        type: Boolean
      },
      valid: {
        type: Boolean,
        reflect: true
      },
      invalid: {
        type: Boolean,
        reflect: true
      },
      type: {
        type: String
      },
      value: {
        type: String
      },
      mask: {
        type: String
      },
      focused: {
        type: Boolean,
        reflect: true
      },
      required: {
        type: Boolean,
        reflect: true
      },
      autofocus: {
        type: Boolean,
        reclect: true
      }
    };
  }

  static get styles() {
    return [styles$3, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val || "";
    this.requestUpdate();
  }

  get inputEl() {
    return this.shadowRoot.querySelector("input");
  }

  checkValidity() {
    const valid = this.inputEl.checkValidity();

    if (valid) {
      this.invalid = false;
      this.valid = true;
    } else {
      this.valid = false;
      this.invalid = true;
    }
  }

  reportValidity() {
    let valid;
    const slot = this.querySelector('[slot="error"]');

    if (slot && slot.innerHTML) {
      valid = this.inputEl.checkValidity();
    } else {
      valid = this.inputEl.reportValidity();
    }

    if (valid) {
      this.invalid = false;
      this.valid = true;
    } else {
      this.valid = false;
      this.invalid = true;
    }
  }

  _handleFocusEvent() {
    this.focused = true;
    this.showSuggestions = true;
  }

  _handleBlurEvent() {
    this.focused = false;

    if (this.autovalidate) {
      this.checkValidity();
    }
  }

  _handleInvalidEvent(e) {} // keypress is run before value is changed


  _handleKeypress(e) {
    // First stop default input event to bubble up
    e.stopPropagation(); // Set the value to the target value
    // this will then become the e.target.value of the custom event

    if (this.mask) {
      const formatter = new StringMask(this.mask);
      this.value = formatter.apply(e.target.value.replace(/[^\d\p{L}]/g, ""));
    } else {
      this.value = e.target.value;
    }

    this.dispatchEvent(new CustomEvent("keypress", e));
  }

  _handleInputEvent(e) {
    // First stop default input event to bubble up
    e.stopPropagation(); // Set the value to the target value
    // this will then become the e.target.value of the custom event

    this.value = e.target.value;
    this.dispatchEvent(new CustomEvent("input", e));
  }

  _handleChangeEvent(e) {
    if (this.autovalidate) {
      this.reportValidity();
    } // First stop default input event to bubble up


    e.stopPropagation(); // Set the value to the target value
    // this will then become the e.target.value of the custom event

    this.value = e.target.value;
    this.dispatchEvent(new CustomEvent("change", e));
  }

  render() {
    return html`
      <div part="input">
        <slot part="prepend" name="prepend"></slot>
        <input
          autocomplete=${ifDefined(this.autocomplete)}
          ?disabled=${this.disabled}
          @invalid=${this._handleInvalidEvent}
          ?readonly=${this.readonly}
          min=${ifDefined(this.min)}
          minlength=${ifDefined(this.minlength)}
          max=${ifDefined(this.max)}
          maxlength=${ifDefined(this.maxlength)}
          pattern=${ifDefined(this.pattern)}
          @keypress=${this._handleKeypress}
          @input=${this._handleInputEvent}
          @change=${this._handleChangeEvent}
          @focus=${this._handleFocusEvent}
          @blur=${this._handleBlurEvent}
          ?required=${this.required}
          placeholder=${ifDefined(this.placeholder)}
          part="input-field"
          type=${this.type}
          .value=${this.value}
        />
        <slot part="append" name="append"></slot>
      </div>
      <slot part="help" name="help"></slot>
      ${this.invalid ? html`<slot part="error" name="error"></slot>` : null}
    `;
  }

}

if (!customElements.get("base-input")) {
  customElements.define("base-input", BaseInput);
}

var styles$4 = css`:host{--base-radio-height:var(--base-size-md);outline:0;height:var(--base-radio-height);cursor:pointer;display:-webkit-inline-box;display:inline-flex;-webkit-box-align:center;align-items:center;margin-right:var(--base-space-sm)}:host([full]){display:-webkit-box;display:flex;width:100%;margin-right:0}:host([size=sm]){--base-radio-height:var(--base-size-sm)}:host([size=md]){--base-radio-height:var(--base-size-md)}:host([size=lg]){--base-radio-height:var(--base-size-lg)}:host [part=box]{display:-webkit-inline-box;display:inline-flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;position:relative;margin-right:var(--base-space-xs);border:2px solid var(--base-color-ui-light);border-radius:50%;background:var(--hw-color-white);width:calc(var(--base-radio-height) - var(--base-space-md));height:calc(var(--base-radio-height) - var(--base-space-md));-webkit-transition:border-color .3s ease,max-height .3s ease,-webkit-transform .3s ease;transition:border-color .3s ease,max-height .3s ease,-webkit-transform .3s ease;transition:border-color .3s ease,max-height .3s ease,transform .3s ease;transition:border-color .3s ease,max-height .3s ease,transform .3s ease,-webkit-transform .3s ease}:host(:focus) [part=box]{box-shadow:0 0 3px 0 var(--base-color-focus)}:host [part=label]{line-height:1.5;font-size:var(--hw-font-size-small);display:block;-webkit-box-flex:1;flex:1;margin-left:var(--base-space-xs)}:host [part=input-field]{position:absolute;clip:rect(1px 1px 1px 1px);clip:rect(1px,1px,1px,1px);vertical-align:middle}:host(:hover:not([disabled]):not([checked])) [part=box]{background-color:var(--base-color-ui-lighter)}:host([checked]) [part=box]{border-color:var(--base-color-focus)}:host([checked]) [part=indicator] i{border-radius:50%;width:60%;height:60%;background:var(--base-color-focus)}`;

class BaseRadio extends LitElement {
  constructor() {
    super();
    this.value = "";
    this.name = "";
    /**
     * Sizes
     * @type {"sm"|"md"|"lg"}
     * @attr
     */

    this.size = "";
    this.full = false;
    this.disabled = false;
    this._checked = false;
    this.focus = this.focus.bind(this);
    this.selectNext = this.selectNext.bind(this);
    this.selectPrevious = this.selectPrevious.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  static get properties() {
    return {
      checked: {
        type: Boolean,
        reflect: true
      },
      disabled: {
        type: Boolean
      },
      full: {
        type: Boolean
      },
      size: {
        type: String
      },
      name: {
        type: String,
        reflect: true
      },
      value: {
        type: String
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("tabindex", "1");
    this.addEventListener("click", this._handleClick);
    this.addEventListener("keydown", this._handleKeyDown);
  }

  static get styles() {
    return [styles$4, sharedStyles];
  }

  get options() {
    return [...document.querySelectorAll(`base-radio[name="${this.name}"]`)];
  }

  get currentCheckedItem() {
    return this.options.find(option => option.checked);
  }

  get formElement() {
    return this.shadowRoot.querySelector("input");
  }

  get checked() {
    return this._checked;
  }

  set checked(checked) {
    if (this.disabled) return; // TODO: Why do we need to set this manually even after reflect attribute?

    if (checked) this.setAttribute("checked", "");else this.removeAttribute("checked");
    if (checked === this._checked) return;

    if (checked === true && this.currentCheckedItem) {
      this.currentCheckedItem.checked = false;
    }

    if (this.formElement) {
      this.formElement.checked = checked;
    }

    this._checked = checked;
    this.dispatchEvent(new CustomEvent("change"));
    this.requestUpdate();
  }

  selectNext() {
    const options = this.options;
    const checkedIndex = options.findIndex(option => option.checked);
    const isLastOption = options.length === checkedIndex + 1;
    const nextIndex = isLastOption ? 0 : checkedIndex + 1;
    options[nextIndex].focus();
    options[nextIndex].checked = true;
  }

  selectPrevious() {
    const options = this.options;
    const checkedIndex = options.findIndex(option => option.checked);
    const isFirstOption = checkedIndex === 0;
    const nextIndex = isFirstOption ? options.length - 1 : checkedIndex - 1;
    options[nextIndex].focus();
    options[nextIndex].checked = true;
  }

  _handleClick(e) {
    e.stopPropagation();
    this.checked = true;
  }

  _handleChange(e) {
    e.stopPropagation();
    this.checked = e.target.checked;
  }

  _handleKeyDown(e) {
    console.log(e); // Left

    if (e.keyCode === 37) {
      this.selectPrevious();
    } // Right


    if (e.keyCode === 39) {
      this.selectNext();
    }
  }

  render() {
    return html`
      <input
        id="radio-input"
        part="input-field"
        name=${this.name}
        ?disabled=${this.disabled}
        @keydown=${this._handleKeyDown}
        @change=${this._handleChange}
        ?checked=${this.checked}
        value=${this.value}
        type="radio"
      />
      <span part="box">
        <slot name="indicator" part="indicator"><i></i></slot>
      </span>
      <label for="radio-input" part="label"><slot></slot></label>
    `;
  }

}

if (!customElements.get("base-radio")) {
  customElements.define("base-radio", BaseRadio);
}

var styles$5 = css`:host{display:block;width:100%;margin-bottom:var(--base-space-sm)}`;

class BaseLabel extends LitElement {
  constructor() {
    super();
    this.for = "";
  }

  static get properties() {
    return {
      for: {
        type: String
      }
    };
  }

  static get styles() {
    return [styles$5, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html` <label for=${this.for}><slot></slot></label> `;
  }

}

if (!customElements.get("base-label")) {
  customElements.define("base-label", BaseLabel);
}

var styles$6 = css`:host{vertical-align:middle;display:block;width:100%}:host([inline]){display:inline-block;width:auto}:host([clickable]){cursor:pointer;-webkit-transition:all .2s ease;transition:all .2s ease}:host([clickable]:hover){-webkit-transform:translateY(-2px);transform:translateY(-2px)}:host([clickable]:active){-webkit-transform:translateY(0);transform:translateY(0)}:host([bg=primary]){background-color:var(--base-color-primary)}:host([bg=secondary]){background-color:var(--base-color-secondary)}:host([bg=success]){background-color:var(--base-color-success)}:host([bg=danger]){background-color:var(--base-color-danger)}:host([bg=ui-light]){background-color:var(--base-color-ui-light)}:host([bg=ui-lighter]){background-color:var(--base-color-ui-lighter)}:host([bg=ui-lightest]){background-color:var(--base-color-ui-lightest)}:host([bg=ui-dark]){background-color:var(--base-color-ui-dark)}:host([bg=white]){background-color:var(--base-color-white)}:host([bg=black]){background-color:var(--base-color-black)}:host([border=primary]){border:1px solid var(--base-color-primary)}:host([border=secondary]){border:1px solid var(--base-color-secondary)}:host([border=success]){border:1px solid var(--base-color-success)}:host([border=danger]){border:1px solid var(--base-color-danger)}:host([border=ui-light]){border:1px solid var(--base-color-ui-light)}:host([border=ui-lighter]){border:1px solid var(--base-color-ui-lighter)}:host([border=ui-lightest]){border:1px solid var(--base-color-ui-lightest)}:host([border=ui-dark]){border:1px solid var(--base-color-ui-dark)}:host([border=white]){border:1px solid var(--base-color-white)}:host([border=black]){border:1px solid var(--base-color-black)}:host([depth=none]){box-shadow:var(--base-depth-none)}:host([depth=xs]){box-shadow:var(--base-depth-xs)}:host([depth=sm]){box-shadow:var(--base-depth-sm)}:host([depth=md]){box-shadow:var(--base-depth-md)}:host([depth=lg]){box-shadow:var(--base-depth-lg)}:host([depth=xl]){box-shadow:var(--base-depth-xl)}:host([padding=none]){padding:var(--base-space-none)}:host([padding=xs]){padding:var(--base-space-xs)}:host([padding=sm]){padding:var(--base-space-sm)}:host([padding=md]){padding:var(--base-space-md)}:host([padding=lg]){padding:var(--base-space-lg)}:host([padding=xl]){padding:var(--base-space-xl)}:host([padding-x=none]){padding-left:var(--base-space-none);padding-right:var(--base-space-none)}:host([padding-x=xs]){padding-left:var(--base-space-xs);padding-right:var(--base-space-xs)}:host([padding-x=sm]){padding-left:var(--base-space-sm);padding-right:var(--base-space-sm)}:host([padding-x=md]){padding-left:var(--base-space-md);padding-right:var(--base-space-md)}:host([padding-x=lg]){padding-left:var(--base-space-lg);padding-right:var(--base-space-lg)}:host([padding-x=xl]){padding-left:var(--base-space-xl);padding-right:var(--base-space-xl)}:host([padding-y=none]){padding-top:var(--base-space-none);padding-bottom:var(--base-space-none)}:host([padding-y=xs]){padding-top:var(--base-space-xs);padding-bottom:var(--base-space-xs)}:host([padding-y=sm]){padding-top:var(--base-space-sm);padding-bottom:var(--base-space-sm)}:host([padding-y=md]){padding-top:var(--base-space-md);padding-bottom:var(--base-space-md)}:host([padding-y=lg]){padding-top:var(--base-space-lg);padding-bottom:var(--base-space-lg)}:host([padding-y=xl]){padding-top:var(--base-space-xl);padding-bottom:var(--base-space-xl)}:host([margin=none]){margin:var(--base-space-none)}:host([margin=xs]){margin:var(--base-space-xs)}:host([margin=sm]){margin:var(--base-space-sm)}:host([margin=md]){margin:var(--base-space-md)}:host([margin=lg]){margin:var(--base-space-lg)}:host([margin=xl]){margin:var(--base-space-xl)}:host([margin-x=none]){margin-left:var(--base-space-none);margin-right:var(--base-space-none)}:host([margin-x=xs]){margin-left:var(--base-space-xs);margin-right:var(--base-space-xs)}:host([margin-x=sm]){margin-left:var(--base-space-sm);margin-right:var(--base-space-sm)}:host([margin-x=md]){margin-left:var(--base-space-md);margin-right:var(--base-space-md)}:host([margin-x=lg]){margin-left:var(--base-space-lg);margin-right:var(--base-space-lg)}:host([margin-x=xl]){margin-left:var(--base-space-xl);margin-right:var(--base-space-xl)}:host([margin-y=none]){margin-top:var(--base-space-none);margin-bottom:var(--base-space-none)}:host([margin-y=xs]){margin-top:var(--base-space-xs);margin-bottom:var(--base-space-xs)}:host([margin-y=sm]){margin-top:var(--base-space-sm);margin-bottom:var(--base-space-sm)}:host([margin-y=md]){margin-top:var(--base-space-md);margin-bottom:var(--base-space-md)}:host([margin-y=lg]){margin-top:var(--base-space-lg);margin-bottom:var(--base-space-lg)}:host([margin-y=xl]){margin-top:var(--base-space-xl);margin-bottom:var(--base-space-xl)}:host([radius=none]){border-radius:var(--base-border-radius-none)}:host([radius=xs]){border-radius:var(--base-border-radius-xs)}:host([radius=sm]){border-radius:var(--base-border-radius-sm)}:host([radius=md]){border-radius:var(--base-border-radius-md)}:host([radius=lg]){border-radius:var(--base-border-radius-lg)}:host([radius=xl]){border-radius:var(--base-border-radius-xl)}`;

class BaseBox extends LitElement {
  constructor() {
    super();
    /**
     * Box background color
     * @type {"primary"|"secondary"|"success"|"danger"}
     * @attr
     */

    this.bg = "";
    /**
     * Box border
     * @type {"primary"|"secondary"|"success"|"danger"}
     * @attr
     */

    this.border = "";
    /**
     * Box border radius
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */

    this.radius = "";
    /**
     * Box depth
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */

    this.depth = "";
    this.clickable = false;
    /**
     * Full box
     * @type {Boolean}
     * @attr
     */

    this.inline = false;
    /**
     * Box padding
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */

    this.padding = "";
    /**
     * Box padding horistonal
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */

    this.paddingX = "";
    /**
     * Box padding vertical
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */

    this.paddingY = "";
    /**
     * Box margin
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */

    this.margin = "";
    /**
     * Box padding vertical
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */

    this.marginX = "";
    /**
     * Box padding vertical
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */

    this.marginY = "";
  }

  static get properties() {
    return {
      border: {
        type: String
      },
      bg: {
        type: String
      },
      depth: {
        type: String
      },
      radius: {
        type: String
      },
      padding: {
        type: String
      },
      paddingX: {
        type: String,
        attribute: "padding-x"
      },
      paddingY: {
        type: String,
        attribute: "padding-y"
      },
      margin: {
        type: String
      },
      marginX: {
        type: String,
        attribute: "margin-x"
      },
      marginY: {
        type: String,
        attribute: "margin-y"
      },
      inline: {
        type: Boolean
      },
      clickable: {
        type: Boolean
      }
    };
  }

  static get styles() {
    return [styles$6, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`<slot></slot>`;
  }

}

if (!customElements.get("base-box")) {
  customElements.define("base-box", BaseBox);
}

var styles$7 = css`:host{width:100%;display:-webkit-box;display:flex}:host([wrap]){flex-wrap:wrap}:host([justify-content=between]){-webkit-box-pack:justify;justify-content:space-between}:host([justify-content=around]){justify-content:space-around}:host([justify-content=center]){-webkit-box-pack:center;justify-content:center}:host([justify-content=start]){-webkit-box-pack:start;justify-content:flex-start}:host([justify-content=end]){-webkit-box-pack:end;justify-content:flex-end}:host([align-items=center]){-webkit-box-align:center;align-items:center}:host([align-items=start]){-webkit-box-align:start;align-items:flex-start}:host([align-items=end]){-webkit-box-align:end;align-items:flex-end}:host([direction=column]){-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}:host([direction=column-reverse]){-webkit-box-orient:vertical;-webkit-box-direction:reverse;flex-direction:column-reverse}:host([direction=row]){-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row}:host([direction=row-reverse]){-webkit-box-orient:horizontal;-webkit-box-direction:reverse;flex-direction:row-reverse}@media(min-width:600px){:host([sm-wrap]){flex-wrap:wrap}:host([sm-justify-content=between]){-webkit-box-pack:justify;justify-content:space-between}:host([sm-justify-content=around]){justify-content:space-around}:host([sm-justify-content=center]){-webkit-box-pack:center;justify-content:center}:host([sm-justify-content=start]){-webkit-box-pack:start;justify-content:flex-start}:host([sm-justify-content=end]){-webkit-box-pack:end;justify-content:flex-end}:host([sm-align-items=center]){-webkit-box-align:center;align-items:center}:host([sm-align-items=start]){-webkit-box-align:start;align-items:flex-start}:host([sm-align-items=end]){-webkit-box-align:end;align-items:flex-end}:host([sm-direction=column]){-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}:host([sm-direction=column-reverse]){-webkit-box-orient:vertical;-webkit-box-direction:reverse;flex-direction:column-reverse}:host([sm-direction=row]){-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row}:host([sm-direction=row-reverse]){-webkit-box-orient:horizontal;-webkit-box-direction:reverse;flex-direction:row-reverse}}@media(min-width:1280px){:host([md-wrap]){flex-wrap:wrap}:host([md-justify-content=between]){-webkit-box-pack:justify;justify-content:space-between}:host([md-justify-content=around]){justify-content:space-around}:host([md-justify-content=center]){-webkit-box-pack:center;justify-content:center}:host([md-justify-content=start]){-webkit-box-pack:start;justify-content:flex-start}:host([md-justify-content=end]){-webkit-box-pack:end;justify-content:flex-end}:host([md-align-items=center]){-webkit-box-align:center;align-items:center}:host([md-align-items=start]){-webkit-box-align:start;align-items:flex-start}:host([md-align-items=end]){-webkit-box-align:end;align-items:flex-end}:host([md-direction=column]){-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}:host([md-direction=column-reverse]){-webkit-box-orient:vertical;-webkit-box-direction:reverse;flex-direction:column-reverse}:host([md-direction=row]){-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row}:host([md-direction=row-reverse]){-webkit-box-orient:horizontal;-webkit-box-direction:reverse;flex-direction:row-reverse}}@media(min-width:1400px){:host([lg-wrap]){flex-wrap:wrap}:host([lg-justify-content=between]){-webkit-box-pack:justify;justify-content:space-between}:host([lg-justify-content=around]){justify-content:space-around}:host([lg-justify-content=center]){-webkit-box-pack:center;justify-content:center}:host([lg-justify-content=start]){-webkit-box-pack:start;justify-content:flex-start}:host([lg-justify-content=end]){-webkit-box-pack:end;justify-content:flex-end}:host([lg-align-items=center]){-webkit-box-align:center;align-items:center}:host([lg-align-items=start]){-webkit-box-align:start;align-items:flex-start}:host([lg-align-items=end]){-webkit-box-align:end;align-items:flex-end}:host([lg-direction=column]){-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}:host([lg-direction=column-reverse]){-webkit-box-orient:vertical;-webkit-box-direction:reverse;flex-direction:column-reverse}:host([lg-direction=row]){-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row}:host([lg-direction=row-reverse]){-webkit-box-orient:horizontal;-webkit-box-direction:reverse;flex-direction:row-reverse}}`;

class BaseFlex extends LitElement {
  constructor() {
    super();
    /**
     * Justify content
     * @type {"start"|"center"|"end"|"between"|"around"}
     * @attr
     */

    this.j = "";
    /**
     * Align items
     * @type {"start"|"center"|"end"}
     * @attr
     */

    this.a = "";
    /**
     * Direction items
     * @type {"column"|"column-reverse"|"row"|"row-reverse"}
     * @attr
     */

    this.d = "";
    this.wrap = false;
    /**
     * Justify content
     * @type {"start"|"center"|"end"|"between"|"around"}
     * @attr
     */

    this.sJ = "";
    /**
     * Align items
     * @type {"start"|"center"|"end"}
     * @attr
     */

    this.sA = "";
    /**
     * Direction items
     * @type {"column"|"column-reverse"|"row"|"row-reverse"}
     * @attr
     */

    this.sD = "";
    this.sWrap = false;
    /**
     * Justify content
     * @type {"start"|"center"|"end"|"between"|"around"}
     * @attr
     */

    this.mJ = "";
    /**
     * Align items
     * @type {"start"|"center"|"end"}
     * @attr
     */

    this.mA = "";
    /**
     * Direction items
     * @type {"column"|"column-reverse"|"row"|"row-reverse"}
     * @attr
     */

    this.mD = "";
    this.mWrap = false;
    /**
     * Justify content
     * @type {"start"|"center"|"end"|"between"|"around"}
     * @attr
     */

    this.lJ = "";
    /**
     * Align items
     * @type {"start"|"center"|"end"}
     * @attr
     */

    this.lA = "";
    /**
     * Direction items
     * @type {"column"|"column-reverse"|"row"|"row-reverse"}
     * @attr
     */

    this.lD = "";
    this.lWrap = false;
  }

  static get properties() {
    return {
      j: {
        type: String,
        attribute: "justify-content"
      },
      a: {
        type: String,
        attribute: "align-items"
      },
      d: {
        type: String,
        attribute: "direction"
      },
      wrap: {
        type: Boolean
      },
      sJ: {
        type: String,
        attribute: "sm-justify-content"
      },
      sA: {
        type: String,
        attribute: "sm-align-items"
      },
      sD: {
        type: String,
        attribute: "sm-direction"
      },
      sWrap: {
        type: Boolean,
        attribute: "sm-wrap"
      },
      mJ: {
        type: String,
        attribute: "md-justify-content"
      },
      mA: {
        type: String,
        attribute: "md-align-items"
      },
      mD: {
        type: String,
        attribute: "md-direction"
      },
      mWrap: {
        type: Boolean,
        attribute: "m-wrap"
      },
      lJ: {
        type: String,
        attribute: "lg-justify-content"
      },
      lA: {
        type: String,
        attribute: "lg-align-items"
      },
      lD: {
        type: String,
        attribute: "lg-direction"
      },
      lWrap: {
        type: Boolean,
        attribute: "lg-wrap"
      }
    };
  }

  static get styles() {
    return [styles$7, sharedStyles];
  }

  render() {
    return html` <slot></slot> `;
  }

}

if (!customElements.get("base-flex")) {
  customElements.define("base-flex", BaseFlex);
}

var styles$8 = css`:host{text-align:left}:host,:host([inline]),:host([inline])>:first-child{display:inline-block}:host([full]),:host([full])>:first-child{display:block;width:100%}:host([look=h1])>:first-child,:host([tag=h1])>:first-child{font-size:var(--base-font-size-xl)}:host([look=h2])>:first-child,:host([tag=h2])>:first-child{font-size:var(--base-font-size-lg)}:host([look=h3])>:first-child,:host([tag=h3])>:first-child{font-size:var(--base-font-size-md)}:host([look=h4])>:first-child,:host([tag=h4])>:first-child{font-size:var(--base-font-size-sm)}:host([look=h5])>:first-child,:host([look=h6])>:first-child,:host([look=small])>:first-child,:host([tag=h5])>:first-child,:host([tag=h6])>:first-child,:host([tag=small])>:first-child{font-size:var(--base-font-size-xs)}:host([look=h1])>:first-child,:host([look=h2])>:first-child,:host([look=h4])>:first-child,:host([look=h5])>:first-child,:host([look=h6])>:first-child,:host([tag=h1])>:first-child,:host([tag=h2])>:first-child,:host([tag=h4])>:first-child,:host([tag=h5])>:first-child,:host([tag=h6])>:first-child{color:var(--base-color-font-dark)}:host([look=p])>:first-child,:host([look=small])>:first-child,:host([tag=p])>:first-child,:host([tag=small])>:first-child{color:var(--base-color-font)}:host([look=i])>:first-child,:host([look=lead])>:first-child,:host([tag=i])>:first-child{color:var(--base-color-font-light)}:host([look=h6])>:first-child,:host([tag=h6])>:first-child{text-transform:uppercase}:host([look=h1]:not([inline])),:host([look=h2]:not([inline])),:host([look=h3]:not([inline])),:host([look=h4]:not([inline])),:host([look=h5]:not([inline])),:host([look=h6]:not([inline])),:host([tag=h1]:not([inline])),:host([tag=h2]:not([inline])),:host([tag=h3]:not([inline])),:host([tag=h4]:not([inline])),:host([tag=h5]:not([inline])),:host([tag=h6]:not([inline])){display:block;width:100%}:host([weight="100"]){font-weight:100}:host([weight="200"]){font-weight:200}:host([weight="300"]){font-weight:300}:host([weight="400"]){font-weight:400}:host([weight="500"]){font-weight:500}:host([weight="600"]){font-weight:600}:host([weight="700"]){font-weight:700}:host([weight="800"]){font-weight:800}:host([weight="900"]){font-weight:900}:host b,:host h1,:host h2,:host h3,:host h4,:host h5,:host h6,:host i,:host p,:host small{font-weight:inherit;margin-top:0}:host b,:host h1,:host h2,:host h3,:host h4,:host h5,:host h6{color:var(--base-color-font-dark)}:host p,:host small{color:var(--base-color-font)}:host([look=lead])>:first-child{font-size:1.4rem;line-height:32px;font-weight:300;color:var(--base-color-font-light)}`;

class BaseText extends LitElement {
  constructor() {
    super();
    /**
     * Button state
     * @type {"h1"|"h2"|"h3"|"h4"|"h5"|"h6"|"small"|"p"}
     * @attr
     */

    this.tag = "";
    /**
     * Button look
     * @type {"h1"|"h2"|"h3"|"h4"|"h5"|"h6"|"small"|"p"|"lead"}
     * @attr
     */

    this.look = "p";
    this.weight = "";
    this.full = false;
  }

  static get properties() {
    return {
      tag: {
        type: String
      },
      look: {
        type: String
      },
      weight: {
        type: String
      },
      full: {
        type: Boolean
      }
    };
  }

  static get styles() {
    return [styles$8, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    switch (this.tag) {
      case "h1":
        return html`<h1><slot></slot></h1>`;

      case "h2":
        return html`<h2><slot></slot></h2>`;

      case "h3":
        return html`<h3><slot></slot></h3>`;

      case "h4":
        return html`<h4><slot></slot></h4>`;

      case "h5":
        return html`<h5><slot></slot></h5>`;

      case "h6":
        return html`<h6><slot></slot></h6>`;

      case "p":
        return html`<p><slot></slot></p>`;

      case "small":
        return html`<small><slot></slot></small>`;

      case "b":
        return html`<b><slot></slot></b>`;

      case "i":
        return html`<i><slot></slot></i>`;

      case "span":
        return html`<span><slot></slot></span>`;

      case "div":
        return html`<div><slot></slot></div>`;

      default:
        return html`<p><slot></slot></p>`;
    }
  }

}

if (!customElements.get("base-text")) {
  customElements.define("base-text", BaseText);
}

var styles$9 = css`:host{width:100%;max-width:var(--base-container);display:block}:host([center]){margin:0 auto}:host([size=xs]){max-width:var(--base-container-xs)}:host([size=sm]){max-width:var(--base-container-sm)}:host([size=md]){max-width:var(--base-container-md)}:host([size=lg]){max-width:var(--base-container-lg)}:host([size=xl]){max-width:var(--base-container-xl)}`;

class BaseContainer extends LitElement {
  constructor() {
    super();
    /**
     * Center  container
     * @type {Boolean}
     * @attr
     */

    this.center;
    /**
     * Width of container
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */

    this.size;
  }

  static get properties() {
    return {
      center: {
        type: Boolean
      },
      size: {
        type: String
      }
    };
  }

  static get styles() {
    return [styles$9, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`<slot></slot>`;
  }

}

if (!customElements.get("base-container")) {
  customElements.define("base-container", BaseContainer);
}

var styles$a = css`:host{--base-toggle-height:var(--base-size-md);--base-toggle-box-size:var(--base-size-sm);--base-toggle-indicator-margin:var(--base-space-xs);--base-toggle-indicator-size:calc(var(--base-toggle-box-size) - var(--base-toggle-indicator-margin)*2);--base-toggle-icon-size:calc(var(--base-toggle-indicator-size)*0.8);vertical-align:middle;cursor:pointer;display:-webkit-inline-box;display:inline-flex;-webkit-box-align:center;align-items:center;height:var(--base-toggle-height)}:host([full]){width:100%}:host([full]),:host label{display:-webkit-box;display:flex}:host label{-webkit-box-align:center;align-items:center}:host input{position:absolute;clip:rect(1px 1px 1px 1px);clip:rect(1px,1px,1px,1px);vertical-align:middle}:host input:focus+[part=box]{box-shadow:0 0 0 2px var(--base-color-focus)}[part=box]{position:relative;background:var(--base-color-ui-light);border:2px solid var(--base-color-ui-light);border-radius:300px;display:inline-block;-webkit-transition:all .2s ease;transition:all .2s ease;height:var(--base-toggle-box-size);width:calc(var(--base-toggle-box-size)*1.8);flex-basis:calc(var(--base-toggle-box-size)*1.8);flex-shrink:0;-webkit-box-flex:0;flex-grow:0}:host input:checked+[part=box]{border-color:var(--base-color-focus);background:var(--base-color-focus)}[part=indicator]{background:var(--base-color-white);position:absolute;left:var(--base-toggle-indicator-margin);top:50%;-webkit-transition:all .2s ease;transition:all .2s ease;-webkit-transform:translateY(-50%) translateX(0);transform:translateY(-50%) translateX(0);border-radius:50%;width:var(--base-toggle-indicator-size);height:var(--base-toggle-indicator-size)}:host(:hover) [part=indicator]{box-shadow:0 1px 4px 0 rgba(0,0,0,.2)}[part=box] [part=on]{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;display:block;left:var(--base-toggle-indicator-margin)}[part=box] [part=off],[part=box] [part=on]{color:var(--base-color-white);position:absolute;width:var(--base-toggle-icon-size);height:var(--base-toggle-icon-size);border-radius:50%;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);content:""}[part=box] [part=off]{text-align:center;display:block;right:var(--base-toggle-indicator-margin)}:host input:checked+[part=box] [part=indicator]{left:calc(100% - var(--base-toggle-indicator-margin));-webkit-transform:translateY(-50%) translateX(-100%);transform:translateY(-50%) translateX(-100%)}[part=label]{padding-left:var(--base-space-md);font-weight:400}:host([size=sm]){--base-toggle-height:var(--base-size-sm);--base-toggle-box-size:var(--base-size-xs);--base-toggle-indicator-margin:4px}:host([size=md]){--base-toggle-height:var(--base-size-md);--base-toggle-box-size:var(--base-size-sm);--base-toggle-indicator-margin:4px}:host([size=lg]){--base-toggle-height:var(--base-size-lg);--base-toggle-box-size:var(--base-size-md);--base-toggle-indicator-margin:4px}`;

class BaseToggle extends LitElement {
  constructor() {
    super();
    this.checked = false;
    this.full = false;
    /**
     * Toggle size
     * @type {"sm"|"md"|"lg"}
     * @attr
     */

    this.size = "";
    this.value = "";
    this._checked = false;
    this._handleChange = this._handleChange.bind(this);
  }

  static get properties() {
    return {
      checked: {
        type: Boolean,
        reflect: true
      },
      value: {
        type: String
      },
      size: {
        type: String
      },
      full: {
        type: Boolean
      }
    };
  }

  get inputEl() {
    return this.shadowRoot.querySelector("input");
  }

  get checked() {
    return this._checked;
  }

  set checked(checked) {
    if (this._checked === checked) return;
    if (checked) this.setAttribute("checked", "");else this.removeAttribute("checked");
    this._checked = checked;

    if (this.inputEl) {
      this.inputEl.checked = checked;
    }

    this.dispatchEvent(new CustomEvent("change"));
    this.requestUpdate();
  }

  static get styles() {
    return [styles$a, sharedStyles];
  }

  _handleChange(e) {
    e.stopPropagation();
    this.checked = e.target.checked;
  }

  render() {
    return html`
      <label>
        <input
          part="input-field"
          @change=${this._handleChange}
          ?checked=${this.checked}
          value=${this.value}
          type="checkbox"
        />
        <span part="box">
          <slot part="on" name="on"></slot>
          <span part="indicator"></span>
          <slot part="off" name="off"></slot>
        </span>
        <span part="label"><slot></slot></span>
      </label>
    `;
  }

}

if (!customElements.get("base-toggle")) {
  customElements.define("base-toggle", BaseToggle);
}

var styles$b = css`:host{display:inline-block}:host([full]),:host([full]) textarea{display:block;width:100%}:host textarea{box-sizing:border-box;display:inline-block;outline:0;font-size:var(--base-font-size-sm);font-family:var(--base-font-family);color:var(--base-color-black);background-color:var(--base-color-white);padding:var(--base-space-md);border:2px solid var(--base-color-ui-lighter)}:host textarea:hover{border-color:var(--base-color-ui-light);background-color:var(--base-color-ui-lighter)}:host textarea:focus{border-color:var(--base-color-focus);background-color:var(--base-color-white)}`;

class BaseTextArea extends LitElement {
  constructor() {
    super();
  }

  static get properties() {
    return {
      full: {
        type: Boolean
      },
      cols: {
        type: String
      },
      rows: {
        type: String
      }
    };
  }

  static get styles() {
    return [styles$b, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`<textarea part="input-field"></textarea>`;
  }

}

if (!customElements.get("base-textarea")) {
  customElements.define("base-textarea", BaseTextArea);
}

var styles$c = css`:host{--base-tab-box-shadow:0 0;display:-webkit-inline-box;display:inline-flex}:host([full]){display:-webkit-box;display:flex;width:100%}button{border:0;color:var(--base-color-font-light);font-size:var(--base-font-size-sm);background:0;box-shadow:var(--base-tab-box-shadow);outline:0;padding:0 var(--base-space-sm);margin-right:var(--base-space-sm);height:var(--base-size-md);border-bottom:2px solid transparent}button:focus,button:hover{border-bottom:2px solid var(--base-color-ui-light)}:host([selected]) button,button:focus{color:var(--base-color-font-dark)}:host([selected]) button{border-bottom:2px solid var(--base-color-focus)}`;

function getTabValue(tab) {
  return tab.value || tab.getAttribute("value") || tab.innerText;
}

class BaseTabs extends LitElement {
  constructor() {
    super();
    this._value = "";
    this._handleClick = this._handleClick.bind(this);
  }

  static get properties() {
    return {
      value: {
        type: String,
        reflect: "true"
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", this._handleClick);
  }

  _handleClick(e) {
    this.value = getTabValue(e.target);
  }

  get tabElements() {
    return [...this.children];
  }

  get selectedTab() {
    return this.tabElements.find(tab => tab.hasAttribute("selected"));
  }

  get value() {
    return this._value;
  }

  set value(val) {
    if (this._value === val) return;
    this._value = val;
    this.setAttribute("value", val);

    if (this.selectedTab) {
      this.selectedTab.removeAttribute("selected");
    }

    const newSelectedTab = this.tabElements.find(tab => getTabValue(tab) === val);

    if (newSelectedTab) {
      newSelectedTab.setAttribute("selected", "");
    }

    this.dispatchEvent(new CustomEvent("change"));
  }

  static get styles() {
    return [styles$c, sharedStyles];
  }

  render() {
    return html`<slot></slot>`;
  }

}

if (!customElements.get("base-tabs")) {
  customElements.define("base-tabs", BaseTabs);
}

class BaseTab extends LitElement {
  constructor() {
    super();
    this.selected = false;
    this.disabled = false;
    this._value = "";
  }

  static get properties() {
    return {
      selected: {
        type: Boolean,
        reflect: true
      },
      disabled: {
        type: Boolean,
        reflect: true
      },
      value: {
        type: String
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
  }

  set value(val) {
    this._value = val;
  }

  get value() {
    return this._value || this.innerText || this.textContent;
  }

  static get styles() {
    return [styles$c, sharedStyles];
  }

  render() {
    return html` <button><slot></slot></button>`;
  }

}

if (!customElements.get("base-tab")) {
  customElements.define("base-tab", BaseTab);
}

var styles$d = css`:host{--base-grid-columns:12;--base-grid-gap:var(--base-space-md);box-sizing:border-box;display:grid;grid-template-columns:repeat(var(--base-grid-columns),1fr);grid-row-gap:var(--base-grid-gap);grid-column-gap:var(--base-grid-gap);margin:0;width:100%;max-width:100%}:host([gap=sm]){--base-grid-gap:var(--base-space-sm)}:host([gap=md]){--base-grid-gap:var(--base-space-md)}:host([gap=lg]){--base-grid-gap:var(--base-space-lg)}:host([gap=xl]){--base-grid-gap:var(--base-space-xl)}:host([gap-sm=sm]){--base-grid-gap:var(--base-space-sm)}:host([gap-sm=md]){--base-grid-gap:var(--base-space-md)}:host([gap-sm=lg]){--base-grid-gap:var(--base-space-lg)}:host([gap-sm=xl]){--base-grid-gap:var(--base-space-xl)}@media(min-width:800px){:host([gap-md=sm]){--base-grid-gap:var(--base-space-sm)}:host([gap-md=md]){--base-grid-gap:var(--base-space-md)}:host([gap-md=lg]){--base-grid-gap:var(--base-space-lg)}:host([gap-md=xl]){--base-grid-gap:var(--base-space-xl)}}@media(min-width:1200px){:host([gap-lg=sm]){--base-grid-gap:var(--base-space-sm)}:host([gap-lg=md]){--base-grid-gap:var(--base-space-md)}:host([gap-lg=lg]){--base-grid-gap:var(--base-space-lg)}:host([gap-lg=xl]){--base-grid-gap:var(--base-space-xl)}}@media(min-width:1400px){:host([gap-xl=sm]){--base-grid-gap:var(--base-space-sm)}:host([gap-xl=md]){--base-grid-gap:var(--base-space-md)}:host([gap-xl=lg]){--base-grid-gap:var(--base-space-lg)}:host([gap-xl=xl]){--base-grid-gap:var(--base-space-xl)}}:host([columns="1"]){--base-grid-columns:1}:host([columns="2"]){--base-grid-columns:2}:host([columns="3"]){--base-grid-columns:3}:host([columns="4"]){--base-grid-columns:4}:host([columns="5"]){--base-grid-columns:5}:host([columns="6"]){--base-grid-columns:6}:host([columns="7"]){--base-grid-columns:7}:host([columns="8"]){--base-grid-columns:8}:host([columns="9"]){--base-grid-columns:9}:host([columns="10"]){--base-grid-columns:10}:host([columns="11"]){--base-grid-columns:11}:host([columns="12"]){--base-grid-columns:12}`;

class BaseGrid extends LitElement {
  constructor() {
    super();
    /**
     * Grid gap
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */

    this.gap = "sm";
    /**
     * Grid gap
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */

    this.gapSm = "";
    /**
     * Grid gap
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */

    this.gapMd = "";
    /**
     * Grid gap
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */

    this.gapLg = "";
    /**
     * Grid gap
     * @type {"xs"|"sm"|"md"|"lg"|"xl"}
     * @attr
     */

    this.gapXl = "";
    this.columns = "12";
  }

  static get properties() {
    return {
      gap: {
        type: String
      },
      gapSm: {
        type: String
      },
      gapMd: {
        type: String
      },
      gapLg: {
        type: String
      },
      gapXl: {
        type: String
      },
      columns: {
        type: String
      }
    };
  }

  static get styles() {
    return [styles$d, sharedStyles];
  }

  render() {
    return html` <slot></slot> `;
  }

}

if (!customElements.get("base-grid")) {
  customElements.define("base-grid", BaseGrid);
}

var styles$e = css`:host{display:block;width:100%;max-width:100%;grid-column-end:span var(--base-grid-ce,1);grid-row-end:span var(--base-grid-re,1);-webkit-appearance:none;-moz-appearance:none;appearance:none;margin-bottom:0;box-sizing:border-box;padding:0}:host:first-of-type{margin-top:unset}:host([sm="1"]){display:block;max-width:100%;--base-grid-ce:1}:host([sm="2"]){display:block;max-width:100%;--base-grid-ce:2}:host([sm="3"]){display:block;max-width:100%;--base-grid-ce:3}:host([sm="4"]){display:block;max-width:100%;--base-grid-ce:4}:host([sm="5"]){display:block;max-width:100%;--base-grid-ce:5}:host([sm="6"]){display:block;max-width:100%;--base-grid-ce:6}:host([sm="7"]){display:block;max-width:100%;--base-grid-ce:7}:host([sm="8"]){display:block;max-width:100%;--base-grid-ce:8}:host([sm="9"]){display:block;max-width:100%;--base-grid-ce:9}:host([sm="10"]){display:block;max-width:100%;--base-grid-ce:10}:host([sm="11"]){display:block;max-width:100%;--base-grid-ce:11}:host([sm="12"]){display:block;max-width:100%;--base-grid-ce:12}@media(min-width:800px){:host([md="1"]){display:block;max-width:100%;--base-grid-ce:1}:host([md="2"]){display:block;max-width:100%;--base-grid-ce:2}:host([md="3"]){display:block;max-width:100%;--base-grid-ce:3}:host([md="4"]){display:block;max-width:100%;--base-grid-ce:4}:host([md="5"]){display:block;max-width:100%;--base-grid-ce:5}:host([md="6"]){display:block;max-width:100%;--base-grid-ce:6}:host([md="7"]){display:block;max-width:100%;--base-grid-ce:7}:host([md="8"]){display:block;max-width:100%;--base-grid-ce:8}:host([md="9"]){display:block;max-width:100%;--base-grid-ce:9}:host([md="10"]){display:block;max-width:100%;--base-grid-ce:10}:host([md="11"]){display:block;max-width:100%;--base-grid-ce:11}:host([md="12"]){display:block;max-width:100%;--base-grid-ce:12}}@media(min-width:1200px){:host([lg="1"]){display:block;max-width:100%;--base-grid-ce:1}:host([lg="2"]){display:block;max-width:100%;--base-grid-ce:2}:host([lg="3"]){display:block;max-width:100%;--base-grid-ce:3}:host([lg="4"]){display:block;max-width:100%;--base-grid-ce:4}:host([lg="5"]){display:block;max-width:100%;--base-grid-ce:5}:host([lg="6"]){display:block;max-width:100%;--base-grid-ce:6}:host([lg="7"]){display:block;max-width:100%;--base-grid-ce:7}:host([lg="8"]){display:block;max-width:100%;--base-grid-ce:8}:host([lg="9"]){display:block;max-width:100%;--base-grid-ce:9}:host([lg="10"]){display:block;max-width:100%;--base-grid-ce:10}:host([lg="11"]){display:block;max-width:100%;--base-grid-ce:11}:host([lg="12"]){display:block;max-width:100%;--base-grid-ce:12}}@media(min-width:1400px){:host([xl="1"]){display:block;max-width:100%;--base-grid-ce:1}:host([xl="2"]){display:block;max-width:100%;--base-grid-ce:2}:host([xl="3"]){display:block;max-width:100%;--base-grid-ce:3}:host([xl="4"]){display:block;max-width:100%;--base-grid-ce:4}:host([xl="5"]){display:block;max-width:100%;--base-grid-ce:5}:host([xl="6"]){display:block;max-width:100%;--base-grid-ce:6}:host([xl="7"]){display:block;max-width:100%;--base-grid-ce:7}:host([xl="8"]){display:block;max-width:100%;--base-grid-ce:8}:host([xl="9"]){display:block;max-width:100%;--base-grid-ce:9}:host([xl="10"]){display:block;max-width:100%;--base-grid-ce:10}:host([xl="11"]){display:block;max-width:100%;--base-grid-ce:11}:host([xl="12"]){display:block;max-width:100%;--base-grid-ce:12}}`;

class BaseGridItem extends LitElement {
  constructor() {
    super();
    this.sm = "";
    this.md = "";
    this.lg = "";
    this.xl = "";
  }

  static get properties() {
    return {
      sm: {
        type: String
      },
      md: {
        type: String
      },
      lg: {
        type: String
      },
      xl: {
        type: String
      }
    };
  }

  static get styles() {
    return [styles$e, sharedStyles];
  }

  render() {
    return html` <slot></slot> `;
  }

}

if (!customElements.get("base-grid-item")) {
  customElements.define("base-grid-item", BaseGridItem);
}

var selectStyles = css`:host{--base-select-active-color:var(--base-color-focus);--base-select-font-size:var(--base-font-size-sm);--base-select-min-height:var(--base-size-md);--base-select-background:0;--base-select-padding:0;--base-select-placeholder-color:var(--base-color-font-light);--base-select-border-width:2px;--base-select-border-style:solid;--base-select-border-color:var(--base-color-ui-light);--base-select-border-radius:none;--base-select-option-list-border:1px solid var(--base-color-ui-light);--base-select-option-list-border-radius:var(--base-select-border-radius-sm);--base-select-option-list-box-shadow:0 0;--base-select-option-list-position:absolute;--base-select-option-list-top:110%;--base-select-option-list-transition:none;--base-select-option-list-opacity:1;vertical-align:middle;display:-webkit-inline-box;display:inline-flex;-webkit-box-align:start;align-items:flex-start;-webkit-box-pack:between;justify-content:between;flex-wrap:wrap;box-sizing:border-box;max-width:100%;font-size:var(--base-select-font-size);height:var(--base-select-min-height);padding:var(--base-select-padding);background-color:var(--base-color-white);border:var(--base-select-border-width) var(--base-select-border-style) var(--base-select-border-color);border-radius:var(--base-select-border-radius);position:relative}:host([multiple]){min-height:var(--base-select-min-height);height:auto}:host([full]){display:-webkit-box;display:flex}[hidden]{display:none !important}:host(:hover:not([multiple]):not([focused])){--base-select-border-color:var(--base-color-ui)}:host([focused]){box-shadow:0 0 0 1px var(--base-select-active-color);--base-select-border-color:var(--base-select-active-color)}:host([disabled]){--base-select-background:#eee}:host([searchable]) [part=input-field]{cursor:text}:host [part=input-field]::-webkit-input-placeholder{font-size:var(--base-select-font-size);color:var(--base-select-placeholder-color)}:host [part=input-field]::-moz-placeholder{font-size:var(--base-select-font-size);color:var(--base-select-placeholder-color)}:host [part=input-field]:-ms-input-placeholder{font-size:var(--base-select-font-size);color:var(--base-select-placeholder-color)}:host [part=input-field]::-ms-input-placeholder{font-size:var(--base-select-font-size);color:var(--base-select-placeholder-color)}:host [part=input-field]::placeholder{font-size:var(--base-select-font-size);color:var(--base-select-placeholder-color)}:host(:not([multiple])) [part=input-field][has-value]::-webkit-input-placeholder{--base-select-placeholder-color:var(--base-color-font);opacity:1}:host(:not([multiple])) [part=input-field][has-value]::-moz-placeholder{--base-select-placeholder-color:var(--base-color-font);opacity:1}:host(:not([multiple])) [part=input-field][has-value]:-ms-input-placeholder{--base-select-placeholder-color:var(--base-color-font);opacity:1}:host(:not([multiple])) [part=input-field][has-value]::-ms-input-placeholder{--base-select-placeholder-color:var(--base-color-font);opacity:1}:host(:not([multiple])) [part=input-field][has-value]::placeholder{--base-select-placeholder-color:var(--base-color-font);opacity:1}.input-wrapper{flex-wrap:wrap;display:-webkit-box;display:flex;-webkit-box-flex:1;flex:1;min-height:var(--base-select-min-height)}[part=input-field]{-webkit-box-flex:1;flex:1;width:100%;cursor:pointer;padding-left:8px;background:transparent;color:var(--base-color-font);height:var(--base-select-min-height);font-size:16px;border:0;outline:0}.buttons-wrapper{display:-webkit-box;display:flex}button[part=clear-button]{color:#333;background:transparent}button[part=arrow-button],button[part=clear-button]{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;width:var(--base-select-min-height);height:var(--base-select-min-height);border:0;outline:0}button[part=arrow-button]{text-align:center;background:0}button[part=arrow-button] .arrow-up{border-bottom:5px solid var(--base-color-black)}button[part=arrow-button] .arrow-down,button[part=arrow-button] .arrow-up{width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent}button[part=arrow-button] .arrow-down{border-top:5px solid var(--base-color-black)}div[part=tag]{font-size:14px;display:-webkit-inline-box;display:inline-flex;-webkit-box-pack:justify;justify-content:space-between;-webkit-box-align:center;align-items:center;height:calc(var(--base-select-min-height) - var(--base-space-sm));padding-left:var(--base-space-xs);margin-left:var(--base-space-sm);margin-top:var(--base-space-xs);margin-bottom:var(--base-space-xs);background:var(--base-color-ui-lighter)}button[part=remove-tag]{border:0;color:currentColor;background:0;margin-left:var(--base-space-xs)}:host([list-open]) div[part=option-list]{visibility:visible}div[part=option-list]{visibility:hidden;position:var(--base-select-option-list-position);left:0;top:var(--base-select-option-list-top);width:100%;max-width:100%;z-index:600;-webkit-transition:var(--base-select-option-list-transition);transition:var(--base-select-option-list-transition);box-sizing:border-box;border:var(--base-select-option-list-border);margin:0;opacity:var(--base-select-option-list-opacity);list-style:none;box-shadow:var(--base-select-option-list-box-shadow);border-radius:var(--base-select-option-list-border-radius);background:#fff;max-height:300px;overflow-y:scroll;overflow-x:hidden}::slotted([slot=no-options]){display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;color:var(--base-color-font-ligth);height:var(--base-size-md);padding:0 var(--base-space-sm);background:#fff}`;

class BaseSelect extends LitElement {
  constructor() {
    super(); // full width

    this.full = false; // placeholder input value

    this.placeholder = ""; // support multiple select

    this.multiple = false; // input aria-label

    this.ariaLabel = "Select an option"; // hide arrow

    this.hideArrow = false; // show clear button

    this.clearable = false; // disabled input

    this.disabled = false; // input is focused

    this.focused = false; // disable default filter if you want you own custom filtering of the options

    this.disableFilter = false; // clear all selected values

    this.clearSelected = this.clearSelected.bind(this); // focus input

    this.focus = this.focus.bind(this); // is searchable

    this.searchable = false; // keep menu open on select

    this.listOpenOnSelect = false; // show suggestions

    this._listOpen = false; // input value

    this._inputValue = "";
    /**
     * https://lit-element.polymer-project.org/guide/properties#accessors
     * Selected value
     */

    this._value = ""; // filter list

    this._filterList = this._filterList.bind(this); // handle all key events

    this._handleKeyEvent = this._handleKeyEvent.bind(this); // handle all input events

    this._handleInputEvent = this._handleInputEvent.bind(this); // handle blur event

    this._handleBlurEvent = this._handleBlurEvent.bind(this); // handle focus event

    this._handleFocusEvent = this._handleFocusEvent.bind(this); // handle input click

    this._handleArrowButtonClick = this._handleArrowButtonClick.bind(this); // handle when you want to select an option

    this._selectOption = this._selectOption.bind(this); // choose option for single select

    this._chooseOption = this._chooseOption.bind(this); // add option for multiple select

    this._addOption = this._addOption.bind(this); // handle remove option

    this._removeOption = this._removeOption.bind(this); // scroll to active element in the sugggestion list

    this._scrollToActive = this._scrollToActive.bind(this); // handle hover on list options

    this._handleListMouseOver = this._handleListMouseOver.bind(this); // handle mouse click on list options

    this._handleListMouseDown = this._handleListMouseDown.bind(this); // handle mouse click on list options

    this._handleListMouseUp = this._handleListMouseUp.bind(this); // an option was just clicked, used for timeout

    this._menuJustClicked = false;
  }

  static get properties() {
    return {
      full: {
        type: Boolean
      },
      ariaLabel: {
        type: String,
        attribute: "aria-label"
      },
      disabled: {
        type: Boolean
      },
      listOpen: {
        type: Boolean,
        attribute: "list-open"
      },
      value: {
        type: String
      },
      focused: {
        type: Boolean,
        reflect: true
      },
      multiple: {
        type: Boolean
      },
      hideArrow: {
        type: Boolean,
        attribute: "hide-arrow"
      },
      placeholder: {
        type: String
      },
      searchable: {
        type: Boolean
      },
      clearable: {
        type: Boolean
      },
      value: {
        type: String
      },
      inputValue: {
        type: String,
        attribute: "input-value"
      },
      listOpenOnSelect: {
        type: Boolean,
        attribute: "list-open-on-select"
      },
      disableFilter: {
        type: Boolean,
        attribute: "disable-filter"
      }
    };
  }

  static get styles() {
    return [selectStyles, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback(); // add mousedown event listener to catch click before focus dissapears
  }

  set value(v) {
    // default value to empty string
    const val = v || "";

    if (this.multiple) {
      this.allOptions.forEach(option => {
        const isSelected = val.split(",").includes(option.value);
        if (isSelected) option.setAttribute("selected", "");else option.removeAttribute("selected");
      });
    } else {
      this.allOptions.forEach(option => {
        if (option.selected && option.value !== val) option.removeAttribute("selected");
        if (!option.selected && option.value === val) option.setAttribute("selected", "");
      });
    }

    this._value = val;

    this._dispatchChange();

    this.requestUpdate();
  }

  get value() {
    if (this._value) {
      return this._value;
    } else if (this.multiple) {
      return this.allOptions.filter(o => o.hasAttribute("selected")).map(o => o.value).toString();
    } else {
      return this._selectedEl ? this._selectedEl.value : "";
    }
  }

  get _selectedElements() {
    return this.allOptions.filter(o => this.value.split(",").includes(o.value));
  }

  get _selectedEl() {
    return this.allOptions.find(o => {
      return o.hasAttribute("selected");
    });
  }

  get allOptions() {
    return [...this.querySelectorAll("base-option")];
  }

  get suggestions() {
    const availableSuggestions = [...this.querySelectorAll("base-option:not([disabled])")];
    const suggestions = availableSuggestions.filter(i => {
      const isDisplayNone = getComputedStyle(i, null).display === "none";
      return !isDisplayNone && !i.hasAttribute("hidden");
    });
    return suggestions;
  }

  get activeSuggestion() {
    return this.suggestions.find(sugg => sugg.active);
  }

  get _inputField() {
    return this.shadowRoot.querySelector("input");
  }

  get _suggestionList() {
    return this.shadowRoot.querySelector("div[part='option-list']");
  }

  get inputValue() {
    return this._inputValue;
  }

  set inputValue(val) {
    const value = val ? val : ""; // Set new value

    this._inputValue = value;

    this._filterList(); // Request update so the setter works as an opbserved value


    this.requestUpdate();
  }

  get listOpen() {
    return this._listOpen;
  }

  set listOpen(show) {
    if (this._listOpen === show) return;
    if (show) this.setAttribute("list-open", "");else this.removeAttribute("list-open");
    this._listOpen = show; // if suggestion list is shown, make either first or the selected value active

    if (show) {
      const firstActive = this.activeSuggestion || this._selectedEl || this.suggestions[0];
      firstActive.setAttribute("active", "");

      this._scrollToActive();
    } else {
      this.activeSuggestion && this.activeSuggestion.removeAttribute("active");
    }

    this.requestUpdate();
  }

  focus() {
    this._inputField.focus();
  }

  clearSelected() {
    this.value = "";
    this.inputValue = "";
  }

  _filterList() {
    const {
      inputValue,
      disableFilter
    } = this; // Search for all matches and show the option

    this.allOptions.forEach(option => {
      // Return matched option, or return always match if filter@
      // is turned off
      const isMatch = disableFilter ? true : option.label.toLowerCase().includes(inputValue.toLowerCase());

      if (!isMatch && option.active) {
        // remove active state
        option.removeAttribute("active");
      }

      if (isMatch) {
        option.hidden = false;
      } else {
        option.hidden = true;
      }
    });
  }

  _selectOption(optionEl) {
    // don't select anything if we can't see the suggestion list
    if (!this.listOpen) return;
    if (optionEl.disabled) return; // single select or multiple select

    const select = this.multiple ? this._addOption : this._chooseOption;
    select(optionEl);
  } //  choose option for single select


  _chooseOption(optionEl) {
    if (optionEl.value === this.value) {
      // reset value
      this.inputValue = "";
    } else {
      this.value = optionEl.value;
      this.inputValue = "";
    }

    this.focus();
    this.listOpen = this.listOpenOnSelect ? true : false;
  } // add option for multiple select


  _addOption(optionEl) {
    // reset value
    this.inputValue = "";

    if (optionEl.hasAttribute("selected")) {
      this._removeOption(optionEl);
    } else {
      this.value = this.value.concat("," + optionEl.value);
    }

    this.focus();
    this.listOpen = this.listOpenOnSelect ? true : false;
    this.requestUpdate();
  } // remove option for multiple select


  _removeOption(optionEl) {
    if (this.multiple) {
      this.value = this.value.split(",").filter(val => val !== optionEl.value).toString();
    } else {
      this.value = "";
    }

    this._dispatchChange();

    this.requestUpdate();
  }

  _dispatchChange() {
    this.dispatchEvent(new CustomEvent("change"));
  }

  _handleFocusEvent() {
    this.focused = true;
    this.listOpen = true;
  }

  _handleBlurEvent(e) {
    setTimeout(() => {
      if (this._menuJustClicked) {
        e.preventDefault();
        this._menuJustClicked = false;
        return;
      }

      this.focused = false;
      this.inputValue = "";
      this.listOpen = false;
    }, 100);
  }

  _handleListMouseOver(e) {
    if (e.target.tagName === "BASE-OPTION") {
      if (this.activeSuggestion !== e.target) {
        this.activeSuggestion && this.activeSuggestion.removeAttribute("active");
      }

      e.target.setAttribute("active", "");
    }
  }

  _handleListMouseDown() {
    this._menuJustClicked = true;
  }

  _handleListMouseUp(e) {
    if (e.target.tagName === "BASE-OPTION") {
      this._selectOption(e.target);
    }
  }

  _handleInputEvent(e) {
    e.stopPropagation(); // First set the value `base-select` to the target value of the input element

    this.inputValue = e.target.value; // Then when we dispatch the event, the event.target.value will be correct

    this.dispatchEvent(new CustomEvent("input", e));
    this.listOpen = true;
  }

  _handleKeyEvent(e) {
    const {
      keyCode
    } = e;
    const {
      suggestions,
      activeSuggestion
    } = this; // Space
    // Dont hide suggestions if search enabled

    if (keyCode === 32 && !this.searchable) {
      this.listOpen = !this.listOpen;
    } // Escape


    if (keyCode === 27) {
      this.listOpen = false;
    } // Enter


    if (keyCode === 13 && activeSuggestion) {
      this._selectOption(activeSuggestion);
    } // Backspace


    if (keyCode === 8) {
      if (this.listOpen === false) {
        this.listOpen = true;
      }

      if (this.multiple) {
        // don't delete if there's something in the input
        if (this.inputValue) return;

        if (this._selectedElements.length) {
          this._removeOption(this._selectedElements[this._selectedElements.length - 1]);
        }
      } else {
        if (this.inputValue.length === 0) {
          // Remove selected option if user presses backspace when input is empty
          this.clearSelected();
          this.requestUpdate();
        }
      }
    } // Arrow up


    if (keyCode === 38) {
      e.preventDefault();
      if (!this.suggestions.length) return;

      if (!this.listOpen) {
        // always show sugggestions when navigation with arrows
        this.listOpen = true;
        return;
      }

      if (!activeSuggestion) {
        suggestions[suggestions.length - 1].setAttribute("active", "");

        this._scrollToActive();

        return;
      }

      const currentIndex = suggestions.indexOf(activeSuggestion); // remove active attr

      activeSuggestion.removeAttribute("active");

      if (currentIndex === 0) {
        suggestions[suggestions.length - 1].setAttribute("active", "");
      }

      const previousOption = suggestions[currentIndex - 1]; // set previous option as active

      if (previousOption) {
        previousOption.setAttribute("active", "");
      }

      this._scrollToActive();
    } // Arrow down


    if (keyCode == 40) {
      e.preventDefault();
      if (!this.suggestions.length) return;

      if (!this.listOpen) {
        // always show sugggestions when navigation with arrows
        this.listOpen = true;
        return;
      }

      if (!activeSuggestion) {
        suggestions[0].setAttribute("active", "");
        return;
      }

      const currentIndex = suggestions.indexOf(activeSuggestion); // remove active attr

      activeSuggestion.removeAttribute("active");
      const nextOption = suggestions[currentIndex + 1];

      if (nextOption) {
        nextOption.setAttribute("active", "");
      } else {
        suggestions[0].setAttribute("active", "");
      }

      this._scrollToActive();
    }
  }

  _scrollToActive() {
    if (!this.activeSuggestion) return;
    const {
      scrollTop
    } = this._suggestionList;

    const {
      height
    } = this._suggestionList.getBoundingClientRect();

    const {
      offsetTop,
      offsetHeight
    } = this.activeSuggestion;
    const offsetBottom = offsetTop + offsetHeight;
    const bottom = scrollTop + height;
    const top = scrollTop;

    if (offsetBottom > bottom) {
      this._suggestionList.scrollTo(0, offsetBottom - height);
    }

    if (offsetTop < top) {
      this._suggestionList.scrollTo(0, offsetTop);
    }
  }

  _handleArrowButtonClick(e) {
    this.listOpen = !this.listOpen;
  }

  render() {
    const {
      inputValue,
      multiple,
      ariaLabel,
      searchable,
      placeholder,
      activeSuggestion,
      value,
      clearSelected,
      clearable,
      hideArrow,
      _selectedEl,
      _removeOption,
      listOpen,
      _selectedElements,
      _handleArrowButtonClick,
      _handleInputEvent,
      _handleKeyEvent,
      _handleBlurEvent,
      _handleFocusEvent
    } = this;
    return html`
      <!-- Selected tags -->
      <div class="input-wrapper">
        ${multiple ? _selectedElements.map(option => {
      return html`
                <div part="tag">
                  ${option.label}
                  <button
                    ?disabled=${this.disabled}
                    @click="${() => _removeOption(option)}"
                    part="remove-tag"
                  >
                    <slot name="remove-tag">&#10005;</slot>
                  </button>
                </div>
              `;
    }) : null}
        <!-- Input field -->
        <input
          ?disabled=${this.disabled}
          .value=${inputValue}
          @keydown=${_handleKeyEvent}
          @input=${_handleInputEvent}
          @focus=${_handleFocusEvent}
          @blur=${_handleBlurEvent}
          @click=${() => this.listOpen = true}
          ?readonly=${!searchable}
          autocomplete="off"
          autocorrect="off"
          aria-label=${ariaLabel}
          ?has-value=${value ? true : false}
          placeholder=${!multiple && value ? _selectedEl ? _selectedEl.value : "" : placeholder}
          aria-owns="listbox"
          part="input-field"
          type="text"
          role="textbox"
          ?aria-expanded=${this.listOpen}
        />
      </div>

      <div class="buttons-wrapper">
        <button
          tabindex="-1"
          ?disabled=${this.disabled}
          ?hidden=${!clearable}
          part="clear-button"
          @click=${clearSelected}
        >
          <slot name="clear">&#10005;</slot>
        </button>

        <button
          tabindex="-1"
          ?disabled=${this.disabled}
          ?hidden=${hideArrow}
          part="arrow-button"
          @click=${_handleArrowButtonClick}
        >
          ${listOpen ? html`
                <slot name="arrow-up">
                  <div class="arrow-up"></div>
                </slot>
              ` : html`
                <slot name="arrow-down">
                  <div class="arrow-down"></div>
                </slot>
              `}
        </button>
      </div>

      <!-- Sugggestion list -->
      <!-- Check is slot for no options is used -->
      ${this.querySelector('[slot="no-options"') ? html`<div
            id="listbox"
            part="option-list"
            @mousedown=${this._handleListMouseDown}
            @mouseover=${this._handleListMouseOver}
            @mouseup=${this._handleListMouseUp}
            role="listbox"
            aria-activedescendant=${activeSuggestion && activeSuggestion.id ? activeSuggestion.id : ""}
          >
            <slot></slot>
            ${this.suggestions.length ? null : html`<slot name="no-options"></slot>`}
          </div>` : this.suggestions.length ? html`<div
            id="listbox"
            part="option-list"
            @mousedown=${this._handleListMouseDown}
            @mouseover=${this._handleListMouseOver}
            @mouseup=${this._handleListMouseUp}
            role="listbox"
            aria-activedescendant=${activeSuggestion && activeSuggestion.id ? activeSuggestion.id : ""}
          >
            <slot></slot>
          </div>` : null}
    `;
  }

}

if (!customElements.get("base-select")) {
  customElements.define("base-select", BaseSelect);
}

var styles$f = css`:host{--base-option-padding:0 var(--base-space-sm);--base-option-bg-color:var(--base-color-white);--base-option-border-radius:0;--base-option-active-color:var(--base-color-ui-lighter);--base-option-selected-color:var(--base-color-focus);--base-option-selected-active-color:var(--base-color-focus-dark);--base-option-font-color:var(--base-color-black);--base-option-min-height:var(--base-size-md);box-sizing:border-box;width:100%;max-width:100%;min-height:var(--base-option-min-height);display:-webkit-box;display:flex;color:var(--base-option-font-color);-webkit-box-align:center;align-items:center;cursor:pointer;background:var(--base-option-bg-color);text-align:left;border-radius:var(--base-option-border-radius);padding:var(--base-option-padding);margin-top:var(--base-spacing-100);border:2px solid transparent}:host(:first-child){margin-top:0}:host([disabled]){opacity:.5;cursor:not-allowed}:host([active]:not([disabled])){--base-option-bg-color:var(--base-option-active-color);--base-option-font-color:var(--base-color-font)}:host([selected]:not([active]):not([disabled])){--base-option-bg-color:var(--base-option-selected-color);--base-option-font-color:var(--base-color-white)}:host([selected][active]){--base-option-bg-color:var(--base-option-selected-active-color);--base-option-font-color:var(--base-color-white)}`;

class BaseOption extends LitElement {
  constructor() {
    super();
    this.hidden = false;
    this.disabled = false;
    this.selected = false;
    this.hidden = false;
    this.active = false;
    this.select = this.select.bind(this);
    this._value = "";
    this._label = "";
  }

  static get properties() {
    return {
      value: {
        type: String
      },
      label: {
        type: String
      },
      hidden: {
        type: Boolean,
        reflect: true
      },
      selected: {
        type: Boolean,
        reflect: true
      },
      active: {
        type: Boolean,
        reflect: true
      },
      hidden: {
        type: Boolean,
        reflect: true
      },
      disabled: {
        type: Boolean,
        reflect: true
      }
    };
  }

  static get styles() {
    return [styles$f, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  get label() {
    return this._label || this.innerText || this.value;
  }

  set label(val) {
    this._label = val;
  }

  set value(value) {
    this._value = value;
  }

  get value() {
    return this._value || this._label || this.innerText;
  }

  select(e) {
    this.selected = true;
  }

  render() {
    return html` <slot>${this.label}</slot> `;
  }

}

if (!customElements.get("base-option")) {
  customElements.define("base-option", BaseOption);
}

var styles$g = css`:host{--base-optgroup-padding:0 var(--base-space-sm);display:block}:host [part=label]{display:-webkit-box;display:flex;padding:var(--base-optgroup-padding);height:var(--base-size-sm);-webkit-box-align:center;align-items:center;font-weight:400;color:var(--base-color-font);text-transform:uppercase;font-size:var(--base-font-size-xs)}:host [part=list]{list-style:none;padding:0;margin:0}::slotted([slot=prepend]){margin-right:var(--base-space-sm)}`;

class BaseOptGroup extends LitElement {
  constructor() {
    super();
    this.label = "";
    this.icon = "";
  }

  static get properties() {
    return {
      label: {
        type: String
      },
      icon: {
        type: String
      }
    };
  }

  static get styles() {
    return [styles$g, sharedStyles];
  }

  render() {
    return html`
      <span part="label">
        <slot name="prepend"></slot>
        ${this.label}
      </span>
      <div part="list">
        <slot></slot>
      </div>
    `;
  }

}

if (!customElements.get("base-optgroup")) {
  customElements.define("base-optgroup", BaseOptGroup);
}

export { BaseBox, BaseButton, BaseCheckbox, BaseContainer, BaseFlex, BaseGrid, BaseGridItem, BaseInput, BaseLabel, BaseModal, BaseOptGroup, BaseOption, BaseRadio, BaseSelect, BaseTab, BaseTabs, BaseText, BaseTextArea, BaseToggle };
