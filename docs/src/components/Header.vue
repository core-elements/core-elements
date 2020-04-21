<template>
  <header>
    <div class="header__inner">
      <h3>Base Elements</h3>
      <nav class="header__nav">
        <div class="header__nav-item">Installation</div>
        <div class="header__nav-item">Components</div>
        <div class="header__nav-item">Themes</div>
        <div class="header__nav-item">Github</div>
      </nav>
    </div>
  </header>
</template>

<style>
.header {
  width: 100%;

  background: white;
}

.header__inner {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1100px;
  margin: 0 auto;
}

.header__nav {
  display: flex;
}

.header__nav-item {
  margin-left: 15px;
}
</style>
