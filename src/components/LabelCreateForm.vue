<template>
  <form class="needs-validation" novalidate>
    <div id="NamingDiv">
      <p id="NamingText">Neues Label erstellen</p>
    </div>
    <div id="inputGroup" class="d-inline-flex">
      <input id="inputColor" type="color" class="form-control" v-model="color">
      <input id="inputName" type="text" class="form-control" v-model="name" required :style="{backgroundColor: this.color, color: getContrast(this.color)}">
      <button type="submit" class="btn btn-outline-success" @click="createLabel">Create</button>
      <button type="button" class="btn btn-outline-danger" @click="resetInput">Reset</button>
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
      color: '#ffffff',
      serverValidationMessages: []
    }
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
    resetInput () {
      this.name = ''
      this.color = '#ffffff'
    },
    async createLabel () {
      console.log('Creating Label: ' + this.name)
      if (this.validate()) {
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

        const response = await fetch(endpoints, requestOptions)
        await this.handleResponse(response)
      }
    },
    async handleResponse (response) {
      if (response.ok) {
        this.$emit('created', 'refresh')
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
  width: 99%;
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
#inputName:focus + button,
#inputName:focus + button + button,
#inputColor:focus + input + button,
#inputColor:focus + input + button + button,
button:active{
  visibility: visible;
  transition: ease-in-out 200ms;
  width: 22%;
  pause: 1s;
}
.btn {
  visibility: hidden;
  transition: ease-in-out 200ms;
  width: 0;
  height: 30px;
  padding: 2px;
  border-width: 2px;
  border-radius: 0;
}
</style>
