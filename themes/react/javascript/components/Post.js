function Post() {
  return (
    <div
      className="col-4 p-1 p-md-3 btn-detailsModal"
      role="button"
      data-bs-toggle="modal"
      data-bs-target="#detailsModal"
    >
      <div className="ratio ratio-1x1">
        <div className="overflow-hidden bg-img shadow border-rounded">
          <div
            className="bg-post w-100 h-100 bg-center"
            style={{
              backgroundImage: 'url(https://source.unsplash.com/random)',
            }}
          >
            <div className="d-flex justify-content-center align-items-center h-100">
              <button
                type="button"
                className="btn btn-outline-grey btn-sm font-12"
              >
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
