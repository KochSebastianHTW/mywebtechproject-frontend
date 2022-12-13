<template>
  <div class="label-display">
    <button class="btn sticky-bottom" data-bs-toggle="offcanvas" data-bs-target="#LabelDisplayOffcanvas" aria-controls="LabelDisplayOffcanvas">Labels</button>

    <div class="offcanvas offcanvas-end" tabindex="-1" id="LabelDisplayOffcanvas" aria-labelledby="offcanvasRightLabel">
      <div class="offcanvas-header">
        <h5 id="offcanvasRightLabel">Deine Labels</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div v-for="label in labels" :key="label.id">
          <Label class="Label" :label=label></Label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Label from '@/components/Label'
export default {
  name: 'LabelDisplay',
  components: { Label },
  props: {
    labels: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.btn {
  position: fixed;
  width: fit-content;
  height: fit-content;
  bottom: 20px;
  right: 20px;
  font-weight: bolder;
  background-color: #e3f2fd;
}
</style>
