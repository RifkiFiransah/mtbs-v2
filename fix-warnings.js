const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const screensDir = path.join(__dirname, 'src', 'screens');

walkDir(screensDir, (filePath) => {
  if (filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let originalContent = content;

    // 1. Remove SafeAreaView from react-native import
    if (content.includes('SafeAreaView') && content.match(/import\s+{([^}]*)}.*?from\s+['"]react-native['"]/)) {
        // Find the react-native import block
        content = content.replace(/import\s+{([^}]*)}\s+from\s+['"]react-native['"];?/, (match, p1) => {
            if (p1.includes('SafeAreaView')) {
                // Remove SafeAreaView from the list
                let newImports = p1.split(',').map(s => s.trim()).filter(s => s && s !== 'SafeAreaView');
                if (newImports.length > 0) {
                    return `import { ${newImports.join(', ')} } from "react-native";\nimport { SafeAreaView } from "react-native-safe-area-context";`;
                } else {
                    return `import { SafeAreaView } from "react-native-safe-area-context";`;
                }
            }
            return match; // return original if SafeAreaView is not in it
        });
    }

    // 2. Remove setLayoutAnimationEnabledExperimental block
    if (filePath.includes('TanyaJawabScreen.tsx')) {
        content = content.replace(/if\s*\([\s\S]*?UIManager\.setLayoutAnimationEnabledExperimental[\s\S]*?\}\n/g, '');
    }

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated ${filePath}`);
    }
  }
});
