<template>
  <div v-for="label in labels" :key="label.id">
    <span id="{{label.id}}" class="badge rounded-pill " :style="{color: '#'+label.color}">Label-comp:{{ label.name }}</span>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Label',
  data () {
    return {
      labels: []
    }
  },
  beforeCreate () {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    const endpoints = process.env.VUE_APP_BACKEND_BASE_URL + '/api/v1/labels'

    fetch(endpoints, requestOptions)
      .then(response => response.text())
      .then(result => result.forEach(label => {
        this.labels.push(label)
      }))
      .catch(error => console.log('error', error))
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
