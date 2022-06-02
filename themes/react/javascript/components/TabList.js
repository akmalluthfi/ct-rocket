function TabList(props) {
  const item = (
    <TabItem
      iconClass="bi bi-grid-3x3"
      title="Posts"
      setContent={props.setContent}
      content={props.content}
    ></TabItem>
  );

  if (!props.isActive)
    return (
      <div
        className="text-center border-top row justify-content-center gap-5"
        id="tab-list"
      >
        {item}
      </div>
    );

  if (!props.isBA)
    return (
      <div
        className="text-center border-top row justify-content-center gap-5"
        id="tab-list"
      >
        {item}
      </div>
    );

  return (
    <div
      className="text-center border-top row justify-content-center gap-5"
      id="tab-list"
    >
      {item}
      <TabItem
        iconClass="bi bi-bar-chart"
        title="Insights"
        setContent={props.setContent}
        content={props.content}
      ></TabItem>
      <TabItem
        iconClass="bi bi-megaphone"
        title="Ads"
        setContent={props.setContent}
        content={props.content}
      ></TabItem>
    </div>
  );
}
