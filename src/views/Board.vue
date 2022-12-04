<template>
  <div id="board">
    <h1 id="Welcome">Welcome to Your Board</h1>
    <RegisterLane :cards="this.cards"></RegisterLane>
  </div>
</template>

<script>
import RegisterLane from '@/components/RegisterLane'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Board',
  components: {
    RegisterLane
  },
  data () {
    return {
      cards: []
    }
  },
  mounted () {
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
#Welcome {
  color: navy;
  font-weight: bolder;
  width: auto;
  border: 5px solid royalblue;
  padding: 5px 0;
  margin: 2%;
}
Board {
  background-color: cornflowerblue;
}
</style>
