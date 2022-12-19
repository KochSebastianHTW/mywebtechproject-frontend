<template>
  <form class="needs-validation" novalidate>
    <small class="float-start">Neues Label erstellen</small>
    <div class="input-group">
      <input id="inputColor" type="color" class="form-control" v-model="color">
      <input id="inputName" type="text" class="form-control" v-model="name" required :style="{backgroundColor: color}">
      <button type="submit" class="btn btn-outline-success" @click="createLabel">Save</button>
      <button type="button" class="btn btn-outline-danger" @click="resetColor">Reset</button>
      <div class="invalid-feedback">
        Please provide a name.
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'LabelCreateForm',
  data () {
    return {
      name: '',
      color: '#ffffff'
    }
  },
  methods: {
    resetColor () {
      this.name = ''
      this.color = '#ffffff'
    },
    createLabel () {
      const valid = this.validate()
      if (valid) {
        const endpoints = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/labels'

        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        const payload = JSON.stringify({
          name: this.name,
          color: this.color
        })

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: payload,
          redirect: 'follow'
        }

        fetch(endpoints, requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
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
  margin-bottom: 5px;
}
#inputColor {
  max-width: 45px;
  height: 45px;
  padding: 0;
  border: hidden;
}
#inputName {
  min-width: 100px;
  border: 1px black solid;
}
#inputColor:focus + input + button,
#inputColor:focus + input + button + button,
#inputName:focus + button,
#inputName:focus + button + button,
button:active{
  visibility: visible;
  transition: ease-in-out 200ms;
  transform: translateX(-25px) translateZ(-25px);
}
.btn {
  visibility: hidden;
  border-width: 2px;
  right: -30px;
  transition: ease-in-out 200ms;
  transform: translateX(25px) translateZ(25px) scale(0);
}
</style>
