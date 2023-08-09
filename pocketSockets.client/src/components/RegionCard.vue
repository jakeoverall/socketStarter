<template>
  <div class="card my-3">
    <router-link :to="{ name: 'Region', params: { id: region.id } }">
      <img class="selectable" :src="region.picture" :alt="region.name">
    </router-link>
  </div>
</template>


<script>
export default {
  props: {
    region: { type: Object, required: true }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.card {
  max-height: 300px;
  overflow: hidden;
  img {
    width: 100%;
    object-fit: cover;
    object-position: center;

  }
}
</style>
