import { Restaurant } from '../types';

export const restaurants: Restaurant[] = [
  {
    id: 'najd-bites',
    name: 'مطعم نجد بايتس',
    state: 'الرياض',
    city: 'الرياض',
    neighborhood: 'حي الياسمين',
    cuisine: ['سعودي', 'مشويات', 'أرز'],
    description:
      'وجهة عصرية تقدم الوصفات السعودية التقليدية بلمسة حديثة مع تركيز على جودة اللحوم ونكهات التوابل النجدية.',
    rating: 4.8,
    ratingCount: 1275,
    heroImage:
      'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=60',
    gallery: [
      'https://images.unsplash.com/photo-1608039829574-76be1195b18a?auto=format&fit=crop&w=1200&q=60',
      'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=60',
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=60'
    ],
    pickupEstimate: '15 - 20 دقيقة',
    openingHours: 'يومياً 11:00 ص - 12:30 ص',
    menu: [
      {
        id: 'najd-bites-mains',
        title: 'الأطباق الرئيسية',
        description: 'أطباق رز تقليدية مع خيارات اللحم والدجاج',
        items: [
          {
            id: 'kbsa-beef',
            name: 'كبسة لحم حاشي',
            description: 'رز مزروع بنكهة اللومي يقدم مع لحم حاشي طري ومكسرات محمصة.',
            price: 58,
            image:
              'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=800&q=60',
            tags: ['الأكثر طلباً']
          },
          {
            id: 'chicken-mandi',
            name: 'مندي دجاج على الفحم',
            description: 'دجاج على الفحم مع رز مبهر يقدم مع صلصات حارة ولبن.',
            price: 44,
            image:
              'https://images.unsplash.com/photo-1572695157362-0de111d5c245?auto=format&fit=crop&w=800&q=60'
          },
          {
            id: 'lamb-madfoon',
            name: 'مدفون لحم',
            description: 'لحم غنم مطهو على البخار مع رز بسمتي مدخن.',
            price: 62,
            image:
              'https://images.unsplash.com/photo-1447078806655-40579c2520d6?auto=format&fit=crop&w=800&q=60'
          }
        ]
      },
      {
        id: 'najd-bites-apps',
        title: 'المقبلات والسلطات',
        items: [
          {
            id: 'dates-salad',
            name: 'سلطة تمر وجرجير',
            description: 'جرجير، تمر سكري، جبن حلوم وصوص رمان.',
            price: 28,
            image:
              'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=60'
          },
          {
            id: 'sambosa-mix',
            name: 'سمبوسة مشكلة',
            description: 'حشوات لحم ودجاج وجبن مع صوص تمر حار.',
            price: 24,
            image:
              'https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=800&q=60'
          }
        ]
      },
      {
        id: 'najd-bites-drinks',
        title: 'المشروبات',
        items: [
          {
            id: 'saffron-latte',
            name: 'لاتيه الزعفران',
            description: 'حليب بالزعفران مع لمسة من القهوة العربية.',
            price: 22,
            image:
              'https://images.unsplash.com/photo-1459257868276-5e65389e2722?auto=format&fit=crop&w=800&q=60'
          },
          {
            id: 'pomegranate-iced-tea',
            name: 'شاي رمان مثلج',
            description: 'شاي أسود مع عصير رمان وفواكه موسمية.',
            price: 18,
            image:
              'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=60'
          }
        ]
      }
    ]
  },
  {
    id: 'hijazi-social',
    name: 'هيج كو زيشن',
    state: 'مكة المكرمة',
    city: 'جدة',
    neighborhood: 'حي الزهراء',
    cuisine: ['حجازي', 'مأكولات بحرية'],
    description:
      'جلسة بحرية تقدم مأكولات جدة الشعبية مع تشكيلة واسعة من أطباق السمك والجمبري.',
    rating: 4.6,
    ratingCount: 980,
    heroImage:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=60',
    gallery: [
      'https://images.unsplash.com/photo-1504679727740-38dccc1b6d7c?auto=format&fit=crop&w=1200&q=60',
      'https://images.unsplash.com/photo-1481931098730-318b6f776db0?auto=format&fit=crop&w=1200&q=60'
    ],
    pickupEstimate: '25 - 30 دقيقة',
    openingHours: 'يومياً 12:00 م - 1:00 ص',
    menu: [
      {
        id: 'hijazi-seafood',
        title: 'أطباق البحر',
        items: [
          {
            id: 'sayadiya-shrimp',
            name: 'صيادية روبيان',
            description: 'رز بني بتوابل حجازية يقدم مع روبيان متبل.',
            price: 69,
            image:
              'https://images.unsplash.com/photo-1453831210728-695502f9f795?auto=format&fit=crop&w=800&q=60'
          },
          {
            id: 'grilled-hamour',
            name: 'همور مشوي',
            description: 'سمك هامور طازج مشوي على الفحم مع صلصة الليمون والزعتر.',
            price: 84,
            image:
              'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=60'
          }
        ]
      },
      {
        id: 'hijazi-sides',
        title: 'مقبلات حجازية',
        items: [
          {
            id: 'mutabbak',
            name: 'مطبق جدة',
            description: 'مطبق لحم مع صوص طماطم مخلل.',
            price: 34,
            image:
              'https://images.unsplash.com/photo-1505576383112-a1f355e9b31c?auto=format&fit=crop&w=800&q=60'
          },
          {
            id: 'balila',
            name: 'بليلة طرية',
            description: 'حمص مسلوق بالتوابل مع خيار ومخلل.',
            price: 19,
            image:
              'https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=800&q=60'
          }
        ]
      }
    ]
  },
  {
    id: 'asharq-bowls',
    name: 'عشاق الشرق',
    state: 'المنطقة الشرقية',
    city: 'الخبر',
    neighborhood: 'كورنيش الخبر',
    cuisine: ['شرقي', 'فيوجن'],
    description:
      'مفهوم عصري يقدم أطباقاً خفيفة مستوحاة من مطابخ الشرق الأوسط مع خيارات نباتية.',
    rating: 4.7,
    ratingCount: 640,
    heroImage:
      'https://images.unsplash.com/photo-1457666134378-6b77915bd5f2?auto=format&fit=crop&w=1200&q=60',
    gallery: [
      'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=1200&q=60',
      'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=60'
    ],
    pickupEstimate: '10 - 15 دقيقة',
    openingHours: 'يومياً 9:00 ص - 11:00 م',
    menu: [
      {
        id: 'asharq-bowls-signature',
        title: 'بولز التوقيع',
        description: 'خيارات صحية قابلة للتخصيص',
        items: [
          {
            id: 'falafel-bowl',
            name: 'بول الفلافل المحمص',
            description: 'فلافل مخبوزة، تبولة، حمص، وطحينة بالليمون.',
            price: 45,
            image:
              'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=800&q=60'
          },
          {
            id: 'shawarma-bowl',
            name: 'بول شاورما دجاج',
            description: 'شرائح شاورما، رز زعفراني، خضار مشوية وصوص ثوم خفيف.',
            price: 48,
            image:
              'https://images.unsplash.com/photo-1476127396010-3d21c59fc5c9?auto=format&fit=crop&w=800&q=60'
          }
        ]
      },
      {
        id: 'asharq-bowls-drinks',
        title: 'عصائر موسمية',
        items: [
          {
            id: 'mint-lemonade',
            name: 'ليمون بالنعناع',
            description: 'ليمون عضوي مع نعناع طازج وعسل السدر.',
            price: 20,
            image:
              'https://images.unsplash.com/photo-1464306076886-da185f6a9d12?auto=format&fit=crop&w=800&q=60'
          },
          {
            id: 'hibiscus-cooler',
            name: 'كركديه بارد',
            description: 'كركديه سعودي مع ماء ورد وحبات رمان.',
            price: 18,
            image:
              'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=60'
          }
        ]
      }
    ]
  }
];
