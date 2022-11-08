<template>
  <h1>Welcome to Cards</h1>
  <div class="card-group" v-for="card in cards" :key="card.id">
    <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="card-header">{{ card.name }}</h5>
        <small class="text-muted">3 days ago</small>
      </div>
      <div class="d-flex w-100 justify-content-between">
        <p class="card-text">{{ card.description }}</p>
        <small class="text-end">{{ card.label_ids }}</small>
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
      cards: [
        {
          id: 1,
          name: 'M2',
          dueDate: '14.11.2022T17:00',
          description: 'blabla',
          register: 'DONE'.toLocaleLowerCase(),
          label_ids: null
        },
        {
          id: 2,
          name: 'M3',
          dueDate: '05.12.2022T17:00',
          description: 'bliblablup',
          register: 'IN PROGRESS'.toLocaleLowerCase(),
          label_ids: 4
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
