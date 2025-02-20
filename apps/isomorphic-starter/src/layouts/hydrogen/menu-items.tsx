import { routes } from "@/config/routes";
import { DUMMY_ID } from "@/config/constants";
import {
  PiCurrencyDollarDuotone,
  PiFolder,
  PiPlusCircle,
  PiUserPlus,
  PiUserCircle,
  PiChat,
  PiGear,
  PiQuestion,
  PiAppWindow,
  PiDoorOpen
} from "react-icons/pi";

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  // label start
  {
    name: "Overview",
  },
  // label end
  {
    name: "Dashboard",
    href: routes.Overview.dashboard,
    icon: <PiFolder />,
    badge: "",
  },
  // label start
  {
    name: "Invoices",
  },
  {
    name: "Invoice List",
    href: routes.Invoices.dashboard,
    icon: <PiCurrencyDollarDuotone />
  },

  {
    name: "Create Invoice",
    href: routes.Invoices.create,
    icon: <PiPlusCircle />,
  },
  // label start
  {
    name: "Customers",
  },
  {
    name: "Customer List",
    href: routes.Customers.dashboard,
    icon: <PiUserCircle />
    // dropdownItems: [
    //   {
    //     name: "List",
    //     href: routes.Customers.dashboard,
    //   },
    //   {
    //     name: "Add",
    //     href: routes.Customers.add,
    //   },
    //   {
    //     name: "Remove",
    //     href: routes.invoice.edit(DUMMY_ID),
    //   },
    // ],
  },
  {
    name: "Add Customer",
    href: routes.Customers.add,
    icon: <PiUserPlus />,
  },
  {
    name: "Inbox",
    href: routes.Customers.inbox,
    icon: <PiChat />,
  },
  // label start
  {
    name: "Settings",
  },
  // label end
  {
    name: "Support And Help",
    href: routes.Settings.support,
    icon: <PiQuestion />,
  },

  {
    name: "Settings",
    href: routes.Settings.data,
    icon: <PiGear />,
    dropdownItems: [
      {
        name: "General",
        href: routes.Settings.general,
      },
      {
        name: "Data Controller",
        href: routes.Settings.data,
      },
      {
        name: "Account Center",
        href: routes.Settings.account,
      },
    ],
  },

  {
    name: "Developed by AE",
    href: routes.Settings.account,
    icon: <PiAppWindow />,
  },
  // {
  //   name: "Developed by AE",
  //   href: routes.Settings.account,
  //   icon: <PiAppWindow />,
  // },
   // label start
  {
    name: "Session",
  },
  {
    name: "Log Out",
    href: "#",
    icon: <PiDoorOpen />,
  },
];
