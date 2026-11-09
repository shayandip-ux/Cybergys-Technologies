import "./breadcrumb.css";
import { Link } from "react-router-dom";

import breadcrumbBg from "../../assets/new-breadcumarea.png";

export default function Breadcrumb({ title }) {
  return (
    <section
      className="page-breadcrumb"
      aria-labelledby="page-breadcrumb-title"
      style={{
        backgroundImage: `url(${breadcrumbBg})`,
      }}
    >
      {/* DARK OVERLAY */}
      <div className="page-breadcrumb__overlay"></div>

      <div className="page-breadcrumb__container">
        {/* LEFT CONTENT */}
        <div className="page-breadcrumb__content">
          <h1 className="page-breadcrumb__title" id="page-breadcrumb-title">
            {title}
          </h1>

          <nav className="page-breadcrumb__trail" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link to="/">Home</Link>
              </li>

              <li aria-hidden="true">/</li>

              <li aria-current="page">{title}</li>
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}
