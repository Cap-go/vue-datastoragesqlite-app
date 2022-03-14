import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import StoreDefault from "@/views/StoreDefault.vue";
import StoreOneDBOneTable from "@/views/StoreOneDBOneTable.vue";
import StoreOneDBTwoTables from "@/views/StoreOneDBTwoTables.vue";
import StoreWithWrapper from "@/views/StoreWithWrapper.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/storedefault",
    name: "StoreDefault",
    component: StoreDefault,
  },
  {
    path: "/storeonedbonetable",
    name: "StoreOneDBOneTable",
    component: StoreOneDBOneTable,
  },
  {
    path: "/storeonedbtwotables",
    name: "StoreOneDBTwoTables",
    component: StoreOneDBTwoTables,
  },
  {
    path: "/storewrapper",
    name: "StoreWithWrapper",
    component: StoreWithWrapper,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;