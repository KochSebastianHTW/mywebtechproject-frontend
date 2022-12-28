<template>
  <button id="launch" type="button" data-bs-toggle="modal" data-bs-target="#CardCreation">
    + Neue Karte erstellen
  </button>
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal fade" id="CardCreation" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
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
                <select id="inputSelectLabel" class="form-select mb-3" v-model="labelId" aria-label="label select example" :style="{color: this.getLabelColor()}">
                  <option selected="selected" value="null" :style="{color: 'black'}">kein Label</option>
                  <option v-for="label in labels" :key="label.id" :value=label.id :style="{backgroundColor: label.color, color: getContrast(label.color)}">{{ label.name }}</option>
                </select>
                <label for="inputSelectLabel">Label</label>
              </div>
              <button id="CreateBtn" type="submit" class="btn btn-outline-success me-3" @click.prevent="createCard" @mouseover="mouseOver">Create</button>
              <button id="ResetBtn" type="reset" class="btn btn-outline-danger me-3" @click="resetButton">Reset</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Label from '@/components/Label'

let btnMove = 0
export default {
  name: 'CardCreateForm',
  // eslint-disable-next-line vue/no-unused-components
  components: { Label },
  data () {
    return {
      name: '',
      description: '',
      dueDate: '',
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
      this.name = ''
      this.dueDate = ''
    },
    getLabelColor () {
      if (this.labelId === null) {
        return 'black'
      }
      for (let i = 0; i < this.labels.length; i++) {
        if (this.labels[i].id === this.labelId) {
          return this.labels[i].color
        }
      }
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
          label: this.labelId
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
        this.$emit('created', 'refresh')
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
  margin: 4px 0 2px 2px;
  padding: 2px 5px;
  display: flex;
  background-color: #ebecf0;
  user-select: none;
  width: fit-content;
  position: relative;
  bottom: 50%;
  left: 20%;
}
#launch:hover {
  background-color: whitesmoke;
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
  background-color: floralwhite;
}
input:focus, textarea:focus, select:focus {
  background-color: white;
}
label {
  font-size: small;
}
</style>
