<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div id="liveAlertPlaceholder"></div>
    <button type="button" class="btn btn-primary" onclick="document.getElementById('demo').innerHTML = Date()">Datum, Uhrzeit, Zeitzone</button>
  </div>
  <p id="demo"></p>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
