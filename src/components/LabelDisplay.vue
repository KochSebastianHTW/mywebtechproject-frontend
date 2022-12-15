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
          <div>
            <LabelUpdateForm :label="label"></LabelUpdateForm>
          </div>
        </div>
      </div>
      <div class="offcanvas-bottom">
        <LabelCreateForm></LabelCreateForm>
      </div>
    </div>
  </div>
</template>

<script>
import LabelCreateForm from '@/components/LabelCreateForm'
import LabelUpdateForm from '@/components/LabelUpdateForm'
export default {
  name: 'LabelDisplay',
  components: { LabelUpdateForm, LabelCreateForm },
  props: {
    labels: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.offcanvas-bottom {
  border-top: 2px solid grey;
  margin: 2px;
  padding: 2px;
}
.btn {
  position: fixed;
  width: fit-content;
  height: fit-content;
  bottom: 20px;
  right: 20px;
  font-weight: bolder;
  background-color: #e3f2fd;
  border: 2px solid navy;
}
.btn:hover {
  background-color: #e3f2fd;
  border: 1px solid navy;
}
</style>
