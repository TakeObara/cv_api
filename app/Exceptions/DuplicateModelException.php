<?php 

namespace Cv\Exceptions;

use Exception;

class DuplicateModel extends Exception {

    protected $message = "Model is duplicate!";

}