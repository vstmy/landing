/* ============================================================
   Vestimy - lightweight i18n
 - auto-detects locale from navigator.language (it → Italian)
 - manual override persisted in localStorage ("vestimy_lang")
 - elements opt-in via:
       data-i18n="key"            → textContent
       data-i18n-html="key"       → innerHTML (for copy with <em> etc.)
       data-i18n-attr="attr:key"  → attribute(s), comma-separated
   ============================================================ */
(function () {
  const DICT = {
    en: {
      "meta.title": "Vestimy - Your wardrobe, digitalized.",
      "meta.desc":
        "Vestimy turns your physical wardrobe into a digital one. Scan what you own, compose outfits, and get instant looks built around any garment with Drippamy.",

      "nav.features": "Features",
      "nav.how": "How it works",
      "nav.drippamy": "Drippamy",
      "nav.ai": "AI styling",
      "nav.brands": "For brands",
      "nav.support": "Support",
      "nav.privacy": "Privacy",
      "nav.forbrands": "For brands",
      "nav.getapp": "Join the beta",

      "hero.pill": "Now in beta on iOS",
      "hero.title": "Wear everything <em>you already own.</em>",
      "hero.titleA": "Wear what you",
      "rot.1": "own",
      "rot.2": "love",
      "rot.3": "saved",
      "hero.sub":
        "Scan your closet once. Compose outfits or get AI looks - from what you already own.",
      "hero.cta1": "Join the beta",
      "hero.cta2": "See how it works",
      "hero.note": "Free beta · iOS 17+ · GDPR-first",

      "feat.eyebrow": "What Vestimy does",
      "feat.title": "One place to know what you own - and wear it better.",
      "feat.lead":
        "People own far more than they actually wear. Vestimy gives every item a home, then puts your wardrobe to work.",
      "feat.cat.t": "Catalogue",
      "feat.cat.d":
        "Capture each item as a photo. It's automatically recognized, sorted, and filed - your whole wardrobe at a glance.",
      "feat.comp.t": "Compose",
      "feat.comp.d":
        "Build outfits from clothes you already own. Mix, match and save the looks you'll actually wear.",
      "feat.drip.t": "Drippamy",
      "feat.drip.d":
        "Point your camera at any garment and instantly get full outfit ideas built around it - yours, in a store, or online.",
      "feat.insp.t": "Inspire",
      "feat.insp.d":
        "Get suggested outfits and browse a feed of looks for fresh combinations whenever you need ideas.",

      "how.eyebrow": "How it works",
      "how.title": "From closet to outfit - in three steps.",
      "how.lead": "Scan once. Then Vestimy does the styling.",
      "how.s1.t": "Catalogue",
      "how.s1.d":
        "Scan your clothes once - each piece is cut out, recognized and filed automatically.",
      "how.s2.t": "Compose &amp; style",
      "how.s2.d":
        "Build outfits by hand, or let Vestimy AI suggest complete looks from your closet.",
      "how.s3.t": "Drippamy &amp; discover",
      "how.s3.d":
        "Snap any garment for instant outfit ideas, and browse a feed to stay inspired.",
      "how.step": "STEP",

      "drip.eyebrow": "Drippamy",
      "drip.kicker": "Your camera stylist",
      "drip.title": "Point at a garment. <em>Get the whole fit.</em>",
      "drip.body":
        "Drippamy is Vestimy's camera stylist. Point it at any piece of clothing - one of yours, something on a shop rail, or a photo from your gallery - and it recognises the item, then instantly builds full outfits around it.",
      "drip.name":
        "“Drip” is streetwear slang for a standout outfit. Drippamy = your drip, on demand.",
      "drip.l1": "No need to own the item - style it before you buy",
      "drip.l2": "Swipe a gallery of complete looks built around it",
      "drip.l3": "One tap to retake and try another piece",
      "drip.cta": "Try Drippamy",

      /* AI outfit suggestions */
      "ai.eyebrow": "Outfit intelligence",
      "ai.title": "Build looks by hand - or let Vestimy AI style you.",
      "ai.lead":
        "Compose outfits yourself from your closet, or get ready-made looks the AI builds from what you already own. Accept, tweak, or dismiss - it learns what you wear.",
      "ai.manual.tag": "Manual",
      "ai.manual.t": "Compose it yourself",
      "ai.manual.d":
        "Pick pieces from your wardrobe, mix and match, and save the combinations you love.",
      "ai.manual.cta": "+ New outfit",
      "ai.ai.tag": "Vestimy AI",
      "ai.ai.t": "Suggested for you",
      "ai.ai.d":
        "The AI reads your closet and proposes complete outfits - one tap to accept the look.",
      "ai.ai.accept": "Accept look",
      "ai.r1": "Matches your colors",
      "ai.r2": "Right for the season",
      "ai.r3": "Built from your closet",

      "brand.eyebrow": "For brands &amp; retailers",
      "brand.title": "Be the piece that completes the look.",
      "brand.body":
        "Vestimy sits where intent is highest - inside the wardrobe, at the moment someone is styling an outfit. Your product isn't just targeted to a shopper: it's suggested in context, to complete a look built from clothes they already own.",
      "brand.b1":
        "Your product proposed inside AI outfit suggestions - next to items the user already owns",
      "brand.b2":
        "Contextual, not just targeted - matched to the real wardrobe and the gap in a specific look",
      "brand.b3":
        "Shown the instant intent peaks: while composing or accepting an outfit",
      "brand.b4":
        "Privacy-first matching on aggregated signals - no ad trackers, no IDFA / AAID",
      "brand.cta": "Partner with Vestimy",
      "brand.s1": "Scan once, styled forever",
      "brand.s2": "Surfaces: Closet, Drippamy, Explore",
      "brand.s3": "GDPR-first data handling",
      "brand.s4": "Ad trackers - no IDFA / AAID",
      /* contextual placement visual */
      "brand.ctxOwned": "Already in the closet",
      "brand.ctxFrom": "From STUDIO LOOK",
      "brand.ctxTag": "Completes the look",
      "brand.ctxCap": "Suggested because it pairs with 3 items already in this wardrobe.",

      /* ===== BRAND LANDING (brands.html) ===== */
      "bl.meta.title": "Vestimy for Brands - Be the piece that completes the look.",
      "bl.meta.desc":
        "Contextual product placement inside real wardrobes. Your product suggested to complete AI outfits built from what shoppers already own. Privacy-first, no ad trackers.",
      "bl.nav.why": "Why Vestimy",
      "bl.nav.how": "How it works",
      "bl.nav.context": "Contextual",
      "bl.nav.shoppers": "For shoppers",
      "bl.nav.cta": "Book a demo",
      "bl.hero.eyebrow": "Vestimy for brands",
      "bl.hero.title": "Be the piece that <em>completes the look.</em>",
      "bl.hero.sub":
        "Not just targeted - contextual. Your product, suggested inside outfits built from clothes shoppers already own.",
      "bl.hero.cta1": "Book a demo",
      "bl.hero.cta2": "Partner with us",
      "bl.tick.1": "Contextual",
      "bl.tick.2": "Not just targeted",
      "bl.tick.3": "Inside the wardrobe",
      "bl.tick.4": "Privacy-first",
      "bl.v.eyebrow": "Why it works",
      "bl.v.title": "Intent peaks where people get dressed.",
      "bl.v1.t": "High intent",
      "bl.v1.d": "Shown while someone is actively styling an outfit - not mid-scroll.",
      "bl.v2.t": "Contextual",
      "bl.v2.d": "Matched to the real wardrobe and the gap in a specific look.",
      "bl.v3.t": "Privacy-first",
      "bl.v3.d": "Aggregated signals only. No ad trackers, no IDFA / AAID.",
      "bl.v4.t": "Direct to buy",
      "bl.v4.d": "One tap from a suggested look to your store.",
      "bl.how.eyebrow": "How partnership works",
      "bl.how.title": "From catalogue to completed look.",
      "bl.h1.t": "Connect your catalogue",
      "bl.h1.d": "Send a product feed - images, categories, colors, links.",
      "bl.h2.t": "We match to wardrobes",
      "bl.h2.d": "Vestimy maps your pieces to real closets and outfit gaps.",
      "bl.h3.t": "Appear in AI outfits",
      "bl.h3.d": "Your product is suggested to complete a look the user owns.",
      "bl.h4.t": "Shoppers buy",
      "bl.h4.d": "A tap opens your store, in the moment of intent.",
      "bl.ctx.eyebrow": "Contextual placement",
      "bl.ctx.title": "Your product, where it belongs.",
      "bl.ctx.body":
        "Vestimy reads the closet, finds the missing piece, and places yours - next to items the shopper already owns.",
      "bl.cta.title": "Put your catalogue inside the wardrobe.",
      "bl.cta.body": "Let's talk about contextual placement for your brand.",
      "bl.cta.btn": "Book a demo",
      "bl.foot.shoppers": "For shoppers",

      "cta.eyebrow": "Get started",
      "cta.title": "The beta is open.",
      "cta.body":
        "We're letting in early testers now. Join the beta on TestFlight and help shape Vestimy before launch.",
      "cta.ios": "Join the beta on TestFlight",
      "cta.android": "Android? Get notified",

      "foot.tag":
        "Vestimy digitalizes your wardrobe, helps you compose outfits, and inspires the next look - without buying more.",
      "foot.product": "Product",
      "foot.company": "Company",
      "foot.legal": "Legal",
      "foot.features": "Features",
      "foot.how": "How it works",
      "foot.drippamy": "Drippamy",
      "foot.download": "Download",
      "foot.forbrands": "For brands",
      "foot.partner": "Partnerships",
      "foot.support": "Support",
      "foot.contact": "Contact",
      "foot.privacy": "Privacy Policy",
      "foot.datareq": "Data requests",
      "foot.delete": "Delete account",
      "foot.rights": "© 2026 Vestimy. All rights reserved.",
      "foot.made": "Made in the EU · privacy@vestimy.com",

      /* in-app mockup labels */
      "app.closet": "Closet",
      "app.drippamy": "Drippamy",
      "app.explore": "Explore",
      "app.items": "48 items",
      "app.suggested": "SUGGESTED",
      "app.photoTips": "Photo tips",
      "app.contrast": "Pick a contrasting background",
      "app.contrastDesc":
        "A clear difference between garment and background helps Vestimy isolate the piece.",
      "app.next": "Next",
      "app.buy": "Buy",
      "app.tryon": "Vestimy",
      "app.product": "Wool knit jumper",
      "app.brand": "STUDIO LOOK",

      /* hero floating tags */
      "tag.added": "Added to closet",
      "tag.recognized": "Auto-recognized",
      "tag.colors": "Dominant colors",

      /* marquee ticker */
      "tick.1": "Digitalize your wardrobe",
      "tick.2": "Style with AI",
      "tick.3": "Wear what you own",
      "tick.4": "Drippamy any garment",

      /* catalogue band */
      "cat.eyebrow": "Your closet, catalogued",
      "cat.title": "Every piece - recognized, tagged and color-matched automatically.",
      "cat.lead":
        "Snap a garment and Vestimy cuts it out, identifies the category, and pulls its dominant colors. No manual tagging.",
      "cat.j.n": "Chore jacket",
      "cat.j.c": "Outerwear",
      "cat.t.n": "Cotton tee",
      "cat.t.c": "Tops",
      "cat.p.n": "Straight denim",
      "cat.p.c": "Bottoms",
      "cat.s.n": "Low sneakers",
      "cat.s.c": "Shoes",

      /* drippamy cut-out visual */
      "drip.scanned": "Scanned",
      "drip.anchor": "Leather jacket",
      "drip.generated": "Generated outfit",

      /* support page */
      "sup.eyebrow": "Support",
      "sup.title": "How can we help?",
      "sup.lead":
        "Answers to common questions, plus a direct line to the team. We usually reply within one business day.",
      "sup.email.t": "Email support",
      "sup.email.d":
        "Something not working, or a question about your account? Write to us and we'll get back to you fast.",
      "sup.email.l": "support@vestimy.com →",
      "sup.feedback.t": "In-app feedback",
      "sup.feedback.d":
        "Send feedback directly from the app: open Account → Feedback to report a bug or suggest an idea.",
      "sup.feedback.l": "Tell us what you think →",
      "sup.account.t": "Account &amp; data",
      "sup.account.d":
        "Delete your account anytime from Settings → Account → Delete account. For data requests, email us.",
      "sup.account.l": "privacy@vestimy.com →",
      "sup.faqTitle": "Frequently asked",
      "sup.q1": "What is Vestimy?",
      "sup.a1":
        "Vestimy turns your physical wardrobe into a digital one. You scan the clothes you own once, and the app helps you decide what to wear, compose outfits, and discover new looks - all from items you already have.",
      "sup.q2": "How do I add clothes to my closet?",
      "sup.a2":
        "Tap Add item, then either scan a garment with your camera or pick a photo from your library. Vestimy automatically identifies the item, suggests a category and colors, and files it into your closet once you finalize it.",
      "sup.q3": "What is Drippamy?",
      "sup.a3":
        "Drippamy turns any single garment - yours, one in a store, or one you've seen online - into a starting point for a full look. Frame it with the camera or pick a photo, and Drippamy proposes outfits that pair well with it. One tap clears the result so you can try another piece.",
      "sup.q4": "Do I need to own an item to get outfit ideas?",
      "sup.a4":
        "No. Drippamy works with any garment, even ones that aren't in your closet - it's designed for inspiration before a purchase and for spur-of-the-moment “how would I wear this?” decisions.",
      "sup.q5": "Which permissions does the app need?",
      "sup.a5":
        "Only Camera (to photograph clothing) and Photo library (to pick existing photos). Vestimy does not request location, contacts, microphone, notifications, or tracking permissions. You can revoke either permission anytime in your device settings.",
      "sup.q6": "How do I delete my account?",
      "sup.a6":
        "Go to Settings → Account → Delete account. Deletion removes your profile, closets, garments, photos, and outfits from our backend, signs you out, and clears local storage. It is immediate and irreversible; backup snapshots are overwritten within 30 days.",
      "sup.q7": "Is my data safe?",
      "sup.a7":
        "Yes. All communication uses TLS encryption, authentication tokens are stored in your device's secure enclave, and photos and records are encrypted at rest. We're GDPR-first and use no advertising trackers.",
      "sup.q8": "I'm a brand - how do I partner with Vestimy?",
      "sup.a8":
        "We'd love to talk. Email brands@vestimy.com and our team will reach out about featuring your catalogue across the Closet, Drippamy, and Explore surfaces.",
      "sup.still": "Still stuck? Email",
      "sup.home": "Home",

      /* 404 */
      "nf.eyebrow": "Error 404",
      "nf.title": "This look isn't in the closet.",
      "nf.lead":
        "We dug through every drawer and hanger - this page is nowhere to be found. Maybe it's in the laundry. Let's get you back to something that actually fits.",
      "nf.quip": "Pro tip: even the best outfits get returned sometimes.",
      "nf.home": "Back to home",
      "nf.support": "Contact support",

      /* privacy chrome */
      "pri.eyebrow": "Legal",
      "pri.title": "Privacy Policy",
      "pri.lead":
        "How we collect, use, store, and share your personal data - GDPR-first and EU-hosted by default.",
      "pri.itNote":
        "This policy is provided in English. An official Italian-language version is available on request at privacy@vestimy.com.",
    },

    it: {
      "meta.title": "Vestimy - Il tuo guardaroba, digitalizzato.",
      "meta.desc":
        "Vestimy trasforma il tuo guardaroba fisico in uno digitale. Scansiona ciò che possiedi, componi outfit e ottieni look istantanei costruiti attorno a qualsiasi capo con Drippamy.",

      "nav.features": "Funzioni",
      "nav.how": "Come funziona",
      "nav.drippamy": "Drippamy",
      "nav.ai": "Stile AI",
      "nav.brands": "Per i brand",
      "nav.support": "Supporto",
      "nav.privacy": "Privacy",
      "nav.forbrands": "Per i brand",
      "nav.getapp": "Prova la beta",

      "hero.pill": "Ora in beta su iOS",
      "hero.title": "Indossa tutto <em>quello che hai già.</em>",
      "hero.titleA": "Indossa ciò che",
      "rot.1": "possiedi",
      "rot.2": "ami",
      "rot.3": "hai salvato",
      "hero.sub":
        "Scansiona l'armadio una volta. Componi outfit o ricevi look AI - da ciò che hai già.",
      "hero.cta1": "Prova la beta",
      "hero.cta2": "Scopri come funziona",
      "hero.note": "Beta gratuita · iOS 17+ · GDPR-first",

      "feat.eyebrow": "Cosa fa Vestimy",
      "feat.title": "Un solo posto per sapere cosa possiedi - e indossarlo meglio.",
      "feat.lead":
        "Possediamo molto più di quello che indossiamo davvero. Vestimy dà una casa a ogni capo, poi mette al lavoro il tuo guardaroba.",
      "feat.cat.t": "Cataloga",
      "feat.cat.d":
        "Cattura ogni capo con una foto. Viene riconosciuto, ordinato e archiviato in automatico - tutto il guardaroba a colpo d'occhio.",
      "feat.comp.t": "Componi",
      "feat.comp.d":
        "Crea outfit con i vestiti che hai già. Abbina, mescola e salva i look che indosserai davvero.",
      "feat.drip.t": "Drippamy",
      "feat.drip.d":
        "Inquadra un capo qualsiasi e ottieni subito idee di outfit costruite attorno a esso - tuoi, in negozio o online.",
      "feat.insp.t": "Ispirati",
      "feat.insp.d":
        "Ricevi outfit suggeriti e scorri un feed di look per nuove combinazioni quando ti servono idee.",

      "how.eyebrow": "Come funziona",
      "how.title": "Dall'armadio all'outfit - in tre passi.",
      "how.lead": "Scansiona una volta. Poi allo stile pensa Vestimy.",
      "how.s1.t": "Cataloga",
      "how.s1.d":
        "Scansiona i capi una volta - ognuno viene scontornato, riconosciuto e archiviato in automatico.",
      "how.s2.t": "Componi e stila",
      "how.s2.d":
        "Crea outfit a mano, o lascia che Vestimy AI suggerisca look completi dal tuo armadio.",
      "how.s3.t": "Drippa e scopri",
      "how.s3.d":
        "Inquadra un capo per idee di outfit istantanee, e scorri il feed per ispirarti.",
      "how.step": "PASSO",

      "drip.eyebrow": "Drippamy",
      "drip.kicker": "Il tuo stylist con la fotocamera",
      "drip.title": "Inquadra un capo. <em>Esce il look intero.</em>",
      "drip.body":
        "Drippamy è lo stylist con la fotocamera di Vestimy. Inquadra un capo qualsiasi - tuo, in negozio o una foto dalla galleria - e lui lo riconosce, poi costruisce all'istante outfit completi attorno a esso.",
      "drip.name":
        "“Drip” è slang streetwear per un outfit di stile. Drippamy = il tuo drip, su richiesta.",
      "drip.l1": "Non devi possederlo - provalo prima di comprarlo",
      "drip.l2": "Scorri una galleria di look completi costruiti attorno",
      "drip.l3": "Un tocco per rifare e provare un altro capo",
      "drip.cta": "Prova Drippamy",

      "ai.eyebrow": "Intelligenza degli outfit",
      "ai.title": "Crea look a mano - o lascia che Vestimy AI ti vesta.",
      "ai.lead":
        "Componi outfit dal tuo armadio, o ricevi look pronti che l'AI costruisce con ciò che hai già. Accetta, modifica o scarta - impara cosa indossi.",
      "ai.manual.tag": "Manuale",
      "ai.manual.t": "Componi tu",
      "ai.manual.d":
        "Scegli i capi dal guardaroba, abbina e salva le combinazioni che ami.",
      "ai.manual.cta": "+ Nuovo outfit",
      "ai.ai.tag": "Vestimy AI",
      "ai.ai.t": "Suggerito per te",
      "ai.ai.d":
        "L'AI legge il tuo armadio e propone outfit completi - un tocco per accettare il look.",
      "ai.ai.accept": "Accetta look",
      "ai.r1": "Abbina i tuoi colori",
      "ai.r2": "Giusto per la stagione",
      "ai.r3": "Costruito dal tuo armadio",

      "brand.eyebrow": "Per brand e retailer",
      "brand.title": "Sii il capo che completa il look.",
      "brand.body":
        "Vestimy si trova dove l'intenzione è più alta - dentro il guardaroba, nel momento in cui qualcuno sta componendo un outfit. Il tuo prodotto non è solo mirato a un utente: è suggerito nel contesto, per completare un look costruito con i capi che possiede già.",
      "brand.b1":
        "Il tuo prodotto proposto nei suggerimenti di outfit AI - accanto ai capi che l'utente possiede già",
      "brand.b2":
        "Contestuale, non solo mirato - abbinato al guardaroba reale e al pezzo che manca in quel look",
      "brand.b3":
        "Mostrato nell'istante in cui l'intenzione è al massimo: mentre compone o accetta un outfit",
      "brand.b4":
        "Matching privacy-first su segnali aggregati - nessun tracker, nessun IDFA / AAID",
      "brand.cta": "Diventa partner",
      "brand.s1": "Scansioni una volta, stile per sempre",
      "brand.s2": "Superfici: Armadio, Drippamy, Esplora",
      "brand.s3": "Gestione dati GDPR-first",
      "brand.s4": "Tracker pubblicitari - nessun IDFA / AAID",
      "brand.ctxOwned": "Già nell'armadio",
      "brand.ctxFrom": "Da STUDIO LOOK",
      "brand.ctxTag": "Completa il look",
      "brand.ctxCap": "Suggerito perché si abbina a 3 capi già in questo guardaroba.",

      /* ===== BRAND LANDING (brands.html) ===== */
      "bl.meta.title": "Vestimy per i Brand - Sii il capo che completa il look.",
      "bl.meta.desc":
        "Posizionamento contestuale del prodotto dentro i guardaroba reali. Il tuo prodotto suggerito per completare outfit AI costruiti con ciò che le persone già possiedono. Privacy-first, nessun tracker.",
      "bl.nav.why": "Perché Vestimy",
      "bl.nav.how": "Come funziona",
      "bl.nav.context": "Contestuale",
      "bl.nav.shoppers": "Per gli utenti",
      "bl.nav.cta": "Prenota una demo",
      "bl.hero.eyebrow": "Vestimy per i brand",
      "bl.hero.title": "Sii il capo che <em>completa il look.</em>",
      "bl.hero.sub":
        "Non solo mirato - contestuale. Il tuo prodotto, suggerito dentro outfit costruiti con i capi che l'utente già possiede.",
      "bl.hero.cta1": "Prenota una demo",
      "bl.hero.cta2": "Diventa partner",
      "bl.tick.1": "Contestuale",
      "bl.tick.2": "Non solo mirato",
      "bl.tick.3": "Dentro l'armadio",
      "bl.tick.4": "Privacy-first",
      "bl.v.eyebrow": "Perché funziona",
      "bl.v.title": "L'intenzione è massima dove ci si veste.",
      "bl.v1.t": "Alta intenzione",
      "bl.v1.d": "Mostrato mentre qualcuno sta componendo un outfit - non a metà scroll.",
      "bl.v2.t": "Contestuale",
      "bl.v2.d": "Abbinato al guardaroba reale e al pezzo che manca in quel look.",
      "bl.v3.t": "Privacy-first",
      "bl.v3.d": "Solo segnali aggregati. Nessun tracker, nessun IDFA / AAID.",
      "bl.v4.t": "Acquisto diretto",
      "bl.v4.d": "Un tocco dal look suggerito al tuo store.",
      "bl.how.eyebrow": "Come funziona la partnership",
      "bl.how.title": "Dal catalogo al look completo.",
      "bl.h1.t": "Collega il catalogo",
      "bl.h1.d": "Invia un feed prodotti - immagini, categorie, colori, link.",
      "bl.h2.t": "Abbiniamo ai guardaroba",
      "bl.h2.d": "Vestimy mappa i tuoi capi su armadi reali e look incompleti.",
      "bl.h3.t": "Appari negli outfit AI",
      "bl.h3.d": "Il tuo prodotto è suggerito per completare un look che l'utente possiede.",
      "bl.h4.t": "Gli utenti acquistano",
      "bl.h4.d": "Un tocco apre il tuo store, nel momento dell'intenzione.",
      "bl.ctx.eyebrow": "Posizionamento contestuale",
      "bl.ctx.title": "Il tuo prodotto, dove serve.",
      "bl.ctx.body":
        "Vestimy legge l'armadio, trova il pezzo mancante e piazza il tuo - accanto ai capi che l'utente già possiede.",
      "bl.cta.title": "Metti il tuo catalogo dentro l'armadio.",
      "bl.cta.body": "Parliamo di posizionamento contestuale per il tuo brand.",
      "bl.cta.btn": "Prenota una demo",
      "bl.foot.shoppers": "Per gli utenti",

      "cta.eyebrow": "Inizia ora",
      "cta.title": "La beta è aperta.",
      "cta.body":
        "Stiamo facendo entrare i primi tester. Prova la beta su TestFlight e aiutaci a dare forma a Vestimy prima del lancio.",
      "cta.ios": "Prova la beta su TestFlight",
      "cta.android": "Android? Avvisami",

      "foot.tag":
        "Vestimy digitalizza il tuo guardaroba, ti aiuta a comporre outfit e ti ispira il prossimo look - senza comprare altro.",
      "foot.product": "Prodotto",
      "foot.company": "Azienda",
      "foot.legal": "Legale",
      "foot.features": "Funzioni",
      "foot.how": "Come funziona",
      "foot.drippamy": "Drippamy",
      "foot.download": "Scarica",
      "foot.forbrands": "Per i brand",
      "foot.partner": "Collaborazioni",
      "foot.support": "Supporto",
      "foot.contact": "Contatti",
      "foot.privacy": "Privacy Policy",
      "foot.datareq": "Richieste sui dati",
      "foot.delete": "Elimina account",
      "foot.rights": "© 2026 Vestimy. Tutti i diritti riservati.",
      "foot.made": "Fatto nell'UE · privacy@vestimy.com",

      "app.closet": "Armadio",
      "app.drippamy": "Drippamy",
      "app.explore": "Esplora",
      "app.items": "48 capi",
      "app.suggested": "SUGGERITO",
      "app.photoTips": "Consigli per la foto",
      "app.contrast": "Scegli uno sfondo a contrasto",
      "app.contrastDesc":
        "Una netta differenza tra il capo e lo sfondo aiuta Vestimy a isolare il pezzo.",
      "app.next": "Avanti",
      "app.buy": "Acquista",
      "app.tryon": "Vestimy",
      "app.product": "Maglione in lana",
      "app.brand": "STUDIO LOOK",

      "tag.added": "Aggiunto all'armadio",
      "tag.recognized": "Riconosciuto in automatico",
      "tag.colors": "Colori dominanti",

      "tick.1": "Digitalizza il guardaroba",
      "tick.2": "Stile con l'AI",
      "tick.3": "Indossa ciò che hai",
      "tick.4": "Drippa qualsiasi capo",

      "cat.eyebrow": "Il tuo armadio, catalogato",
      "cat.title": "Ogni capo - riconosciuto, etichettato e abbinato per colore in automatico.",
      "cat.lead":
        "Scatta una foto al capo: Vestimy lo scontorna, ne identifica la categoria ed estrae i colori dominanti. Senza etichettare a mano.",
      "cat.j.n": "Giacca chore",
      "cat.j.c": "Capospalla",
      "cat.t.n": "T-shirt cotone",
      "cat.t.c": "Top",
      "cat.p.n": "Jeans dritti",
      "cat.p.c": "Pantaloni",
      "cat.s.n": "Sneakers basse",
      "cat.s.c": "Scarpe",

      "drip.scanned": "Scansionato",
      "drip.anchor": "Giacca di pelle",
      "drip.generated": "Outfit generato",

      "sup.eyebrow": "Supporto",
      "sup.title": "Come possiamo aiutarti?",
      "sup.lead":
        "Risposte alle domande comuni e una linea diretta con il team. Di solito rispondiamo entro un giorno lavorativo.",
      "sup.email.t": "Supporto via email",
      "sup.email.d":
        "Qualcosa non funziona o hai una domanda sul tuo account? Scrivici e ti rispondiamo in fretta.",
      "sup.email.l": "support@vestimy.com →",
      "sup.feedback.t": "Feedback in-app",
      "sup.feedback.d":
        "Invia feedback direttamente dall'app: apri Account → Feedback per segnalare un bug o proporre un'idea.",
      "sup.feedback.l": "Dicci cosa ne pensi →",
      "sup.account.t": "Account e dati",
      "sup.account.d":
        "Elimina l'account quando vuoi da Impostazioni → Account → Elimina account. Per richieste sui dati, scrivici.",
      "sup.account.l": "privacy@vestimy.com →",
      "sup.faqTitle": "Domande frequenti",
      "sup.q1": "Cos'è Vestimy?",
      "sup.a1":
        "Vestimy trasforma il tuo guardaroba fisico in uno digitale. Scansioni i capi che possiedi una volta, e l'app ti aiuta a decidere cosa indossare, comporre outfit e scoprire nuovi look - tutto dai vestiti che hai già.",
      "sup.q2": "Come aggiungo vestiti al mio armadio?",
      "sup.a2":
        "Tocca Aggiungi capo, poi scansiona un capo con la fotocamera o scegli una foto dalla galleria. Vestimy identifica l'articolo, suggerisce una categoria e i colori, e lo archivia nell'armadio quando lo confermi.",
      "sup.q3": "Cos'è Drippamy?",
      "sup.a3":
        "Drippamy trasforma un singolo capo - tuo, in un negozio o visto online - nel punto di partenza per un look completo. Inquadralo con la fotocamera o scegli una foto, e Drippamy propone outfit che si abbinano bene. Un tocco cancella il risultato per provare un altro capo.",
      "sup.q4": "Devo possedere un capo per avere idee di outfit?",
      "sup.a4":
        "No. Drippamy funziona con qualsiasi capo, anche se non è nel tuo armadio - è pensato per ispirarti prima di un acquisto e per le decisioni dell'ultimo minuto “come lo indosserei?”.",
      "sup.q5": "Quali permessi richiede l'app?",
      "sup.a5":
        "Solo Fotocamera (per fotografare i capi) e Galleria foto (per scegliere foto esistenti). Vestimy non richiede posizione, contatti, microfono, notifiche o tracciamento. Puoi revocare ogni permesso quando vuoi dalle impostazioni del dispositivo.",
      "sup.q6": "Come elimino il mio account?",
      "sup.a6":
        "Vai su Impostazioni → Account → Elimina account. L'eliminazione rimuove profilo, armadi, capi, foto e outfit dai nostri server, ti disconnette e cancella i dati locali. È immediata e irreversibile; i backup vengono sovrascritti entro 30 giorni.",
      "sup.q7": "I miei dati sono al sicuro?",
      "sup.a7":
        "Sì. Tutte le comunicazioni usano crittografia TLS, i token di autenticazione sono salvati nell'enclave sicura del dispositivo, e foto e dati sono crittografati a riposo. Siamo GDPR-first e non usiamo tracker pubblicitari.",
      "sup.q8": "Sono un brand - come collaboro con Vestimy?",
      "sup.a8":
        "Parliamone. Scrivi a brands@vestimy.com e il nostro team ti contatterà per inserire il tuo catalogo nelle superfici Armadio, Drippamy ed Esplora.",
      "sup.still": "Ancora bloccato? Scrivi a",
      "sup.home": "Home",

      /* 404 */
      "nf.eyebrow": "Errore 404",
      "nf.title": "Questo look non è nell'armadio.",
      "nf.lead":
        "Abbiamo frugato in ogni cassetto e gruccia - questa pagina non si trova da nessuna parte. Forse è in lavatrice. Ti riportiamo a qualcosa che ti calza davvero.",
      "nf.quip": "Consiglio: anche i look migliori a volte vengono resi.",
      "nf.home": "Torna alla home",
      "nf.support": "Contatta il supporto",

      "pri.eyebrow": "Legale",
      "pri.title": "Privacy Policy",
      "pri.lead":
        "Come raccogliamo, usiamo, conserviamo e condividiamo i tuoi dati personali - GDPR-first e ospitati nell'UE per impostazione predefinita.",
      "pri.itNote":
        "Questa policy è fornita in inglese. Una versione ufficiale in italiano è disponibile su richiesta a privacy@vestimy.com.",
    },
  };

  const SUPPORTED = ["en", "it"];
  const KEY = "vestimy_lang";

  function detect() {
    const saved = localStorage.getItem(KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;
    const langs = navigator.languages || [navigator.language || "en"];
    for (const l of langs) {
      const base = String(l).toLowerCase().split("-")[0];
      if (SUPPORTED.includes(base)) return base;
    }
    return "en";
  }

  function apply(lang) {
    const dict = DICT[lang] || DICT.en;
    const t = (k) => (k in dict ? dict[k] : DICT.en[k]);

    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const v = t(el.getAttribute("data-i18n"));
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const v = t(el.getAttribute("data-i18n-html"));
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      el.getAttribute("data-i18n-attr")
        .split(",")
        .forEach((pair) => {
          const [attr, key] = pair.split(":").map((s) => s.trim());
          const v = t(key);
          if (attr && v != null) el.setAttribute(attr, v);
        });
    });

    if (t("meta.title")) document.title = t("meta.title");

    // reflect current language on the switcher
    document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
      const on = btn.getAttribute("data-lang-btn") === lang;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", String(on));
    });
    document.querySelectorAll("[data-lang-current]").forEach((el) => {
      el.textContent = lang.toUpperCase();
    });
  }

  function set(lang) {
    if (!SUPPORTED.includes(lang)) return;
    localStorage.setItem(KEY, lang);
    apply(lang);
  }

  const current = detect();
  // expose
  window.VestimyI18n = { set, apply, get: () => detect(), supported: SUPPORTED };

  function init() {
    apply(current);
    document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
      btn.addEventListener("click", () => set(btn.getAttribute("data-lang-btn")));
    });
    // toggle control (single button that flips EN/IT)
    document.querySelectorAll("[data-lang-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const now = detect();
        set(now === "it" ? "en" : "it");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
