import { useContext } from "react";
import { FeedbackItemsContext } from "../contexts/FeedbackItemsContextProvider";

export const useFeedbackItemsContext = () => {
  const feedbackItemsContext = useContext(FeedbackItemsContext);

  if (!feedbackItemsContext) {
    throw new Error(
      "FeedbackItemsContext must be used within a FeedbackItemsContextProvider"
    );
  }

  return feedbackItemsContext;
};
