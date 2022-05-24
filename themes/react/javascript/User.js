function HasFollow(props) {
  return (
    <div className="row col-auto">
      <div className="col-auto">
        <a
          className="btn px-4 py-1 unfollow border border-secondary col-auto"
          onClick={props.handleUnfollow}
        >
          <i
            className="bi bi-person-check-fill mx-2 text-muted"
            style={{ minWidth: 100 }}
          ></i>
        </a>
      </div>
      <div className="col-auto fs-4">
        <a role="button" data-bs-toggle="modal" data-bs-target="#modalOption">
          <i className="bi bi-three-dots"></i>
        </a>
      </div>
    </div>
  );
}

function NotFollow(props) {
  return (
    <div className="row col-auto">
      <div className="col-auto">
        <a
          onClick={props.handleFollow}
          className="btn follow btn-outline-red px-4 py-1 col-auto"
          data-url="user/follow"
          style={{ minWidth: 100 }}
        >
          {' '}
          Follow
        </a>
      </div>
      <div className="col-auto fs-4">
        <a role="button" data-bs-toggle="modal" data-bs-target="#modalOption">
          <i className="bi bi-three-dots"></i>
        </a>
      </div>
    </div>
  );
}

function IsBlocked(props) {
  return (
    <a
      onClick={props.handleUnblock}
      className="btn follow btn-outline-red px-4 py-1 col-auto"
      data-url="user/follow"
      style={{ minWidth: 100 }}
    >
      {' '}
      Unblock
    </a>
  );
}

function IsActive() {
  return (
    <div className="row col-auto">
      <div className="col-auto">
        <a href="accounts/edit" className="btn btn-outline-red py-1 px-2">
          Edit Profile
        </a>
      </div>
      <div className="col-auto fs-4">
        <a href="accounts/edit">
          <i className="bi bi-gear" role="button"></i>
        </a>
      </div>
    </div>
  );
}

function Picture(props) {
  return (
    <div className="col-auto col-md-4 px-2 text-center">
      <img
        src={props.user.picture}
        alt={props.user.username + ' profile picture'}
        className="rounded-circle user-profile object-fit-cover"
      />
    </div>
  );
}

function Profile(props) {
  const load = props.load == true ? 'placeholder-glow' : '';
  const loadItems = props.load == true ? 'placeholder' : '';
  let button;

  if (props.isBlocked) {
    button = <IsBlocked handleUnblock={props.handleUnblock} />;
  } else if (window.User.Name === props.user.username) {
    button = <IsActive />;
  } else if (props.hasFollow) {
    button = (
      <HasFollow handleUnfollow={props.handleUnfollow} user={props.user} />
    );
  } else {
    button = <NotFollow handleFollow={props.handleFollow} />;
  }

  const isBusinessAccount =
    window.UserController.isBusinessAccount === '1' ? true : false;

  let verified = '';
  if (isBusinessAccount)
    verified = (
      <i className="bi bi-patch-check-fill text-primary fs-5 float-end ps-2"></i>
    );

  return (
    <div className="col col-md-8">
      <div className="row mb-3 align-items-center">
        <div className="col-12 col-sm-auto fs-3">
          {props.user.username}
          {verified}
        </div>
        {/* Button */}
        {button}
      </div>
      {/*Follower*/}
      <div
        className={
          'row mb-3 justify-content-between justify-content-sm-start ' + load
        }
      >
        <div
          className={
            'col-auto me-sm-4 text-center text-lg-start ps-3 px-0 px-sm-3 ' +
            loadItems
          }
        >
          <div className="fw-bold d-sm-inline">{props.totalPosts} </div>
          <span className="fw-light">Posts</span>
        </div>
        <div
          className={
            'col-auto me-sm-4 text-center text-lg-start px-0 px-sm-3 ' +
            loadItems
          }
        >
          <div className="fw-bold d-sm-inline" id="followers">
            {props.user.followers}{' '}
          </div>
          <span className="fw-light">Followers</span>
        </div>
        <div
          className={
            'col-auto text-center text-lg-start px-0 pe-3 px-sm-3 ' + loadItems
          }
        >
          <div className="fw-bold d-sm-inline">{props.user.following} </div>
          <span className="fw-light">Following</span>
        </div>
      </div>
      {/* <%-- Bio --%> */}
      <div className="">
        <div className="fw-bold">{props.user.username}</div>
        {/* <div className="d-none d-sm-block  fw-bold">$User.FirstName $User.Surname</div> */}
        <div className="">{props.user.bio}</div>
      </div>
    </div>
  );
}

function TabItem(props) {
  const iconClass = props.iconClass + ' pe-2';

  return (
    <div
      className="col-auto px-0 text-center pt-3"
      style={{ marginTop: '-1px' }}
      role="button"
      onClick={props.handleClick}
      data-content={props.title.toLowerCase()}
    >
      <i className={iconClass}></i>
      <span>{props.title}</span>
    </div>
  );
}

function TabList(props) {
  const item = (
    <div
      className="text-center border-top row justify-content-center gap-5"
      id="tab-list"
    >
      <TabItem
        iconClass="bi bi-grid-3x3"
        title="Posts"
        handleClick={props.handleContent}
      ></TabItem>
      <TabItem
        iconClass="bi bi-bar-chart"
        title="Insights"
        handleClick={props.handleContent}
      ></TabItem>
      <TabItem
        iconClass="bi bi-megaphone"
        title="Ads"
        handleClick={props.handleContent}
      ></TabItem>
    </div>
  );

  const postOnly = (
    <div
      className="text-center border-top row justify-content-center gap-5 active"
      id="tab-list"
    >
      <TabItem
        iconClass="bi bi-grid-3x3"
        title="Posts"
        handleClick={props.handleContent}
      ></TabItem>
    </div>
  );

  const isBusinessAccount =
    window.UserController.isBusinessAccount === '1' ? true : false;

  return isBusinessAccount ? item : postOnly;
}

class UserPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      posts: [],
      load: true,
      hasFollow: window.hasFollow == 'true' ? true : false,
      isBlocked: window.isBlocked == 'true' ? true : false,
      postId: 0,
      content: 'posts',
    };

    this.handleFollow = this.handleFollow.bind(this);
    this.handleUnfollow = this.handleUnfollow.bind(this);
    this.handleBlock = this.handleBlock.bind(this);
    this.handleUnblock = this.handleUnblock.bind(this);
    this.block = this.block.bind(this);
    this.unblock = this.unblock.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.handleContent = this.handleContent.bind(this);
  }

  handleContent(event) {
    event.preventDefault;
    const element = event.currentTarget;

    // hapus semua class
    for (const child of element.parentElement.children) {
      child.classList.remove('active');
    }

    // beri class active
    element.classList.add('active');

    this.setState({
      content: element.dataset.content,
    });
  }

  renderContent() {
    const content = this.state.content;

    if (content === 'posts') {
      // cari element post beri class
      return (
        <Post
          posts={this.state.posts}
          isLoad={this.state.load}
          user={this.state.user}
        />
      );
    } else if (content === 'insights') {
      return <Insights></Insights>;
    } else if (content === 'ads') {
      return <Ads></Ads>;
    }
  }

  handleFollow(event) {
    event.preventDefault();
    const react = this;

    $(event.target).html(
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'
    );

    $.ajax({
      type: 'post',
      url: document.baseURI + 'user/follow',
      data: {
        userID: window.User.ID,
        followedID: this.state.user.id,
      },
      dataType: 'json',
      success: function (response) {
        $(event.target).html('Follow');

        if (response.status === 200) {
          // update followers
          const user = react.state.user;
          const hasFollow = react.state.hasFollow;
          user.followers++;
          react.setState({
            user: user,
            hasFollow: !hasFollow,
          });
        }
      },
    });
  }

  handleUnfollow(event) {
    event.preventDefault();
    const react = this;

    $(event.target).html(
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'
    );

    $.ajax({
      method: 'post',
      url: document.baseURI + 'user/unfollow',
      data: {
        userID: window.User.ID,
        followedID: this.state.user.id,
      },
      success: function (response) {
        $(event.target).html(
          '<i className="bi bi-person-check-fill mx-2 text-muted" style={{ minWidth: 100 }}></i>'
        );

        if (response.status == 200) {
          // update followers
          const user = react.state.user;
          const hasFollow = react.state.hasFollow;
          user.followers--;
          react.setState({
            user: user,
            hasFollow: !hasFollow,
          });
        }
      },
    });
  }

  handleBlock(event) {
    event.preventDefault();
    Swal.fire({
      title: 'Block ' + this.state.user.username + '?',
      text: "They won't be able to find your profile, posts or story on Instagram. Instagram won't let them know that you've blocked them.",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Block',
    }).then((result) => {
      if (result.isConfirmed) {
        this.block();
      }

      if (result.isDismissed) {
        $('div#modalOption, button#btn-close').trigger('click');
      }
    });
  }

  handleUnblock(event) {
    event.preventDefault();
    Swal.fire({
      title: 'Unblock ' + this.state.user.username + '?',
      text: "They will now be able to see your posts and follow you on Instagram. Instagram won't let them known that you've unblocked them.",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Unblock',
    }).then((result) => {
      if (result.isConfirmed) {
        this.unblock();
      }

      if (result.isDismissed) {
        $('div#modalOption, button#btn-close').trigger('click');
      }
    });
  }

  unblock() {
    const react = this;
    $.ajax({
      url: document.baseURI + 'user/unblock',
      method: 'post',
      data: {
        userID: this.state.user.id, // yang diblokir
        blockedID: window.User.ID, // yang memblokir
      },
      success: function (response) {
        if (response.status === 200) {
          Swal.fire({
            title: '<b>Unblocked ' + react.state.user.username + '</b>',
            text: 'You can block them at any time from their profile.',
            confirmButtonText: 'Dismiss',
          }).then((result) => {
            react.setState({
              isBlocked: false,
            });
          });
        }

        $('div#modalOption, button#btn-close').trigger('click');
      },
    });
  }

  block() {
    const react = this;
    $.ajax({
      url: document.baseURI + 'user/block',
      method: 'post',
      data: {
        userID: this.state.user.id, // yang diblokir
        blockedID: window.User.ID, // yang memblokir
      },
      success: function (response) {
        if (response.status === 200) {
          Swal.fire({
            title: '<b>Blocked ' + react.state.user.username + '</b>',
            text: 'You can unblock them at any time from their profile.',
            confirmButtonText: 'Dismiss',
          }).then((result) => {
            react.setState({
              isBlocked: true,
              hasFollow: false,
              posts: [],
            });
          });
        }

        $('div#modalOption, button#btn-close').trigger('click');
      },
    });
  }

  async fetchData() {
    await fetch(
      document.baseURI + 'post/byUsername/' + window.UserController.Name,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let user = data.author;
        if (this.state.isBlocked) {
          user.followers = 0;
          user.following = 0;
        }
        const posts = this.state.isBlocked ? [] : data.posts;
        this.setState({
          user: user,
          posts: posts,
          load: false,
        });
      });
  }

  async componentDidMount() {
    await this.fetchData();

    // tambahkan class active pada posts
    const tabList = document.getElementById('tab-list').children;
    for (const tab of tabList) {
      if (tab.dataset.content == this.state.content)
        tab.classList.add('active');
    }
  }

  render() {
    if (this.state.load) {
      return '';
    }

    const content = this.renderContent();

    return (
      <div>
        <Navbar active={'user'} />
        <div className="container">
          <div className="row mt-4 mb-5">
            <Picture load={this.state.load} user={this.state.user} />
            <Profile
              load={this.state.load}
              totalPosts={this.state.posts.length}
              user={this.state.user}
              hasFollow={this.state.hasFollow}
              handleFollow={this.handleFollow}
              handleUnfollow={this.handleUnfollow}
              isBlocked={this.state.isBlocked}
              handleUnblock={this.handleUnblock}
            />
          </div>
          <TabList handleContent={this.handleContent}></TabList>
          {/* content */}
          {content}
        </div>
        <Modal />
        <ModalOption handleBlock={this.handleBlock} />
      </div>
    );
  }
}

function ModalOption(props) {
  return (
    <div
      className="modal fade"
      id="modalOption"
      tabIndex="-1"
      aria-labelledby="modalOptionLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-sm">
        <div className="modal-content border-rounded overflow-hidden">
          <div className="modal-body p-0">
            <ul className="list-group text-center">
              <li
                className="list-group-item text-danger"
                role="button"
                onClick={props.handleBlock}
              >
                Block
              </li>
              <li
                id="btn-close"
                className="list-group-item border-top"
                role="button"
                data-bs-dismiss="modal"
              >
                Cancel
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<UserPage />, document.getElementById('root'));
