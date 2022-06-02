function BtnFollow(props) {
  const follow = async () => {
    // buat api untuk follow user
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(
      document.baseURI +
        `api/users/${props.userActive}/following/${props.userVisit}`,
      options
    );

    const data = await response.json();

    if (data.success) {
      props.setAction('follow');
    }
  };

  return (
    <button
      type="button"
      className="col-auto btn-sm btn btn-primary"
      onClick={follow}
    >
      Follow
    </button>
  );
}
