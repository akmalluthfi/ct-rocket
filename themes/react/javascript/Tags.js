function Header(props) {
    return (
        <header className="d-flex my-4">
            <div className="col-auto">
                <img src={(props.isLoad) ? "favicon.ico" : props.posts[0].Images[0].Link} alt="" className="mx-3 rounded-circle object-fit-content" width="77px" height="77px" />
            </div>
            <div className={(props.isLoad) ? "col placeholder-glow" : "col"}>
                <div className={(props.isLoad) ? "fs-3 placeholder col-auto d-block rounded" : "fs-3"}>{props.status.categoryName}</div>
                <div className={(props.isLoad) ? "placeholder col-auto rounded" : ''}>{props.posts.length}</div>
            </div>
        </header>
    );
}

function Label() {
    return (
        <div className="text-black-50 fw-bold mb-3">Posts</div>
    );
}

class Tags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            author: {},
            status: {},
            isLoad: true,
        }
    }

    componentDidMount() {
        fetch(window.location.href, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
            this.setState({
                posts: data.posts,
                author: data.author,
                status: data.status,
                isLoad: false
            })
        });
    }

    render() {
        return (
            <div>
                <Navbar active={'home'} />
                <div className="container">
                    <Header
                        posts={this.state.posts}
                        isLoad={this.state.isLoad}
                        status={this.state.status}
                    />
                    <Label />
                    <Post posts={this.state.posts} />
                </div>
                <Modal />
            </div>
        );
    }
}

ReactDOM.render(<Tags />, document.getElementById('root'));