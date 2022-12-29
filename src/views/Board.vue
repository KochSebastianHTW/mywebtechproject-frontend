<template>
    <div id="register">
      <register-lane @refresh="getDataFromBackend" :cards="this.cards" :labels="this.labels"></register-lane>
    </div>
    <div id="labelDisplayButton">
      <label-display @refresh="getDataFromBackend" :labels="this.labels" :cards="this.cards"></label-display>
    </div>
</template>

<script>
import RegisterLane from '@/components/RegisterLane'
import LabelDisplay from '@/components/LabelDisplay'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Board',
  components: {
    LabelDisplay,
    RegisterLane
  },
  data () {
    return {
      cards: [],
      labels: []
    }
  },
  beforeMount () {
    this.getDataFromBackend()
  },
  methods: {
    getDataFromBackend () {
      const endpointCards = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/cards'
      const endpointsLabels = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/labels'

      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      }

      this.cards = []
      fetch(endpointCards, requestOptions)
        .then(response => response.json())
        .then(result => result.forEach(card => {
          this.cards.push(card)
        }))
        .catch(error => console.log('error', error))

      this.labels = []
      fetch(endpointsLabels, requestOptions)
        .then(response => response.json())
        .then(result => result.forEach(label => {
          this.labels.push(label)
        }))
        .catch(error => console.log('error', error))
    }
  }
}
</script>

<style scoped>
#register {
  position: absolute;
  left: 0;
  top: 60px;
  width: 100%;
}
</style>
