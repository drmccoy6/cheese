<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="cheese.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="cheese.description"
          name="description"
        />
      </div>

      <button @click="saveCheese" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newCheese">Add</button>
    </div>
  </div>
</template>

<script>
import CheeseDataService from "../services/CheeseDataService";

export default {
  name: "add-cheese",
  data() {
    return {
      cheese: {
        id: null,
        title: "",
        description: "",
        productImageURL: "",
        price:"",
        likes:""
      },
      submitted: false
    };
  },
  methods: {
    saveCheese() {
      var data = {
        title: this.cheese.title,
        description: this.cheese.description
      };

      CheeseDataService.create(data)
        .then(response => {
          this.cheese.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newCheese() {
      this.submitted = false;
      this.cheese = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>