function SideBar() {
  return (
    <aside className="row position-fixed container p-0 d-none d-lg-flex">
      <div className="col-auto me-3" style={{ maxWidth: 640, width: '100%' }} />
      <div className="col">
        <div className="row my-4 align-items-center">
          <div className="col-auto">
            <a href={window.User.Name}>
              <img
                src={window.User.Picture}
                alt={window.User.Name}
                width="56px"
                className="rounded-circle"
              />
            </a>
          </div>
          <a className="col d-block" href={window.User.Name}>
            <div className="lh-1">{window.User.Name}</div>
            {/* <div className="fw-500">$FirstName $Surname</div> */}
          </a>
        </div>
        <div className="fw-500 mt-2 mb-3">Suggestions for you</div>
      </div>
    </aside>
  );
}

function PostHeader(props) {
  return (
    <div className="ps-sm card-header p-3 bg-light d-flex align-items-center">
      <a
        className="card-header-img text-decoration-none"
        href={props.author.username}
      >
        <div
          className="ratio ratio-1x1 rounded-circle bg-img-placeholder overflow-hidden"
          style={{ width: 32 }}
        >
          <img
            className="object-fit-cover"
            src={props.author.profileLink}
            alt={'profile picture ' + props.author.username}
          />
        </div>
      </a>
      <div className="card-body p-0 ms-3">
        <a
          href={props.author.username}
          className="card-title m-0 text-decoration-none"
        >
          {props.author.username}
        </a>
      </div>
    </div>
  );
}

function SingleImage(props) {
  return (
    <div className="ratio ratio-1x1 bg-img-placeholder">
      <img
        className="object-fit-cover"
        src={props.image.link}
        alt={props.image.caption ? props.image.caption : props.caption}
      />
    </div>
  );
}

function MultipleImage(props) {
  let carouselButton = props.images.map((value, index) => (
    <button
      key={index}
      className={index === 0 ? 'active' : ''}
      type="button"
      data-bs-target={'#carousel-post-' + props.id}
      data-bs-slide-to={index}
      aria-label={'Slide' + index + 1}
    ></button>
  ));

  let carouselImages = props.images.map((value, index) => (
    <div
      key={index}
      className={index === 0 ? 'carousel-item active' : 'carousel-item'}
    >
      <div className="ratio ratio-1x1 bg-img-placeholder">
        <img
          className="object-fit-cover"
          src={value.link}
          alt={value.caption ? value.caption : props.caption}
        />
      </div>
    </div>
  ));

  return (
    <div
      id={'carousel-post-' + props.id}
      className="carousel slide carousel-post"
      data-bs-interval="false"
    >
      <div className="carousel-indicators">{carouselButton}</div>
      <div className="carousel-inner">{carouselImages}</div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target={'#carousel-post-' + props.id}
        data-bs-slide="prev"
        onClick={props.handlePrev}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target={'#carousel-post-' + props.id}
        data-bs-slide="next"
        onClick={props.handleNext}
      >
        <span
          className="carousel-control-next-icon"
          aria-hidden="true"
          onClick={props.handleNext}
        ></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

function PostImage(props) {
  const handleNext = (event) => {
    // console.log(event.target);
    const postCarousel =
      event.target.parentElement.nodeName === 'BUTTON'
        ? event.target.parentElement.parentElement
        : event.target.parentElement;

    const arrPostCarousel = postCarousel.id.slice('-');
    const carouselCaptionId =
      'carousel-post-caption-' + arrPostCarousel[arrPostCarousel.length - 1];

    const carouselCaption = new bootstrap.Carousel(
      document.getElementById(carouselCaptionId)
    );

    carouselCaption.next();
  };

  const handlePrev = (event) => {
    const postCarousel =
      event.target.parentElement.nodeName === 'BUTTON'
        ? event.target.parentElement.parentElement
        : event.target.parentElement;

    const arrPostCarousel = postCarousel.id.slice('-');
    const carouselCaptionId =
      'carousel-post-caption-' + arrPostCarousel[arrPostCarousel.length - 1];

    const carouselCaption = new bootstrap.Carousel(
      document.getElementById(carouselCaptionId)
    );

    carouselCaption.prev();
  };

  if (props.images.length === 1) {
    return (
      <div>
        <SingleImage
          image={props.images[0]}
          id={props.id}
          caption={props.caption}
        />
        <SingleCaption
          image={props.images[0]}
          caption={props.caption}
          author={props.author}
          id={props.id}
          categories={props.categories}
        />
      </div>
    );
  }

  return (
    <div>
      <MultipleImage
        images={props.images}
        id={props.id}
        caption={props.caption}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
      <MultipleCaption
        images={props.images}
        id={props.id}
        caption={props.caption}
        author={props.author}
        categories={props.categories}
      />
    </div>
  );
}

function SingleCaption(props) {
  const caption =
    props.image.caption == null
      ? props.caption == null
        ? ''
        : props.caption
      : props.image.caption;

  const categories = props.categories.map((val, i) => (
    <a key={i} href={val.link} className="text-primary text-decoration-none">
      {val.title}{' '}
    </a>
  ));

  const handleClick = (event) => {
    event.target.previousElementSibling.remove();
    event.target.remove();
  };

  return (
    <div className="card-body">
      <div className="card-text">{categories}</div>
      <p className="card-text">
        <span className="fw-bold">{props.author.username} </span>
        <span className="collapse" id={'collapse-' + props.id}>
          {caption}
        </span>
        <span className="hide">
          {caption.length > 5 ? caption.substring(0, 5) + '...' : caption}
        </span>
        <a
          className="fw-light text-decoration-none text-black-50 btn-collapse"
          data-bs-toggle="collapse"
          data-bs-target={'#collapse-' + props.id}
          aria-expanded="false"
          aria-controls={'collapse-' + props.id}
          role="button"
          onClick={handleClick}
        >
          more
        </a>
      </p>
    </div>
  );
}

function MultipleCaption(props) {
  const categories = props.categories.map((val, i) => (
    <a key={i} href={val.link} className="text-primary text-decoration-none">
      {val.title}{' '}
    </a>
  ));

  const handleClick = (event) => {
    event.target.previousElementSibling.remove();
    event.target.remove();
  };

  const listCaption = (caption, i) => {
    return (
      <div
        key={i}
        className={i == 0 ? 'carousel-item active' : 'carousel-item'}
      >
        <p className="card-text">
          <span className="fw-bold">{props.author.username} </span>
          <span className="collapse" id={'collapse-' + props.id + '-' + i}>
            {caption}
          </span>
          <span className="hide">
            {caption.length > 5 ? caption.substring(0, 5) + '...' : caption}
          </span>
          <a
            className="fw-light text-decoration-none text-black-50 btn-collapse"
            data-bs-toggle="collapse"
            data-bs-target={'#collapse-' + props.id + '-' + i}
            aria-expanded="false"
            aria-controls={'collapse-' + props.id + '-' + i}
            role="button"
            onClick={handleClick}
          >
            more
          </a>
        </p>
      </div>
    );
  };

  const captions = props.images.map((val, i) => {
    const caption =
      val.caption == null
        ? props.caption == null
          ? ''
          : props.caption
        : val.caption;
    return listCaption(caption, i);
  });

  return (
    <div className="card-body">
      <div className="card-text">{categories}</div>

      <div
        id={'carousel-post-caption-' + props.id}
        className="carousel slide carousel-post-caption"
        data-bs-interval="false"
        data-bs-touch="false"
      >
        <div className="carousel-inner">{captions}</div>
      </div>
    </div>
  );
}

function Post(props) {
  const post = props.post;

  return (
    <div className="row mt-4 justify-content-center">
      <div
        className="col-auto"
        style={{ zIndex: 0, maxWidth: 640, width: 640 }}
      >
        <div className="mb-4 shadow-sm bg-white border">
          <PostHeader author={post.author} />
          <PostImage
            id={props.id}
            author={post.author}
            images={post.images}
            caption={post.caption}
            categories={post.categories}
          />
        </div>
      </div>
      <div className="col d-none d-lg-inline"></div>
    </div>
  );
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isLoad: true,
    };
  }

  componentDidMount() {
    fetch(document.baseURI + 'post', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          posts: data.reverse(),
        });
      });
  }

  render() {
    const posts = this.state.posts.slice();
    // console.log(posts);

    const listPosts = posts.map((value, i) => (
      <Post key={i} post={value} id={i} isLoad={this.state.isLoad} />
    ));

    return (
      <div>
        <Navbar active={'home'} />
        <div className="container">
          <SideBar />
          {listPosts}
        </div>

        <Modal />
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById('root'));
