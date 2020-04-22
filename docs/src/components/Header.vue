<template>
  <header class="header">
    <div class="header__inner">
      <div class="header__left">
        <h3 class="header__logo">
          <ion-icon name="shapes-outline"></ion-icon>
          <span>BaseElements</span>
        </h3>
        <button @click="handleRouteButtonClick" class="header__route-menu-button">
          Components
          <ion-icon :name="showRoutes ? 'chevron-up-outline' : 'chevron-down-outline'"></ion-icon>
        </button>
      </div>

      <div class="header__right">
        <button @click="showMenu = !showMenu" class="header__menu-button">
          <ion-icon name="ellipsis-vertical-outline"></ion-icon>
        </button>

        <div class="header__nav-wrapper" :class="{show: showMenu}">
          <nav class="header__nav">
            <div class="header__nav-item">Installation</div>
            <div class="header__nav-item">Components</div>
            <div class="header__nav-item">Themes</div>
            <div class="header__nav-item">Github</div>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      showRoutes: false,
      showMenu: false
    };
  },
  methods: {
    handleRouteButtonClick() {
      this.$emit("route-menu-click");
      this.showRoutes = !this.showRoutes;
    }
  }
};
</script>

<style>
.header {
  position: realtive;
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
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

.header__left {
  display: flex;
  align-items: center;
}

.header__route-menu-button {
  border: 0;
  font-size: 1rem;
  display: flex;
  align-items: center;
  background: transparent;
}

.header__route-menu-button ion-icon {
  margin-left: 4px;
}

.header__logo {
  font-size: 1rem;
  margin-right: 20px;
  display: flex;
  align-items: center;
}

.header__logo span {
  display: none;
}

.header__logo ion-icon {
  margin-right: 10px;
  font-size: 1.4em;
}

.header__nav-wrapper {
  background: white;
  z-index: 999;
  width: 100%;
  animation: fade-in 0.3s ease;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 60px;
  left: 0;
  display: none;
  height: calc(100vh - 60px);
}

.header__nav-wrapper.show {
  display: flex;
}

.header__nav ion-icon {
  margin-right: 0.5em;
}

.header__nav-item {
  margin-bottom: 30px;
  display: block;
  font-size: 2rem;
}

.header__menu-button {
  border: 0;
  background: transparent;
  font-size: 1rem;
}

@media (min-width: 800px) {
  .header__menu-button {
    display: none;
  }

  .header__logo span {
    display: block;
  }

  .header__route-menu-button {
    display: none;
  }

  .header__nav-wrapper {
    width: auto;
    display: flex;
    position: relative;
    top: 0;
    left: 0;
    height: auto;
  }

  .header__nav-item {
    font-size: 1rem;
    margin-bottom: 0;
    display: inline-block;
    margin-left: 10px;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
