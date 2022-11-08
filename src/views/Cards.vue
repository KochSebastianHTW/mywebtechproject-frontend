<template>
  <h1>Welcome to Cards</h1>
  <div class="list-group-horizontal" v-for="card in cards" :key="card.id">
    <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="card-header">{{ card.name }}</h5>
        <small class="text-muted">3 days ago</small>
      </div>
      <div class="d-flex w-100 justify-content-between">
        <p class="card-text">{{ card.description }}</p>
        <small class="text-end">{{ card.label }}</small>
      </div>
      <p class="card-footer">{{ card.dueDate }}</p>
    </a>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Cards',
  data () {
    return {
      cards: []
    }
  },
  mounted () {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    fetch('http://localhost:8080/api/v1/cards', requestOptions)
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
