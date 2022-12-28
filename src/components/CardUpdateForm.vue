<template>
  <button id="launch" class="rounded" type="button" data-bs-toggle="modal" v-bind:data-bs-target="['#CardUpdate'+card.id]" data-tilt data-tilt-scale="0.95" data-tilt-startY="40">
    <Card class="Card" :card=card :labels=labels></Card>
  </button>

  <div class="modal fade" v-bind:id="['CardUpdate'+this.card.id]" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">

        <form class="needs-validation" novalidate>
          <div class="modal-header justify-content-between d-flex">
            <div class="form-floating">
              <input id="inputName" type="text" class="form-control" v-model="cName" required>
              <label for="inputName">Name</label>
              <div class="invalid-feedback">
                Please provide a name.
              </div>
            </div>
            <button id="CloseBtn" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="resetCard"></button>
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
              <select id="inputSelectLabel" class="form-select mb-3" v-model="labelId" aria-label="label select example" :style="{color: this.getLabelColor()}">
                <option selected="selected" value="null" :style="{color: 'black'}">kein Label</option>
                <option v-for="label in labels" :key="label.id" :value=label.id :style="{backgroundColor: label.color, color: getContrast(label.color)}">{{ label.name }}</option>
              </select>
              <label for="inputSelectLabel">Label</label>
            </div>
              <div class="row align-items-center">
                <div id="election" class="col" v-for="statusitem in status" :key="statusitem.displayName">
                  <label id="registerName" class="justify-content-between">{{ statusitem.displayName }}
                    <br><input type="radio" name="radio" v-bind:checked="statusitem.register === this.card.register" :value="statusitem.register" v-model="cRegister">
                  </label>
                </div>
            </div>
            <br>
            <button id="SaveBtn" type="submit" class="btn btn-outline-success me-3" @click="updateCard" @mouseover="mouseOver">Save</button>
            <button id="DeleteBtn" type="button" class="btn btn-outline-danger me-3" @click="deleteCard">Delete</button>
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
      labelId: ''
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
  mounted () {
    this.resetCard()
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
    mouseOver () {
      if ((this.cName === '' || this.cDueDate === '') && btnMove === 0) {
        this.buttonMoveLeft()
        // eslint-disable-next-line vue/no-mutating-props
        btnMove = 1
        return false
      }
      if ((this.cName === '' || this.cDueDate === '') && btnMove === 1) {
        this.buttonMoveRight()
        // eslint-disable-next-line vue/no-mutating-props
        btnMove = 2
        return false
      }
      if ((this.cName === '' || this.cDueDate === '') && btnMove === 2) {
        this.buttonMoveLeft()
        // eslint-disable-next-line vue/no-mutating-props
        btnMove = 1
        return false
      } else {
        document.getElementById('SaveBtn').style.cursor = 'pointer'
        return false
      }
    },
    buttonMoveLeft () {
      const button = document.getElementById('SaveBtn')
      button.style.transform = 'translateX(-180%)'
    },
    buttonMoveRight () {
      const button = document.getElementById('SaveBtn')
      button.style.transform = 'translateX(0%)'
    },
    resetButton () {
      const button = document.getElementById('SaveBtn')
      button.style.transform = 'translateX(0%)'
    },
    resetCard () {
      this.cName = this.card.name
      this.cDescription = this.card.description
      this.cDueDate = moment(this.card.dueDate).format('YYYY-MM-DDTHH:mm')
      this.cRegister = this.card.register
      this.labelId = this.card.label
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
    deleteCard () {
      const endpoints = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/cards/' + this.card.id

      const requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      }

      fetch(endpoints, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error))
      window.location.reload()
    },
    updateCard () {
      const valid = this.validate()
      if (valid) {
        const endpoints = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/cards/' + this.card.id

        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        const loadout = JSON.stringify({
          name: this.cName,
          description: this.cDescription,
          dueDate: this.cDueDate,
          register: this.cRegister,
          label: this.labelId
        })

        const requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: loadout,
          redirect: 'follow'
        }

        fetch(endpoints, requestOptions)
          .catch(error => console.log('error', error))
      }
    },
    validate () {
      let valid = true
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms = document.querySelectorAll('.needs-validation')

      // Loop over them and prevent submission
      Array.prototype.slice.call(forms)
        .forEach(function (form) {
          form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
              valid = false
              event.preventDefault()
              event.stopPropagation()
            }

            form.classList.add('was-validated')
          }, false)
        })

      return valid
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
  transition: 150ms;
}
#launch:hover {
  scale: 1.05;
  transition: 150ms;
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
#SaveBtn {
  padding: 0 30px;
  cursor: default;
  width: auto;
  transition: 0.15s;
  float: right;
  height: 40px;
  margin: 1px 5% 12px 0;
}
#DeleteBtn {
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
  background-color: floralwhite;
}
input:focus, textarea:focus, select:focus {
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
</style>
