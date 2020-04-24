# Getting Started

## Why?

Normal CSS frameworks will often come with quite a lot of boilerplate. Let's take an input example from Bootstrap:

<base-knobs hideTabs>
<label for="validation">Username</label>
<div class="input-group">
  <div class="input-group-prepend">
    <span class="input-group-text" id="prepend-username">@</span>
  </div>
  <input
    type="text"
    class="form-control"
    id="validation"
    aria-describedby="prepend-username"
    required
  />
  <div class="invalid-feedback">Please choose a username.</div>
</div>

<script>

  const input = document.querySelector("#validation");

  input.addEventListener('input', (e) => {
    const isValid = e.target.checkValidity();
    if (isValid) {
      input.classList.remove('is-invalid');
    } else {
      input.classList.add('is-invalid');
    }
  });
</script>

</base-knobs>

Compare this to a **BaseElement** where we can provide the attribute `autovalidate` and make the input element validate itself based on the normal validation rules of an input element (using `pattern` for example).

If you want you can still toggle the `valid` or `invalid` attribute on the input field to control the validation yourself.

<base-knobs hideTabs>
<base-label for="validation-2">Username</base-label>
<base-input id="validation-2" aria-describedby="prepend-username" required autovalidate>
  <span slot="prepend" id="prepend-username">@</span>
  <div slot="error">Please choose a username.</div>
</base-input>
</base-knobs>

## How it Works

Let's take the grid-wrapper as an example:
