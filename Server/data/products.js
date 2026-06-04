const products = [
    {
        name: "Black BJJ Gi",
        description: "A durable black BJJ gi built for hard rolls, grip fighting and disciplined grappling sessions.",
        price: 1199,
        category: "BJJ/Judo",
        imageUrl: "/images/products/black-bjj-gi.jpg",
        sizes: ["A1", "A2", "A3", "A4"],
        categorySlug: "bjj-judo",
        stock: 8
    },
    {
        name: "Classic White Karate Gi",
        description: "A traditional white karate gi designed for training, kata and everyday dojo practice. Lightweight, comfortable and built to allow clean movement during strikes, stances and drills.",
        price: 699,
        category: "Karate",
        imageUrl: "/images/products/classic-white-karate-gi.jpg",
        sizes: ["S", "M", "L"],
        categorySlug: "karate",
        stock: 12
    },
    {
        name: "Grappling Rashguard",
        description: "A durable grappling rashguard made for no-gi training, BJJ drills and intense sparring sessions. Designed to stay close to the body, reduce friction and keep you comfortable during hard rolls.",
        price: 499,
        category: "BJJ/Judo",
        imageUrl: "/images/products/turtle-grappling-rashguard.jpg",
        sizes: ["S", "M", "L", "XL"],
        categorySlug: "bjj-judo",
        stock: 10
    },
    {
        name: "Judo Gi White",
        description: "A strong white judo gi built for throws, grip fighting and disciplined mat training. Designed with a durable fabric that can handle regular practice while still giving enough comfort for movement and technique work.",
        price: 899,
        category: "BJJ/Judo",
        imageUrl: "/images/products/judo-gi-white.jpg",
        sizes: ["A1", "A2", "A3", "A4"],
        categorySlug: "bjj-judo",
        stock: 14
    },
    {
        name: "Black Thai Gloves",
        description: "Durable black Thai boxing gloves designed for pad work, bag training and sparring. Built with solid wrist support and comfortable padding to handle powerful strikes during Muay Thai and kickboxing sessions.",
        price: 799,
        category: "Thai/Kickbox",
        imageUrl: "/images/products/black-thai.gloves.jpg",
        sizes: ["10oz", "12oz", "14oz"],
        categorySlug: "thai-kickbox",
        stock: 4
    },
    {
        name: "Taos Log",
        description: "Mercenary Tao's legendary log, built for fighters who train by kicking down banana trees and still need a fuel-efficient way to travel. A rare collector's transport item for anyone with serious balance, questionable safety standards and elite martial arts energy.",
        price: 6999,
        category: "Thai/Kickbox",
        imageUrl: "/images/products/Taos-log.png",
        sizes: [],
        categorySlug: "thai-kickbox",
        stock: 1
    },
    {
        name: "Karate Gloves Pink",
        description: "Lightweight pink karate gloves designed for fast sparring, sharp combinations and controlled point-fighting. The open-palm design gives you freedom to grip and move naturally, while the padded knuckle area helps protect your hands during explosive karate sessions.",
        price: 399,
        category: "Karate",
        imageUrl: "/images/products/karate-gloves.pink.jpg",
        sizes: ["S", "M", "L"],
        categorySlug: "karate",
        stock: 16
    },
    {
        name: "Karate Red Belt",
        description: "A classic red karate belt for students who have moved beyond the beginner level and are ready to show progress, discipline and commitment in the dojo. Made for regular training, grading preparation and everyday martial arts practice.",
        price: 149,
        category: "Karate",
        imageUrl: "/images/products/karate-red-belt.jpg",
        sizes: ["S", "M", "L"],
        categorySlug: "karate",
        stock: 20
    },
    {
        name: "Senzu Bean Bag",
        description: "For the active fighter who decides to challenge aliens, demons and opponents far above their power level. These legendary beans may speed up recovery by a few seconds after brutal training, hard sparring or questionable life choices. Cracked your neck before the next round? Perfect, take one and get back on your feet. NOTE! Do not fight opponents that are too strong. These beans unfortunately only heal the living.",
        price: 55000,
        category: "Protection",
        imageUrl: "/images/products/senzu-beans.png",
        sizes: [],
        categorySlug: "protection",
        stock: 3
    },
    {
        name: "Cleto Headgear",
        description: "A protective boxing headgear designed for hard sparring, striking drills and serious fight preparation. Built to help absorb impact, protect the head and keep your focus sharp when the rounds get intense.",
        price: 1299,
        category: "Protection",
        imageUrl: "/images/products/cleto-headgear.jpg",
        sizes: ["S", "M", "L"],
        categorySlug: "protection",
        stock: 5
    },
    {
        name: "Black Venum Fight Shorts",
        description: "Lightweight black fight shorts designed for Muay Thai, kickboxing and high-intensity striking sessions. Built for fast movement, powerful kicks and tough sparring, with a flexible fit that keeps you comfortable through every round.",
        price: 599,
        category: "Thai/Kickbox",
        imageUrl: "/images/products/black-venum-fight-shorts.jpg",
        sizes: ["S", "M", "L"],
        categorySlug: "thai-kickbox",
        stock: 22
    },
    {
        name: "Roshi's Turtle Shield",
        description: "A legendary turtle shield built for serious protection, heavy training and fighters who need something stronger than ordinary gear. Designed to guard your back, absorb punishment and make you feel like you are carrying true old-school martial arts wisdom. Price: 11999 SEK or 100 naughty magazines for Master Roshi.",
        price: 11999,
        category: "Protection",
        imageUrl: "/images/products/roshis-turtle-shield.png",
        sizes: [],
        categorySlug: "protection",
        stock: 1
    },
    {
        name: "Twins White Gloves",
        description: "Premium white Thai boxing gloves designed for powerful strikes, pad work and tough sparring sessions. Built with strong wrist support, comfortable padding and a clean classic look for fighters who train with discipline and style.",
        price: 899,
        category: "Thai/Kickbox",
        imageUrl: "/images/products/twins-white-gloves.jpg",
        sizes: ["10oz", "12oz", "14oz"],
        categorySlug: "thai-kickbox",
        stock: 9
    },
    {
        name: "Black Kick Pads",
        description: "Durable black kick pads built for Muay Thai and kickboxing training. Designed to absorb heavy kicks, knees and powerful combinations while giving the coach solid control during intense pad sessions.",
        price: 899,
        category: "Thai/Kickbox",
        imageUrl: "/images/products/black-kick-pads.jpg",
        sizes: [],
        categorySlug: "thai-kickbox",
        stock: 2
    },
    {
        name: "Judo White Belt",
        description: "A classic white judo belt for beginners taking their first steps onto the mat. Simple, durable and made for regular training, grading practice and learning the foundations of judo with discipline and respect.",
        price: 129,
        category: "BJJ/Judo",
        imageUrl: "/images/products/judo-white-belt.jpg",
        sizes: [],
        categorySlug: "bjj-judo",
        stock: 3
    },
    {
        name: "Red Thai Shorts",
        description: "Classic red Thai shorts designed for Muay Thai and kickboxing training. Lightweight, flexible and built to give full freedom for kicks, knees and fast footwork during intense striking sessions.",
        price: 499,
        category: "Thai/Kickbox",
        imageUrl: "/images/products/red-thai-shorts.jpg",
        sizes: ["S", "M", "L"],
        categorySlug: "thai-kickbox",
        stock: 13
    },
    {
        name: "Karate Gloves",
        description: "Lightweight karate gloves made for fast sparring, controlled strikes and sharp point-fighting sessions. Designed to protect the knuckles while keeping your hands free and mobile for quick attacks, blocks and movement.",
        price: 349,
        category: "Karate",
        imageUrl: "/images/products/karate-gloves.jpg",
        sizes: ["S", "M", "L"],
        categorySlug: "karate",
        stock: 22
    },
    {
        name: "Makiwara Pad",
        description: "A traditional makiwara pad designed for karate students who want to build stronger strikes, better technique and sharper focus. Perfect for practicing punches, hand conditioning and controlled impact training at home or in the dojo.",
        price: 449,
        category: "Karate",
        imageUrl: "/images/products/makiwara-pad.jpg",
        sizes: [],
        categorySlug: "karate",
        stock: 5
    },
    {
        name: "Piccolo's Cape",
        description: "Want to make a legendary entrance? Want everyone around you to instantly regret their own outfit choice? This cape gives you the same serious drip as Piccolo, especially when you catch the wind at the perfect moment. NOTE! Parkour skills or the ability to fly are recommended for the best entrance effect.",
        price: 2999,
        category: "Protection",
        imageUrl: "/images/products/Piccolos-cape.png",
        sizes: [],
        categorySlug: "protection",
        stock: 1
    },
    {
        name: "Thai Shinguards",
        description: "Protective Thai shinguards designed for Muay Thai and kickboxing training. Built to absorb hard kicks, checks and sparring impact while keeping your legs comfortable and secure through every round.",
        price: 699,
        category: "Thai/Kickbox",
        imageUrl: "/images/products/Thai-shinguards.jpg",
        sizes: ["S", "M", "L"],
        categorySlug: "thai-kickbox",
        stock: 17
    },
    {
        name: "CapsuleCorp Container",
        description: "A futuristic CapsuleCorp container packed with compact capsule technology, allowing you to carry vehicles, tents and travel essentials in tiny portable capsules. Perfect for fighters, adventurers and anyone who wants powerful storage with legendary convenience.",
        price: 29999,
        category: "Protection",
        imageUrl: "/images/products/capsulecorp-container.png",
        sizes: ["S"],
        categorySlug: "protection",
        stock: 6
    },
    {
        name: "The Flying Nimbus",
        description: "Want one of the world's most efficient forms of transportation with no fuel required? The Flying Nimbus is a legendary cloud built for fast, clean and magical travel. Buy it for 102999 SEK, or receive it for free if you have a pure heart. NOTE! You unfortunately cannot ride it without a pure heart.",
        price: 102999,
        category: "Karate",
        imageUrl: "/images/products/the-flying-nimbus.png",
        sizes: [],
        categorySlug: "karate",
        stock: 1
    },
    {
        name: "Judo Gi Blue",
        description: "A durable blue judo gi designed for serious mat training, throws and grip fighting. Built with strong fabric to handle regular practice while giving enough comfort and movement for randori, technique drills and competition preparation.",
        price: 999,
        category: "BJJ/Judo",
        imageUrl: "/images/products/Judo-gi-blue.jpg",
        sizes: ["A1", "A2", "A3", "A4", "A5"],
        categorySlug: "bjj-judo",
        stock: 20
    },
    {
        name: "Red Kick Pads",
        description: "Durable red kick pads designed for Muay Thai and kickboxing training. Built to handle heavy kicks, knees and powerful combinations while giving coaches solid grip, control and protection during intense pad work.",
        price: 899,
        category: "Thai/Kickbox",
        imageUrl: "/images/products/red-kick-pads.jpg",
        sizes: ["S", "M"],
        categorySlug: "thai-kickbox",
        stock: 15
    },
    {
        name: "Judo Yellow Belt",
        description: "A classic yellow judo belt for students who have taken their first steps beyond the beginner level. Made for regular training, grading preparation and showing steady progress on the mat with discipline and respect.",
        price: 149,
        category: "BJJ/Judo",
        imageUrl: "/images/products/judo-yellow-belt.jpg",
        sizes: ["S", "M", "L"],
        categorySlug: "bjj-judo",
        stock: 20
    },
    {
        name: "BJJ Dummy",
        description: "A grappling training dummy designed for BJJ and judo practice at home or in the gym. Perfect for drilling throws, transitions, submissions and ground control when you need extra mat time without a training partner.",
        price: 1299,
        category: "BJJ/Judo",
        imageUrl: "/images/products/bjj-dummy.jpg",
        sizes: [],
        categorySlug: "bjj-judo",
        stock: 12
    },
    {
        name: "Karate Brown Belt",
        description: "A classic brown karate belt for advanced students who are close to the black belt level. Made for serious training, grading preparation and showing years of discipline, technique and commitment in the dojo.",
        price: 169,
        category: "Karate",
        imageUrl: "/images/products/karate-brown-belt.jpg",
        sizes: ["S", "M", "L"],
        categorySlug: "karate",
        stock: 30
    },
    {
        name: "CapsuleCorp Bigpack",
        description: "A high-end CapsuleCorp storage pack built for elite adventurers who need more than the standard container. Using advanced capsule technology, it can store vehicles, tents and travel gear in compact capsules, while this upgraded version also includes a spaceship and more advanced transport vehicles for serious exploration.",
        price: 299999,
        category: "Protection",
        imageUrl: "/images/products/CC-big.png",
        sizes: ["L"],
        categorySlug: "protection",
        stock: 12
    },
        {
        name: "Goku's weighted clothes",
        description: "Goku's legendary weighted shoes and wrist weights, designed to stay surprisingly discreet while helping you build strength in secret. Perfect for fighters who want to train harder, move sharper and carry extra resistance in everyday practice. NOTE! Make sure your body is prepared before using them, or you may end up seriously injured.",
        price: 2599,
        category: "Karate",
        imageUrl: "/images/products/goku-heavy.png",
        sizes: [],
        categorySlug: "karate",
        stock: 1
    },
    {
        name: "Grappling Headgear",
        description: "Protective grappling headgear designed for BJJ, judo and wrestling-style training. Built to help protect the ears during hard rolls, takedown practice and intense mat sessions while staying secure and comfortable.",
        price: 399,
        category: "Protection",
        imageUrl: "/images/products/grappling-headgear.jpg",
        sizes: ["S", "M", "L"],
        categorySlug: "protection",
        stock: 22
    }




]


module.exports = products
