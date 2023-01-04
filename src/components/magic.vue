<template>
  <button id="launch" type="button" class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#CardCreation" @click="clearCard">
    app manual
  </button>

  <div class="modal fade" id="CardCreation" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">

        <div class="modal-header justify-content-between d-flex">
          Just kidding, look at the README.md
          <button id="close-offcanvas" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <img src="../assets/coding_magic_webTech.jpg" class="center">
        </div>

      </div>
    </div>
  </div>
</template>

<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'magic'
}
</script>

<style scoped>
form{
  background: lightblue;
}
#launch {
  border-width: 2px;
}
.modal-content {
  background: lightblue;
}
.modal-body {
  width: fit-content;
  height: fit-content;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
}
</style>
