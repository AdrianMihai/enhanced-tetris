import { randomInt } from "../utilities/utilities";

export const codeToClassNameMapping = new Map(
    [
        [1, "orange-piece"],
        [2, "violet-piece"],
        [3, "pink-piece"],
        [4, "bright-blue-piece"],
        [5, "red-piece"],
        [6, "dark-blue-piece"],
        [7, "dark-green-piece"]
    ]
);

const reversedL = () => {
    return {
        code: 1,
        indexes: [
            [0, 5],
            [1, 3],
            [1, 4],
            [1, 5],
        ]
    };
}

const regularL = () => {
    return {
        code: 2,
        indexes: [
            [0, 3],
            [1, 3],
            [1, 4],
            [1, 5]
        ]
    };
}

const shortLine = () => {
    return {
        code: 3,
        indexes: [
            [1, 3],
            [1, 4],
            [1, 5]
        ]
    };
}

const longLine = () => {
    return {
        code: 4,
        indexes: [
            [1, 3],
            [1, 4],
            [1, 5],
            [1, 6]
        ]
    };
}

const regularZ = () => {
    return {
        code: 5,
        indexes: [
            [0, 4],
            [0, 5],
            [1, 3],
            [1, 4]
        ]
    };
}

const reversedZ = () => {
    return {
        code: 6,
        indexes: [
            [1, 4],
            [1, 5],
            [0, 3],
            [0, 4]
        ]
    };
}

const spaceship = () => {
    return {
        code: 7,
        indexes: [
            [0, 4],
            [1, 3],
            [1, 4],
            [1, 5]
        ]
    };
}

export const pickRandomPiece = () => {
    const choices = [reversedL(), regularL(), shortLine(), longLine(), regularZ(), reversedZ(), spaceship()];

    const randomIndex = randomInt(0, choices.length);
    console.log(randomIndex);
    return choices[randomIndex];
};

export const addAlternateFadeEffect = (piece) => {
    if (piece.code < codeToClassNameMapping.size) {
        piece.code += codeToClassNameMapping.size;
    }

}

export const removeAlternateFadeEffect = (piece) => {
    if (piece.code > codeToClassNameMapping.size) {
        piece.code -= codeToClassNameMapping.size;
    }

}

export const getClassNamesForCode = (code) => {
    let classNames = "";

    if (code > codeToClassNameMapping.size) {
        code -= codeToClassNameMapping.size;
        classNames += "alternate-fade "
    }

    classNames += codeToClassNameMapping.get(code);

    return classNames;
}