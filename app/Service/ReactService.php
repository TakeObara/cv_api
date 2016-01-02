<?php

namespace Cv\Service;

use V8Js;

class ReactService {

    // v8JS 
    private $v8;

    public function __construct() 
    {

        $this->v8 = new V8Js;

        // reactJS library
        $react = [];
        $react[] = 'var __SERVER = {};';
        $react[] = file_get_contents(public_path('js/react.js'));
        $react[] = file_get_contents(public_path('js/react-dom.js'));
        $react[] = file_get_contents(public_path('js/react-dom-server.js'));
        $react[] = file_get_contents(public_path('js/react-router.js'));
        
        $app = file_get_contents(public_path('dist/app.js'));

        try {
            // compile react library
            $this->v8->executeString(join("",$react), "react.js");

            // compile components
            $this->v8->executeString($app, "app.js");
        } catch (V8JsException $e) {
            // blow up spectacularly
            $this->handleException($e);
        }

    }

    public function renderComponentByString($componentName, $identifier = null) 
    {   
        if(is_null($identifier)) {
            $identifier = $componentName;
        }

        try {
            return $this->v8->executeString('ReactDOMServer.renderToString(React.createElement(Timer, null))', $identifier);
        } catch( V8JsException $e) {
            // blow up spectacularly
            $this->handleException($e);
        }
        
    }

    public function renderByRoute($path)
    {
        // variable in routesMap 
        $scripts = [ 

        'ReactRouter.match({__SERVER.routesMap, location: "'.$path.'"}, function(error, redirectLocation, renderProps) {',
            'if(error) throw error;',
            'print(ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, React.__spread({},  renderProps))));',
        '});'
        ];

        try { 
            $this->v8->executeString(join("\n",$scripts), "route.js");
        }catch( V8JsException $e ) {
            $this->handleException($e);
        }
    }

    public function handleException(V8JsException $e) 
    {
        abort(500, $e);
    }

}