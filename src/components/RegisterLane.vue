<template>
  <div class="register-lane" v-for="statusItem in status" :key="statusItem.register">
    <h2 id="name">{{ statusItem.displayName }}</h2>
    <div id="cardList" v-for="card in cards" :key="card.id">
      <CardUpdateForm v-if="card.register === statusItem.register" :card="card" :labels="this.labels"></CardUpdateForm>
    </div>
    <card-create-form v-if="statusItem.displayName === 'Open'" :labels=labels></card-create-form>
  </div>
</template>

<script>
import CardUpdateForm from '@/components/CardUpdateForm'
import CardCreateForm from '@/components/CardCreateForm'
/*
const allCards = document.querySelectorAll('.Card')
const allLanes = document.querySelectorAll('.register-lane')

allCards.forEach(item => {
  item.addEventListener('dragstart', dragStart)
  item.addEventListener('dragend', dragEnd)
}) */

export default {
  name: 'RegisterLane',
  components: {
    CardCreateForm,
    CardUpdateForm
  },
  props: {
    cards: {
      type: Array,
      required: true
    },
    labels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
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
  /* ,
  methods: {
    dragStart () {
      console.log('drag started')
    },

    dragEnd () {
      console.log('drag ended')
    }
  } */
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
  padding-bottom: 5px;
  margin-left: 0.5%;
  margin-top:  60px;
}
#name {
  background: darkgrey;
  border-radius: 3px;
  font-weight: 600;
  margin: fill;
  letter-spacing: 0.1em;
  word-spacing: 0.1em;
  max-height: 256px;
  min-height: 20px;
  padding: 10px;
  color: navy;
}
card-create-form {
  border-radius: 3px;
  margin: 5px;
  padding: 10px;
}
button {
  border-style: hidden;
  width: 100%;
  margin-bottom: 5px;
}

.invisible{
  display: none;
}
</style>
