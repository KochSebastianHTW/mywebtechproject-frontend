<template>
  <div class="register-lane overflow-hidden" v-for="statusItem in status" :key="statusItem.register">
    <h2 id="name">{{ statusItem.displayName }}</h2>
    <div id="cardList" v-for="card in cards" :key="card.id">
      <card-update-form v-if="card.register === statusItem.register" :card="card" :labels="this.labels" :status="status"></card-update-form>
    </div>
    <card-create-form @created="refreshCards" v-if="statusItem.displayName === 'Open'" :labels=labels></card-create-form>
  </div>
</template>

<script>
import CardUpdateForm from '@/components/CardUpdateForm'
import CardCreateForm from '@/components/CardCreateForm'

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
  },
  emits: ['refresh'],
  methods: {
    refreshCards () {
      this.$emit('refresh')
    }
  }
}
</script>

<style scoped>
.register-lane {
  background-color: #f0f0f0;
  border-radius: 3px;
  float: left;
  box-sizing: border-box;
  display: inline-flex;
  flex-direction: column;
  width: 24.2%;
  padding-bottom: 5px;
  overflow-x: visible;
  height: 100%;
  margin:0 5px;
  white-space: nowrap;
  position: relative;
  -webkit-overflow-scrolling: touch;
}
#name {
  background: lightblue;
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
}
button {
  border-style: hidden;
  width: 100%;
  margin-bottom: 5px;
}
button:hover {
  border: grey;
}
</style>
