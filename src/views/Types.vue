
<template>
  <div class="type">
    
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
// import { mapActions } from 'vuex'

export default {
  name: 'type',
  data() {
    return {
    }
  },
  created() {
    this.fetchData();
  },
  computed: {},
  watch: {
    // '$route': 'fetchData'
  },
  methods: {
    // ...mapActions(['api']),


    fetchData() {

        // this.loading = true;

        // let payload = {
        //   routePage: 'cards',
        //   params: 'type=' + this.$route.params.type
        // }

        // this.api(payload).then(response => {
        //   this.card = response.data.cards[0];
        //   console.log(this.card);
        // });
      
    },
  }
}
</script>

<style lang="scss">


</style>
