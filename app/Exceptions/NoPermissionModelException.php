<?php 

namespace Cv\Exceptions;

use Exception;

class NoPermissionModel extends Exception {

    protected $message = "User are not allow to retrieve this record";

}