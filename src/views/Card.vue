
<template>
  <div class="card">
    
    <div class="container">
      <div class="card-container" v-if="card">
        
        <div class="card__image">
          <img :src="card.imageUrlHiRes" alt="">
        </div>
        <div class="card__info">
          <div class="card__title">
            <h1>{{card.name}} ({{card.id}})</h1>
            <h3>{{card.supertype}} - {{card.subtype}}</h3>
          </div>

          <div class="card__content">

            <div class="card__types" v-if="card.types">
              <h3>Types</h3>
              <ul>
                <li v-for="type in card.types" :key="type">
                  <span>{{type}}</span>
                </li>
              </ul>
            </div>
            
            <div class="card__types" v-if="card.resistances">
              <h3>Resistances</h3>
              <ul>
                <li v-for="res in card.resistances" :key="res.type">
                  <span><strong>{{res.type}}</strong>: {{res.value}}</span>
                </li>
              </ul>
            </div>
            
            <div class="card__types" v-if="card.weaknesses">
              <h3>weaknesses</h3>
              <ul>
                <li v-for="wark in card.weaknesses" :key="wark.type">
                  <span><strong>{{wark.type}}</strong>: {{wark.value}}</span>
                </li>
              </ul>
            </div>
            
            <div class="card__types" v-if="card.attacks">
              <h3>attacks</h3>
              <ul>
                <li v-for="attack in card.attacks" :key="attack.name">
                  <span><strong>{{attack.name}}</strong>: {{attack.damage}}</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { mapActions } from 'vuex'

export default {
  name: 'Card',
  data() {
    return {
      card: {}
    }
  },
  created() {
    this.fetchData();
  },
  computed: {},
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    ...mapActions(['api']),


    fetchData() {

        this.loading = true;

        let payload = {
          routePage: 'cards',
          params: 'id=' + this.$route.params.card
        }

        this.api(payload).then(response => {
          this.card = response.data.cards[0];
        });
      
    },
  }
}
</script>

<style lang="scss">

.container {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 50px;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background: white;
  border-radius: 25px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.card__image {
  position: relative;
}

.card__title {
  background: #e4e4e4;
  padding: 30px;

  h1 {
    margin: 0 0 10px 0;
    font-weight: 900;
    text-transform: uppercase;
    color: #48689D;
  }

  h3 {
    opacity: .8;
    font-weight: 400;
    margin: 0;
  }
}

.card__content {
  padding: 10px 30px;

  h3 {
    color: #48689D;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    
    li {
      margin-bottom: 5px;
    }
  }
}


</style>
