const supportsCustomElementsV1 = 'customElements' in window;


function loadScript(src) {
    return new Promise(function(resolve, reject) {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
        console.log('loading script..' + src);
    });
}

// Lazy load the polyfill if necessary.
if (!supportsCustomElementsV1) {
    loadScript('/bower_components/custom-elements/custom-elements.min.js').then(e => {
        // Polyfill loaded.
    });
} else {
    // Native support. Good to go.
    console.log('supportsCustomElementsV1 native support')
}

//Template
var template = document.querySelector('#mytemplate');
var clone = document.importNode(template.content, true);
var customMessage = document.querySelector('#customMessage');
customMessage.appendChild(clone);

//Custom Element
class FlagIcon extends HTMLElement {
    constructor() {
        super();
        this._countryCode = null;
    }

    static get observedAttributes() { return ["country"]; }

    attributeChangedCallback(name, oldValue, newValue) {
        // name will always be "country" due to observedAttributes
        this._countryCode = newValue;
        this._updateRendering();
    }
    connectedCallback() {
        this._updateRendering();
    }

    get country() {
        return this._countryCode;
    }
    set country(v) {
        this.setAttribute("country", v);

    }

    _updateRendering() {
        // Left as an exercise for the reader. But, you'll probably want to
        // check this.ownerDocument.defaultView to see if we've been
        // inserted into a document with a browsing context, and avoid
        // doing any work if not.


        if(this.ownerDocument.defaultView) {
            this.innerHTML = "Country: " + this.country
        }


    }
}

customElements.define("flag-icon", FlagIcon);

