function noPost() {
  return (
    <div>
      <div
        className="mx-auto border border-3 rounded-circle border-dark d-flex justify-content-center align-items-center mt-5"
        style={{ width: 150, height: 150 }}
      >
        <i className="bi bi-camera" style={{ fontSize: 80 }} />
      </div>
      <div className="text-center fs-1 mb-5">No Posts Yet</div>
    </div>
  );
}

function Posts() {
  const num = [1, 2, 3, 4, 5, 6, 7];
  const postsList = num.map((i) => <Post key={i} />);

  return (
    <div className="row mt-2 mx-0" style={{ width: 100 + '%' }}>
      {postsList}
    </div>
  );
}
