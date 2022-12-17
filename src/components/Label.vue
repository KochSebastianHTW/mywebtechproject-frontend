<template>
  <div>
    <small id="Label" class="badge rounded-pill " :style="{backgroundColor: label.color}">{{ label.name }}</small>
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
small {
  display: inline-block;
  position: relative;
  margin-bottom: 0;
  border-radius: 4px;
  padding: 0 8px;
  min-width: 10%;
  max-width: 180px;
  height: 16px;
  box-sizing: border-box;
  line-height: 16px;
  font-size: 12px;
  font-weight: 400;
  text-align: left;
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
