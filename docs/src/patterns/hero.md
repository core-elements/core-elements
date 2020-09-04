---
name: Hero
desc: Hero
category: Interaction
icon: library-outline
---

<core-knobs hideTabs>

<core-box mode="dark" class="hero" px="xl" pb="xl">

  <core-box py="lg" text-align="center">
    <core-flex justify-content="between">
      <div>Logo</div>
      <nav>Nav</nav>
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
          <core-button full>Subscribe</core-button>
        </core-grid-item>
      </core-grid>
    </core-box>
  </core-container>

</core-box>

</core-knobs>
