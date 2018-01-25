jQuery(document).ready(function() {
    var update_texts = function() {
        $('body').i18n();
        // $('#messages').text($.i18n('message_from', 'Ann', 2, 'female'));
    };

    $.i18n().load({
        'en': {
            'welcome': 'Welcome!',
            'welcome2': 'Welcome2!',
        },
        'ru': {
            'welcome': 'Заходи!',
            'welcome2': 'Заходи2!',
        }
    });
    update_texts();

    $('.lang-switch').click(function(e) {
        e.preventDefault();
        $.i18n().locale = $(this).data('locale');
        update_texts();
    });
});