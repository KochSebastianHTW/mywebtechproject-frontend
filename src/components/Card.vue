<template>
  <div id="card" class="card" draggable="true" :style="{borderColor: status[0].borderColor, borderWidth: status[0].borderWith}">
    <p id="cardHeader" class="card-header d-flex w-100 justify-content-between">{{ card.name }}</p>
    <div id="cardCenter">
      <p class="card-text d-flex w-100 justify-content-between">{{ card.description }}</p>
      <div v-for="label in labels" :key="label.id">
        <Label id="Label" class="text-end" v-if="label.id === card.label" :key="label.id"></Label>
      </div>
    </div>
    <small id="cardFooter" class="card-footer d-flex w-100 justify-content-between text-end">{{ card.dueDate }}</small>
  </div>
</template>

<script>
import Label from '@/components/Label'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Card',
  components: { Label },
  data () {
    return {
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
    labels: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
#cardHeader {
  color: cornflowerblue;
  height: fit-content;
  font-size: larger;
  padding: 3px;
}
#cardCenter {
  padding: 3px;
  min-height: fit-content;
  font-size: small;
  display: flex;
  flex-direction: column;
  height: 40px;
}
#cardFooter {
  padding: 3px;
  font-size: 0.7em;
  height: fit-content;
}
</style>
