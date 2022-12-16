<template>
  <form class="needs-validation" novalidate>
      <div class="input-group">
        <input id="inputColor" type="color" class="form-control" v-model="lColor">
        <input id="inputName" type="text" class="form-control" v-model="lName" required :style="{backgroundColor: lColor}">
        <button type="submit" class="btn btn-outline-success" @click="updateLabel">Save</button>
        <button type="submit" class="btn btn-outline-danger" @click="updateLabel">Delete</button>
        <div class="invalid-feedback">
          Please provide a name.
        </div>
      </div>
  </form>
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
    }
  },
  mounted () {
    this.lName = this.label.name
    this.lColor = this.label.color
  },
  methods: {
    updateLabel () {
      const valid = this.validate()
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
}
.input-group:focus-within {
  border: 1px solid black;
  margin-top: -1px;
  margin-bottom: 9px;
}
#inputColor {
  max-width: 30px;
  padding: 0;
  border: hidden;
  height: 30px;
}
#inputName {
  min-width: 100px;
  border: 1px black solid;
  height: 30px;
}
#inputName:hover {
  border-left: 1px solid white;
  transition: 10ms;
}
#inputColor:focus + input + button,
#inputColor:focus + input + button + button{
  visibility: visible;
}
#inputName:focus + button,
#inputName:focus + button + button{
  visibility: visible;
}
button {
  visibility: hidden;
  border-width: 2px;
  height: 30px;
  padding: 2px;
}
button:active {
  visibility: visible;
}
</style>
