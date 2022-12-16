<template>
  <div class="input-group">
    <form class="needs-validation d-inline-flex" novalidate>
      <div id="inputFrames" class="d-inline-flex">
        <input id="inputColor" type="color" class="form-control" v-model="lColor">
        <input id="inputName" type="text" class="form-control" v-model="lName" required :style="{backgroundColor: lColor}">
        <div class="invalid-feedback">
          Please provide a name.
        </div>
      </div>
      <button type="submit" class="btn btn-outline-success" @click="updateLabel">Save</button>
      <button type="button" class="btn btn-outline-danger" @click="deleteLabel">Delete</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LabelUpdateForm',
  data () {
    return {
      lName: '',
      lColor: ''
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
  mounted () {
    this.lName = this.label.name
    this.lColor = this.label.color
  },
  methods: {
    deleteLabel () {
      const endpoints = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/labels/' + this.label.id

      const requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      }

      for (let i = 0; i < this.cards.length; i++) {
        if (this.cards[i].label === this.label.id) {
          // eslint-disable-next-line vue/no-mutating-props
          this.cards[i].label = null
        }
      }
      fetch(endpoints, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error))
    },
    updateLabel () {
      const valid = this.validate()
      console.log(valid)
      if (valid) {
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

        fetch(endpoints, requestOptions)
          .catch(error => console.log('error', error))
      }
    },
    validate () {
      let valid = true

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
.input-group {
  margin-bottom: 10px;
  background: transparent;
}
#inputColor {
  max-width: 30px;
  padding: 0;
  border: hidden;
  height: 30px;
  background-color: transparent;
}
#inputName {
  min-width: 100px;
  border-radius: unset;
  border: 1px black solid;
  height: 30px;
  text-overflow: ellipsis;
}
#inputFrames:hover{
  outline: 1pt solid white;
  transition: 10ms;
}
form:focus-within {
  outline: transparent;
  transition: 10ms;
}
#inputFrames:focus-within + button,
#inputFrames:focus-within + button + button{
  visibility: visible;
  transition: ease-in-out 200ms;
  transform: translateX(-25px) translateZ(-10px);
}
button {
  visibility: hidden;
  border-width: 2px;
  border-radius: 0;
  height: 30px;
  padding: 2px;
  right: -30px;
  transition: ease-in-out 200ms;
  transform: translateX(25px) translateZ(10px) scale(0);
}
button:active {
  visibility: visible;
  transition: ease-in-out 200ms;
  transform: translateX(-25px) translateZ(-10px);
}
</style>
