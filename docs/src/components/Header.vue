<template>
  <core-box class="header" padding-x="md" bg="white">
    <core-container center size="lg">
      <core-flex class="header__inner" justify-content="between" align-items="center">
        <div class="header__left">
          <router-link v-on:click.native="handleToggleButton" to="/" class="header__logo">
            <svg
              width="30"
              height="30"
              viewBox="0 0 112 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 16H88V97H7V16Z" fill="var(--core-color-white)" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M80 24H15V89H80V24ZM7 16V97H88V16H7Z"
                fill="currentColor"
              />
              <path
                d="M112 75.5C112 100.077 92.0767 120 67.5 120C42.9233 120 23 100.077 23 75.5C23 50.9233 42.9233 31 67.5 31C92.0767 31 112 50.9233 112 75.5Z"
                fill="var(--core-color-white)"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M67.5 112C87.6584 112 104 95.6584 104 75.5C104 55.3416 87.6584 39 67.5 39C47.3416 39 31 55.3416 31 75.5C31 95.6584 47.3416 112 67.5 112ZM67.5 120C92.0767 120 112 100.077 112 75.5C112 50.9233 92.0767 31 67.5 31C42.9233 31 23 50.9233 23 75.5C23 100.077 42.9233 120 67.5 120Z"
                fill="currentColor"
              />
              <path d="M44 0L87.3013 75H0.69873L44 0Z" fill="var(--core-color-white)" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M44 0L0.69873 75H87.3013L44 0ZM44 16L14.5551 67H73.4449L44 16Z"
                fill="currentColor"
              />
            </svg>

            <span>Core Elements</span>
          </router-link>
          <button @click="handleToggleButton" class="header__route-menu-button">
            {{ title }}
            <i
              v-if="hasSidebar"
              :class="showSidebar ? 'gg-chevron-up' : 'gg-chevron-down'"
            ></i>
          </button>
        </div>

        <div class="header__right">
          <core-button
            class="header__menu-button"
            variant="transparent"
            rounded
            squared
            @click="showMenu = !showMenu"
          >
            <ion-icon :name="showMenu ? 'close-outline' : 'menu-outline'"></ion-icon>
          </core-button>

          <div class="header__nav-wrapper" :class="{ show: showMenu }">
            <nav class="header__nav">
              <router-link
                v-on:click.native="showMenu = false"
                to="/"
                class="header__nav-item home"
              >Home</router-link>
              <router-link
                v-on:click.native="showMenu = false"
                to="/documentation/introduction"
                class="header__nav-item"
              >Documentation</router-link>
              <router-link
                v-on:click.native="showMenu = false"
                to="/components"
                class="header__nav-item"
              >Components</router-link>
              <router-link
                v-on:click.native="showMenu = false"
                to="/theme-editor"
                class="header__nav-item"
              >Theme Editor</router-link>
              <core-button
                size="sm"
                variant="transparent"
                squared
                @click="() => darkMode = !darkMode"
                class="header__nav-item"
              >
                <ion-icon :name="darkMode ? 'sunny-outline' : 'moon-outline'"></ion-icon>
              </core-button>
            </nav>
          </div>
        </div>
      </core-flex>
    </core-container>
  </core-box>
</template>

<script>
export default {
  props: {
    showSidebar: Boolean,
    hasSidebar: Boolean,
    showInHeader: Boolean,
    title: String,
  },
  data() {
    return {
      darkMode: localStorage.getItem("darkMode") === "true" ? true : false,
      showMenu: false,
    };
  },
  watch: {
    showSidebar: (val) => {
      if (val) document.body.classList.add("no-scroll-mobile");
      else document.body.classList.remove("no-scroll-mobile");
    },
    darkMode: {
      handler: function (val) {
        document.documentElement.setAttribute("mode", val ? "dark" : "light");
        localStorage.setItem("darkMode", val);
      },
      immediate: true,
    },
  },
  methods: {
    handleToggleButton() {
      if (this.$route.meta.hasSidebar) {
        this.$emit("toggle-sidebar");
      }
    },
  },
};
</script>

<style>
.header {
  position: sticky;
  top: 0;
  z-index: 999;
}

.header__inner {
  height: 60px;
}

.header__left {
  display: flex;
  align-items: center;
}

.header__logo span {
  display: none;
}

.header__route-menu-button {
  color: var(--core-color-font);
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
  color: var(--core-color-font);
  font-weight: 500;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
}

.header__logo:hover {
  color: var(--core-color-font-strong);
}

.header__logo svg {
  margin-right: 10px;
}

.header__nav-wrapper {
  background: var(--core-color-white);
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

.header__nav {
  text-align: left;
}

.header__nav-item {
  color: var(--core-color-font-weak);
  margin-bottom: 30px;
  display: flex;
  font-size: 2rem;
  text-decoration: none;
}

.header__nav-item:hover {
  color: var(--core-color-font-strong);
}

.header__nav-item.router-link-active {
  color: var(--core-color-font-strong);
}

.header__nav-item.home.router-link-active {
  color: var(--core-color-font);
}

@media (min-width: 800px) {
  .header__nav-item.home {
    display: none;
  }

  .header__route-menu-button {
    display: none;
  }

  .header__menu-button {
    display: none;
  }

  .header__logo span {
    display: block;
  }

  .header__nav {
    display: flex;
    align-items: center;
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
    display: inline-flex;
    margin-left: 15px;
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
