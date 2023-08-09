<template>
  <div class="container-fluid">
    <div class="row my-2">
      <div class="col-3">
        <div class="card">
          <div class="card-body text-center">
            <img class="rounded" :src="account.picture" alt="" />
            <p class="strong fs-3 mb-0"> {{ account.name }}</p>
            <div>
              <sup class="text-muted">
                {{ account.email }}
              </sup>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <AccountForm />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
