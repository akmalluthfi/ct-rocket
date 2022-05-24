function Insights() {
  return (
    <ul className="list-group mt-4 pb-4">
      <li className="list-group-item">
        <select
          className="form-select form-select-sm mb-3 w-25"
          defaultValue="1"
        >
          <option value="1">Today</option>
          <option value="2">Last 7 Days</option>
        </select>
        <div className="text-center">
          <div className="fs-1">Profile Visit</div>
          <div className="fs-3 text-black-50">67 accounts</div>
        </div>
      </li>
      <li className="list-group-item">
        <select
          className="form-select form-select-sm mb-3 w-25"
          defaultValue="1"
        >
          <option value="1">Today</option>
          <option value="2">Last 7 Days</option>
        </select>
        <div className="text-center mb-3">
          <div className="fs-1">Followers</div>
          <div className="text-black-50">12 followers</div>
          <div>
            <span className="text-success me-1">12+</span>
            <span className="text-black-50">in the last 7 days</span>
          </div>
          <div>
            <span className="text-success me-1">12+</span>
            <span className="text-black-50">today</span>
          </div>
        </div>
      </li>
    </ul>
  );
}
