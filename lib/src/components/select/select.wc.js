import { LitElement, html } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined.js";
import selectStyles from "./select.css";
import sharedStyles from "../../shared/sharedstyles.css";

/**
 * @element core-select
 **/
class Select extends LitElement {
  constructor() {
    super();
    // full width
    this.full = false;
    // placeholder input value
    this.placeholder = undefined;
    // support multiple select
    this.multiple = false;
    // input aria-label
    this.ariaLabel = "Select an option";
    // hide arrow
    this.hideArrow = false;
    // show clear button
    this.clearable = false;
    // disable default filter if you want you own custom filtering of the options
    this.disableFilter = false;
    // disabled input
    this.disabled = false;
    // clear all selected values
    this.clearSelected = this.clearSelected.bind(this);
    // focus input
    this.focus = this.focus.bind(this);
    /**
     * Select element size
     * @type {"sm"|"md"|"lg"}
     * @attr
     */
    this.size = "";
    // blur input
    this.blur = this.blur.bind(this);
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
      multiple: { type: Boolean },
      hideArrow: { type: Boolean, attribute: "hide-arrow" },
      placeholder: { type: String },
      searchable: { type: Boolean },
      clearable: { type: Boolean },
      value: { type: String },
      size: { type: String },
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
  }

  _handleOptionSelect(val) {
    if (this.multiple) {
      this.allOptions.forEach((option) => {
        const isSelected = val.includes(option.value);
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
    this.requestUpdate();
  }

  set value(v) {
    // default value to empty string
    const val = v || "";

    if (this.multiple) {
      const isArray = Array.isArray(val);

      this._value = isArray
        ? val
        : val.startsWith("[")
        ? JSON.parse(val)
        : val.split(",");
      this._handleOptionSelect(this._value);
    } else {
      if (val) this.inputValue = "";
      if (val === this._value) return;
      this._value = val;
      this._handleOptionSelect(this._value);
    }
    this._dispatchChange();
    this.requestUpdate();
  }

  get value() {
    if (this.multiple) {
      return this.allOptions
        .filter((o) => o.hasAttribute("selected"))
        .map((o) => o.value);
    } else {
      return this._selectedEl ? this._selectedEl.value : "";
    }
  }

  get _selectedElements() {
    return this.allOptions.filter((o) => o.hasAttribute("selected"));
  }

  get _selectedEl() {
    return this.allOptions.find((o) => {
      return o.hasAttribute("selected");
    });
  }

  get allOptions() {
    // look for nodes with value attribute
    // if we hardcode core-option, then consumer cannot
    // change the name of core-option element without breaking the select
    return [...this.querySelectorAll("[value]")];
  }

  get suggestions() {
    const availableSuggestions = this.allOptions.filter((o) => !o.disabled);
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
    return this.shadowRoot.querySelector("div[part='list']");
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
      firstActive && firstActive.setAttribute("active", "");
      this._scrollToActive();
    } else {
      this.activeSuggestion && this.activeSuggestion.removeAttribute("active");
    }
    this.requestUpdate();
  }

  get hasStartSlot() {
    return this.querySelector('[slot="start"]');
  }

  get hasEndSlot() {
    return this.querySelector('[slot="end"]');
  }

  focus() {
    this._inputField.focus();
  }

  blur() {
    this._inputField.blur();
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
        if (!this.activeSuggestion) {
          option.setAttribute("active", "");
        }
        option.removeAttribute("hidden");
      } else {
        option.setAttribute("hidden", "");
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

    if (this.listOpenOnSelect) {
      this.listOpen = true;
    } else {
      this.listOpen = false;
    }
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

    this._dispatchSelect();
  }

  // add option for multiple select
  _addOption(optionEl) {
    // reset value
    this.inputValue = "";
    optionEl.removeAttribute("active");
    if (optionEl.hasAttribute("selected")) {
      this._removeOption(optionEl);
    } else {
      this.value = [...this.value, optionEl.value];
    }
    this.focus();

    this.requestUpdate();
    this._dispatchSelect();
  }

  // remove option for multiple select
  _removeOption(optionEl) {
    if (this.multiple) {
      this.value = this.value.filter((val) => val !== optionEl.value);
    } else {
      this.value = "";
    }
    this.requestUpdate();
  }

  _dispatchChange() {
    this.dispatchEvent(new CustomEvent("change", { bubbles: true }));
  }

  _dispatchSelect() {
    this.dispatchEvent(new CustomEvent("select", { bubbles: true }));
  }

  _handleBlurEvent(e) {
    // TODO: Handle the timeout better
    setTimeout(() => {
      if (this._menuJustClicked) {
        e.preventDefault();
        this._menuJustClicked = false;
        return;
      }
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
    this.dispatchEvent(new CustomEvent("input", { bubbles: true }));

    this.listOpen = true;
  }

  _handleKeyEvent(e) {
    const { keyCode } = e;
    const { suggestions, activeSuggestion } = this;

    // Space
    // Dont hide suggestions if search enabled
    if (keyCode === 32 && !this.searchable) {
      e.preventDefault();
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
        if (this.immediateSelect) {
          this._selectOption(this.activeSuggestion);
        }
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
    if (!this._suggestionList) return;

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
    if (this.listOpen) {
      this.listOpen = false;
    } else {
      this.focus();
      this.listOpen = true;
    }
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
      _selectedElements,
      _handleArrowButtonClick,
      _handleInputEvent,
      _handleKeyEvent,
      _handleBlurEvent,
    } = this;

    const hasValue = value ? true : false;

    const placeholderValue =
      !multiple && value
        ? _selectedEl
          ? _selectedEl.label
          : undefined
        : placeholder;

    return html`
      <!-- Selected tags -->
      <div part="input-wrapper" class="input-wrapper">
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
        <div part="input-field-wrapper">
          ${this.hasStartSlot
            ? html`<slot part="start" name="start"></slot>`
            : null}
          <input
            ?disabled=${this.disabled}
            .value=${inputValue}
            @keydown=${_handleKeyEvent}
            @input=${_handleInputEvent}
            @blur=${_handleBlurEvent}
            @click=${() => (this.listOpen = true)}
            ?readonly=${!searchable}
            autocomplete="off"
            autocorrect="off"
            aria-label=${ariaLabel}
            ?has-value=${hasValue}
            placeholder=${ifDefined(placeholderValue)}
            aria-owns="listbox"
            part="input-field"
            type="text"
            role="textbox"
            ?aria-expanded=${this.listOpen}
          />
          ${this.hasEndSlot ? html`<slot part="end" name="end"></slot>` : null}
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
            <slot name="arrow">
              <div class="arrow-icon"></div>
            </slot>
          </button>
        </div>
      </div>

      <!-- Sugggestion list -->
      <!-- Check is slot for no options is used -->
      ${this.querySelectorAll(":not([slot='start']):not([slot='end'])").length
        ? html`<div
            id="listbox"
            part="list"
            @mousedown=${this._handleListMouseDown}
            @mouseover=${this._handleListMouseOver}
            @mouseup=${this._handleListMouseUp}
            role="listbox"
            aria-activedescendant=${activeSuggestion && activeSuggestion.id
              ? activeSuggestion.id
              : ""}
          >
            <slot @slotchange=${() => this._handleOptionSelect(value)}></slot>
            ${!this.suggestions.length &&
            this.querySelector('[slot="no-options"]')
              ? html`<slot name="no-options"></slot>`
              : null}
          </div>`
        : null}
    `;
  }
}

export default Select;
