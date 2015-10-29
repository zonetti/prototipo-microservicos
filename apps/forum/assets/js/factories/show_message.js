app.factory('ShowMessage', function () {
  angular.element.noty.defaults = {
    layout: 'bottomLeft',
    theme: 'relax',
    type: 'alert',
    text: '',
    dismissQueue: true,
    template: '<div class="noty_message">' +
              '  <span class="noty_text"></span>' +
              '  <div class="noty_close"></div>' +
              '</div>',
    animation: {
      open: {height: 'toggle'},
      close: {height: 'toggle'},
      easing: 'swing',
      speed: 500
    },
    timeout: 5000,
    force: false,
    modal: false,
    maxVisible: 5,
    killer: false,
    closeWith: ['click'],
    callback: {
      onShow: function () {},
      afterShow: function () {},
      onClose: function () {},
      afterClose: function () {},
      onCloseClick: function () {}
    },
    buttons: false
  }

  return function (title, type, info) {
    var text = '<b>' + title + '</b>'
    if (info) {
      text += '<br><br>' + JSON.stringify(info)
    }
    noty({
      text: text,
      type: type
    })
  }
})
