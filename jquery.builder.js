(function($) {
  
  var builderPattern = /^(.+?)(#.+?)?(\..+?)?$/;
  
  function compileTag(str) {
    var match = str.match(builderPattern);
    var tag = match[1], id = match[2], classes = match[3];
    id = id ? ' id="' + id.slice(1,id.length) + '"' : '';
    classes = classes ? ' class="' + classes.slice(1,classes.length).split('.').join(' ') + '"' : '';
    return '<'+tag+id+classes+'>';
  }
  
  $.n = function(tagStr) {
    return $(compileTag(tagStr));
  }
  
  $.fn.n = function(content) {
    if (typeof content === 'string') return $.n(content).appendTo(this);    
    // otherwise assume content is a function
    var self = this;
    var builderFunction = function(contentStr) { return $.n(contentStr).appendTo(self) };
    builderFunction.txt = function(str) { self.txt(str) };
    builderFunction.element = this;
    content(builderFunction);
    return self;
  }
  
  // like $.fn.text but appends instead of replacing
  $.fn.txt = function(str) {
    this.append(document.createTextNode(str));
    return this;
  }
  
})(jQuery);