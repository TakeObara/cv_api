<!DOCTYPE html>
<html lang="jp">
<head>
    <meta charset="utf-8">
    <title>Connection Vendor</title>
    <meta name="description" content="">
        
    <link rel="stylesheet" href="/css/app.css">
    <style type="text/css">  
    .container {
        margin: 0;
    }
    .content {
        margin: 0 auto;
        width: 600px;
    }

    .pg-title {
        font-size: 30px;
        border-bottom: 3px solid #009bdf;
        margin-top: 30px;
        padding-bottom: 25px;
    }
    .pg-subtitle {
        color: #26a1d0;
        margin-top: 30px;
        font-size: 20px;
    }
    .form-group {
        width: 100%;
        padding-left: 25px;
        margin-top: 30px;
    }
    .form-group label {
        display: inline-block;
        width: 150px;
    }
    .form-group input[type=text] {
        width: calc(100% - 175px);
        padding: 7px;
        box-sizing: border-box;
        font-size: 17px;
    }

    .form-group.amount {
        padding-bottom: 25px;
        border-bottom: 3px solid #dcdcdc;
    }
    .btn-submit {
        background-color: #26a1d0;
        color: white;
        display: block;
        width: 160px;
        text-align: center;
        padding: 7px 0;
        font-size: 17px;
        float: right;
        border-radius: 10px;
    }
    .alert {
        background-color: #bd362f;
        padding: 15px;
        color: white;
        width: calc(100% - 50px);
    }
    .alert ul {
        margin: 0;
        color: white;
    }
    .alert.alert-info {
        background-color: #2f96b4;
        padding-left: 40px;
        width: calc(100% - 75px);
    }
    </style>
</head>
<body>
    <div id="main">
        <header class="clearfix">
            <div class="logo"><span class="white">CONNECTION</span><span> VENDOR</span></div>
        </header>

        <div class="container clearfix">
            <div class="content">
                <div class="pg-title">ユーザ情報</div>
                <div class="form-group amount">
                    <label>売り上げ：</label>￥{{ $user->amount }}
                </div>
                <form action="" method="post">
                    <div class="pg-subtitle">振込先の口座情報</div>

                    <div class="form-group">
                        @if (count($errors) > 0)
                        <div class="alert alert-danger">
                            <ul>
                                @foreach($errors->all() as $err)
                                <li>{{$err}}</li>
                                @endforeach
                            </ul>
                        </div>
                        @elseif(session('success'))
                        <div class="alert alert-info">
                            更新しました
                        </div>
                        @endif
                    </div>

                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <div class="form-group">
                        <label>銀行名</label>
                        <input type="text" name="bank_name" value="{{ old("bank_name", $bankInfo["bank_name"] )}}">
                    </div>
                    
                    <div class="form-group">
                        <label>口座番号</label>
                        <input type="text" name="bank_account_no" value="{{ old("bank_account_no", $bankInfo["bank_account_no"] )}}">
                    </div>

                    <div class="form-group">
                        <label>口座タイプ</label>
                        <select name="bank_account_type">
                            <option value="普通" {{ old("bank_account_type", $bankInfo["bank_account_type"] ) === '普通' ? 'selected' : ''}}>普通</option>
                            <option value="預金" {{ old("bank_account_type", $bankInfo["bank_account_type"]) === '預金' ? 'selected' : ''}}>預金</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>支店コード</label>
                        <input type="text" name="bank_branch_code" value="{{ old("bank_branch_code", $bankInfo["bank_branch_code"] )}}">
                    </div>

                    <div class="form-group clearfix">
                        <button class="btn-submit" type="submit">保存</button>
                    </div>
                    


                </form>
            </div>
        </div>
    </div>
</body>
</html>