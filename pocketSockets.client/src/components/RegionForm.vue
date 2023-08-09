<template>
  <form @submit.prevent="createRegion">

    <div class="card">
      <img v-if="editable.picture" :src="editable.picture" alt="region picture" class="rounded-top">
      <div class="card-body">
        <div class="form-group mb-2">
          <label class="small text-muted" for="region">Region Name:</label>
          <input class="form-control" type="text" v-model="editable.name" minlength="3" maxlength="20" required name="region">
        </div>
        <div class="form-group mb-2">
          <label class="small text-muted" for="picture">Region Picture:</label>
          <input class="form-control" type="url" v-model="editable.picture" required name="picture">
        </div>

        <div class="form-group mb-2">
          <button class="btn btn-primary" type="submit">Create Region</button>
        </div>
      </div>
    </div>



  </form>
</template>


<script>
import { ref } from 'vue';
import Pop from '../utils/Pop.js';
import { regionsService } from '../services/RegionsService.js';

export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async createRegion() {
        try {
          regionsService.createRegion(editable.value)
          editable.value = {}
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>