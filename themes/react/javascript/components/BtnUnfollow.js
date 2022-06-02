function BtnUnfollow(props) {
  const unfollow = async () => {
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(
      document.baseURI +
        `api/users/${props.userActive}/following/${props.userVisit}`,
      options
    );

    const result = await response.json();

    if (result.success) {
      props.setAction('unfollow');
    }
  };

  return (
    <button
      type="button"
      className="col-auto btn-sm btn btn-outline-secondary"
      onClick={unfollow}
    >
      Unfollow
    </button>
  );
}
