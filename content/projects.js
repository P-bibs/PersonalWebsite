export default {
  "Programming Languages": [
    {
      title: "Skiff",
      category: "programmingLanguages",
      screen: "Skiff",
      interactions: [
        {
          type: "DEMO",
          href: "https://skiff.paulbiberstein.me",
        },
        {
          type: "GITHUB",
          href: "https://github.com/P-bibs/skiff",
        },
      ],
      short: "A functional scripting language with gradual typing",
      content: [
        "Skiff is a programming language and accompanying interpreter that attempts to provide a frictionless environment for scripting and being introduced to functional programming. Features include algebraic data types, pattern matching, type inference, first-class functions, and helpful error messages. The skiff interpreter compiles to WASM so you can use the [web editor](https://skiff.paulbiberstein.me/), but it is also available as a [standalone binary on crates.io](https://crates.io/crates/skiff).",
      ],
      relevantTopics: [
        "Interpreters",
        "Functional programming",
        "Algebraic data types",
        "HM type inference",
        "Rust",
      ],
    },
  ],
  Web: [
    {
      title: "Mix Capsule",
      category: "web",
      screen: "MixCapsule",
      interactions: [
        {
          type: "DEMO",
          href: "https://mixcapsule.paulbiberstein.me",
        },
        {
          type: "GITHUB",
          href: "https://github.com/P-bibs/MixCapsule",
        },
      ],
      short: "Time capsule playlists delivered to you every month",
      content: ["Description coming soon"],
      relevantTopics: [
        "JavaScript",
        "NextJS",
        "Python",
        "Django",
        "Tailwind",
        "UI/UX",
        "Music",
      ],
    },
    {
      title: "Tempo Trainer",
      category: "web",
      image: "tempotrainer.png",
      screen: "TempoTrainer",
      interactions: [
        {
          type: "DEMO",
          href: "https://tempotrainer.paulbiberstein.me",
        },
        {
          type: "GITHUB",
          href: "https://github.com/P-bibs/Tempo-Trainer",
        },
      ],
      short:
        "Auto-generated, personalized Spotify playlists to keep pace while you run",
      content: [
        "Tempo Trainer is a web app which harnesses the Spotify API to generate personalized playlists for running. The user enters some basic information, like height and sex, and then selects what sources they want their playlist to be pulled from (for example, their liked songs, their playlists, their most listened to tracks). Finally, they choose a pace they want to run at. Tempo Trainer deposits a playlist in their library containing songs the user already likes that have the correct tempo to help them run at their target pace.",
      ],
      relevantTopics: ["JavaScript", "React", "REST", "APIs", "UI/UX", "Music"],
    },
    {
      title: "One Night: Quarantine Edition",
      category: "web",
      image: "onenight.png",
      screen: "OneNight",
      interactions: [
        {
          type: "DEMO",
          href: "https://onenight.paulbiberstein.me/OneNight",
        },
        {
          type: "GITHUB",
          href: "https://github.com/P-bibs/One-Night-Quarantine-Edition",
        },
      ],
      short:
        "Play the board game One Night: Ultimate Werewolf and its expansions online",
      content: [
        `Developed during quarantine in early 2020, One Night: Quarantine Edition allows you to play the popular "One Night" tabletop games online, as well as selected expansions. In "One Night", players are given a secret role on either the villager or werewolf team. Then, the players close their eyes and each takes a turn performing their role's action. After everyone is done, players reopen their eyes and attempt to find the werewolves!`,
        `This online version supports private rooms so you can invite your friends and allows as many players as needed. A variety of mechanics are in place to make up for the lack of physical interactions, including swapping cards, poking your neighbor, adding tokens, and more.`,
      ],
      relevantTopics: [
        "TypeScript",
        "React",
        "MobX",
        "WebSockets",
        "NodeJS",
        "Express",
      ],
    },
    {
      title: "WikiKu",
      category: "web",
      image: "WikiKuPreview.png",
      screen: "WikiKu",
      interactions: [
        {
          type: "DEMO",
          href: "https://wikiku.paulbiberstein.me/Wikiku",
        },
        {
          type: "GITHUB",
          href: "https://github.com/OceanPak/Wikiku",
        },
      ],
      short: `Read Wikipedia articles as poems`,
      content: [
        `Made in just 24 hours for Hack@Brown 2020, WikiKu allows users to peruse Wikipedia articles in poem form through a calming interface. Users give a broad search category either through text input or scrolling a map. WikiKu takes the query and pores through related Wikipedia articles to produce delightful rhyming couplets. These poems are displayed on cards for the user, who can browse through them at a leisurely pace.`,
      ],
      relevantTopics: [
        "TypeScript",
        "React",
        "MobX",
        "Python",
        "Flask",
        "REST APIs",
      ],
    },
  ],

  Hardware: [
    {
      title: "PyFyPi",
      category: "hardware",
      interactions: [
        {
          type: "GITHUB",
          href: "https://github.com/P-bibs/PyFyPi",
        },
      ],
      short: `A PYthon-based LED visualizer, powered by spotiFY, running on raspberry PI`,
      content: [
        `PyFyPi is an easy-to-use LED visualizer which hooks into your Spotify account and lights up the room in time with the beat. PyFyPi is run off a Raspberry Pi which provides a simple web-interface where users can authenticate with their Spotify account. As soon as the authenticated user starts playing a song, the LEDs will start pulsing a variety of colors in time with the music. When playback stops, the LEDs will dim and wait for the music to start again.`,
      ],
      relevantTopics: [
        "Python",
        "Raspberry Pi",
        "Addressable LEDs",
        "UNIX process control",
        "NodeJS",
        "Express",
        "REST APIs",
        "Music",
      ],
    },
    {
      title: `"Thwack" Ski Timing Gate`,
      category: "hardware",
      screen: "Thwack",
      interactions: [
        {
          type: "DOCUMENTATION",
          href: "https://thwacktiminggate.com/",
        },
        {
          type: "GITHUB",
          href: "https://github.com/P-bibs/ThwackTimingGateApp",
        },
        // {
        //   type: "GITHUB",
        //   href: "https://github.com/P-bibs/ThwackTimingGateServer",
        // },
        // {
        //   type: "GITHUB",
        //   href: "https://github.com/P-bibs/ThwackTimingGateStartLine",
        // },
        // {
        //   type: "GITHUB",
        //   href: "https://github.com/P-bibs/ThwackTimingGateFinishLine",
        // },
      ],
      short: `An affordable wireless ski-timing system`,
      content: [
        `The Thwack Ski Timing Gate is a timing system for alpine skiing, consisting of three parts: a start line, a finish line, and an app. `,
      ],
      relevantTopics: [
        "Arduino",
        "Raspberry Pi",
        "XBee",
        "Communication Protocols",
        "CAD",
        "3D-printing",
        "Dart",
        "Flutter",
        "Mobile Development",
      ],
    },
  ],

  Acoustic: [
    {
      title: `Coexistence`,
      category: "acoustic",
      screen: "Coexistence",
      interactions: [
        {
          type: "DEMO",
          href: "https://www.youtube.com/watch?v=dzQmvAuiaNY&t",
        },
      ],
      short: `A computer music composition for guitar, glove, and algorithmic engine`,
      content: [
        `Coexistece is a computer music composition consisting of a guitar, capacitive glove, and algorithmic synthesizer engine. Rather than use the guitar to directly create sound, the performer grounds the tips of their fingers against the strings to send instructions to an algorithmic engine running on a computer and direct its output. For example, the performer may pluck with one finger to set the tempo, or strum with a different finger to set a base chord.`,
        `The algorithmic engine is implemented in the programming language/performance environment Max/MSP and the glove is wired up to a MakeyMakey microcontroller to detect string-presses.`,
      ],
      relevantTopics: [
        "Max/MSP",
        "Computer Music",
        "Multimedia",
        "Microcontrollers",
        "Electronics",
      ],
    },
    {
      title: `ML Chord Gen`,
      category: "acoustic",
      image: "mlchordgen.png",
      screen: "ChordGen",
      interactions: [
        {
          type: "DEMO",
          href: "https://chordgen.paulbiberstein.me",
        },
        {
          type: "GITHUB",
          href: "https://github.com/P-bibs/ChordGen",
        },
        {
          type: "GITHUB",
          href: "https://github.com/P-bibs/ChordGenModel",
        },
      ],
      short: `Using machine-learning to aid musical composition and improvisation`,
      content: [
        `ML Chord Gen is a webapp which utilizes a custom-trained neural network to provide the user with novel chord progressions. The chord progressions are generated subject to a number of tunable parameters, and the user can play them back in-browser with a variety of instruments to use as a backing track for improvisation or to inspire new compositions.`,
        `The chords are generated by a **recurrent neural network** that was trained on a large number of jazz standards. The network uses long short-term memory layers to ensure that the chords properly flow into each other. For more details, see the Github page linked above.`,
      ],
      relevantTopics: [
        "Python",
        "Keras",
        "Recurrent Neural Networks",
        "JavaScript",
      ],
    },
    {
      title: `ChordalPy`,
      category: "acoustic",
      interactions: [
        {
          type: "PYPI",
          href: "https://pypi.org/project/ChordalPy/",
        },
        {
          type: "GITHUB",
          href: "https://github.com/P-bibs/ChordalPy",
        },
      ],
      short: `A Python package for parsing and manipulating musical data`,
      content: [
        `ChordalPy is a small Python package for parsing and manipulating musical chords. The package includes a chord class to represent a musical chord and a variety of methods on that class to assist with tasks such as transposition and spelling. Additionally, the package has a parsing component which enables converting text files of chords to data objects, provided they adhere to the popular standard established in [Christopher Harte's 2010 thesis](https://qmro.qmul.ac.uk/xmlui/bitstream/handle/123456789/534/HARTETowardsAutomatic2010.pdf?sequence=1).`,
      ],
      relevantTopics: ["Python", "Data Parsing", "PyPi"],
    },
  ],
};
