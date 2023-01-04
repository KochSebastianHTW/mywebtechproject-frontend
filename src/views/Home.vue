<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>U know what to-do</h1>
    <br>
    <h3>~ Your to-do website ~</h3>
    <br>
    <magic></magic>
  </div>
</template>

<script>
import Magic from '@/components/magic'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  components: { Magic }
}
</script>

<style>
.home {
  position: absolute;
  top: 100px;
  width: 100%;
}
h1 {
  font-weight: bolder;
  font-size: xxx-large;
  font-family: 'Bahnschrift',cursive;
}
</style>
