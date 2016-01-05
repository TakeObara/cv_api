<?php 

namespace Cv\Exceptions;

use Exception;

class MissingModel extends Exception {

    protected $message = "Model is missing!";

}