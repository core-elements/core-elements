import { c as css, L as LitElement, h as html } from './lit-element-c5717db0.js';

var selectStyles = css`:host{--base-select-background:0;--base-select-padding:var(--base-spacing-md,10px);--base-select-placeholder-color:var(--base-color-neutral-3,#b3b3b3);--base-select-border-width:var(--base-border-width-1,2px);--base-select-border-style:solid;--base-select-border-color:var(--base-color-neutral-2,#eee);--base-select-border-radius:var(--base-border-radius-1,0);display:-webkit-box;display:flex;flex-wrap:wrap;box-sizing:border-box;width:100%;max-width:100%;background-color:var(--base-color-white);border:var(--base-select-border-width) var(--base-select-border-style) var(--base-select-border-color);border-radius:var(--base-select-border-radius);padding:var(--base-select-padding);position:relative}:host([focused]),:host:hover{--base-select-border-color:#cecece}:host([disabled]){--base-select-background:#eee}input[part=input-field]{cursor:pointer}:host([searchable]) input[part=input-field]{cursor:text}:host input[part=input-field]::-webkit-input-placeholder{color:var(--base-select-placeholder-color)}:host input[part=input-field]::-moz-placeholder{color:var(--base-select-placeholder-color)}:host input[part=input-field]:-ms-input-placeholder{color:var(--base-select-placeholder-color)}:host input[part=input-field]::-ms-input-placeholder{color:var(--base-select-placeholder-color)}:host input[part=input-field]::placeholder{color:var(--base-select-placeholder-color)}:host(:not([multiple])) input[part=input-field][has-value]::-webkit-input-placeholder{--base-select-placeholder-color:#333;opacity:1}:host(:not([multiple])) input[part=input-field][has-value]::-moz-placeholder{--base-select-placeholder-color:#333;opacity:1}:host(:not([multiple])) input[part=input-field][has-value]:-ms-input-placeholder{--base-select-placeholder-color:#333;opacity:1}:host(:not([multiple])) input[part=input-field][has-value]::-ms-input-placeholder{--base-select-placeholder-color:#333;opacity:1}:host(:not([multiple])) input[part=input-field][has-value]::placeholder{--base-select-placeholder-color:#333;opacity:1}:host(:hover:not([multiple]):not([focused])){--base-select-border-color:#dedede}input[part=input-field]{background:transparent;min-width:100px;-webkit-box-flex:1;flex-grow:1;font-size:16px;border:0;outline:0}button[part=clear-button]{color:#333;right:35px;background:transparent}button[part=arrow-button],button[part=clear-button]{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;position:absolute;width:30px;height:30px;top:5px;border:0}button[part=arrow-button]{text-align:center;background:0;right:5px}button[part=arrow-button] .arrow-up{border-bottom:5px solid}button[part=arrow-button] .arrow-down,button[part=arrow-button] .arrow-up{width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent}button[part=arrow-button] .arrow-down{border-top:5px solid}div[part=tag]{font-size:12px;display:-webkit-box;display:flex;-webkit-box-pack:justify;justify-content:space-between;-webkit-box-align:center;align-items:center;padding:5px 0 5px 10px;margin-right:10px;background:#eee}button[part=remove-tag]{border:0;color:currentColor;background:0;margin-left:5px}div[part=option-list]{--base-select-option-list-border:2px solid #eee;--base-select-option-list-border-radius:var(--base-select-border-radius);--base-select-option-list-box-shadow:0 0;position:absolute;left:0;top:110%;width:100%;z-index:600;box-sizing:border-box;border:var(--base-select-option-list-border);margin:0;list-style:none;box-shadow:var(--base-select-option-list-box-shadow);border-radius:var(--base-select-option-list-border-radius);background:#fff;max-height:300px;overflow-y:scroll}`;

class AutoComplete extends LitElement {
  constructor() {
    super(); // placeholder input value

    this.placeholder = ""; // support multiple select

    this.multiple = false; // input aria-label

    this.ariaLabel = "Select an option"; // show suggestion list

    this.showSuggestions = false; // hide arrow

    this.hideArrow = false; // show clear button

    this.clearable = false; // disabled input

    this.disabled = false; // disable default filter if you want you own custom filtering of the options

    this.disableFilter = false; // clear all selected values

    this.clearSelected = this.clearSelected.bind(this); // is searchable

    this.searchable = false; // input value

    this._value = ""; // input is focused

    this._isFocused = false; // the selected element

    this._selectedEL = null;
    /**
     * https://lit-element.polymer-project.org/guide/properties#accessors
     * Selected value
     */

    this._selected = "";
    /**
     *  a list to hold multiple selected elements in
     * the order they are selected by the user
     */

    this._selectedList = []; // filter list

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

    this._handleListMouseOver = this._handleListMouseOver.bind(this);
  }

  static get properties() {
    return {
      ariaLabel: {
        type: String,
        attribute: "aria-label"
      },
      disabled: {
        type: Boolean
      },
      showSuggestions: {
        type: Boolean
      },
      value: {
        type: String
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
      selected: {
        type: Object
      },
      disableFilter: {
        type: Boolean,
        attribute: "disable-filter"
      }
    };
  }

  static get styles() {
    return [selectStyles];
  }

  connectedCallback() {
    super.connectedCallback(); // add mousedown event listener to catch click before focus dissapears

    this.allOptions.forEach(option => {
      const isSelected = option.hasAttribute("selected");

      if (!this.multiple && isSelected) {
        // TODO: Why doesnt this set as default selected?
        this._selectedEl = option;
      } // init all selected options in the selected list


      if (this.multiple && isSelected) {
        this._selectedList = [...this._selectedList, option];
      }
    });
    this.addEventListener("mousedown", e => {
      if (e.target.tagName === "BASE-OPTION") {
        this._selectOption(e.target);
      }
    });
  }

  get allOptions() {
    return [...this.querySelectorAll("base-option")];
  }

  get selected() {
    if (this.multiple) {
      return this._selectedList.map(opt => opt.value);
    } else {
      return this._selectedEl ? this._selectedEl.getAttribute("value") : "";
    }
  }

  set selected(val) {
    const oldVal = this._selected;
    this._selected = val;

    if (this.multiple) {
      this._selectedList = this.allOptions.filter(o => val.includes(o.getAttribute("value")));
    } else {
      this._selectedEl = this.allOptions.find(o => {
        return o.getAttribute("value") === val;
      });
    }

    this.requestUpdate("selected", oldVal);
  }

  get suggestions() {
    const notSelected = [...this.querySelectorAll("base-option:not([disabled])")];
    return notSelected.filter(i => !i.hasAttribute("hidden"));
  }

  get activeSuggestion() {
    return this.suggestions.find(sugg => sugg.hasAttribute("active"));
  }

  get _suggestionList() {
    return this.shadowRoot.querySelector("div[part='option-list']");
  }

  get value() {
    return this._value;
  }

  set value(val) {
    const value = val ? val : ""; // Set new value

    this._value = value; // Request update so the setter works as an opbserved value

    this.requestUpdate();
  }

  clearSelected() {
    if (this.multiple) {
      this.allOptions.forEach(option => option.removeAttribute("selected"));
      this._selectedList = [];

      this._dispatchChange([]);
    } else {
      this._selectedEl = null;

      this._dispatchChange("");
    }

    this.value = "";
  }

  updated(changedProperties) {
    this._filterList();
  }

  _filterList() {
    const {
      value,
      multiple,
      disableFilter,
      selected
    } = this; // Search for all matches and show the option

    this.allOptions.forEach(option => {
      // Return matched option, or return always match if filter@
      // is turned off
      const isMatch = disableFilter ? true : option.label.toLowerCase().includes(value.toLowerCase());

      if (!isMatch && option.hasAttribute("active")) {
        // remove active state
        option.removeAttribute("active");
      } // determine if the option is selected


      const optionSelected = multiple ? selected.includes(option.value) : selected === option.value;

      if (multiple && optionSelected) {
        option.setAttribute("selected", "");
        option.setAttribute("hidden", "");
        return false;
      }

      if (optionSelected) {
        option.setAttribute("selected", "");
      } else {
        option.removeAttribute("selected");
      }

      if (isMatch) {
        option.removeAttribute("hidden");
      } else {
        option.setAttribute("hidden", "");
      }

      return isMatch;
    });
  }

  _selectOption(optionEl) {
    // don't select anything if we can't see the suggestion list
    if (!this.showSuggestions) return;
    if (optionEl.disabled) return; // single select or multiple select

    const select = this.multiple ? this._addOption : this._chooseOption;
    select(optionEl);
  } //  choose option for single select


  _chooseOption(optionEl) {
    if (optionEl.value === this.selected) {
      // set the input value to the option label again
      this.value = "";
    } else {
      this._selectedEl = optionEl;

      this._dispatchChange(optionEl.value); // set input value as selected label as a placeholder


      this.value = "";
    }
  } // add option for multiple select


  _addOption(optionEl) {
    // set new option to selected
    const isSelected = this.selected.includes(optionEl.value);

    if (!isSelected) {
      this._selectedList = [...this._selectedList, optionEl];

      this._dispatchChange(this.selected);
    }

    this.value = "";
  } // remove option for multiple select


  _removeOption(optionEl) {
    if (this.multiple) {
      this._selectedList = this._selectedList.filter(o => o.value !== optionEl.value);

      this._dispatchChange(this.selected);
    }

    this.requestUpdate();
  }

  _dispatchChange(value) {
    this.dispatchEvent(new CustomEvent("change", {
      detail: {
        selected: value
      }
    }));
  }

  _handleFocusEvent(e) {
    this._isFocused = true;
    this.showSuggestions = true;
  }

  _handleBlurEvent(e) {
    this._isFocused = false;
    this.showSuggestions = false;
    this.activeSuggestion && this.activeSuggestion.removeAttribute("active");
    this.value = "";
  }

  _handleListMouseOver(e) {
    if (e.target.tagName === "BASE-OPTION") {
      if (this.activeSuggestion) {
        this.activeSuggestion.removeAttribute("active");
      }

      e.target.setAttribute("active", "");
    }
  }

  _handleInputEvent(e) {
    e.stopPropagation(); // First set the value `base-select` to the target value of the input element

    this.value = e.target.value; // Then when we dispatch the event, the event.target.value will be correct

    this.dispatchEvent(new CustomEvent("input", e));
    this.showSuggestions = true;
  }

  _handleKeyEvent(e) {
    const {
      keyCode
    } = e;
    const {
      suggestions,
      activeSuggestion
    } = this; // Space

    if (keyCode === 32) {
      this.showSuggestions = !this.showSuggestions;
    } // Escape


    if (keyCode === 27) {
      this.showSuggestions = false;
    }

    if (keyCode === 13 && activeSuggestion) {
      this._selectOption(activeSuggestion); // hide suggestions after select


      this.showSuggestions = false;
    } // Backspace


    if (keyCode === 8) {
      if (this.showSuggestions === false) {
        this.showSuggestions = true;
      }

      if (this.multiple) {
        // don't delete if there's something in the input
        if (this.value) return;

        if (this._selectedList.length) {
          this._removeOption(this._selectedList[this._selectedList.length - 1]);
        }
      } else {
        if (this.value.length === 0) {
          // Remove selected option if user presses backspace when input is empty
          this.clearSelected();
          this.requestUpdate();
        }
      }
    } // Arrow up


    if (keyCode === 38) {
      e.preventDefault();
      if (!this.suggestions.length) return; // always show sugggestions when navigation with arrows

      if (this.showSuggestions === false) {
        this.showSuggestions = true;
      }

      const lastSuggestion = this._selectedEl || suggestions[suggestions.length - 1]; // set last suggestion to active

      if (!activeSuggestion) {
        lastSuggestion.setAttribute("active", "");
        return;
      } // remove active attr


      activeSuggestion.removeAttribute("active");
      const currentIndex = suggestions.indexOf(activeSuggestion);

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
      if (!this.suggestions.length) return; // always show sugggestions when navigation with arrows

      if (this.showSuggestions === false) {
        this.showSuggestions = true;
      }

      const firstOption = this._selectedEl || suggestions[0]; // set first suggestion to active

      if (!activeSuggestion && firstOption) {
        firstOption.setAttribute("active", "");
        return;
      }

      if (!activeSuggestion) return; // remove active attr

      activeSuggestion.removeAttribute("active");
      const currentIndex = suggestions.indexOf(activeSuggestion);
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
    this.showSuggestions = !this.showSuggestions;
  }

  render() {
    const {
      value,
      multiple,
      ariaLabel,
      searchable,
      placeholder,
      activeSuggestion,
      selected,
      clearSelected,
      clearable,
      hideArrow,
      _selectedEl,
      _removeOption,
      showSuggestions,
      _selectedList,
      _handleArrowButtonClick,
      _handleInputEvent,
      _handleKeyEvent,
      _handleBlurEvent,
      _handleFocusEvent
    } = this;
    return html`
      <!-- Selected tags -->
      ${multiple ? _selectedList.map(option => {
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
    }) : ""}
      <!-- Input field -->
      <input
        ?disabled=${this.disabled}
        .value=${value}
        @keydown=${_handleKeyEvent}
        @input=${_handleInputEvent}
        @focus=${_handleFocusEvent}
        @blur=${_handleBlurEvent}
        @click=${() => this.showSuggestions = true}
        ?readonly=${!searchable}
        autocomplete="off"
        autocorrect="off"
        aria-label=${ariaLabel}
        ?has-value=${selected ? true : false}
        placeholder=${!multiple && selected ? _selectedEl.label : placeholder}
        aria-owns="listbox"
        part="input-field"
        type="text"
        role="textbox"
        ?aria-expanded=${this.showSuggestions}
      />

      <button
        ?disabled=${this.disabled}
        ?hidden=${clearable}
        part="clear-button"
        @click=${clearSelected}
      >
        <slot name="clear">&#10005;</slot>
      </button>

      <button
        ?disabled=${this.disabled}
        ?hidden=${hideArrow}
        part="arrow-button"
        @click=${_handleArrowButtonClick}
      >
        ${showSuggestions ? html`
              <slot name="arrow-up">
                <div class="arrow-up"></div>
              </slot>
            ` : html`
              <slot name="arrow-down">
                <div class="arrow-down"></div>
              </slot>
            `}
      </button>

      <!-- Sugggestion list -->
      <div
        id="listbox"
        part="option-list"
        @mouseover=${this._handleListMouseOver}
        ?hidden=${!showSuggestions || this.disabled || this.suggestions.length === 0}
        role="listbox"
        aria-activedescendant=${activeSuggestion && activeSuggestion.id ? activeSuggestion.id : ""}
      >
        <slot></slot>
      </div>
    `;
  }

}

if (!customElements.get("base-select")) {
  customElements.define("base-select", AutoComplete);
}

export default AutoComplete;
