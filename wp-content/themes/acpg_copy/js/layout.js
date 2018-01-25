$(function() {

    $('#modal_overlay').css('height', $('body').height());

    $('div.main_item[data-type="background"]').each(function() {
        var $bgobj = $(this); // создаем объект
        if ($(window).width() > 767) {
            $(window).scroll(function() {
                var yPos = -($(window).scrollTop() / $bgobj.data('speed')) + ($bgobj.position().top / $bgobj.data('speed')); // вычисляем коэффициент
                var coords = 'center ' + yPos + 'px';
                $bgobj.css({ backgroundPosition: coords });
            });
        }
    });

    $('.fancybox').fancybox({
        helpers: {
            overlay: {
                locked: false
            }
        }
    });

    $('.history').click(function(e) {
        e.preventDefault();
        var vertical_offset = 0;
        if ($(window).width() < 768) {
            vertical_offset = $(this).closest('div.history').position().top - ($('#history_modal').height() / 2 - 45);
        } else {
            vertical_offset = $(this).closest('div.history').position().top - ($('#history_modal').height() / 2);
        }

        if ($('.history_item.viewed').length === $('.history_item').length) {
            $('.history_item').removeClass('active viewed');
        }

        if ($('.history_item.viewed').length == 0) {
            $('.history_item:first-of-type').addClass('active viewed');
            $('.history_item.active').css('display', 'block');
        } else {
            $('.history_item.active').removeClass('active');
            //$('.history_item:not(.viewed):first-of-type').addClass('active');
            $('.history_item').not('.viewed').first().addClass('active viewed');
            $('.history_item.active').css('display', 'block');
        }

        $('#history_modal').css('top', vertical_offset);
        $('#modal_overlay').fadeIn('slow');
        $('#history_modal').fadeIn('slow');
    })

    $('#modal_close').click(function() {
        $('#history_modal').fadeOut('slow');
        $('#modal_overlay').fadeOut('slow');
        $('.history_item.active').fadeOut('fast').removeClass('active');
    })

    $('#modal_overlay').click(function() {
        $(this).fadeOut('slow');
        $('#history_modal').fadeOut('slow');
        $('.history_item.active').fadeOut('fast').removeClass('active');
    });

    $('#history_modal').click(function(e) {
        if (e.target.id == 'history_modal' || e.target.id == 'modal_wrapper') {
            $('#modal_overlay').fadeOut('slow');
            $('#history_modal').fadeOut('slow');
            $('.history_item.active').fadeOut('fast').removeClass('active');
        }
    });

    $('#mobile-nav').click(function() {
        $('#close_menu').toggle();
        $('.clm_img').toggleClass('rot180');
        $('.mobile-list').slideToggle('slow');
    });
    $('#close_menu').click(function() {
        if ($(window).width() < 768) {
            $('.clm_img').toggleClass('rot180');
            $('.mobile-list').slideToggle('slow');
            $('#close_menu').toggle();
            // $('#mobile-menu').togle();
        } else {
            $('.mobile-list').slideToggle('slow');
            $('.clm_img').toggleClass('rot180')
        }
    });

    var img_src;
    $('.history img').hover(function() {
        img_src = $(this).attr('src');
        $(this).attr('src', $(this).next('img').attr('src'));
    }, function() {
        $(this).attr('src', img_src);
    });

    var arrow_src;
    $('.arrows img').hover(function() {
        arrow_src = $(this).attr('src');
        $(this).attr('src', $(this).siblings('img').attr('src'));
    }, function() {
        $(this).attr('src', arrow_src);
    });

    var modal_right;
    $('#histories_switcher img').hover(function() {
        modal_right = $(this).attr('src');
        $(this).attr('src', $(this).next('img').attr('src'));
    }, function() {
        $(this).attr('src', modal_right);
    });

    $('#menu a, #mobile-menu a, a[rel=scrollTo]').click(function() {
        var elementClick = $(this).attr('href').split('#')[1];
        elementClick = '#' + elementClick;
        var destination = $(elementClick).offset().top + 10;
        jQuery("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination }, 2800, 'easeInOutExpo');
        return false;
    });

    $('.submenu').click(function() {
        if ($(window).width() < 768) {
            $('.subm_items_xs').toggle();
            $('.submenu_items_xs').slideToggle('slow');
        } else {
            $('.subm_items').toggle();
            $('.submenu_items').toggle();
        }
    });
        $('.submenu2').click(function() {
        if ($(window).width() < 768) {
            $('.subm_items_xs_2').toggle();
            $('.submenu_items_xs_2').slideToggle('slow');
        } else {
            $('.subm_items2').toggle();
            $('.submenu_items2').toggle();
        }
    });

    $('#mobile-menu a').click(function() {
        $('.clm_img').toggleClass('rot180');
        $('.mobile-list').slideToggle('slow');
        $('#mobile-menu li').removeClass('active');
        $(this).closest('li').addClass('active');
        if ($(window).width() < 768) {
            $('#menu').fadeToggle('slow');
        }
    });

    $('#history_right').click(function(e) {
        if ($(':animated').length) {
            return false;
        }
        var index = $('.history_item.active').index();
        if (index == $('.history_item').length - 1) {
            index = -1;
        }
        $('.history_item.active').fadeOut('slow', function() {
            $(this).removeClass('active');
            $('.history_item').eq(index + 1).fadeIn('slow', function() {
                $(this).addClass('active viewed');
            });
        });
    });

    $('#history_left').click(function(e) {
        if ($(':animated').length) {
            return false;
        }
        var index = $('.history_item.active').index();
        $('.history_item.active').fadeOut('slow', function() {
            $(this).removeClass('active');
            $('.history_item').eq(index - 1).fadeIn('slow', function() {
                $(this).addClass('active viewed');
            });
        });
    });


    $('#mobile-menu').css('left', ($('.main_item').first().offset().left + $('.main_item').first().width()) - $('#mobile-menu').width());

});

$(window).resize(function() {
    $('#mobile-menu').css('left', ($('.main_item').first().offset().left + $('.main_item').first().width()) - $('#mobile-menu').width());
});

$(window).load(function() {

});

$(window).scroll(function() {
    if ($(window).width() > 767) {
        $('body').children('div').each(function() {
            var top = $(this).offset().top;
            var bottom = $(this).offset().top + $(this).height();
            if ($(window).scrollTop() > top && $(window).scrollTop() < bottom) {
                if ($(this).hasClass('content_block_wrapper')) {
                    $('#mobile-nav img').attr('src', 'wp-content/themes/acpg_copy/images/menu_black.png');
                } else {
                    $('#mobile-nav img').attr('src', 'wp-content/themes/acpg_copy/images/menu_white.png');
                }
            }
        });
    }
});


jQuery(document).ready(function() {
    var update_texts = function() {
        $('body').i18n();
    };

    $.i18n().load({
        'ru': {
            "about_title": "О КОМПАНИИ",
            "contacts_title": "Контакты",
            "about_1": "New Planet Concierge service - сервис для людей ценящих свое время и деньги. Мы работаем для Вас 365 дней в году в режиме 24/7. Закрытое мероприятие, уникальное путешествие, интересное событие в мире, любую задачу мы решим в самый короткий срок с индивидуальным подходом. Выступим в роли переводчиков или личных тайм-менеджеров, забронируем отель, лучший столик в ресторане или Business Jet, скоординируем важное торжество.",
            "about_2": "Мы работаем только с лучшими, надежными и хорошо зарекомендовавшими себя партнерами и гарантируем качественный и быстрый сервис. Сделаем самые важные моменты вашей жизни максимально запоминающимися и яркими! Освободите себя от лишних хлопот! Доверьте личные заботы профессионалам!",
            "phrase_1": "СОЗЕРЦАЙ",
            "phrase_2": "ЛЕТАЙ",
            "phrase_3": "ДОСТИГАЙ",
            "phrase_4": "ВОВЛЕКАЙСЯ",
            "phrase_5": "ВКУШАЙ",
            "phrase_6": "LIFE STYLE",
            "phrase_7": "ВСТУПИТЬ В КЛУБ",
            "phrase_8": "Пожалуйста заполните ниже форму и в",
            "phrase_9": "ближайшее время наш консьерж с вами свяжется",
            "phrase_10": "имя *",
            "phrase_10_ph": "введите свое имя *",
            "phrase_11": " телефон*",
            "phrase_11_ph": "введите телефон*",
            "phrase_12": " електронную почту*",
            "phrase_12_ph": "введите електронную почту*",
            "phrase_13": "Введите ваше сообщение",
            "phrase_13_ph": "Введите ваше сообщение",
            "phrase_14": "Мы заботимся о вашей конфиденциальности!",
            "phrase_15": "Ваши данные НЕ будут переданы третьим лицам!",
            "phrase_16": "отправить",
            "phrase_1_1": "ВПАДАТЬ В ОТЧАЯНЬЕ -",
            "phrase_1_2": "ПЛОХАЯ",
            "phrase_1_3": "ПРИВЫЧКА",
            "service_1": "NP SERVICE - это сервис услуг, разработанных с учетом различных пожеланий на высшем уровне, уникальные проекты,",
            "service_2": "сотрудничество с лучшими Компаниями мира! Далее вы можете ознакомиться поближе с каждым из разделов службы:",
            "phrase_2_1": "ОПЫТ ИЗМЕРЯЕТСЯ",
            "phrase_2_2": "НЕ В ГОДАХ,",
            "phrase_2_3": "А В СОБЫТИЯХ",
            "event_1": "NP-event  приоткроет двери для Вас на любые самые главные события в мире; концерты звезд, эстрады, оперы, театра, кинофестивали, спортивные чемпионаты, олимпиады, регаты, ралли, организация выступления российских и зарубежных звезд на ваших мероприятиях.",
            "event_2": "Уникальные экскурсии; всегда билеты в вип ложу Большого театра. Лучшие организаторы и декораторы разработают и проведут Вашу уникальную свадьбу; юбилей или день рождение в самых красивых местах земли.",
            "phrase_3_1": "ПОЕХАЛИ!",
            "travel_1": "NP-travel обширный спектр услуг путешественника с учетом всех ваших пожеланий. Индивидуально составленные туры, необыкновенные путешествия в любой райский уголок земли с насыщенной обширной программой.",
            "travel_2": "Всевозможные экскурсии, аренда авто мирового класса, предоставление персонального переводчика. Бронирование потрясающе красивых замков, дворцов, домов, вилл, шале в любой стране и многое другое.",
            "phrase_4_1": "ЗАЧЕМ ЗЕМЛЯ,",
            "phrase_4_2": "КОГДА ЕСТЬ",
            "phrase_4_3": "НЕБО?",
            "fly_1_t": "NP-fly бизнес авиация с новейшими частными самолетами для перелетов по всему миру. Первоклассное обслуживание вам гарантированно!",
            "fly_2_t": "Для самых взыскательных персон, аренда или покупка вертолетов. К вашим услугам вертолётное такси. Мы ценим ваше время! ",
            "fly_1": "На эксклюзивных условиях мы представляем интересы владельцев и предлагаем для чартерных перелетов 5 самолетов и 2 вертолета: ",
            "fly_1_1": "Challenger 604 / 2006г (2014) / 12 мест (аэропорт базирования Москва, Внуково)",
            "fly_1_2": "Gulfstream 550 / 2012г / 19 мест (аэропорт базирования Москва, Внуково)",
            "fly_1_3": "Boeing BBJ / 2010г / 19 мест (аэропорт базирования Москва, Внуково)",
            "fly_2": "Embraer Legacy 650 / 2011г / 13 мест (аэропорт базирования Москва, Внуково)",
            "fly_2_1": "Global 6000 / 2015г / 15 мест (аэропорт базирование Москва, Шереметьево / Цюрих)",
            "fly_2_2": "AgustaWestland AW139 / 2015г / 8 мест",
            "fly_2_3": "AgustaWestland AW119 / 2014г / 6 мест",
            "fly_2_4": "Также мы сможем подобрать любой другой борт в соответствии с Вашими задачами.",
            "phrase_5_1": "УЧИТЬСЯ - ",
            "phrase_5_2": "НИКОГДА НЕ ПОЗДНО!",
            "education_1": "NP-education поможет получить престижное образование вам и вашим близким в Британии, в любом университете или колледже.",
            "education_2": "И предоставит возможность вашему ребёнку обучаться в любой высшей школе Лондона.",
            "phrase_6_1": "ПОДКРЕПИТЕ",
            "phrase_6_2": "СВОЙ ОПТИМИЗМ!",
            "gastronomic_1_t": "NP-gastronomic Бронирование столиков в самые лучшие рестораны мира. Гастрономические туры в Европу",
            "gastronomic_2_t": "А личный повар удивит даже самых взыскательных гурманов.",
            "gastronomic_1": "Индивидуальные винные и гастрономические туры в Регионах Франции , Италии , Испании . Мастер классы в гостях у известных гуру.",
            "gastronomic_2": "По желанию индивидуальное обучение с предоставлением переводчика. Авторские программы с ужином вместе с шеф-поваром.  Полное сопровождение с личным гидом - переводчиком.",
            "phrase_7_1": "ПОЗВОЛЬТЕ СЕБЕ ЖИТЬ ТОЙ ЖИЗНЬЮ,",
            "phrase_7_2": "КОТОРОЙ",
            "phrase_7_3": "ХОТИТЕ ЖИТЬ ВЫ!",
            "card_0": "PRIVILÈGE",
            "card_1": "Клубная карта PRIVILÈGE даёт новые возможности владельцам получать информацию о самых значимых мировых событиях, иметь персональную скидку на услуги сервиса, пользоваться бесплатной услугой по подбору отеля, ресторана, доступ на закрытые мероприятия,",
            "card_2": "получать персональные предложения в день рождения. Быть на связи с Вашим личным помощником 24/365! Все привилегии предоставляются только при предъявления карты Privilège. Все подробности только у New Planet Concierge service.",
            "phone_number": "Телефон",
            "adress_title": "Адрес",
            "adress": "123022 Москва, Улица Рочдельская 15, строение 32",
            "history": "ИСТОРИИ",
            "history_1": "Руководитель одной восточноевропейской страны решил прокатиться по каналам в Санкт-Петербурге до того, как подали горячее. К десерту лодка для Президента и катер сопровождения для охраны были готовы. Северная Венеция прекрасна в июне.",
            "history_2": "Хозяин квартиры на восточном побережье США, которую имел неосторожность арендовать наш клиент, как оказалось, не отличался порядочностью, и за день до заезда у нас возникли непредвиденные сложности. Однако грамотно составленное письмо от ведущего специалиста по уголовному праву штата Флорида на 5 страницах сотворило чудеса. И вправду говорят: американцы очень законопослушны.",
            "history_3": "Что может быть лучше, чем корзина ярких пионов для прекрасной дамы к Рождеству? И вот 12 часов спустя курьер с другого конца Европы несется в высокогорный Куршавель. Любимая будет довольна.",
            "history_4": "Необычный подарок на день рождения? Мы попросили разных людей из Японии, Ливана, Норвегии и еще пятнадцати стран записать персональное поздравление для юбиляра.",
        },
        'en': {
            "about_title": "Our Company",
            "contacts_title": "Contacts",
            "about_1": "New Planet Concierge service - service for people who value their time and money. We work for you 365 days a year in 24/7 mode, we will offer solutions to almost any questions, even the most unconventional ones and if necessary: we will accompany you to a secular party or business trip, help you get to the most unique world events, act as interpreters or",
            "about_2": "personal time managers, book a hotel, the best table in a restaurant or business jet, coordinate an important celebration, come up with an unusual journey. Let's make the most important events of your life as memorable and bright! Free yourself from unnecessary hassle! Entrust personal care to professionals!",
            "phrase_1": "OBSERVE",
            "phrase_2": "FLY",
            "phrase_3": "REACH",
            "phrase_4": "INVOLVE",
            "phrase_5": "TASTE",
            "phrase_6": "LIFE STYLE",
            "phrase_7": "ВСТУПИТЬ В КЛУБ",
            "phrase_8": "Пожалуйста заполните ниже форму и в",
            "phrase_9": "ближайшее время наш консьерж с вами свяжется",
            "phrase_10": "введите свое имя *",
            "phrase_10_ph": "введите свое имя *",
            "phrase_11": "введите телефон*",
            "phrase_11_ph": "введите телефон*",
            "phrase_12": "введите електронную почту*",
            "phrase_12_ph": "введите електронную почту*",
            "phrase_13": "Введите ваше сообщение",
            "phrase_13_ph": "Введите ваше сообщение",
            "phrase_14": "Мы заботимся о вашей конфиденциальности!",
            "phrase_15": "Ваши данные НЕ будут переданы третьим лицам!",
            "phrase_16": "отправить",
            "phrase_1_1": "FALL INTO DESPAIR -",
            "phrase_1_2": "BAD",
            "phrase_1_3": "HABIT",
            "service_1": "NP SERVICE is a service of services, developed taking into account various wishes at the highest level, unique projects,",
            "service_2": "cooperation with the best Companies of the World! Next, you can get closer to each of the sections of the service:",
            "phrase_2_1": "EXPERIENCE MEASURED",
            "phrase_2_2": "NOT IN YEARS,",
            "phrase_2_3": "AND IN EVENTS",
            "event_1": "NP-event will open the doors for you to any of the most important events in the world; concerts of stars, stage, opera, theater, film festivals, sports championships, olympiads, regattas, rallies, organization of performances by Russian and foreign stars at your events.",
            "event_2": "Unique excursions; always tickets to the VIP box of the Bolshoi Theater. The best organizers and decorators will design and conduct your unique wedding; anniversary or birthday in the most beautiful places of the earth.",
            "phrase_3_1": "GO!",
            "travel_1": "NP-travel is an extensive range of travel services, taking into account all your wishes. Individually arranged tours, extraordinary trips to any heavenly corner of the earth with a rich extensive program.",
            "travel_2": "All sorts of excursions, rent a car world-class, providing a personal interpreter. Booking stunningly beautiful castles, palaces, houses, villas, chalets in any country and much more.",
            "phrase_4_1": "WHY FOR THE EARTH,",
            "phrase_4_2": "WHEN IS",
            "phrase_4_3": "THE SKY?",
            "fly_1_t": "NP-fly business aviation with the newest private planes for flights around the world. First-class service is guaranteed!",
            "fly_2_t": "For the most demanding persons, renting or buying helicopters. At your service is a helicopter taxi. We appreciate your time!",
            "fly_1": "On exclusive terms, we represent the interests of owners and offer for charter flights 5 aircraft and 2 helicopters:",
            "fly_1_1": "Challenger 604 / 2006 (2014) / 12 seats (Moscow-based airport, Vnukovo)",
            "fly_1_2": "Gulfstream 550 / 2012 / 19 seats (Moscow-based airport, Vnukovo)",
            "fly_1_3": "Boeing BBJ / 2010 / 19 seats (Moscow-based airport, Vnukovo)",
            "fly_2": "Embraer Legacy 650 / 2011 /13 seats (Moscow-based airport, Vnukovo)",
            "fly_2_1": "Global 6000 / 2015 / 15 places (Moscow-based airport, Sheremetyevo / Zurich)",
            "fly_2_2": "AgustaWestland AW139 / 2015g / 8 places",
            "fly_2_3": "AgustaWestland AW119 / 2014g / 6 places",
            "fly_2_4": "Also we can pick up any other board in accordance with your tasks.",
            "phrase_5_1": "It's never too late to learn.",
            "phrase_5_2": "to learn!",
            "education_1": "NP-education will help you get a prestigious education for you and your loved ones in Britain, at any university or college.",
            "education_2": "And will provide an opportunity for your child to study at any higher school in London.",
            "phrase_6_1": "REACH",
            "phrase_6_2": "YOUR OPTIMISM!",
            "gastronomic_1_t": "NP-gastronomic Reservation of tables in the best restaurants in the world. Gastronomic tours to Europe.",
            "gastronomic_2_t": "A personal chef will surprise even the most demanding gourmets.",
            "gastronomic_1": "Individual wine and gastronomic tours in the Regions of France, Italy, Spain. Master classes are visited by famous gurus.",
            "gastronomic_2": "On request, individual training with the provision of an interpreter. Author's programs with dinner together with the chef. Full accompaniment with personal guide - translator.",
            "phrase_7_1": "LET YOURSELF LIVE THAT LIFE,",
            "phrase_7_2": "WHICH",
            "phrase_7_3": "YOU WANT TO LIVE!",
            "card_0": "PRIVILÈGE",
            "card_1": "Club card PRIVILÈGE gives new opportunities for owners to receive information about the most significant world events, to have a personal discount for services, to use the free service of hotel selection, restaurant, access to closed events,",
            "card_2": "receive personalized offers on the day of birth. Be in touch with your personal assistant 24/365! All privileges are granted only upon presentation of the Privilège card. All details are only for New Planet Concierge service.",
            "phone_number": "Phone",
            "adress_title": "Adres",
            "adress": "123022 Moscow, Rochdelskaya street 15, building 32",
            "history": "ИСТОРИИ",
            "history_1": "The head of one Eastern European country decided to ride through the canals in St. Petersburg before being served hot. For dessert, a boat for the President and an escort for escort were ready. Northern Venice is beautiful in June.",
            "history_2": "The owner of the apartment on the east coast of the United States, which had carelessness to rent our client, as it turned out, did not differ in decency, and the day before we had unforeseen difficulties. However, a well-written letter from the leading specialist in criminal law of the State of Florida on 5 pages created miracles. And indeed they say: Americans are very law-abiding.",
            "history_3": "What could be better than a basket of bright peonies for a beautiful lady for Christmas? And then 12 hours later the courier from the other end of Europe rushes to the high-altitude Courchevel. Beloved will be satisfied.",
            "history_4": "An unusual birthday present? We asked different people from Japan, Lebanon, Norway and fifteen other countries to write a personal greeting for the hero of the day.",
        }
    });
    update_texts();

    $('.lang-switch').click(function(e) {
        e.preventDefault();
        $.i18n().locale = $(this).data('locale');
        update_texts();
    });

    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);
        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {
            alert("Спасибо, мы скоро с Вами свяжемся!");
            $("form").toggle();
            // $("form").addClass("no_display");
            setTimeout(function() {
                // Done Functions
                th.trigger("reset");
            }, 1000);
        });
        return false;
    });

    $('img.myImage1').zoomify(); // Default settings


    $('img.myImage1').on('zoom-in.zoomify',function(){
        $(this).toggleClass('zindex_max');
        $('.main_item_x2_title').toggle();
        $(this).parent().next().toggle();
    })
    $('img.myImage1').on('zoom-out.zoomify',function(){
        $(this).toggleClass('zindex_max');
        $('.main_item_x2_title').toggle();
        $(this).parent().next().toggle();
    })

});