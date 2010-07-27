// http://github.com/quackingduck/jquery.builder.js/raw/master/jquery.builder.js
(function($) {
  
  var builderPattern = /^(.+?)(#.+?)?(\..+?)?(\[(.+?)\])?$/;
  
  function compileTag(str) {
    var match = str.match(builderPattern);
    var tag = match[1], id = match[2], classes = match[3], attributes = match[5];
    id = id ? ' id="' + id.slice(1,id.length) + '"' : '';
    classes = classes ? ' class="' + classes.slice(1,classes.length).split('.').join(' ') + '"' : '';
    attributes = attributes ? ' ' + attributes.split(',').join(' ') + ' ' : '';
    return '<'+tag+id+classes+attributes+'></'+tag+'>';
  }
  
  $.n = function(tagStr) {
    return $(compileTag(tagStr));
  }
  
  $.fn.n = function(content) {
    if (typeof content === 'string') return $.n(content).appendTo(this);
    if (typeof content === 'object') return content.appendTo(this);
    var 
    self = this,
    builderFunction = function(content) { return self.n(content) };
    builderFunction.txt = function(str) { self.txt(str) };
    builderFunction.root = this;
    if (content === undefined) return builderFunction;
    // otherwise assume content is a function and pass the builder to that
    // function
    content(builderFunction);
    return self;
  }
  
  // like $.fn.text but appends instead of replacing
  $.fn.txt = function(str) {
    this.append(document.createTextNode(str));
    return this;
  }
  
})(jQuery);