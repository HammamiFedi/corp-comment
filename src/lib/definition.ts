export type FeedbackItemType = {
  id: number;
  upvoteCount: number;
  badgeLetter: string;
  company: string;
  text: string;
  daysAgo: number;
};

export type FeedbackItemsContextType = {
  filteredFeedbackItems: FeedbackItemType[];
  isLoading: boolean;
  errorMessage: string;
  hashtags: string[];
  selectedHashtag: string;
  handleSelectHashtag: (hashtag: string) => void;
  handleAddNewItem: (text: string) => void;
};
