function BtnEditProfile() {
  return (
    <a
      href={document.baseURI + 'accounts/edit'}
      type="button"
      className="col-auto btn-sm btn btn-outline-secondary"
    >
      <span>Edit Profile</span>
    </a>
  );
}
