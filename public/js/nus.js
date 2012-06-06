(function($){
    var _nus = function(data){
        this._api_ = '/api/v1/shorten/';
        this._notify_ = '#notify';
        this._urlfield_ = '#urlfield';
        this._errormsg_ = 'An error occurred shortening that link';
    };

    _nus.prototype.check = function(s){
        var regexp = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        return regexp.test(s);
    };

    _nus.prototype.alert = function(message, error){
        var alert = '<div class="alert alert-success">';
        if(error) {
            alert = '<div class="alert alert-error">';
        }

        $(this._notify_).html(alert + '<button class="close" data-dismiss="alert">×</button>' + message + '</div>');
        this.timeout();
    };

    _nus.prototype.timeout = function(){
        clearTimeout(this._timeout_);
        this._timeout_ = setTimeout(function(){
            $(".alert").alert('close')
        }, 3000);
    };

    _nus.prototype.request = function(url){
        var self = this;
        $.getJSON(self._api_, {long_url: url},function(data){
            if('status_code' in data && 'status_txt' in data) {
                if(parseInt(data.status_code) == 200) {
                    self._input_.val(data.url).select();
                    return self.alert('Copy your shortened url');
                } else {
                    self._errormsg_ = data.status_txt;
                }
            }

            self.alert(self._errormsg_, true);
        }).error(function() {
            self.alert(self._errormsg_, true);
        });
    };

    _nus.prototype.init = function() {
        this._input_ = $(this._urlfield_);
        if(!this.check(this._input_.val())) {
            return this.alert(this._errormsg_, true);
        }

        this.request(this._input_.val());
    };

    $(function(){
        var n = new _nus();
        $('body').on('click', '#submit', function(e) {
            e && e.preventDefault();
            n.init();
        });
    });
})(window.jQuery);
