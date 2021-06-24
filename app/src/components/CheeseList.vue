<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Cheeses List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(cheese, index) in cheeses"
          :key="index"
          @click="setActiveCheese(cheese, index)"
        >
          {{ cheese.title }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllCheeses">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentCheese">
        <h4>Cheese</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentCheese.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentCheese.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentCheese.published ? "Published" : "Pending" }}
        </div>

        <router-link :to="'/cheeses/' + currentCheese.id" class="badge badge-warning">Edit</router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Cheese...</p>
      </div>
    </div>
  </div>
</template>

<script>
import CheeseDataService from "../services/CheeseDataService";

export default {
  name: "cheeses-list",
  data() {
    return {
      cheeses: [],
      currentCheese: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveCheeses() {
      CheeseDataService.getAll()
        .then(response => {
          this.cheeses = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveCheeses();
      this.currentCheese = null;
      this.currentIndex = -1;
    },

    setActiveCheese(cheese, index) {
      this.currentCheese = cheese;
      this.currentIndex = cheese ? index : -1;
    },

    removeAllCheeses() {
      CheeseDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      CheeseDataService.findByTitle(this.title)
        .then(response => {
          this.cheeses = response.data;
          this.setActiveCheese(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveCheeses();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>