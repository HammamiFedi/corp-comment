import { useState, MouseEvent } from "react";
import { TriangleUpIcon } from "@radix-ui/react-icons";
import { FeedBackItemProps } from "./FeedbackItem.type";

function FeedbackItem({ feedbackItem }: FeedBackItemProps) {
  const { upvoteCount, badgeLetter, company, text, daysAgo } = feedbackItem;

  const [open, setOpen] = useState(false);
  const [voteCount, setVoteCount] = useState(upvoteCount);

  const handleUpvote = (event: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    setVoteCount((prev) => ++prev);
    event.currentTarget.disabled = true;
  };

  return (
    <li
      className={`feedback ${open && "feedback--expand"}`}
      onClick={() => setOpen((prev) => !prev)}
    >
      <button onClick={handleUpvote}>
        <TriangleUpIcon />
        <span>{voteCount}</span>
      </button>
      <div>
        <p>{badgeLetter}</p>
      </div>

      <div>
        <p>{company}</p>
        <p>{text}</p>
      </div>

      <p>{daysAgo === 0 ? "New" : `${daysAgo}d`}</p>
    </li>
  );
}

export default FeedbackItem;
