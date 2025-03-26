import { languageType } from "./types";

export const getBoilerplate = (language: languageType): string => {
    switch (language) {
        case "c":
            return `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`;

        case "cpp":
            return `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`;

        case "python":
            return `print("Hello, World!")`;

        case "javascript":
            return `console.log("Hello, World!");`;

        case "java":
            return `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`;


        default:
            return `// Select a language to see its boilerplate`;
    }
};
