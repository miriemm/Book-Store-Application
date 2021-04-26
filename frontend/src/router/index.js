import Vue from "vue";
import VueRouter from "vue-router";
import UserList from "../views/UserList.vue";
import BookList from "../views/BookList.vue";
import { auth as store } from "../store/auth.module";
import Login from "../views/Login";
import BookEmployee from "../views/BookEmployee";
import Report from "@/views/Report";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/users",
    name: "Users",
    component: UserList,
    beforeEnter: (to, from, next) => {
      if (store.getters.isAdmin) {
        next();
      } else {
        next({ name: "Books" });
      }
    },
  },
  {
    path: "/books",
    name: "Books",
    component: BookList,
    beforeEnter: (to, from, next) => {
      if (store.state.status.loggedIn) {
        next();
      } else {
        next({ name: "Home" });
      }
    },
  },
  {
    path: "/reports",
    name: "Report",
    component: Report,
    beforeEnter: (to, from, next) => {
      if (store.state.status.loggedIn) {
        next();
      } else {
        next({ name: "Home" });
      }
    },
  },
  {
    path: "/employee",
    name: "BookEmployee",
    component: BookEmployee,
    beforeEnter: (to, from, next) => {
      if (store.state.status.loggedIn) {
        next();
      } else {
        next({name: "Home"});
      }
    }
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
