class HeroImage extends React.Component {
    render() {
        return (
            <div className="col-6 d-none d-md-block text-center my-auto">
                <img alt={this.props.text} src={this.props.url} className="w-75" />
            </div>
        );
    }
}