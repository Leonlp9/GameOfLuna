const images = {
    auto: {
        url: "img/auto.png",
        type: "object"
    },
    informatik: {
        url: "img/informatik.png",
        type: "object"
    },
    kaffeemaschine: {
        url: "img/kaffeemaschine.png",
        type: "object"
    },
    kaninchen: {
        url: "img/kaninchen.png",
        type: "object"
    },
    laptop: {
        url: "img/laptop.png",
        type: "object"
    },
    lenkrad: {
        url: "img/lenkrad.png",
        type: "object"
    },
    loading: {
        url: "img/loading.png",
        type: "loading"
    },
    pedale: {
        url: "img/pedale.png",
        type: "object"
    },
    ram: {
        url: "img/ram.png",
        type: "object"
    },
    rollerblades: {
        url: "img/rollerblades.png",
        type: "object"
    },
    speicherkarte: {
        url: "img/speicherkarte.png",
        type: "object"
    },
    superluna: {
        url: "img/superluna.png",
        type: "object"
    },
    allergie: {
        url: "img/skins/allergie.webp",
        type: "skin"
    },
    business: {
        url: "img/skins/business.png",
        type: "skin"
    },
    clicker: {
        url: "img/skins/clicker.webp",
        type: "skin"
    },
    gacha: {
        url: "img/skins/gacha.webp",
        type: "skin"
    },
    minecraft: {
        url: "img/skins/minecraft.webp",
        type: "skin"
    },
    race: {
        url: "img/skins/race.png",
        type: "skin"
    },
    sherlock: {
        url: "img/skins/sherlock.png",
        type: "skin"
    },
    bg1: {
        url: "img/backgrounds/bg1.png",
        type: "background"
    },
    bg2: {
        url: "img/backgrounds/bg2.png",
        type: "background"
    },
    bg3: {
        url: "img/backgrounds/bg3.png",
        type: "background"
    },
    bg4: {
        url: "img/backgrounds/bg4.png",
        type: "background"
    },
    bg5: {
        url: "img/backgrounds/bg5.png",
        type: "background"
    },
    bg6: {
        url: "img/backgrounds/bg6.png",
        type: "background"
    },
    bg7: {
        url: "img/backgrounds/bg7.png",
        type: "background"
    },
    bg8: {
        url: "img/backgrounds/bg8.png",
        type: "background"
    },
    bg9: {
        url: "img/backgrounds/bg9.png",
        type: "background"
    },
    bg10: {
        url: "img/backgrounds/bg10.png",
        type: "background"
    },
}

function getLinkForImage(imageName) {
    if (images[imageName]) {
        return images[imageName].url;
    } else {
        return images.loading.url;
    }
}

function getAllImageLinks() {
    return Object.values(images).map(image => image.url);
}

function getImagesOfType(type) {
    return Object.values(images).filter(image => image.type === type).map(image => image.url);
}

function getImagesOfTypes(types) {
    return Object.values(images).filter(image => types.includes(image.type)).map(image => image.url);
}

function getAllImagesWithoutTypes(types) {
    //types = ["object", "skin"]
    return Object.values(images).filter(image => !types.includes(image.type)).map(image => image.url);
}

function addPreviousStringToArray(array) {
    return array.map(string => "../" + string);
}