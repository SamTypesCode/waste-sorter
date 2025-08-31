import DesktopView from "./DesktopView";
import MobileView from "./MobileView";

export default function Home() {
  return (
    <>
      <MobileView className="hidden max-md:block" />
      <DesktopView className="hidden md:block" />
    </>
  );
}
