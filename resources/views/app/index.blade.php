@extends('app.wrapper')

@section('scripts-constant')
<script>
var myProfile = <?= json_encode($loginedUserProfile) ?>;
var facebookLoginUrl = <?= json_encode($facebookLoginUrl) ?>;
</script>
@endsection

@section('content')
    <?php 
    // $react->renderByRoute('/'); 
    ?> 
@endsection