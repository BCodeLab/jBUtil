/*
 jBUtil v0.0.1
 Copyright 2016 Alberto Bettin
 Released under the MIT license
*/


(function () {

    if (window.jB !== undefined) {
        console.warn("jB has been already defined!");
        return;
    }

    var _jB = function () {
        return this;
    };

    _jB.prototype = {};


    _jB.prototype.config = {
        segmentBaseRoot: "",
        segmentSiteRoot: "",
        sessionExpiredUrl: "",
        silentMode: false
    };

    _jB.prototype.count = function (el) {
        switch (typeof el) {
            case "object":
                var size = 0;
                for (var key in el) {
                    if (el.hasOwnProperty(key))
                        size++;
                }
                return size;
            case "array":
            default:
                return el.length;
        }
    };

    _jB.prototype.param = function (source) {
        if (jQuery) {
            return jQuery.param.apply(this, arguments);
        }

        var array = [];

        for (var key in source) {
            array.push(encodeURIComponent(key) + "=" + encodeURIComponent(source[key]));
        }

        return array.join("&");
    };

    _jB.prototype.extend = function () {
        if (jQuery) {
            return jQuery.extend.apply(this, arguments);
        }

        var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {},
                i = 1,
                length = arguments.length,
                deep = false;

        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target;

            // skip the boolean and the target
            target = arguments[i] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object") {
            target = {};
        }

        // extend jQuery itself if only one argument is passed
        if (i === length) {
            target = this;
            i--;
        }

        for (; i < length; i++) {
            // Only deal with non-null/undefined values
            if ((options = arguments[i]) != null) {
                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && (typeof copy === "object" || (copyIsArray = (typeof copy === "array")))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && typeof src === "array" ? src : [];

                        } else {
                            clone = src && typeof src === "object" ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = jB.extend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };

    _jB.prototype.fetch = function (para) {
        var default_params = {
            timeout: false,
            data: {},
            callback: function (obj) {
                if (!jB.config.silentMode) {
                    console.warn("No fetch-callback defined, server returns: " + obj);
                }
            },
            silent_mode: false
        };
        var response = {
            elapsedTime: 0,
            response: null,
            status: -1,
            msg: ""
        };
        var params = jB.extend({}, default_params, para);
        if (params.call === undefined || params.call === '') {
            response.status = 400;
            response.msg = 'Invalid xhr_call parameters';
            if (!params.silent_mode) {
                console.log('Core_util.fetch ' + response.status + ' response from ' + params.xhr_call + ' after ' + response.elapsedTime + 's');
            }
            params.callback(response);
            return;
        }

        var realCallPath = jB.siteUrl() + (params.call.indexOf('/') > -1 ? '' : ("/" + jB.segment(2))) + "/";

        var xhr = new XMLHttpRequest();
        if (jB.count(params.data) > 0) {
            // set post request with data
            xhr.open('POST', realCallPath + params.call, true);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(jB.param(params.data));
        }
        else {
            xhr.open('GET', realCallPath + params.call, true);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.send();
        }

        var send_time = Date.now();
        jB.wait({
            sync_function: function () {
                return xhr.readyState === 4;
            },
            sync_clock: 50,
            timeout: params.timeout,
            silent_mode: true,
            done_callback: function () {
                response.status = xhr.status;
                response.elapsedTime = (Date.now() - send_time) / 1000;
                // check for login redirection
                if (xhr.responseURL === jB.siteUrl('admin/users/login')) {
                    response.status = 406;
                    response.msg = "The session has been expired, please reload the page.";
                    if (!params.silent_mode) {
                        //bootbox.alert('The session has been expired, please reload the page.');
                        //alert('The session has been expired, please reload the page.');
                        console.log('Core_util.fetch ' + response.status + ' (Redirect) response from ' + params.call + ' after ' + response.elapsedTime.toFixed(2) + 's');
                    }
                    params.callback(response);
                    return;
                }

                //try to parse JSON response
                try {
                    response.response = JSON.parse(xhr.responseText);
                }
                catch (e) {
                    response.status = 406;
                    if (!params.silent_mode) {
                        console.log('Core_util.fetch ' + response.status + ' (Not Acceptable) response from ' + params.call + ' after ' + response.elapsedTime.toFixed(2) + 's');
                    }
                    params.callback(response);
                    return;
                }

                if (!params.silent_mode) {
                    console.log('Core_util.fetch ' + response.status + ' response from ' + params.call + ' after ' + response.elapsedTime.toFixed(2) + 's');
                }

                params.callback(response);
            },
            timeout_callback: function () {
                if (!params.silent_mode) {
                    console.log('Core_util.fetch ' + response.status + '(Timeout) response from ' + params.call + ' after ' + params.timeout.toFixed(2) + 's');
                }
                xhr.abort();
                response.status = 504;
                params.callback(response);
            }
        });
    };

    _jB.prototype.wait = function (para) {
        var default_params = {
            sync_name: '',
            sync_clock: 250,
            sync_function: function () {
                return false;
            },
            timeout: false,
            silent_mode: false,
            done_callback: function () {
                if (!jB.config.silentMode) {
                    console.warn("No wait-done_callback defined");
                }
            },
            timeout_callback: function () {
            },
            clock_callback: function () {
            }
        };
        var params = jB.extend({}, default_params, para);
        var start_time = Date.now();

        var clockInterval, timeoutTimer;

        clockInterval = setInterval(function () {
            routine();
        }, params.sync_clock);


        if (params.timeout !== false && params.timeout > 0) {
            timeoutTimer = setInterval(function () {
                clearInterval(clockInterval);
                if (!params.silent_mode) {
                    console.log('Core_util.busy_waiting action (' + params.sync_name + ') timeout');
                }
                params.timeout_callback();
            }, params.timeout);
        }

        var routine = function () {
            if (params.sync_function() !== false) {
                clearInterval(clockInterval);
                if (params.timeout === false || params.timeout <= 0) {
                    clearTimeout(timeoutTimer);
                }
                if (!params.silent_mode) {
                    var elapsed_time = (Date.now() - start_time) / 1000;
                    console.log('Core_util.busy_waiting action (' + params.sync_name + ') done after ' + elapsed_time.toFixed(2) + 's');
                }
                params.done_callback();
                return;
            }

            params.clock_callback();
        };
    };

    _jB.prototype.segment = function (index) {
        if (index <= 0) {
            if (!this.config.silentMode) {
                console.warn("Invalid index");
            }
            return null;
        }

        var currentUrl = window.location.href;
        //rempve character # at the end of the url
        if (currentUrl.match(/^[\w\:\/\.]+$/) === null) {
            if (!this.config.silentMode) {
                console.warn("Current Url contains strange symbol");
            }
            currentUrl = currentUrl.match(/^([\w\:\/\.]+)/)[1];
        }



        var sCount = 0;
        var segments = currentUrl.replace(this.baseUrl(), "").split('/');
        for (var i = 0; i < segments.length; i++) {
            if (segments[i].length <= 0) {
                continue;
            }
            if (sCount >= index - 1) {
                return segments[i];
            }
            sCount++;
        }
        if (!this.config.silentMode) {
            console.warn("Invalid segment index, " + segments.length + "/" + index);
        }
        return null;
    };

    _jB.prototype.baseUrl = function (url) {
        var baseRegex = new RegExp("(.*\/+" + this.config.segmentBaseRoot + ")\/+");
        var homePath = window.location.href.match(baseRegex)[1];
        if (homePath === null && !this.config.silentMode) {
            console.warn("Empty Base Url, please check 'config.segmentUrlRoot'");
        }
        if (url !== undefined) {
            homePath += (url.indexOf('/') !== 0 ? '/' : '') + url;
        }
        return homePath;
    };

    _jB.prototype.siteUrl = function (url) {
        var baseRegex = new RegExp("(.*\/+" + this.config.segmentSiteRoot + ")\/+");
        var homePath = window.location.href.match(baseRegex)[1];
        if (homePath === null && !this.config.silentMode) {
            console.warn("Empty Base Url, please check 'config.segmentUrlRoot'");
        }
        if (url !== undefined) {
            homePath += (url.indexOf('/') !== 0 ? '/' : '') + url;
        }
        return homePath;
    };
    
    _jB.prototype.fDate = function (format, date) {
        if (date === undefined) {
            date = new Date();
        }
        var year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate();

        var formatted_date = format.replace('d', day > 9 ? day : ('0' + day));
        formatted_date = formatted_date.replace('m', month > 9 ? month : ('0' + month));
        formatted_date = formatted_date.replace('Y', year);

        return formatted_date;
    },

    window.jB = new _jB();


})();


