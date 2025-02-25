export const Routes: RoutesType = {
  routes: [
    {
      name: "main",
      href: "/",
      text: "Главная",
    },
    {
      name: "about",
      href: "/about",
      text: "О нас",
      target: "_blank",
    },
    {
      name: "city",
      href: "/city/ulyanovsk",
      text: "Ульяновск",
      target: "_blank",
    },
  ] as const,
} as const;
