<template>
  <form class="needs-validation" novalidate>
    <small>Neues Label erstellen</small>
    <div class="input-group">
      <input id="inputColor" type="color" class="form-control" v-model="color">
      <input id="inputName" type="text" class="form-control" v-model="name" required>
      <div class="invalid-feedback">
        Please provide a name.
      </div>
    </div>
    <div class="mb-3">
      <button type="submit" class="btn btn-outline-success me-3" @click="createLabel">Create</button>
      <button type="reset" class="btn btn-outline-danger me-3">Reset</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'LabelCreateForm',
  data () {
    return {
      name: '',
      color: ''
    }
  },
  methods: {
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
.btn {
  border-width: 2px;
}
</style>
