import React from "react";
import styles from "./NotFound.module.scss";
import { Link} from "react-router-dom";

export default function NotFound() {

  return (
    <>
      <main className="container">
        <title>404 HTML Template by Colorlib</title>
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:400,700,900"
          rel="stylesheet"
        />
        <div id="notfound" className={styles.notfound}>
          <div className={`${styles.notfound404} ${styles.notfound404Bg}`}>
            <h1>Oops!</h1>
          </div>
          <h2>404 - Page not found</h2>
          <p>
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          <Link to="/home" className="btn log text-white">
            Go To Homepage
          </Link>
        </div>
      </main>
    </>
  );
}
