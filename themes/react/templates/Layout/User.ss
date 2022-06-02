<div id="root"></div>

<script>

    window.user = {
        active: '$active', 
        name: '$username', 
    }

</script>

<% require themedCSS('profile') %>
<% require themedCSS('post') %>


<% require themedJavascript('components/BtnFollow', 'text/babel') %>
<% require themedJavascript('components/BtnUnfollow', 'text/babel') %>
<% require themedJavascript('components/BtnEditProfile', 'text/babel') %>
<% require themedJavascript('components/TabItem', 'text/babel') %>
<% require themedJavascript('components/TabList', 'text/babel') %>


<% require themedJavascript('components/Post', 'text/babel') %>

<% require themedJavascript('components/Footer', 'text/babel') %>
<% require themedJavascript('components/ProfileHeader', 'text/babel') %>
<% require themedJavascript('components/Posts', 'text/babel') %>


<% require themedJavascript('components/Category', 'text/babel') %>
<% require themedJavascript('components/Ads', 'text/babel') %>
<% require themedJavascript('components/Insights', 'text/babel') %>
<% require themedJavascript('components/ModalDetail', 'text/babel') %>
<% require themedJavascript('pages/Profile', 'text/babel') %>