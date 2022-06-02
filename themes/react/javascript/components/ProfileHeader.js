function ProfileHeader(props) {
  const [isfollowing, setFollowing] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      // fetch apakah user ini follow
      try {
        const response = await fetch(
          document.baseURI +
            'api/users/' +
            props.userActive +
            '/following/' +
            props.user.username
        );

        const data = await response.json();

        setFollowing(data.following);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [props.action]);

  console.log(props.user);

  const renderButton = () => {
    // cek kondisi untuk merubah button
    // cek apakah user yang active sama dengan user yang dikunjungi
    if (props.userActive === props.user.username) return <BtnEditProfile />;

    // cek apakah user active follow user visit
    return isfollowing ? (
      <BtnUnfollow
        userActive={props.userActive}
        userVisit={props.user.username}
        setAction={props.setAction}
      />
    ) : (
      <BtnFollow
        userActive={props.userActive}
        userVisit={props.user.username}
        setAction={props.setAction}
      />
    );
  };

  return (
    <div className="row my-4 mx-0">
      <div className="col-auto col-md-4 text-center">
        <img
          src={props.user.avatar_url}
          alt={props.user.username + 'profile picture'}
          className="rounded-circle object-fit-cover profile-picture"
        />
      </div>
      <div className="col">
        <div className="row mb-3 align-items-center">
          <h2 className="d-inline-block col-auto mb-0 me-3">
            {props.user.username}
            {props.user.isBusinessAccount ? (
              <span className="position-relative" style={{ left: 5 }}>
                <i
                  className="bi bi-patch-check position-absolute text-primary"
                  style={{ fontSize: 15 }}
                ></i>
              </span>
            ) : (
              ''
            )}
          </h2>
          {renderButton()}
        </div>
        <div className="row mx-0 mb-3">
          <div className="col px-0 text-start">{props.user.posts} Posts</div>
          <div className="col px-0 text-start">
            {props.user.followers} Followers
          </div>
          <div className="col px-0 text-start">
            {props.user.following} Following
          </div>
        </div>
        <div className="bio">{props.user.bio}</div>
      </div>
    </div>
  );
}
