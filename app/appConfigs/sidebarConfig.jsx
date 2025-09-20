// sidebarConfigGraders.js

export const sidebarConfig = [
  // Dashboard
  { 
    type: "link", 
    label: "Record collection", 
    icon: "fa fa-plus-circle", 
    href: (routes) => `${routes.cms}/milkcollections/profile`, 
    roles: [] 
  },

  // Collections
  {
    type: "submenu",
    label: "Milk Collections",
    icon: "fa fa-tint",
    roles: [],
    items: [
      { label: "Record Collection", href: (routes) => `${routes.cms}/milkcollections/profile`, roles: [] },
      { label: "My Collections", href: (routes) => `${routes.cms}/milkcollections/list`, roles: [] },
    ],
  },

  // Grading
  {
    type: "submenu",
    label: "Notifications",
    icon: "fa fa-envelope",
    roles: [],
    items: [
      { label: "Notification History", href: (routes) => `${routes.cms}/smsbox/list`, roles: [] },
    ],
  },

  // Farmers
  {
    type: "submenu",
    label: "Farmers",
    icon: "fa fa-users",
    roles: [],
    items: [
      { label: "Farmers list", href: (routes) => `${routes.cms}/farmers/list`, roles: [] },
    ],
  },
  // Reports
  {
    type: "submenu",
    label: "Reports",
    icon: "fa fa-copy",
    roles: [],
    items: [
      { label: "My Collections Report", href: (routes) => `${routes.cms}/farmercollections/list`, roles: [] },
    ],
  },

  // Account
  { 
    type: "link", 
    label: "My Account", 
    icon: "fa fa-user-circle", 
    href: (routes) => `#`, 
    roles: [] 
  },
];
