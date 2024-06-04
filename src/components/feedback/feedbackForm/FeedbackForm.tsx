import { ChangeEvent, FormEvent, useState } from "react";
import {
  EMPTY_STRING,
  FORM_INPUT_MAX_LENGTH,
  FORM_INPUT_MIN_LENGTH,
} from "../../../lib/constants";
import { FeedbackFormProps } from "./FeedbackForm.type";

function FeedbackForm({ handleAddNewItem }: FeedbackFormProps) {
  const [text, setText] = useState(EMPTY_STRING);
  const [showValidIndicator, setShowValidIndicator] = useState(false);
  const [showInvalidIndicator, setShowInvalidIndicator] = useState(false);

  const charCountLeft = FORM_INPUT_MAX_LENGTH - text.length;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    if (value.length > FORM_INPUT_MAX_LENGTH) {
      return;
    }

    setText(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (text.length > FORM_INPUT_MIN_LENGTH && text.includes("#")) {
      setShowValidIndicator(true);
      setTimeout(() => setShowValidIndicator(false), 2000);
    } else {
      setShowInvalidIndicator(true);
      setTimeout(() => setShowInvalidIndicator(false), 2000);
      return;
    }

    handleAddNewItem(text);
    setText(EMPTY_STRING);
  };

  return (
    <form
      className={`form ${showValidIndicator && "form--valid"} ${
        showInvalidIndicator && "form--invalid"
      }`}
      onSubmit={handleSubmit}
    >
      <textarea
        value={text}
        onChange={handleChange}
        id="feedback-textarea"
        placeholder="placeholder"
        spellCheck={false}
      />
      <label htmlFor="feedback-textarea">
        Enter your Feedback here. Remember to #hashtag the company
      </label>
      <div>
        <p className="u-italic">{charCountLeft}</p>
        <button type="submit">
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}

export default FeedbackForm;
