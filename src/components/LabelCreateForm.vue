<template>
  <form class="needs-validation" novalidate>
    <div id="NamingDiv">
      <p id="NamingText">Neues Label erstellen</p>
    </div>
    <div id="inputGroup" class="d-inline-flex">
      <input id="inputColor" type="color" class="form-control" v-model="color">
      <input id="inputName" type="text" class="form-control" v-model="name" required :style="{backgroundColor: color}">
      <div id="buttons" class="d-flex">
        <button type="submit" class="btn btn-outline-success" @click="createLabel">Save</button>
        <button type="button" class="btn btn-outline-danger" @click="resetColor">Reset</button>
      </div>
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
#NamingDiv {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
#NamingText {
  width: 10em;
}
#inputGroup {
  margin-top: -15px;
  padding: 0;
  width: 100%;
}
#inputColor {
  min-width: 30px;
  max-width: 30px;
  height: 30px;
  padding: 0;
  border: hidden;
}
#inputName {
  width: available;
  height: 30px;
  border: 1px solid #777;
  border-radius: 0;
  text-overflow: ellipsis;
}
#inputColor:focus + input + div,
#inputName:focus + div,
button:active{
  visibility: visible;
  transition: ease-in-out 200ms;
  width: 25%;
}
.btn {
  padding: 2px;
  border-width: 2px;
  border-radius: 0;
}
#buttons {
  visibility: hidden;
  transition: ease-in-out 200ms;
  width: 0;
  height: 30px;
}
</style>
