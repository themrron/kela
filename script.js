document.addEventListener('DOMContentLoaded', () => {
    const quoteTextElement = document.getElementById('quoteText');
    const quoteEmojiElement = document.getElementById('quoteEmoji');
    const newQuoteBtn = document.getElementById('newQuoteBtn');
    const copyQuoteBtn = document.getElementById('copyQuoteBtn');
    const whatsappBtn = document.getElementById('whatsappBtn');
    const yourNameInput = document.getElementById('yourName'); // Changed from senderName
    const headerEmoji = document.getElementById('headerEmoji');

    const quotes = [
        { text: "मैंने आज तक किसी को निराश नहीं किया, और यकीन मानो यह सिलसिला आगे भी जारी रहेगा।", emoji: "😜" },
        { text: "ज़िंदगी में टेंशन मेरे पीछे ऐसे पड़ी है, जैसे मैं उसकी पहली मोहब्बत हूँ।", emoji: "😂" },
        { text: "अगर कोई आपकी क़ीमत ना समझे, तो उसे डिस्काउंट दे दो। पैकेजिंग भी फ्री कर देना!", emoji: "😉" },
        { text: "आजकल शरीफ सिर्फ वही लोग हैं, जिनके मोबाइल में पासवर्ड नहीं होता... या जिन्हें याद नहीं रहता।", emoji: "😏" },
        { text: "मेरी ख़ामोशी को मेरी हार मत समझना, बस नेट नहीं चल रहा था।", emoji: "😌" },
        { text: "कुछ रिश्तेदार इतने अच्छे होते हैं कि हम उनका अच्छा सोच भी नहीं सकते... बिना हँसे।", emoji: "🤣" },
        { text: "ज्ञान उतना ही दो जितना सामने वाला पचा सके, बाकी गूगल पर सब मिलता है, और कभी-कभी गलत भी।", emoji: "🤓" },
        { text: "सुबह उठने का एक फायदा है, दोपहर की नींद अच्छी आती है।", emoji: "😴" },
        { text: "शादी एक ऐसा युद्ध है जिसमें दुश्मन के साथ सोना पड़ता है... और रिमोट के लिए भी लड़ना पड़ता है।", emoji: "😬" },
        { text: "जितना बदल सकते थे, बदल लिया खुद को, अब जिसको शिकायत है वो अपना गूगल मैप अपडेट करे।", emoji: "😎" },
        { text: "मैं परफेक्ट नहीं हूँ, लेकिन मैं लिमिटेड एडिशन हूँ... और महंगा भी!", emoji: "🤩" },
        { text: "जो दिल के अच्छे होते हैं, दिमाग वाले उनका खूब फायदा उठाते हैं... और बिल भी उन्हीं के नाम फाड़ते हैं।", emoji: "😢" },
        { text: "आज का ज्ञान: अगर आपकी आवाज़ ऊँची है तो इसका मतलब यह नहीं कि आप सही हैं... बस आपके गले में खराश हो सकती है।", emoji: "🤫" },
        { text: "कुछ लोग इतने सिंगल होते हैं कि उनके यूट्यूब रिकमेन्डेशन में भी 'तन्हाई' गाने आते हैं।", emoji: "😭" },
        { text: "काम ऐसा करो कि चार लोग कहें, 'तुम रहने दो, हम कर लेंगे'... क्योंकि तुमसे नहीं हो पाएगा!", emoji: "👍" },
        { text: "पता नहीं लोग impress कैसे हो जाते हैं, मैं तो मच्छर भी नहीं मार पाता ढंग से।", emoji: "🤷‍♂️" },
        { text: "दिमाग तो बहुत है मेरे पास, बस कभी इस्तेमाल नहीं किया। नया जैसा है!", emoji: "💡" },
        { text: "अगर आपको लगता है कि आप कुछ भी कर सकते हैं, तो एक बार मच्छर को बिना मारे पकड़ कर दिखाओ।", emoji: "🦟" }
    ];

    const headerEmojis = ["🤪", "😂", "🤩", "🥳", "😜", "😎"];
    let currentQuote = {};

    function displayRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        currentQuote = quotes[randomIndex];
        quoteTextElement.textContent = currentQuote.text;
        quoteEmojiElement.textContent = currentQuote.emoji;

        // Trigger emoji animation
        quoteEmojiElement.classList.remove('emoji-pop'); // Remove class to re-trigger
        void quoteEmojiElement.offsetWidth; // Trigger reflow
        quoteEmojiElement.classList.add('emoji-pop');

        // Change header emoji
        headerEmoji.textContent = headerEmojis[Math.floor(Math.random() * headerEmojis.length)];
    }

    function copyQuoteToClipboard() {
        if (!currentQuote.text) return; // No quote to copy

        const textToCopy = `${currentQuote.text} ${currentQuote.emoji}`;
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                // Visual feedback (optional: change button text temporarily)
                const originalText = copyQuoteBtn.innerHTML;
                copyQuoteBtn.innerHTML = 'कॉपी हो गया! ✅';
                setTimeout(() => {
                    copyQuoteBtn.innerHTML = originalText;
                }, 2000);
            })
            .catch(err => {
                console.error('Copying failed: ', err);
                alert("कोट कॉपी करने में विफल!");
            });
    }

    function sendToWhatsApp() {
        const senderName = yourNameInput.value.trim();

        if (!senderName) {
            alert("कृपया अपना नाम दर्ज करें ताकि पता चले किसने भेजा है!");
            yourNameInput.focus();
            return;
        }

        if (!currentQuote.text) {
            alert("पहले एक कोट तो चुनें!");
            return;
        }
        
        const quoteToSend = `${currentQuote.text} ${currentQuote.emoji}`;
        
        // Message as per your request: "(name) he/she send you a funny quotes of you funny life."
        // Interpreting "(name)" as the senderName entered.
        // "he/she" is tricky, so we'll use a more general Hindi phrasing.
        // "आपके मज़ेदार जीवन के लिए" -> "for your funny life"
        const message = `${senderName} आपके मज़ेदार जीवन के लिए आपको यह मज़ेदार कोट भेज रहे हैं:\n\n"${quoteToSend}"\n\nखूब हँसो और हँसाओ! 😄`;

        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }

    // Event Listeners
    newQuoteBtn.addEventListener('click', displayRandomQuote);
    copyQuoteBtn.addEventListener('click', copyQuoteToClipboard);
    whatsappBtn.addEventListener('click', sendToWhatsApp);

    // Display a quote on initial load
    displayRandomQuote();
});
