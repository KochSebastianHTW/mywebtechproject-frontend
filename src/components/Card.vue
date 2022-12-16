<template>
  <div id="card" class="card" draggable="true" :style="{borderColor: actual.borderColor, borderWidth: actual.borderWith}">
    <p id="cardHeader" class="card-header d-flex w-100 justify-content-between">{{ card.name }}</p>
    <div id="cardCenter">
      <p class="card-text overflow-scroll">{{ card.description }}</p>
    </div>
    <div id="cardFooter" class="card-footer d-flex w-100 justify-content-between">
      <small>{{ card.dueDate }}</small>
      <div v-for="label in labels" :key="label.id">
        <Label id="Label" class="text-end" v-if="label.id === card.label" :key="label.id" :label=label></Label>
      </div>
    </div>
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
          bez: 'enough time or done',
          borderColor: '#bababa',
          borderWith: '1px'
        },
        {
          bez: 'approach',
          borderColor: '#ff8c00',
          borderWith: '1px'
        },
        {
          bez: 'over',
          borderColor: '#d10808',
          borderWith: '1px'
        }
      ],
      actual: {
        bez: '',
        aBorderColor: '',
        aBorderWidth: ''
      }
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
  }/*,
  mounted () {
    const dateNow = Date.now()
    const dateCard = this.card.DueDate

    const diff = (dateCard.getTime() - dateNow.getTime()) / 1000
    const hoursDiff = Math.abs(Math.round(diff))

    if ((hoursDiff / 24) >= 5) {
      this.actual = this.status[0]
    } else if ((hoursDiff / 24) >= 1 && (hoursDiff / 24) < 5) {
      this.actual = this.status[1]
    } else if ((hoursDiff / 24) < 1) {
      this.actual = this.status[2]
    }
    if (this.card.register === 'DONE' || this.card.register === 'ARCHIVE') {
      this.actual = this.status[0]
    }
  } */
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
  height: 50px;
  break-after: auto;
}
#cardFooter {
  padding: 3px;
  font-size: 0.7em;
  height: fit-content;
}
::-webkit-scrollbar {
  display: none;
}
</style>
