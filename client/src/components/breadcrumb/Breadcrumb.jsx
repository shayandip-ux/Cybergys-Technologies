import "./breadcrumb.css";

import breadcrumbBg from "../../assets/breadcum-background-svg.svg";
import breadcrumbImage from "../../assets/modern_teamwork_business_infographic.png";

export default function Breadcrumb({ title }) {
  return (
    <section className="page-breadcrumb" aria-labelledby="page-breadcrumb-title" style={{ backgroundImage: `url(${breadcrumbBg})` }}>
      <div className="page-breadcrumb__container">
        {/* LEFT CONTENT */}
        <div className="page-breadcrumb__content">
          <h1 className="page-breadcrumb__title" id="page-breadcrumb-title">
            {title}
          </h1>

          <nav className="page-breadcrumb__trail" aria-label="Breadcrumb">
            <ol>
              <li>
                <a href="/">Home</a>
              </li>

              <li aria-hidden="true">/</li>

              <li aria-current="page">{title}</li>
            </ol>
          </nav>
        </div>

        {/* RIGHT IMAGE */}
        <div className="page-breadcrumb__image">
          <img src={breadcrumbImage} alt="Business teamwork and development infographic" />
        </div>
      </div>
    </section>
  );
}
