import { useFeedbackItemsContext } from "../../../lib/hooks";
import HashtagItem from "../hashtagItem/HashtagItem";

function HashtagList() {
  const { hashtags, handleSelectHashtag } = useFeedbackItemsContext();
  return (
    <ul className="hashtags">
      {hashtags.map((hashtag, index) => (
        <HashtagItem
          key={index}
          hashtag={hashtag}
          onClick={handleSelectHashtag}
        />
      ))}
    </ul>
  );
}

export default HashtagList;
