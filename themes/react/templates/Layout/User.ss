<div id="root"></div>

<script>
    window.UserController = {
        ID: '$User.ID', 
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

<% require themedJavascript('components/Post', 'text/babel') %>
<% require themedJavascript('components/ModalDetail', 'text/babel') %>
<% require themedJavascript('User', 'text/babel') %>