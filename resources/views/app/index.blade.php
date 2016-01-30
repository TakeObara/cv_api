@extends('app.wrapper')

@section('meta')
<meta property="fb:app_id"          content="1661136280835856" />
<meta property="og:url"             content="http://cvendor.jp/" />
<meta property="og:site_name"       content="CONNECTION VENDOR" />
<meta property="og:title"           content="3000円で紹介し合うC to CサービスCONNECTION VENDOR" />
<meta property="og:image"           content="http://cvendor.jp/assets/imgs/ogp.jpg" />
<meta property="og:description"     content="3000円であなたのビジネスチャンスを広げましょう" />
@endsection

@section('scripts-constant')
<script>
var myProfile = <?= json_encode($loginedUserProfile) ?>;
var facebookLoginUrl = <?= json_encode($facebookLoginUrl) ?>;
var prefectureList = <?= json_encode(Lang::get("location")) ?>;
</script>
@endsection

@section('content')
    <?php 
    // $react->renderByRoute('/'); 
    ?> 
@endsection