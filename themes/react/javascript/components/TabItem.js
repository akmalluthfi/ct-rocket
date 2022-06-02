function TabItem(props) {
  const iconClass = props.iconClass + ' pe-2';

  const active = props.title === props.content ? 'active' : '';

  return (
    <div
      className={'col-auto px-0 text-center pt-3 ' + active}
      style={{ marginTop: '-1px' }}
      role="button"
      onClick={() => props.setContent(props.title)}
      data-content={props.title.toLowerCase()}
    >
      <i className={iconClass}></i>
      <span>{props.title}</span>
    </div>
  );
}
