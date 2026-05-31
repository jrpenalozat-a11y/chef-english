import React, { useState, useEffect } from "react";
import { CURRICULUM_PT, WORDS_PT, LOCAL_PT } from "./data/pt.js";
import { CURRICULUM_ZH, WORDS_ZH, LOCAL_ZH } from "./data/zh.js";

// ─────────────────────────────────────────────────────────────
// CONTENIDO: 30 días · 5 frases por día · gastronomía / servicio
// ─────────────────────────────────────────────────────────────
const CURRICULUM = [
  {
    day: 1, theme: "Recibir al cliente",
    phrases: [
      { en: "Good evening, welcome! Do you have a reservation?", es: "Buenas noches, ¡bienvenido! ¿Tiene reserva?", ipa: "ɡʊd ˈiːvnɪŋ ˈwɛlkəm duː juː hæv ə ˌrɛzərˈveɪʃən" },
      { en: "A table for two? Right this way, please.", es: "¿Mesa para dos? Por aquí, por favor.", ipa: "ə ˈteɪbəl fɔːr tuː raɪt ðɪs weɪ pliːz" },
      { en: "Can I take your coat?", es: "¿Le tomo el abrigo?", ipa: "kæn aɪ teɪk jɔːr koʊt" },
      { en: "Would you prefer a table inside or on the terrace?", es: "¿Prefiere mesa adentro o en la terraza?", ipa: "wʊd juː prɪˈfɜːr ə ˈteɪbəl ɪnˈsaɪd ɔːr ɒn ðə ˈtɛrəs" },
      { en: "I'll be your server tonight.", es: "Seré su mesero/a esta noche.", ipa: "aɪl biː jɔːr ˈsɜːrvər təˈnaɪt" },
    ],
  },
  {
    day: 2, theme: "Tomar el pedido",
    phrases: [
      { en: "Are you ready to order, or do you need a few more minutes?", es: "¿Listos para ordenar o necesitan unos minutos más?", ipa: "ɑːr juː ˈrɛdi tuː ˈɔːrdər ɔːr duː juː niːd ə fjuː mɔːr ˈmɪnɪts" },
      { en: "Can I start you off with something to drink?", es: "¿Empezamos con algo de tomar?", ipa: "kæn aɪ stɑːrt juː ɒf wɪð ˈsʌmθɪŋ tuː drɪŋk" },
      { en: "How would you like your steak cooked?", es: "¿Cómo desea su carne?", ipa: "haʊ wʊd juː laɪk jɔːr steɪk kʊkt" },
      { en: "Would you like to hear today's specials?", es: "¿Le gustaría conocer las sugerencias del día?", ipa: "wʊd juː laɪk tuː hɪər təˈdeɪz ˈspɛʃəlz" },
      { en: "Excellent choice. I'll bring that right out.", es: "Excelente elección. Se lo traigo enseguida.", ipa: "ˈɛksələnt tʃɔɪs aɪl brɪŋ ðæt raɪt aʊt" },
    ],
  },
  {
    day: 3, theme: "Describir platos",
    phrases: [
      { en: "It's a grilled salmon served with seasonal vegetables.", es: "Es salmón a la parrilla con verduras de estación.", ipa: "ɪts ə ɡrɪld ˈsæmən sɜːrvd wɪð ˈsiːzənəl ˈvɛdʒtəbəlz" },
      { en: "This dish is mildly spicy.", es: "Este plato es ligeramente picante.", ipa: "ðɪs dɪʃ ɪz ˈmaɪldli ˈspaɪsi" },
      { en: "The sauce is made in house.", es: "La salsa es de elaboración propia.", ipa: "ðə sɔːs ɪz meɪd ɪn haʊs" },
      { en: "It comes with a side of mashed potatoes.", es: "Viene con una guarnición de puré de papas.", ipa: "ɪt kʌmz wɪð ə saɪd ɒv mæʃt pəˈteɪtoʊz" },
      { en: "It pairs really well with a red wine.", es: "Marida muy bien con un vino tinto.", ipa: "ɪt pɛərz ˈrɪli wɛl wɪð ə rɛd waɪn" },
    ],
  },
  {
    day: 4, theme: "Alergias y dietas",
    phrases: [
      { en: "Do you have any food allergies or dietary restrictions?", es: "¿Tiene alguna alergia o restricción alimentaria?", ipa: "duː juː hæv ˈɛni fuːd ˈælərdʒiz ɔːr ˈdaɪətɛri rɪˈstrɪkʃənz" },
      { en: "This dish is gluten-free.", es: "Este plato es libre de gluten.", ipa: "ðɪs dɪʃ ɪz ˈɡluːtən friː" },
      { en: "We can prepare it without nuts.", es: "Podemos prepararlo sin frutos secos.", ipa: "wiː kæn prɪˈpɛər ɪt wɪˈðaʊt nʌts" },
      { en: "Is this suitable for vegetarians?", es: "¿Esto es apto para vegetarianos?", ipa: "ɪz ðɪs ˈsuːtəbəl fɔːr ˌvɛdʒəˈtɛəriənz" },
      { en: "Let me check with the kitchen for you.", es: "Permítame consultarlo con la cocina.", ipa: "lɛt miː tʃɛk wɪð ðə ˈkɪtʃən fɔːr juː" },
    ],
  },
  {
    day: 5, theme: "Durante la comida",
    phrases: [
      { en: "How is everything tasting?", es: "¿Qué tal está todo?", ipa: "haʊ ɪz ˈɛvriθɪŋ ˈteɪstɪŋ" },
      { en: "Can I get you anything else?", es: "¿Desea algo más?", ipa: "kæn aɪ ɡɛt juː ˈɛniθɪŋ ɛls" },
      { en: "Let me refill your water.", es: "Le relleno el agua.", ipa: "lɛt miː ˈriːfɪl jɔːr ˈwɔːtər" },
      { en: "I'll clear these plates for you.", es: "Le retiro estos platos.", ipa: "aɪl klɪər ðiːz pleɪts fɔːr juː" },
      { en: "Take your time, there's no rush.", es: "Tómese su tiempo, no hay apuro.", ipa: "teɪk jɔːr taɪm ðɛərz noʊ rʌʃ" },
    ],
  },
  {
    day: 6, theme: "Resolver problemas",
    phrases: [
      { en: "I'm so sorry about that. Let me fix it right away.", es: "Lamento mucho eso. Permítame solucionarlo enseguida.", ipa: "aɪm soʊ ˈsɒri əˈbaʊt ðæt lɛt miː fɪks ɪt raɪt əˈweɪ" },
      { en: "I'll bring you a fresh one.", es: "Le traigo uno nuevo.", ipa: "aɪl brɪŋ juː ə frɛʃ wʌn" },
      { en: "Of course, I'll take that off the bill.", es: "Por supuesto, lo descuento de la cuenta.", ipa: "ɒv kɔːrs aɪl teɪk ðæt ɒf ðə bɪl" },
      { en: "Thank you for letting me know.", es: "Gracias por avisarme.", ipa: "θæŋk juː fɔːr ˈlɛtɪŋ miː noʊ" },
      { en: "Is there anything I can do to make it right?", es: "¿Hay algo que pueda hacer para compensarlo?", ipa: "ɪz ðɛər ˈɛniθɪŋ aɪ kæn duː tuː meɪk ɪt raɪt" },
    ],
  },
  {
    day: 7, theme: "La cuenta",
    phrases: [
      { en: "Would you like the bill all together or separately?", es: "¿La cuenta junta o por separado?", ipa: "wʊd juː laɪk ðə bɪl ɔːl təˈɡɛðər ɔːr ˈsɛprətli" },
      { en: "How would you like to pay?", es: "¿Cómo desea pagar?", ipa: "haʊ wʊd juː laɪk tuː peɪ" },
      { en: "We accept cash and card.", es: "Aceptamos efectivo y tarjeta.", ipa: "wiː əkˈsɛpt kæʃ ænd kɑːrd" },
      { en: "The tip is not included.", es: "La propina no está incluida.", ipa: "ðə tɪp ɪz nɒt ɪnˈkluːdɪd" },
      { en: "Thank you, have a great night!", es: "Gracias, ¡que tenga buena noche!", ipa: "θæŋk juː hæv ə ɡreɪt naɪt" },
    ],
  },
  {
    day: 8, theme: "En la cocina",
    phrases: [
      { en: "Order up! Table five.", es: "¡Listo para servir! Mesa cinco.", ipa: "ˈɔːrdər ʌp ˈteɪbəl faɪv" },
      { en: "We're out of the salmon.", es: "Se nos acabó el salmón.", ipa: "wɪr aʊt ɒv ðə ˈsæmən" },
      { en: "Can you fire the appetizers?", es: "¿Puedes mandar las entradas?", ipa: "kæn juː ˈfaɪər ðiː ˈæpɪtaɪzərz" },
      { en: "This needs to go out hot.", es: "Esto tiene que salir caliente.", ipa: "ðɪs niːdz tuː ɡoʊ aʊt hɒt" },
      { en: "Behind you, hot pan!", es: "¡Detrás de ti, sartén caliente!", ipa: "bɪˈhaɪnd juː hɒt pæn" },
    ],
  },
  {
    day: 9, theme: "En el bar",
    phrases: [
      { en: "What can I get started for you?", es: "¿Qué le preparo?", ipa: "wɒt kæn aɪ ɡɛt ˈstɑːrtɪd fɔːr juː" },
      { en: "Would you like that on the rocks or neat?", es: "¿Lo desea con hielo o solo?", ipa: "wʊd juː laɪk ðæt ɒn ðə rɒks ɔːr niːt" },
      { en: "Can I see some ID, please?", es: "¿Me muestra una identificación, por favor?", ipa: "kæn aɪ siː sʌm ˌaɪˈdiː pliːz" },
      { en: "Last call for drinks.", es: "Última ronda de tragos.", ipa: "lɑːst kɔːl fɔːr drɪŋks" },
      { en: "This one's on the house.", es: "Esta va por la casa.", ipa: "ðɪs wʌnz ɒn ðə haʊs" },
    ],
  },
  {
    day: 10, theme: "Recomendar",
    phrases: [
      { en: "If I may suggest, the lamb is excellent today.", es: "Si me permite sugerir, el cordero está excelente hoy.", ipa: "ɪf aɪ meɪ səˈdʒɛst ðə læm ɪz ˈɛksələnt təˈdeɪ" },
      { en: "It's one of our most popular dishes.", es: "Es uno de nuestros platos más populares.", ipa: "ɪts wʌn ɒv ˈaʊər moʊst ˈpɒpjələr ˈdɪʃɪz" },
      { en: "For dessert, I'd recommend the cheesecake.", es: "De postre, le recomiendo el cheesecake.", ipa: "fɔːr dɪˈzɜːrt aɪd ˌrɛkəˈmɛnd ðə ˈtʃiːzkeɪk" },
      { en: "It's light, perfect after a big meal.", es: "Es ligero, perfecto tras una comida abundante.", ipa: "ɪts laɪt ˈpɜːrfɪkt ˈɑːftər ə bɪɡ miːl" },
      { en: "Trust me, you won't be disappointed.", es: "Confíe en mí, no se va a decepcionar.", ipa: "trʌst miː juː woʊnt biː ˌdɪsəˈpɔɪntɪd" },
    ],
  },
  {
    day: 11, theme: "Reservas por teléfono",
    phrases: [
      { en: "Thank you for calling, how may I help you?", es: "Gracias por llamar, ¿en qué puedo ayudarle?", ipa: "θæŋk juː fɔːr ˈkɔːlɪŋ haʊ meɪ aɪ hɛlp juː" },
      { en: "For what date and time?", es: "¿Para qué fecha y hora?", ipa: "fɔːr wɒt deɪt ænd taɪm" },
      { en: "How many people will be in your party?", es: "¿Para cuántas personas?", ipa: "haʊ ˈmɛni ˈpiːpəl wɪl biː ɪn jɔːr ˈpɑːrti" },
      { en: "Could I have a name for the reservation?", es: "¿Me da un nombre para la reserva?", ipa: "kʊd aɪ hæv ə neɪm fɔːr ðə ˌrɛzərˈveɪʃən" },
      { en: "We look forward to seeing you.", es: "Lo esperamos con gusto.", ipa: "wiː lʊk ˈfɔːrwərd tuː ˈsiːɪŋ juː" },
    ],
  },
  {
    day: 12, theme: "Vinos y maridaje",
    phrases: [
      { en: "Would you like to see the wine list?", es: "¿Desea ver la carta de vinos?", ipa: "wʊd juː laɪk tuː siː ðə waɪn lɪst" },
      { en: "This is a dry, full-bodied red.", es: "Es un tinto seco y con cuerpo.", ipa: "ðɪs ɪz ə draɪ ˈfʊlˈbɒdid rɛd" },
      { en: "May I pour you a taste first?", es: "¿Le sirvo una cata primero?", ipa: "meɪ aɪ pɔːr juː ə teɪst fɜːrst" },
      { en: "It has notes of cherry and oak.", es: "Tiene notas de cereza y roble.", ipa: "ɪt hæz noʊts ɒv ˈtʃɛri ænd oʊk" },
      { en: "Shall I leave the bottle on the table?", es: "¿Dejo la botella en la mesa?", ipa: "ʃæl aɪ liːv ðə ˈbɒtəl ɒn ðə ˈteɪbəl" },
    ],
  },
  {
    day: 13, theme: "Despedida y fidelizar",
    phrases: [
      { en: "I hope you enjoyed your meal.", es: "Espero que haya disfrutado su comida.", ipa: "aɪ hoʊp juː ɪnˈdʒɔɪd jɔːr miːl" },
      { en: "Please come back and see us soon.", es: "Por favor, vuelva a vernos pronto.", ipa: "pliːz kʌm bæk ænd siː ʌs suːn" },
      { en: "Here's our card if you'd like to book again.", es: "Aquí tiene nuestra tarjeta si desea reservar de nuevo.", ipa: "hɪrz ˈaʊər kɑːrd ɪf juːd laɪk tuː bʊk əˈɡɛn" },
      { en: "It was a pleasure serving you.", es: "Fue un placer atenderle.", ipa: "ɪt wɒz ə ˈplɛʒər ˈsɜːrvɪŋ juː" },
      { en: "Drive safely, good night!", es: "Maneje con cuidado, ¡buenas noches!", ipa: "draɪv ˈseɪfli ɡʊd naɪt" },
    ],
  },
  {
    day: 14, theme: "Frases de equipo",
    phrases: [
      { en: "I've got table seven covered.", es: "Yo me encargo de la mesa siete.", ipa: "aɪv ɡɒt ˈteɪbəl ˈsɛvən ˈkʌvərd" },
      { en: "Can you give me a hand running food?", es: "¿Me das una mano sacando los platos?", ipa: "kæn juː ɡɪv miː ə hænd ˈrʌnɪŋ fuːd" },
      { en: "We're slammed tonight.", es: "Estamos a tope esta noche.", ipa: "wɪr slæmd təˈnaɪt" },
      { en: "Let's reset this table for the next guests.", es: "Preparemos esta mesa para los próximos clientes.", ipa: "lɛts ˌriːˈsɛt ðɪs ˈteɪbəl fɔːr ðə nɛkst ɡɛsts" },
      { en: "Great work today, team.", es: "Buen trabajo hoy, equipo.", ipa: "ɡreɪt wɜːrk təˈdeɪ tiːm" },
    ],
  },
  {
    day: 15, theme: "Sentar a los comensales",
    phrases: [
      { en: "Your table is ready, please follow me.", es: "Su mesa está lista, sígame por favor.", ipa: "jɔːr ˈteɪbəl ɪz ˈrɛdi pliːz ˈfɒloʊ miː" },
      { en: "Would this table be alright for you?", es: "¿Esta mesa le parece bien?", ipa: "wʊd ðɪs ˈteɪbəl biː ɔːlˈraɪt fɔːr juː" },
      { en: "Please, have a seat.", es: "Por favor, tome asiento.", ipa: "pliːz hæv ə siːt" },
      { en: "Can I bring a high chair for the little one?", es: "¿Le traigo una sillita para el pequeño?", ipa: "kæn aɪ brɪŋ ə haɪ tʃɛər fɔːr ðə ˈlɪtəl wʌn" },
      { en: "Here are your menus. I'll give you a moment.", es: "Aquí tienen las cartas. Les doy un momento.", ipa: "hɪər ɑːr jɔːr ˈmɛnjuːz aɪl ɡɪv juː ə ˈmoʊmənt" },
    ],
  },
  {
    day: 16, theme: "Presentar la carta",
    phrases: [
      { en: "Have you dined with us before?", es: "¿Nos ha visitado antes?", ipa: "hæv juː daɪnd wɪð ʌs bɪˈfɔːr" },
      { en: "Our menu is divided into starters, mains and desserts.", es: "Nuestra carta se divide en entradas, principales y postres.", ipa: "ˈaʊər ˈmɛnjuː ɪz dɪˈvaɪdɪd ˈɪntuː ˈstɑːrtərz meɪnz ænd dɪˈzɜːrts" },
      { en: "The dishes marked here are our chef's signatures.", es: "Los platos marcados aquí son los de autor del chef.", ipa: "ðə ˈdɪʃɪz mɑːrkt hɪər ɑːr ˈaʊər ʃɛfs ˈsɪɡnətʃərz" },
      { en: "Everything is freshly prepared, so it may take a little time.", es: "Todo se prepara al momento, puede tomar un poco de tiempo.", ipa: "ˈɛvriθɪŋ ɪz ˈfrɛʃli prɪˈpɛərd soʊ ɪt meɪ teɪk ə ˈlɪtəl taɪm" },
      { en: "Please let me know if you have any questions.", es: "Avíseme si tiene alguna pregunta.", ipa: "pliːz lɛt miː noʊ ɪf juː hæv ˈɛni ˈkwɛstʃənz" },
    ],
  },
  {
    day: 17, theme: "Sugerir bebidas en mesa",
    phrases: [
      { en: "Can I bring you some water while you decide? Still or sparkling?", es: "¿Le traigo agua mientras decide? ¿Sin gas o con gas?", ipa: "kæn aɪ brɪŋ juː sʌm ˈwɔːtər waɪl juː dɪˈsaɪd stɪl ɔːr ˈspɑːrklɪŋ" },
      { en: "Would you care for a drink before your meal?", es: "¿Desea una bebida antes de la comida?", ipa: "wʊd juː kɛər fɔːr ə drɪŋk bɪˈfɔːr jɔːr miːl" },
      { en: "We have a nice house wine by the glass.", es: "Tenemos un buen vino de la casa por copa.", ipa: "wiː hæv ə naɪs haʊs waɪn baɪ ðə ɡlɑːs" },
      { en: "Can I get those drinks started for you?", es: "¿Le voy preparando esas bebidas?", ipa: "kæn aɪ ɡɛt ðoʊz drɪŋks ˈstɑːrtɪd fɔːr juː" },
      { en: "I'll be right back with your drinks.", es: "Vuelvo enseguida con sus bebidas.", ipa: "aɪl biː raɪt bæk wɪð jɔːr drɪŋks" },
    ],
  },
  {
    day: 18, theme: "Anotar el pedido con detalle",
    phrases: [
      { en: "And for your starter?", es: "¿Y de entrada?", ipa: "ænd fɔːr jɔːr ˈstɑːrtər" },
      { en: "Would you like that as a starter or a main?", es: "¿Lo desea de entrada o de principal?", ipa: "wʊd juː laɪk ðæt æz ə ˈstɑːrtər ɔːr ə meɪn" },
      { en: "Any sides with that?", es: "¿Alguna guarnición con eso?", ipa: "ˈɛni saɪdz wɪð ðæt" },
      { en: "Let me read that back to you.", es: "Permítame repetirle el pedido.", ipa: "lɛt miː riːd ðæt bæk tuː juː" },
      { en: "Would you like everything brought out together?", es: "¿Desea que traigamos todo junto?", ipa: "wʊd juː laɪk ˈɛvriθɪŋ brɔːt aʊt təˈɡɛðər" },
    ],
  },
  {
    day: 19, theme: "Modificar y personalizar",
    phrases: [
      { en: "Of course, I can leave the onions off.", es: "Por supuesto, puedo dejarlo sin cebolla.", ipa: "ɒv kɔːrs aɪ kæn liːv ðiː ˈʌnjənz ɒf" },
      { en: "Would you like the dressing on the side?", es: "¿Desea el aderezo aparte?", ipa: "wʊd juː laɪk ðə ˈdrɛsɪŋ ɒn ðə saɪd" },
      { en: "We can make that a smaller portion for the child.", es: "Podemos hacerlo en porción más pequeña para el niño.", ipa: "wiː kæn meɪk ðæt ə ˈsmɔːlər ˈpɔːrʃən fɔːr ðə tʃaɪld" },
      { en: "Let me check if the kitchen can do that.", es: "Déjeme ver si la cocina puede hacerlo.", ipa: "lɛt miː tʃɛk ɪf ðə ˈkɪtʃən kæn duː ðæt" },
      { en: "Absolutely, no problem at all.", es: "Claro que sí, ningún problema.", ipa: "ˈæbsəluːtli noʊ ˈprɒbləm æt ɔːl" },
    ],
  },
  {
    day: 20, theme: "Servir los platos en mesa",
    phrases: [
      { en: "Here you are. Careful, the plate is hot.", es: "Aquí tiene. Cuidado, el plato está caliente.", ipa: "hɪər juː ɑːr ˈkɛərfəl ðə pleɪt ɪz hɒt" },
      { en: "Who ordered the grilled chicken?", es: "¿Quién pidió el pollo a la parrilla?", ipa: "huː ˈɔːrdərd ðə ɡrɪld ˈtʃɪkɪn" },
      { en: "Can I grind some fresh pepper on that?", es: "¿Le pongo pimienta recién molida?", ipa: "kæn aɪ ɡraɪnd sʌm frɛʃ ˈpɛpər ɒn ðæt" },
      { en: "Enjoy your meal!", es: "¡Que disfrute su comida!", ipa: "ɪnˈdʒɔɪ jɔːr miːl" },
      { en: "I'll bring the rest of your order in just a moment.", es: "Le traigo el resto del pedido en un momento.", ipa: "aɪl brɪŋ ðə rɛst ɒv jɔːr ˈɔːrdər ɪn dʒʌst ə ˈmoʊmənt" },
    ],
  },
  {
    day: 21, theme: "Atención durante la comida",
    phrases: [
      { en: "Is everything to your liking?", es: "¿Está todo a su gusto?", ipa: "ɪz ˈɛvriθɪŋ tuː jɔːr ˈlaɪkɪŋ" },
      { en: "Would you like some more bread?", es: "¿Desea más pan?", ipa: "wʊd juː laɪk sʌm mɔːr brɛd" },
      { en: "Shall I bring another round of drinks?", es: "¿Le traigo otra ronda de bebidas?", ipa: "ʃæl aɪ brɪŋ əˈnʌðər raʊnd ɒv drɪŋks" },
      { en: "May I clear this for you?", es: "¿Le retiro esto?", ipa: "meɪ aɪ klɪər ðɪs fɔːr juː" },
      { en: "Just wave me over if you need anything.", es: "Hágame una seña si necesita algo.", ipa: "dʒʌst weɪv miː ˈoʊvər ɪf juː niːd ˈɛniθɪŋ" },
    ],
  },
  {
    day: 22, theme: "Manejar mesas grandes",
    phrases: [
      { en: "Are you all together, or separate checks?", es: "¿Van todos juntos o cuentas separadas?", ipa: "ɑːr juː ɔːl təˈɡɛðər ɔːr ˈsɛprət tʃɛks" },
      { en: "I'll take the orders one by one, please.", es: "Tomaré los pedidos uno por uno, por favor.", ipa: "aɪl teɪk ðiː ˈɔːrdərz wʌn baɪ wʌn pliːz" },
      { en: "Let me pull up another chair for you.", es: "Le acerco otra silla.", ipa: "lɛt miː pʊl ʌp əˈnʌðər tʃɛər fɔːr juː" },
      { en: "I'll bring the children's plates out first.", es: "Sacaré primero los platos de los niños.", ipa: "aɪl brɪŋ ðə ˈtʃɪldrənz pleɪts aʊt fɜːrst" },
      { en: "Don't worry, I'll keep track of who had what.", es: "No se preocupe, llevaré la cuenta de quién pidió qué.", ipa: "doʊnt ˈwʌri aɪl kiːp træk ɒv huː hæd wɒt" },
    ],
  },
  {
    day: 23, theme: "Ofrecer postre y café",
    phrases: [
      { en: "Would you care to see the dessert menu?", es: "¿Desea ver la carta de postres?", ipa: "wʊd juː kɛər tuː siː ðə dɪˈzɜːrt ˈmɛnjuː" },
      { en: "Can I tempt you with something sweet?", es: "¿Le tiento con algo dulce?", ipa: "kæn aɪ tɛmpt juː wɪð ˈsʌmθɪŋ swiːt" },
      { en: "Would you like coffee or tea with that?", es: "¿Desea café o té con eso?", ipa: "wʊd juː laɪk ˈkɒfi ɔːr tiː wɪð ðæt" },
      { en: "The desserts are perfect for sharing.", es: "Los postres son perfectos para compartir.", ipa: "ðə dɪˈzɜːrts ɑːr ˈpɜːrfɪkt fɔːr ˈʃɛərɪŋ" },
      { en: "How about a coffee to finish?", es: "¿Qué tal un café para terminar?", ipa: "haʊ əˈbaʊt ə ˈkɒfi tuː ˈfɪnɪʃ" },
    ],
  },
  {
    day: 24, theme: "Lidiar con esperas",
    phrases: [
      { en: "Thank you for your patience, it won't be long.", es: "Gracias por su paciencia, no tardará mucho.", ipa: "θæŋk juː fɔːr jɔːr ˈpeɪʃəns ɪt woʊnt biː lɒŋ" },
      { en: "Your food is just being plated now.", es: "Su comida se está emplatando ahora mismo.", ipa: "jɔːr fuːd ɪz dʒʌst ˈbiːɪŋ ˈpleɪtɪd naʊ" },
      { en: "I'm so sorry for the wait.", es: "Lamento mucho la espera.", ipa: "aɪm soʊ ˈsɒri fɔːr ðə weɪt" },
      { en: "Can I bring you some bread in the meantime?", es: "¿Le traigo algo de pan mientras tanto?", ipa: "kæn aɪ brɪŋ juː sʌm brɛd ɪn ðə ˈmiːntaɪm" },
      { en: "Let me check on that for you right away.", es: "Déjeme verificarlo enseguida.", ipa: "lɛt miː tʃɛk ɒn ðæt fɔːr juː raɪt əˈweɪ" },
    ],
  },
  {
    day: 25, theme: "Quejas en mesa con tacto",
    phrases: [
      { en: "I'm very sorry, let me make this right for you.", es: "Lo siento mucho, déjeme arreglarlo.", ipa: "aɪm ˈvɛri ˈsɒri lɛt miː meɪk ðɪs raɪt fɔːr juː" },
      { en: "Would you like me to bring you something else instead?", es: "¿Desea que le traiga otra cosa en su lugar?", ipa: "wʊd juː laɪk miː tuː brɪŋ juː ˈsʌmθɪŋ ɛls ɪnˈstɛd" },
      { en: "I completely understand, and I apologize.", es: "Lo entiendo perfectamente, y le pido disculpas.", ipa: "aɪ kəmˈpliːtli ˌʌndərˈstænd ænd aɪ əˈpɒlədʒaɪz" },
      { en: "I'll speak with my manager right away.", es: "Hablaré con mi encargado enseguida.", ipa: "aɪl spiːk wɪð maɪ ˈmænɪdʒər raɪt əˈweɪ" },
      { en: "Please accept this with our apologies.", es: "Por favor, acepte esto con nuestras disculpas.", ipa: "pliːz əkˈsɛpt ðɪs wɪð ˈaʊər əˈpɒlədʒiz" },
    ],
  },
  {
    day: 26, theme: "Comensales con apuro",
    phrases: [
      { en: "Are you in a hurry? I can speed things up.", es: "¿Tiene prisa? Puedo agilizarlo.", ipa: "ɑːr juː ɪn ə ˈhʌri aɪ kæn spiːd θɪŋz ʌp" },
      { en: "I'd recommend a dish that comes out quickly.", es: "Le recomendaría un plato que sale rápido.", ipa: "aɪd ˌrɛkəˈmɛnd ə dɪʃ ðæt kʌmz aʊt ˈkwɪkli" },
      { en: "I'll bring your bill with the food to save time.", es: "Le traeré la cuenta con la comida para ahorrar tiempo.", ipa: "aɪl brɪŋ jɔːr bɪl wɪð ðə fuːd tuː seɪv taɪm" },
      { en: "No problem, I'll have you out in time.", es: "Sin problema, lo dejaré listo a tiempo.", ipa: "noʊ ˈprɒbləm aɪl hæv juː aʊt ɪn taɪm" },
      { en: "Would you like that to go instead?", es: "¿Lo prefiere para llevar?", ipa: "wʊd juː laɪk ðæt tuː ɡoʊ ɪnˈstɛd" },
    ],
  },
  {
    day: 27, theme: "Ocasiones especiales en mesa",
    phrases: [
      { en: "Are you celebrating something special tonight?", es: "¿Celebran algo especial esta noche?", ipa: "ɑːr juː ˈsɛləbreɪtɪŋ ˈsʌmθɪŋ ˈspɛʃəl təˈnaɪt" },
      { en: "Happy birthday! This dessert is on us.", es: "¡Feliz cumpleaños! Este postre va por la casa.", ipa: "ˈhæpi ˈbɜːrθdeɪ ðɪs dɪˈzɜːrt ɪz ɒn ʌs" },
      { en: "Would you like me to bring it out with a candle?", es: "¿Desea que lo saque con una vela?", ipa: "wʊd juː laɪk miː tuː brɪŋ ɪt aʊt wɪð ə ˈkændəl" },
      { en: "Congratulations to you both!", es: "¡Felicitaciones a ambos!", ipa: "kənˌɡrætʃəˈleɪʃənz tuː juː boʊθ" },
      { en: "Let me know if there's anything I can do to make it memorable.", es: "Avíseme si puedo hacer algo para que sea memorable.", ipa: "lɛt miː noʊ ɪf ðɛərz ˈɛniθɪŋ aɪ kæn duː tuː meɪk ɪt ˈmɛmərəbəl" },
    ],
  },
  {
    day: 28, theme: "Cerrar la cuenta en mesa",
    phrases: [
      { en: "Whenever you're ready, there's no rush.", es: "Cuando guste, no hay prisa.", ipa: "wɛnˈɛvər jʊr ˈrɛdi ðɛərz noʊ rʌʃ" },
      { en: "Here is your bill. I'll take it whenever you're set.", es: "Aquí tiene la cuenta. La retiro cuando esté listo.", ipa: "hɪər ɪz jɔːr bɪl aɪl teɪk ɪt wɛnˈɛvər jʊr sɛt" },
      { en: "Would you like the receipt?", es: "¿Desea el comprobante?", ipa: "wʊd juː laɪk ðə rɪˈsiːt" },
      { en: "I'll be right back with your change.", es: "Vuelvo enseguida con su vuelto.", ipa: "aɪl biː raɪt bæk wɪð jɔːr tʃeɪndʒ" },
      { en: "Take your time, no hurry at all.", es: "Tómese su tiempo, sin ningún apuro.", ipa: "teɪk jɔːr taɪm noʊ ˈhʌri æt ɔːl" },
    ],
  },
  {
    day: 29, theme: "Frases de cortesía clave",
    phrases: [
      { en: "My pleasure.", es: "Es un placer.", ipa: "maɪ ˈplɛʒər" },
      { en: "Right away, sir / madam.", es: "Enseguida, señor / señora.", ipa: "raɪt əˈweɪ sɜːr ˈmædəm" },
      { en: "I'll be with you in just a moment.", es: "Estaré con usted en un momento.", ipa: "aɪl biː wɪð juː ɪn dʒʌst ə ˈmoʊmənt" },
      { en: "Is there anything else I can get for you?", es: "¿Hay algo más que pueda traerle?", ipa: "ɪz ðɛər ˈɛniθɪŋ ɛls aɪ kæn ɡɛt fɔːr juː" },
      { en: "You're very welcome.", es: "De nada, con mucho gusto.", ipa: "jʊr ˈvɛri ˈwɛlkəm" },
    ],
  },
  {
    day: 30, theme: "Despedir al comensal",
    phrases: [
      { en: "Thank you for joining us tonight.", es: "Gracias por acompañarnos esta noche.", ipa: "θæŋk juː fɔːr ˈdʒɔɪnɪŋ ʌs təˈnaɪt" },
      { en: "I hope to see you again soon.", es: "Espero verle pronto de nuevo.", ipa: "aɪ hoʊp tuː siː juː əˈɡɛn suːn" },
      { en: "Mind the step on your way out.", es: "Cuidado con el escalón a la salida.", ipa: "maɪnd ðə stɛp ɒn jɔːr weɪ aʊt" },
      { en: "It was lovely having you with us.", es: "Fue un gusto tenerle con nosotros.", ipa: "ɪt wɒz ˈlʌvli ˈhævɪŋ juː wɪð ʌs" },
      { en: "Have a wonderful evening!", es: "¡Que tenga una excelente noche!", ipa: "hæv ə ˈwʌndərfəl ˈiːvnɪŋ" },
    ],
  },
];

// Error boundary
class Boundary extends React.Component {
  constructor(p) { super(p); this.state = { err: null }; }
  static getDerivedStateFromError(err) { return { err }; }
  render() {
    if (this.state.err) {
      return (
        <div style={{ fontFamily: "system-ui", padding: 24, color: "#7a3b1d", background: "#f4e6d4", minHeight: "100vh" }}>
          <h2>Algo falló al ejecutar</h2>
          <pre style={{ fontSize: 11, whiteSpace: "pre-wrap", opacity: 0.6 }}>{String(this.state.err)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [started, setStarted] = useState(false);
  const [lang, setLang] = useState("en");

  const playIntro = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();

      const bass = [130, 146, 164, 174];
      bass.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.45);
        gain.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.45);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.45 + 0.5);
        osc.start(ctx.currentTime + i * 0.45);
        osc.stop(ctx.currentTime + i * 0.45 + 0.5);
      });

      [[261,329,392],[293,369,440],[329,415,494],[349,440,523]].forEach((chord, i) => {
        chord.forEach(freq => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain); gain.connect(ctx.destination);
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.45 + 0.1);
          gain.gain.setValueAtTime(0.1, ctx.currentTime + i * 0.45 + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.45 + 0.7);
          osc.start(ctx.currentTime + i * 0.45 + 0.1);
          osc.stop(ctx.currentTime + i * 0.45 + 0.8);
        });
      });

      const mel = [
        {freq:784,t:0.05},{freq:698,t:0.35},{freq:659,t:0.65},
        {freq:587,t:0.95},{freq:523,t:1.3},
        {freq:659,t:1.6},{freq:784,t:1.82},{freq:880,t:2.0},{freq:1047,t:2.18}
      ];
      mel.forEach(({freq,t}, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = "sine";
        const isEnding = i >= 5;
        osc.frequency.setValueAtTime(freq, ctx.currentTime + t);
        gain.gain.setValueAtTime(0.0, ctx.currentTime + t);
        gain.gain.linearRampToValueAtTime(isEnding ? 0.25 : 0.18, ctx.currentTime + t + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + (isEnding ? 0.35 : 0.5));
        osc.start(ctx.currentTime + t);
        osc.stop(ctx.currentTime + t + 0.6);
      });

      [1047, 1319, 1568].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + 2.45 + i * 0.1);
        gain.gain.setValueAtTime(0.2, ctx.currentTime + 2.45 + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.45 + i * 0.1 + 0.8);
        osc.start(ctx.currentTime + 2.45 + i * 0.1);
        osc.stop(ctx.currentTime + 2.45 + i * 0.1 + 0.9);
      });
    } catch {}
    setTimeout(() => setStarted(true), 2800);
  };

  if (!started) {
    const LANGS = [
      { id:"en", flag:"🇬🇧", label:"Inglés",    sub:"English for waiters" },
      { id:"pt", flag:"🇧🇷", label:"Portugués", sub:"Português para garçons" },
      { id:"zh", flag:"🇨🇳", label:"Chino",     sub:"中文服务员用语" },
    ];
    return (
      <Boundary>
        <div style={SW.overlay}>
          <div style={SW.card}>
            <div style={SW.logo}>
              <svg width="64" height="64" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="10" r="6" fill="#f4e6d4"/>
                <path d="M12 28 Q12 20 20 20 Q28 20 28 28 L28 36 L12 36 Z" fill="#f4e6d4"/>
                <path d="M18 20 L20 23 L22 20 L20 22 Z" fill="#7a3b1d"/>
                <path d="M28 24 Q33 22 35 24" stroke="#f4e6d4" strokeWidth="2.5" strokeLinecap="round"/>
                <ellipse cx="35" cy="23" rx="4" ry="1.5" fill="#f4e6d4"/>
                <rect x="24" y="2" width="14" height="9" rx="3" fill="#fff" opacity="0.9"/>
                <path d="M26 11 L24 14 L29 11 Z" fill="#fff" opacity="0.9"/>
                <circle cx="28" cy="6.5" r="1.2" fill="#7a3b1d"/>
                <circle cx="31" cy="6.5" r="1.2" fill="#7a3b1d"/>
                <circle cx="34" cy="6.5" r="1.2" fill="#7a3b1d"/>
              </svg>
            </div>
            <h1 style={SW.title}>Garzón Bilingüe</h1>
            <p style={SW.sub}>Elige el idioma que quieres aprender</p>
            <p style={SW.author}>por Jaime Ricardo Peñaloza</p>
            <div style={{ display:"flex", flexDirection:"column", gap:10, width:"100%", marginTop:8 }}>
              {LANGS.map(l => (
                <button key={l.id}
                  onClick={() => { setLang(l.id); playIntro(); }}
                  style={{ ...SW.langBtn, background: lang===l.id ? "#d4763a" : "rgba(255,255,255,0.12)", border: lang===l.id ? "2px solid #d4763a" : "2px solid rgba(255,255,255,0.2)" }}>
                  <span style={{ fontSize:24 }}>{l.flag}</span>
                  <div style={{ textAlign:"left" }}>
                    <div style={{ fontWeight:700, fontSize:16, color:"#f4e6d4" }}>{l.label}</div>
                    <div style={{ fontSize:12, color:"#c4906a" }}>{l.sub}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Boundary>
    );
  }

  return (
    <Boundary>
      <ChefEnglishApp lang={lang} />
    </Boundary>
  );
}

const SW = {
  overlay: {
    minHeight: "100vh",
    background: "radial-gradient(circle at 30% 20%, #7a3b1d 0%, #4a1f08 60%, #1a0a02 100%)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'Outfit', sans-serif",
  },
  card: {
    display: "flex", flexDirection: "column", alignItems: "center",
    gap: 14, padding: "48px 36px", textAlign: "center",
    maxWidth: 320,
  },
  logo: {
    width: 100, height: 100, borderRadius: 28, background: "#9a4a20",
    display: "grid", placeItems: "center",
    boxShadow: "0 12px 40px #00000060",
  },
  title: {
    fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: 32,
    color: "#f4e6d4", letterSpacing: -0.5, lineHeight: 1.1, margin: 0,
  },
  sub: { fontSize: 15, color: "#d4a882", margin: 0 },
  author: { fontSize: 12, color: "#a07050", margin: 0, marginTop: -6 },
  btn: {
    marginTop: 12, padding: "16px 48px", borderRadius: 99,
    background: "#d4763a", border: "none", color: "#fff",
    fontSize: 18, fontWeight: 700, cursor: "pointer",
    fontFamily: "'Outfit', sans-serif",
    boxShadow: "0 8px 28px #d4763a55",
    transition: "transform .15s",
  },
  langBtn: {
    display:"flex", alignItems:"center", gap:14, padding:"14px 20px",
    borderRadius:16, cursor:"pointer", transition:"all .2s",
    fontFamily:"'Outfit',sans-serif", width:"100%",
  },
};

function ChefEnglishApp({ lang = "en" }) {
  const meta = LANG_META[lang];
  const curriculum = CURRICULA[lang];
  const wordsList  = WORDS_MAP[lang];
  const localSections = LOCAL_MAP[lang];
  const phraseKey = lang; // "en" | "pt" | "zh"
  const [selectedDay, setSelectedDay] = useState(1);
  const [progress, setProgress] = useState(() => {
    try {
      const raw = localStorage.getItem("chefEnglishProgress");
      return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
  });
  const [view, setView] = useState("learn");
  const [flipped, setFlipped] = useState({});
  const [speaking, setSpeaking] = useState(null);
  const [audioError, setAudioError] = useState("");
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem("gbDark") === "1"; } catch { return false; }
  });

  useEffect(() => {
    try { localStorage.setItem("gbDark", dark ? "1" : "0"); } catch {}
  }, [dark]);

  const T = dark ? DARK : LIGHT;

  useEffect(() => {
    try { localStorage.setItem("chefEnglishProgress", JSON.stringify(progress)); } catch {}
  }, [progress]);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const load = () => { if (synth.getVoices().length > 0) {} };
    synth.onvoiceschanged = load;
    load();
  }, []);

  const dayData = curriculum.find((d) => d.day === selectedDay);

  const speak = (text) => {
    setAudioError("");
    const synth = window.speechSynthesis;
    if (!synth || typeof SpeechSynthesisUtterance === "undefined") {
      setAudioError("Tu navegador no soporta síntesis de voz. Prueba en Chrome o Edge.");
      return;
    }
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();
    const targetVoice =
      voices.find((v) => meta.voiceMatch.test(v.lang)) ||
      voices.find((v) => meta.voiceFallback.test(v.lang));
    if (targetVoice) u.voice = targetVoice;
    u.lang = meta.voiceLang;
    u.rate = 0.9;
    u.onstart = () => setSpeaking(text);
    u.onend = () => setSpeaking(null);
    u.onerror = () => { setSpeaking(null); setAudioError("No se pudo reproducir el audio."); };
    synth.speak(u);
  };

  const playBell = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const frequencies = [880, 1108, 1320];
      frequencies.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.07);
        gain.gain.setValueAtTime(0.35, ctx.currentTime + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.07 + 1.2);
        osc.start(ctx.currentTime + i * 0.07);
        osc.stop(ctx.currentTime + i * 0.07 + 1.2);
      });
    } catch {}
  };

  const toggleLearned = (idx) => {
    const key = `${selectedDay}-${idx}`;
    setProgress((p) => {
      const wasLearned = p[key];
      if (!wasLearned) playBell();
      return { ...p, [key]: !p[key] };
    });
  };

  const dayLearnedCount = (day) =>
    curriculum.find((d) => d.day === day).phrases.filter((_, i) => progress[`${day}-${i}`]).length;

  const totalLearned = Object.values(progress).filter(Boolean).length;
  const totalPhrases = curriculum.length * 5;
  const pct = Math.round((totalLearned / totalPhrases) * 100);

  return (
    <div style={{ ...S.root, background: T.rootBg, color: T.text }}>
      <style>{MOBILE_CSS}</style>
      <header style={S.header}>
        <div style={S.brand}>
          <span style={S.logoMark}>
            <svg width="26" height="26" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* cabeza */}
              <circle cx="20" cy="10" r="6" fill="#f4e6d4"/>
              {/* cuerpo con moño de mozo */}
              <path d="M12 28 Q12 20 20 20 Q28 20 28 28 L28 36 L12 36 Z" fill="#f4e6d4"/>
              {/* corbatín */}
              <path d="M18 20 L20 23 L22 20 L20 22 Z" fill="#7a3b1d"/>
              {/* brazo con bandeja */}
              <path d="M28 24 Q33 22 35 24" stroke="#f4e6d4" strokeWidth="2.5" strokeLinecap="round"/>
              <ellipse cx="35" cy="23" rx="4" ry="1.5" fill="#f4e6d4"/>
              {/* burbuja de habla */}
              <rect x="24" y="2" width="14" height="9" rx="3" fill="#fff" opacity="0.9"/>
              <path d="M26 11 L24 14 L29 11 Z" fill="#fff" opacity="0.9"/>
              {/* puntos en burbuja */}
              <circle cx="28" cy="6.5" r="1.2" fill="#7a3b1d"/>
              <circle cx="31" cy="6.5" r="1.2" fill="#7a3b1d"/>
              <circle cx="34" cy="6.5" r="1.2" fill="#7a3b1d"/>
            </svg>
          </span>
          <div>
            <h1 style={{ ...S.title, color: T.text }} className="ce-title">Garzón Bilingüe <span style={{fontSize:16}}>{meta.flag}</span></h1>
            <p style={{ ...S.subtitle, color: T.subtle }} className="ce-subtitle">{meta.subtitle}</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <button
            onClick={() => setDark(d => !d)}
            aria-label="Cambiar modo"
            style={{ ...S.darkBtn, background: T.chipBg, border: `1px solid ${T.chipBorder}`, color: T.subtle }}
          >
            <span className="ce-dark-icon">{dark ? "☀" : "☾"}</span>
            <span className="ce-dark-label">{dark ? " Claro" : " Oscuro"}</span>
          </button>
          <div style={{ ...S.streakBox, background: T.chipBg, border: `1px solid ${T.chipBorder}` }} className="ce-streak">
            <div style={S.streakNum}>{totalLearned}</div>
            <div style={{ ...S.streakLbl, color: T.subtle }}>frases<br />dominadas</div>
          </div>
        </div>
      </header>

      <div style={S.progressWrap}>
        <div style={{ ...S.progressBar, background: T.progressTrack }}>
          <div style={{ ...S.progressFill, width: `${pct}%` }} />
        </div>
        <span style={{ ...S.progressTxt, color: T.subtle }}>{pct}% del curso completo</span>
      </div>

      {audioError && <div style={S.audioWarn}>⚠ {audioError}</div>}

      {/* NAVEGACIÓN PRINCIPAL */}
      <div style={S.mainNav}>
        {["curso","diccionario","local"].map(v => (
          <button key={v} onClick={() => setView(v)}
            style={{ ...S.mainNavBtn, background: view===v ? "#d4763a" : T.chipBg, color: view===v ? "#fff" : T.subtle, border: `1px solid ${view===v ? "#d4763a" : T.chipBorder}` }}>
            {v==="curso" ? "📖 Curso" : v==="diccionario" ? "📚 Diccionario" : "🏠 En el local"}
          </button>
        ))}
      </div>

      {/* ── SECCIÓN CURSO ── */}
      {(view==="learn"||view==="quiz"||view==="curso") && view !== "diccionario" && view !== "local" && (<>
        <div style={S.daysScroll}>
          {curriculum.map((d) => {
            const done = dayLearnedCount(d.day);
            const active = d.day === selectedDay;
            return (
              <button key={d.day}
                onClick={() => { setSelectedDay(d.day); setView("learn"); setFlipped({}); }}
                style={{ ...S.dayChip, background: T.chipBg, border: `1px solid ${T.chipBorder}`, ...(active ? S.dayChipActive : {}), ...(done===5 ? { border:"1px solid #d4763a" } : {}) }}>
                <span style={{ ...S.dayChipNum, color: active?"#f4e6d4":T.text }}>Día {d.day}</span>
                <span style={{ ...S.dayChipTheme, color: active?"#f4e6d4":T.subtle }}>{d.theme}</span>
                <span style={S.dayChipDots}>
                  {[0,1,2,3,4].map(i=>(
                    <i key={i} style={{ ...S.dot, background: progress[`${d.day}-${i}`]?"#d4763a":(active?"#f4e6d455":T.dotEmpty) }} />
                  ))}
                </span>
              </button>
            );
          })}
        </div>
        <div style={S.tabs}>
          <button onClick={() => setView("learn")} style={{ ...S.tab, background: view==="learn"?T.tabActiveBg:T.tabBg, color: view==="learn"?T.tabActiveText:T.subtle }}>Aprender</button>
          <button onClick={() => setView("quiz")}  style={{ ...S.tab, background: view==="quiz" ?T.tabActiveBg:T.tabBg, color: view==="quiz" ?T.tabActiveText:T.subtle }}>Practicar</button>
        </div>
        <main style={S.main}>
          <div style={S.dayHeader}>
            <h2 style={{ ...S.dayTitle, color: T.text }}>Día {dayData.day}</h2>
            <span style={S.dayTheme}>{dayData.theme}</span>
          </div>
          {view==="learn" ? (
            <div style={S.cardList}>
              {dayData && dayData.phrases.map((ph, idx) => {
                const learned = progress[`${selectedDay}-${idx}`];
                const phraseText = ph[phraseKey];
                return (
                  <div key={idx} style={{ ...S.card, background: T.cardBg, border:`1px solid ${learned?"#d4763a":T.cardBorder}`, boxShadow: learned?"0 6px 22px #d4763a22":"0 6px 20px #00000010" }}>
                    <div style={S.cardTop}>
                      <span style={S.cardNum}>{idx+1}</span>
                      <button style={{ ...S.speakBtn, ...(speaking===phraseText?S.speakBtnOn:{}) }} onClick={() => speak(phraseText)}>
                        {speaking===phraseText?"◗ sonando…":"◗ escuchar"}
                      </button>
                    </div>
                    <p style={{ ...S.enText, color: T.enText }}>{phraseText}</p>
                    <p style={S.ipaText}>{meta.pronLabel}: {ph.pron || ph.ipa}</p>
                    <p style={{ ...S.esText, color: T.esText }}>{ph.es}</p>
                    <button onClick={() => toggleLearned(idx)} style={{ ...S.learnBtn, background: learned?"#d4763a":T.learnBtnBg, border: `1px solid ${learned?"#d4763a":T.cardBorder}`, color: learned?"#fff":T.subtle }}>
                      {learned?"✓ Dominada":"Marcar como aprendida"}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <Quiz phrases={dayData.phrases} speak={speak} flipped={flipped} setFlipped={setFlipped} T={T} phraseKey={phraseKey} />
          )}
        </main>
      </>)}

      {/* ── SECCIÓN DICCIONARIO ── */}
      {view==="diccionario" && (
        <Dictionary speak={speak} speaking={speaking} playBell={playBell} T={T} wordsList={wordsList} phraseKey={phraseKey} meta={meta} />
      )}

      {/* ── SECCIÓN EN EL LOCAL ── */}
      {view==="local" && (
        <EnElLocal speak={speak} speaking={speaking} T={T} localSections={localSections} phraseKey={phraseKey} meta={meta} />
      )}

      <footer style={{ ...S.footer, color: T.subtle }}>
        Toca <b>escuchar</b> para oír la pronunciación · practica en voz alta
        <br />
        <span style={{ fontSize: 11, opacity: 0.7, marginTop: 6, display: "block" }}>
          Creado por Jaime Ricardo Peñaloza
        </span>
      </footer>
    </div>
  );
}

function Quiz({ phrases, speak, flipped, setFlipped, T, phraseKey = "en" }) {
  return (
    <div style={S.quizGrid}>
      {phrases.map((ph, i) => {
        const isFlip = flipped[i];
        const phraseText = ph[phraseKey];
        return (
          <div key={i} onClick={() => setFlipped((f) => ({ ...f, [i]: !f[i] }))}
            style={{ ...S.flash, background: isFlip ? T.flashBackBg : T.cardBg, border: `1px solid ${T.cardBorder}` }}>
            {!isFlip ? (
              <>
                <span style={{ ...S.flashHint, color: T.subtle }}>traduce al español →</span>
                <p style={{ ...S.flashEs, color: T.enText }}>{phraseText}</p>
                <span style={{ ...S.flashTap, color: T.subtle }}>toca para revelar →</span>
              </>
            ) : (
              <>
                <p style={S.flashEn}>{ph.es}</p>
                <button style={S.flashSpeak} onClick={(e) => { e.stopPropagation(); speak(phraseText); }}>◗ escuchar</button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── DICCIONARIO: 100 palabras gastronómicas ──────────────────
const WORDS = [
  {en:"reservation",es:"reserva",ipa:"ˌrɛzərˈveɪʃən"},{en:"appetizer",es:"entrada / aperitivo",ipa:"ˈæpɪtaɪzər"},
  {en:"main course",es:"plato principal",ipa:"meɪn kɔːrs"},{en:"dessert",es:"postre",ipa:"dɪˈzɜːrt"},
  {en:"beverage",es:"bebida",ipa:"ˈbɛvərɪdʒ"},{en:"menu",es:"carta / menú",ipa:"ˈmɛnjuː"},
  {en:"bill / check",es:"cuenta",ipa:"bɪl / tʃɛk"},{en:"tip / gratuity",es:"propina",ipa:"tɪp / ɡrəˈtjuːɪti"},
  {en:"waiter",es:"mesero / garzón",ipa:"ˈweɪtər"},{en:"host",es:"anfitrión / recepcionista",ipa:"hoʊst"},
  {en:"chef",es:"chef / cocinero",ipa:"ʃɛf"},{en:"kitchen",es:"cocina",ipa:"ˈkɪtʃən"},
  {en:"table",es:"mesa",ipa:"ˈteɪbəl"},{en:"booth",es:"reservado / cabina",ipa:"buːθ"},
  {en:"terrace",es:"terraza",ipa:"ˈtɛrəs"},{en:"bar",es:"barra / bar",ipa:"bɑːr"},
  {en:"wine list",es:"carta de vinos",ipa:"waɪn lɪst"},{en:"glass",es:"copa / vaso",ipa:"ɡlɑːs"},
  {en:"bottle",es:"botella",ipa:"ˈbɒtəl"},{en:"carafe",es:"jarra",ipa:"kəˈræf"},
  {en:"steak",es:"filete / bife",ipa:"steɪk"},{en:"salmon",es:"salmón",ipa:"ˈsæmən"},
  {en:"chicken",es:"pollo",ipa:"ˈtʃɪkɪn"},{en:"lamb",es:"cordero",ipa:"læm"},
  {en:"seafood",es:"mariscos",ipa:"ˈsiːfuːd"},{en:"vegetables",es:"verduras",ipa:"ˈvɛdʒtəbəlz"},
  {en:"salad",es:"ensalada",ipa:"ˈsæləd"},{en:"soup",es:"sopa",ipa:"suːp"},
  {en:"bread",es:"pan",ipa:"brɛd"},{en:"butter",es:"mantequilla",ipa:"ˈbʌtər"},
  {en:"sauce",es:"salsa",ipa:"sɔːs"},{en:"dressing",es:"aderezo",ipa:"ˈdrɛsɪŋ"},
  {en:"seasoning",es:"condimento",ipa:"ˈsiːzənɪŋ"},{en:"pepper",es:"pimienta",ipa:"ˈpɛpər"},
  {en:"salt",es:"sal",ipa:"sɔːlt"},{en:"oil",es:"aceite",ipa:"ɔɪl"},
  {en:"vinegar",es:"vinagre",ipa:"ˈvɪnɪɡər"},{en:"garlic",es:"ajo",ipa:"ˈɡɑːrlɪk"},
  {en:"onion",es:"cebolla",ipa:"ˈʌnjən"},{en:"mushroom",es:"champiñón",ipa:"ˈmʌʃruːm"},
  {en:"rare",es:"vuelta y vuelta",ipa:"rɛr"},{en:"medium",es:"al punto",ipa:"ˈmiːdiəm"},
  {en:"well done",es:"bien cocido",ipa:"wɛl dʌn"},{en:"grilled",es:"a la parrilla",ipa:"ɡrɪld"},
  {en:"fried",es:"frito",ipa:"fraɪd"},{en:"baked",es:"al horno",ipa:"beɪkt"},
  {en:"steamed",es:"al vapor",ipa:"stiːmd"},{en:"roasted",es:"asado",ipa:"ˈroʊstɪd"},
  {en:"fresh",es:"fresco",ipa:"frɛʃ"},{en:"seasonal",es:"de temporada",ipa:"ˈsiːzənəl"},
  {en:"organic",es:"orgánico",ipa:"ɔːrˈɡænɪk"},{en:"homemade",es:"casero",ipa:"ˈhoʊmmeɪd"},
  {en:"gluten-free",es:"sin gluten",ipa:"ˈɡluːtən friː"},{en:"vegan",es:"vegano",ipa:"ˈviːɡən"},
  {en:"vegetarian",es:"vegetariano",ipa:"ˌvɛdʒəˈtɛəriən"},{en:"dairy-free",es:"sin lácteos",ipa:"ˈdɛri friː"},
  {en:"allergy",es:"alergia",ipa:"ˈælərdʒi"},{en:"nuts",es:"frutos secos",ipa:"nʌts"},
  {en:"shellfish",es:"mariscos de concha",ipa:"ˈʃɛlfɪʃ"},{en:"spicy",es:"picante",ipa:"ˈspaɪsi"},
  {en:"mild",es:"suave / no picante",ipa:"maɪld"},{en:"sweet",es:"dulce",ipa:"swiːt"},
  {en:"sour",es:"ácido",ipa:"ˈsaʊər"},{en:"bitter",es:"amargo",ipa:"ˈbɪtər"},
  {en:"portion",es:"porción",ipa:"ˈpɔːrʃən"},{en:"side dish",es:"guarnición",ipa:"saɪd dɪʃ"},
  {en:"platter",es:"bandeja / fuente",ipa:"ˈplætər"},{en:"tasting menu",es:"menú degustación",ipa:"ˈteɪstɪŋ ˈmɛnjuː"},
  {en:"special",es:"sugerencia del día",ipa:"ˈspɛʃəl"},{en:"pairing",es:"maridaje",ipa:"ˈpɛərɪŋ"},
  {en:"sparkling water",es:"agua con gas",ipa:"ˈspɑːrklɪŋ ˈwɔːtər"},{en:"still water",es:"agua sin gas",ipa:"stɪl ˈwɔːtər"},
  {en:"house wine",es:"vino de la casa",ipa:"haʊs waɪn"},{en:"red wine",es:"vino tinto",ipa:"rɛd waɪn"},
  {en:"white wine",es:"vino blanco",ipa:"waɪt waɪn"},{en:"rosé",es:"vino rosado",ipa:"roʊˈzeɪ"},
  {en:"draft beer",es:"cerveza de barril",ipa:"dræft bɪr"},{en:"cocktail",es:"cóctel",ipa:"ˈkɒkteɪl"},
  {en:"on the rocks",es:"con hielo",ipa:"ɒn ðə rɒks"},{en:"neat",es:"solo / sin hielo",ipa:"niːt"},
  {en:"espresso",es:"café espresso",ipa:"ɛˈsprɛsoʊ"},{en:"cappuccino",es:"capuchino",ipa:"ˌkæpʊˈtʃiːnoʊ"},
  {en:"receipt",es:"boleta / comprobante",ipa:"rɪˈsiːt"},{en:"cash",es:"efectivo",ipa:"kæʃ"},
  {en:"credit card",es:"tarjeta de crédito",ipa:"ˈkrɛdɪt kɑːrd"},{en:"change",es:"vuelto",ipa:"tʃeɪndʒ"},
  {en:"complimentary",es:"cortesía de la casa",ipa:"ˌkɒmplɪˈmɛntəri"},{en:"takeaway",es:"para llevar",ipa:"ˈteɪkəweɪ"},
  {en:"refill",es:"rellenar / repetir",ipa:"ˈriːfɪl"},{en:"high chair",es:"silla para bebé",ipa:"haɪ tʃɛr"},
  {en:"manager",es:"encargado / gerente",ipa:"ˈmænɪdʒər"},{en:"complaint",es:"queja / reclamo",ipa:"kəmˈpleɪnt"},
  {en:"feedback",es:"opinión / comentario",ipa:"ˈfiːdbæk"},{en:"reservation book",es:"libro de reservas",ipa:"ˌrɛzərˈveɪʃən bʊk"},
];

// ── EN EL LOCAL ──────────────────────────────────────────────
const LOCAL_SECTIONS = [
  {
    title: "🚻 Indicaciones",
    phrases: [
      {en:"The restrooms are at the back on the left.", es:"Los baños están al fondo a la izquierda.", ipa:"ðə ˈrɛstruːmz ɑːr æt ðə bæk ɒn ðə lɛft"},
      {en:"The exit is straight ahead.", es:"La salida está derecho al frente.", ipa:"ðiː ˈɛksɪt ɪz streɪt əˈhɛd"},
      {en:"The entrance is on the right.", es:"La entrada está a la derecha.", ipa:"ðiː ˈɛntrəns ɪz ɒn ðə raɪt"},
      {en:"The terrace is through that door.", es:"La terraza es por esa puerta.", ipa:"ðə ˈtɛrəs ɪz θruː ðæt dɔːr"},
      {en:"The elevator is next to the bar.", es:"El ascensor está al lado del bar.", ipa:"ðiː ˈɛlɪveɪtər ɪz nɛkst tuː ðə bɑːr"},
      {en:"The parking is in the basement.", es:"El estacionamiento está en el sótano.", ipa:"ðə ˈpɑːrkɪŋ ɪz ɪn ðə ˈbeɪsmənt"},
      {en:"The coat check is near the entrance.", es:"El guardarropa está cerca de la entrada.", ipa:"ðə koʊt tʃɛk ɪz nɪər ðiː ˈɛntrəns"},
    ]
  },
  {
    title: "🗺️ Direcciones",
    phrases: [
      {en:"Turn right.", es:"Gire a la derecha.", ipa:"tɜːrn raɪt"},
      {en:"Turn left.", es:"Gire a la izquierda.", ipa:"tɜːrn lɛft"},
      {en:"Go straight ahead.", es:"Siga derecho.", ipa:"ɡoʊ streɪt əˈhɛd"},
      {en:"It's at the end of the hallway.", es:"Está al final del pasillo.", ipa:"ɪts æt ðiː ɛnd ɒv ðə ˈhɔːlweɪ"},
      {en:"Go up the stairs.", es:"Suba las escaleras.", ipa:"ɡoʊ ʌp ðə stɛrz"},
      {en:"Go down to the lower level.", es:"Baje al nivel inferior.", ipa:"ɡoʊ daʊn tuː ðə ˈloʊər ˈlɛvəl"},
      {en:"It's just around the corner.", es:"Está justo a la vuelta.", ipa:"ɪts dʒʌst əˈraʊnd ðə ˈkɔːrnər"},
      {en:"Follow me, I'll show you.", es:"Sígame, yo le indico.", ipa:"ˈfɒloʊ miː aɪl ʃoʊ juː"},
    ]
  },
  {
    title: "🚨 Emergencias",
    phrases: [
      {en:"The emergency exit is over there.", es:"La salida de emergencia está por allá.", ipa:"ðiː ɪˈmɜːrdʒənsi ˈɛksɪt ɪz ˈoʊvər ðɛr"},
      {en:"Please stay calm.", es:"Por favor mantenga la calma.", ipa:"pliːz steɪ kɑːm"},
      {en:"I'll call the manager right away.", es:"Llamo al encargado enseguida.", ipa:"aɪl kɔːl ðə ˈmænɪdʒər raɪt əˈweɪ"},
      {en:"Is anyone hurt?", es:"¿Alguien resultó herido?", ipa:"ɪz ˈɛniwʌn hɜːrt"},
      {en:"Do you need medical assistance?", es:"¿Necesita asistencia médica?", ipa:"duː juː niːd ˈmɛdɪkəl əˈsɪstəns"},
      {en:"Please use the emergency exit.", es:"Por favor use la salida de emergencia.", ipa:"pliːz juːz ðiː ɪˈmɜːrdʒənsi ˈɛksɪt"},
    ]
  },
];

// ── Mapas de datos por idioma (deben ir DESPUÉS de CURRICULUM, WORDS, LOCAL_SECTIONS) ──
const CURRICULA = { en: CURRICULUM, pt: CURRICULUM_PT, zh: CURRICULUM_ZH };
const WORDS_MAP = { en: WORDS, pt: WORDS_PT, zh: WORDS_ZH };
const LOCAL_MAP = { en: LOCAL_SECTIONS, pt: LOCAL_PT, zh: LOCAL_ZH };
const LANG_META = {
  en: { flag:"🇬🇧", name:"Inglés",    subtitle:"Servicio de mesas · 30 días · 5 frases al día", pronLabel:"IPA",       voiceLang:"en-US", voiceMatch:/en[-_]US/i, voiceFallback:/^en/i },
  pt: { flag:"🇧🇷", name:"Portugués", subtitle:"Serviço de mesas · 30 dias · 5 frases por dia",  pronLabel:"Pronúncia", voiceLang:"pt-BR", voiceMatch:/pt[-_]BR/i, voiceFallback:/^pt/i },
  zh: { flag:"🇨🇳", name:"Chino",     subtitle:"中文服务员课程 · 30天 · 每天5句",                 pronLabel:"Pinyin",    voiceLang:"zh-CN", voiceMatch:/zh[-_]CN/i, voiceFallback:/^zh/i },
};

function Dictionary({ speak, speaking, playBell, T, wordsList = WORDS, phraseKey = "en", meta = {} }) {
  const [search, setSearch] = useState("");
  const storageKey = `gbDictLearned_${phraseKey}`;
  const [learned, setLearned] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || "{}"); } catch { return {}; }
  });
  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(learned)); } catch {}
  }, [learned, storageKey]);

  const toggle = (i) => {
    setLearned(l => {
      if (!l[i]) playBell();
      return { ...l, [i]: !l[i] };
    });
  };

  const filtered = wordsList.filter(w => {
    const word = w[phraseKey] || w.en || "";
    return word.toLowerCase().includes(search.toLowerCase()) ||
      w.es.toLowerCase().includes(search.toLowerCase());
  });

  const pronLabel = meta.pronLabel || "IPA";

  return (
    <div style={{ padding: "16px 16px 0" }}>
      <div style={S.dayHeader}>
        <h2 style={{ ...S.dayTitle, color: T.text }}>Diccionario</h2>
        <span style={S.dayTheme}>100 palabras clave</span>
      </div>
      <input
        placeholder="🔍 Buscar..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ ...S.searchInput, background: T.cardBg, border: `1px solid ${T.cardBorder}`, color: T.text }}
      />
      <div style={S.cardList}>
        {filtered.map((w, i) => {
          const idx = wordsList.indexOf(w);
          const isLearned = learned[idx];
          const wordText = w[phraseKey] || w.en;
          return (
            <div key={idx} style={{ ...S.card, background: T.cardBg, border: `1px solid ${isLearned ? "#d4763a" : T.cardBorder}`, padding:"14px 16px" }}>
              <div style={S.cardTop}>
                <p style={{ ...S.enText, color: T.enText, fontSize: 17 }}>{wordText}</p>
                <button style={{ ...S.speakBtn, ...(speaking===wordText?S.speakBtnOn:{}) }} onClick={() => speak(wordText)}>
                  {speaking===wordText?"◗ sonando…":"◗ escuchar"}
                </button>
              </div>
              <p style={S.ipaText}>{pronLabel}: {w.pron || w.ipa}</p>
              <p style={{ ...S.esText, color: T.esText, marginBottom: 10 }}>{w.es}</p>
              <button onClick={() => toggle(idx)} style={{ ...S.learnBtn, background: isLearned?"#d4763a":T.learnBtnBg, border: `1px solid ${isLearned?"#d4763a":T.cardBorder}`, color: isLearned?"#fff":T.subtle }}>
                {isLearned ? "✓ Aprendida" : "Marcar como aprendida"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EnElLocal({ speak, speaking, T, localSections = LOCAL_SECTIONS, phraseKey = "en", meta = {} }) {
  const pronLabel = meta.pronLabel || "IPA";
  return (
    <div style={{ padding: "16px 16px 0" }}>
      <div style={S.dayHeader}>
        <h2 style={{ ...S.dayTitle, color: T.text }}>En el local</h2>
        <span style={S.dayTheme}>Indicaciones · Direcciones · Emergencias</span>
      </div>
      {localSections.map((sec, si) => (
        <div key={si} style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 10 }}>{sec.title}</h3>
          <div style={S.cardList}>
            {sec.phrases.map((ph, i) => {
              const phraseText = ph[phraseKey] || ph.en;
              return (
                <div key={i} style={{ ...S.card, background: T.cardBg, border: `1px solid ${T.cardBorder}`, padding:"14px 16px" }}>
                  <div style={S.cardTop}>
                    <p style={{ ...S.enText, color: T.enText, fontSize: 16 }}>{phraseText}</p>
                    <button style={{ ...S.speakBtn, ...(speaking===phraseText?S.speakBtnOn:{}) }} onClick={() => speak(phraseText)}>
                      {speaking===phraseText?"◗ sonando…":"◗ escuchar"}
                    </button>
                  </div>
                  <p style={S.ipaText}>{pronLabel}: {ph.pron || ph.ipa}</p>
                  <p style={{ ...S.esText, color: T.esText, marginBottom: 0 }}>{ph.es}</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── TEMAS DE COLOR ──────────────────────────────────────────
const LIGHT = {
  rootBg: "radial-gradient(circle at 20% 0%, #f4e6d4 0%, #ece0cf 40%, #e3d4bd 100%)",
  text: "#3a2c1e",
  subtle: "#8a6f54",
  enText: "#2a1f14",
  esText: "#6b5640",
  chipBg: "#fff8ef",
  chipBorder: "#e3cfb2",
  progressTrack: "#00000012",
  dotEmpty: "#00000018",
  tabBg: "#00000008",
  tabActiveBg: "#3a2c1e",
  tabActiveText: "#f4e6d4",
  cardBg: "#fffaf3",
  cardBorder: "#e9d8bf",
  learnBtnBg: "#fff",
  flashBackBg: "#3a2c1e",
};
const DARK = {
  rootBg: "radial-gradient(circle at 20% 0%, #1a1210 0%, #221812 40%, #2a1e14 100%)",
  text: "#f0ddc8",
  subtle: "#a08060",
  enText: "#f4e6d4",
  esText: "#c4a07a",
  chipBg: "#2e2018",
  chipBorder: "#4a3020",
  progressTrack: "#ffffff12",
  dotEmpty: "#ffffff18",
  tabBg: "#ffffff08",
  tabActiveBg: "#f4e6d4",
  tabActiveText: "#2a1a0e",
  cardBg: "#261a10",
  cardBorder: "#3e2a18",
  learnBtnBg: "#2e2018",
  flashBackBg: "#0e0a06",
};

const MOBILE_CSS = `
  html, body, #root { min-height: 100%; }
  @media (max-width: 480px) {
    .ce-title { font-size: 17px !important; letter-spacing: -0.3px !important; white-space: nowrap; }
    .ce-subtitle { font-size: 10px !important; white-space: nowrap; }
    .ce-streak { padding: 5px 8px !important; min-width: 56px; }
    .ce-dark-label { display: none; }
    .ce-dark-icon { font-size: 16px; }
  }
`;

const S = {
  root: {
    minHeight: "100vh",
    background: "radial-gradient(circle at 20% 0%, #f4e6d4 0%, #ece0cf 40%, #e3d4bd 100%)",
    fontFamily: "'Outfit', sans-serif",
    color: "#3a2c1e",
    paddingBottom: 40,
    maxWidth: 760,
    margin: "0 auto",
    width: "100%",
    overflowX: "hidden",
  },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 16px 14px", gap: 8 },
  brand: { display: "flex", alignItems: "center", gap: 10, minWidth: 0 },
  logoMark: {
    fontSize: 22, color: "#fff", background: "#7a3b1d",
    width: 40, height: 40, borderRadius: 12, display: "grid", placeItems: "center",
    boxShadow: "0 6px 18px #7a3b1d55", flexShrink: 0,
  },
  title: { fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: 27, letterSpacing: -0.5, lineHeight: 1 },
  subtitle: { fontSize: 13, color: "#8a6f54", marginTop: 4, fontWeight: 400 },
  streakBox: {
    textAlign: "center", background: "#fff8ef", borderRadius: 16, padding: "8px 16px",
    border: "1px solid #e3cfb2", boxShadow: "0 4px 14px #00000010", flexShrink: 0,
  },
  streakNum: { fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: 26, color: "#d4763a", lineHeight: 1 },
  streakLbl: { fontSize: 9.5, color: "#8a6f54", lineHeight: 1.1, marginTop: 2, textTransform: "uppercase", letterSpacing: 0.5 },
  progressWrap: { padding: "0 16px 12px", display: "flex", alignItems: "center", gap: 12 },
  progressBar: { flex: 1, height: 8, background: "#00000012", borderRadius: 99, overflow: "hidden" },
  progressFill: { height: "100%", background: "linear-gradient(90deg,#d4763a,#a8431f)", borderRadius: 99, transition: "width .5s ease" },
  progressTxt: { fontSize: 12, color: "#8a6f54", whiteSpace: "nowrap", fontWeight: 500 },
  daysScroll: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 8, padding: "8px 16px 16px" },
  dayChip: {
    width: "100%", textAlign: "left", cursor: "pointer",
    background: "#fff8ef", border: "1px solid #e3cfb2", borderRadius: 16,
    padding: "12px 14px", display: "flex", flexDirection: "column", gap: 6,
    transition: "all .2s", fontFamily: "'Outfit', sans-serif",
  },
  dayChipActive: { background: "#7a3b1d", border: "1px solid #7a3b1d", boxShadow: "0 8px 22px #7a3b1d44", transform: "translateY(-2px)" },
  dayChipDone: { border: "1px solid #d4763a" },
  dayChipNum: { fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 15 },
  dayChipTheme: { fontSize: 11.5, opacity: 0.75, lineHeight: 1.25, minHeight: 28 },
  dayChipDots: { display: "flex", gap: 4, marginTop: 2 },
  dot: { width: 7, height: 7, borderRadius: 99, display: "block" },
  tabs: { display: "flex", gap: 8, padding: "0 16px 4px" },
  tab: {
    flex: 1, padding: "11px", borderRadius: 12, border: "none", cursor: "pointer",
    background: "#00000008", color: "#8a6f54", fontWeight: 600, fontSize: 14,
    fontFamily: "'Outfit', sans-serif", transition: "all .2s",
  },
  tabActive: { background: "#3a2c1e", color: "#f4e6d4" },
  main: { padding: "16px 16px 0" },
  dayHeader: { display: "flex", alignItems: "baseline", gap: 12, marginBottom: 16 },
  dayTitle: { fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: 22 },
  dayTheme: { fontSize: 14, color: "#a8431f", fontWeight: 600 },
  cardList: { display: "flex", flexDirection: "column", gap: 14 },
  card: {
    background: "#fffaf3", borderRadius: 20, padding: "18px 20px",
    border: "1px solid #e9d8bf", boxShadow: "0 6px 20px #00000010", transition: "all .25s",
  },
  cardLearned: { background: "#fff", border: "1px solid #d4763a", boxShadow: "0 6px 22px #d4763a22" },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  cardNum: {
    fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: 14, color: "#fff",
    background: "#d4763a", width: 26, height: 26, borderRadius: 8, display: "grid", placeItems: "center",
  },
  speakBtn: {
    background: "none", border: "1px solid #d4763a", color: "#a8431f", cursor: "pointer",
    fontSize: 12.5, fontWeight: 600, padding: "5px 12px", borderRadius: 99,
    fontFamily: "'Outfit', sans-serif",
  },
  speakBtnOn: { background: "#d4763a", color: "#fff" },
  audioWarn: {
    margin: "0 16px 12px", padding: "10px 14px", borderRadius: 12,
    background: "#fbe9d8", border: "1px solid #e3a06a", color: "#8a4a1d",
    fontSize: 12.5, lineHeight: 1.5, fontWeight: 500,
  },
  enText: { fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 19, lineHeight: 1.3, color: "#2a1f14" },
  ipaText: { fontSize: 12.5, color: "#b08a5f", fontStyle: "italic", margin: "5px 0 8px" },
  esText: { fontSize: 14.5, color: "#6b5640", marginBottom: 14 },
  learnBtn: {
    width: "100%", padding: "10px", borderRadius: 11, border: "1px solid #e0cba8",
    background: "#fff", color: "#8a6f54", fontWeight: 600, fontSize: 13.5, cursor: "pointer",
    fontFamily: "'Outfit', sans-serif", transition: "all .2s",
  },
  learnBtnDone: { background: "#d4763a", border: "1px solid #d4763a", color: "#fff" },
  quizGrid: { display: "flex", flexDirection: "column", gap: 14 },
  flash: {
    minHeight: 120, borderRadius: 20, padding: "22px 20px", cursor: "pointer",
    background: "#fffaf3", border: "1px solid #e9d8bf", boxShadow: "0 6px 20px #00000010",
    display: "flex", flexDirection: "column", justifyContent: "center", gap: 8, transition: "all .2s",
  },
  flashBack: { background: "#3a2c1e" },
  flashHint: { fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: "#b08a5f", fontWeight: 600 },
  flashEs: { fontFamily: "'Fraunces', serif", fontSize: 19, fontWeight: 600, color: "#2a1f14" },
  flashTap: { fontSize: 12, color: "#b08a5f", marginTop: 4 },
  flashEn: { fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, color: "#f4e6d4", lineHeight: 1.3 },
  flashSpeak: {
    alignSelf: "flex-start", marginTop: 8, background: "#d4763a", border: "none", color: "#fff",
    cursor: "pointer", fontSize: 13, fontWeight: 600, padding: "7px 16px", borderRadius: 99,
    fontFamily: "'Outfit', sans-serif",
  },
  footer: { textAlign: "center", fontSize: 12.5, color: "#9c805f", padding: "26px 16px 0", lineHeight: 1.6 },
  mainNav: { display:"flex", gap:6, padding:"0 16px 12px", overflowX:"auto" },
  mainNavBtn: { flex:"0 0 auto", padding:"9px 14px", borderRadius:12, border:"none", cursor:"pointer", fontWeight:600, fontSize:13, fontFamily:"'Outfit',sans-serif", transition:"all .2s", whiteSpace:"nowrap" },
  searchInput: { display:"block", width:"100%", marginBottom:14, padding:"11px 14px", borderRadius:12, fontSize:14, fontFamily:"'Outfit',sans-serif", outline:"none" },
  darkBtn: {
    border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600,
    padding: "6px 12px", borderRadius: 99, fontFamily: "'Outfit', sans-serif",
    transition: "all .2s", whiteSpace: "nowrap",
  },
};
