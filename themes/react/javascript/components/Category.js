function CategoryItem(props) {
  return (
    <a
      className="me-2 text-primary"
      href={document.baseURI + 'explore/tags/' + props.category}
    >
      #{props.category}
    </a>
  );
}

function CategoryTags(props) {
  const categoriesList = props.categories.map((category, index) => {
    if (category.length === 0) return '';

    return <CategoryItem key={index} category={category.substring(1)} />;
  });

  return <div className="card-text m-0 p-0">{categoriesList}</div>;
}
