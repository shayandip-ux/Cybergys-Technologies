import "./breadcrumb.css";

export default function Breadcrumb({ title }) {
  return (
    <section className="page-breadcrumb" aria-labelledby="page-breadcrumb-title">
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
    </section>
  );
}
