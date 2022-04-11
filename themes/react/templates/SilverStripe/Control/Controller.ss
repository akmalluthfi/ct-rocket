<!DOCTYPE html>
<html lang="en">

<head>
    <%-- agar url relative pada root --%>
    <% base_tag %>
    $MetaTags(false)
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Rocket</title>

    <%-- include style --%>
    <% require themedCSS('bootstrap/bootstrap.min') %>
    <% require themedCSS('bootstrap/bootstrap-icons') %>
    <% require themedCSS('font') %>
    <% require themedCSS('utilities') %>
    <% require themedCSS('style') %>

    <%-- Include Script --%>
    <% require themedJavascript('jquery/jquery') %>
    <% require themedJavascript('bootstrap/bootstrap.min') %>
    <% require themedJavascript('sweetalert2.all.min') %>
</head>

<body>
    <main class="container my-5">
        $Layout
    </main>
</body>

</html>
