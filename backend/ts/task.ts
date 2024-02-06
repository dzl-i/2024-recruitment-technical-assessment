
type FileData = {
    id: number,
    name: string,
    categories: string[],
    parent: number
    size: number
};

/**
 * Task 1
 */
function leafFiles(files: FileData[]): string[] {
    let fileMap: { [key: number]: string } = {};

    for (const file of files) {
        fileMap[file.id] = file.name;
    }

    // Delete all files that is a parent of another file
    for (const file of files) {
        if (file.parent !== -1) {
            delete fileMap[file.parent];
        }
    }

    return Object.values(fileMap);
}

/**
 * Task 2
 */
function kLargestCategories(files: FileData[], k: number): string[] {
    let categoriesMap: { [key: string]: number } = {};

    for (const file of files) {
        for (const category of file.categories) {

            // Count the categories
            if (categoriesMap[category]) {
                categoriesMap[category] += 1;
            } else {
                categoriesMap[category] = 1;
            }
        }
    }

    const sortedArray: string[] = Array.from(Object.entries(categoriesMap))
        .sort(([keyA, valueA], [keyB, valueB]) => {
            // Sort by values in decreasing order
            if (valueB !== valueA) {
                return valueB - valueA;
            }
            // If values are equal, sort by keys in ascending order
            return keyA.localeCompare(keyB);
        })
        .slice(0, 3)
        .map(([key]) => key);

    return sortedArray;
}

/**
 * Task 3
 */
function largestFileSize(files: FileData[]): number {
    let childrenMap: { [key: number]: FileData[] } = {};
    let sizeMap: { [key: number]: number } = {};

    // Create children map
    for (const file of files) {
        if (!childrenMap[file.id]) {
            childrenMap[file.id] = [];
        }

        if (file.parent !== -1) {
            if (!childrenMap[file.parent]) {
                childrenMap[file.parent] = [file];
            } else {
                childrenMap[file.parent].push(file);
            }
        }
    }

    // Traverse through the children using recursion
    function dfs(file: FileData, childrenMap: { [key: number]: FileData[] }, sizeMap: { [key: number]: number }): number {
        // Check if the size has been computed
        if (Object.keys(sizeMap).includes((file.id.toString()))) {
            return sizeMap[file.id];
        }

        // Otherwise, compute the size of the file (including children)
        let totalFileSize: number = file.size;
        for (const child of childrenMap[file.id]) {
            totalFileSize += dfs(child, childrenMap, sizeMap);
        }

        // Update the size map
        sizeMap[file.id] = totalFileSize;
        return totalFileSize;
    }

    // Compute all the file sizes
    let currentMaxSize = 0;
    for (const file of files) {
        currentMaxSize = Math.max(currentMaxSize, dfs(file, childrenMap, sizeMap));
    }

    return currentMaxSize;
}


function arraysEqual<T>(a: T[], b: T[]): boolean {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

const testFiles: FileData[] = [
    { id: 1, name: "Document.txt", categories: ["Documents"], parent: 3, size: 1024 },
    { id: 2, name: "Image.jpg", categories: ["Media", "Photos"], parent: 34, size: 2048 },
    { id: 3, name: "Folder", categories: ["Folder"], parent: -1, size: 0 },
    { id: 5, name: "Spreadsheet.xlsx", categories: ["Documents", "Excel"], parent: 3, size: 4096 },
    { id: 8, name: "Backup.zip", categories: ["Backup"], parent: 233, size: 8192 },
    { id: 13, name: "Presentation.pptx", categories: ["Documents", "Presentation"], parent: 3, size: 3072 },
    { id: 21, name: "Video.mp4", categories: ["Media", "Videos"], parent: 34, size: 6144 },
    { id: 34, name: "Folder2", categories: ["Folder"], parent: 3, size: 0 },
    { id: 55, name: "Code.py", categories: ["Programming"], parent: -1, size: 1536 },
    { id: 89, name: "Audio.mp3", categories: ["Media", "Audio"], parent: 34, size: 2560 },
    { id: 144, name: "Spreadsheet2.xlsx", categories: ["Documents", "Excel"], parent: 3, size: 2048 },
    { id: 233, name: "Folder3", categories: ["Folder"], parent: -1, size: 4096 },
];

console.assert(arraysEqual(
    leafFiles(testFiles).sort((a, b) => a.localeCompare(b)),
    [
        "Audio.mp3",
        "Backup.zip",
        "Code.py",
        "Document.txt",
        "Image.jpg",
        "Presentation.pptx",
        "Spreadsheet.xlsx",
        "Spreadsheet2.xlsx",
        "Video.mp4"
    ]
));

console.assert(arraysEqual(
    kLargestCategories(testFiles, 3),
    ["Documents", "Folder", "Media"]
));

console.assert(largestFileSize(testFiles) == 20992)
