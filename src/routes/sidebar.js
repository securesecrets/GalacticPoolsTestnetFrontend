/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
// const base = "/GalacticPoolsTestnetFrontend";
const routes = [
  {
    path: `/app/dashboard`, // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  // {
  //   path: '/app/forms',
  //   icon: 'FormsIcon',
  //   name: 'Forms',
  // },
  // {
  //   path: '/app/cards',
  //   icon: 'CardsIcon',
  //   name: 'Cards'
  // },
  // {
  //   path: '/app/charts',
  //   icon: 'ChartsIcon',
  //   name: 'Charts',
  // },
  // {
  //   path: '/app/buttons',
  //   icon: 'ButtonsIcon',
  //   name: 'Buttons',
  // },
  // {
  //   path: '/app/modals',
  //   icon: 'ModalsIcon',
  //   name: 'Modals'
  // },
  // {
  //   path: '/app/tables',
  //   icon: 'TablesIcon',
  //   name: 'Tables',
  // },
  // {
  //   icon: "PagesIcon",
  //   name: "Pools",
  //   // submenu

  //   path: `/app/pools`, // the url
  // },
  {
    icon: "PagesIcon",
    name: "Pools",
    routes: [
      // submenu
      {
        path: "/app/user-view",
        name: "User View",
      },
      {
        path: "/app/sponsor-view",
        name: "Sponsor View",
      },
      {
        path: "/app/admin-view",
        name: "Admin View",
      },
    ],
  },
];
// "homepage": "https://securesecrets.github.io/GalacticPoolsTestnetFrontend/",

export default routes;
