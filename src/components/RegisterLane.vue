<template>
  <div class="register-lane d-inline-flex" v-for="statusItem in status" :key="statusItem.register">
    <h2 id="name">{{ statusItem.displayName }}</h2>
    <div class="list">
      <div id="cardList" v-for="card in cards" v-bind:key="card.id">
        <card-update-form @updated="refreshData" v-if="card.register === statusItem.register" :card="card" :labels="this.labels" :status="status"></card-update-form>
      </div>
    </div>
    <card-create-form @created="refreshData" v-if="statusItem.displayName === 'Open'" :labels=labels></card-create-form>
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
    refreshData () {
      this.$emit('refresh')
    }
  }
}
</script>

<style scoped>
.register-lane {
  background-color: #f0f0f0;
  float: left;
  flex-direction: column;
  width: 24.2%;
  margin:0 5px;
  padding-bottom: 5px;
  white-space: nowrap;
  position: relative;
  border-radius: 10px;
  max-height: 99%;
}
#name {
  background: lightblue;
  font-weight: 600;
  margin: fill;
  letter-spacing: 0.1em;
  word-spacing: 0.1em;
  height: auto;
  padding: 8px;
  color: navy;
  border-radius: 10px;
}
.list {
  padding-top: 2px;
  overflow-x: hidden;
}
button {
  border-style: hidden;
  width: 100%;
  margin-bottom: 5px;
}
button:hover {
  border: grey;
}
::-webkit-scrollbar {
  display: none;
}
</style>
