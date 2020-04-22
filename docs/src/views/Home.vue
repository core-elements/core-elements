<template>
  <Page class="landing">
    <div class="content">
      <h1>
        <b>Base Elements</b> is a
        free collection of essential components for any web application
      </h1>
      <p class="lead">
        Components that work in
        <b>React</b>,
        <b>Vue</b>,
        <b>Angular</b>, or any
        other framwork.
      </p>
      <base-button type="primary">Get Started</base-button>
      <base-button outline type="primary">The Components</base-button>
    </div>
  </Page>
</template>

<script>
import Page from "../layouts/Page";

export default {
  components: { Page }
};
</script>

<style>
.landing h1 {
  font-weight: 300;
  font-size: 3rem;
}

.landing .lead {
  font-size: 1.4rem;
  line-height: 32px;
  font-weight: 300;
  color: #3c4b62;
}

.content {
  max-width: 700px;
}
</style>
