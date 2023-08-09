<template>
  <form @submit.prevent="saveAccount">

    <div class="card">
      <div class="card-body">
        <div class="form-group mb-2">
          <label class="small text-muted" for="name">Name:</label>
          <input class="form-control" type="text" v-model="editable.name" minlength="3" maxlength="20" required>
        </div>
        <div class="form-group mb-2">
          <label class="small text-muted" for="picture">Picture:</label>
          <input class="form-control" type="url" v-model="editable.picture" required name="picture">
        </div>

        <div class="form-group mb-2">
          <button class="btn btn-primary" type="submit">Save Changes</button>
        </div>
      </div>
    </div>

  </form>
</template>


<script>
import { ref, watchEffect } from 'vue';
import Pop from '../utils/Pop.js';
import { accountService } from '../services/AccountService.js';
import { AppState } from '../AppState.js';

export default {
  setup() {
    const editable = ref({})

    watchEffect(() => {
      editable.value = { ...AppState.account }
    })

    return {
      editable,
      async saveAccount() {
        try {
          accountService.saveAccount(editable.value)
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>