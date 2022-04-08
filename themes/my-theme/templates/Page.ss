<!DOCTYPE html>
<html lang="en">

<head>
    <%-- agar url relative pada root --%>
    <% base_tag %>
    $MetaTags(false)
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>$Title</title>

    <%-- include style --%>
    <% require themedCSS('bootstrap/bootstrap.min') %>
    <% require themedCSS('bootstrap/bootstrap-icons') %>
    <% require themedCSS('font') %>
    <% require themedCSS('utilities') %>
    <% require themedCSS('jquery/jquery-ui.min') %>
    <% require themedCSS('style') %>
    <% require themedCSS('minimal') %>

    <%-- Include Script --%>
    <% require themedJavascript('jquery/jquery') %>
    <% require themedJavascript('jquery/jquery-ui.min') %>
    <% require themedJavascript('bootstrap/bootstrap.min') %>
    <% require themedJavascript('taggle') %>
    <% require themedJavascript('script') %>
    <% require themedJavascript('sweetalert2.all.min') %>
</head>

<body>
    <% include Navbar %>
    <%-- Content --%>
    <div class="container">
        $Layout
    </div>

    <% if $CurrentMember %>
        <% include ModalCreatePost %>
    <% end_if %>

</body>

</html>
