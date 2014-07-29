/*!
 Autosize v1.18.4 - 2014-01-11
 Automatically adjust textarea height based on user input.
 (c) 2014 Jack Moore - http://www.jacklmoore.com/autosize
 license: http://www.opensource.org/licenses/mit-license.php
 */
(function ($) {
    var
        defaults = {
            className: 'autosizejs',
            append: '',
            callback: false,
            resizeDelay: 10,
            placeholder: true
        },

    // border:0 is unnecessary, but avoids a bug in Firefox on OSX
        copy = '<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',

    // line-height is conditionally included because IE7/IE8/old Opera do not return the correct value.
        typographyStyles = [
            'fontFamily',
            'fontSize',
            'fontWeight',
            'fontStyle',
            'letterSpacing',
            'textTransform',
            'wordSpacing',
            'textIndent'
        ],

    // to keep track which textarea is being mirrored when adjust() is called.
        mirrored,

    // the mirror element, which is used to calculate what size the mirrored element should be.
        mirror = $(copy).data('autosize', true)[0];

    // test that line-height can be accurately copied.
    mirror.style.lineHeight = '99px';
    if ($(mirror).css('lineHeight') === '99px') {
        typographyStyles.push('lineHeight');
    }
    mirror.style.lineHeight = '';

    $.fn.autosize = function (options) {
        if (!this.length) {
            return this;
        }

        options = $.extend({}, defaults, options || {});

        if (mirror.parentNode !== document.body) {
            $(document.body).append(mirror);
        }

        return this.each(function () {
            var
                ta = this,
                $ta = $(ta),
                maxHeight,
                minHeight,
                boxOffset = 0,
                callback = $.isFunction(options.callback),
                originalStyles = {
                    height: ta.style.height,
                    overflow: ta.style.overflow,
                    overflowY: ta.style.overflowY,
                    wordWrap: ta.style.wordWrap,
                    resize: ta.style.resize
                },
                timeout,
                width = $ta.width();

            if ($ta.data('autosize')) {
                // exit if autosize has already been applied, or if the textarea is the mirror element.
                return;
            }
            $ta.data('autosize', true);

            if ($ta.css('box-sizing') === 'border-box' || $ta.css('-moz-box-sizing') === 'border-box' || $ta.css('-webkit-box-sizing') === 'border-box'){
                boxOffset = $ta.outerHeight() - $ta.height();
            }

            // IE8 and lower return 'auto', which parses to NaN, if no min-height is set.
            minHeight = Math.max(parseInt($ta.css('minHeight'), 10) - boxOffset || 0, $ta.height());

            $ta.css({
                overflow: 'hidden',
                overflowY: 'hidden',
                wordWrap: 'break-word', // horizontal overflow is hidden, so break-word is necessary for handling words longer than the textarea width
                resize: ($ta.css('resize') === 'none' || $ta.css('resize') === 'vertical') ? 'none' : 'horizontal'
            });

            // The mirror width must exactly match the textarea width, so using getBoundingClientRect because it doesn't round the sub-pixel value.
            // window.getComputedStyle, getBoundingClientRect returning a width are unsupported, but also unneeded in IE8 and lower.
            function setWidth() {
                var width;
                var style = window.getComputedStyle ? window.getComputedStyle(ta, null) : false;

                if (style) {

                    width = ta.getBoundingClientRect().width;

                    if (width === 0) {
                        width = parseInt(style.width,10);
                    }

                    $.each(['paddingLeft', 'paddingRight', 'borderLeftWidth', 'borderRightWidth'], function(i,val){
                        width -= parseInt(style[val],10);
                    });
                } else {
                    width = Math.max($ta.width(), 0);
                }

                mirror.style.width = width + 'px';
            }

            function initMirror() {
                var styles = {};

                mirrored = ta;
                mirror.className = options.className;
                maxHeight = parseInt($ta.css('maxHeight'), 10);

                // mirror is a duplicate textarea located off-screen that
                // is automatically updated to contain the same text as the
                // original textarea.  mirror always has a height of 0.
                // This gives a cross-browser supported way getting the actual
                // height of the text, through the scrollTop property.
                $.each(typographyStyles, function(i,val){
                    styles[val] = $ta.css(val);
                });
                $(mirror).css(styles);

                setWidth();

                // Chrome-specific fix:
                // When the textarea y-overflow is hidden, Chrome doesn't reflow the text to account for the space
                // made available by removing the scrollbar. This workaround triggers the reflow for Chrome.
                if (window.chrome) {
                    var width = ta.style.width;
                    ta.style.width = '0px';
                    var ignore = ta.offsetWidth;
                    ta.style.width = width;
                }
            }

            // Using mainly bare JS in this function because it is going
            // to fire very often while typing, and needs to very efficient.
            function adjust() {
                var height, original;

                if (mirrored !== ta) {
                    initMirror();
                } else {
                    setWidth();
                }

                if (!ta.value && options.placeholder) {
                    // If the textarea is empty, copy the placeholder text into
                    // the mirror control and use that for sizing so that we
                    // don't end up with placeholder getting trimmed.
                    mirror.value = ($(ta).attr("placeholder") || '') + options.append;
                } else {
                    mirror.value = ta.value + options.append;
                }

                mirror.style.overflowY = ta.style.overflowY;
                original = parseInt(ta.style.height,10);

                // Setting scrollTop to zero is needed in IE8 and lower for the next step to be accurately applied
                mirror.scrollTop = 0;

                mirror.scrollTop = 9e4;

                // Using scrollTop rather than scrollHeight because scrollHeight is non-standard and includes padding.
                height = mirror.scrollTop;

                if (maxHeight && height > maxHeight) {
                    ta.style.overflowY = 'scroll';
                    height = maxHeight;
                } else {
                    ta.style.overflowY = 'hidden';
                    if (height < minHeight) {
                        height = minHeight;
                    }
                }

                height += boxOffset;

                if (original !== height) {
                    ta.style.height = height + 'px';
                    if (callback) {
                        options.callback.call(ta,ta);
                    }
                }
            }

            function resize () {
                clearTimeout(timeout);
                timeout = setTimeout(function(){
                    var newWidth = $ta.width();

                    if (newWidth !== width) {
                        width = newWidth;
                        adjust();
                    }
                }, parseInt(options.resizeDelay,10));
            }

            if ('onpropertychange' in ta) {
                if ('oninput' in ta) {
                    // Detects IE9.  IE9 does not fire onpropertychange or oninput for deletions,
                    // so binding to onkeyup to catch most of those occasions.  There is no way that I
                    // know of to detect something like 'cut' in IE9.
                    $ta.on('input.autosize keyup.autosize', adjust);
                } else {
                    // IE7 / IE8
                    $ta.on('propertychange.autosize', function(){
                        if(event.propertyName === 'value'){
                            adjust();
                        }
                    });
                }
            } else {
                // Modern Browsers
                $ta.on('input.autosize', adjust);
            }

            // Set options.resizeDelay to false if using fixed-width textarea elements.
            // Uses a timeout and width check to reduce the amount of times adjust needs to be called after window resize.

            if (options.resizeDelay !== false) {
                $(window).on('resize.autosize', resize);
            }

            // Event for manual triggering if needed.
            // Should only be needed when the value of the textarea is changed through JavaScript rather than user input.
            $ta.on('autosize.resize', adjust);

            // Event for manual triggering that also forces the styles to update as well.
            // Should only be needed if one of typography styles of the textarea change, and the textarea is already the target of the adjust method.
            $ta.on('autosize.resizeIncludeStyle', function() {
                mirrored = null;
                adjust();
            });

            $ta.on('autosize.destroy', function(){
                mirrored = null;
                clearTimeout(timeout);
                $(window).off('resize', resize);
                $ta
                    .off('autosize')
                    .off('.autosize')
                    .css(originalStyles)
                    .removeData('autosize');
            });

            // Call adjust in case the textarea already contains text.
            adjust();
        });
    };
}(window.jQuery || window.$));

/**
 *
 * jquery.charcounter.js version 1.2
 * requires jQuery version 1.2 or higher
 * Copyright (c) 2007 Tom Deater (http://www.tomdeater.com)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

(function($) {
    /**
     * attaches a character counter to each textarea element in the jQuery object
     * usage: $("#myTextArea").charCounter(max, settings);
     */

    $.fn.charCounter = function (max, settings) {
        max = max || 100;
        settings = $.extend({
            container: "<span></span>",
            classname: "charcounter",
            format: "(%1 characters remaining)",
            pulse: true,
            delay: 0
        }, settings);
        var p, timeout;

        function count(el, container) {
            el = $(el);
            if (el.val().length > max) {
                el.val(el.val().substring(0, max));
                if (settings.pulse && !p) {
                    pulse(container, true);
                };
            };
            if (settings.delay > 0) {
                if (timeout) {
                    window.clearTimeout(timeout);
                }
                timeout = window.setTimeout(function () {
                    container.html(settings.format.replace(/%1/, (max - el.val().length)));
                }, settings.delay);
            } else {
                container.html(settings.format.replace(/%1/, (max - el.val().length)));
            }
        };

        function pulse(el, again) {
            if (p) {
                window.clearTimeout(p);
                p = null;
            };
            el.animate({ opacity: 0.1 }, 100, function () {
                $(this).animate({ opacity: 1.0 }, 100);
            });
            if (again) {
                p = window.setTimeout(function () { pulse(el) }, 200);
            };
        };

        return this.each(function () {
            var container;
            if (!settings.container.match(/^<.+>$/)) {
                // use existing element to hold counter message
                container = $(settings.container);
            } else {
                // append element to hold counter message (clean up old element first)
                $(this).next("." + settings.classname).remove();
                container = $(settings.container)
                    .insertAfter(this)
                    .addClass(settings.classname);
            }
            $(this)
                .unbind(".charCounter")
                .bind("keydown.charCounter", function () { count(this, container); })
                .bind("keypress.charCounter", function () { count(this, container); })
                .bind("keyup.charCounter", function () { count(this, container); })
                .bind("focus.charCounter", function () { count(this, container); })
                .bind("mouseover.charCounter", function () { count(this, container); })
                .bind("mouseout.charCounter", function () { count(this, container); })
                .bind("paste.charCounter", function () {
                    var me = this;
                    setTimeout(function () { count(me, container); }, 10);
                });
            if (this.addEventListener) {
                this.addEventListener('input', function () { count(this, container); }, false);
            };
            count(this, container);
        });
    };

})(jQuery);

/* ===================================================
 * tagmanager.js v3.0.1
 * http://welldonethings.com/tags/manager
 * ===================================================
 * Copyright 2012 Max Favilli
 *
 * Licensed under the Mozilla Public License, Version 2.0 You may not use this work except in compliance with the License.
 *
 * http://www.mozilla.org/MPL/2.0/
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
(function($) {

    "use strict";

    var defaults = {
            prefilled: null,
            CapitalizeFirstLetter: false,
            preventSubmitOnEnter: true,     // deprecated
            isClearInputOnEsc: true,        // deprecated
            externalTagId: false,
            prefillIdFieldName: 'Id',
            prefillValueFieldName: 'Value',
            AjaxPush: null,
            AjaxPushAllTags: null,
            AjaxPushParameters: null,
            delimiters: [9, 13, 44],        // tab, enter, comma
            backspace: [8],
            maxTags: 0,
            hiddenTagListName: null,        // deprecated
            hiddenTagListId: null,          // deprecated
            replace: true,
            output: null,
            deleteTagsOnBackspace: true,    // deprecated
            tagsContainer: null,
            tagCloseIcon: 'x',
            tagClass: '',
            validator: null,
            onlyTagList: false,
            tagList: null,
            fillInputOnTagRemove: false,
        },

        publicMethods = {
            pushTag : function (tag, ignoreEvents, externalTagId) {
                var $self = $(this), opts = $self.data('opts'), alreadyInList, tlisLowerCase, max, tagId,
                    tlis = $self.data("tlis"), tlid = $self.data("tlid"), idx, newTagId, newTagRemoveId, escaped,
                    html, $el, lastTagId, lastTagObj;

                tag = privateMethods.trimTag(tag, opts.delimiterChars);

                if (!tag || tag.length <= 0) { return; }

                // check if restricted only to the tagList suggestions
                if (opts.onlyTagList && undefined !== opts.tagList ){

                    //if the list has been updated by look pushed tag in the tagList. if not found return
                    if (opts.tagList){
                        var $tagList = opts.tagList;

                        // change each array item to lower case
                        $.each($tagList, function(index, item) {
                            $tagList[index] = item.toLowerCase();
                        });
                        var suggestion = $.inArray(tag.toLowerCase(), $tagList);

                        if ( -1 === suggestion ) {
                            //console.log("tag:" + tag + " not in tagList, not adding it");
                            return;
                        }
                    }

                }

                if (opts.CapitalizeFirstLetter && tag.length > 1) {
                    tag = tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
                }

                // call the validator (if any) and do not let the tag pass if invalid
                if (opts.validator && !opts.validator(tag)) { return; }

                // dont accept new tags beyond the defined maximum
                if (opts.maxTags > 0 && tlis.length >= opts.maxTags) { return; }

                alreadyInList = false;
                //use jQuery.map to make this work in IE8 (pure JS map is JS 1.6 but IE8 only supports JS 1.5)
                tlisLowerCase = jQuery.map(tlis, function(elem) {
                    return elem.toLowerCase();
                });

                idx = $.inArray(tag.toLowerCase(), tlisLowerCase);

                if (-1 !== idx) {
                    // console.log("tag:" + tag + " !!already in list!!");
                    alreadyInList = true;
                }

                if (alreadyInList) {
                    $self.trigger('tm:duplicated', tag);
                    $("#" + $self.data("tm_rndid") + "_" + tlid[idx]).stop()
                        .animate({backgroundColor: opts.blinkBGColor_1}, 100)
                        .animate({backgroundColor: opts.blinkBGColor_2}, 100)
                        .animate({backgroundColor: opts.blinkBGColor_1}, 100)
                        .animate({backgroundColor: opts.blinkBGColor_2}, 100)
                        .animate({backgroundColor: opts.blinkBGColor_1}, 100)
                        .animate({backgroundColor: opts.blinkBGColor_2}, 100);
                } else {
                    if (opts.externalTagId === true) {
                        if (externalTagId === undefined) {
                            $.error('externalTagId is not passed for tag -' + tag);
                        }
                        tagId = externalTagId;
                    } else {
                        max = Math.max.apply(null, tlid);
                        max = max === -Infinity ? 0 : max;

                        tagId = ++max;
                    }
                    if (!ignoreEvents) { $self.trigger('tm:pushing', [tag, tagId]); }
                    tlis.push(tag);
                    tlid.push(tagId);

                    if (!ignoreEvents)
                        if (opts.AjaxPush !== null && opts.AjaxPushAllTags == null) {
                            if ($.inArray(tag, opts.prefilled) === -1) {
                                $.post(opts.AjaxPush, $.extend({tag: tag}, opts.AjaxPushParameters));
                            }
                        }

                    // console.log("tagList: " + tlis);

                    newTagId = $self.data("tm_rndid") + '_' + tagId;
                    newTagRemoveId = $self.data("tm_rndid") + '_Remover_' + tagId;
                    escaped = $("<span/>").text(tag).html();

                    html = '<span class="' + privateMethods.tagClasses.call($self) + '" id="' + newTagId + '">';
                    html+= '<span>' + escaped + '</span>';
                    html+= '<a href="#" class="tm-tag-remove" id="' + newTagRemoveId + '" TagIdToRemove="' + tagId + '">';
                    html+= opts.tagCloseIcon + '</a></span> ';
                    $el = $(html);

                    if (opts.tagsContainer !== null) {
                        $(opts.tagsContainer).append($el);
                    } else {
                        if (tlid.length > 1) {
                            lastTagObj = $("#" + $self.data("tm_rndid") + "_" + tlid[tlid.length - 2]);
                            lastTagObj.after($el);
                        } else {
                            $self.before($el);
                        }
                    }

                    $el.find("#" + newTagRemoveId).on("click", $self, function(e) {
                        e.preventDefault();
                        var TagIdToRemove = parseInt($(this).attr("TagIdToRemove"));
                        privateMethods.spliceTag.call($self, TagIdToRemove, e.data);
                    });

                    privateMethods.refreshHiddenTagList.call($self);

                    if (!ignoreEvents) { $self.trigger('tm:pushed', [tag, tagId]); }

                    privateMethods.showOrHide.call($self);
                    //if (tagManagerOptions.maxTags > 0 && tlis.length >= tagManagerOptions.maxTags) {
                    //  obj.hide();
                    //}
                }
                $self.val("");
            },

            popTag : function () {
                var $self = $(this), tagId, tagBeingRemoved,
                    tlis = $self.data("tlis"),
                    tlid = $self.data("tlid");

                if (tlid.length > 0) {
                    tagId = tlid.pop();

                    tagBeingRemoved = tlis[tlis.length - 1];
                    $self.trigger('tm:popping', [tagBeingRemoved, tagId]);
                    tlis.pop();

                    // console.log("TagIdToRemove: " + tagId);
                    $("#" + $self.data("tm_rndid") + "_" + tagId).remove();
                    privateMethods.refreshHiddenTagList.call($self);
                    $self.trigger('tm:popped', [tagBeingRemoved, tagId]);
                    // console.log(tlis);
                }
            },

            empty : function() {
                var $self = $(this), tlis = $self.data("tlis"), tlid = $self.data("tlid"), tagId;

                while (tlid.length > 0) {
                    tagId = tlid.pop();
                    tlis.pop();
                    // console.log("TagIdToRemove: " + tagId);
                    $("#" + $self.data("tm_rndid") + "_" + tagId).remove();
                    privateMethods.refreshHiddenTagList.call($self);
                    // console.log(tlis);
                }
                $self.trigger('tm:emptied', null);

                privateMethods.showOrHide.call($self);
                //if (tagManagerOptions.maxTags > 0 && tlis.length < tagManagerOptions.maxTags) {
                //  obj.show();
                //}
            },

            tags : function() {
                var $self = this, tlis = $self.data("tlis");
                return tlis;
            }
        },

        privateMethods = {
            showOrHide : function () {
                var $self = this, opts = $self.data('opts'), tlis = $self.data("tlis");

                if (opts.maxTags > 0 && tlis.length < opts.maxTags) {
                    $self.show();
                    $self.trigger('tm:show');
                }

                if (opts.maxTags > 0 && tlis.length >= opts.maxTags) {
                    $self.hide();
                    $self.trigger('tm:hide');
                }
            },

            tagClasses : function () {
                var $self = $(this), opts = $self.data('opts'), tagBaseClass = opts.tagBaseClass,
                    inputBaseClass = opts.inputBaseClass, cl;
                // 1) default class (tm-tag)
                cl = tagBaseClass;
                // 2) interpolate from input class: tm-input-xxx --> tm-tag-xxx
                if ($self.attr('class')) {
                    $.each($self.attr('class').split(' '), function (index, value) {
                        if (value.indexOf(inputBaseClass + '-') !== -1) {
                            cl += ' ' + tagBaseClass + value.substring(inputBaseClass.length);
                        }
                    });
                }
                // 3) tags from tagClass option
                cl += (opts.tagClass ? ' ' + opts.tagClass : '');
                return cl;
            },

            trimTag : function (tag, delimiterChars) {
                var i;
                tag = $.trim(tag);
                // truncate at the first delimiter char
                i = 0;
                for (i; i < tag.length; i++) {
                    if ($.inArray(tag.charCodeAt(i), delimiterChars) !== -1) { break; }
                }
                return tag.substring(0, i);
            },

            refreshHiddenTagList : function () {
                var $self = $(this), tlis = $self.data("tlis"), lhiddenTagList = $self.data("lhiddenTagList");

                if (lhiddenTagList) {
                    $(lhiddenTagList).val(tlis.join($self.data('opts').baseDelimiter)).change();
                }

                $self.trigger('tm:refresh', tlis.join($self.data('opts').baseDelimiter));
            },

            killEvent : function (e) {
                e.cancelBubble = true;
                e.returnValue = false;
                e.stopPropagation();
                e.preventDefault();
            },

            keyInArray : function (e, ary) {
                return $.inArray(e.which, ary) !== -1;
            },

            applyDelimiter : function (e) {
                var $self = $(this);
                publicMethods.pushTag.call($self,$(this).val());
                e.preventDefault();
            },

            prefill: function (pta) {
                var $self = $(this);
                var opts = $self.data('opts')
                $.each(pta, function (key, val) {
                    if (opts.externalTagId === true) {
                        publicMethods.pushTag.call($self, val[opts.prefillValueFieldName], true, val[opts.prefillIdFieldName]);
                    } else {
                        publicMethods.pushTag.call($self, val, true);
                    }
                });
            },

            pushAllTags : function (e, tag) {
                var $self = $(this), opts = $self.data('opts'), tlis = $self.data("tlis");
                if (opts.AjaxPushAllTags) {
                    if (e.type !== 'tm:pushed' || $.inArray(tag, opts.prefilled) === -1) {
                        $.post(opts.AjaxPush, $.extend({ tags: tlis.join(opts.baseDelimiter) }, opts.AjaxPushParameters));
                    }
                }
            },

            spliceTag : function (tagId) {
                var $self = this, tlis = $self.data("tlis"), tlid = $self.data("tlid"), idx = $.inArray(tagId, tlid),
                    tagBeingRemoved;

                // console.log("TagIdToRemove: " + tagId);
                // console.log("position: " + idx);

                if (-1 !== idx) {
                    tagBeingRemoved = tlis[idx];
                    $self.trigger('tm:splicing', [tagBeingRemoved, tagId]);
                    $("#" + $self.data("tm_rndid") + "_" + tagId).remove();
                    tlis.splice(idx, 1);
                    tlid.splice(idx, 1);
                    privateMethods.refreshHiddenTagList.call($self);
                    $self.trigger('tm:spliced', [tagBeingRemoved, tagId]);
                    // console.log(tlis);
                }

                privateMethods.showOrHide.call($self);
                //if (tagManagerOptions.maxTags > 0 && tlis.length < tagManagerOptions.maxTags) {
                //  obj.show();
                //}
            },

            init : function (options) {
                var opts = $.extend({}, defaults, options), delimiters, keyNums;

                opts.hiddenTagListName = (opts.hiddenTagListName === null)
                    ? 'hidden-' + this.attr('name')
                    : opts.hiddenTagListName;

                delimiters = opts.delimeters || opts.delimiters; // 'delimeter' is deprecated
                keyNums = [9, 13, 17, 18, 19, 37, 38, 39, 40]; // delimiter values to be handled as key codes
                opts.delimiterChars = [];
                opts.delimiterKeys = [];

                $.each(delimiters, function (i, v) {
                    if ($.inArray(v, keyNums) !== -1) {
                        opts.delimiterKeys.push(v);
                    } else {
                        opts.delimiterChars.push(v);
                    }
                });

                opts.baseDelimiter = String.fromCharCode(opts.delimiterChars[0] || 44);
                opts.tagBaseClass = 'tm-tag';
                opts.inputBaseClass = 'tm-input';

                if (!$.isFunction(opts.validator)) { opts.validator = null; }

                this.each(function() {
                    var $self = $(this), hiddenObj ='', rndid ='', albet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

                    // prevent double-initialization of TagManager
                    if ($self.data('tagManager')) { return false; }
                    $self.data('tagManager', true);

                    for (var i = 0; i < 5; i++) {
                        rndid += albet.charAt(Math.floor(Math.random() * albet.length));
                    }

                    $self.data("tm_rndid", rndid);

                    // store instance-specific data in the DOM object
                    $self.data('opts',opts)
                        .data('tlis', []) //list of string tags
                        .data('tlid', []); //list of ID of the string tags

                    if (opts.output === null) {
                        hiddenObj = $('<input/>', {
                            type: 'hidden',
                            name: opts.hiddenTagListName
                        });
                        $self.after(hiddenObj);
                        $self.data("lhiddenTagList", hiddenObj);
                    } else {
                        $self.data("lhiddenTagList", $(opts.output));
                    }

                    if (opts.AjaxPushAllTags) {
                        $self.on('tm:spliced', privateMethods.pushAllTags);
                        $self.on('tm:popped', privateMethods.pushAllTags);
                        $self.on('tm:pushed', privateMethods.pushAllTags);
                    }

                    // hide popovers on focus and keypress events
                    $self.on('focus keypress', function(e) {
                        if ($(this).popover) { $(this).popover('hide'); }
                    });

                    // handle ESC (keyup used for browser compatibility)
                    if (opts.isClearInputOnEsc) {
                        $self.on('keyup', function(e) {
                            if (e.which === 27) {
                                // console.log('esc detected');
                                $(this).val('');
                                privateMethods.killEvent(e);
                            }
                        });
                    }

                    $self.on('keypress', function(e) {
                        // push ASCII-based delimiters
                        if (privateMethods.keyInArray(e, opts.delimiterChars)) {
                            privateMethods.applyDelimiter.call($self, e);
                        }
                    });

                    $self.on('keydown', function(e) {
                        // disable ENTER
                        if (e.which === 13) {
                            if (opts.preventSubmitOnEnter) {
                                privateMethods.killEvent(e);
                            }
                        }

                        // push key-based delimiters (includes <enter> by default)
                        if (privateMethods.keyInArray(e, opts.delimiterKeys)) {
                            privateMethods.applyDelimiter.call($self, e);
                        }
                    });

                    // BACKSPACE (keydown used for browser compatibility)
                    if (opts.deleteTagsOnBackspace) {
                        $self.on('keydown', function(e) {
                            if (privateMethods.keyInArray(e, opts.backspace)) {
                                // console.log("backspace detected");
                                if ($(this).val().length <= 0) {
                                    publicMethods.popTag.call($self);
                                    privateMethods.killEvent(e);
                                }
                            }
                        });
                    }

                    // on tag pop fill back the tag's content to the input field
                    if (opts.fillInputOnTagRemove) {
                        $self.on('tm:popped', function(e, tag) {
                            $(this).val(tag);
                        });
                    }

                    $self.change(function(e) {
                        if (!/webkit/.test(navigator.userAgent.toLowerCase())) {
                            $self.focus();
                        } // why?

                        /* unimplemented mode to push tag on blur
                         else if (tagManagerOptions.pushTagOnBlur) {
                         console.log('change: pushTagOnBlur ' + tag);
                         pushTag($(this).val());
                         } */
                        privateMethods.killEvent(e);
                    });

                    if (opts.prefilled !== null) {
                        if (typeof (opts.prefilled) === "object") {
                            privateMethods.prefill.call($self, opts.prefilled);
                        } else if (typeof (opts.prefilled) === "string") {
                            privateMethods.prefill.call($self, opts.prefilled.split(opts.baseDelimiter));
                        } else if (typeof (opts.prefilled) === "function") {
                            privateMethods.prefill.call($self, opts.prefilled());
                        }
                    } else if (opts.output !== null) {
                        if ($(opts.output) && $(opts.output).val()) { var existing_tags = $(opts.output); }
                        privateMethods.prefill.call($self,$(opts.output).val().split(opts.baseDelimiter));
                    }

                });

                return this;
            }
        };

    $.fn.tagsManager = function(method) {
        var $self = $(this);

        if (!(0 in this)) { return this; }

        if ( publicMethods[method] ) {
            return publicMethods[method].apply( $self, Array.prototype.slice.call(arguments, 1) );
        } else if ( typeof method === 'object' || ! method ) {
            return privateMethods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist.' );
            return false;
        }
    };

}(jQuery));

/* =========================================================
 * bootstrap-datepicker.js
 * Repo: https://github.com/eternicode/bootstrap-datepicker/
 * Demo: http://eternicode.github.io/bootstrap-datepicker/
 * Docs: http://bootstrap-datepicker.readthedocs.org/
 * Forked from http://www.eyecon.ro/bootstrap-datepicker
 * =========================================================
 * Started by Stefan Petre; improvements by Andrew Rowls + contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

(function($, undefined){

    var $window = $(window);

    function UTCDate(){
        return new Date(Date.UTC.apply(Date, arguments));
    }
    function UTCToday(){
        var today = new Date();
        return UTCDate(today.getFullYear(), today.getMonth(), today.getDate());
    }
    function alias(method){
        return function(){
            return this[method].apply(this, arguments);
        };
    }

    var DateArray = (function(){
        var extras = {
            get: function(i){
                return this.slice(i)[0];
            },
            contains: function(d){
                // Array.indexOf is not cross-browser;
                // $.inArray doesn't work with Dates
                var val = d && d.valueOf();
                for (var i=0, l=this.length; i < l; i++)
                    if (this[i].valueOf() === val)
                        return i;
                return -1;
            },
            remove: function(i){
                this.splice(i,1);
            },
            replace: function(new_array){
                if (!new_array)
                    return;
                if (!$.isArray(new_array))
                    new_array = [new_array];
                this.clear();
                this.push.apply(this, new_array);
            },
            clear: function(){
                this.length = 0;
            },
            copy: function(){
                var a = new DateArray();
                a.replace(this);
                return a;
            }
        };

        return function(){
            var a = [];
            a.push.apply(a, arguments);
            $.extend(a, extras);
            return a;
        };
    })();


    // Picker object

    var Datepicker = function(element, options){
        this.dates = new DateArray();
        this.viewDate = UTCToday();
        this.focusDate = null;

        this._process_options(options);

        this.element = $(element);
        this.isInline = false;
        this.isInput = this.element.is('input');
        this.component = this.element.is('.date') ? this.element.find('.add-on, .input-group-addon, .btn') : false;
        this.hasInput = this.component && this.element.find('input').length;
        if (this.component && this.component.length === 0)
            this.component = false;

        this.picker = $(DPGlobal.template);
        this._buildEvents();
        this._attachEvents();

        if (this.isInline){
            this.picker.addClass('datepicker-inline').appendTo(this.element);
        }
        else {
            this.picker.addClass('datepicker-dropdown dropdown-menu');
        }

        if (this.o.rtl){
            this.picker.addClass('datepicker-rtl');
        }

        this.viewMode = this.o.startView;

        if (this.o.calendarWeeks)
            this.picker.find('tfoot th.today')
                .attr('colspan', function(i, val){
                    return parseInt(val) + 1;
                });

        this._allow_update = false;

        this.setStartDate(this._o.startDate);
        this.setEndDate(this._o.endDate);
        this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled);

        this.fillDow();
        this.fillMonths();

        this._allow_update = true;

        this.update();
        this.showMode();

        if (this.isInline){
            this.show();
        }
    };

    Datepicker.prototype = {
        constructor: Datepicker,

        _process_options: function(opts){
            // Store raw options for reference
            this._o = $.extend({}, this._o, opts);
            // Processed options
            var o = this.o = $.extend({}, this._o);

            // Check if "de-DE" style date is available, if not language should
            // fallback to 2 letter code eg "de"
            var lang = o.language;
            if (!dates[lang]){
                lang = lang.split('-')[0];
                if (!dates[lang])
                    lang = defaults.language;
            }
            o.language = lang;

            switch (o.startView){
                case 2:
                case 'decade':
                    o.startView = 2;
                    break;
                case 1:
                case 'year':
                    o.startView = 1;
                    break;
                default:
                    o.startView = 0;
            }

            switch (o.minViewMode){
                case 1:
                case 'months':
                    o.minViewMode = 1;
                    break;
                case 2:
                case 'years':
                    o.minViewMode = 2;
                    break;
                default:
                    o.minViewMode = 0;
            }

            o.startView = Math.max(o.startView, o.minViewMode);

            // true, false, or Number > 0
            if (o.multidate !== true){
                o.multidate = Number(o.multidate) || false;
                if (o.multidate !== false)
                    o.multidate = Math.max(0, o.multidate);
                else
                    o.multidate = 1;
            }
            o.multidateSeparator = String(o.multidateSeparator);

            o.weekStart %= 7;
            o.weekEnd = ((o.weekStart + 6) % 7);

            var format = DPGlobal.parseFormat(o.format);
            if (o.startDate !== -Infinity){
                if (!!o.startDate){
                    if (o.startDate instanceof Date)
                        o.startDate = this._local_to_utc(this._zero_time(o.startDate));
                    else
                        o.startDate = DPGlobal.parseDate(o.startDate, format, o.language);
                }
                else {
                    o.startDate = -Infinity;
                }
            }
            if (o.endDate !== Infinity){
                if (!!o.endDate){
                    if (o.endDate instanceof Date)
                        o.endDate = this._local_to_utc(this._zero_time(o.endDate));
                    else
                        o.endDate = DPGlobal.parseDate(o.endDate, format, o.language);
                }
                else {
                    o.endDate = Infinity;
                }
            }

            o.daysOfWeekDisabled = o.daysOfWeekDisabled||[];
            if (!$.isArray(o.daysOfWeekDisabled))
                o.daysOfWeekDisabled = o.daysOfWeekDisabled.split(/[,\s]*/);
            o.daysOfWeekDisabled = $.map(o.daysOfWeekDisabled, function(d){
                return parseInt(d, 10);
            });

            var plc = String(o.orientation).toLowerCase().split(/\s+/g),
                _plc = o.orientation.toLowerCase();
            plc = $.grep(plc, function(word){
                return (/^auto|left|right|top|bottom$/).test(word);
            });
            o.orientation = {x: 'auto', y: 'auto'};
            if (!_plc || _plc === 'auto')
                ; // no action
            else if (plc.length === 1){
                switch (plc[0]){
                    case 'top':
                    case 'bottom':
                        o.orientation.y = plc[0];
                        break;
                    case 'left':
                    case 'right':
                        o.orientation.x = plc[0];
                        break;
                }
            }
            else {
                _plc = $.grep(plc, function(word){
                    return (/^left|right$/).test(word);
                });
                o.orientation.x = _plc[0] || 'auto';

                _plc = $.grep(plc, function(word){
                    return (/^top|bottom$/).test(word);
                });
                o.orientation.y = _plc[0] || 'auto';
            }
        },
        _events: [],
        _secondaryEvents: [],
        _applyEvents: function(evs){
            for (var i=0, el, ch, ev; i < evs.length; i++){
                el = evs[i][0];
                if (evs[i].length === 2){
                    ch = undefined;
                    ev = evs[i][1];
                }
                else if (evs[i].length === 3){
                    ch = evs[i][1];
                    ev = evs[i][2];
                }
                el.on(ev, ch);
            }
        },
        _unapplyEvents: function(evs){
            for (var i=0, el, ev, ch; i < evs.length; i++){
                el = evs[i][0];
                if (evs[i].length === 2){
                    ch = undefined;
                    ev = evs[i][1];
                }
                else if (evs[i].length === 3){
                    ch = evs[i][1];
                    ev = evs[i][2];
                }
                el.off(ev, ch);
            }
        },
        _buildEvents: function(){
            if (this.isInput){ // single input
                this._events = [
                    [this.element, {
                        focus: $.proxy(this.show, this),
                        keyup: $.proxy(function(e){
                            if ($.inArray(e.keyCode, [27,37,39,38,40,32,13,9]) === -1)
                                this.update();
                        }, this),
                        keydown: $.proxy(this.keydown, this)
                    }]
                ];
            }
            else if (this.component && this.hasInput){ // component: input + button
                this._events = [
                    // For components that are not readonly, allow keyboard nav
                    [this.element.find('input'), {
                        focus: $.proxy(this.show, this),
                        keyup: $.proxy(function(e){
                            if ($.inArray(e.keyCode, [27,37,39,38,40,32,13,9]) === -1)
                                this.update();
                        }, this),
                        keydown: $.proxy(this.keydown, this)
                    }],
                    [this.component, {
                        click: $.proxy(this.show, this)
                    }]
                ];
            }
            else if (this.element.is('div')){  // inline datepicker
                this.isInline = true;
            }
            else {
                this._events = [
                    [this.element, {
                        click: $.proxy(this.show, this)
                    }]
                ];
            }
            this._events.push(
                // Component: listen for blur on element descendants
                [this.element, '*', {
                    blur: $.proxy(function(e){
                        this._focused_from = e.target;
                    }, this)
                }],
                // Input: listen for blur on element
                [this.element, {
                    blur: $.proxy(function(e){
                        this._focused_from = e.target;
                    }, this)
                }]
            );

            this._secondaryEvents = [
                [this.picker, {
                    click: $.proxy(this.click, this)
                }],
                [$(window), {
                    resize: $.proxy(this.place, this)
                }],
                [$(document), {
                    'mousedown touchstart': $.proxy(function(e){
                        // Clicked outside the datepicker, hide it
                        if (!(
                            this.element.is(e.target) ||
                            this.element.find(e.target).length ||
                            this.picker.is(e.target) ||
                            this.picker.find(e.target).length
                            )){
                            this.hide();
                        }
                    }, this)
                }]
            ];
        },
        _attachEvents: function(){
            this._detachEvents();
            this._applyEvents(this._events);
        },
        _detachEvents: function(){
            this._unapplyEvents(this._events);
        },
        _attachSecondaryEvents: function(){
            this._detachSecondaryEvents();
            this._applyEvents(this._secondaryEvents);
        },
        _detachSecondaryEvents: function(){
            this._unapplyEvents(this._secondaryEvents);
        },
        _trigger: function(event, altdate){
            var date = altdate || this.dates.get(-1),
                local_date = this._utc_to_local(date);

            this.element.trigger({
                type: event,
                date: local_date,
                dates: $.map(this.dates, this._utc_to_local),
                format: $.proxy(function(ix, format){
                    if (arguments.length === 0){
                        ix = this.dates.length - 1;
                        format = this.o.format;
                    }
                    else if (typeof ix === 'string'){
                        format = ix;
                        ix = this.dates.length - 1;
                    }
                    format = format || this.o.format;
                    var date = this.dates.get(ix);
                    return DPGlobal.formatDate(date, format, this.o.language);
                }, this)
            });
        },

        show: function(){
            if (!this.isInline)
                this.picker.appendTo('body');
            this.picker.show();
            this.place();
            this._attachSecondaryEvents();
            this._trigger('show');
        },

        hide: function(){
            if (this.isInline)
                return;
            if (!this.picker.is(':visible'))
                return;
            this.focusDate = null;
            this.picker.hide().detach();
            this._detachSecondaryEvents();
            this.viewMode = this.o.startView;
            this.showMode();

            if (
                this.o.forceParse &&
                (
                    this.isInput && this.element.val() ||
                    this.hasInput && this.element.find('input').val()
                    )
                )
                this.setValue();
            this._trigger('hide');
        },

        remove: function(){
            this.hide();
            this._detachEvents();
            this._detachSecondaryEvents();
            this.picker.remove();
            delete this.element.data().datepicker;
            if (!this.isInput){
                delete this.element.data().date;
            }
        },

        _utc_to_local: function(utc){
            return utc && new Date(utc.getTime() + (utc.getTimezoneOffset()*60000));
        },
        _local_to_utc: function(local){
            return local && new Date(local.getTime() - (local.getTimezoneOffset()*60000));
        },
        _zero_time: function(local){
            return local && new Date(local.getFullYear(), local.getMonth(), local.getDate());
        },
        _zero_utc_time: function(utc){
            return utc && new Date(Date.UTC(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate()));
        },

        getDates: function(){
            return $.map(this.dates, this._utc_to_local);
        },

        getUTCDates: function(){
            return $.map(this.dates, function(d){
                return new Date(d);
            });
        },

        getDate: function(){
            return this._utc_to_local(this.getUTCDate());
        },

        getUTCDate: function(){
            return new Date(this.dates.get(-1));
        },

        setDates: function(){
            var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
            this.update.apply(this, args);
            this._trigger('changeDate');
            this.setValue();
        },

        setUTCDates: function(){
            var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
            this.update.apply(this, $.map(args, this._utc_to_local));
            this._trigger('changeDate');
            this.setValue();
        },

        setDate: alias('setDates'),
        setUTCDate: alias('setUTCDates'),

        setValue: function(){
            var formatted = this.getFormattedDate();
            if (!this.isInput){
                if (this.component){
                    this.element.find('input').val(formatted).change();
                }
            }
            else {
                this.element.val(formatted).change();
            }
        },

        getFormattedDate: function(format){
            if (format === undefined)
                format = this.o.format;

            var lang = this.o.language;
            return $.map(this.dates, function(d){
                return DPGlobal.formatDate(d, format, lang);
            }).join(this.o.multidateSeparator);
        },

        setStartDate: function(startDate){
            this._process_options({startDate: startDate});
            this.update();
            this.updateNavArrows();
        },

        setEndDate: function(endDate){
            this._process_options({endDate: endDate});
            this.update();
            this.updateNavArrows();
        },

        setDaysOfWeekDisabled: function(daysOfWeekDisabled){
            this._process_options({daysOfWeekDisabled: daysOfWeekDisabled});
            this.update();
            this.updateNavArrows();
        },

        place: function(){
            if (this.isInline)
                return;
            var calendarWidth = this.picker.outerWidth(),
                calendarHeight = this.picker.outerHeight(),
                visualPadding = 10,
                windowWidth = $window.width(),
                windowHeight = $window.height(),
                scrollTop = $window.scrollTop();

            var zIndex = parseInt(this.element.parents().filter(function(){
                return $(this).css('z-index') !== 'auto';
            }).first().css('z-index'))+10;
            var offset = this.component ? this.component.parent().offset() : this.element.offset();
            var height = this.component ? this.component.outerHeight(true) : this.element.outerHeight(false);
            var width = this.component ? this.component.outerWidth(true) : this.element.outerWidth(false);
            var left = offset.left,
                top = offset.top;

            this.picker.removeClass(
                    'datepicker-orient-top datepicker-orient-bottom '+
                    'datepicker-orient-right datepicker-orient-left'
            );

            if (this.o.orientation.x !== 'auto'){
                this.picker.addClass('datepicker-orient-' + this.o.orientation.x);
                if (this.o.orientation.x === 'right')
                    left -= calendarWidth - width;
            }
            // auto x orientation is best-placement: if it crosses a window
            // edge, fudge it sideways
            else {
                // Default to left
                this.picker.addClass('datepicker-orient-left');
                if (offset.left < 0)
                    left -= offset.left - visualPadding;
                else if (offset.left + calendarWidth > windowWidth)
                    left = windowWidth - calendarWidth - visualPadding;
            }

            // auto y orientation is best-situation: top or bottom, no fudging,
            // decision based on which shows more of the calendar
            var yorient = this.o.orientation.y,
                top_overflow, bottom_overflow;
            if (yorient === 'auto'){
                top_overflow = -scrollTop + offset.top - calendarHeight;
                bottom_overflow = scrollTop + windowHeight - (offset.top + height + calendarHeight);
                if (Math.max(top_overflow, bottom_overflow) === bottom_overflow)
                    yorient = 'top';
                else
                    yorient = 'bottom';
            }
            this.picker.addClass('datepicker-orient-' + yorient);
            if (yorient === 'top')
                top += height;
            else
                top -= calendarHeight + parseInt(this.picker.css('padding-top'));

            this.picker.css({
                top: top,
                left: left,
                zIndex: zIndex
            });
        },

        _allow_update: true,
        update: function(){
            if (!this._allow_update)
                return;

            var oldDates = this.dates.copy(),
                dates = [],
                fromArgs = false;
            if (arguments.length){
                $.each(arguments, $.proxy(function(i, date){
                    if (date instanceof Date)
                        date = this._local_to_utc(date);
                    dates.push(date);
                }, this));
                fromArgs = true;
            }
            else {
                dates = this.isInput
                    ? this.element.val()
                    : this.element.data('date') || this.element.find('input').val();
                if (dates && this.o.multidate)
                    dates = dates.split(this.o.multidateSeparator);
                else
                    dates = [dates];
                delete this.element.data().date;
            }

            dates = $.map(dates, $.proxy(function(date){
                return DPGlobal.parseDate(date, this.o.format, this.o.language);
            }, this));
            dates = $.grep(dates, $.proxy(function(date){
                return (
                    date < this.o.startDate ||
                    date > this.o.endDate ||
                    !date
                    );
            }, this), true);
            this.dates.replace(dates);

            if (this.dates.length)
                this.viewDate = new Date(this.dates.get(-1));
            else if (this.viewDate < this.o.startDate)
                this.viewDate = new Date(this.o.startDate);
            else if (this.viewDate > this.o.endDate)
                this.viewDate = new Date(this.o.endDate);

            if (fromArgs){
                // setting date by clicking
                this.setValue();
            }
            else if (dates.length){
                // setting date by typing
                if (String(oldDates) !== String(this.dates))
                    this._trigger('changeDate');
            }
            if (!this.dates.length && oldDates.length)
                this._trigger('clearDate');

            this.fill();
        },

        fillDow: function(){
            var dowCnt = this.o.weekStart,
                html = '<tr>';
            if (this.o.calendarWeeks){
                var cell = '<th class="cw">&nbsp;</th>';
                html += cell;
                this.picker.find('.datepicker-days thead tr:first-child').prepend(cell);
            }
            while (dowCnt < this.o.weekStart + 7){
                html += '<th class="dow">'+dates[this.o.language].daysMin[(dowCnt++)%7]+'</th>';
            }
            html += '</tr>';
            this.picker.find('.datepicker-days thead').append(html);
        },

        fillMonths: function(){
            var html = '',
                i = 0;
            while (i < 12){
                html += '<span class="month">'+dates[this.o.language].monthsShort[i++]+'</span>';
            }
            this.picker.find('.datepicker-months td').html(html);
        },

        setRange: function(range){
            if (!range || !range.length)
                delete this.range;
            else
                this.range = $.map(range, function(d){
                    return d.valueOf();
                });
            this.fill();
        },

        getClassNames: function(date){
            var cls = [],
                year = this.viewDate.getUTCFullYear(),
                month = this.viewDate.getUTCMonth(),
                today = new Date();
            if (date.getUTCFullYear() < year || (date.getUTCFullYear() === year && date.getUTCMonth() < month)){
                cls.push('old');
            }
            else if (date.getUTCFullYear() > year || (date.getUTCFullYear() === year && date.getUTCMonth() > month)){
                cls.push('new');
            }
            if (this.focusDate && date.valueOf() === this.focusDate.valueOf())
                cls.push('focused');
            // Compare internal UTC date with local today, not UTC today
            if (this.o.todayHighlight &&
                date.getUTCFullYear() === today.getFullYear() &&
                date.getUTCMonth() === today.getMonth() &&
                date.getUTCDate() === today.getDate()){
                cls.push('today');
            }
            if (this.dates.contains(date) !== -1)
                cls.push('active');
            if (date.valueOf() < this.o.startDate || date.valueOf() > this.o.endDate ||
                $.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled) !== -1){
                cls.push('disabled');
            }
            if (this.range){
                if (date > this.range[0] && date < this.range[this.range.length-1]){
                    cls.push('range');
                }
                if ($.inArray(date.valueOf(), this.range) !== -1){
                    cls.push('selected');
                }
            }
            return cls;
        },

        fill: function(){
            var d = new Date(this.viewDate),
                year = d.getUTCFullYear(),
                month = d.getUTCMonth(),
                startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,
                startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,
                endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,
                endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,
                todaytxt = dates[this.o.language].today || dates['en'].today || '',
                cleartxt = dates[this.o.language].clear || dates['en'].clear || '',
                tooltip;
            this.picker.find('.datepicker-days thead th.datepicker-switch')
                .text(dates[this.o.language].months[month]+' '+year);
            this.picker.find('tfoot th.today')
                .text(todaytxt)
                .toggle(this.o.todayBtn !== false);
            this.picker.find('tfoot th.clear')
                .text(cleartxt)
                .toggle(this.o.clearBtn !== false);
            this.updateNavArrows();
            this.fillMonths();
            var prevMonth = UTCDate(year, month-1, 28),
                day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
            prevMonth.setUTCDate(day);
            prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7)%7);
            var nextMonth = new Date(prevMonth);
            nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
            nextMonth = nextMonth.valueOf();
            var html = [];
            var clsName;
            while (prevMonth.valueOf() < nextMonth){
                if (prevMonth.getUTCDay() === this.o.weekStart){
                    html.push('<tr>');
                    if (this.o.calendarWeeks){
                        // ISO 8601: First week contains first thursday.
                        // ISO also states week starts on Monday, but we can be more abstract here.
                        var
                        // Start of current week: based on weekstart/current date
                            ws = new Date(+prevMonth + (this.o.weekStart - prevMonth.getUTCDay() - 7) % 7 * 864e5),
                        // Thursday of this week
                            th = new Date(Number(ws) + (7 + 4 - ws.getUTCDay()) % 7 * 864e5),
                        // First Thursday of year, year from thursday
                            yth = new Date(Number(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (7 + 4 - yth.getUTCDay())%7*864e5),
                        // Calendar week: ms between thursdays, div ms per day, div 7 days
                            calWeek =  (th - yth) / 864e5 / 7 + 1;
                        html.push('<td class="cw">'+ calWeek +'</td>');

                    }
                }
                clsName = this.getClassNames(prevMonth);
                clsName.push('day');

                if (this.o.beforeShowDay !== $.noop){
                    var before = this.o.beforeShowDay(this._utc_to_local(prevMonth));
                    if (before === undefined)
                        before = {};
                    else if (typeof(before) === 'boolean')
                        before = {enabled: before};
                    else if (typeof(before) === 'string')
                        before = {classes: before};
                    if (before.enabled === false)
                        clsName.push('disabled');
                    if (before.classes)
                        clsName = clsName.concat(before.classes.split(/\s+/));
                    if (before.tooltip)
                        tooltip = before.tooltip;
                }

                clsName = $.unique(clsName);
                html.push('<td class="'+clsName.join(' ')+'"' + (tooltip ? ' title="'+tooltip+'"' : '') + '>'+prevMonth.getUTCDate() + '</td>');
                if (prevMonth.getUTCDay() === this.o.weekEnd){
                    html.push('</tr>');
                }
                prevMonth.setUTCDate(prevMonth.getUTCDate()+1);
            }
            this.picker.find('.datepicker-days tbody').empty().append(html.join(''));

            var months = this.picker.find('.datepicker-months')
                .find('th:eq(1)')
                .text(year)
                .end()
                .find('span').removeClass('active');

            $.each(this.dates, function(i, d){
                if (d.getUTCFullYear() === year)
                    months.eq(d.getUTCMonth()).addClass('active');
            });

            if (year < startYear || year > endYear){
                months.addClass('disabled');
            }
            if (year === startYear){
                months.slice(0, startMonth).addClass('disabled');
            }
            if (year === endYear){
                months.slice(endMonth+1).addClass('disabled');
            }

            html = '';
            year = parseInt(year/10, 10) * 10;
            var yearCont = this.picker.find('.datepicker-years')
                .find('th:eq(1)')
                .text(year + '-' + (year + 9))
                .end()
                .find('td');
            year -= 1;
            var years = $.map(this.dates, function(d){
                    return d.getUTCFullYear();
                }),
                classes;
            for (var i = -1; i < 11; i++){
                classes = ['year'];
                if (i === -1)
                    classes.push('old');
                else if (i === 10)
                    classes.push('new');
                if ($.inArray(year, years) !== -1)
                    classes.push('active');
                if (year < startYear || year > endYear)
                    classes.push('disabled');
                html += '<span class="' + classes.join(' ') + '">'+year+'</span>';
                year += 1;
            }
            yearCont.html(html);
        },

        updateNavArrows: function(){
            if (!this._allow_update)
                return;

            var d = new Date(this.viewDate),
                year = d.getUTCFullYear(),
                month = d.getUTCMonth();
            switch (this.viewMode){
                case 0:
                    if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear() && month <= this.o.startDate.getUTCMonth()){
                        this.picker.find('.prev').css({visibility: 'hidden'});
                    }
                    else {
                        this.picker.find('.prev').css({visibility: 'visible'});
                    }
                    if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear() && month >= this.o.endDate.getUTCMonth()){
                        this.picker.find('.next').css({visibility: 'hidden'});
                    }
                    else {
                        this.picker.find('.next').css({visibility: 'visible'});
                    }
                    break;
                case 1:
                case 2:
                    if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear()){
                        this.picker.find('.prev').css({visibility: 'hidden'});
                    }
                    else {
                        this.picker.find('.prev').css({visibility: 'visible'});
                    }
                    if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear()){
                        this.picker.find('.next').css({visibility: 'hidden'});
                    }
                    else {
                        this.picker.find('.next').css({visibility: 'visible'});
                    }
                    break;
            }
        },

        click: function(e){
            e.preventDefault();
            var target = $(e.target).closest('span, td, th'),
                year, month, day;
            if (target.length === 1){
                switch (target[0].nodeName.toLowerCase()){
                    case 'th':
                        switch (target[0].className){
                            case 'datepicker-switch':
                                this.showMode(1);
                                break;
                            case 'prev':
                            case 'next':
                                var dir = DPGlobal.modes[this.viewMode].navStep * (target[0].className === 'prev' ? -1 : 1);
                                switch (this.viewMode){
                                    case 0:
                                        this.viewDate = this.moveMonth(this.viewDate, dir);
                                        this._trigger('changeMonth', this.viewDate);
                                        break;
                                    case 1:
                                    case 2:
                                        this.viewDate = this.moveYear(this.viewDate, dir);
                                        if (this.viewMode === 1)
                                            this._trigger('changeYear', this.viewDate);
                                        break;
                                }
                                this.fill();
                                break;
                            case 'today':
                                var date = new Date();
                                date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);

                                this.showMode(-2);
                                var which = this.o.todayBtn === 'linked' ? null : 'view';
                                this._setDate(date, which);
                                break;
                            case 'clear':
                                var element;
                                if (this.isInput)
                                    element = this.element;
                                else if (this.component)
                                    element = this.element.find('input');
                                if (element)
                                    element.val("").change();
                                this.update();
                                this._trigger('changeDate');
                                if (this.o.autoclose)
                                    this.hide();
                                break;
                        }
                        break;
                    case 'span':
                        if (!target.is('.disabled')){
                            this.viewDate.setUTCDate(1);
                            if (target.is('.month')){
                                day = 1;
                                month = target.parent().find('span').index(target);
                                year = this.viewDate.getUTCFullYear();
                                this.viewDate.setUTCMonth(month);
                                this._trigger('changeMonth', this.viewDate);
                                if (this.o.minViewMode === 1){
                                    this._setDate(UTCDate(year, month, day));
                                }
                            }
                            else {
                                day = 1;
                                month = 0;
                                year = parseInt(target.text(), 10)||0;
                                this.viewDate.setUTCFullYear(year);
                                this._trigger('changeYear', this.viewDate);
                                if (this.o.minViewMode === 2){
                                    this._setDate(UTCDate(year, month, day));
                                }
                            }
                            this.showMode(-1);
                            this.fill();
                        }
                        break;
                    case 'td':
                        if (target.is('.day') && !target.is('.disabled')){
                            day = parseInt(target.text(), 10)||1;
                            year = this.viewDate.getUTCFullYear();
                            month = this.viewDate.getUTCMonth();
                            if (target.is('.old')){
                                if (month === 0){
                                    month = 11;
                                    year -= 1;
                                }
                                else {
                                    month -= 1;
                                }
                            }
                            else if (target.is('.new')){
                                if (month === 11){
                                    month = 0;
                                    year += 1;
                                }
                                else {
                                    month += 1;
                                }
                            }
                            this._setDate(UTCDate(year, month, day));
                        }
                        break;
                }
            }
            if (this.picker.is(':visible') && this._focused_from){
                $(this._focused_from).focus();
            }
            delete this._focused_from;
        },

        _toggle_multidate: function(date){
            var ix = this.dates.contains(date);
            if (!date){
                this.dates.clear();
            }
            else if (ix !== -1){
                this.dates.remove(ix);
            }
            else {
                this.dates.push(date);
            }
            if (typeof this.o.multidate === 'number')
                while (this.dates.length > this.o.multidate)
                    this.dates.remove(0);
        },

        _setDate: function(date, which){
            if (!which || which === 'date')
                this._toggle_multidate(date && new Date(date));
            if (!which || which  === 'view')
                this.viewDate = date && new Date(date);

            this.fill();
            this.setValue();
            this._trigger('changeDate');
            var element;
            if (this.isInput){
                element = this.element;
            }
            else if (this.component){
                element = this.element.find('input');
            }
            if (element){
                element.change();
            }
            if (this.o.autoclose && (!which || which === 'date')){
                this.hide();
            }
        },

        moveMonth: function(date, dir){
            if (!date)
                return undefined;
            if (!dir)
                return date;
            var new_date = new Date(date.valueOf()),
                day = new_date.getUTCDate(),
                month = new_date.getUTCMonth(),
                mag = Math.abs(dir),
                new_month, test;
            dir = dir > 0 ? 1 : -1;
            if (mag === 1){
                test = dir === -1
                    // If going back one month, make sure month is not current month
                    // (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)
                    ? function(){
                    return new_date.getUTCMonth() === month;
                }
                    // If going forward one month, make sure month is as expected
                    // (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)
                    : function(){
                    return new_date.getUTCMonth() !== new_month;
                };
                new_month = month + dir;
                new_date.setUTCMonth(new_month);
                // Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
                if (new_month < 0 || new_month > 11)
                    new_month = (new_month + 12) % 12;
            }
            else {
                // For magnitudes >1, move one month at a time...
                for (var i=0; i < mag; i++)
                    // ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
                    new_date = this.moveMonth(new_date, dir);
                // ...then reset the day, keeping it in the new month
                new_month = new_date.getUTCMonth();
                new_date.setUTCDate(day);
                test = function(){
                    return new_month !== new_date.getUTCMonth();
                };
            }
            // Common date-resetting loop -- if date is beyond end of month, make it
            // end of month
            while (test()){
                new_date.setUTCDate(--day);
                new_date.setUTCMonth(new_month);
            }
            return new_date;
        },

        moveYear: function(date, dir){
            return this.moveMonth(date, dir*12);
        },

        dateWithinRange: function(date){
            return date >= this.o.startDate && date <= this.o.endDate;
        },

        keydown: function(e){
            if (this.picker.is(':not(:visible)')){
                if (e.keyCode === 27) // allow escape to hide and re-show picker
                    this.show();
                return;
            }
            var dateChanged = false,
                dir, newDate, newViewDate,
                focusDate = this.focusDate || this.viewDate;
            switch (e.keyCode){
                case 27: // escape
                    if (this.focusDate){
                        this.focusDate = null;
                        this.viewDate = this.dates.get(-1) || this.viewDate;
                        this.fill();
                    }
                    else
                        this.hide();
                    e.preventDefault();
                    break;
                case 37: // left
                case 39: // right
                    if (!this.o.keyboardNavigation)
                        break;
                    dir = e.keyCode === 37 ? -1 : 1;
                    if (e.ctrlKey){
                        newDate = this.moveYear(this.dates.get(-1) || UTCToday(), dir);
                        newViewDate = this.moveYear(focusDate, dir);
                        this._trigger('changeYear', this.viewDate);
                    }
                    else if (e.shiftKey){
                        newDate = this.moveMonth(this.dates.get(-1) || UTCToday(), dir);
                        newViewDate = this.moveMonth(focusDate, dir);
                        this._trigger('changeMonth', this.viewDate);
                    }
                    else {
                        newDate = new Date(this.dates.get(-1) || UTCToday());
                        newDate.setUTCDate(newDate.getUTCDate() + dir);
                        newViewDate = new Date(focusDate);
                        newViewDate.setUTCDate(focusDate.getUTCDate() + dir);
                    }
                    if (this.dateWithinRange(newDate)){
                        this.focusDate = this.viewDate = newViewDate;
                        this.setValue();
                        this.fill();
                        e.preventDefault();
                    }
                    break;
                case 38: // up
                case 40: // down
                    if (!this.o.keyboardNavigation)
                        break;
                    dir = e.keyCode === 38 ? -1 : 1;
                    if (e.ctrlKey){
                        newDate = this.moveYear(this.dates.get(-1) || UTCToday(), dir);
                        newViewDate = this.moveYear(focusDate, dir);
                        this._trigger('changeYear', this.viewDate);
                    }
                    else if (e.shiftKey){
                        newDate = this.moveMonth(this.dates.get(-1) || UTCToday(), dir);
                        newViewDate = this.moveMonth(focusDate, dir);
                        this._trigger('changeMonth', this.viewDate);
                    }
                    else {
                        newDate = new Date(this.dates.get(-1) || UTCToday());
                        newDate.setUTCDate(newDate.getUTCDate() + dir * 7);
                        newViewDate = new Date(focusDate);
                        newViewDate.setUTCDate(focusDate.getUTCDate() + dir * 7);
                    }
                    if (this.dateWithinRange(newDate)){
                        this.focusDate = this.viewDate = newViewDate;
                        this.setValue();
                        this.fill();
                        e.preventDefault();
                    }
                    break;
                case 32: // spacebar
                    // Spacebar is used in manually typing dates in some formats.
                    // As such, its behavior should not be hijacked.
                    break;
                case 13: // enter
                    focusDate = this.focusDate || this.dates.get(-1) || this.viewDate;
                    this._toggle_multidate(focusDate);
                    dateChanged = true;
                    this.focusDate = null;
                    this.viewDate = this.dates.get(-1) || this.viewDate;
                    this.setValue();
                    this.fill();
                    if (this.picker.is(':visible')){
                        e.preventDefault();
                        if (this.o.autoclose)
                            this.hide();
                    }
                    break;
                case 9: // tab
                    this.focusDate = null;
                    this.viewDate = this.dates.get(-1) || this.viewDate;
                    this.fill();
                    this.hide();
                    break;
            }
            if (dateChanged){
                if (this.dates.length)
                    this._trigger('changeDate');
                else
                    this._trigger('clearDate');
                var element;
                if (this.isInput){
                    element = this.element;
                }
                else if (this.component){
                    element = this.element.find('input');
                }
                if (element){
                    element.change();
                }
            }
        },

        showMode: function(dir){
            if (dir){
                this.viewMode = Math.max(this.o.minViewMode, Math.min(2, this.viewMode + dir));
            }
            this.picker
                .find('>div')
                .hide()
                .filter('.datepicker-'+DPGlobal.modes[this.viewMode].clsName)
                .css('display', 'block');
            this.updateNavArrows();
        }
    };

    var DateRangePicker = function(element, options){
        this.element = $(element);
        this.inputs = $.map(options.inputs, function(i){
            return i.jquery ? i[0] : i;
        });
        delete options.inputs;

        $(this.inputs)
            .datepicker(options)
            .bind('changeDate', $.proxy(this.dateUpdated, this));

        this.pickers = $.map(this.inputs, function(i){
            return $(i).data('datepicker');
        });
        this.updateDates();
    };
    DateRangePicker.prototype = {
        updateDates: function(){
            this.dates = $.map(this.pickers, function(i){
                return i.getUTCDate();
            });
            this.updateRanges();
        },
        updateRanges: function(){
            var range = $.map(this.dates, function(d){
                return d.valueOf();
            });
            $.each(this.pickers, function(i, p){
                p.setRange(range);
            });
        },
        dateUpdated: function(e){
            // `this.updating` is a workaround for preventing infinite recursion
            // between `changeDate` triggering and `setUTCDate` calling.  Until
            // there is a better mechanism.
            if (this.updating)
                return;
            this.updating = true;

            var dp = $(e.target).data('datepicker'),
                new_date = dp.getUTCDate(),
                i = $.inArray(e.target, this.inputs),
                l = this.inputs.length;
            if (i === -1)
                return;

            $.each(this.pickers, function(i, p){
                if (!p.getUTCDate())
                    p.setUTCDate(new_date);
            });

            if (new_date < this.dates[i]){
                // Date being moved earlier/left
                while (i >= 0 && new_date < this.dates[i]){
                    this.pickers[i--].setUTCDate(new_date);
                }
            }
            else if (new_date > this.dates[i]){
                // Date being moved later/right
                while (i < l && new_date > this.dates[i]){
                    this.pickers[i++].setUTCDate(new_date);
                }
            }
            this.updateDates();

            delete this.updating;
        },
        remove: function(){
            $.map(this.pickers, function(p){ p.remove(); });
            delete this.element.data().datepicker;
        }
    };

    function opts_from_el(el, prefix){
        // Derive options from element data-attrs
        var data = $(el).data(),
            out = {}, inkey,
            replace = new RegExp('^' + prefix.toLowerCase() + '([A-Z])');
        prefix = new RegExp('^' + prefix.toLowerCase());
        function re_lower(_,a){
            return a.toLowerCase();
        }
        for (var key in data)
            if (prefix.test(key)){
                inkey = key.replace(replace, re_lower);
                out[inkey] = data[key];
            }
        return out;
    }

    function opts_from_locale(lang){
        // Derive options from locale plugins
        var out = {};
        // Check if "de-DE" style date is available, if not language should
        // fallback to 2 letter code eg "de"
        if (!dates[lang]){
            lang = lang.split('-')[0];
            if (!dates[lang])
                return;
        }
        var d = dates[lang];
        $.each(locale_opts, function(i,k){
            if (k in d)
                out[k] = d[k];
        });
        return out;
    }

    var old = $.fn.datepicker;
    $.fn.datepicker = function(option){
        var args = Array.apply(null, arguments);
        args.shift();
        var internal_return;
        this.each(function(){
            var $this = $(this),
                data = $this.data('datepicker'),
                options = typeof option === 'object' && option;
            if (!data){
                var elopts = opts_from_el(this, 'date'),
                // Preliminary otions
                    xopts = $.extend({}, defaults, elopts, options),
                    locopts = opts_from_locale(xopts.language),
                // Options priority: js args, data-attrs, locales, defaults
                    opts = $.extend({}, defaults, locopts, elopts, options);
                if ($this.is('.input-daterange') || opts.inputs){
                    var ropts = {
                        inputs: opts.inputs || $this.find('input').toArray()
                    };
                    $this.data('datepicker', (data = new DateRangePicker(this, $.extend(opts, ropts))));
                }
                else {
                    $this.data('datepicker', (data = new Datepicker(this, opts)));
                }
            }
            if (typeof option === 'string' && typeof data[option] === 'function'){
                internal_return = data[option].apply(data, args);
                if (internal_return !== undefined)
                    return false;
            }
        });
        if (internal_return !== undefined)
            return internal_return;
        else
            return this;
    };

    var defaults = $.fn.datepicker.defaults = {
        autoclose: false,
        beforeShowDay: $.noop,
        calendarWeeks: false,
        clearBtn: false,
        daysOfWeekDisabled: [],
        endDate: Infinity,
        forceParse: true,
        format: 'mm/dd/yyyy',
        keyboardNavigation: true,
        language: 'en',
        minViewMode: 0,
        multidate: false,
        multidateSeparator: ',',
        orientation: "auto",
        rtl: false,
        startDate: -Infinity,
        startView: 0,
        todayBtn: false,
        todayHighlight: false,
        weekStart: 0
    };
    var locale_opts = $.fn.datepicker.locale_opts = [
        'format',
        'rtl',
        'weekStart'
    ];
    $.fn.datepicker.Constructor = Datepicker;
    var dates = $.fn.datepicker.dates = {
        en: {
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            today: "Today",
            clear: "Clear"
        }
    };

    var DPGlobal = {
        modes: [
            {
                clsName: 'days',
                navFnc: 'Month',
                navStep: 1
            },
            {
                clsName: 'months',
                navFnc: 'FullYear',
                navStep: 1
            },
            {
                clsName: 'years',
                navFnc: 'FullYear',
                navStep: 10
            }],
        isLeapYear: function(year){
            return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
        },
        getDaysInMonth: function(year, month){
            return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
        },
        validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
        nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
        parseFormat: function(format){
            // IE treats \0 as a string end in inputs (truncating the value),
            // so it's a bad format delimiter, anyway
            var separators = format.replace(this.validParts, '\0').split('\0'),
                parts = format.match(this.validParts);
            if (!separators || !separators.length || !parts || parts.length === 0){
                throw new Error("Invalid date format.");
            }
            return {separators: separators, parts: parts};
        },
        parseDate: function(date, format, language){
            if (!date)
                return undefined;
            if (date instanceof Date)
                return date;
            if (typeof format === 'string')
                format = DPGlobal.parseFormat(format);
            var part_re = /([\-+]\d+)([dmwy])/,
                parts = date.match(/([\-+]\d+)([dmwy])/g),
                part, dir, i;
            if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)){
                date = new Date();
                for (i=0; i < parts.length; i++){
                    part = part_re.exec(parts[i]);
                    dir = parseInt(part[1]);
                    switch (part[2]){
                        case 'd':
                            date.setUTCDate(date.getUTCDate() + dir);
                            break;
                        case 'm':
                            date = Datepicker.prototype.moveMonth.call(Datepicker.prototype, date, dir);
                            break;
                        case 'w':
                            date.setUTCDate(date.getUTCDate() + dir * 7);
                            break;
                        case 'y':
                            date = Datepicker.prototype.moveYear.call(Datepicker.prototype, date, dir);
                            break;
                    }
                }
                return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0);
            }
            parts = date && date.match(this.nonpunctuation) || [];
            date = new Date();
            var parsed = {},
                setters_order = ['yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'd', 'dd'],
                setters_map = {
                    yyyy: function(d,v){
                        return d.setUTCFullYear(v);
                    },
                    yy: function(d,v){
                        return d.setUTCFullYear(2000+v);
                    },
                    m: function(d,v){
                        if (isNaN(d))
                            return d;
                        v -= 1;
                        while (v < 0) v += 12;
                        v %= 12;
                        d.setUTCMonth(v);
                        while (d.getUTCMonth() !== v)
                            d.setUTCDate(d.getUTCDate()-1);
                        return d;
                    },
                    d: function(d,v){
                        return d.setUTCDate(v);
                    }
                },
                val, filtered;
            setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];
            setters_map['dd'] = setters_map['d'];
            date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
            var fparts = format.parts.slice();
            // Remove noop parts
            if (parts.length !== fparts.length){
                fparts = $(fparts).filter(function(i,p){
                    return $.inArray(p, setters_order) !== -1;
                }).toArray();
            }
            // Process remainder
            function match_part(){
                var m = this.slice(0, parts[i].length),
                    p = parts[i].slice(0, m.length);
                return m === p;
            }
            if (parts.length === fparts.length){
                var cnt;
                for (i=0, cnt = fparts.length; i < cnt; i++){
                    val = parseInt(parts[i], 10);
                    part = fparts[i];
                    if (isNaN(val)){
                        switch (part){
                            case 'MM':
                                filtered = $(dates[language].months).filter(match_part);
                                val = $.inArray(filtered[0], dates[language].months) + 1;
                                break;
                            case 'M':
                                filtered = $(dates[language].monthsShort).filter(match_part);
                                val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
                                break;
                        }
                    }
                    parsed[part] = val;
                }
                var _date, s;
                for (i=0; i < setters_order.length; i++){
                    s = setters_order[i];
                    if (s in parsed && !isNaN(parsed[s])){
                        _date = new Date(date);
                        setters_map[s](_date, parsed[s]);
                        if (!isNaN(_date))
                            date = _date;
                    }
                }
            }
            return date;
        },
        formatDate: function(date, format, language){
            if (!date)
                return '';
            if (typeof format === 'string')
                format = DPGlobal.parseFormat(format);
            var val = {
                d: date.getUTCDate(),
                D: dates[language].daysShort[date.getUTCDay()],
                DD: dates[language].days[date.getUTCDay()],
                m: date.getUTCMonth() + 1,
                M: dates[language].monthsShort[date.getUTCMonth()],
                MM: dates[language].months[date.getUTCMonth()],
                yy: date.getUTCFullYear().toString().substring(2),
                yyyy: date.getUTCFullYear()
            };
            val.dd = (val.d < 10 ? '0' : '') + val.d;
            val.mm = (val.m < 10 ? '0' : '') + val.m;
            date = [];
            var seps = $.extend([], format.separators);
            for (var i=0, cnt = format.parts.length; i <= cnt; i++){
                if (seps.length)
                    date.push(seps.shift());
                date.push(val[format.parts[i]]);
            }
            return date.join('');
        },
        headTemplate: '<thead>'+
            '<tr>'+
            '<th class="prev">&laquo;</th>'+
            '<th colspan="5" class="datepicker-switch"></th>'+
            '<th class="next">&raquo;</th>'+
            '</tr>'+
            '</thead>',
        contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
        footTemplate: '<tfoot>'+
            '<tr>'+
            '<th colspan="7" class="today"></th>'+
            '</tr>'+
            '<tr>'+
            '<th colspan="7" class="clear"></th>'+
            '</tr>'+
            '</tfoot>'
    };
    DPGlobal.template = '<div class="datepicker">'+
        '<div class="datepicker-days">'+
        '<table class=" table-condensed">'+
        DPGlobal.headTemplate+
        '<tbody></tbody>'+
        DPGlobal.footTemplate+
        '</table>'+
        '</div>'+
        '<div class="datepicker-months">'+
        '<table class="table-condensed">'+
        DPGlobal.headTemplate+
        DPGlobal.contTemplate+
        DPGlobal.footTemplate+
        '</table>'+
        '</div>'+
        '<div class="datepicker-years">'+
        '<table class="table-condensed">'+
        DPGlobal.headTemplate+
        DPGlobal.contTemplate+
        DPGlobal.footTemplate+
        '</table>'+
        '</div>'+
        '</div>';

    $.fn.datepicker.DPGlobal = DPGlobal;


    /* DATEPICKER NO CONFLICT
     * =================== */

    $.fn.datepicker.noConflict = function(){
        $.fn.datepicker = old;
        return this;
    };


    /* DATEPICKER DATA-API
     * ================== */

    $(document).on(
        'focus.datepicker.data-api click.datepicker.data-api',
        '[data-provide="datepicker"]',
        function(e){
            var $this = $(this);
            if ($this.data('datepicker'))
                return;
            e.preventDefault();
            // component click requires us to explicitly show it
            $this.datepicker('show');
        }
    );
    $(function(){
        $('[data-provide="datepicker-inline"]').datepicker();
    });

}(window.jQuery));
