<template>
  <div id="card" class="card" draggable="true" :style="{borderColor: actual.borderColor, borderWidth: actual.borderWith}">
    <p id="cardHeader" class="card-header d-flex w-100 justify-content-between">{{ card.name }}</p>
    <div id="cardCenter">
      <p class="card-text overflow-scroll">{{ card.description }}</p>
    </div>
    <div id="cardFooter" class="card-footer d-flex w-100 justify-content-between">
      <small id="date">{{ this.dateInFormat }}</small>
      <div >
        <Label id="Label" v-for="label in labels" :key="label.id" v-show="label.id === card.label" :label=label></Label>
      </div>
    </div>
  </div>
</template>

<script>
import Label from '@/components/Label'
import moment from 'moment'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Card',
  components: { Label },
  data () {
    return {
      status: [
        {
          bez: 'enough time or done',
          borderColor: '#e0e0e0',
          borderWith: '2px'
        },
        {
          bez: 'approach',
          borderColor: '#ff8c00',
          borderWith: '2px'
        },
        {
          bez: 'over',
          borderColor: '#d10808',
          borderWith: '2px'
        }
      ],
      actual: {
        bez: '',
        aBorderColor: '',
        aBorderWidth: ''
      },
      dateInFormat: {}
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
  },
  mounted () {
    this.dateInFormat = moment(this.card.dueDate).format('DD.MM.YYYY HH:mm')
    this.recalculateTime()
    // setInterval(this.recalculateTime, 60 * 1000)
    const d = new Date()
    const sec = d.getSeconds()
    setTimeout(() => {
      setInterval(() => {
        this.recalculateTime()
      }, 60 * 1000)
    }, (60 - sec + 1) * 1000)
  },
  methods: {
    recalculateTime () {
      console.log('I\'m disinclined to acquiesce to your request -> ' + new Date())
      const dateNow = Date.now()
      const dateCard = Date.parse(this.card.dueDate)
      const diff = dateCard - dateNow

      const diffMins = Math.round((diff / 1000))
      const diffDays = diffMins / 60 / 60 / 24

      if (diffDays >= 1) {
        this.actual = this.status[0]
      } else if (diffDays >= 0 && diffDays < 1) {
        this.actual = this.status[1]
      } else if (diffDays < 0) {
        this.actual = this.status[2]
      }
      if (this.card.register === 'DONE' || this.card.register === 'ARCHIVE') {
        this.actual = this.status[0]
      }
    }
  }
}
</script>

<style scoped>
#card {
  background-color: #e0e0e0;
}
#cardHeader {
  color: cornflowerblue;
  height: 30px;
  font-size: larger;
  padding: 3px;
}
#cardCenter {
  padding: 3px;
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
#date {
  position: relative;
  left: 0;
  bottom: 50%;
}
Label {
  position: relative;
  right: 0;
  bottom: 50%;
}
::-webkit-scrollbar {
  display: none;
}
</style>
