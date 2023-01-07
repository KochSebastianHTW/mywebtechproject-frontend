<template>
  <button id="launch" type="button" data-bs-toggle="modal" data-bs-target="#CardCreation" @click="clearCard">
    + Create a new card
  </button>

  <div class="modal fade" id="CardCreation" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">

        <form id="card-create-form" class="needs-validation" novalidate>
          <div class="modal-header justify-content-between d-flex">
            <div class="form-floating">
              <input id="inputName" type="text" class="form-control" v-model="name" required>
              <label for="inputName">Name</label>
              <div class="invalid-feedback">
                Please provide a name.
              </div>
            </div>
            <button id="close-offcanvas" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="form-floating">
              <textarea id="inputDescription" type="text" class="form-control" v-model="description"></textarea>
              <label for="inputDescription">Beschreibung</label>
            </div>
            <div class="form-floating">
              <input id="inputDate" type="datetime-local" class="form-control" v-model="dueDate" required>
              <label for="inputDate">Fälligkeit</label>
              <div class="invalid-feedback">
                Please choose a Due date.
              </div>
            </div>
            <div class="form-floating">
              <select id="inputSelectLabel" class="form-select mb-3" v-model="labelId" aria-label="label select example" :style="{backgroundColor: getLabelColor(labelId), color: getContrast(getLabelColor(labelId))}">
                <option selected="selected" :value="null" :style="{color: 'black', backgroundColor: 'white'}">kein Label</option>
                <option v-for="label in labels" :key="label.id" :value=label.id :style="{backgroundColor: label.color, color: getContrast(label.color)}">{{ label.name }}</option>
              </select>
              <label for="inputSelectLabel">Label</label>
            </div>
            <button id="CreateBtn" type="submit" class="btn btn-outline-success me-3" @click.prevent="createCard" @mouseover="mouseOver">Create</button>
            <button id="ResetBtn" type="button" class="btn btn-outline-danger me-3" @click="resetButton(); clearCard()">Reset</button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
import Label from '@/components/Label'
import moment from 'moment/moment'

let btnMove = 0
export default {
  name: 'CardCreateForm',
  // eslint-disable-next-line vue/no-unused-components
  components: { Label },
  data () {
    return {
      name: '',
      description: '',
      dueDate: null,
      labelId: '',
      serverValidationMessages: []
    }
  },
  props: {
    labels: {
      type: Array,
      required: true
    }
  },
  emits: ['created'],
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
      if ((this.name === '' || this.dueDate === '') && btnMove === 0) {
        this.buttonMoveLeft()
        // eslint-disable-next-line vue/no-mutating-props
        btnMove = 1
        return false
      }
      if ((this.name === '' || this.dueDate === '') && btnMove === 1) {
        this.buttonMoveRight()
        // eslint-disable-next-line vue/no-mutating-props
        btnMove = 2
        return false
      }
      if ((this.name === '' || this.dueDate === '') && btnMove === 2) {
        this.buttonMoveLeft()
        // eslint-disable-next-line vue/no-mutating-props
        btnMove = 1
        return false
      } else {
        document.getElementById('CreateBtn').style.cursor = 'pointer'
        return false
      }
    },
    buttonMoveLeft () {
      const button = document.getElementById('CreateBtn')
      button.style.transform = 'translateX(-180%)'
    },
    buttonMoveRight () {
      const button = document.getElementById('CreateBtn')
      button.style.transform = 'translateX(0%)'
    },
    resetButton () {
      const button = document.getElementById('CreateBtn')
      button.style.transform = 'translateX(0%)'
    },
    clearCard () {
      this.name = ''
      this.description = ''
      this.dueDate = moment(new Date()).format('YYYY-MM-DDTHH:mm')
      this.labelId = null
    },
    getLabelColor (labelId) {
      if (labelId === null || labelId === '') {
        return '#FFFFFF'
      }
      for (let i = 0; i < this.labels.length; i++) {
        console.log(this.labels[i].id + ' <=> ' + labelId)
        if (this.labels[i].id === labelId) {
          return this.labels[i].color
        }
      }
      return '#FFFFFF'
    },
    async createCard () {
      if (this.validate()) {
        const endpoints = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/cards'

        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        const payload = JSON.stringify({
          name: this.name,
          description: this.description,
          dueDate: this.dueDate,
          register: 'OPEN',
          labelId: this.labelId
        })

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: payload,
          redirect: 'follow'
        }

        const response = await fetch(endpoints, requestOptions)
        await this.handleResponse(response)
      }
    },
    async handleResponse (response) {
      if (response.ok) {
        this.$emit('created')
        this.resetButton()
        document.getElementById('close-offcanvas').click()
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
      const form = document.getElementById('card-create-form')
      form.classList.add('was-validated')
      return form.checkValidity()
    }
  }
}
</script>

<style scoped>
form {
  background-color: lightblue;
}
button {
  margin: 2px;
  border-width: 2px;
}

#CreateBtn {
  padding: 0 30px;
  cursor: default;
  width: auto;
  transition: 0.15s;
  float: right;
  height: 40px;
  margin: 1px 5% 12px 0;
}
#ResetBtn {
  float: left;
  width: auto;
  height: 40px;
  padding: 0 30px;
}
#launch {
  font-size: smaller;
  color: grey;
  border-style: hidden;
  border-radius: 3px;
  flex: 1 0 auto;
  margin: 5px 0 2px 2px;
  padding: 2px 5px;
  display: flex;
  background-color: #dadada;
  user-select: none;
  width: 95%;
  position: relative;
  left: 2%;
  top: 2px;
}
#launch:hover {
  background-color: #b4b4b4;
  color: dimgrey;
  border-radius: 3px;
}
.modal-body {
  max-height: calc(100vh - 210px);
  overflow-y: auto;
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
</style>
