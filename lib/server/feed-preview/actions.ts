import { getData } from "../getData";
import { IFeedPost } from "./types";

export async function getPost(id: string) {
  return await getData<IFeedPost>(`/posts/${id}`);
}
