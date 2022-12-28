<template>
  <nav class="navbar fixed-top navbar-expand-lg" style="background-color: #e3f2fd;">
    <div class="container-fluid">
      <router-link id="Title" class="navbar-brand" to="/">U Know What ToDo</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <div class="navbar-nav me-auto mb-2 mb-lg-0">
          <router-link class="nav-link" to="/about">About</router-link>
          <router-link class="nav-link" to="/board">Board</router-link>
        </div>
        <form class="d-flex" role="search">
          <input id="search" class="form-control me-2" type="search" placeholder="Karte suchen ..." aria-label="Search" v-model="search">
          <button class="btn btn-outline-success" type="submit" disabled>Suchen</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Navbar',
  data () {
    return {
      search: ''
    }
  }
}
</script>

<style scoped>
#Title {
  font-size: xx-large;
}
.container-fluid {
  margin: -10px 0 -10px 0;
}

</style>
