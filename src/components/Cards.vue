<template>
  <div id="card" class="cards" draggable="true">
    <div id="cardHeader" class="d-flex w-100 justify-content-between">
      <h5 class="card-header">{{ card.name }}</h5>
      <small class="text-muted"> {{ cards }}zuletzt bearbeitet am: ???</small>
    </div>
    <p class="card-text">{{ card.description }}</p>
    <div id="cardCenter" class="d-flex w-100 justify-content-between">
      <small class="text-end">
        <Labels id="{{card.label}}">{{ label.name }}</Labels>
      </small>
      <p class="card-footer">Fällig: {{ card.dueDate }} </p>
    </div>
  </div>
</template>

<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Cards',
  data () {
    return {
      cards: [],
      labels: []
    }
  },
  props: {
    // eslint-disable-next-line vue/no-dupe-keys
    card: { },
    label: { }
  }
}
</script>

<style scoped>
#cards {
  margin-bottom: 5px;
}
</style>
