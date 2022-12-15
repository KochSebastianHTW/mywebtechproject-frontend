<template>
  <button id="launch" class="rounded" type="button" data-bs-toggle="modal" data-bs-target="#CardUpdating" data-tilt data-tilt-scale="0.95" data-tilt-startY="40">
    <Card class="Card" :card=card :labels=labels></Card>
  </button>
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal fade" id="CardUpdating" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
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
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                <select id="inputSelectLabel" class="form-select mb-3" v-model="labelId" aria-label="label select example">
                  <option selected="">kein Label</option>
                  <option v-for="label in labels" :key="label.id" :value=label.id :style="{backgroundColor: label.color}">{{ label.name }}</option>
                </select>
                <label for="inputSelectLabel">Label</label>
              </div>
              <div class="mt-5">
                <button type="submit" class="btn btn-primary me-3" @click="updateCard">Create</button>
                <button type="reset" class="btn btn-danger">Reset</button>
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
import Card from '@/components/Card'

export default {
  name: 'CardUpdateForm',
  // eslint-disable-next-line vue/no-unused-components
  components: { Label, Card },
  data () {
    return {
      cName: '',
      cDescription: '',
      cDueDate: '',
      labelId: '',
      cTest: ''
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
    }
  },
  mounted () {
    this.cName = this.card.name
    this.cDescription = this.card.description
    this.cDueDate = this.card.dueDate
    this.labelId = this.card.label
  },
  methods: {
    updateCard () {
      const valid = this.validate()
      if (valid) {
        const endpoints = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/cards/' + this.card.id
        this.cTest = endpoints

        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        const loadout = JSON.stringify({
          name: this.cName,
          description: this.cDescription,
          dueDate: this.cDueDate,
          register: this.card.register,
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
  width: 99%;
  margin: 2px;
  border: hidden;
  transition: 300ms;
}
#launch:hover {
  scale: 1.08;
  background-color: transparent;
  transition: 250ms;
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
input,select,textarea {
  border: 1px solid #2c3e50;
  height: 30px;
  width: 100%;
  border-radius: 8px;
}
</style>
