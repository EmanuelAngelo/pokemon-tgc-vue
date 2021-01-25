
<template>
  <div class="home">
    
    <audio controls >
      <source src="../assets/select.mp3" type="audio/mpeg">
    </audio>

    <div class="container-list">
      <h1 v-if="loading">Loading</h1>
      
      <ul class="cards-list" v-if="!loading">

        <li 
          v-for="(card, index) in list" 
          :key="index" 
          @mouseenter="sound('enter')" 
          @mouseleave="sound('leave')">
          
          <div class="card" v-if="$route.params.page !== 'types'" @click="card.id ? enterCard(card.id) : null">
            <img :src="card.imageUrl || card.logoUrl" :alt="card.name" loading="lazy">
          </div>

          <div class="card" v-else  @click="selectType(card)">
            <div class="card__types">
              <img :src="'/img/types/'+ card + '.png'" :alt="card" loading="lazy">
              <div v-if="card">
                {{card}}
              </div>
            </div>
          </div>

        </li>

      </ul>

      <div class="load-more">
        <button v-if="hasPagination && !loading" @click="loadMore">Load more</button>
      </div>

    </div>

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  name: 'Page',
  data() {
    return {
      loading: false,
      page: 1,
      hasPagination: false
    }
  },
  created() {
    this.fetchData();
  },
  computed: {
    ...mapState(['list']),
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    ...mapActions(['api']),
    ...mapMutations(['UPDATE_LIST', 'PUSH_ON_LIST']),

    loadMore() {
      this.fetchData('loadMore');
    },
    fetchData(loadMore) {

      let routePage = this.$route.params.page;

      let payload = {
        routePage
      }
      
      if(loadMore === 'loadMore') {

        this.page++;
        
        payload.params = `page=${this.page}`

        this.api(payload).then(response => {

          this.hasPagination = response.headers.link ? true : false
          this.PUSH_ON_LIST(response.data[routePage]);

        });

      } else {

        this.loading = true;

        if(this.$route.params.type) {

          let types = this.$route.params.type;

          payload.routePage = `cards`
          payload.params = `types=${types}`

          this.api(payload).then(response => {
            this.loading = false;
            this.UPDATE_LIST(response.data[payload.routePage]);
          });

        } else {

          this.api(payload).then(response => {
          
            this.loading = false;
            this.hasPagination = response.headers.link ? true : false;
  
            this.UPDATE_LIST(response.data[routePage])
  
          });
        }

      }
      
    },
    sound(option) {
      let audio = document.querySelector('audio');
      if(option === 'enter') {
        audio.volume = 0.2
        audio.play()
      } else if(option === 'leave') {
        audio.pause()
        audio.currentTime = 0
      }
    },

    enterCard(id) {
      this.$router.push(`/cards/${id}`)
    },

    selectType(type) {

      let typeSelected = type

      this.$router.push(`/cards/type/${typeSelected}`);

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
  grid-template-columns: repeat(1, 1fr);
  gap: 40px;
  padding: 40px 0;
  margin: 0;

  @media (min-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }

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

    .card {
      transition: transform 0.6s;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
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
  }
}

.card__types {

  img {
    width: auto;
    height: 240px;
    margin-bottom: 15px;
  }

  div {
    background: white;
    border-radius: 5px;
    padding: 5px 10px;
  }
}

.load-more {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 50px;

  button {
    cursor: pointer;
    width: 100%;
    height: 45px;
    background: linear-gradient(to bottom, #ffcb05 0%, #ffcb05 48%, #efbb00 49%, #efbb00 49%, #efbb00 100%);
    box-shadow: 0 0 0 5px #3a61ab;
  }
}

</style>
