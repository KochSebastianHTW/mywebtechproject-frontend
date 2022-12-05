<template>
  <div id="board">
    <register-lane :cards="this.cards"></register-lane>
  </div>
  <div>
    <LabelDisplay></LabelDisplay>
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
  created () {
    const endpointCards = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/cards'
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }
    fetch(endpointCards, requestOptions)
      .then(response => response.json())
      .then(result => result.forEach(card => {
        this.cards.push(card)
      }))
      .catch(error => console.log('error', error))
  }
}
</script>

<style scoped>
</style>
