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
var twitterLoginUrl = <?= json_encode($twitterLoginUrl) ?>;
var prefectureList = <?= json_encode(Lang::get("location")) ?>;
var myNotification = <?= json_encode($myNotification) ?>;
var __config = {
    APPOINTMENT_ANSWER_NOT_YET: {{{   \Cv\Model\AppointmentUser::ANSWER_NOT_YET }}},
    APPOINTMENT_ANSWER_NO_GOING: {{{  \Cv\Model\AppointmentUser::ANSWER_NO_GOING }}},
    APPOINTMENT_ANSWER_YES_GOING: {{{ \Cv\Model\AppointmentUser::ANSWER_YES_GOING }}},
    APPOINTMENT_MET_UNKNOWN: {{{      \Cv\Model\Appointment::MET_UNKNOWN }}},
    APPOINTMENT_MET_NO: {{{           \Cv\Model\Appointment::MET_NO }}},
    APPOINTMENT_MET_YES: {{{          \Cv\Model\Appointment::MET_YES }}},
};
</script>
@endsection

@section('content')
    <?php 
    // $react->renderByRoute('/'); 
    ?> 
@endsection