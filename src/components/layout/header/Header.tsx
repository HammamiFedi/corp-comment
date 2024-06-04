import { useFeedbackItemsContext } from "../../../lib/hooks";
import { FeedbackForm, Pattern, PageHeading, Logo } from "../../index";

function Header() {
  const { handleAddNewItem } = useFeedbackItemsContext();
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm handleAddNewItem={handleAddNewItem} />
    </header>
  );
}

export default Header;
