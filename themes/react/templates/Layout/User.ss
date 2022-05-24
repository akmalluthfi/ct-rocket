<div id="root"></div>

<script>
    window.UserController = {
        ID: '$User.ID', 
        isBusinessAccount: '$User.isBusinessAccount',
        Name: '$User.Username', 
        Picture: '$User.Picture.Link', 
        Bio: '$User.Bio', 
        Email: '$User.Email',
        Followers: '$Followers',
        Following: '$Following', 
    };
    
    window.hasFollow = '$hasFollow'; 
    window.isBlocked = '$isBlocked';

</script>

<% require themedCSS('post') %>

<% require themedJavascript('components/Category', 'text/babel') %>
<% require themedJavascript('components/Ads', 'text/babel') %>
<% require themedJavascript('components/Insights', 'text/babel') %>
<% require themedJavascript('components/Post', 'text/babel') %>
<% require themedJavascript('components/ModalDetail', 'text/babel') %>
<% require themedJavascript('User', 'text/babel') %>