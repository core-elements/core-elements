---
name: Hero
desc: Hero
category: Layout
icon: browsers-outline
elements: ["box", "overlay", "flex", "text"]
---

<core-knobs hideTabs>

<core-box id="container" mode="dark" class="hero" px="xl" pb="xl">

  <core-box py="lg" text-align="center">
    <core-flex justify-content="between">
      <div>Logo</div>
      <core-overlay position-x="right">
        <core-button slot="trigger" variant="transparent">Menu</core-button>
        <core-box style="width: 200px" slot="content" depth="md">
          <core-menu>
            <core-menu-item>Menu item</core-menu-item>
            <core-menu-item>Menu item</core-menu-item>
            <core-menu-item>Menu item</core-menu-item>
          </core-menu>
        </core-box>
      </core-overlay>
    </core-flex>
  </core-box>

  <core-container center size="xs">
    <core-box py="lg" text-align="center">
      <core-text full tag="h1" >
        Discover new <core-text color="primary">amazing ways</core-text> of restructuring society
      </core-text>
      <core-text full size="lg" color="weak" tag="p" >
        Make love, have fun, dance and show gratitude
      </core-text>
    </core-box>
    <core-box py="lg">
      <core-grid columns="8">
        <core-grid-item sm="2-5">
          <core-input placeholder="Your email address" full></core-input>
        </core-grid-item>
        <core-grid-item sm="6-7">
          <core-button variant="primary" full>Subscribe</core-button>
        </core-grid-item>
      </core-grid>
    </core-box>
  </core-container>

</core-box>

</core-knobs>
