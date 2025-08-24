export const settingsStore = defineStore("settingsStore", () => {
  const settingsToUpdate = ref([]);
  const customChoice = ref("");
  const toggleCustomModal = ref(false);
  const pauseTyping = ref(true);
  const showQuickSettings = ref(isMobile() || innerWidth < 600 ? false : true);
  const textPosition = ref("left");
  const toggleCapsToast = ref(false);
  const useCharacters = ref(false);
  const charsArray = ref([]);
  const charWidth = ref(20);
  const lineHeight = ref(1.5);
  const fonts = [
    // 'amiri',
    "caveat",
    "exo",
    "itim",
    "montserrat",
    // 'pacifico',
    "reddit-mono",
    "roboto-mono",
    // 'shadows-into-light',
    "fira-code",
    "source-code-pro",
    "inter",
    "fraktur",
  ];

  const customTests = ref({
    demo: "This is a custom test, you can add your own test, use the plus icon. This particular demo cannot be deleted.",
  });

  const customQuotes = ref({
    demo: "This is a custom quote, you can add your own test, use the plus icon. This particular demo cannot be deleted.",
  });

  const customWords = ref({
    demo: "gado",
  });

  const nextstore = nextStore();
  const { goNext } = storeToRefs(nextstore);

  const settings = ref({
    difficulty: "beginner",
    cursor: "border",
    repeat: false,
    "test-length": "auto",
    "words-type": "frequent",
    "character-case": "lower",
    cursor: "border",
    "test-type": "words",
    caps: false,
    punctuation: false,
    numbers: false,
    backspace: true,
    "no-space": false,
    blur: false,
    spaced: false,
    case: "lower",
    arrangement: "",
    "double-words": false,
    capslock: true,
    countdown: false,
    "blind-mode": false,
    "show-border": false,
    "test-lines": 3,
    "test-width": 50,
    fontsize: 45,
    font: "reddit-mono",
    theme: "",
  });

  const isBlindMode = computed(() => {
    return settings.value["blind-mode"];
  });

  const disableOption = ref({
    "words-type": false,
    "test-length": false,
  });

  const quickSettingss = computed(() => {
    return {
      "test-length": isMobile()
        ? ["auto", 10, 20, 30]
        : ["auto", 10, 20, 30, 50, 100],
      "test-type": ["quotes", "words", "custom", "characters"],
      "words-type": ["frequent", "common", "rare"],
      caps: ["caps"],
      punctuation: ["punctuations"],
      numbers: ["numbers"],
      arrangement: ["reverse", "jumble"],
      spaced: ["space"],
    };
  });

  const testLines = ref(settings.value["test-lines"]);
  const testWidth = ref(settings.value["test-width"]);
  const minFontSize = ref(25);
  const maxFontSize = ref(isMobile() ? 50 : 120);
  const fontSize = ref(settings.value.fontsize + minFontSize.value);
  const range = ref(fontSize.value - minFontSize.value);
  const testHeight = ref("fit-content");
  const contentFitHeight = ref(
    lineHeight.value * settings.value.fontsize * testLines.value
  );

  const testStyle = computed(() => {
    return {
      "font-size": settings.value["fontsize"] + "px",
      "line-height": lineHeight.value,
      width: `${(testWidth.value * charWidth.value).toFixed(0)}px`,
      "max-width": "90%",
    };
  });

  const toggleQuickSetting = (selection, group) => {
    updateSingleSetting(group, selection);

    if (settings.value["test-type"] !== "words") {
      disableOption.value["test-length"] = true;
      disableOption.value["words-type"] = true;
      settingsToUpdate.value.push(
        {
          type: "disableOption",
          name: "test-length",
          value: true,
        },
        {
          type: "disableOption",
          name: "words-type",
          value: true,
        }
      );
    } else {
      disableOption.value["test-length"] = false;
      disableOption.value["words-type"] = false;
      settingsToUpdate.value.push(
        {
          type: "disableOption",
          name: "test-length",
          value: false,
        },
        {
          type: "disableOption",
          name: "words-type",
          value: false,
        }
      );
    }
  };

  const checkQuickSettings = (option, key) => {
    let selection = isFinite(key) ? +key : key;
    const currentUserPrefrences = [
      settings.value["words-type"],
      settings.value["test-type"],
      settings.value["test-length"],
      settings.value["test-type"],
    ];

    if (currentUserPrefrences.includes(selection)) return;

    let group = option;
    let arr = ["arrangement", "case", "spaced"];

    if (arr.includes(group)) {
      if (selection === "uppercase") {
        if (settings.value["randomcase"]) settings.value["randomcase"] = false;
      }

      if (selection === "randomcase") {
        if (settings.value["uppercase"]) settings.value["uppercase"] = false;
      }

      if (selection === "reverse") {
        if (settings.value["jumble"]) settings.value["jumble"] = false;
      }

      if (selection === "jumble") {
        if (settings.value["reverse"]) settings.value["reverse"] = false;
      }
    }

    toggleQuickSetting(group, selection);
  };

  const updateSingleSetting = (setting, newVal) => {
    let updateSettings = [
      "arrangement",
      "character-case",
      "words-type",
      "caps",
      "punctuation",
      "test-type",
      "caps",
      "numbers",
      "backspace",
      "difficulty",
      "fonts",
      "no-space",
      "spaced",
      "fontsize",
      "double-words",
      "blind-mode",
      "countdown",
      "capslock",
      "test-length",
    ];

    if (settings.value[setting] === newVal) newVal = "";
    settings.value[setting] = newVal;

    settingsToUpdate.value.push({
      type: "settings",
      name: setting,
      value: newVal,
    });

    if (updateSettings.includes(setting)) goNext.value = true;
  };

  return {
    lineHeight,
    charWidth,
    testStyle,
    range,
    fontSize,
    testLines,
    testWidth,
    charWidth,
    disableOption,
    settings,
    quickSettingss,
    showQuickSettings,
    checkQuickSettings,
    updateSingleSetting,
    textPosition,
    pauseTyping,
    toggleCustomModal,
    customChoice,
    toggleCapsToast,
    charsArray,
    useCharacters,
    isBlindMode,
    settingsToUpdate,
    minFontSize,
    maxFontSize,
    testHeight,
    contentFitHeight,
    fonts,
    customQuotes,
    customWords,
    customTests,
  };
});
