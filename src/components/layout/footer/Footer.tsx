import { LINKED_IN_PROFILE_URL } from "../../../lib/constants";

function Footer() {
  return (
    <footer className="footer">
      <small>
        <p>
          &copy; Copyright By
          <a href={LINKED_IN_PROFILE_URL} target="_blank">
            <span className="u-bold"> Hammami Fedi</span>
          </a>
          . Developed For FUN
        </p>
        <p>
          <span className="u-bold u-italic">Allowed</span> to use as your own
          teaching material.
        </p>
      </small>
    </footer>
  );
}

export default Footer;
