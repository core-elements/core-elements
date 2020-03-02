import { LitElement, html } from "lit-element";
import classnames from "../../utils/classnames";
import selectStyles from "./base-select.css";

class AutoComplete extends LitElement {
  constructor() {
    super();
    // placeholder input value
    this.placeholder = "";
    // support multiple select
    this.multiple = false;
    // input aria-label
    this.ariaLabel = "Select an option";
    // hide arrow
    this.hideArrow = false;
    // show clear button
    this.clearable = false;
    // disabled input
    this.disabled = false;
    // input is focused
    this.isFocused = false;
    // disable default filter if you want you own custom filtering of the options
    this.disableFilter = false;
    // clear all selected values
    this.clearSelected = this.clearSelected.bind(this);
    // focus input
    this.focus = this.focus.bind(this);
    // is searchable
    this.searchable = false;
    // keep menu open on select
    this.menuOpenOnSelect = false;
    // show suggestions
    this._showSuggestions = false;
    // input value
    this._value = "";
    // the selected element
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
    this._selectedList = [];
    // filter list
    this._filterList = this._filterList.bind(this);
    // handle all key events
    this._handleKeyEvent = this._handleKeyEvent.bind(this);
    // handle all input events
    this._handleInputEvent = this._handleInputEvent.bind(this);
    // handle blur event
    this._handleBlurEvent = this._handleBlurEvent.bind(this);
    // handle focus event
    this._handleFocusEvent = this._handleFocusEvent.bind(this);
    // handle input click
    this._handleArrowButtonClick = this._handleArrowButtonClick.bind(this);
    // handle when you want to select an option
    this._selectOption = this._selectOption.bind(this);
    // choose option for single select
    this._chooseOption = this._chooseOption.bind(this);
    // add option for multiple select
    this._addOption = this._addOption.bind(this);
    // handle remove option
    this._removeOption = this._removeOption.bind(this);
    // scroll to active element in the sugggestion list
    this._scrollToActive = this._scrollToActive.bind(this);
    // handle hover on list options
    this._handleListMouseOver = this._handleListMouseOver.bind(this);
    // handle mouse click on list options
    this._handleListMouseDown = this._handleListMouseDown.bind(this);
    // handle mouse click on list options
    this._handleListMouseUp = this._handleListMouseUp.bind(this);
    // an option was just clicked, used for timeout
    this._menuJustClicked = false;
  }

  static get properties() {
    return {
      ariaLabel: { type: String, attribute: "aria-label" },
      disabled: { type: Boolean },
      showSuggestions: { type: Boolean },
      value: { type: String },
      isFocused: { type: Boolean, reflect: true, attribute: "is-focused" },
      multiple: { type: Boolean },
      hideArrow: { type: Boolean, attribute: "hide-arrow" },
      placeholder: { type: String },
      searchable: { type: Boolean },
      clearable: { type: Boolean },
      selected: { type: Object },
      menuOpenOnSelect: { type: Boolean, attribute: "menu-open-on-select" },
      disableFilter: { type: Boolean, attribute: "disable-filter" }
    };
  }

  static get styles() {
    return [selectStyles];
  }

  connectedCallback() {
    super.connectedCallback();
    // add mousedown event listener to catch click before focus dissapears

    this.allOptions.forEach(option => {
      const isSelected = option.hasAttribute("selected");
      if (!this.multiple && isSelected) {
        // TODO: Why doesnt this set as default selected?
        this._selectedEl = option;
      }
      // init all selected options in the selected list
      if (this.multiple && isSelected) {
        this._selectedList = [...this._selectedList, option];
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
      this._selectedList = this.allOptions.filter(o =>
        val.includes(o.getAttribute("value"))
      );
    } else {
      this._selectedEl = this.allOptions.find(o => {
        return o.getAttribute("value") === val;
      });
    }

    this.requestUpdate("selected", oldVal);
  }

  get suggestions() {
    const availableSuggestions = [
      ...this.querySelectorAll("base-option:not([disabled])")
    ];
    const suggestions = availableSuggestions.filter(i => {
      const isDisplayNone = getComputedStyle(i, null).display === "none";
      return !isDisplayNone && !i.hasAttribute("hidden");
    });
    return suggestions;
  }

  get activeSuggestion() {
    return this.suggestions.find(sugg => sugg.hasAttribute("active"));
  }

  get _inputField() {
    return this.shadowRoot.querySelector("input");
  }

  get _suggestionList() {
    return this.shadowRoot.querySelector("div[part='option-list']");
  }

  get value() {
    return this._value;
  }

  set value(val) {
    const value = val ? val : "";
    // Set new value
    this._value = value;
    // Request update so the setter works as an opbserved value
    this.requestUpdate();
  }

  get showSuggestions() {
    return this._showSuggestions;
  }

  set showSuggestions(show) {
    if (!this.suggestions.length) return;
    if (this._showSuggestions === show) return;

    this._showSuggestions = show;
    // if suggestion list is shown, make either first or the selected value active
    if (show) {
      const firstActive =
        this.activeSuggestion || this._selectedEl || this.suggestions[0];
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
    const { value, multiple, disableFilter, selected } = this;
    // Search for all matches and show the option
    this.allOptions.forEach(option => {
      // Return matched option, or return always match if filter@
      // is turned off
      const isMatch = disableFilter
        ? true
        : option.label.toLowerCase().includes(value.toLowerCase());

      if (!isMatch && option.hasAttribute("active")) {
        // remove active state
        option.removeAttribute("active");
      }

      // determine if the option is selected
      const optionSelected = multiple
        ? selected.includes(option.value)
        : selected === option.value;

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
    if (optionEl.disabled) return;
    // single select or multiple select
    const select = this.multiple ? this._addOption : this._chooseOption;
    select(optionEl);
  }

  //  choose option for single select
  _chooseOption(optionEl) {
    if (optionEl.value === this.selected) {
      // set the input value to the option label again
      this.value = "";
    } else {
      this._selectedEl = optionEl;

      this._dispatchChange(optionEl.value);
      // set input value as selected label as a placeholder
      this.value = "";
    }

    this.focus();
    this.showSuggestions = this.menuOpenOnSelect ? true : false;
  }

  // add option for multiple select
  _addOption(optionEl) {
    const isSelected = this.selected.includes(optionEl.value);

    if (isSelected) {
      this._selectedList = this._selectedList.filter(s => s !== optionEl);
      this._dispatchChange(this.selected);
    } else {
      this._selectedList = [...this._selectedList, optionEl];
      this._dispatchChange(this.selected);
    }
    this.value = "";
    this.focus();
    this.showSuggestions = this.menuOpenOnSelect ? true : false;
  }

  // remove option for multiple select
  _removeOption(optionEl) {
    if (this.multiple) {
      this._selectedList = this._selectedList.filter(
        o => o.value !== optionEl.value
      );

      this._dispatchChange(this.selected);
    }
    optionEl.removeAttribute("active");
    this.requestUpdate();
  }

  _dispatchChange(value) {
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { selected: value }
      })
    );
  }

  _handleFocusEvent() {
    this.isFocused = true;
    this.showSuggestions = true;
  }

  _handleBlurEvent(e) {
    setTimeout(() => {
      if (this._menuJustClicked) {
        e.preventDefault();
        this._menuJustClicked = false;
        return;
      }
      this.isFocused = false;
      this.value = "";
      this.showSuggestions = false;
    }, 100);
  }

  _handleListMouseOver(e) {
    if (e.target.tagName === "BASE-OPTION") {
      if (this.activeSuggestion !== e.target) {
        this.activeSuggestion &&
          this.activeSuggestion.removeAttribute("active");
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
    e.stopPropagation();
    // First set the value `base-select` to the target value of the input element
    this.value = e.target.value;
    // Then when we dispatch the event, the event.target.value will be correct
    this.dispatchEvent(new CustomEvent("input", e));

    this.showSuggestions = true;
  }

  _handleKeyEvent(e) {
    const { keyCode } = e;
    const { suggestions, activeSuggestion } = this;

    // Space
    if (keyCode === 32) {
      this.showSuggestions = !this.showSuggestions;
    }

    // Escape
    if (keyCode === 27) {
      this.showSuggestions = false;
    }

    // Enter
    if (keyCode === 13 && activeSuggestion) {
      this._selectOption(activeSuggestion);
    }

    // Backspace
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
    }

    // Arrow up
    if (keyCode === 38) {
      e.preventDefault();

      if (!this.suggestions.length) return;

      // always show sugggestions when navigation with arrows
      this.showSuggestions = true;

      if (!activeSuggestion) {
        suggestions[suggestions.length - 1].setAttribute("active", "");
        this._scrollToActive();
        return;
      }

      const currentIndex = suggestions.indexOf(activeSuggestion);
      // remove active attr
      activeSuggestion.removeAttribute("active");

      if (currentIndex === 0) {
        suggestions[suggestions.length - 1].setAttribute("active", "");
      }

      const previousOption = suggestions[currentIndex - 1];
      // set previous option as active
      if (previousOption) {
        previousOption.setAttribute("active", "");
      }

      this._scrollToActive();
    }

    // Arrow down
    if (keyCode == 40) {
      e.preventDefault();

      if (!this.suggestions.length) return;

      // always show sugggestions when navigation with arrows
      this.showSuggestions = true;

      if (!activeSuggestion) {
        suggestions[0].setAttribute("active", "");
        return;
      }

      const currentIndex = suggestions.indexOf(activeSuggestion);
      // remove active attr
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

    const { scrollTop } = this._suggestionList;
    const { height } = this._suggestionList.getBoundingClientRect();
    const { offsetTop, offsetHeight } = this.activeSuggestion;

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
      ${multiple
        ? _selectedList.map(option => {
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
          })
        : null}
      <!-- Input field -->
      <input
        ?disabled=${this.disabled}
        .value=${value}
        @keydown=${_handleKeyEvent}
        @input=${_handleInputEvent}
        @focus=${_handleFocusEvent}
        @blur=${_handleBlurEvent}
        @click=${() => (this.showSuggestions = true)}
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
        tabindex="-1"
        ?disabled=${this.disabled}
        ?hidden=${clearable}
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
        ${showSuggestions
          ? html`
              <slot name="arrow-up">
                <div class="arrow-up"></div>
              </slot>
            `
          : html`
              <slot name="arrow-down">
                <div class="arrow-down"></div>
              </slot>
            `}
      </button>

      <!-- Sugggestion list -->
      <div
        id="listbox"
        part="option-list"
        @mousedown=${this._handleListMouseDown}
        @mouseover=${this._handleListMouseOver}
        @mouseup=${this._handleListMouseUp}
        ?hidden=${!showSuggestions ||
          this.disabled ||
          this.suggestions.length === 0}
        role="listbox"
        aria-activedescendant=${activeSuggestion && activeSuggestion.id
          ? activeSuggestion.id
          : ""}
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
