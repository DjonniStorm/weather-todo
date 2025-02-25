type RoutesType = {
  routes: Readonly<Route[]>;
};

type Route = {
  name: string;
  href: string;
  text: string;
  target?: "_blank";
};
