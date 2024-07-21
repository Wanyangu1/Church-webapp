// src/router.js
import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../components/Dashboard.vue";
import ItemList from "../components/ItemList.vue";
import ItemDetail from "../components/ItemDetail.vue";
import Register from "../components/Register.vue";
import Login from "../components/Login.vue";
import CreateItem from "../components/CreateItem.vue"

const routes = [
  { path: "/", component: Login },
  { path: "/dashboard", component: Dashboard },
  { path: "/members", component: ItemList },
  { path: "/leadership", component: ItemList },
  { path: "/items/:id", component: ItemDetail },
  { path: "/register", component: Register },
  { path: "/login", component: Login },
  { path: "/createuser", component: CreateItem },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
