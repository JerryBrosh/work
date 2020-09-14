import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Student from "@/components/Student.vue";
import Index from "@/components/Index.vue";
import Class from "@/components/Class.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/",
        name: "Index",
        component: Index
      },
      {
        path: "/student",
        name: "Student",
        component: Student
      },
      {
        path: "/class",
        name: "Class",
        component: Class
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
