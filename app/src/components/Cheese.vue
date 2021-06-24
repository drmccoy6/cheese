<template>
  <div v-if="currentCheese" class="edit-form">
    <h4>Cheese</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentCheese.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="currentCheese.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentCheese.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button class="badge badge-primary mr-2"
      v-if="currentCheese.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2"
      @click="deleteCheese"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateCheese"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Cheese...</p>
  </div>
</template>

<script>
import CheeseDataService from "../services/CheeseDataService";

export default {
  name: "cheese",
  data() {
    return {
      currentCheese: null,
      message: ''
    };
  },
  methods: {
    getCheese(id) {
      CheeseDataService.get(id)
        .then(response => {
          this.currentCheese = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentCheese.id,
        title: this.currentCheese.title,
        description: this.currentCheese.description,
        published: status
      };

      CheeseDataService.update(this.currentCheese.id, data)
        .then(response => {
          console.log(response.data);
          this.currentCheese.published = status;
          this.message = 'The status was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateCheese() {
      CheeseDataService.update(this.currentCheese.id, this.currentCheese)
        .then(response => {
          console.log(response.data);
          this.message = 'The cheese was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteCheese() {
     CheeseDataService.delete(this.currentCheese.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "cheeses" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getCheese(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>