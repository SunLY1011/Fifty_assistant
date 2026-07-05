import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/table",
    name: "Table",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Table.vue"),
  },
  // {
  //   path: "/personalCenter",
  //   name: "PersonalCenter",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/PersonalCenter.vue"),
  // },
  {
    path: "/practise",
    name: "Practise",
    component: () => import("../views/Practise.vue"),
    redirect: "/practise/normal",
    children: [
      {
        path: "normal",
        component: () => import("../views/practise/Normal.vue"),
      },
      {
        path: "fast",
        component: () => import("../views/practise/Fast.vue"),
      },
      {
        path: "zen",
        component: () => import("../views/practise/Zen.vue"),
      },
      {
        path: "review",
        component: () => import("../views/practise/Review.vue"),
      },
    ],
  },
  {
    path: "/personalCenter",
    name: "PersonalCenter",
    component: () => import("../views/PersonalCenter.vue"),
    redirect: "/personalCenter/center",
    children: [
      {
        path: "center",
        component: () => import("../views/personalCenter/Center.vue"),
      },
      {
        path: "setting",
        component: () => import("../views/personalCenter/Setting.vue"),
      },
      {
        path: "about",
        component: () => import("../views/personalCenter/About.vue"),
      },
      {
        path: "studyStatus",
        component: () => import("../views/personalCenter/StudyStatus.vue"),
      },
      // {
      //   path: "logIn",
      //   component: () => import("../views/personalCenter/Review.vue"),
      // },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
