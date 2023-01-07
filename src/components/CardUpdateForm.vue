<template>
  <button id="launch" class="rounded" type="button" data-bs-toggle="modal" @click="resetCard" v-bind:data-bs-target="['#CardUpdate'+card.id]" data-tilt data-tilt-scale="0.95" data-tilt-startY="40">
    <Card class="Card" :card=card :labels=labels></Card>
  </button>

  <div class="modal fade" v-bind:id="['CardUpdate'+this.card.id]" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">

        <form v-bind:id="['card-update-form'+this.card.id]" class="needs-validation" novalidate>
          <div class="modal-header justify-content-between d-flex">
            <div class="form-floating">
              <input id="inputName" type="text" class="form-control" v-model="cName" required>
              <label for="inputName">Name</label>
              <div class="invalid-feedback">
                Please provide a name.
              </div>
            </div>
            <button v-bind:id="['CloseBtn'+this.card.id]" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="form-floating">
              <textarea id="inputDescription" type="text" class="form-control" v-model="cDescription"></textarea>
              <label for="inputDescription">Beschreibung</label>
            </div>
            <div class="form-floating">
              <input id="inputDate" type="datetime-local" class="form-control" v-model="cDueDate" required>
              <label for="inputDate">Fälligkeit</label>
              <div class="invalid-feedback">
                Please choose a Due date.
              </div>
            </div>
            <div class="form-floating">
              <select id="inputSelectLabel" class="form-select mb-3" v-model="cLabelId" aria-label="label select example" :style="{backgroundColor: getLabelColor(cLabelId), color: getContrast(getLabelColor(cLabelId))}">
                <option selected="selected" :value="null" :style="{color: 'black', backgroundColor: 'white'}">kein Label</option>
                <option v-for="label in labels" :key="label.id" :value=label.id :style="{backgroundColor: label.color, color: getContrast(label.color)}">{{ label.name }}</option>
              </select>
              <label for="inputSelectLabel">Label</label>
            </div>
            <div id="registerSelection" class="row align-items-center d-flex">
              <div id="election" class="col" v-for="statusitem in status" :key="statusitem.displayName">
                <label id="registerName" class="justify-content-between">{{ statusitem.displayName }}
                  <br><input type="radio" name="radio" v-bind:checked="statusitem.register === this.card.register" :value="statusitem.register" v-model="cRegister">
                </label>
              </div>
            </div>
            <button v-bind:id="['SaveBtn' + this.card.id]" type="submit" class="btn btn-outline-success me-3" @click.prevent="updateCard" @mouseover="mouseOver">Save</button>
            <button v-bind:id="['DeleteBtn' + this.card.id]" type="button" class="btn btn-outline-danger me-3" @click="deleteCard">Delete</button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card'
import moment from 'moment'

let btnMove = 0
export default {
  name: 'CardUpdateForm',
  components: { Card },
  data () {
    return {
      cName: '',
      cDescription: '',
      cDueDate: '',
      cRegister: '',
      cLabelId: '',
      serverValidationMessages: []
    }
  },
  props: {
    card: {
      type: Object,
      required: true
    },
    labels: {
      type: Array,
      required: true
    },
    status: {
      type: Array,
      required: true
    }
  },
  emits: ['updated'],
  mounted () {
    this.resetCard()
    this.resetButton(document.getElementById('SaveBtn' + this.card.id))
  },
  methods: {
    getContrast (input) {
      if (input === '' || input === null) {
        return 'black'
      }
      const hexcolor = input.slice(1)
      const r = parseInt(hexcolor.substr(0, 2), 16)
      const g = parseInt(hexcolor.substr(2, 2), 16)
      const b = parseInt(hexcolor.substr(4, 2), 16)
      const val = ((r * 299) + (g * 587) + (b * 114)) / 1000
      return (val >= 128) ? 'black' : 'white'
    },
    mouseOver () {
      const button = document.getElementById('SaveBtn' + this.card.id)
      if ((this.cName === '' || this.cDueDate === '') && btnMove === 0) {
        this.buttonMoveLeft(button)
        // eslint-disable-next-line vue/no-mutating-props
        btnMove = 1
        return false
      }
      if ((this.cName === '' || this.cDueDate === '') && btnMove === 1) {
        this.buttonMoveRight(button)
        // eslint-disable-next-line vue/no-mutating-props
        btnMove = 2
        return false
      }
      if ((this.cName === '' || this.cDueDate === '') && btnMove === 2) {
        this.buttonMoveLeft(button)
        // eslint-disable-next-line vue/no-mutating-props
        btnMove = 1
        return false
      } else {
        button.style.cursor = 'pointer'
        return false
      }
    },
    buttonMoveLeft (button) {
      button.style.transform = 'translateX(-180%)'
    },
    buttonMoveRight (button) {
      button.style.transform = 'translateX(0%)'
    },
    resetButton (button) {
      button.style.transform = 'translateX(0%)'
    },
    resetCard () {
      this.cName = this.card.name
      this.cDescription = this.card.description
      this.cDueDate = moment(this.card.dueDate).format('YYYY-MM-DDTHH:mm')
      this.cRegister = this.card.register
      this.cLabelId = this.card.labelId
    },
    getLabelColor (labelId) {
      if (labelId === null || labelId === '') {
        return '#FFFFFF'
      }
      for (let i = 0; i < this.labels.length; i++) {
        if (this.labels[i].id === labelId) {
          return this.labels[i].color
        }
      }
      return '#FFFFFF'
    },
    isEquals () {
      return this.cName === this.card.name &&
        this.cDescription === this.card.description &&
        this.cDueDate === this.card.dueDate &&
        this.cRegister === this.card.register &&
        this.cLabelId === this.card.labelId
    },
    deleteCard () {
      const endpoints = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/cards/' + this.card.id

      const requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      }

      fetch(endpoints, requestOptions)
        .then(res => this.$emit('updated'))
        .catch(error => console.log('error', error))
      document.getElementById('CloseBtn' + this.card.id).click()
    },
    async updateCard () {
      if (this.isEquals()) {
        console.log('Closing')
        document.getElementById('CloseBtn' + this.card.id).click()
        return false
      }
      if (this.validate()) {
        console.log('Updated')
        const endpoints = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/cards/' + this.card.id

        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        const loadout = JSON.stringify({
          name: this.cName,
          description: this.cDescription,
          dueDate: this.cDueDate,
          register: this.cRegister,
          labelId: this.cLabelId
        })

        const requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: loadout,
          redirect: 'follow'
        }

        const response = await fetch(endpoints, requestOptions)
        await this.handleResponse(response)
      }
    },
    async handleResponse (response) {
      if (response.ok) {
        this.$emit('updated')
        document.getElementById('CloseBtn' + this.card.id).click()
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
      const form = document.getElementById('card-update-form' + this.card.id)
      form.classList.add('was-validated')
      return form.checkValidity()
    }
  }
}
</script>

<style scoped>
#launch {
  width: 98%;
  margin: 0 0 5px 0;
  border: hidden;
  background-color: transparent;
  transition: 200ms;
}
#launch:hover {
  scale: 1.02;
  transition: 200ms;
}
.modal-body {
  max-height: calc(100vh - 210px);
  overflow-y: auto;
}
form {
  background-color: lightblue;
}
button {
  margin: 2px;
  border-width: 2px;
}
.btn-outline-success {
  padding: 0 30px;
  cursor: default;
  width: auto;
  transition: 0.15s;
  float: right;
  height: 40px;
  margin: 1px 5% 12px 0;
}
.btn-outline-danger {
  float: left;
  width: auto;
  height: 40px;
  padding: 0 30px;
}
.form-floating {
  margin: 5px;
  padding: 5px;
  display: flex;
  justify-content: left;
  align-items: start;
  flex-direction: column;
  border-style: hidden;
}
#inputName {
  min-width: 400px;
}
input, textarea, select {
  border: 1px solid #2c3e50;
  width: 100%;
  border-radius: 8px;
  background-color: white;
}
label {
  font-size: small;
}
#registerName {
  position: relative;
  bottom: 0;
  font-size: medium;
  color: black;
}
#registerSelection {
  margin-bottom: 30px;
  margin-top: -15px;
}
</style>
