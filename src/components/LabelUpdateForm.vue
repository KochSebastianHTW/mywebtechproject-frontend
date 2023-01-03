<template>
  <form v-bind:id="['label-update-form' + this.label.id]" class="needs-validation" novalidate>
    <div id="inputGroup" class="d-inline-flex">
      <input id="inputColor" type="color" class="form-control" v-model="lColor">
      <input id="inputName" type="text" class="form-control" v-model="lName" required :style="{backgroundColor: lColor, color: getContrast(lColor)}">
      <button type="button" class="btn btn-outline-success" @click.prevent="updateLabel">Save</button>
      <button type="button" class="btn btn-outline-danger" @click.prevent="deleteLabel">Delete</button>
    </div>
    <div class="invalid-feedback">
      Please provide a name.
    </div>
  </form>
</template>

<script>
export default {
  name: 'LabelUpdateForm',
  data () {
    return {
      lName: '',
      lColor: '',
      serverValidationMessages: []
    }
  },
  props: {
    label: {
      Type: Object
    },
    cards: {
      type: Array,
      required: true
    }
  },
  emits: ['updated'],
  mounted () {
    this.lName = this.label.name
    this.lColor = this.label.color
  },
  methods: {
    getContrast (input) {
      const hexcolor = input.slice(1)
      const r = parseInt(hexcolor.substr(0, 2), 16)
      const g = parseInt(hexcolor.substr(2, 2), 16)
      const b = parseInt(hexcolor.substr(4, 2), 16)
      const val = ((r * 299) + (g * 587) + (b * 114)) / 1000
      return (val >= 128) ? 'black' : 'white'
    },
    resolveDependency () {
      for (let i = 0; i < this.cards.length; i++) {
        if (this.cards[i].labelId === this.label.id) {
          // eslint-disable-next-line vue/no-mutating-props
          const endpointsCard = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/cards/' + this.cards[i].id

          const myHeaders = new Headers()
          myHeaders.append('Content-Type', 'application/json')

          const loadout = JSON.stringify({
            name: this.cards[i].name,
            description: this.cards[i].description,
            dueDate: this.cards[i].dueDate,
            register: this.cards[i].register,
            labelId: null
          })

          const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: loadout,
            redirect: 'follow'
          }

          fetch(endpointsCard, requestOptions)
            .catch(error => console.log('error', error))
        }
      }
    },
    deleteLabel () {
      console.log('deleting Label: ' + this.label.name)
      this.resolveDependency()

      const endpointsLabel = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/labels/' + this.label.id

      const requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      }

      fetch(endpointsLabel, requestOptions)
        .then(res => this.$emit('updated'))
        .catch(error => console.log('error', error))
    },
    async updateLabel () {
      console.log('Updating Label: ' + this.label.name)
      if (this.validate()) {
        const endpoints = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/labels/' + this.label.id

        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        const loadout = JSON.stringify({
          name: this.lName,
          color: this.lColor
        })

        const requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: loadout,
          redirect: 'follow'
        }
        console.log(loadout)

        const response = await fetch(endpoints, requestOptions).catch(error => console.log('error', error))
        await this.handleResponse(response)
      }
    },
    async handleResponse (response) {
      if (response.ok) {
        this.$emit('updated')
      } else if (response.status === 400) {
        response = await response.json()
        response.errors.forEach(error => {
          this.serverValidationMessages.push(error.defaultMessage)
        })
      } else {
        this.serverValidationMessages.push('unknown error occurred')
      }
    },
    validate () {
      const form = document.getElementById('label-update-form' + this.label.id)
      console.log('label-update-form' + this.label.id)
      form.classList.add('was-validated')
      return form.checkValidity()
    }

  }
}
</script>

<style scoped>
#inputGroup {
  margin-bottom: 10px;
  padding: 0;
  width: 99%;
  overflow: hidden;
}
#inputColor {
  min-width: 30px;
  max-width: 30px;
  padding: 0;
  border: hidden;
  height: 30px;
  background-color: transparent;
}
#inputName {
  width: available;
  border-radius: unset;
  border: 1px solid #777;
  height: 30px;
  text-overflow: ellipsis;
}
#inputGroup:hover{
  border-left: 1pt solid black;
  transition: 10ms;
}
#inputGroup:focus-within {
  outline: transparent;
  transition: 10ms;
}
#inputName:focus + button,
#inputName:focus + button + button,
#inputColor:focus + input + button,
#inputColor:focus + input + button + button,
button:active{
  visibility: visible;
  width: 20%;
  padding: 2px;
  border-width: 2px;
}
.btn {
  visibility: hidden;
  transition: ease-in-out 250ms;
  transition-delay: 250ms;
  width: 0;
  height: 30px;
  padding: 0;
  border-width: 0;
  border-radius: 0;
}
</style>
