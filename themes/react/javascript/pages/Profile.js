function Profile() {
  const active = window.user.active === 'true' ? true : false;

  const [content, setContent] = React.useState('Posts');
  const [user, setUser] = React.useState(false);
  const [action, setAction] = React.useState('');

  React.useEffect(() => {
    //  get user
    const getUser = async () => {
      try {
        const response = await fetch(
          document.baseURI + 'api/users/' + window.user.name
        );

        if (!response.ok) throw new Error(response.statusText);

        const data = await response.json();

        if (!data.success) throw new Error(data.message);

        setUser(data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [action]);

  let tabContent = setTabContent(content);

  return (
    <div>
      <Navbar active={active ? 'user' : 'nonactive'} />
      <div className="container">
        {user === false ? (
          ''
        ) : (
          <ProfileHeader
            user={user}
            action={action}
            setAction={setAction}
            userActive={window.User.Name}
          />
        )}
        <TabList
          content={content}
          setContent={setContent}
          isBA={
            user.isBusinessAccount === undefined
              ? false
              : user.isBusinessAccount
          }
          isActive={window.user.name === window.User.Name}
        />
        {tabContent}
      </div>
      <Footer />
    </div>
  );
}

const setTabContent = (content) => {
  if (content == 'Posts') {
    return <Posts />;
  } else if (content == 'Insights') {
    return <Insights />;
  } else if (content == 'Ads') {
    return <Ads />;
  }
};

ReactDOM.render(<Profile />, document.getElementById('root'));
