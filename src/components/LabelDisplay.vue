<template>
  <button class="btn btn-primary position-fixed end-50" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Labels</button>

  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header">
      <h5 id="offcanvasRightLabel">Offcanvas right</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <Label v-for="label in labels" :key="label.id"></Label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LabelDisplay'
}
</script>

<style scoped>

</style>
