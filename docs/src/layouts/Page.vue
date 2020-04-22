<template>
  <div class="page">
    <div class="page__inner">
      <slot></slot>
    </div>
  </div>
</template>

<style>
.page {
  width: 100%;
  padding: 30px;
}

.page__inner {
  padding-top: 30px;
  display: flex;
  flex-wrap: wrap;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
}
</style>
