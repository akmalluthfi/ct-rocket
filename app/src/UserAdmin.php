<?php

use SilverStripe\Admin\ModelAdmin;

class UserAdmin extends ModelAdmin
{
  private static $url_segment = 'users';

  private static $menu_title = 'Users Account';

  private static $menu_icon_class = 'font-icon-torsos-all';

  private static $managed_models = [
    User::class
  ];
}
