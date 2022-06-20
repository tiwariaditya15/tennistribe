import { Post } from "../services/posts";
import { utcToZonedTime, format } from "date-fns-tz";
import { isAfter } from "date-fns";

export const sortByTopPosts = (posts: Post[]): Post[] => {
  const sorted = [...posts];
  return sorted.sort((one, two) => {
    if (one.likedBy.length > two.likedBy.length) {
      return -1;
    }
    if (one.likedBy.length < two.likedBy.length) {
      return 1;
    }
    return 0;
  });
};

export const sortByLatestPosts = (posts: Post[]): Post[] => {
  const sorted = [...posts];
  return sorted.sort((one, two) => {
    const oneTime = format(
      utcToZonedTime(
        one.timestamp,
        Intl.DateTimeFormat().resolvedOptions().timeZone
      ),
      "yyyy MM dd"
    );
    const twoTime = format(
      utcToZonedTime(
        two.timestamp,
        Intl.DateTimeFormat().resolvedOptions().timeZone
      ),
      "yyyy MM dd"
    );
    if (isAfter(new Date(oneTime), new Date(twoTime))) {
      return -1;
    }
    if (!isAfter(new Date(oneTime), new Date(twoTime))) {
      return 1;
    }
    return 0;
  });
};
