<template>
  <div>
    <div id="card" class="card" draggable="true" :style="{
      borderColor: status[0].borderColor, borderWidth: status[0].borderWith
    }">
      <p id="cardHeader" class="card-header d-flex w-100 justify-content-between">{{ card.name }}</p>
      <div id="cardCenter" class="card-text d-flex w-100 justify-content-between">
        <p>{{ card.description }}</p>
        <Label id="Label{{card.label}}" class="text-end" v-show="card.id === card.label" :key="card.label"></Label>
      </div>
      <small id="cardFooter" class="card-footer d-flex w-100 justify-content-between text-end">{{ card.dueDate }}</small>
    </div>
  </div>
</template>

<script>
import Label from '@/components/Label'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Card',
  components: {
    Label
  },
  data () {
    return {
      labels: [],
      singleCard: {},
      status: [
        {
          status: 'time',
          borderColor: '#bababa',
          borderWith: '1px'
        },
        {
          status: 'near',
          borderColor: '#ff8c00',
          borderWith: '2px'
        },
        {
          status: 'due',
          borderColor: '#d10808',
          borderWith: '2px'
        }
      ]
    }
  },
  props: {
    card: {
      type: Object
    },
    label: { }
  },
  methods: {
    calcDue () {
      // let dueStatus
      // dueStatus = card.dueDate - Date.now()
    }
  }
}
</script>

<style scoped>
#cardHeader {
  color: cornflowerblue;
  align-items: center;
  max-height: 30px;
  font-size: larger;
}
#cardCenter {
  padding: 2px;
  min-height: 40px;
  font-size: small;
}
#cardFooter {
  font-size: small;
  margin-top: 10px;
  height: 20px;
  align-items: center;
}
</style>
