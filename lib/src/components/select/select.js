import { LitElement, html } from "lit-element";
import selectStyles from "./select.css";
import sharedStyles from "../../shared/sharedstyles.css";

class Select extends LitElement {
  constructor() {
    super();
    // full width
    this.full = false;
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
    this.focused = false;
    // disable default filter if you want you own custom filtering of the options
    this.disableFilter = false;
    // clear all selected values
    this.clearSelected = this.clearSelected.bind(this);
    // focus input
    this.focus = this.focus.bind(this);
    // is searchable
    this.searchable = false;
    // keep menu open on select
    this.listOpenOnSelect = false;
    // show suggestions
    this._listOpen = false;
    // input value
    this._inputValue = "";
    /**
     * https://lit-element.polymer-project.org/guide/properties#accessors
     * Selected value
     */
    this._value = "";
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
      full: { type: Boolean },
      ariaLabel: { type: String, attribute: "aria-label" },
      disabled: { type: Boolean },
      listOpen: { type: Boolean, attribute: "list-open" },
      value: { type: String },
      focused: { type: Boolean, reflect: true },
      multiple: { type: Boolean },
      hideArrow: { type: Boolean, attribute: "hide-arrow" },
      placeholder: { type: String },
      searchable: { type: Boolean },
      clearable: { type: Boolean },
      value: { type: String },
      inputValue: { type: String, attribute: "input-value" },
      listOpenOnSelect: { type: Boolean, attribute: "list-open-on-select" },
      disableFilter: { type: Boolean, attribute: "disable-filter" },
    };
  }

  static get styles() {
    return [selectStyles, sharedStyles];
  }

  connectedCallback() {
    super.connectedCallback();
    // add mousedown event listener to catch click before focus dissapears
  }

  set value(v) {
    // default value to empty string
    const val = v || "";

    if (this.multiple) {
      this.allOptions.forEach((option) => {
        const isSelected = val.split(",").includes(option.value);
        if (isSelected) option.setAttribute("selected", "");
        else option.removeAttribute("selected");
      });
    } else {
      this.allOptions.forEach((option) => {
        if (option.selected && option.value !== val)
          option.removeAttribute("selected");
        if (!option.selected && option.value === val)
          option.setAttribute("selected", "");
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
      return this.allOptions
        .filter((o) => o.hasAttribute("selected"))
        .map((o) => o.value)
        .toString();
    } else {
      return this._selectedEl ? this._selectedEl.value : "";
    }
  }

  get _selectedElements() {
    return this.allOptions.filter((o) =>
      this.value.split(",").includes(o.value)
    );
  }

  get _selectedEl() {
    return this.allOptions.find((o) => {
      return o.hasAttribute("selected");
    });
  }

  get allOptions() {
    return [...this.querySelectorAll("core-option")];
  }

  get suggestions() {
    const availableSuggestions = [
      ...this.querySelectorAll("core-option:not([disabled])"),
    ];
    const suggestions = availableSuggestions.filter((i) => {
      const isDisplayNone = getComputedStyle(i, null).display === "none";
      return !isDisplayNone && !i.hasAttribute("hidden");
    });
    return suggestions;
  }

  get activeSuggestion() {
    return this.suggestions.find((sugg) => sugg.active);
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
    const value = val ? val : "";
    // Set new value
    this._inputValue = value;
    this._filterList();
    // Request update so the setter works as an opbserved value
    this.requestUpdate();
  }

  get listOpen() {
    return this._listOpen;
  }

  set listOpen(show) {
    if (this._listOpen === show) return;

    if (show) this.setAttribute("list-open", "");
    else this.removeAttribute("list-open");

    this._listOpen = show;
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
    this.value = "";
    this.inputValue = "";
  }

  _filterList() {
    const { inputValue, disableFilter } = this;
    // Search for all matches and show the option
    this.allOptions.forEach((option) => {
      // Return matched option, or return always match if filter@
      // is turned off
      const isMatch = disableFilter
        ? true
        : option.label.toLowerCase().includes(inputValue.toLowerCase());

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
    if (optionEl.disabled) return;
    // single select or multiple select
    const select = this.multiple ? this._addOption : this._chooseOption;
    select(optionEl);
  }

  //  choose option for single select
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
  }

  // add option for multiple select
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
  }

  // remove option for multiple select
  _removeOption(optionEl) {
    if (this.multiple) {
      this.value = this.value
        .split(",")
        .filter((val) => val !== optionEl.value)
        .toString();
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
    if (e.target.tagName === "CORE-OPTION") {
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
    if (e.target.tagName === "CORE-OPTION") {
      this._selectOption(e.target);
    }
  }

  _handleInputEvent(e) {
    e.stopPropagation();
    // First set the value `core-select` to the target value of the input element
    this.inputValue = e.target.value;
    // Then when we dispatch the event, the event.target.value will be correct
    this.dispatchEvent(new CustomEvent("input", e));

    this.listOpen = true;
  }

  _handleKeyEvent(e) {
    const { keyCode } = e;
    const { suggestions, activeSuggestion } = this;

    // Space
    // Dont hide suggestions if search enabled
    if (keyCode === 32 && !this.searchable) {
      this.listOpen = !this.listOpen;
    }

    // Escape
    if (keyCode === 27) {
      this.listOpen = false;
    }

    // Enter
    if (keyCode === 13 && activeSuggestion) {
      this._selectOption(activeSuggestion);
    }

    // Backspace
    if (keyCode === 8) {
      if (this.listOpen === false) {
        this.listOpen = true;
      }

      if (this.multiple) {
        // don't delete if there's something in the input
        if (this.inputValue) return;

        if (this._selectedElements.length) {
          this._removeOption(
            this._selectedElements[this._selectedElements.length - 1]
          );
        }
      } else {
        if (this.inputValue.length === 0) {
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

      if (!this.listOpen) {
        // always show sugggestions when navigation with arrows
        this.listOpen = true;
        return;
      }

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
      _handleFocusEvent,
    } = this;

    return html`
      <!-- Selected tags -->
      <div class="input-wrapper">
        ${multiple
          ? _selectedElements.map((option) => {
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
          .value=${inputValue}
          @keydown=${_handleKeyEvent}
          @input=${_handleInputEvent}
          @focus=${_handleFocusEvent}
          @blur=${_handleBlurEvent}
          @click=${() => (this.listOpen = true)}
          ?readonly=${!searchable}
          autocomplete="off"
          autocorrect="off"
          aria-label=${ariaLabel}
          ?has-value=${value ? true : false}
          placeholder=${!multiple && value
            ? _selectedEl
              ? _selectedEl.value
              : ""
            : placeholder}
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
          ${listOpen
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
      </div>

      <!-- Sugggestion list -->
      <!-- Check is slot for no options is used -->
      ${this.querySelector('[slot="no-options"]')
        ? html`<div
            id="listbox"
            part="option-list"
            @mousedown=${this._handleListMouseDown}
            @mouseover=${this._handleListMouseOver}
            @mouseup=${this._handleListMouseUp}
            role="listbox"
            aria-activedescendant=${activeSuggestion && activeSuggestion.id
              ? activeSuggestion.id
              : ""}
          >
            <slot></slot>
            ${this.suggestions.length
              ? null
              : html`<slot name="no-options"></slot>`}
          </div>`
        : this.suggestions.length
        ? html`<div
            id="listbox"
            part="option-list"
            @mousedown=${this._handleListMouseDown}
            @mouseover=${this._handleListMouseOver}
            @mouseup=${this._handleListMouseUp}
            role="listbox"
            aria-activedescendant=${activeSuggestion && activeSuggestion.id
              ? activeSuggestion.id
              : ""}
          >
            <slot></slot>
          </div>`
        : null}
    `;
  }
}

export default Select;