import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/layout/home";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/layout/login")
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/pages/test")
  },
  {
    path: "/test2",
    name: "test2",
    component: () => import("../views/pages/test2")
  }
];

const router = new VueRouter({
  mode: "hash",
  // base: process.env.BASE_URL,
  routes
});

export default router;
