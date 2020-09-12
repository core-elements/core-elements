---
name: Pricing table
desc: Pricing table
category: Layout
icon: albums-outline
elements: ["box", "text", "button"]
---

## Pricing table card

<core-knobs hideTabs element="core-box">
<style>
  .pricing {
    min-width: 500px;
  }
  .pricing ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .pricing li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .pricing i {
    margin-right: 10px;
  }
</style>
<core-box class="pricing" bg="ui-weakest" p="lg" inline depth="sm">
  <core-text tag="h2">Small</core-text>
  <core-text tag="p" color="weak" >Free</core-text>
  <core-box my="lg">
    <ul>
      <li>
        <i class="gg-check-o"></i>
        Figma & Sketch Files
      </li>
      <li>
        <i class="gg-check-o"></i>
        Customizable styles
      </li>
      <li>
        <i class="gg-check-o"></i>
        Base elements
      </li>
      <li>
        <i class="gg-remove"></i>
        Headache
      </li>
    </ul>
  </core-box>
  <core-button full variant="primary">Start your free trial</core-button>
</core-box>
</core-knobs>
