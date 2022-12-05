<template>
  <button id="launch" class="rounded" type="button" data-bs-toggle="modal" data-bs-target="#CardCreation">
    + Neue Karte erstellen
  </button>
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal fade" id="CardCreation" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalTitle">Neue Karte erstellen</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">

            <form class="needs-validation" novalidate>
              <div class="mb-3">
                <label for="inputName" class="form-label">Wat isn dat Ziel?</label>
                <input type="search" class="form-control" id="inputName" placeholder="Name" v-model="name" required>
                <div class="invalid-feedback">
                  Please provide a name.
                </div>
              </div>
              <div class="mb-3">
                <label for="inputDescription" class="form-label">Wat willste da jenau machn?</label>
                <input type="search" class="form-control" id="inputDescription" placeholder="Beschreibung" v-model="description">
              </div>
              <div class="mb-3">
                <label class="form-label" for="inputDueDate">Bis wann soll dit fertisch sein?</label>
                <input type="datetime-local" class="form-control" id="inputDueDate" v-model="dueDate" required>
                <div class="invalid-feedback">
                  Please choose a Due date.
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label" for="inputSelectLabel">Wat fürn Label willste dran klatschen?</label>
                <select class="form-select" id="inputSelectLabel" v-model="label">
                  <option v-for="label in labels" :key="label.id" value="{{ label.id }}">{{ label.name }}</option>
                </select>
              </div>
              <div class="mt-5">
                <button type="submit" class="btn btn-primary me-3" @click="createCard">Create</button>
                <button type="reset" class="btn btn-danger">Reset</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CardCreateForm',
  data () {
    return {
      name: '',
      description: '',
      dueDate: '',
      label: ''
    }
  },
  props: {
    labels: {
      type: Object
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
          register: 'OPEN'
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
.mb-3 {
  width: auto;
}
#modalTitle {
  color: navy;
}
button {
  margin: 2px;
}
#launch {
  font-size: smaller;
  color: grey;
  border-radius: 3px;
  border-color: darkslategrey;
  border-style: hidden;
  border-width: 1px;
  flex: 1 0 auto;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
  margin: 4px 0 2px 2px;
  padding: 2px 5px;
  display: flex;
  width: fit-content;
  background-color: #ebecf0;
  user-select: none;
}
</style>
