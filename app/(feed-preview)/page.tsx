import { Feed } from "@faceit/components/feed-preview/feed";
import { FeedAppBar } from "./app-bar";
import NotificationBar from "./notification-bar";

export default async function FeedPreviewPage() {
  return (
    <>
      <FeedAppBar />
      <NotificationBar />
      <section className="container">
        <Feed />
      </section>
    </>
  );
}
