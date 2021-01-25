
<template>
  <div class="home">
    
    <audio controls >
      <source src="../assets/select.mp3" type="audio/mpeg">
    </audio>

    <div class="container-list">
      <ul class="cards-list">
        <li v-for="card in cardsOrdeneds(list)" :key="card.id" @mouseenter="sound('enter')" @mouseleave="sound('end')">
          <div class="card">
            <img :src="card.imageUrl || card.logoUrl" :alt="card.name" loading="lazy">
          </div>
          <div class="info">
            {{card.name}}
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import { mapActions, mapState } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      loading: true
    }
  },
  components: {},
  created() {},
  mounted() {
    this.getApi('cards').then(data => {
      this.$store.state.list = data.cards;
      console.log(this.list[0]);
    });
  },
  computed: {
    ...mapState(['list'])
  },
  methods: {
    ...mapActions(['getApi']),
    cardsOrdeneds(array) {
      return array.slice().sort(function(a, b){
        return (a.name > b.name) ? 1 : -1;
      });
    },
    sound(option) {
      let audio = document.querySelector('audio');
      if(option === 'enter') {
        audio.volume = 0.3
        audio.play()
      } else if(option === 'end') {
        audio.pause()
        audio.currentTime = 0
      }
    }
  }
}
</script>

<style lang="scss">

.container {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  &-list {
    padding: 0 30px;
  }
}

audio {
  display: none;
}

.cards-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  padding: 40px 0;
  margin: 0;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
  }


  @media (min-width: 1400px) {
    grid-template-columns: repeat(5, 1fr);
  }
  
  @media (min-width: 1700px) {
    grid-template-columns: repeat(6, 1fr);
  }
  
  @media (min-width: 2000px) {
    grid-template-columns: repeat(7, 1fr);
  }

  @media (min-width: 2200px) {
    grid-template-columns: repeat(8, 1fr);
  }

  li {
    position: relative;
    text-align: center;
    list-style: none;
    transform-style: preserve-3d;
    transition: transform 0.2s;

    .card,
    .info {
      transition: transform 0.6s;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
    }

    .info {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      transform: rotateY(180deg);
      background-color: #FFCB05;
      color: white;
      border-radius: 5px;
    }

    .card {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 1;
      min-height: 250px;
    }

    &:hover {
      transform: translate3d(0, -15px, 0);
    }

    // &:nth-child(even) {
    //   .info {
    //     background: #A70E13;
    //   }
    // }
  }
}

</style>
