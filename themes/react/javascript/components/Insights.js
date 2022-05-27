function Insights() {
  // state untuk input
  const [filterVisitors, setFilterVisitors] = React.useState('today');
  const [filterFollowers, setFilterFollowers] = React.useState('today');
  // state untuk data
  const [visitors, setVisitors] = React.useState(0);
  const [followers, setFollowers] = React.useState({
    totalFollowers: 0,
    filteredFollowers: 0,
    filterBy: 'today',
  });
  // state helper
  const [visitorHelper, setVisitorHelper] = React.useState({
    isLoading: true,
    isError: false,
  });
  const [followersHelper, setFollowersHelper] = React.useState({
    isLoading: true,
    isError: false,
  });

  React.useEffect(() => {
    const fetchData = async () => {
      const userId = window.User.ID;
      const url = `http://localhost:8080/MagangCrosstechno/rocket/user/visitors/${userId}?filter=${filterVisitors}`;

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
        });
        // cek error pada koneksi
        if (!response.ok) throw new Error(response.statusText);
        // cek error pada api
        const data = await response.json();
        if (data.status !== 200) throw new Error(data.message);

        // set total results
        setVisitors(data.totalResults);

        // setstate loading
        setVisitorHelper((prev) => {
          return {
            isLoading: false,
            isError: prev.isError,
          };
        });
      } catch (error) {
        // set state error
        setVisitorHelper((prev) => {
          return {
            isLoading: prev.isLoading,
            isError: true,
          };
        });
      }
    };

    fetchData();
  }, [filterVisitors]);

  React.useEffect(() => {
    const fetchData = async () => {
      const userId = window.User.ID;
      const url = `http://localhost:8080/MagangCrosstechno/rocket/user/followers/${userId}?filter=${filterFollowers}`;

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
        });
        // cek error pada koneksi
        if (!response.ok) throw new Error(response.statusText);
        // cek error pada api
        const data = await response.json();
        if (data.status !== 200) throw new Error(data.message);

        // set total results
        setFollowers({
          totalFollowers: data.totalFollowers,
          filteredFollowers: data.filteredFollowers,
          filterBy: data.filterBy,
        });

        // setstate loading
        setFollowersHelper((prev) => {
          return {
            isLoading: false,
            isError: prev.isError,
          };
        });
      } catch (error) {
        // set state error
        setFollowersHelper((prev) => {
          return {
            isLoading: prev.isLoading,
            isError: true,
          };
        });
      }
    };

    fetchData();
  }, [filterFollowers]);

  return (
    <ul className="list-group mt-4 pb-4">
      <VisitorsInsights
        isError={visitorHelper.isError}
        isLoading={visitorHelper.isLoading}
        setValue={setFilterVisitors}
        visitors={visitors}
      />
      <FollowersInsights
        isError={followersHelper.isError}
        isLoading={followersHelper.isLoading}
        setValue={setFilterFollowers}
        totalFollowers={followers.totalFollowers}
        filteredFollowers={followers.filteredFollowers}
        filterBy={followers.filterBy}
      />
    </ul>
  );
}

function VisitorsInsights(props) {
  const infoAccounts = (
    <div className="fs-3 text-black-50">{props.visitors} accounts</div>
  );
  const isLoading = (
    <a
      className="btn btn-secondary disabled placeholder col-4"
      aria-hidden="true"
    ></a>
  );

  return (
    <li className="list-group-item">
      <select
        className="form-select form-select-sm mb-3 w-25"
        defaultValue="today"
        onChange={(e) => props.setValue(e.target.value)}
      >
        <option value="today">Today</option>
        <option value="last7days">Last 7 Days</option>
      </select>
      <div className="text-center">
        <div className="fs-1">Profile Visit</div>
        {props.isLoading ? isLoading : infoAccounts}
        {props.isError && (
          <p className="text-center text-danger">Something Error</p>
        )}
      </div>
    </li>
  );
}

function FollowersInsights(props) {
  const infoFollowers = (
    <div>
      <span className="text-success me-1">{props.filteredFollowers}+</span>
      <span className="text-black-50">
        in {props.filterBy === 'today' ? 'today' : 'the last 7 days'}
      </span>
    </div>
  );
  const isLoading = (
    <a
      className="btn btn-secondary disabled placeholder col-4"
      aria-hidden="true"
    ></a>
  );
  return (
    <li className="list-group-item">
      <select
        className="form-select form-select-sm mb-3 w-25"
        defaultValue="today"
        onChange={(e) => props.setValue(e.target.value)}
      >
        <option value="today">Today</option>
        <option value="last7days">Last 7 Days</option>
      </select>
      <div className="text-center mb-3">
        <div className="fs-1">Followers</div>
        <div className="text-black-50">{props.totalFollowers} followers</div>
        {props.isLoading ? isLoading : infoFollowers}
      </div>
    </li>
  );
}
