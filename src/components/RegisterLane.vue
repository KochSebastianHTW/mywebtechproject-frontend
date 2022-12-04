<template>
  <div class="register-lane" v-for="statusItem in status" :key="statusItem.name">
    <h2 id="name">{{ statusItem.displayName }}</h2>
    <div id="cardList">
      <Cards id="cards" v-show="card.register === statusItem.register" v-for="card in cards" :key="card.id" :cards="this.card"></Cards>
    </div>
    <card-create-form v-show="statusItem.register === 'OPEN'"></card-create-form>
  </div>
</template>

<script>
import Cards from '@/components/Cards'
import CardCreateForm from '@/components/CardCreateForm'

export default {
  name: 'RegisterLane',
  components: {
    CardCreateForm,
    Cards
  },
  props: {
    card: {}
  },
  data () {
    return {
      cards: [],
      status: [
        {
          displayName: 'Open',
          register: 'OPEN'
        },
        {
          displayName: 'In Progress',
          register: 'IN_PROGRESS'
        },
        {
          displayName: 'Done',
          register: 'DONE'
        },
        {
          displayName: 'Archive',
          register: 'ARCHIVE'
        }
      ]
    }
  }
}
</script>

<style scoped>
.register-lane {
  background-color: #ebecf0;
  border-radius: 3px;
  float: left;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  white-space: normal;
  width: 24.4%;
  margin-left: 0.5%;
  padding: 0.5%;
}

#name {
  background: #0000;
  border-radius: 3px;
  font-weight: 600;
  margin: 1px 0;
  max-height: 256px;
  min-height: 20px;
  padding: 4px 8px;
  resize: none;
}
card-create-form {
  border-radius: 3px;
  margin: 5px;
  padding: 10px;
}
</style>
