/*
 * $Id: common.js 89629 2012-02-28 04:30:01Z lpierfelice $
 * (c) 2006-2010 The New York Times Company
 */

// Chartbeat timer
var _sf_startpt=(new Date()).getTime();

function nameIt() {
    window.name = 'nytimesmain';
    if ((navigator.appName == "Microsoft Internet Explorer") && (document.all.globalsearchform)){
        document.all.globalsearchform.style.visibility = "visible";
    }
}
 
function pop_me_up(pURL, features){
    new_window = window.open(pURL, "popup_window", features);
    new_window.focus();
}

function pop_me_up2(pURL,name, features){
    new_window = window.open(pURL, name, features);
    new_window.focus();
}

function changeImage(image_name, image_src) {
    document.images[image_name].src = image_src;
}

function goToURL(obj){
    var f = (obj.section) ? obj : obj.form;
    var selected = f.section.selectedIndex;
    var URL = f.section.options[selected].value;
    if (URL != "") document.location = URL;
    return false;
}

function goToURL2(sel){
// This only works for onChange events from select objects
// but select object can have any name, unlike goToURL() which requires 
// select object to be named "section"
    var selected = sel.selectedIndex;
    var url = sel.options[selected].value;
    if (url != "") document.location = url;
    return false;
}

/* bust all external framesets 
 * but save the original referrer for WebTrends
 */
(function() {
    if (window.self != window.top && !document.referrer.match(/^https?:\/\/[^?\/]+\.nytimes\.com\//)) {
        var expTime = new Date();
        expTime.setTime(expTime.getTime() + 60000); // 1 min
        document.cookie = "FramesetReferrer=" + document.referrer + "; expires=" + expTime.toGMTString() + "; path=/";
        top.location.replace(window.location.pathname);
    }
})();

//  Begin functions for Travel flash slideshows
function writeFlashSlideShow(xmlFile){
    var swfFile = "/slideshow/swf/slideshow.swf?XMLfile=/slideshow/xml/travel/" + xmlFile;
    var HTMLstr = "";
    HTMLstr += "<object classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" codebase=\"http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0\" width=\"390\" height=\"300\" id=\"slideshow\" align=\"middle\">";
    HTMLstr += "<param name=\"allowScriptAccess\" value=\"sameDomain\" />";
    HTMLstr += "<param name=\"movie\" value=\"" + swfFile + "\" />";
    HTMLstr += "<param name=\"quality\" value=\"high\" />";
    HTMLstr += "<param name=\"wmode\" value=\"transparent\" />";
    HTMLstr += "<embed src=\"" + swfFile + "\" wmode=\"transparent\" quality=\"high\" width=\"390\" height=\"300\" name=\"slideshow\" align=\"middle\" allowScriptAccess=\"sameDomain\" type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" />";
    HTMLstr += "</object>";
    return HTMLstr;
}

function showFirstSlide(imgName, photoCredit, photoCaption){
    var HTMLstr = "";
    HTMLstr += "<!-- begin photo -->";
    HTMLstr += "<img src=\"http://graphics.nytimes.com/images/section/travel/slideshow/" + imgName + "\" width=\"390\" height=\"200\" alt=\"photo\" border=\"0\">";
    HTMLstr += "<!-- end photo -->";
    HTMLstr += "<div align=\"right\" class=\"photocredit\">" + photoCredit + "</div>";
    HTMLstr += "<div class=\"photocaption\">" + photoCaption + "</div>";
    return HTMLstr;
}
//  End functions for Travel flash slideshows

//  Begin functions for Global flash slideshows
function writeEmbeddedFlashSlideShow(xmlFile){
    var swfFile = "/slideshow/swf/slideshow.swf?XMLfile=/slideshow/xml/" + xmlFile;
    var HTMLstr = "";
    HTMLstr += "<object classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" codebase=\"http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0\" width=\"390\" height=\"300\" id=\"slideshow\" align=\"middle\">";
    HTMLstr += "<param name=\"allowScriptAccess\" value=\"sameDomain\" />";
    HTMLstr += "<param name=\"movie\" value=\"" + swfFile + "\" />";
    HTMLstr += "<param name=\"quality\" value=\"high\" />";
    HTMLstr += "<param name=\"wmode\" value=\"transparent\" />";
    HTMLstr += "<embed src=\"" + swfFile + "\" wmode=\"transparent\" qualityaigh\" width=\"390\" height=\"300\" name=\"slideshow\" align=\"middle\" allowScriptAccess=\"sameDomain\" type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" />";
    HTMLstr += "</object>";
    return HTMLstr;
}

function showFirstEmbeddedSlide(imgName, photoCredit, photoCaption){
    var HTMLstr = "";
    HTMLstr += "<!-- begin photo -->";
    HTMLstr += "<img src=\"" + imgName + "\" width=\"390\" height=\"200\" alt=\"photo\" border=\"0\">";
    HTMLstr += "<!-- end photo -->";
    HTMLstr += "<div align=\"right\" class=\"photocredit\">" + photoCredit + "</div>";
    HTMLstr += "<div class=\"photocaption\">" + photoCaption + "</div>";
    return HTMLstr;
}
//  End functions for Global flash slideshows

function preloadNavImages(imageNames, imagePath){
    var loadedImages = new Array();
    if (document.images) {
        for (var i=0; i < imageNames.length; i++){
            loadedImages[i] = new Image();
            loadedImages[i].src = imagePath + "nav_" + imageNames[i] + "_off.gif";
        }
    }

}

function readCookie(value){
    var allCookieVals = document.cookie.split(";");
    for (var i=0; i < allCookieVals.length; i++){ //loop through all cookies
        if (allCookieVals[i].indexOf(value) != -1) { //find target cooki            var cookieVal = allCookieVals[i].split("="); //split name/value pair
            return cookieVal[1]; //return target cookie value
        }
    }
}

function expandMultimediaWindow(){
    if (window.resizeTo && window.moveTo) {
        window.resizeTo(screen.availWidth, screen.availHeight);
        window.moveTo(0,0);
    }
}

function shrinkMultimediaWindow(w,h){
    if (window.resizeTo) window.resizeTo(w,h);
    if (window.moveTo) {
        var winX = ((screen.availWidth/2) - (w/2));
        var winY = ((screen.availHeight/2) - (h/2));
        window.moveTo(winX,winY);
    }
}

function ieXLiquidWidth() {
    if (document.body.clientWidth < 774) {
        return "768px";
    } else if (document.body.clientWidth > 984) {
        return "980px";
    } else {
        return "auto";
    }
}

function setClientSizeCookies() {
    var client_w = document.body.clientWidth;
    var path = "/";
    var domain = "nytimes.com";
    document.cookie = "client_w=" + client_w + "; path= " + path + "; domain=" + domain;
}

//  Function for Classifieds and Most Popular modules
function Accordian(target) {
    typeof target == "object" ? this.element = target : this.element = document.getElementById(target); if (!this.element) return false;
    this.ul = this.element.getElementsByTagName("ul")[0];
    this.tabs = this.ul.getElementsByTagName("li");
    this.tabContent = this.getTabContent();
    this.bind();
}

Accordian.prototype.getTabContent = function() {
    tabContent= new Array();
    this.divs = this.element.getElementsByTagName("div");
    for (var i = 0; i < this.divs.length; i++) {
        if (/tabContent/i.test(this.divs[i].className)) {
            tabContent.push(this.divs[i]);
        }
    }
    return tabContent;
};

Accordian.prototype.bind = function() {
    var o = this;
    for (var i = 0; i < this.tabs.length; i++) {
        this.tabs[i].onclick = function() {
            if (this.className != 'selected') {
                o.open(this); return false;
                var a = this.getElementsByTagName("a")[0];
                if (a) a.onclick = function() {
                    return false;
                };
            }
        };
    }
};

Accordian.prototype.open = function(caller) {
    for (var i = 0; i < this.tabs.length; i++) {
        var tab = this.tabs[i];
        if (tab == caller) {
            this.collapse();
            tab.className = "selected";
            this.tabContent[i].style.display = "block";
        }
    }
};

Accordian.prototype.collapse = function() {
    for (var i = 0; i < this.tabs.length; i++) {
        this.tabs[i].className = "";
        this.tabContent[i].style.display = "none";
    }
};

// Function for Google ads links

function linkbox(url, winName) {
    window.open(url, winName, "location=yes,directories=yes,menubar=yes,toolbar=yes,status=yes,resizable=yes,scrollbars=yes");
}

function enhanceAccordians() {
    var divs = document.getElementsByTagName('div');
    for (var i = 0; i < divs.length; i++) {
        var element = divs[i];
        if (/accordian/i.test(element.className)) {
            new Accordian(element);
        }
    }
}

getMetaTagValue = function(name){
    if (document.getElementsByTagName) {
        var meta = document.getElementsByTagName("meta");
        for (var i=0; i < meta.length; i++) {
            if (meta[i].name == name) return meta[i].content;
        }
    }
};

var NYTD = NYTD || {};

NYTD.Hosts = (function(){
    var host, scripts = document.getElementsByTagName("script");
    for (var i = 0, script; script = scripts[i]; i++) {
        host = script.src && /^(.+\.nyt(imes)?.com)\/js\/common\.js/.test(script.src) ? RegExp.$1 : '';
        if (host) { break; };
    };

    var jsonHost = (host.indexOf('graphics8.nytimes.com') !== -1) ?
    'http://json8.nytimes.com' :
    'http://json.stg.nytimes.com';
    
    var wwwHost = (host.indexOf('graphics8.nytimes.com') !== -1) ? 'http://www.nytimes.com' : 'http://swww.nytimes.com'

    var myaccountHost = (host.indexOf('graphics8.nytimes.com') !== -1) ? 'https://myaccount.nytimes.com' : 'https://myaccount-circ.stg.nytimes.com';

    return {
        imageHost: host,
        jsHost: host,
        cssHost: host,
        jsonHost: jsonHost,
        myaccountHost: myaccountHost,
        wwwHost: wwwHost
    };
})();

// Duped in trackingTags_v1.1.js
(function(){

    var windowLoaded = false;
    var document_scripts;

    if (window.addEventListener) {
        window.addEventListener ("load", function(){ windowLoaded = true; }, false);
    } else if (window.attachEvent) {
        window.attachEvent ("onload", function(){ windowLoaded = true; });
    }

    function scriptLoaded(src) {
        document_scripts = document_scripts || {};
        if (document_scripts[src]) { return true; }
        else {
            var script_tags= document.getElementsByTagName("script");
            for (var i = 0, script; script = script_tags[i]; i++) {
                if(script.src) { document_scripts[script.src] = 1; }
            };
            if (document_scripts[src]) { return true; }
            else { return false; }
        }
    }

    NYTD.require = function(file, callback) {
        if (windowLoaded) { throw('Cannot require file, document is already loaded'); }
    //  If matches root relative url (single slash, not protocol-agnostic double slash)
        var url = /^\/[^\/]/.test(file) ? NYTD.Hosts.jsHost + file : file;
        var force = arguments[arguments.length - 1] === true;
        var needsCallbackScriptTag;

        if (force || !scriptLoaded(url)) {
            document.write('<script src="' + url + '" type="text/javascript" charset="utf-8" onerror="throw(\'NYTD.require: An error occured: \' + this.src)"><\/script>');
            document_scripts[url] = 1;
            needsCallbackScriptTag = true;
        }

        if (typeof callback == 'function') {
            if (document.addEventListener && !Prototype.Browser.IE) {
                if (needsCallbackScriptTag) {
                    document.write('<script type="text/javascript" charset="utf-8">(' + callback.toString() + ')();<\/script>');
                } else {
                    window.setTimeout(function(){
                        callback();
                    }, 0);
                }
            } else {
                NYTD.require.callbacks = NYTD.require.callbacks || [];
                NYTD.require.callbacks.push(callback);
                NYTD.require.callbacks.count = (++NYTD.require.callbacks.count) || 0;
                document.write("<script id=__onAfterRequire" + NYTD.require.callbacks.count + " src=//:><\/script>");
                document.getElementById("__onAfterRequire" + NYTD.require.callbacks.count).onreadystatechange = function() {
                    if (this.readyState == "complete") {
                        this.onreadystatechange = null;
                        (NYTD.require.callbacks.pop())();
                        this.parentNode.removeChild(this);
                    }
                };
            }
        }
    };
})();

NYTD.require('/js/mtr.js');

NYTD.require('/js/app/lib/env.js');

if (!window.location.hostname.match('monster')) {
    NYTD.require('/js/app/lib/prototype/1.7/prototype.js');
    NYTD.require('/js/app/lib/scriptaculous/1.8.3/effects.js');
    NYTD.require('/js/app/lib/NYTD/0.0.1/template.js');

    if (!window.location.hostname.match('myaccount')) {
        NYTD.require('/js/adx/googleads.js');
    }
}

if (!window.TimesPeople) {
    NYTD.require('/js/app/timespeople_1.5/lib/urilist.js');
    NYTD.require('/js/app/timespeople/boot.js');
}

// IE Pinned Site (IE9+)
if (window.external && window.external.msIsSiteMode) {
  NYTD.require("/js/app/ie/pinned_site.js");
}

(function() {
    var PT  = false;
    var PST = false;
    var metas = document.getElementsByTagName('meta');

    for (var i = 0, meta; meta = metas[i]; i++) {
        PT  = (meta.name == 'PT')  ? meta.content : PT;
        PST = (meta.name == 'PST') ? meta.content : PST;
        if (PT && PST) break;
    }

    if (PT === 'Article' || PST === 'Interactive' || PST === 'Slideshow') {
        NYTD.require("/js2/build/facebook/article/build.js");
    }
    
    if (PT === 'Article' || PST === 'Blog Post'){
        NYTD.require("/js/app/common/swipe/navigate.min.js");
        NYTD.require("/js/app/common/emphasis/app.js");
    }
})();

NYTD.loadGlobalProfile = (function() {
	NYTD.Hosts = NYTD.Hosts || {};
	NYTD.Hosts.imageHost = NYTD.Hosts.imageHost || "";
	
    var globalProfileHtml = '<span id="memberToolsProfileDropdown">\
  <span id="memberToolsProfileClosedTab">{USERNAME}</span>\
  <span id="memberToolsProfileOpenedTab"><span class="insetH">{USERNAME}</span></span>\
  <ul id="memberToolsProfileMenu">\
    <li id="memberToolsProfileMenuProfileItem"><a href="http://timespeople.nytimes.com/view/user/{ID}/settings.html">My Profile</a></li> \
    <li><a href="http://www.nytimes.com/membercenter/">My Account </a></li> \
    <li class="lastItem"><a href="http://www.nytimes.com/logout">Log Out</a></li>\
  </ul>\
</span>';

    var globalProfileCSS = '#memberToolsProfileDropdown { font-size:12px; }\
	#memberToolsProfileDropdown a:visited { color:#004276; }\
	#memberToolsProfileClosedTab { background:url("' + NYTD.Hosts.imageHost + '/images/toggles/toggle_down_icon_9x5.gif") no-repeat right center; color:#004276; padding:0 13px 0 3px; text-align:left; }\
	#memberToolsProfileClosedTab:hover { cursor: pointer; }\
\
	#memberToolsProfileOpenedTab { display: none; position: absolute; left: -2px; top: -5px; z-index:100000001; background: #fff; border-color: #ccc; border-style: solid; border-width: 1px 1px 0; cursor: pointer; padding: 4px 0 4px 8px; color: #444; text-decoration: none; }\
	.open #memberToolsProfileOpenedTab { display: inline;  }\
	#memberToolsProfileOpenedTab .insetH {margin:0 6px 0 0; padding: 0 14px 0 0; background: url("' + NYTD.Hosts.imageHost + '/images/toggles/toggle_up_icon_9x5.gif") no-repeat right center;  }\
	#memberToolsProfileMenu, \
	#memberTools #memberToolsProfileMenu li { border: 0; margin:0; padding:0; }\
	#memberTools #memberToolsProfileMenu { -moz-box-shadow:1px 0 2px #999; -webkit-box-shadow: 1px 0 2px #999; box-shadow: 1px 0 2px #999; /* For IE 8 */ -ms-filter: "progid:DXImageTransform.Microsoft.Shadow(Strength=2, Direction=180, Color=\'#999999\')"; /* For IE 5.5 - 7 */ filter: progid:DXImageTransform.Microsoft.Shadow(Strength=2, Direction=180, Color=\'#999999\'); background: #fff; border:1px solid #ccc; display:none; right: -1px; position:absolute; top:18px; width: 170px; padding-bottom: 4px; z-index: 100000000; }\
	.open #memberToolsProfileMenu { display:block !important; }\
	#memberTools #memberToolsProfileMenu li { border-bottom: 1px solid #ccc; display:block; font-size:1em; margin:0 8px; padding:7px 0; text-align: left; white-space: normal; }\
	#memberTools #memberToolsProfileMenu li.lastItem { border-bottom: none; }\
	#memberTools #memberToolsProfileMenu li a { display:block; }\
	#memberToolsProfileMenuProfileItem { overflow: hidden }\
	#memberToolsProfileMenuProfileItem a { margin: 7px 0 0 0; }\
	#memberToolsProfileAvatar { width:30px; margin-bottom: 2px; }';    

    function getStyle(el, cssprop) {
        if (typeof el.currentStyle !== 'undefined') {
            //IE
            return el.currentStyle[cssprop];
        }
        else if (typeof document.defaultView !== 'undefined' && typeof document.defaultView.getComputedStyle !== 'undefined') {
            //Firefox
            return document.defaultView.getComputedStyle(el, "")[cssprop];
        }
        else {
            //try and get inline style
            return el.style[cssprop];
        }
    }
    
    function loadImage() {
        var elem = new Element('img', {
            'id': 'memberToolsProfileAvatar',
            'class': 'runaroundLeft',
            src: NYTD.profileDropdown.imgURL,
            alt: NYTD.profileDropdown.username
        });
        elem.onerror = function() {
            elem.remove();
        };
        $('memberToolsProfileMenuProfileItem').insert({
            "top": elem
        });
    }

    function loadDropdown(el) {
        NYTD.profileDropdown.username = getInnerText(el.down()) || null;
        if (NYTD.profileDropdown.username) {
            globalProfileHtml = globalProfileHtml.replace(/\{USERNAME\}/g, NYTD.profileDropdown.username);
            globalProfileHtml = NYTD.profileDropdown.id ? globalProfileHtml.replace(/\{ID\}/g, NYTD.profileDropdown.id) : globalProfileHtml;
            for (var x = 0, len2 = NYTD.profileDropdown.elements.length; x < len2; x++) {
                if (NYTD.profileDropdown.elements[x].innerHTML.indexOf("Log Out") > -1) {
                    NYTD.profileDropdown.elements[x].remove();
                }
            }
        } else {
            el.remove();
            return;
        }
        appendStyleTag(globalProfileCSS);
        el.update(globalProfileHtml).addClassName('containingBlock');
        loadImage();
        
        NYTD.profileDropdown.openDropdown = function() {
            $('memberToolsProfileDropdown').addClassName('open');
            clearTimeout(NYTD.profileDropdown.timeout);
            $('memberToolsProfileDropdown').observe('mouseout',
            function(e) {
                if (e.element().nodeName != 'DIV') return;
                NYTD.profileDropdown.timeout = setTimeout(NYTD.profileDropdown.closeDropdown, NYTD.profileDropdown.timeoutValue);
            });
            $('memberToolsProfileDropdown').observe('mouseout',
            function(e) {
                NYTD.profileDropdown.timeout = setTimeout(NYTD.profileDropdown.closeDropdown, NYTD.profileDropdown.timeoutValue);
            });
            $('memberToolsProfileDropdown').observe('mouseover',
            function(e) {
                clearTimeout(NYTD.profileDropdown.timeout);
            });
        }
        
        NYTD.profileDropdown.closeDropdown = function() {
            $('memberToolsProfileDropdown').removeClassName('open').stopObserving('mouseout').stopObserving('mouseover');
            clearTimeout(NYTD.profileDropdown.timeout);
        }
        
        $('memberToolsProfileDropdown').observe('click',
        function(event) {
            if ($('memberToolsProfileDropdown').hasClassName('open')) {
                NYTD.profileDropdown.closeDropdown();
            } else {
                NYTD.profileDropdown.openDropdown();
            }
        });
    }

    function getInnerText(element) {
        if (element.innerText) {
            return element.innerText;
        } else if (element.textContent) {
            return element.textContent;
        }
    }

    // Load CSS
    function appendStyleTag(styleStr) {
        var newNode = document.createElement('style');
        newNode.setAttribute("type", "text/css");
        if (newNode.styleSheet) {
            // IE
            newNode.styleSheet.cssText = styleStr;
        } else {
            newNode.appendChild(document.createTextNode(styleStr));
        }
        document.getElementsByTagName("head")[0].appendChild(newNode);
    }
    
    (function startup() {
        if (typeof $$ !== 'undefined') {
            var li = $$("#memberTools li");
        } else {
            window.setTimeout(startup, 100);
            return;
        }
        NYTD.profileDropdown = {
            'timeoutValue' : 3000,
            'timeout' : '',
            'id' : window.dcsvid || null,
            'elements' : li
        }

        var id1,
        id2,
        reps = 0;
        if (NYTD.profileDropdown.id && li.length >= 0 && $) {
            id1 = NYTD.profileDropdown.id.substr(0, 4);
            id2 = NYTD.profileDropdown.id.substr(4, 4);
            NYTD.profileDropdown.imgURL = 'http://pimage.timespeople.nytimes.com/' + id1;
            NYTD.profileDropdown.imgURL += (id2 !== "") ? '/' + id2: "";
            NYTD.profileDropdown.imgURL += '/cropped-' + NYTD.profileDropdown.id + '.jpg';
        } else {
            window.setTimeout(startup, 100);
            return;
        }
        
        var body = document.getElementsByTagName('body')[0];
        var bgColor = getStyle(body, 'backgroundColor');
        if (bgColor == "rgb(26, 26, 26)" || bgColor == "#1a1a1a" || bgColor == "#1A1A1A") {
            globalProfileCSS += '#memberToolsProfileDropdown a, #memberToolsProfileDropdown a:visited { color:#444 !important; }\
    		#memberToolsProfileClosedTab { color: #999;  background: url("' + NYTD.Hosts.imageHost + '/images/toggles/toggle_down_icon_9x5_gray.gif") no-repeat right center; }\
    		#memberToolsProfileOpenedTab .insetH { background-image: url("' + NYTD.Hosts.imageHost + '/images/toggles/toggle_up_icon_9x5_gray.gif"); }';
        }
                    
        if ($('memberToolsUsername')) {
            loadDropdown($('memberToolsUsername'));
        } else {
            for (var i = 0, len = li.length; i < len; i++) {
                if (li[i].innerHTML.indexOf("Welcome,") > -1) {
                    loadDropdown(li[i]);
                }
            }
        }
    })();
})();


NYTD.loadEditionToggle = function() {
    var toggleUS = document.getElementById('editionToggleUS'),
    toggleGlobal = document.getElementById('editionToggleGlobal');
    if (toggleUS && toggleGlobal) {
        var edition = unescape(document.cookie).match('NYT-Edition=([^;]+)');
        if (edition && edition[1] && edition[1].indexOf("edition|GLOBAL") != -1) {
            toggleGlobal.innerHTML = 'Global'; // Deactivate Global
        } else {
            toggleUS.innerHTML = 'U.S.'; // Deactivate U.S.
        }
    }
};

(function() {
    NYTD.EditionPref = {
        defaultExpiration : 31536000000
    };
    NYTD.EditionPref.exp = new Date();
    NYTD.EditionPref.exp.setTime(NYTD.EditionPref.exp.getTime() + NYTD.EditionPref.defaultExpiration);
    
    NYTD.EditionPref.setGlobal = function () {
        document.cookie = 'NYT-Edition=edition|GLOBAL;expires='+ NYTD.EditionPref.exp.toUTCString() +';path=/;domain=.nytimes.com;';
    };
    NYTD.EditionPref.setUS = function () {
        document.cookie = 'NYT-Edition=edition|US;expires='+ NYTD.EditionPref.exp.toUTCString() +';path=/;domain=.nytimes.com;';
    };
}());

