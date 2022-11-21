<template>
  <h1>Welcome to Cards</h1>
  <div class="data-mdb-connected-list" v-for="card in cards" :key="card.id">
    <div id="Open" class="list-group-item">
      <div class="card" draggable="true">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="card-header">{{ card.name }}</h5>
          <small class="text-muted"> zuletzt bearbeitet am: ???</small>
        </div>
        <div class="d-flex w-100 justify-content-between">
          <p class="card-text">{{ card.description }}</p>
          <small class="text-end">{{ card.labels }}</small>
        </div>
        <p class="card-footer">Fällig: {{ getDateOfDue(card) }} {{ getTimeOfDue(card) }}</p>
      </div>
    </div>
    <div id="In Progress" class="list-group-item">
      <div class="card" draggable="true">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="card-header">{{ card.name }}</h5>
          <small class="text-muted"> zuletzt bearbeitet am: ???</small>
        </div>
        <div class="d-flex w-100 justify-content-between">
          <p class="card-text">{{ card.description }}</p>
          <small class="text-end">{{ card.labels }}</small>
        </div>
        <p class="card-footer">Fällig: {{ getDateOfDue(card) }} {{ getTimeOfDue(card) }}</p>
      </div>
    </div>
    <div id="Done" class="list-group-item">
      <div class="card" draggable="true">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="card-header">{{ card.name }}</h5>
          <small class="text-muted"> zuletzt bearbeitet am: ???</small>
        </div>
        <div class="d-flex w-100 justify-content-between">
          <p class="card-text">{{ card.description }}</p>
          <small class="text-end">{{ card.labels }}</small>
        </div>
        <p class="card-footer">Fällig: {{ getDateOfDue(card) }} {{ getTimeOfDue(card) }}</p>
      </div>
    </div>
    <div id="Archive" class="list-group-item">
      <div class="card" draggable="true">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="card-header">{{ card.name }}</h5>
          <small class="text-muted"> zuletzt bearbeitet am: ???</small>
        </div>
        <div class="d-flex w-100 justify-content-between">
          <p class="card-text">{{ card.description }}</p>
          <small class="text-end">{{ card.labels }}</small>
        </div>
        <p class="card-footer">Fällig: {{ getDateOfDue(card) }} {{ getTimeOfDue(card) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
function getDateOfDue (card) {
  const due = splitDue(card.dueDate)
  const date = due[2] + '.' + due[1] + '.' + due[0]
  return date
}

// eslint-disable-next-line no-unused-vars
function getTimeOfDue (card) {
  const due = splitDue(card.dueDate)
  const time = due[3] + ':' + due[4]
  return time
}

function splitDue (due) {
  due = due.toString().split(',')
  return due
}

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Cards',
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

</style>
