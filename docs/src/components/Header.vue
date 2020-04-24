<template>
  <header class="header">
    <div class="header__inner">
      <div class="header__left">
        <router-link to="/" class="header__logo">
          <ion-icon name="shapes-outline"></ion-icon>
          <span>Base Elements</span>
        </router-link>
        <button @click="handleToggleButton" class="header__route-menu-button">
          {{ $route.meta.title }}
          <ion-icon
            v-if="$route.meta.hasSidebar"
            :name="showSidebar ? 'chevron-up-outline' : 'chevron-down-outline'"
          ></ion-icon>
        </button>
      </div>

      <div class="header__right">
        <button @click="showMenu = !showMenu" class="header__menu-button">
          <ion-icon
            :name="showMenu ? 'close-outline' : 'ellipsis-vertical-outline'"
          ></ion-icon>
        </button>

        <div class="header__nav-wrapper" :class="{ show: showMenu }">
          <nav class="header__nav">
            <router-link
              v-on:click.native="showMenu = false"
              to="/"
              class="header__nav-item home"
              >Home</router-link
            >
            <router-link
              v-on:click.native="showMenu = false"
              to="/installation"
              class="header__nav-item"
              >Installation</router-link
            >
            <router-link
              v-on:click.native="showMenu = false"
              to="/getting-started"
              class="header__nav-item"
              >Getting started</router-link
            >
            <router-link
              v-on:click.native="showMenu = false"
              to="/components"
              class="header__nav-item"
              >Components</router-link
            >
            <router-link
              v-on:click.native="showMenu = false"
              to="/themes"
              class="header__nav-item"
              >Themes</router-link
            >
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: { showSidebar: Boolean },
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    handleToggleButton() {
      this.$emit("toggle-sidebar");
    },
  },
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

.header__logo span {
  display: none;
}

.header__route-menu-button {
  border: 0;
  font-size: 1rem;
  display: flex;
  align-items: center;
  background: transparent;
  padding: 0;
  outline: 0;
  font-weight: 500;
}

.header__route-menu-button ion-icon {
  margin-left: 4px;
}

.header__logo {
  text-decoration: none;
  color: currentColor;
  font-weight: 500;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
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
  position: fixed;
  top: 60px;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 60px;
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
  color: #718096;
  margin-bottom: 30px;
  display: block;
  font-size: 2rem;
  text-decoration: none;
}

.header__nav-item:hover {
  color: #1a202c;
}

.header__nav-item.router-link-active {
  color: #1a202c;
}

.header__menu-button {
  border: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-self: center;
  outline: 0;
  background: transparent;
  font-size: 1.1em;
}

.header__nav-item.home.router-link-active {
  color: #718096;
}

@media (min-width: 800px) {
  .header__nav-item.home {
    display: none;
  }

  .header__route-menu-button {
    display: none;
  }

  .header__route-menu-button ion-icon {
    display: none;
  }

  .header__menu-button {
    display: none;
  }

  .header__logo span {
    display: block;
  }

  .header__nav-wrapper {
    width: auto;
    display: flex;
    position: relative;
    top: 0;
    left: 0;
    height: auto;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
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
