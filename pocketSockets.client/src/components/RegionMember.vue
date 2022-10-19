<template>
  <div class="region-member position-relative mb-3">
    <div class="d-flex align-items-center gap-2 clip-text">
      <i class="mdi mdi-hexagon-slice-6 position-absolute online" v-if="member.isOnline"></i>
      <img class="elevation-1" :src="member.account.picture" :alt="member.account.name">
      <small>
        <b>
          {{member.account.name}}
        </b>
      </small>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    member: { type: Object, required: true }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.online {
  filter: drop-shadow(0 0 2px rgb(246, 250, 248)) drop-shadow(0 0 4px rgba(225, 255, 229, 0.624));
  color: rgba(171, 242, 172, 0.656);
  bottom: -7px;
  left: -3px;
}

img {
  height: 32px;
  width: 32px;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
}
</style>
