<template>
  <button id="launch" class="rounded" type="button" data-bs-toggle="modal" data-bs-target="#CardCreation">
    + Neue Karte erstellen
  </button>
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal fade" id="CardCreation" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">

          <form class="needs-validation" novalidate>
            <div class="modal-header justify-content-between d-flex">
              <div class="form-floating">
                <input id="inputName" type="text" class="form-control" v-model="name" required>
                <label for="inputName">Name</label>
                <div class="invalid-feedback">
                  Please provide a name.
                </div>
              </div>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                <select id="inputSelectLabel" class="form-select mb-3" v-model="labelId" aria-label="label select example">
                  <option selected="">kein Label</option>
                  <option v-for="label in labels" :key="label.id" :value=label.id :style="{backgroundColor: label.color}">{{ label.name }}</option>
                </select>
                <label for="inputSelectLabel">Label</label>
              </div>
              <div class="mt-3">
                <button type="submit" class="btn btn-outline-success me-3" @click="createCard">Create</button>
                <button type="reset" class="btn btn-outline-danger me-3">Reset</button>
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Label from '@/components/Label'

export default {
  name: 'CardCreateForm',
  // eslint-disable-next-line vue/no-unused-components
  components: { Label },
  data () {
    return {
      name: '',
      description: '',
      dueDate: '',
      labelId: ''
    }
  },
  props: {
    labels: {
      type: Array,
      required: true
    }
  },
  methods: {
    createCard () {
      const valid = this.validate()
      if (valid) {
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
form {
  background-color: lightblue;
}
button {
  margin: 2px;
  border-width: 2px;
}
#launch {
  font-size: smaller;
  color: grey;
  border-style: hidden;
  flex: 1 0 auto;
  margin: 4px 0 2px 2px;
  padding: 2px 5px;
  display: flex;
  background-color: #ebecf0;
  user-select: none;
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
