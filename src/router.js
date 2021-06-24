// import Vue from "vue";
// import Router from "vue-router";

// Vue.use(Router);

// export default new Router({
//     mode: "history",
//     routes: [
//       {
//         path: "/",
//         alias: "/cheeses",
//         name: "cheeses",
//         component: () => import("./components/CheeseList")
//       },
//       {
//         path: "/cheeses/:id",
//         name: "cheese-details",
//         component: () => import("./components/Cheese")
//       },
//       {
//         path: "/add",
//         name: "add",
//         component: () => import("./components/AddCheese")
//       }
//     ]
//   });

import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/cheeses",
    name: "cheeses",
    component: () => import("./components/CheesesList")
  },
  {
    path: "/cheeses/:id",
    name: "cheese-details",
    component: () => import("./components/Cheese")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddCheese")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;