<template>
  <div class="region-card my-3">
    <router-link :to="{name: 'Region', params: {id: region.id}}">
      <img :src="region.picture" :alt="region.name" class="img-fluid">
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
img {
  height: 300px;
  object-fit: contain;
  object-position: center;
}
</style>
