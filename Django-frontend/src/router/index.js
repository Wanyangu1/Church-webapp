// src/router.js
import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../components/Dashboard.vue";
import ItemList from "../components/ItemList.vue";
import ItemDetail from "../components/ItemDetail.vue";
import Register from "../components/Register.vue";
import Login from "../components/Login.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/dashboard", component: Dashboard },
  { path: "/items", component: ItemList },
  { path: "/items/:id", component: ItemDetail },
  { path: "/register", component: Register },
  { path: "/login", component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
