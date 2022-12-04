<template>
  <form>
    <button id="launch" class="rounded" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Neue Karte erstellen
    </button>
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Neue Karte erstellen</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

              <div class="mb-3">
                <label for="inputName" class="form-label">Name</label>
                <input type="text" class="form-control" id="inputName" v-model="name">
                <div class="form-text">Wat ist isn dat Ziel?</div>
              </div>
              <br>
              <div class="mb-3">
                <label for="inputDescription" class="form-label">Beschreibung</label>
                <input type="text" class="form-control" id="inputDescription" v-model="description">
                <div class="form-text">Wat willste da jenau machn?</div>
              </div>
              <div class="mb-3">
                <label class="form-label" for="inputDueDate">Due Date</label>
                <input type="datetime-local" class="form-control" id="inputDueDate" v-model="dueDate">
                <div class="form-text">Bis wann soll dit fertich sein?</div>
              </div>
              <div class="mb-3">
                <label class="form-label" for="">Labels</label>
                <select class="form-select" v-model="label">
                  <option selected>kein Label</option>
                  <option value="a">neues Label erstellen...</option>
                  <option value="{{label.id}}">{{ label.name }}</option>
                  <option value="2">Zwei</option>
                  <option value="3">Drei</option>
                </select>
              </div>
              <div>
                <button type="submit" class="btn btn-primary" @click="createCard">Create</button>
                <button type="submit" class="btn btn-danger">Reset</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
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
  methods: {
    createCard () {
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
  }
}
</script>

<style scoped>
.mb-3 {
  width: auto;
}
button {
  margin: 5px;
}
#launch {
  color: grey;
  border-radius: 3px;
  border-color: darkslategrey;
  border-width: 1px;
  display: flex;
  width: fit-content;
  background-color: whitesmoke;
}
</style>
