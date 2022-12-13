<template>
  <div>
    <span id="Label" class="badge rounded-pill " :style="{color: '#'+label.color}">name: {{ label.name }}</span>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Label',
  props: {
    label: {
      type: Object
    }
  }
}
</script>

<style scoped>
span {
  display: inline-block;
  position: relative;
  margin-bottom: 0;
  border-radius: 4px;
  padding: 0 8px;
  min-width: 56px;
  max-width: 100%;
  height: 16px;
  box-sizing: border-box;
  /*background-color: var(--onelabel-color, #DFE1E6);*/
  line-height: 16px;
  /*color: var(--text-color);*/
  font-size: 12px;
  font-weight: 400;
  text-align: left;
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
