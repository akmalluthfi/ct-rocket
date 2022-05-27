function Loader() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: 200 }}
    >
      <div
        className="spinner-border text-secondary"
        role="status"
        style={{ width: '3rem', height: '3rem' }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

function PostItem(props) {
  // handle input checkbox
  return (
    <div className="col">
      <div className="card mb-3 rounded-3 shadow">
        <div className="row g-0">
          <div className="col-4">
            <img
              src={props.image}
              className="img-fluid rounded-start h-100 object-fit-cover"
              alt="name"
            />
          </div>
          <div className="col-8">
            <div className="card-body">
              <CategoryTags categories={props.categories} />
              <p className="card-text">{props.caption}</p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  onChange={(e) =>
                    props.handleCheck({
                      id: props.id,
                      value: e.target.checked,
                    })
                  }
                  defaultChecked={props.isAds}
                />
                <label className="form-check-label">add to ads</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Ads() {
  // untuk menyimpan posts
  const [posts, setPosts] = React.useState([]);
  let author = {};

  // untuk menyimpan event click
  const [check, checked] = React.useState({
    id: 0,
    value: false,
  });

  React.useEffect(() => {
    fetch(document.baseURI + 'post/byUsername/' + window.UserController.Name, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          const text = await response.text();
          throw new Error(text);
        }

        return response.json();
      })
      .then((data) => {
        author = data.author;
        setPosts(data.posts);
      });
    console.log('fetch');
  }, []);

  React.useEffect(() => {
    const changeToAds = async () => {
      const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: check.value }),
      };

      const response = await fetch(
        `http://localhost:8080/MagangCrosstechno/rocket/post/${check.id}/ads`,
        options
      );

      const data = await response.json();
    };

    if (check.id === 0) {
      return;
    } else {
      changeToAds();
    }
  }, [check]);

  let postList;

  if (posts.length > 0) {
    postList = posts.map((post) => {
      // console.log(post.Caption); // can be null
      const { Link, Caption } = post.Images[0]; // caption can be null

      return (
        <PostItem
          id={post.Id}
          key={post.Id}
          categories={post.Categories}
          caption={post.Caption === null ? Caption : post.Caption}
          image={Link}
          isAds={post.isAds}
          handleCheck={checked}
        ></PostItem>
      );
    });
  } else {
    postList = <Loader />;
  }

  return <div className="row row-cols-1 g-4 m-0">{postList}</div>;
}
