---
name: Overlay
desc: Overlay
category: Interaction
icon: chatbox-outline
---

<core-knobs hideEvents element="core-overlay">
<core-overlay>
  <core-button slot="trigger" full>Button</core-button>
  <core-box slot="content" padding="sm" depth="sm">
    <core-text>Hello</core-text>
  </core-box>
</core-overlay>
</core-knobs>

## Hoverable

<core-overlay hoverable>
  <core-button slot="trigger" full>Button</core-button>
  <core-box slot="content" padding="sm" depth="sm">
    <core-text>Hello</core-text>
  </core-box>
</core-overlay>
</core-knobs>

## Examples

### Select

<core-knobs hideTabs element="core-overlay">
<style>
  #menu {
    padding: var(--core-space-xs);
  }
  #menu core-menu-item {
    border-radius: var(--core-border-radius-default);
  }
</style>

<core-overlay id="overlay" position-x="center" position-y="center">
  <core-button id="trigger" slot="trigger" full>
    <span>Select an option</span>
    <ion-icon slot="end" name="chevron-down-outline"></ion-icon>
  </core-button>
  <core-box style="width: 200px" bg="white" slot="content" depth="sm" >
    <core-menu id="menu" bordered>
      <core-menu-item>Option 1</core-menu-item>
      <core-menu-item>Option 2</core-menu-item>
    </core-menu>
  </core-box>
</core-overlay>

<script>
  const overlay = document.querySelector('#overlay');
  const trigger = document.querySelector('#trigger');
  const triggerText = trigger.querySelector('span');
  const menu = document.querySelector('#menu');

  menu.addEventListener('click', e => {
    overlay.open = false;
    trigger.focus();
    triggerText.textContent = e.target.textContent;
  })
  
  trigger.addEventListener('keydown', e => {
    if (e.keyCode === 40) {
      e.preventDefault();
      if (overlay.open) {
        const menuItems = [...document.querySelectorAll('#menu > *')];
        menuItems[0].focus();
      } else {
        overlay.open = true;
      }
    }
  })
</script>

</core-knobs>
