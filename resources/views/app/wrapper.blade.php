<!DOCTYPE html>
<html lang="jp">
<head>
      <meta charset="utf-8">
      <title>Connection Vendor</title>
      <meta name="description" content="">
      @yield('meta')

      <link rel="stylesheet" href="/css/app.css">
      @yield('styles')
</head>
<body>
    
    <div id="main">
    @yield('content')
    </div>
    
    @yield('scripts-constant')
    <script src="/js/react.js"></script>
    <script src="/js/react-dom.js"></script>
    <script src="/js/react-router.js"></script>
    <script src="/dist/app.js"></script>
    @yield('scripts')
</body>
</html>