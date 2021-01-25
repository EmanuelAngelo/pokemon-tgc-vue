<template>
  <div id="app">

    <header class="header-app">
      <div class="header-app__logo">
        <router-link to="/cards">
          <img src="./assets/logo-pokemon.png" alt="">
        </router-link>
      </div>

      <div class="header-app__menu">
        <ul>
          <li><router-link to="/cards">Cards</router-link></li>
          <li><router-link to="/sets">Sets</router-link></li>
          <li><router-link to="/types">Types</router-link></li>
        </ul>
      </div>
    </header>

    <router-view/>

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {},
}
</script>

<style lang="scss">
@import url('css/normalize.scss');

body {
  cursor: url('assets/mouse.png'), auto;
  user-select: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background-image: url('https://i.imgur.com/2gfwG.png');
  background-position: center bottom;
  background-size: cover;
  background-attachment: fixed;
}

img {
  max-width: 100%;
  height: auto;
}

.header-app {
  padding: 40px 0;
  &__logo {
    text-align: center;

    img {
      max-width: 300px;
    }

  }

  &__menu {
    padding: 50px 0 20px 0;
    max-width: 960px;
    margin-left: auto;
    margin-right: auto;

    ul {
      border-radius: 7px;
      display: flex;
      align-items: center;
      padding: 0;
      margin: 0;
      list-style: none;
      box-shadow: 0 0 0 5px #3A61AB;
      overflow: hidden;

      li {
        flex: 1;
        text-align: center;

        &:not(:last-child) {
          border-right: 2px solid #3A61AB;
        }

        a {
          padding: 10px 10px;
          display: block;
          color: #3A61AB;
          font-weight: 900;
          text-decoration: none;
          text-transform: uppercase;
          background: linear-gradient(to bottom, rgba(255,203,5,1) 0%,rgba(255,203,5,1) 48%,rgba(239,187,0,1) 49%,rgba(239,187,0,1) 49%,rgba(239,187,0,1) 100%);
        }

        .router-link-active {
          background: #efbb00;
        }
      }
    }
  }
}

</style>
