import type { Route } from "../+types/root";
import DesktopView from "./DesktopView";
import MobileView from "./MobileView";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      <MobileView className="hidden max-md:block" />
      <DesktopView className="hidden md:block" />
    </>
  );
}
