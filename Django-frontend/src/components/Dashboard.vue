<!-- src/components/Dashboard.vue -->
<template>
  <div>
    <navbar></navbar>

    <div class="row mt-4">
      <main class="col-md-9 mx-auto col-lg-10 px-md-4">
        <div v-if="!loggedIn" class="alert alert-warning">
          <p>Please log in to view your dashboard.</p>
          <router-link to="/login" class="btn btn-primary">Login</router-link>
          <router-link to="/register" class="btn btn-secondary"
            >Register</router-link
          >
        </div>

        <div v-else>
          <div class="row">
            <div class="col-lg-12">
              <div class="card mb-4">
                <div class=" card-header ">
                  <h3>Item List</h3>
                </div>
                <div class="card-body">
                  <table class="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in items" :key="item.id">
                        <td>{{ item.name }}</td>
                        <td>{{ item.description }}</td>
                        <td>
                          <router-link
                            :to="'/items/' + item.id"
                            class="btn btn-outline-info btn-sm"
                            >View</router-link
                          >
                          <button
                            @click="deleteItem(item.id)"
                            class="btn btn-danger btn-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="col-lg-12">
              <div class="card mb-4">
                <div class="card-header p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle">
                  <h3>Add New Item</h3>
                </div>
                <div class="card-body">
                  <form @submit.prevent="createItem">
                    <div class="mb-3">
                      <label for="name" class="form-label">Name:</label>
                      <input
                        type="text"
                        class="form-control"
                        id="name"
                        v-model="name"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="description" class="form-label"
                        >Description:</label
                      >
                      <textarea
                        class="form-control"
                        id="description"
                        v-model="description"
                        required
                      ></textarea>
                    </div>
                    <button type="submit" class="btn btn-outline-primary">
                      Add Item
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "./Navbar.vue";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      items: [],
      name: "",
      description: "",
      showSidebar: true,
    };
  },
  computed: {
    loggedIn() {
      return localStorage.getItem("token");
    },
  },
  created() {
    if (this.loggedIn) {
      this.fetchItems();
    }
  },
  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
    async fetchItems() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/items/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.items = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async createItem() {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/items/",
          {
            name: this.name,
            description: this.description,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        this.items.push(response.data);
        this.name = "";
        this.description = "";
      } catch (error) {
        console.error(error);
      }
    },
    async deleteItem(id) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/items/${id}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.items = this.items.filter((item) => item.id !== id);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped></style>
