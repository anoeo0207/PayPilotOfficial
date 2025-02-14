import { Badge, ActionIcon } from "rizzui";
import MessagesDropdown from "@/layouts/messages-dropdown";
import ProfileMenu from "@/layouts/profile-menu";
import RingBellSolidIcon from "isomorphic-core/src/components/icons/ring-bell-solid";
import ChatSolidIcon from "isomorphic-core/src/components/icons/chat-solid";
import NotificationDropdown from "./notification-dropdown";

export default function HeaderMenuRight() {
  return (
    <div className="ms-auto grid shrink-0 grid-cols-3 items-center gap-2 text-gray-700 xs:gap-3 xl:gap-4">
      <NotificationDropdown>
        <ActionIcon
          aria-label="Notification"
          variant="text"
          className="relative h-[34px] w-[34px] shadow backdrop-blur-md md:h-9 md:w-9 dark:bg-gray-100"
        >
          <RingBellSolidIcon className="h-[18px] w-auto" />
          <Badge
            renderAsDot
            color="warning"
            enableOutlineRing
            className="absolute right-2.5 top-2.5 -translate-y-1/3 translate-x-1/2"
          />
        </ActionIcon>
      </NotificationDropdown>
      <ProfileMenu />
    </div>
  );
}
