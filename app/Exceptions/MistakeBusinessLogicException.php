<?php 

namespace Cv\Exceptions;

use Exception;

class MistakeBusinessLogicException extends Exception {

    protected $message = "You are making wrong business logic.";

}