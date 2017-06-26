$( document ).ready(function() {
    /**
     * if form has on the page
     */
    if($('#questionForm').length > 0){
        /**
         *
         * @type {boolean}
         */
        var disabledSocket = false;

        /**
         * emulation login user
         * @type {number}
         */


        var socket = io();

        socket.on('fromnode', function(data){
            disabledSocket = true;
            $( ":radio[name='" + data.radio + "']" ).trigger( "click" );
        });

        var SetRadioButtonChkProperty = function (labelElement, name){
            var nameEl = $(labelElement).find(':radio').attr('name');

            if(disabledSocket === false){
                //userId only for example
                socket.emit('tonode', {userId:'2',radio:nameEl});
            }
            disabledSocket = false;

            if($(labelElement).hasClass('active') === true){
                $( ":radio[name='"+nameEl+"']" ).prop('checked', false);
                $(labelElement).change(function() {
                    $(labelElement).removeClass('active');
                });
            }
        };

        var InitRadio = function (name){

            $.each($(':radio'), function(){
                $(this).parent().on("click", function(event){
                    SetRadioButtonChkProperty(this, 'run');
                });
            });

            $( "#questionForm" ).submit(function( event ) {
                if($('.questionBlock').length !== $('#questionForm label.btn-default.active').length){
                    $( ".error-answer" ).fadeIn( "slow", function() {
                    });
                    event.preventDefault();
                }else {

                    /**
                     * all elements uncheck who don't have class active
                     */
                    $('#questionForm label.btn-default:not(.active)').each(function (index, el) {
                        $(el).find(":radio").prop('checked', false);
                    });


                    /**
                     * check radio if label has class active
                     */
                    $('#questionForm label.btn-default.active').each(function (index, el) {
                        $(el).find(":radio").prop('checked', true);
                    });
                }
            });
        };

        InitRadio('q1');

    }
});