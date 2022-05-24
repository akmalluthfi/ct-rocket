<!DOCTYPE html>
<html lang="en">
<head>
    <% base_tag %>
    $MetaTags(false)
    <link rel="icon" href="favicon.ico" />
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rocket App</title>

        <%-- include style --%>
        <% require themedCSS('bootstrap/bootstrap.min') %>
        <% require themedCSS('bootstrap/bootstrap-icons') %>
        <% require themedCSS('font') %>
        <% require themedCSS('utilities') %>
        <% require themedCSS('jquery/jquery-ui.min') %>
        <% require themedCSS('navbar') %>
        <% require themedCSS('minimal') %>
    
        <%-- Include Script --%>
        <% require themedJavascript('jquery/jquery') %>
        <% require themedJavascript('jquery/jquery-ui.min') %>
        <% require themedJavascript('bootstrap/bootstrap.min') %>
        <% require themedJavascript('taggle') %>
        <% require themedJavascript('sweetalert2.all.min') %>
        <%-- Include React --%>
        <script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>

        <% require themedJavascript('components/Navbar', 'text/babel') %>
        <% require themedJavascript('components/Modal', 'text/babel') %>
        
</head>
<body style="height:100vh">
    <script>
        window.AccessToken = '$getAccTk';
        window.User = {
            ID: '$CurrentMember.ID', 
            Name: '$CurrentMember.Username', 
            Picture: '$CurrentMember.Picture.Link', 
            Bio: '$CurrentMember.Bio', 
            Email: '$CurrentMember.Email',
        }
    </script>
    
    $Layout
 
</body>
</html>