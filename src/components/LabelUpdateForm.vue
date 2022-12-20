<template>
  <form class="needs-validation" novalidate>
    <div id="inputGroup" class="d-inline-flex">
      <input id="inputColor" type="color" class="form-control" v-model="lColor">
      <input id="inputName" type="text" class="form-control" v-model="lName" required :style="{backgroundColor: lColor}">
      <div id="buttons" class="d-flex">
        <button type="submit" class="btn btn-outline-success" @click="updateLabel">Save</button>
        <button type="button" class="btn btn-outline-danger" @click="deleteLabel">Delete</button>
      </div>
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
    resolveDependency () {
      for (let i = 0; i < this.cards.length; i++) {
        if (this.cards[i].label === this.label.id) {
          // eslint-disable-next-line vue/no-mutating-props
          const endpointsCard = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/cards/' + this.cards[i].id

          const myHeaders = new Headers()
          myHeaders.append('Content-Type', 'application/json')

          const loadout = JSON.stringify({
            name: this.cards[i].name,
            description: this.cards[i].description,
            dueDate: this.cards[i].dueDate,
            register: this.cards[i].register,
            label: null
          })

          const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: loadout,
            redirect: 'follow'
          }

          fetch(endpointsCard, requestOptions)
            .catch(error => console.log('error', error))
        }
      }
    },
    deleteLabel () {
      this.resolveDependency()

      const endpointsLabel = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/labels/' + this.label.id

      const requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      }

      fetch(endpointsLabel, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error))

      window.location.reload()
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
#inputGroup {
  margin-bottom: 10px;
  padding: 0;
  width: 100%;
}
#inputColor {
  min-width: 30px;
  max-width: 30px;
  padding: 0;
  border: hidden;
  height: 30px;
  background-color: transparent;
}
#inputName {
  width: available;
  border-radius: unset;
  border: 1px solid #777;
  height: 30px;
  text-overflow: ellipsis;
}
#inputGroup:hover{
  outline: 1pt solid white;
  transition: 10ms;
}
#inputGroup:focus-within {
  outline: transparent;
  transition: 10ms;
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
