<template>
  <div class="label-display">
    <button class="btn sticky-bottom" data-bs-toggle="offcanvas" data-bs-target="#LabelDisplayOffcanvas" aria-controls="LabelDisplayOffcanvas">Labels</button>

    <div class="offcanvas offcanvas-end" tabindex="-1" id="LabelDisplayOffcanvas" aria-labelledby="offcanvasRightLabel">
      <div class="offcanvas-header">
        <h3 id="heading">Deine Labels</h3>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
          <LabelUpdateForm @updated="refreshData" v-for="label in labels" :key="label.id" :label="label" :cards="this.cards"></LabelUpdateForm>
      </div>
      <div class="offcanvas-bottom">
        <LabelCreateForm @created="refreshData"></LabelCreateForm>
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
    },
    cards: {
      type: Array,
      required: true
    }
  },
  emits: ['refresh'],
  methods: {
    refreshData () {
      this.$emit('refresh')
    }
  }
}
</script>

<style scoped>
.offcanvas-body {
  padding: 0;
  margin: 0;
}
.offcanvas-bottom {
  border-top: 2px solid grey;
}
.offcanvas {
  background-color: lightblue;
}
.btn {
  position: fixed;
  width: fit-content;
  height: fit-content;
  bottom: 20px;
  right: 20px;
  font-weight: bolder;
  background-color: #e3f2fd;
  border: 2px solid grey;
}
.btn:hover {
  background-color: #e3f2fd;
  border: 2px solid navy;
}
</style>
