window.scroll2message = {
  last_clicked_id: null,
  sticky_id: null,

  setLastClickedId: function(element) {
    // bubble upwards and try to find an element that contains an ID
    var target = element;
    while (!target.id && target.parentElement) {
      target = target.parentElement;
    }
    if (target.id) {
      console.log(target.id);
    }
  },

  setStickyId: function() {
    this.sticky_id = this.last_clicked_id;
  }
};

document.addEventListener("contextmenu", function(event) {
  var targetElement = event.target || event.srcElement;
  window.scroll2message.setLastClickedId(targetElement);

  return false;
});
