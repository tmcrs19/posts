import { Feed } from "@faceit/components/feed-preview/feed";
import { FeedAppBar } from "./app-bar";

export default async function FeedPreviewPage() {
  return (
    <>
      <FeedAppBar />
      <section className="container">
        <Feed />
      </section>
    </>
  );
}
