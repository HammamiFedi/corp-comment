import { HashtagItemProps } from "./HashtagItem.type";

function HashtagItem({ hashtag, onClick }: HashtagItemProps) {
  return (
    <li>
      <button onClick={() => onClick(hashtag)}>#{hashtag}</button>
    </li>
  );
}

export default HashtagItem;
