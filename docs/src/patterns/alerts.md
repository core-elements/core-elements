---
name: Alerts
desc: Alerts
slug: alerts
category: Layout
elements: ["box"]
icon: albums-outline
---

<core-knobs hideTabs element="core-box">
  <core-box radius="md" mb="md" p="lg" full border="success">
    <core-box inline mr="lg" color="success">
      <ion-icon name="checkmark-circle-outline"></ion-icon>
    </core-box>
    <core-text>Great! You successfully did a thing!</core-text>
  </core-box>
  </core-box>
  <core-box radius="md" mb="md" p="lg" full border="warning">
    <core-box inline mr="lg" color="warning">
      <ion-icon name="alert-circle-outline"></ion-icon>
    </core-box>
    <core-text>Ops! You encountered something dangerous!</core-text>
  </core-box>
  </core-box>
  <core-box radius="md" mb="md" p="lg" full border="danger">
    <core-box inline mr="lg" color="danger">
      <ion-icon name="warning-outline"></ion-icon>
    </core-box>
    <core-text>Oy! What are you doing?!</core-text>
  </core-box>
  </core-box>
</core-knobs>
