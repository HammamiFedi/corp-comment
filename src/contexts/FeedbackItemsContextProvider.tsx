import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import { FeedbackItemType, FeedbackItemsContextType } from "../lib/definition";
import {
  API_BASE_ENDPOINT,
  EMPTY_STRING,
  SINGLE_SPACE,
} from "../lib/constants";

export const FeedbackItemsContext =
  createContext<FeedbackItemsContextType | null>(null);

function FeedbackItemsContextProvider({ children }: { children: ReactNode }) {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(EMPTY_STRING);
  const [selectedHashtag, setSelectedHashtag] = useState(EMPTY_STRING);

  // Filter the feedbackItems based on the selectedHashtag
  const filteredFeedbackItems = useMemo(
    () =>
      selectedHashtag
        ? feedbackItems.filter(
            (feedbackItem) =>
              feedbackItem.company.toLowerCase() ===
              selectedHashtag.toLocaleLowerCase()
          )
        : feedbackItems,
    [feedbackItems, selectedHashtag]
  );
  // EXtract the hashtags List from the feedbackItems
  const hashtags = useMemo(
    () =>
      feedbackItems
        .map((feedbackItem) => feedbackItem.company)
        .filter((company, index, array) => {
          return array.indexOf(company) === index;
        }),
    [feedbackItems]
  );

  // Function to handle the selection of a hashtag
  const handleSelectHashtag = (hashtag: string) => {
    setSelectedHashtag(hashtag);
  };
  // Function to handle the addition of a new feedback item
  const handleAddNewItem = async (text: string) => {
    // GET the company name from the text
    const companyName = text
      .split(SINGLE_SPACE)
      .find((word) => word.startsWith("#"))!
      .substring(1);

    const capitalizedCompanyName =
      companyName.charAt(0).toUpperCase() + companyName.slice(1);

    const newFeedbackItem: FeedbackItemType = {
      id: new Date().getTime(),
      text,
      upvoteCount: 0,
      daysAgo: 0,
      company: capitalizedCompanyName,
      badgeLetter: capitalizedCompanyName[0],
    };

    // Set the state of feedbackItems
    setFeedbackItems((prev) => [newFeedbackItem, ...prev]);

    // POST the new feedback to the API
    await fetch(API_BASE_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(newFeedbackItem),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

  useEffect(() => {
    const fetchFeedbacks = async () => {
      // Set the state of isLoading to true
      setIsLoading(true);

      try {
        const response = await fetch(API_BASE_ENDPOINT);

        // Check if the response is Not successful
        if (!response.ok) {
          // Throw an error
          throw new Error("An error occurred while fetching the feedbacks");
        }

        const data = await response.json();
        // Set the feedbackItems state to the feedbacks from the API
        setFeedbackItems(data.feedbacks);
      } catch (error) {
        // Network error, Not 2xx response or JSON parsing error
        setErrorMessage("An error occurred while fetching the feedbacks");
      }

      // Change the state of isLoading to false
      setIsLoading(false);
    };

    fetchFeedbacks();
  }, []);

  return (
    <FeedbackItemsContext.Provider
      value={{
        isLoading,
        errorMessage,
        hashtags,
        filteredFeedbackItems,
        selectedHashtag,
        handleSelectHashtag,
        handleAddNewItem,
      }}
    >
      {children}
    </FeedbackItemsContext.Provider>
  );
}

export default FeedbackItemsContextProvider;
